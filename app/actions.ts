'use server'

import { revalidatePath } from 'next/cache'
import { db } from '@/db'
import { snippetsTable } from '@/db/schema'
import { createSnippetSchema } from '@/lib/schemas'
import { z } from 'zod'
import { and, eq } from 'drizzle-orm'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/db/auth'

export type ActionState = {
  success: boolean
  message?: string
  errors?: {
    [K in keyof z.infer<typeof createSnippetSchema>]?: string[]
  }
  snippetId?: number
}

export async function createSnippetAction(
  prevState: ActionState,
  formData: FormData
): Promise<ActionState> {
  try {
    const rawData = {
      title: formData.get('title'),
      code: formData.get('code'),
      language: formData.get('language'),
      framework: formData.get('framework') || undefined,
      description: formData.get('description'),
    }

    const validatedFields = createSnippetSchema.safeParse(rawData)

    if (!validatedFields.success) {
      return {
        success: false,
        message: 'Validation failed',
        errors: validatedFields.error.flatten().fieldErrors,
      }
    }

    const session = await getServerSession(authOptions)
    if (!session?.user?.id) {
      return {
        success: false,
        message: 'Unauthorized',
      }
    }
    const userId = session.user.id

    const [newSnippet] = await db
      .insert(snippetsTable)
      .values({
        userId,
        title: validatedFields.data.title,
        code: validatedFields.data.code,
        language: validatedFields.data.language,
        framework: validatedFields.data.framework,
        description: validatedFields.data.description,
      })
      .returning({ insertedId: snippetsTable.id })

    revalidatePath('/')

    return {
      success: true,
      message: 'Snippet created successfully',
      snippetId: newSnippet.insertedId,
    }
  } catch (error) {
    console.error('Database error:', error)
    return {
      success: false,
      message: 'Database error: Failed to create snippet',
    }
  }
}

export async function deleteSnippetAction(
  id: number
): Promise<{ success: boolean; message: string }> {
  try {
    const session = await getServerSession(authOptions)
    if (!session?.user?.id) {
      return {
        success: false,
        message: 'Unauthorized',
      }
    }
    const userId = session.user.id
    await db
      .delete(snippetsTable)
      .where(and(eq(snippetsTable.id, id), eq(snippetsTable.userId, userId)))
    revalidatePath('/')
    return { success: true, message: 'Snippet deleted successfully' }
  } catch (error) {
    console.error('Database error:', error)
    return {
      success: false,
      message: 'Database error: Failed to delete snippet',
    }
  }
}

export async function editSnippetAction(
  id: number,
  prevState: ActionState,
  formData: FormData
): Promise<ActionState> {
  try {
    const session = await getServerSession(authOptions)
    if (!session?.user?.id) {
      return {
        success: false,
        message: 'Unauthorized',
      }
    }
    const userId = session.user.id

    const rawData = {
      title: formData.get('title'),
      code: formData.get('code'),
      language: formData.get('language'),
      framework: formData.get('framework') || undefined,
      description: formData.get('description'),
    }

    const validatedFields = createSnippetSchema.safeParse(rawData)

    if (!validatedFields.success) {
      return {
        success: false,
        message: 'Validation failed',
        errors: validatedFields.error.flatten().fieldErrors,
      }
    }

    await db
      .update(snippetsTable)
      .set({
        title: validatedFields.data.title,
        code: validatedFields.data.code,
        language: validatedFields.data.language,
        framework: validatedFields.data.framework,
        description: validatedFields.data.description,
      })
      .where(and(eq(snippetsTable.id, id), eq(snippetsTable.userId, userId)))

    revalidatePath('/')
    revalidatePath(`/s/${id}`)

    return {
      success: true,
      message: 'Snippet edited successfully',
      snippetId: id,
    }
  } catch (error) {
    console.error('Database error:', error)
    return {
      success: false,
      message: 'Database error: Failed to edit snippet',
    }
  }
}
