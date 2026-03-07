'use client'

import { X } from 'lucide-react'
import { useRouter, usePathname, useSearchParams } from 'next/navigation'

export const ClearFilters = () => {
  const router = useRouter()
  const pathname = usePathname()
  const searchParams = useSearchParams()

  const hasFilters =
    searchParams.get('q') ||
    searchParams.get('lang') ||
    searchParams.get('framework')

  if (!hasFilters) return null

  const handleClear = () => {
    router.replace(pathname, { scroll: false })
  }

  return (
    <button
      onClick={handleClear}
      className="text-muted-foreground hover:text-foreground flex items-center gap-1 text-xs"
      title="Clear all filters"
    >
      <X className="size-3" />
      Clear
    </button>
  )
}
