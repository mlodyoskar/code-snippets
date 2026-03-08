import Image from 'next/image'
import { Code2, Languages, Layers } from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import {
  getLanguageLabel,
  getLanguageIcon,
  getFrameworkLabel,
  getFrameworkIcon,
} from '@/lib/languages'
import type { Language, Framework } from '@/lib/languages'

type StatsCardsProps = {
  total: number
  topLanguage: { name: Language | null; count: number }
  topFramework: { name: Framework | null; count: number }
}

export default function StatsCards({
  total,
  topLanguage,
  topFramework,
}: StatsCardsProps) {
  return (
    <div className="flex flex-col justify-between xl:flex-row">
      <Card size="sm" className="m-1 h-25 w-full">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Code2 className="text-muted-foreground h-4 w-4" />
            Your snippets
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p>
            <span className="text-2xl font-bold">{total}</span>{' '}
            <span className="text-muted-foreground text-sm">
              snippets total
            </span>
          </p>
        </CardContent>
      </Card>

      <Card size="sm" className="m-1 h-25 w-full">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Languages className="text-muted-foreground h-4 w-4" />
            Top language
          </CardTitle>
        </CardHeader>
        <CardContent>
          {topLanguage.name ? (
            <div className="mt-3 flex items-center gap-2">
              <Image
                src={getLanguageIcon(topLanguage.name)}
                alt={getLanguageLabel(topLanguage.name)}
                width={20}
                height={20}
              />
              <p>
                {getLanguageLabel(topLanguage.name)} &mdash; {topLanguage.count}{' '}
                snippets
              </p>
            </div>
          ) : (
            <p className="text-muted-foreground">No data yet</p>
          )}
        </CardContent>
      </Card>

      <Card size="sm" className="m-1 h-25 w-full">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Layers className="text-muted-foreground h-4 w-4" />
            Top framework
          </CardTitle>
        </CardHeader>
        <CardContent>
          {topFramework.name ? (
            <div className="mt-3 flex items-center gap-2">
              <Image
                src={getFrameworkIcon(topFramework.name)}
                alt={getFrameworkLabel(topFramework.name)}
                width={20}
                height={20}
              />
              <p>
                {getFrameworkLabel(topFramework.name)} &mdash;{' '}
                {topFramework.count} snippets
              </p>
            </div>
          ) : (
            <p className="text-muted-foreground">No data yet</p>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
