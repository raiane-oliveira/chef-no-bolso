import type { ChildrenProps, Role } from '@/shared/lib/shared-types'
import { env } from '@/shared/config/env'
import { createContext, useContext, useEffect, useState } from 'react'

export interface UserSession {
  accessToken: string
  role: Role
  expiresAt?: Date
}

interface AuthenticationContextProps {
  session: UserSession | null
  handleLogin: (session: UserSession) => void
  handleLogout: () => void
}

const SESSION_KEY = '@chefnobolso:session'

const AuthenticationContext = createContext({} as AuthenticationContextProps)

export function AuthenticationContextProvider({ children }: ChildrenProps) {
  const [session, setSession] = useState<UserSession | null>(null)

  useEffect(() => {
    let sessionFromStorage: UserSession | null = null

    try {
      const stored = localStorage.getItem(SESSION_KEY)
      if (stored) {
        const parsed = JSON.parse(stored) as UserSession
        if (!parsed.expiresAt || new Date(parsed.expiresAt) >= new Date()) {
          sessionFromStorage = parsed
        } else {
          localStorage.removeItem(SESSION_KEY)
        }
      }
    } catch {
      localStorage.removeItem(SESSION_KEY)
    }

    if (sessionFromStorage) {
      setSession(sessionFromStorage)

      fetch(`${env.VITE_API_URL || 'http://localhost:3333'}/auth/me`, {
        headers: { Authorization: `Bearer ${sessionFromStorage.accessToken}` },
      }).then(res => {
        if (!res.ok) {
          localStorage.removeItem(SESSION_KEY)
          setSession(null)
        }
      }).catch(() => {
        localStorage.removeItem(SESSION_KEY)
        setSession(null)
      })
    }
  }, [])

  function handleLogin(loginSession: UserSession) {
    localStorage.setItem(SESSION_KEY, JSON.stringify(loginSession))
    setSession(loginSession)
  }

  function handleLogout() {
    localStorage.removeItem(SESSION_KEY)
    setSession(null)
  }

  return (
    <AuthenticationContext value={{ session, handleLogin, handleLogout }}>
      {children}
    </AuthenticationContext>
  )
}

export const useAuthContext = () => {
  const context = useContext(AuthenticationContext)

  if (!context) {
    throw new Error(
      'useAuthContext must be used within an AuthenticationContextProvider',
    )
  }

  return context
}
