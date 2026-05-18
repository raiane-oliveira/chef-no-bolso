import { NavLink } from '@/shared/ui/nav-link'
import ThemeToggle from '@/widgets/theme-toggle'
import { Input } from '@/shared/ui/input'
import { cn } from '@/shared/lib/utils'
import {
  ChefHatIcon,
  HouseIcon,
  MagnifyingGlassIcon,
  ShoppingBagIcon,
  UserIcon,
} from '@phosphor-icons/react'
import { useEffect, useRef, useState } from 'react'

export default function Header() {
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
        className={cn(
          'sticky top-0 z-50 border-b border-(--line) bg-(--header-bg) px-4 backdrop-blur-lg',
          showTopHeader && 'bg-accent-foreground',
        )}
      >
        <nav className="page-wrap flex justify-between flex-wrap items-center gap-x-3 gap-y-2 py-3 sm:py-4">
          <NavLink
            to="/"
            variant="link"
            className={cn(
              'inline-flex font-semibold items-center gap-2',
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

              <ThemeToggle />
            </div>
          </div>
        </nav>
      </header>
    </>
  )
}
