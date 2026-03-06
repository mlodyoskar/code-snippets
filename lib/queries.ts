'use server'

import { db } from '@/db'
import { snippetsTable } from '@/db/schema'
import { eq, ilike, and } from 'drizzle-orm'
import { Language, Framework } from '@/lib/languages'

export const getSnippets = async (filters?: {
  search?: string
  language?: Language
  framework?: Framework
}) => {
  const conditions = []
  if (filters?.search) {
    conditions.push(ilike(snippetsTable.title, `%${filters.search}%`))
  }

  if (filters?.language) {
    conditions.push(eq(snippetsTable.language, filters.language))
  }

  if (filters?.framework) {
    conditions.push(eq(snippetsTable.framework, filters.framework))
  }

  return db
    .select()
    .from(snippetsTable)
    .where(conditions.length > 0 ? and(...conditions) : undefined)
}

export const getSnippetById = async (id: number) =>
  db.select().from(snippetsTable).where(eq(snippetsTable.id, id))
