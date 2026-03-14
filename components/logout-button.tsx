'use client'

import { signOut } from 'next-auth/react'
import { Button } from './ui/button'
import { AUTH_PATH } from '@/constants/paths'

export default function LogoutButton() {
  return (
    <Button
      variant="default"
      className="w-full"
      onClick={() => signOut({ callbackUrl: AUTH_PATH })}
    >
      Logout
    </Button>
  )
}
