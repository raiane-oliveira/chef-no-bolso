import { useAuthContext } from '@/features/auth/model/authentication-context'
import { SignInCard } from '@/features/auth/ui/sign-in-card'
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
    <main className="page-wrap max-md:pb-30 min-h-[calc(100vh-257px)] pt-10">
      <section className="sm:grid flex flex-col place-items-center gap-4">
        <h1 className="text-2xl font-semibold">Login</h1>

        <SignInCard />
      </section>
    </main>
  )
}
