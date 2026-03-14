'use client'

import { signOut } from 'next-auth/react'
import { Button } from './ui/button'

export default function LogoutButton() {
  return (
    <Button
      variant="default"
      className="w-full"
      onClick={() => signOut({ callbackUrl: '/auth/login' })}
    >
      Logout
    </Button>
  )
}
