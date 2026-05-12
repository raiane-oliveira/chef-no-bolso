import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  type CardProps,
} from '@/components/ui/card'
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectValue,
} from '@/components/ui/select'
import { cn } from '@/lib/utils'
import {
  HandbagSimpleIcon,
  MotorcycleIcon,
  PersonSimpleWalkIcon,
  SealPercentIcon,
  StorefrontIcon,
} from '@phosphor-icons/react'
import { ChevronRight } from 'lucide-react'
import { Select as SelectPrimitive } from 'radix-ui'
import { Button } from './ui/button'
import { useState, type ReactNode } from 'react'

export interface AsideShoppingCartProps extends CardProps {}

export function AsideShoppingCart({
  className,
  ...props
}: AsideShoppingCartProps) {
  // TODO: Implement shopping cart logic
  // const isEmpty = Math.random() > 0.5
  const isEmpty = true

  const [value, setValue] = useState('')

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

  return (
    <Card
      {...props}
      className={cn('bg-transparent gap-0 p-0 overflow-hidden', className)}
    >
      <CardHeader className="bg-transparent block p-0">
        <Select value={value} onValueChange={setValue}>
          <SelectPrimitive.Trigger className="flex w-full items-center justify-between gap-2 bg-card px-3 py-4 text-[0.8125rem] font-medium whitespace-nowrap shadow-xs transition-[color,box-shadow] outline-none focus-visible:border-ring focus-visible:ring-[3px] focus-visible:ring-ring/50 disabled:cursor-not-allowed disabled:opacity-50 aria-invalid:border-destructive aria-invalid:ring-destructive/20 data-placeholder:text-muted-foreground data-[size=default]:h-full data-[size=sm]:h-8 *:data-[slot=select-value]:line-clamp-1 *:data-[slot=select-value]:flex *:data-[slot=select-value]:text-left *:data-[slot=select-value]:items-center *:data-[slot=select-value]:flex-1 [&_[data-slot=select-value]_p]:font-light *:data-[slot=select-value]:w-full *:data-[slot=select-value]:gap-3 dark:bg-input/30 hover:bg-transparent dark:hover:bg-input/50 dark:aria-invalid:ring-destructive/40 [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4 [&_svg:not([class*='text-'])]:text-muted-foreground">
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
        <CardContent>
          <div></div>
        </CardContent>
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
