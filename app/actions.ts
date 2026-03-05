'use server'

import { revalidatePath } from 'next/cache'
import { db } from '@/db'
import { snippetsTable, usersTable } from '@/db/schema'
import { createSnippetSchema } from '@/lib/schemas'
import { z } from 'zod'

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

    // Temporary authorization: Get the first user
    // In a real app, you would get the user from the session
    const firstUser = await db.select().from(usersTable).limit(1)

    if (!firstUser || firstUser.length === 0) {
      return {
        success: false,
        message: 'No user found in the database. Please create a user first.',
      }
    }

    const userId = firstUser[0].id

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
