
import { db } from '@/db'
import { snippetsTable } from '@/db/schema'
import { eq, ilike, and, desc, count, isNotNull } from 'drizzle-orm'
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

export const getRecentSnippets = async (limit: number = 6) => {
  return db
    .select()
    .from(snippetsTable)
    .orderBy(desc(snippetsTable.createdAt))
    .limit(limit)
}

export const getSnippetStats = async () => {
  const totalRes = await db.select({ value: count() }).from(snippetsTable)
  const total = totalRes[0]?.value ?? 0

  const topLanguageRes = await db
    .select({
      name: snippetsTable.language,
      count: count(),
    })
    .from(snippetsTable)
    .groupBy(snippetsTable.language)
    .orderBy(desc(count()))
    .limit(1)

  const topFrameworkRes = await db
    .select({
      name: snippetsTable.framework,
      count: count(),
    })
    .from(snippetsTable)
    .where(isNotNull(snippetsTable.framework))
    .groupBy(snippetsTable.framework)
    .orderBy(desc(count()))
    .limit(1)

  return {
    total,
    topLanguage: topLanguageRes[0] ?? { name: null, count: 0 },
    topFramework: topFrameworkRes[0] ?? { name: null, count: 0 },
  }
}
