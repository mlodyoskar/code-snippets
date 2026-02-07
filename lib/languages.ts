export const LANGUAGES = [
  'typescript',
  'javascript',
  'python',
  'html',
  'css',
  'sql',
] as const

export type Language = (typeof LANGUAGES)[number]

export const FRAMEWORKS = [
  'react',
  'nextjs',
  'express',
  'tailwind',
  'drizzle',
  'zod',
] as const

export type Framework = (typeof FRAMEWORKS)[number]

export const languageConfig: Record<Language, { label: string; icon: string }> =
  {
    typescript: { label: 'TypeScript', icon: '/library/typescript.svg' },
    javascript: { label: 'JavaScript', icon: '/library/javascript.svg' },
    python: { label: 'Python', icon: '/library/python.svg' },
    html: { label: 'HTML', icon: '/library/html.svg' },
    css: { label: 'CSS', icon: '/library/css.svg' },
    sql: { label: 'SQL', icon: '/library/sqlite.svg' },
  }

export const frameworkConfig: Record<
  Framework,
  { label: string; icon: string }
> = {
  react: { label: 'React', icon: '/library/react_light.svg' },
  nextjs: { label: 'Next.js', icon: '/library/nextjs.svg' },
  express: { label: 'Express', icon: '/library/expressjs.svg' },
  tailwind: { label: 'Tailwind CSS', icon: '/library/tailwindcss.svg' },
  drizzle: { label: 'Drizzle', icon: '/library/drizzle-orm_light.svg' },
  zod: { label: 'Zod', icon: '/library/zod.svg' },
}

export const getLanguageLabel = (language: Language): string =>
  languageConfig[language].label

export const getLanguageIcon = (language: Language): string =>
  languageConfig[language].icon

export const getFrameworkLabel = (framework: Framework): string =>
  frameworkConfig[framework].label

export const getFrameworkIcon = (framework: Framework): string =>
  frameworkConfig[framework].icon
