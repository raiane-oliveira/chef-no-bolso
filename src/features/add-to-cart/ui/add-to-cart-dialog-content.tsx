import { X } from 'lucide-react'
import { Button } from '../../../shared/ui/button'
import {
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '../../../shared/ui/dialog'
import { Field, FieldDescription, FieldLabel } from '../../../shared/ui/field'
import { Textarea } from '../../../shared/ui/textarea'
import { useState } from 'react'
import type { Product } from '@/shared/api/types'
import { priceFormatter } from '@/shared/lib/formatters'

interface AddToCartDialogContentProps {
  product: Product
}

export function AddToCartDialogContent({
  product,
}: AddToCartDialogContentProps) {
  const [textarea, setTextarea] = useState('')

  function onChangeTextarea(value: string) {
    if (value.length > 140) return

    setTextarea(value)
  }

  const priceFormatted = priceFormatter.format(product.price)

  return (
    <DialogContent className="flex flex-col items-center overflow-hidden p-0 md:flex-row gap-4 sm:max-w-200 w-full max-h-158.5 h-full sm:min-h-100">
      <div className="relative p-4 overflow-hidden grid place-items-center md:w-80 lg:w-88 xl:w-96 md:min-h-52 h-full">
        <img
          src={product.imageUrl}
          className="object-cover shadow border border-muted object-center w-full aspect-square rounded-xl"
        />
      </div>

      <div className="flex flex-col bg-muted flex-1 h-full border-l border-muted">
        <DialogHeader className="flex-row p-4 items-center justify-between">
          <span>Detalhes do pedido</span>
          <DialogClose className="cursor-pointer">
            <X />
          </DialogClose>
        </DialogHeader>

        <div className="overflow-y-auto p-6 h-full bg-card rounded-t-2xl flex flex-col">
          <DialogTitle>{product.name}</DialogTitle>
          <DialogDescription className="mt-3 mb-6">
            {product.description}
          </DialogDescription>

          <p className="mb-4">{priceFormatted}</p>

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
          <span className="py-2 px-5 bg-muted rounded-sm">- 1 +</span>
          <Button
            size="lg"
            className="flex-1 flex items-center justify-between rounded-sm"
          >
            Adicionar <span>{priceFormatted}</span>
          </Button>
        </DialogFooter>
      </div>
    </DialogContent>
  )
}
