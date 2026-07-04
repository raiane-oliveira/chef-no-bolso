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

export function SignUpCard() {
  const [isPending, startTransition] = useTransition()
  const [error, setError] = useState('')
  const navigate = useNavigate()

  function handleSignUp(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setError('')

    const formData = new FormData(e.currentTarget)
    const name = String(formData.get('name') || '').trim()
    const email = String(formData.get('email') || '').trim()
    const password = String(formData.get('password') || '')
    const passwordConfirmation = String(
      formData.get('passwordConfirmation') || '',
    )

    if (password !== passwordConfirmation) {
      setError('As senhas precisam ser iguais.')
      return
    }

    startTransition(async () => {
      try {
        const response = await fetch(
          `${env.VITE_API_URL || 'http://localhost:3333'}/auth/register`,
          {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({ name, email, password }),
          },
        )

        if (!response.ok) {
          const data = await response.json().catch(() => null)
          setError(data?.message || 'Nao foi possivel criar sua conta.')
          return
        }

        navigate({ to: '/auth/login' })
      } catch {
        setError('Nao foi possivel conectar ao servidor.')
      }
    })
  }

  return (
    <Card className="w-full max-w-full sm:max-w-sm rounded-md">
      <CardHeader>
        <CardTitle>Cadastre-se </CardTitle>
        <CardDescription>
          Crie sua conta para acompanhar seus pedidos e aproveitar ofertas
          exclusivas
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form id="signup-form" onSubmit={handleSignUp}>
          <div className="flex flex-col gap-6">
            <div className="grid gap-2">
              <Label htmlFor="name">Nome</Label>
              <Input
                id="name"
                name="name"
                type="text"
                placeholder="John Doe"
                required
              />
            </div>
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
              <Label htmlFor="password">Senha</Label>
              <Input id="password" name="password" type="password" required />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="passwordConfirmation">Repita senha</Label>
              <Input
                id="passwordConfirmation"
                name="passwordConfirmation"
                type="password"
                required
              />
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
          form="signup-form"
        >
          {isPending ? 'Enviando...' : 'Enviar'}
        </Button>
        <Button
          asChild
          variant="link"
          className="w-full cursor-pointer font-normal"
        >
          <Link to="/auth/login">Já possui uma conta? Faça login</Link>
        </Button>
      </CardFooter>
    </Card>
  )
}
