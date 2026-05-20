import { priceFormatter } from '@/shared/lib/formatters'
import { cn } from '@/shared/lib/utils'
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  type CardProps,
} from '@/shared/ui/card'
import { Dialog, DialogTrigger } from '@/shared/ui/dialog'
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectValue,
} from '@/shared/ui/select'
import {
  HandbagSimpleIcon,
  MotorcycleIcon,
  PersonSimpleWalkIcon,
  SealPercentIcon,
  StorefrontIcon,
} from '@phosphor-icons/react'
import { ChevronRight } from 'lucide-react'
import { Select as SelectPrimitive } from 'radix-ui'
import { useState, type ReactNode } from 'react'
import { Button } from '../../../shared/ui/button'
import { useShoppingCartContext } from '../model/shopping-cart-context'
import { AddToCartDialogContent } from './add-to-cart-dialog-content'
import { InputUpdateOrderCartAmount } from './input-update-order-cart-amount'

export interface AsideShoppingCartProps extends CardProps {}

export function AsideShoppingCart({
  className,
  ...props
}: AsideShoppingCartProps) {
  const {
    orders,
    totalValue: subtotal,
    clearCart,
    updateAmountInCart,
  } = useShoppingCartContext()

  const [opens, setOpens] = useState(
    orders.map((o) => ({ id: o.id, open: false })),
  )
  const [value, setValue] = useState('')

  function onOpenChange(orderId: string, open: boolean) {
    setOpens((prev) => {
      if (!prev.some((o) => o.id === orderId)) {
        return [...prev, { id: orderId, open }]
      }

      return prev.map((o) => {
        if (o.id === orderId) {
          return { ...o, open }
        }
        return o
      })
    })
  }

  const deliveryOptions: { [key: string]: ReactNode } = {
    entrega: (
      <>
        <MotorcycleIcon className="size-6 text-muted-foreground" />
        <div className="w-full">
          <span>Rua das Lavouras, 123, Limoeiro, Campina Grande - PB</span>
          <p className="text-xs text-muted-foreground">
            Entrega em 23 min / R$ 7,00
          </p>
        </div>
      </>
    ),
    retirada: (
      <>
        <PersonSimpleWalkIcon
          weight="fill"
          className="size-6 text-muted-foreground"
        />
        <div className="w-full">
          <span>Retirar no local</span>
          <p className="text-xs text-muted-foreground">
            R. Odon Bezerra, 300 - Liberdade
          </p>
        </div>
      </>
    ),
    'consumo-no-local': (
      <>
        <StorefrontIcon
          weight="fill"
          className="size-6 text-muted-foreground"
        />
        <div className="w-full">
          <span>Consumir no local</span>
          <p className="text-xs text-muted-foreground">
            R. Odon Bezerra, 300 - Liberdade
          </p>
        </div>
      </>
    ),
  }

  const isEmpty = orders.length === 0

  const taxDelivery = value === 'entrega' ? 7 : 0
  const total = subtotal + taxDelivery

  return (
    <Card
      {...props}
      className={cn(
        'bg-transparent rounded-md gap-0 p-0 overflow-hidden',
        className,
      )}
    >
      <CardHeader className="bg-transparent block p-0">
        <Select value={value} onValueChange={setValue}>
          <SelectPrimitive.Trigger
            data-slot="select-trigger"
            className="flex w-full items-center justify-between gap-2 bg-card px-3 py-4 text-[0.8125rem] font-medium whitespace-nowrap shadow-xs transition-[color,box-shadow] outline-none focus-visible:border-ring focus-visible:ring-[3px] focus-visible:ring-ring/50 disabled:cursor-not-allowed disabled:opacity-50 aria-invalid:border-destructive aria-invalid:ring-destructive/20 data-placeholder:text-muted-foreground data-[size=default]:h-full data-[size=sm]:h-8 *:data-[slot=select-value]:line-clamp-1 *:data-[slot=select-value]:flex *:data-[slot=select-value]:text-left *:data-[slot=select-value]:items-center *:data-[slot=select-value]:flex-1 [&_[data-slot=select-value]_p]:font-light *:data-[slot=select-value]:w-full *:data-[slot=select-value]:gap-3 dark:bg-input/30 hover:bg-transparent dark:hover:bg-input/50 dark:aria-invalid:ring-destructive/40 [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4 [&_svg:not([class*='text-'])]:text-muted-foreground"
          >
            <SelectValue
              className="w-full flex-1"
              placeholder="Calcular taxa e tempo de entrega"
            >
              {deliveryOptions[value] || (
                <span className="text-muted-foreground">
                  Calcular taxa e tempo de entrega
                </span>
              )}
            </SelectValue>

            <SelectPrimitive.Icon asChild>
              <ChevronRight className="size-4" />
            </SelectPrimitive.Icon>
          </SelectPrimitive.Trigger>

          <SelectContent position="popper">
            <SelectGroup className="py-2">
              <SelectLabel className="text-sm py-2 px-3">
                Como você quer receber o pedido?
              </SelectLabel>
              <SelectItem
                value="entrega"
                className="flex p-3 items-center gap-2 w-full"
              >
                <MotorcycleIcon className="size-6 text-muted-foreground" />
                <div className="w-full">
                  <span>Entrega</span>
                  <p className="text-xs text-muted-foreground">
                    A gente leva até você
                  </p>
                </div>
              </SelectItem>
              <SelectItem
                value="retirada"
                className="flex p-3 items-center gap-2 w-full"
              >
                <PersonSimpleWalkIcon
                  weight="fill"
                  className="size-6 text-muted-foreground"
                />
                <div className="w-full">
                  <span>Retirada</span>
                  <p className="text-xs text-muted-foreground">
                    Você retira no local
                  </p>
                </div>
              </SelectItem>
              <SelectItem
                value="consumo-no-local"
                className="flex p-3 items-center gap-2 w-full"
              >
                <StorefrontIcon
                  weight="fill"
                  className="size-6 text-muted-foreground"
                />
                <div className="w-full">
                  <span>Consumo no local</span>
                  <p className="text-xs text-muted-foreground">
                    Você consome no local
                  </p>
                </div>
              </SelectItem>
            </SelectGroup>
          </SelectContent>
        </Select>
      </CardHeader>

      {/* Dotted line divider */}
      <div className="border-t border-dashed border-b-card-foreground" />

      {isEmpty ? (
        <CardContent className="flex py-7.5 text-muted-foreground bg-transparent flex-col items-center">
          <HandbagSimpleIcon size={64} weight="regular" />
          <span className="text-muted-foreground text-lg">Sacola vazia</span>
        </CardContent>
      ) : (
        <CardContent className="overflow-y-auto scrollbar-thin px-4 scrollbar-thumb-(--sea-ink-soft) py-4 h-full">
          <div className="flex items-center justify-between">
            <span className="font-medium">Sua sacola</span>
            <button
              className="uppercase text-xs cursor-pointer font-medium"
              onClick={() => clearCart()}
            >
              Limpar
            </button>
          </div>

          <div className="flex flex-col gap-3 mt-4">
            {orders.map((order) => {
              const currentOpen = opens.find((o) => o.id === order.id)
              return (
                <Dialog
                  key={order.id}
                  open={currentOpen?.open}
                  onOpenChange={(open) => {
                    onOpenChange(order.id, open)
                  }}
                >
                  <DialogTrigger asChild>
                    <Card className="bg-card cursor-pointer gap-0 transition-shadow hover:shadow-lg p-3 rounded-md flex-row justify-between">
                      <div className="flex flex-col gap-2 text-sm">
                        <div className="flex items-center gap-1.5">
                          <span className="font-semibold">
                            {order.amountInShoppingCart}x
                          </span>
                          <span>{order.name}</span>
                        </div>

                        <div className="flex mt-auto items-center gap-1.5">
                          <InputUpdateOrderCartAmount
                            amount={order.amountInShoppingCart}
                            setAmount={(newAmount) =>
                              updateAmountInCart(order.id, newAmount)
                            }
                            onClick={(e) => e.stopPropagation()}
                            className="[&_span]:text-xs [&_input]:max-w-6 [&_button]:px-2 [&_svg]:size-3"
                          />

                          <button
                            onClick={(e) => {
                              e.stopPropagation()
                              clearCart(order.id)
                            }}
                            className="pl-2 whitespace-nowrap text-xs text-muted-foreground opacity-80 transition-opacity hover:opacity-100 cursor-pointer"
                          >
                            Remover
                          </button>
                        </div>
                      </div>

                      <div className="space-y-2 flex-1">
                        <strong className="font-medium block text-sm text-right whitespace-nowrap shrink-0">
                          {priceFormatter.format(
                            order.price * order.amountInShoppingCart,
                          )}
                        </strong>
                        <div className="rounded ml-auto overflow-hidden w-14 aspect-square">
                          <img
                            alt={order.name}
                            src={order.imgUrl}
                            className="h-full w-full object-cover"
                          />
                        </div>
                      </div>
                    </Card>
                  </DialogTrigger>

                  <AddToCartDialogContent
                    product={{
                      ...order,
                      imageUrl: order.imgUrl,
                    }}
                    onOpenChange={(open) => onOpenChange(order.id, open)}
                  />
                </Dialog>
              )
            })}
          </div>
        </CardContent>
      )}

      {!isEmpty && (
        <>
          <div className="border-t w-full border-dashed border-b-card-foreground" />
          <div className="bg-card border-0 flex flex-col px-4 py-2.5">
            <ul className="space-y-1">
              <li className="flex items-center justify-between gap-1">
                <span className="text-[13px] font-light text-muted-foreground">
                  Subtotal
                </span>
                <span className="text-[13px] font-light text-muted-foreground">
                  {priceFormatter.format(subtotal)}
                </span>
              </li>

              <li className="flex items-center justify-between gap-1">
                <span className="text-[13px] font-light text-muted-foreground">
                  Taxa de entrega
                </span>
                <span className="text-[13px] font-light text-muted-foreground">
                  {priceFormatter.format(taxDelivery)}
                </span>
              </li>

              <li className="flex text-base items-center font-medium justify-between gap-1">
                <span>Total</span>
                <span>{priceFormatter.format(total)}</span>
              </li>
            </ul>
          </div>
        </>
      )}

      <div className="border-t border-dashed border-b-card-foreground" />

      <CardFooter className="bg-transparent border-0 flex flex-col p-0">
        {/* Cupom */}
        <Button
          variant="outline"
          className="rounded-none shadow-none px-4 py-3 h-auto justify-between text-muted-foreground border-0 w-full hover:bg-transparent"
        >
          <div className="flex flex-1 items-center gap-3">
            <SealPercentIcon className="size-6" />

            <div className="text-[0.8125rem] flex flex-col text-left">
              <span className="font-bold">Que tal usar um cupom?</span>
              <span className="font-light">1 disponível</span>
            </div>
          </div>

          <ChevronRight className="size-4" />
        </Button>

        <div className="border-t w-full border-dashed border-b-card-foreground" />

        {/* Action Button */}
        <div className="p-3 bg-card w-full">
          <Button
            disabled
            className="font-medium shadow-none text-base h-12 w-full"
          >
            Estabelecimento fechado
          </Button>
        </div>
      </CardFooter>
    </Card>
  )
}
