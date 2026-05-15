import {
  Card,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
  type CardProps,
} from '@/components/ui/card'
import { priceFormatter } from '@/lib/formatters'
import { cn } from '@/lib/utils'
import type { Product } from '@/shared/api/types'
import { Dialog, DialogTrigger } from './ui/dialog'
import { AddToCartDialogContent } from './add-to-cart-dialog-content'

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
  if (orientation === 'horizontal') {
    return (
      <Dialog>
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

            <div className="relative shrink-0">
              <img
                src={product.imageUrl}
                alt=""
                className="relative rounded-sm z-20 max-w-32 h-full w-full object-cover brightness-60 grayscale dark:brightness-40"
              />
            </div>
          </Card>
        </DialogTrigger>

        <AddToCartDialogContent product={product} />
      </Dialog>
    )
  }

  const priceFormatted = priceFormatter.format(product.price)

  return (
    <Dialog>
      <DialogTrigger className="text-left group p-0 border-0 cursor-pointer rounded-md">
        <Card
          {...props}
          className={cn(
            'p-1 overflow-hidden transition-shadow shadow group-hover:shadow-lg gap-3 rounded-md',
            className,
          )}
        >
          <div className="relative">
            {/* <div className="absolute inset-0 z-30 aspect-video bg-black/35" /> */}
            <img
              src={product.imageUrl}
              alt=""
              className="relative rounded-sm z-20 aspect-[1/0.8] w-full object-cover brightness-60 grayscale dark:brightness-40"
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

      <AddToCartDialogContent product={product} />
    </Dialog>
  )
}
