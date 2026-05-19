import { useAuthContext } from '@/features/auth/model/authentication-context'
import { SignInCard } from '@/features/auth/ui/sign-in-card'
import { cn } from '@/shared/lib/utils'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/orders')({
  component: RouteComponent,
})

function RouteComponent() {
  const { session } = useAuthContext()

  return (
    <main className="page-wrap min-h-[calc(100vh-257px)] pt-10">
      <section className={cn('grid gap-4', !session && 'place-items-center ')}>
        <h1 className="text-2xl font-semibold">Seus pedidos</h1>

        {session ? <div>Você ainda não fez nenhum pedido</div> : <SignInCard />}
      </section>
    </main>
  )
}
