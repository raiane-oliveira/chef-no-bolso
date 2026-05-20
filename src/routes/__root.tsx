import { TanStackDevtools } from '@tanstack/react-devtools'
import {
  HeadContent,
  Scripts,
  createRootRouteWithContext,
} from '@tanstack/react-router'
import { TanStackRouterDevtoolsPanel } from '@tanstack/react-router-devtools'
import { Footer } from '@/widgets/footer'
import { Header } from '@/widgets/header'

import TanStackQueryDevtools from '@/shared/config/tanstack-query/devtools'

import appCss from '../styles.css?url'

import type { QueryClient } from '@tanstack/react-query'
import { ShoppingCartContextProvider } from '@/features/add-to-cart/model/shopping-cart-context'
import {
  AuthenticationContextProvider,
  type UserSession,
} from '@/features/auth/model/authentication-context'
import { HeaderMobile } from '@/widgets/header-mobile'

interface MyRouterContext {
  queryClient: QueryClient
  auth: {
    session: UserSession | null
  }
}

export const Route = createRootRouteWithContext<MyRouterContext>()({
  head: () => ({
    meta: [
      {
        charSet: 'utf-8',
      },
      {
        name: 'viewport',
        content: 'width=device-width, initial-scale=1',
      },
      {
        title: 'ChefNoBolso',
      },
    ],
    links: [
      {
        rel: 'stylesheet',
        href: appCss,
      },
    ],
  }),
  shellComponent: RootDocument,
})

function RootDocument({ children }: { children: React.ReactNode }) {
  return (
    <html lang="pt-BR" suppressHydrationWarning>
      <head>
        <script />
        <HeadContent />
      </head>
      <body className="font-sans antialiased [overflow-wrap:anywhere] selection:bg-[rgba(79,184,178,0.24)]">
        <AuthenticationContextProvider>
          <ShoppingCartContextProvider>
            <Header className="lg:block hidden" />
            <HeaderMobile className="lg:hidden" />
            {children}
            <Footer className="hidden lg:block" />
          </ShoppingCartContextProvider>
        </AuthenticationContextProvider>
        <TanStackDevtools
          config={{
            position: 'bottom-right',
          }}
          plugins={[
            {
              name: 'Tanstack Router',
              render: <TanStackRouterDevtoolsPanel />,
            },
            TanStackQueryDevtools,
          ]}
        />
        <Scripts />
      </body>
    </html>
  )
}
