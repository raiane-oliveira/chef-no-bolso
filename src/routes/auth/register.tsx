import { useAuthContext } from '@/features/auth/model/authentication-context'
import { SignUpCard } from '@/features/auth/ui/sign-up-card'
import { createFileRoute, useNavigate } from '@tanstack/react-router'

export const Route = createFileRoute('/auth/register')({
  component: RouteComponent,
})

function RouteComponent() {
  const navigate = useNavigate()
  const { session } = useAuthContext()

  if (session) {
    return navigate({ to: '/' })
  }

  return (
    <main className="page-wrap max-md:pb-30 min-h-[calc(100vh-257px)] pt-10">
      <section className="sm:grid flex flex-col place-items-center gap-4">
        <h1 className="text-2xl font-semibold">Cadastrar</h1>

        <SignUpCard />
      </section>
    </main>
  )
}
