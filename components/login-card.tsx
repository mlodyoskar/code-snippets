'use client'

import { Button } from '@/components/ui/button'
import {
  Card,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { signIn } from 'next-auth/react'

export function LoginCard() {
  return (
    <Card className="w-full w-md">
      <CardHeader>
        <CardTitle className="text-2xl font-bold">Code snippets</CardTitle>
        <CardDescription>
          Login with Google to access your snippets
        </CardDescription>
      </CardHeader>
      <CardFooter className="flex-col gap-2">
        <Button
          variant="default"
          className="w-full"
          onClick={() => signIn('google', { callbackUrl: '/' })}
        >
          Login with Google
        </Button>
      </CardFooter>
    </Card>
  )
}
