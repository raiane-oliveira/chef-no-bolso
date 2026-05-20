import { useAuthContext } from '@/features/auth/model/authentication-context'
import { cn } from '@/shared/lib/utils'
import { NavLink } from '@/shared/ui/nav-link'
import {
  HouseIcon,
  MagnifyingGlassIcon,
  ShoppingBagIcon,
  UserIcon,
} from '@phosphor-icons/react'
import type { ComponentProps } from 'react'

interface HeaderMobileProps extends ComponentProps<'header'> {}

export function HeaderMobile({ className, ...props }: HeaderMobileProps) {
  const { session } = useAuthContext()

  return (
    <header
      {...props}
      className={cn(
        'fixed bottom-0 w-full z-50 border-b border-(--line) bg-(--header-bg) px-2 sm:sm:px-4 backdrop-blur-lg',
        className,
      )}
    >
      <nav className="mx-auto sm:px-4 flex justify-between items-center gap-x-3 gap-y-2 py-3">
        <NavLink
          className={cn('w-20 border-0 shadow-none!')}
          to="/"
          activeProps={{ className: 'is-active' }}
          size="sm"
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
          className={cn('w-20')}
          to="#"
          activeProps={{ className: 'is-active' }}
          size="sm"
        >
          {({ isActive }) => {
            return (
              <>
                <MagnifyingGlassIcon weight={isActive ? 'fill' : 'bold'} />
                Pesquisar
              </>
            )
          }}
        </NavLink>
        <NavLink
          className={cn('w-20')}
          to="/orders"
          activeProps={{ className: 'is-active' }}
          size="sm"
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

        {session ? (
          <NavLink
            to="#"
            className={cn('w-20')}
            activeProps={{ className: 'is-active' }}
            size="sm"
          >
            {({ isActive }) => {
              return (
                <>
                  <UserIcon weight={isActive ? 'fill' : 'bold'} />
                  Minha conta
                </>
              )
            }}
          </NavLink>
        ) : (
          <NavLink
            to="/auth/login"
            className={cn('w-20')}
            activeProps={{ className: 'is-active' }}
            size="sm"
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
      </nav>
    </header>
  )
}
