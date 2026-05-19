import type { ChildrenProps, Role } from '@/shared/lib/shared-types'
import { createContext, useContext, useState } from 'react'

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

const AuthenticationContext = createContext({} as AuthenticationContextProps)

export function AuthenticationContextProvider({ children }: ChildrenProps) {
  const [session, setSession] = useState<UserSession | null>(null)

  function handleLogin(login: UserSession) {
    setSession(login)
    localStorage.setItem('@chef-no-bolso:v1:session', JSON.stringify(login))
  }

  function handleLogout() {
    setSession(null)
    localStorage.removeItem('@chef-no-bolso:v1:session')
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
