import { notFound } from 'next/navigation'
import { getSnippetById } from '@/lib/queries'
import { CodeBlock } from '@/components/code-block'
import { Badge } from '@/components/ui/badge'
import {
  getLanguageLabel,
  getLanguageIcon,
  getFrameworkLabel,
  getFrameworkIcon,
} from '@/lib/languages'
import { DeleteDialog } from '@/components/delete-dialog'
import AddSnippetDialog from '@/components/add-snippet-dialog'

type Props = {
  params: Promise<{ snippetId: string }>
}

export default async function SnippetPage({ params }: Props) {
  const { snippetId } = await params
  const parsedId = parseInt(snippetId, 10)

  if (isNaN(parsedId)) {
    return notFound()
  }

  const data = await getSnippetById(parsedId)
  const snippet = data[0]

  if (!snippet) {
    return notFound()
  }

  return (
    <div className="mx-auto w-full max-w-5xl space-y-8 p-4 md:p-6 lg:p-8">
      <header className="space-y-4">
        <h1 className="text-3xl font-bold tracking-tight md:text-4xl">
          {snippet.title}
        </h1>
        <div className="flex flex-wrap items-center gap-3">
          <div className="flex w-full justify-between">
            <div className="flex flex-wrap items-center gap-3">
              {snippet.language && (
                <Badge
                  variant="secondary"
                  className="flex h-auto items-center gap-1.5 rounded-md px-2.5 py-1 text-sm font-medium"
                >
                  <img
                    src={getLanguageIcon(snippet.language)}
                    alt={snippet.language}
                    className="size-4"
                  />
                  {getLanguageLabel(snippet.language)}
                </Badge>
              )}

              {snippet.framework && (
                <Badge
                  variant="secondary"
                  className="flex h-auto items-center gap-1.5 rounded-md px-2.5 py-1 text-sm font-medium"
                >
                  <img
                    src={getFrameworkIcon(snippet.framework)}
                    alt={snippet.framework}
                    className="size-4"
                  />
                  {getFrameworkLabel(snippet.framework)}
                </Badge>
              )}
              {snippet.createdAt && (
                <span className="text-muted-foreground text-sm">
                  {new Date(snippet.createdAt).toLocaleDateString()}
                </span>
              )}
            </div>
            <div className="flex flex-wrap gap-2">
              <AddSnippetDialog editMode={true} snippet={snippet} />
              <DeleteDialog snippetId={snippet.id} />
            </div>
          </div>
        </div>

        {snippet.description && (
          <p className="text-muted-foreground mt-4 max-w-3xl text-lg leading-relaxed text-balance">
            {snippet.description}
          </p>
        )}
      </header>

      <section className="overflow-hidden rounded-xl border bg-[#24292e] shadow-sm">
        <CodeBlock code={snippet.code} language={snippet.language} />
      </section>
    </div>
  )
}
