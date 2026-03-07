import Onboard from '@/components/onboard'
import StatsCards from '@/components/stats-cards'
import { getRecentSnippets, getSnippetStats } from '@/lib/queries'

export default async function Page() {
  const recent = await getRecentSnippets()
  const stats = await getSnippetStats()
  return (
    <div className="mx-auto w-full max-w-5xl p-4 md:p-6 lg:p-8">
      <Onboard />
      <section className="border-input mt-3 flex flex-col rounded-xl border-2 p-6">
        <StatsCards
          total={stats.total}
          topLanguage={stats.topLanguage}
          topFramework={stats.topFramework}
        />
      </section>
    </div>
  )
}
