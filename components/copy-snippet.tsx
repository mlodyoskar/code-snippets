'use client'

import { CopyButton } from '@/components/ui/copy-button'

interface CopySnippetProps {
  code: string
  className?: string
}

export function CopySnippet({ code, className }: CopySnippetProps) {
  const onCopy = async () => {
    try {
      if (navigator.clipboard) {
        await navigator.clipboard.writeText(code)
      }
    } catch (e) {
      console.error('Copy failed', e)
    }
  }

  return <CopyButton onClick={onCopy} className={className} />
}
