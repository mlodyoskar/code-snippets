'use client'

import { signIn } from 'next-auth/react'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Separator } from '@/components/ui/separator'
import { Check } from 'lucide-react'
import GoogleIcon from '@/public/library/google.svg'
import Image from 'next/image'
import { FEATURES } from '@/constants/features'

const WelcomeCard = () => {
  return (
    <div className="mt-32 flex w-full flex-col items-center gap-4 px-4">
      <div className="flex max-w-[400px] flex-col text-center">
        <h1 className="mb-2 text-3xl font-extrabold">Code snippets</h1>
        <p className="text-muted-foreground text-sm">
          Your personal snippet library — save, search, and copy code in
          seconds.
        </p>
      </div>
      <Card
        className="w-full max-w-md gap-0 py-6 shadow-lg"
        role="region"
        aria-label="Login"
      >
        <CardHeader className="border-b px-7 pt-7 pb-5">
          <CardTitle className="text-base font-semibold">
            Get started for free
          </CardTitle>
          <CardDescription className="text-sm leading-relaxed">
            Sign in with your Google account to access and manage your snippets
            from any device.
          </CardDescription>
        </CardHeader>

        <CardContent className="flex flex-col gap-4 p-7">
          <ul className="flex flex-wrap gap-2" aria-label="Features">
            {FEATURES.map((feature) => (
              <li
                key={feature}
                className="bg-muted text-muted-foreground hover:border-border hover:text-foreground flex items-center gap-1.5 rounded-full border px-3 py-1 font-mono text-xs transition-colors"
              >
                <Check
                  className="text-chart-2 h-3 w-3 shrink-0"
                  strokeWidth={2.5}
                />
                {feature}
              </li>
            ))}
          </ul>
          <div className="text-muted-foreground flex items-center gap-3 text-xs">
            <Separator className="flex-1" />
            continue with
            <Separator className="flex-1" />
          </div>

          <Button
            className="w-full gap-2"
            onClick={() => signIn('google', { callbackUrl: '/' })}
          >
            <Image src={GoogleIcon} alt="" width={16} height={16} />
            Continue with Google
          </Button>
        </CardContent>
      </Card>
    </div>
  )
}

export default WelcomeCard
