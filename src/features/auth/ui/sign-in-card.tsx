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
import { Link, useNavigate } from '@tanstack/react-router'
import { useTransition } from 'react'
import { useAuthContext } from '../model/authentication-context'

const sleep = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms))

export function SignInCard() {
  const { handleLogin: setSession } = useAuthContext()
  const [isPending, startTransition] = useTransition()
  const navigate = useNavigate()

  function handleLogin(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()

    startTransition(async () => {
      await sleep(2000)
      setSession({
        accessToken: 'Bearer zwimlQm9sZXRvQWNjZXNzVG9rZW4',
        role: 'CUSTOMER',
      })

      navigate({ to: '/' })
    })
  }

  return (
    <Card className="w-full max-w-sm rounded-md">
      <CardHeader>
        <CardTitle>Entre na sua conta</CardTitle>
        <CardDescription>
          Identifique-se para ter acesso aos seus pedidos
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form id="login-form" onSubmit={handleLogin}>
          <div className="flex flex-col gap-6">
            <div className="grid gap-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
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
              <Input id="password" type="password" required />
            </div>
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
