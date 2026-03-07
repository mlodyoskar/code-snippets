'use client'

import { SearchIcon } from 'lucide-react'
import { Input } from './ui/input'
import { usePathname, useSearchParams, useRouter } from 'next/navigation'
import { useDebouncedCallback } from 'use-debounce'
import { useState } from 'react'

const SearchInput = () => {
  const router = useRouter()
  const pathname = usePathname()
  const searchParams = useSearchParams()

  const currentQ = searchParams.get('q') || ''
  const [prevQ, setPrevQ] = useState(currentQ)
  const [searchTerm, setSearchTerm] = useState(currentQ)

  if (currentQ !== prevQ) {
    setPrevQ(currentQ)
    setSearchTerm(currentQ)
  }

  const handleDebouncedSearch = useDebouncedCallback((term: string) => {
    const params = new URLSearchParams(searchParams)

    if (term) {
      params.set('q', term)
    } else {
      params.delete('q')
    }

    router.replace(`${pathname}?${params.toString()}`, { scroll: false })
  }, 300)

  return (
    <div className="relative">
      <SearchIcon className="text-muted-foreground absolute top-1/2 left-2 h-4 w-4 -translate-y-1/2" />
      <Input
        placeholder="Snippet title"
        className="pl-8"
        value={searchTerm}
        onChange={(e) => {
          setSearchTerm(e.target.value)
          handleDebouncedSearch(e.target.value)
        }}
      />
    </div>
  )
}

export default SearchInput
