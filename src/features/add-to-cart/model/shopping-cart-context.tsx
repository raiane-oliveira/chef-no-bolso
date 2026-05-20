import type { ChildrenProps } from '@/shared/lib/shared-types'
import { createContext, useContext, useEffect, useState } from 'react'

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
  totalItemsInCart: number
  totalValue: number
  updateAmountInCart: (orderId: string, amount: number) => void
  addToCart: (order: Order) => void
  clearCart: (orderId?: string) => void
}

const ShoppingCartContext = createContext({} as ShoppingCartContext)

type ShoppingCartState = {
  orders: Order[]
}

export function ShoppingCartContextProvider({ children }: ChildrenProps) {
  const [shoppingCart, setShoppingCart] = useState<ShoppingCartState>(() => {
    const defaultState: ShoppingCartState = {
      orders: [],
    }

    if (typeof window === 'undefined') return defaultState

    const storedStateAsJSON = localStorage.getItem(
      '@chef-no-bolso:shopping-cart-state-1.0.0',
    )

    if (storedStateAsJSON)
      return JSON.parse(storedStateAsJSON) as ShoppingCartState

    return defaultState
  })

  const totalItemsInCart = shoppingCart.orders.reduce((acc, order) => {
    return acc + order.amountInShoppingCart
  }, 0)

  const totalValue = shoppingCart.orders.reduce((acc, currentOrder) => {
    return acc + currentOrder.price * currentOrder.amountInShoppingCart
  }, 0)

  useEffect(() => {
    const stateJSON = JSON.stringify(shoppingCart)

    localStorage.setItem('@chef-no-bolso:shopping-cart-state-1.0.0', stateJSON)
  }, [shoppingCart])

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
        totalItemsInCart,
        totalValue,
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
