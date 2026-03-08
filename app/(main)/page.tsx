import Onboard from '@/components/onboard'
import RecentCards from '@/components/recent-cards'
import StatsCards from '@/components/stats-cards'
import { Separator } from '@/components/ui/separator'
import { getRecentSnippets, getSnippetStats } from '@/lib/queries'

export default async function Page() {
  const recent = await getRecentSnippets()
  const stats = await getSnippetStats()
  return (
    <div className="mx-auto w-full max-w-5xl p-1 md:p-4 lg:p-8">
      <Onboard />
      <section className="border-input mt-3 flex flex-col rounded-xl border-2 p-3 md:p-6">
        <StatsCards
          total={stats.total}
          topLanguage={stats.topLanguage}
          topFramework={stats.topFramework}
        />

        <RecentCards snippets={recent} />
      </section>
    </div>
  )
}
