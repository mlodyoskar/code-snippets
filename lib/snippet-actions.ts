'use server'

import { getSnippets } from '@/lib/queries'
import type { Language, Framework } from '@/lib/languages'

export const fetchSnippets = async (params: {
  q?: string
  lang?: string
  framework?: string
}) => {
  return getSnippets({
    search: params.q,
    language: params.lang as Language | undefined,
    framework: params.framework as Framework | undefined,
  })
}
