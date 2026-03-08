import Image from 'next/image'
import { Snippet } from '@/db/schema'
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from './ui/card'
import {
  getLanguageIcon,
  getLanguageLabel,
  getFrameworkIcon,
  getFrameworkLabel,
} from '@/lib/languages'
import Link from 'next/link'
import { Button } from './ui/button'

type RecentSnippetsCardsProps = {
  snippets: Snippet[]
}

export default function RecentCards({ snippets }: RecentSnippetsCardsProps) {
  return (
    <div>
      <h2 className="my-4 text-xl font-semibold tracking-tight">
        Recent snippets:
      </h2>
      <div className="grid grid-cols-1 gap-2 sm:grid-cols-2 lg:grid-cols-3">
        {snippets.map((snippet) => {
          return (
            <Card
              key={snippet.id}
              size="sm"
              className="flex w-full justify-between"
            >
              <CardHeader>
                <CardTitle>{snippet.title}</CardTitle>
                <div className="flex items-center gap-2 pt-1">
                  <div className="flex items-center gap-1.5 rounded-md border px-2 py-0.5">
                    <Image
                      src={getLanguageIcon(snippet.language)}
                      alt={getLanguageLabel(snippet.language)}
                      width={14}
                      height={14}
                    />
                    <span className="text-muted-foreground text-xs">
                      {getLanguageLabel(snippet.language)}
                    </span>
                  </div>
                  {snippet.framework && (
                    <div className="flex items-center gap-1.5 rounded-md border px-2 py-0.5">
                      <Image
                        src={getFrameworkIcon(snippet.framework)}
                        alt={getFrameworkLabel(snippet.framework)}
                        width={14}
                        height={14}
                      />
                      <span className="text-muted-foreground text-xs">
                        {getFrameworkLabel(snippet.framework)}
                      </span>
                    </div>
                  )}
                </div>
              </CardHeader>
              <CardContent>
                <p>{snippet.description}</p>
              </CardContent>
              <CardFooter>
                <Button variant="outline" size="sm" className="w-full" asChild>
                  <Link href={`/s/${snippet.id}`}>View</Link>
                </Button>
              </CardFooter>
            </Card>
          )
        })}
      </div>
    </div>
  )
}
