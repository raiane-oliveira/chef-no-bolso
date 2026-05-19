import {
  Card,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
  type CardProps,
} from '@/shared/ui/card'
import { priceFormatter } from '@/shared/lib/formatters'
import { cn } from '@/shared/lib/utils'
import type { Product } from '@/shared/api/types'
import { Dialog, DialogTrigger } from '../../../shared/ui/dialog'
import { AddToCartDialogContent } from '../../../features/add-to-cart/ui/add-to-cart-dialog-content'
import { useState } from 'react'

interface ProductCardProps extends CardProps {
  product: Product
  orientation?: 'vertical' | 'horizontal'
}

export function ProductCard({
  product,
  className,
  orientation = 'vertical',
  ...props
}: ProductCardProps) {
  const [open, setOpen] = useState(false)

  if (orientation === 'horizontal') {
    return (
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger className="text-left group p-0 border-0 cursor-pointer rounded-md">
          <Card
            {...props}
            className={cn(
              'px-3 py-4 flex-row items-start overflow-hidden gap-6 rounded-md',
              className,
            )}
          >
            <div className="flex flex-col gap-3 w-full">
              <CardHeader className="px-1.5 flex-1">
                <CardTitle className="text-base whitespace-nowrap text-ellipsis overflow-hidden font-medium">
                  {product.name}
                </CardTitle>
                <CardDescription
                  title={product.description}
                  className="text-sm line-clamp-3 font-light"
                >
                  {product.description}
                </CardDescription>
              </CardHeader>

              <CardFooter className="px-1.5">
                <span className="text-base font-normal">
                  {priceFormatter.format(product.price)}
                </span>
              </CardFooter>
            </div>

            <div className="relative rounded-sm overflow-hidden max-w-32 shrink-0">
              <img
                src={product.imageUrl}
                alt=""
                className="relative z-20 group-hover:scale-105 h-full w-full group-hover:brightness-100 transition-all object-cover brightness-60"
              />
            </div>
          </Card>
        </DialogTrigger>

        <AddToCartDialogContent product={product} onOpenChange={setOpen} />
      </Dialog>
    )
  }

  const priceFormatted = priceFormatter.format(product.price)

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger className="text-left group p-0 border-0 cursor-pointer rounded-md">
        <Card
          {...props}
          className={cn(
            'p-1 overflow-hidden transition-shadow shadow group-hover:shadow-lg gap-3 rounded-md',
            className,
          )}
        >
          <div className="relative overflow-hidden aspect-[1/0.8] rounded-md">
            {/* <div className="absolute inset-0 z-30 aspect-video bg-black/35" /> */}
            <img
              src={product.imageUrl}
              alt=""
              className="relative z-20 h-full transition-all brightness-60 group-hover:brightness-100 group-hover:scale-105 w-full object-cover"
            />
          </div>
          <CardHeader className="px-1.5">
            <CardTitle className="text-base whitespace-nowrap text-ellipsis overflow-hidden font-medium">
              {product.name}
            </CardTitle>
            <CardDescription
              title={product.description}
              className="text-sm line-clamp-2 font-light"
            >
              {product.description}
            </CardDescription>
          </CardHeader>
          <CardFooter className="p-1.5">
            <span className="text-base font-normal">{priceFormatted}</span>
          </CardFooter>
        </Card>
      </DialogTrigger>

      <AddToCartDialogContent onOpenChange={setOpen} product={product} />
    </Dialog>
  )
}
