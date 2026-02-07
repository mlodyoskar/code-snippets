'use client'

import * as React from 'react'
import { Check, Copy } from 'lucide-react'

import { cn } from '@/lib/utils'
import { Button } from './button'
import { useState } from 'react'

type CopyButtonProps = React.ComponentProps<typeof Button> & {
  onClick: () => void
}

function CopyButton({ className, onClick, ...props }: CopyButtonProps) {
  const [copied, setCopied] = useState(false)

  const handleClick = () => {
    setCopied(true)
    onClick()
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <Button
      variant="outline"
      size="icon-sm"
      className={cn('relative', className)}
      onClick={handleClick}
      {...props}
    >
      <span
        className={cn(
          'absolute inset-0 flex items-center justify-center transition-all duration-200',
          copied ? 'blur-0 scale-100 opacity-100' : 'scale-75 opacity-0 blur-sm'
        )}
      >
        <Check className="size-4" />
      </span>
      <span
        className={cn(
          'absolute inset-0 flex items-center justify-center transition-all duration-200',
          copied ? 'scale-75 opacity-0 blur-sm' : 'blur-0 scale-100 opacity-100'
        )}
      >
        <Copy className="size-4" />
      </span>
    </Button>
  )
}

export { CopyButton }
