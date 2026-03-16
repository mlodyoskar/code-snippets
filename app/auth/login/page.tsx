import { LoginCard } from '@/components/login-card'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/db/auth'
import { redirect } from 'next/navigation'
import WelcomeCard from '@/components/welcome-card'

export default async function Login() {
  const session = await getServerSession(authOptions)

  if (session) {
    redirect('/')
  }

  return <WelcomeCard />
}
