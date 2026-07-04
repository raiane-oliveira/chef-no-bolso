import { cn } from '@/shared/lib/utils'
import { Button } from '@/shared/ui/button'
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/shared/ui/card'
import { Input } from '@/shared/ui/input'
import { Label } from '@/shared/ui/label'
import { env } from '@/shared/config/env'
import { Link, useNavigate } from '@tanstack/react-router'
import { useState, useTransition } from 'react'
import { useAuthContext } from '../model/authentication-context'

export function SignInCard() {
  const { handleLogin } = useAuthContext()
  const [isPending, startTransition] = useTransition()
  const [error, setError] = useState('')
  const navigate = useNavigate()

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setError('')

    const formData = new FormData(e.currentTarget)
    const email = String(formData.get('email') || '').trim()
    const password = String(formData.get('password') || '')

    startTransition(async () => {
      try {
        const response = await fetch(
          `${env.VITE_API_URL || 'http://localhost:3333'}/auth/login`,
          {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email, password }),
          },
        )

        const data = await response.json()

        if (!response.ok) {
          setError(data?.message || 'Email ou senha inválidos.')
          return
        }

        handleLogin({
          accessToken: data.token,
          role: data.user.role,
        })

        navigate({ to: '/' })
      } catch {
        setError('Não foi possível conectar ao servidor.')
      }
    })
  }

  return (
    <Card className="w-full max-w-full sm:max-w-sm rounded-md">
      <CardHeader>
        <CardTitle>Entre na sua conta</CardTitle>
        <CardDescription>
          Identifique-se para ter acesso aos seus pedidos
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form id="login-form" onSubmit={handleSubmit}>
          <div className="flex flex-col gap-6">
            <div className="grid gap-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                name="email"
                type="email"
                placeholder="johndoe@exemplo.com"
                required
              />
            </div>
            <div className="grid gap-2">
              <div className="flex items-center">
                <Label htmlFor="password">Senha</Label>
                <a
                  href="#"
                  className="ml-auto inline-block text-sm underline-offset-4 hover:underline"
                >
                  Esqueceu sua senha?
                </a>
              </div>
              <Input id="password" name="password" type="password" required />
            </div>
            {error && <p className="text-sm text-destructive">{error}</p>}
          </div>
        </form>
      </CardContent>
      <CardFooter className="flex-col gap-2">
        <Button
          disabled={isPending}
          type="submit"
          className={cn(
            'w-full cursor-pointer uppercase',
            isPending && 'animate-pulse cursor-wait',
          )}
          form="login-form"
        >
          {isPending ? 'Entrando...' : 'Entrar'}
        </Button>
        <Button
          asChild
          variant="link"
          className="w-full cursor-pointer font-normal"
        >
          <Link to="/auth/register">Ainda não tem uma conta? Cadastre-se</Link>
        </Button>
      </CardFooter>
    </Card>
  )
}
