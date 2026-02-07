import { Suspense } from 'react'
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarInset,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarTrigger,
} from '@/components/ui/sidebar'
import { APP_NAME } from '@/constants/app'
import { getSnippets } from '@/lib/queries'
import { getLanguageIcon, getFrameworkIcon } from '@/lib/languages'
import { Skeleton } from '@/components/ui/skeleton'
import Image from 'next/image'
import Link from 'next/link'

type MainLayoutProps = {
  children: React.ReactNode
}

const SnippetsList = async () => {
  const snippets = await getSnippets()

  return (
    <SidebarMenu>
      {snippets.map((snippet) => {
        const iconPath = snippet.framework
          ? getFrameworkIcon(snippet.framework)
          : getLanguageIcon(snippet.language)
        return (
          <SidebarMenuItem key={snippet.id}>
            <SidebarMenuButton asChild>
              <Link href={`/s/${snippet.id}`}>
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
    </SidebarMenu>
  )
}

const SnippetsListSkeleton = () => {
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

const MainLayout = (prop: MainLayoutProps) => {
  return (
    <>
      <Sidebar>
        <SidebarHeader>
          <h1 className="px-2 text-lg font-semibold">{APP_NAME}</h1>
        </SidebarHeader>
        <SidebarContent>
          <SidebarGroup>
            <SidebarGroupLabel>Snippets</SidebarGroupLabel>
            <SidebarGroupContent>
              <Suspense fallback={<SnippetsListSkeleton />}>
                <SnippetsList />
              </Suspense>
            </SidebarGroupContent>
          </SidebarGroup>
        </SidebarContent>
      </Sidebar>
      <SidebarInset>
        <header className="flex h-14 items-center px-4">
          <SidebarTrigger />
        </header>
        <main className="flex-1 p-6">{prop.children}</main>
      </SidebarInset>
    </>
  )
}

export default MainLayout
