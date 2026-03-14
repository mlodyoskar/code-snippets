'use client'

import { Button } from '@/components/ui/button'
import {
  Card,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { APP_NAME } from '@/constants/app'
import { signIn } from 'next-auth/react'

export function LoginCard() {
  return (
    <Card className="w-full max-w-md">
      <CardHeader>
        <CardTitle className="text-2xl font-bold">{APP_NAME}</CardTitle>
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
