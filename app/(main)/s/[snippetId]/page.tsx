import { getSnippetById } from '@/lib/queries'
import {
  getLanguageIcon,
  getLanguageLabel,
  getFrameworkIcon,
  getFrameworkLabel,
} from '@/lib/languages'
import { notFound } from 'next/navigation'
import Image from 'next/image'

type SnippetPageProps = {
  params: Promise<{ snippetId: string }>
}

const SnippetPage = async ({ params }: SnippetPageProps) => {
  const { snippetId } = await params
  const [snippet] = await getSnippetById(Number(snippetId))

  if (!snippet) notFound()

  const languageIconPath = getLanguageIcon(snippet.language)
  const languageLabel = getLanguageLabel(snippet.language)

  return (
    <div className="space-y-4">
      <h1 className="text-2xl font-bold">{snippet.title}</h1>
      <div className="text-muted-foreground flex items-center gap-2 text-sm">
        <Image
          src={languageIconPath}
          alt={languageLabel}
          width={16}
          height={16}
          className="size-4"
        />
        <span>{languageLabel}</span>
        {snippet.framework && (
          <>
            <span>•</span>
            <Image
              src={getFrameworkIcon(snippet.framework)}
              alt={getFrameworkLabel(snippet.framework)}
              width={16}
              height={16}
              className="size-4"
            />
            <span>{getFrameworkLabel(snippet.framework)}</span>
          </>
        )}
      </div>
      {snippet.description && (
        <p className="text-muted-foreground">{snippet.description}</p>
      )}
      <pre className="bg-muted overflow-auto rounded-lg p-4">
        <code>{snippet.code}</code>
      </pre>
    </div>
  )
}

export default SnippetPage
