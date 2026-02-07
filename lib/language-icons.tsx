const languageIconMap: Record<string, string> = {
  // Languages
  javascript: '/library/javascript.svg',
  typescript: '/library/typescript.svg',
  python: '/library/python.svg',
  html: '/library/html5.svg',
  css: '/library/css.svg',
  json: '/library/json.svg',
  bash: '/library/bash.svg',
  shell: '/library/bash.svg',
  sql: '/library/sqlite.svg',
  go: '/library/golang.svg',
  golang: '/library/golang.svg',
  rust: '/library/rust.svg',
  java: '/library/java.svg',
  kotlin: '/library/kotlin.svg',
  swift: '/library/swift.svg',
  ruby: '/library/ruby.svg',
  php: '/library/php.svg',
  csharp: '/library/csharp.svg',
  'c#': '/library/csharp.svg',
  c: '/library/c.svg',
  'c++': '/library/c-plusplus.svg',
  cpp: '/library/c-plusplus.svg',
  dart: '/library/dart.svg',
  scala: '/library/scala.svg',
  lua: '/library/lua.svg',
  haskell: '/library/haskell.svg',

  // Frameworks
  react: '/library/react_light.svg',
  nextjs: '/library/nextjs_icon_dark.svg',
  next: '/library/nextjs_icon_dark.svg',
  vue: '/library/vue.svg',
  angular: '/library/angular.svg',
  svelte: '/library/svelte.svg',
  express: '/library/expressjs.svg',
  expressjs: '/library/expressjs.svg',
  nestjs: '/library/nestjs.svg',
  django: '/library/django.svg',
  flask: '/library/flask-light.svg',
  laravel: '/library/laravel.svg',
  rails: '/library/ruby.svg',
  spring: '/library/spring.svg',

  // Libraries & Tools
  tailwind: '/library/tailwindcss.svg',
  tailwindcss: '/library/tailwindcss.svg',
  sass: '/library/sass.svg',
  scss: '/library/sass.svg',
  graphql: '/library/graphql.svg',
  prisma: '/library/prisma.svg',
  drizzle: '/library/drizzle-orm_light.svg',
  mongodb: '/library/mongodb-icon-light.svg',
  postgres: '/library/postgresql.svg',
  postgresql: '/library/postgresql.svg',
  mysql: '/library/mysql-icon-light.svg',
  redis: '/library/redis.svg',
  docker: '/library/docker.svg',
  node: '/library/nodejs.svg',
  nodejs: '/library/nodejs.svg',
  deno: '/library/deno.svg',
  bun: '/library/bun.svg',
  zod: '/library/zod.svg',
}

// Default icon for unknown languages
const DEFAULT_ICON = '/library/typescript.svg'

export function getLanguageIconPath(language: string): string {
  const normalizedLanguage = language.toLowerCase().trim()
  return languageIconMap[normalizedLanguage] || DEFAULT_ICON
}
