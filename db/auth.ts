import { DefaultSession } from 'next-auth'
import type { NextAuthOptions } from 'next-auth'
import { DrizzleAdapter } from '@auth/drizzle-adapter'
import { db } from '.'
import Google from 'next-auth/providers/google'
import { accounts, sessions, usersTable, verificationTokens } from './schema'

export const authOptions: NextAuthOptions = {
  adapter: DrizzleAdapter(db, {
    usersTable: usersTable,
    accountsTable: accounts,
    sessionsTable: sessions,
    verificationTokensTable: verificationTokens,
  }),
  providers: [
    Google({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),
  ],
  session: { strategy: 'jwt' },
  callbacks: {
    async redirect({ baseUrl }) {
      return baseUrl
    },
    async session({ session, token }) {
      if (token?.sub) {
        if (!session.user) {
          session.user = { id: token.sub }
        } else {
          session.user.id = token.sub
        }
      }
      return session
    },

    async jwt({ token, user }) {
      if (user) {
        token.sub = user.id
      }
      return token
    },
  },
  pages: {
    signIn: '/auth/login',
  },
}

declare module 'next-auth' {
  interface Session {
    user: {
      id: string
    } & DefaultSession['user']
  }
}
