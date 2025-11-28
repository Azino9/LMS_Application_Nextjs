/**
 * Session Provider Wrapper
 * 
 * Purpose: Wrap the application with NextAuth SessionProvider
 * 
 * This provider enables:
 * - useSession() hook throughout the app
 * - Client-side session management
 * - Automatic session refresh
 * - Session state synchronization across tabs
 * 
 * Usage in root layout:
 * <SessionProvider session={session}>
 *   {children}
 * </SessionProvider>
 */

'use client'

import { SessionProvider as NextAuthSessionProvider } from 'next-auth/react'

export default function SessionProvider({
  children,
  session
}: {
  children: React.ReactNode
  session: any
}) {
  return (
    <NextAuthSessionProvider session={session}>
      {children}
    </NextAuthSessionProvider>
  )
}
