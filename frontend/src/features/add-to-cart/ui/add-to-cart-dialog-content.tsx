import { X } from 'lucide-react'
import { Button } from '@/shared/ui/button'
import {
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '../../../shared/ui/dialog'
import { Field, FieldDescription, FieldLabel } from '@/shared/ui/field'
import { Textarea } from '@/shared/ui/textarea'
import { useEffect, useState } from 'react'
import type { Product } from '@/shared/api/types'
import { priceFormatter } from '@/shared/lib/formatters'
import { useShoppingCartContext } from '../model/shopping-cart-context'
import { InputUpdateOrderCartAmount } from './input-update-order-cart-amount'

interface AddToCartDialogContentProps {
  product: Product
  onOpenChange: (open: boolean) => void
}

export function AddToCartDialogContent({
  product,
  onOpenChange,
}: AddToCartDialogContentProps) {
  const { addToCart, orders } = useShoppingCartContext()
  const orderInCart = orders.find((o) => o.id === product.id)

  const [textarea, setTextarea] = useState('')
  const [amountInShoppingCart, setAmountInShoppingCart] = useState(
    orderInCart ? orderInCart.amountInShoppingCart : 1,
  )

  function onChangeTextarea(value: string) {
    if (value.length > 140) return

    setTextarea(value)
  }

  useEffect(() => {
    if (orderInCart) {
      setAmountInShoppingCart(orderInCart.amountInShoppingCart)
    }
  }, [orderInCart?.amountInShoppingCart])

  function onAddProductToCart() {
    addToCart({
      id: product.id,
      name: product.name,
      imgUrl: product.imageUrl,
      description: product.description,
      price: product.price,
      observation: textarea,
      amountInShoppingCart: amountInShoppingCart,
    })

    onOpenChange(false)
  }

  return (
    <DialogContent
      showCloseButton={false}
      className="flex max-md:rounded-none relative flex-col items-center overflow-hidden p-0 md:flex-row gap-4 sm:max-w-full max-w-full md:max-w-200 md:w-full md:max-h-158.5 h-full md:min-h-100"
    >
      <DialogClose className="cursor-pointer top-4 right-4 absolute z-10 rounded-full md:hidden bg-card p-1">
        <X className="size-5" />
      </DialogClose>

      <div className="relative md:p-4 overflow-hidden grid place-items-center w-full md:w-80 lg:w-88 xl:w-96 sm:min-h-52 max-sm:max-h-80 sm:h-2/5 md:h-full">
        <img
          src={product.imageUrl}
          className="object-cover shadow border border-muted object-center w-full max-md:h-full md:aspect-square md:rounded-xl"
        />
      </div>

      <div className="flex flex-col bg-muted flex-1 h-full border-l border-muted">
        <DialogHeader className="flex-row max-md:hidden p-4 items-center justify-between">
          <span>Detalhes do pedido</span>
          <DialogClose className="cursor-pointer">
            <X />
          </DialogClose>
        </DialogHeader>

        <div className="overflow-y-auto max-md:-mt-8 z-10 max-sm:px-3 p-6 h-full bg-card rounded-t-2xl flex flex-col">
          <DialogTitle>{product.name}</DialogTitle>
          <DialogDescription className="mt-3 mb-6">
            {product.description}
          </DialogDescription>

          <p className="mb-4">{priceFormatter.format(product.price)}</p>

          <Field className="mt-auto">
            <div className="flex itcems-center gap-2 justify-between">
              <FieldLabel htmlFor="textarea-message">
                Alguma observação?
              </FieldLabel>
              <FieldDescription>{textarea.length} / 140</FieldDescription>
            </div>
            <Textarea
              id="textarea-message"
              className="min-h-22 resize-none"
              value={textarea}
              onChange={(e) => onChangeTextarea(e.target.value)}
            />
          </Field>
        </div>

        <DialogFooter className="justify-between bg-card border-t border-muted p-4 gap-3">
          <InputUpdateOrderCartAmount
            amount={amountInShoppingCart}
            setAmount={setAmountInShoppingCart}
          />
          <Button
            size="lg"
            className="flex-1 flex items-center justify-between rounded-sm"
            onClick={onAddProductToCart}
          >
            {!orderInCart ? 'Adicionar' : 'Atualizar'}
            <span>
              {priceFormatter.format(product.price * amountInShoppingCart)}
            </span>
          </Button>
        </DialogFooter>
      </div>
    </DialogContent>
  )
}
