import {
  index,
  integer,
  pgEnum,
  pgTable,
  text,
  timestamp,
  varchar,
} from 'drizzle-orm/pg-core'
import { LANGUAGES, FRAMEWORKS } from '@/lib/languages'

export const languageEnum = pgEnum('language', LANGUAGES)
export const frameworkEnum = pgEnum('framework', FRAMEWORKS)

export const usersTable = pgTable('users', {
  id: integer().primaryKey().generatedAlwaysAsIdentity(),
  name: varchar({ length: 255 }).notNull(),
  email: varchar({ length: 255 }).notNull().unique(),
  createdAt: timestamp().defaultNow().notNull(),
  updatedAt: timestamp().defaultNow().notNull(),
})

export const snippetsTable = pgTable(
  'snippets',
  {
    id: integer().primaryKey().generatedAlwaysAsIdentity(),
    userId: integer()
      .references(() => usersTable.id, { onDelete: 'cascade' })
      .notNull(),
    title: varchar({ length: 255 }).notNull(),
    code: text().notNull(),
    language: languageEnum().notNull(),
    framework: frameworkEnum(),
    description: text(),
    createdAt: timestamp().defaultNow().notNull(),
    updatedAt: timestamp().defaultNow().notNull(),
  },
  (table) => [
    index('language_idx').on(table.language),
    index('framework_idx').on(table.framework),
  ]
)
