import type { ChildrenProps } from '@/shared/lib/shared-types'
import { createContext, useContext, useState } from 'react'

interface Order {
  id: string
  name: string
  imgUrl: string
  description: string
  price: number
  observation?: string
  amountInShoppingCart: number
}

interface ShoppingCartContext {
  orders: Order[]
  updateAmountInCart: (orderId: string, amount: number) => void
  addToCart: (order: Order) => void
  clearCart: (orderId?: string) => void
}

const ShoppingCartContext = createContext({} as ShoppingCartContext)

export function ShoppingCartContextProvider({ children }: ChildrenProps) {
  const [shoppingCart, setShoppingCart] = useState<{
    orders: Order[]
  }>({ orders: [] })

  function addToCart(order: Order) {
    setShoppingCart((prev) => {
      const orderAlreadyInCart = prev.orders.find((o) => o.id === order.id)
      if (!orderAlreadyInCart) {
        return {
          orders: [...prev.orders, order],
        }
      }

      return {
        orders: [
          ...prev.orders.map((prevOrder) =>
            prevOrder.id === order.id ? order : prevOrder,
          ),
        ],
      }
    })
  }

  function clearCart(orderId?: string) {
    if (orderId) {
      return setShoppingCart((prev) => {
        return {
          orders: prev.orders.filter((o) => o.id !== orderId),
        }
      })
    }

    setShoppingCart({ orders: [] })
  }

  function updateAmountInCart(orderId: string, amount: number) {
    setShoppingCart((prev) => {
      return {
        orders: prev.orders.map((prevOrder) =>
          prevOrder.id === orderId
            ? {
                ...prevOrder,
                amountInShoppingCart: amount,
              }
            : prevOrder,
        ),
      }
    })
  }

  return (
    <ShoppingCartContext
      value={{
        orders: shoppingCart.orders,
        addToCart,
        clearCart,
        updateAmountInCart,
      }}
    >
      {children}
    </ShoppingCartContext>
  )
}

export const useShoppingCartContext = () => {
  const context = useContext(ShoppingCartContext)

  if (!context) {
    throw new Error(
      'useShoppingCartContext must be used within a ShoppingCartContextProvider',
    )
  }

  return context
}
