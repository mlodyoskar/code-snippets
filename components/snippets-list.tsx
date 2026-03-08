'use client'

import {
  Framework,
  getFrameworkIcon,
  getLanguageIcon,
  Language,
} from '@/lib/languages'
import { SidebarMenu, SidebarMenuButton, SidebarMenuItem } from './ui/sidebar'
import Link from 'next/link'
import Image from 'next/image'
import { Skeleton } from './ui/skeleton'
import { useSearchParams } from 'next/navigation'
import { useEffect, useState } from 'react'
import { Snippet } from '@/db/schema'
import { fetchSnippets } from '@/lib/snippet-actions'

export const SnippetsList = () => {
  const searchParams = useSearchParams()
  const [snippets, setSnippets] = useState<Snippet[]>([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const fetchFiltered = async () => {
      setIsLoading(true)

      const data = await fetchSnippets({
        q: searchParams.get('q') || undefined,
        lang: searchParams.get('lang') || undefined,
        framework: searchParams.get('framework') || undefined,
      })

      setSnippets(data)
      setIsLoading(false)
    }

    fetchFiltered()
  }, [searchParams])

  if (isLoading) {
    return <SnippetsListSkeleton />
  }

  return (
    <SidebarMenu>
      {snippets.map((snippet) => {
        const iconPath = snippet.framework
          ? getFrameworkIcon(snippet.framework as Framework)
          : getLanguageIcon(snippet.language as Language)
        return (
          <SidebarMenuItem key={snippet.id}>
            <SidebarMenuButton asChild>
              <Link
                href={`/s/${snippet.id}${searchParams.toString() ? `?${searchParams.toString()}` : ''}`}
              >
                <Image
                  src={iconPath}
                  alt={snippet.language}
                  width={16}
                  height={16}
                  className="size-4"
                />
                <span>{snippet.title}</span>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
        )
      })}
      {snippets.length === 0 && (
        <div className="flex justify-center">
          <p className="text-muted-foreground font-semibold">
            No snippets found
          </p>
        </div>
      )}
    </SidebarMenu>
  )
}

export const SnippetsListSkeleton = () => {
  return (
    <SidebarMenu>
      {Array.from({ length: 10 }).map((_, i) => (
        <SidebarMenuItem key={i} className="flex items-center gap-2 p-2">
          <Skeleton className="size-4 rounded" />
          <Skeleton className="h-4 w-full" />
        </SidebarMenuItem>
      ))}
    </SidebarMenu>
  )
}
