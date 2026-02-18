import { z } from 'zod'
import { LANGUAGES, FRAMEWORKS } from '@/lib/languages'

export const createSnippetSchema = z.object({
  title: z.string().min(1, 'Title is required'),
  code: z.string().min(1, 'Code is required'),
  language: z.enum(LANGUAGES),
  framework: z.enum(FRAMEWORKS).optional(),
  description: z.string().optional(),
})

export type CreateSnippetInput = z.infer<typeof createSnippetSchema>
