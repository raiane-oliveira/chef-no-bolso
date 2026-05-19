import { useAuthContext } from '@/features/login/model/authentication-context'
import { SignInCard } from '@/features/login/ui/sign-in-card'
import { createFileRoute, useNavigate } from '@tanstack/react-router'

export const Route = createFileRoute('/auth/login')({
  component: RouteComponent,
})

function RouteComponent() {
  const navigate = useNavigate()
  const { session } = useAuthContext()

  if (session) {
    return navigate({ to: '/' })
  }

  return (
    <main className="page-wrap min-h-[calc(100vh-257px)] pt-10">
      <section className="grid place-items-center gap-4">
        <h1 className="text-2xl font-semibold">Login</h1>

        <SignInCard />
      </section>
    </main>
  )
}
