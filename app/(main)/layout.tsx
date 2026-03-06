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

type MainLayoutProps = {
  children: React.ReactNode
}

const MainLayout = (prop: MainLayoutProps) => (
  <>
    <Sidebar>
      <SidebarHeader>
        <h1 className="px-2 text-lg font-semibold">{APP_NAME}</h1>
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel className="flex w-full items-center justify-between">
            Search snippets
            <ClearFilters />
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <div className="mb-2 w-full">
              <SearchInput />
            </div>
            <div className="flex">
              <LanguageCombobox updateUrl={true} />
              <FrameworkCombobox updateUrl={true} />
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
      <main className="flex-1 p-6">{prop.children}</main>
    </SidebarInset>
  </>
)

export default MainLayout
