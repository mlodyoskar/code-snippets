'use client'

import { SearchIcon } from 'lucide-react'
import { Input } from './ui/input'

const SearchInput = () => {
  return (
    <div className="relative">
      <SearchIcon className="text-muted-foreground absolute top-1/2 left-2 h-4 w-4 -translate-y-1/2" />
      <Input placeholder="Snippet title..." className="pl-8" />
    </div>
  )
}

export default SearchInput
