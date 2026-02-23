import { codeToHtml } from 'shiki'
import { CopySnippet } from './copy-snippet'

interface CodeBlockProps {
  code: string
  language: string
}

export async function CodeBlock({ code, language }: CodeBlockProps) {
  const html = await codeToHtml(code, {
    lang: language,
    theme: 'github-dark',
  })

  return (
    <div className="relative group rounded-md overflow-hidden bg-[#24292e]">
      <div className="absolute right-3 top-3 z-10 opacity-0 group-hover:opacity-100 transition-opacity">
        <CopySnippet code={code} className="bg-[#24292e] hover:bg-[#2f363d] text-gray-300 pointer-events-auto shadow-sm border-gray-700" />
      </div>
      <div 
        className="overflow-x-auto p-4 text-sm font-mono [&>pre]:!bg-transparent [&>pre]:m-0"
        dangerouslySetInnerHTML={{ __html: html }}
      />
    </div>
  )
}
