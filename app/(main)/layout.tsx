import { Suspense } from 'react'
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarInset,
  SidebarTrigger,
} from '@/components/ui/sidebar'
import { APP_NAME } from '@/constants/app'
import SearchInput from '@/components/search-input'
import LanguageCombobox from '@/components/language-combobox'
import FrameworkCombobox from '@/components/framework-combobox'
import { SnippetsList, SnippetsListSkeleton } from '@/components/snippets-list'
import { ClearFilters } from '@/components/clear-filters'
import Link from 'next/link'

type MainLayoutProps = {
  children: React.ReactNode
}

const MainLayout = (prop: MainLayoutProps) => (
  <>
    <Sidebar>
      <SidebarHeader>
        <Link href="/" className="px-2 text-lg font-semibold">{APP_NAME}</Link>
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel className="flex w-full items-center justify-between">
            Search & Filter
            <Suspense>
              <ClearFilters />
            </Suspense>
          </SidebarGroupLabel>
          <SidebarGroupContent className='sticky top-0 z-10 bg-sidebar'>
            <div className="mb-2 w-full">
              <Suspense>
                <SearchInput />
              </Suspense>
            </div>
            <div className="flex flex-col gap-2">
              <Suspense>
                <LanguageCombobox updateUrl={true} />
                <FrameworkCombobox updateUrl={true} />
              </Suspense>
            </div>
          </SidebarGroupContent>
        </SidebarGroup>
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
      <main className="flex-1 p-2 md:p-6">{prop.children}</main>
    </SidebarInset>
  </>
)

export default MainLayout
