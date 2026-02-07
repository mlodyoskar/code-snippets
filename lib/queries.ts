import { db } from '@/db'
import { snippetsTable } from '@/db/schema'
import { eq } from 'drizzle-orm'

export const getSnippets = async () => db.select().from(snippetsTable)

export const getSnippetById = async (id: number) =>
  db.select().from(snippetsTable).where(eq(snippetsTable.id, id))
