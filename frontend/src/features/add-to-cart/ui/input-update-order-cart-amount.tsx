import { cn } from '@/shared/lib/utils'
import { MinusIcon, PlusIcon } from '@phosphor-icons/react'
import type { ComponentProps } from 'react'

interface InputUpdateOrderCartAmountProps extends ComponentProps<'div'> {
  amount: number
  setAmount: (value: number) => void
}

export function InputUpdateOrderCartAmount({
  amount: amountInShoppingCart,
  setAmount,
  className,
  ...props
}: InputUpdateOrderCartAmountProps) {
  function onIncreaseAmountInCart() {
    setAmount(amountInShoppingCart + 1)
  }

  function onDecreaseAmountInCart() {
    setAmount(amountInShoppingCart - 1)
  }

  return (
    <div
      {...props}
      className={cn(
        'bg-muted justify-between rounded-sm max-w-28 w-full flex items-center',
        className,
      )}
    >
      <button
        className="cursor-pointer py-2 h-full px-3 disabled:cursor-not-allowed disabled:opacity-50"
        onClick={onDecreaseAmountInCart}
        disabled={amountInShoppingCart === 1}
      >
        <MinusIcon size={14} />
      </button>
      <input
        aria-label="Quantidade de produtos"
        className="text-sm w-full text-center whitespace-nowrap"
        value={amountInShoppingCart}
        onChange={(e) => {
          const value = Number(e.target.value)
          if (isNaN(value)) return
          if (value < 1 || value > 10000) return

          setAmount(value)
        }}
      />
      <button
        className="cursor-pointer h-full py-2 px-3 disabled:cursor-not-allowed disabled:opacity-50"
        onClick={onIncreaseAmountInCart}
      >
        <PlusIcon size={14} />
      </button>
    </div>
  )
}
