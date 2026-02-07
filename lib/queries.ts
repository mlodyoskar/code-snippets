import { db } from '@/db'
import { snippetsTable } from '@/db/schema'

export const getSnippets = async () => db.select().from(snippetsTable)
