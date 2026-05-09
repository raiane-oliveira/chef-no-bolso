import { NavLink } from '@/components/NavLink'
import ThemeToggle from '@/components/ThemeToggle'
import { Input } from '@/components/ui/input'
import {
  ChefHatIcon,
  HouseIcon,
  MagnifyingGlassIcon,
  ShoppingBagIcon,
  UserIcon,
} from '@phosphor-icons/react'

export default function Header() {
  return (
    <header className="sticky top-0 z-50 border-b border-(--line) bg-(--header-bg) px-4 backdrop-blur-lg">
      <nav className="page-wrap flex justify-between flex-wrap items-center gap-x-3 gap-y-2 py-3 sm:py-4">
        <NavLink
          to="/"
          variant="link"
          className="inline-flex font-semibold items-center gap-2"
        >
          <ChefHatIcon size={32} />
          ChefNoBolso
        </NavLink>

        <div className="flex flex-1 justify-end items-center gap-12">
          <div className="relative max-w-xs w-full">
            <MagnifyingGlassIcon className="absolute size-4 left-3 top-1/2 -translate-y-1/2 text-(--sea-ink-soft)" />
            <Input
              placeholder="Busque por um produto"
              className="pl-9 h-12"
              aria-label="Busque por um produto"
            />
          </div>

          <div className="items-center gap-3 flex">
            <NavLink
              className="w-20"
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
              className="w-20"
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
              className="w-20"
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
  )
}
