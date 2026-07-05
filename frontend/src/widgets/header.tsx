import { NavLink } from '@/shared/ui/nav-link'
import { Input } from '@/shared/ui/input'
import { cn } from '@/shared/lib/utils'
import {
  ChefHatIcon,
  HouseIcon,
  MagnifyingGlassIcon,
  ShoppingBagIcon,
  UserIcon,
  SignOutIcon,
  ListIcon,
  UserCircleIcon,
  PackageIcon,
} from '@phosphor-icons/react'
import { useEffect, useRef, useState, type ComponentProps } from 'react'
import { useAuthContext } from '@/features/auth/model/authentication-context'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/shared/ui/dropdown-menu'
import { Link } from '@tanstack/react-router'

interface HeaderProps extends ComponentProps<'header'> {}

export function Header({ className, ...props }: HeaderProps) {
  const { session, handleLogout } = useAuthContext()
  const [showTopHeader, setShowTopHeader] = useState(true)
  const sentinelRef = useRef<HTMLDivElement | null>(null)

  useEffect(() => {
    const sentinel = sentinelRef.current
    if (!sentinel) return

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          // Sentinela visível → usuário está no topo
          setShowTopHeader(true)
        } else {
          // Sentinela saiu da tela → usuário scrollou
          setShowTopHeader(false)
        }
      },
      { threshold: [0] },
    )

    observer.observe(sentinel)

    return () => observer.disconnect()
  }, [])

  return (
    <>
      <div
        ref={sentinelRef}
        className="absolute invisible top-0 h-1 w-full"
        aria-hidden="true"
      />

      <header
        {...props}
        className={cn(
          'sticky top-0 z-50 border-b border-(--line) bg-(--header-bg) px-4 backdrop-blur-lg',
          showTopHeader && 'bg-accent-foreground',
          className,
        )}
      >
        <nav className="page-wrap flex justify-between flex-wrap items-center gap-x-3 gap-y-2 py-3 sm:py-4">
          <NavLink
            to="/"
            variant="link"
            className={cn(
              'inline-flex border-0 font-semibold items-center gap-2',
              showTopHeader && 'text-(--sand)',
            )}
          >
            <ChefHatIcon size={32} />
            ChefNoBolso
          </NavLink>

          <div className="flex flex-1 justify-end items-center gap-12">
            <div className="relative max-w-xs w-full">
              <MagnifyingGlassIcon
                className={cn(
                  'absolute size-4 left-3 top-1/2 -translate-y-1/2',
                  showTopHeader ? 'text-muted' : 'text-(--sea-ink-soft)',
                )}
              />
              <Input
                placeholder="Busque por um produto"
                className={cn(
                  'pl-9 h-12',
                  showTopHeader &&
                    'placeholder:text-muted text-muted selection:bg-muted selection:text-(--sea-ink-soft)',
                )}
                aria-label="Busque por um produto"
              />
            </div>

            <div className="items-center gap-3 flex">
              <NavLink
                className={cn(
                  'w-20',
                  showTopHeader &&
                    'text-muted [&.is-active_svg]:shadow-muted [&.is-active]:border-accent-foreground hover:border-muted [&.is-active_svg]:fill-muted',
                )}
                to="/"
                activeProps={{ className: 'is-active' }}
              >
                {({ isActive }) => {
                  return (
                    <>
                      <HouseIcon weight={isActive ? 'fill' : 'bold'} />
                      Início
                    </>
                  )
                }}
              </NavLink>
              {session?.role !== 'DELIVERY' && (
                <NavLink
                  className={cn(
                    'w-20',
                    showTopHeader &&
                      'text-muted [&.is-active_svg]:shadow-muted [&.is-active]:border-accent-foreground hover:border-muted [&.is-active_svg]:fill-muted',
                  )}
                  to="/orders"
                  activeProps={{ className: 'is-active' }}
                >
                  {({ isActive }) => {
                    return (
                      <>
                        <ShoppingBagIcon weight={isActive ? 'fill' : 'bold'} />
                        Pedidos
                      </>
                    )
                  }}
                </NavLink>
              )}

              {session ? (
                <DropdownMenu>
                  <DropdownMenuTrigger
                    className={cn(
                      'inline-flex w-20 flex-col items-center gap-1 rounded-md border border-transparent px-2 py-1 text-sm transition-colors hover:border-muted',
                      showTopHeader && 'text-muted hover:border-muted',
                    )}
                  >
                    <UserIcon weight="bold" />
                    Minha conta
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end" className="w-48">
                    {session.role !== 'ADMIN' && (
                      <>
                        <DropdownMenuItem>
                          <UserCircleIcon weight="bold" />
                          Meus dados
                        </DropdownMenuItem>
                        <DropdownMenuItem asChild>
                          <Link
                            to={
                              session.role === 'DELIVERY'
                                ? '/deliveries'
                                : '/orders'
                            }
                          >
                            <ListIcon weight="bold" />
                            {session.role === 'DELIVERY'
                              ? 'Minhas entregas'
                              : 'Meus pedidos'}
                          </Link>
                        </DropdownMenuItem>
                      </>
                    )}
                    {session?.role === 'ADMIN' && (
                      <>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem asChild>
                          <Link to="/admin/products">
                            <PackageIcon weight="bold" />
                            Gerenciar produtos
                          </Link>
                        </DropdownMenuItem>
                        <DropdownMenuItem>
                          <Link to="/admin/entregadores">
                            Gerenciar entregadores
                          </Link>
                        </DropdownMenuItem>
                      </>
                    )}
                    <DropdownMenuSeparator />
                    <DropdownMenuItem
                      onClick={handleLogout}
                      className="text-red-600 focus:text-red-600"
                    >
                      <SignOutIcon weight="bold" />
                      Sair
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              ) : (
                <NavLink
                  to="/auth/login"
                  className={cn(
                    'w-20',
                    showTopHeader &&
                      'text-muted [&.is-active_svg]:shadow-muted [&.is-active]:border-accent-foreground hover:border-muted [&.is-active_svg]:fill-muted',
                  )}
                  activeProps={{ className: 'is-active' }}
                >
                  {({ isActive }) => {
                    return (
                      <>
                        <UserIcon weight={isActive ? 'fill' : 'bold'} />
                        Login
                      </>
                    )
                  }}
                </NavLink>
              )}
            </div>
          </div>
        </nav>
      </header>
    </>
  )
}
