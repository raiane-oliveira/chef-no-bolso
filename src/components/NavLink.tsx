import * as React from 'react'
import { cva, type VariantProps } from 'class-variance-authority'
import { Slot } from 'radix-ui'

import { cn } from '@/lib/utils.ts'
import { createLink, Link, type LinkComponent } from '@tanstack/react-router'

export const navLinkVariants = cva(
  'inline-flex p-1 flex-col gap-1 items-center justify-center rounded-md text-sm font-medium whitespace-nowrap transition-all outline-none focus-visible:border-ring focus-visible:ring-[3px] focus-visible:ring-ring/50 disabled:pointer-events-none disabled:opacity-50 aria-invalid:border-destructive aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 [&_svg]:pointer-events-none [&_svg]:shrink-0',
  {
    variants: {
      variant: {
        default:
          'text-(--lagoon-deep) border-1 border-transparent [&.is-active]:shadow-[0px_0px_0px_1px] [&.is-active_svg]:shadow-(--lagoon-deep) [&_svg]:size-5 [&.is-active_svg]:fill-(--lagoon-deep) [&.is-active]:border-(--lagoon-deep) hover:border-(--lagoon-deep)',
        active:
          'bg-(--musgo) [&_svg]:fill-(--lagoon-deep) text-(--sand) border-1 border-(--musgo)',
        link: 'p-0 text-(--foreground) flex-row text-base hover:text-(--musgo)',
      },
    },
    defaultVariants: {
      variant: 'default',
    },
  },
)

interface BaseNavLinkProps
  extends
    React.AnchorHTMLAttributes<HTMLAnchorElement>,
    VariantProps<typeof navLinkVariants> {}

const BaseLinkComponent = React.forwardRef<HTMLAnchorElement, BaseNavLinkProps>(
  ({ className, variant = 'default', ...props }, ref) => {
    return (
      <a
        ref={ref}
        data-variant={variant}
        {...props}
        className={cn(navLinkVariants({ variant, className }))}
      />
    )
  },
)

const CreatedLinkComponent = createLink(BaseLinkComponent)

interface NavLinkProps extends React.ComponentProps<
  typeof CreatedLinkComponent
> {}

export function NavLink(props: NavLinkProps) {
  return <CreatedLinkComponent {...props} />
}
