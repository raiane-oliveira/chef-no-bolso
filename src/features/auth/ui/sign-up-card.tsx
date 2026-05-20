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

const sleep = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms))

export function SignUpCard() {
  const [isPending, startTransition] = useTransition()
  const navigate = useNavigate()

  function handleSignUp(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()

    startTransition(async () => {
      await sleep(2000)

      navigate({ to: '/auth/login' })
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
              <Input id="name" type="text" placeholder="John Doe" required />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="phone">Telefone</Label>
              <Input id="phone" type="text" required />
            </div>
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
