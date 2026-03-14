import { db } from '@/db'
import { snippetsTable } from '@/db/schema'
import { eq, ilike, and, desc, count, isNotNull } from 'drizzle-orm'
import { Language, Framework } from '@/lib/languages'
import { authOptions } from '@/db/auth'
import { getServerSession } from 'next-auth'

export const getSnippets = async (filters?: {
  search?: string
  language?: Language
  framework?: Framework
}) => {
  const session = await getServerSession(authOptions)
  const userId = session?.user?.id
  if (!userId) {
    throw new Error('Unauthorized')
  }
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
    .where(
      conditions.length > 0
        ? and(...conditions, eq(snippetsTable.userId, userId))
        : eq(snippetsTable.userId, userId)
    )
}

export const getSnippetById = async (id: number) => {
  const session = await getServerSession(authOptions)
  const userId = session?.user?.id
  if (!userId) {
    throw new Error('Unauthorized')
  }
  return db
    .select()
    .from(snippetsTable)
    .where(and(eq(snippetsTable.id, id), eq(snippetsTable.userId, userId)))
}

export const getRecentSnippets = async (limit: number = 6) => {
  const session = await getServerSession(authOptions)
  const userId = session?.user?.id
  if (!userId) {
    throw new Error('Unauthorized')
  }
  return db
    .select()
    .from(snippetsTable)
    .where(eq(snippetsTable.userId, userId))
    .orderBy(desc(snippetsTable.createdAt))
    .limit(limit)
}

export const getSnippetStats = async () => {
  const session = await getServerSession(authOptions)
  const userId = session?.user?.id
  if (!userId) {
    throw new Error('Unauthorized')
  }
  const totalRes = await db
    .select({ value: count() })
    .from(snippetsTable)
    .where(eq(snippetsTable.userId, userId))
  const total = totalRes[0]?.value ?? 0

  const topLanguageRes = await db
    .select({
      name: snippetsTable.language,
      count: count(),
    })
    .from(snippetsTable)
    .where(eq(snippetsTable.userId, userId))
    .groupBy(snippetsTable.language)
    .orderBy(desc(count()))
    .limit(1)

  const topFrameworkRes = await db
    .select({
      name: snippetsTable.framework,
      count: count(),
    })
    .from(snippetsTable)
    .where(
      and(isNotNull(snippetsTable.framework), eq(snippetsTable.userId, userId))
    )
    .groupBy(snippetsTable.framework)
    .orderBy(desc(count()))
    .limit(1)

  return {
    total,
    topLanguage: topLanguageRes[0] ?? { name: null, count: 0 },
    topFramework: topFrameworkRes[0] ?? { name: null, count: 0 },
  }
}
