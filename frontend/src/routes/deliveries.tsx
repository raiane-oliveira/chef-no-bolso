import { useAuthContext } from '@/features/auth/model/authentication-context'
import { SignInCard } from '@/features/auth/ui/sign-in-card'
import { env } from '@/shared/config/env'
import { priceFormatter } from '@/shared/lib/formatters'
import { cn } from '@/shared/lib/utils'
import { Button } from '@/shared/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/shared/ui/card'
import { Input } from '@/shared/ui/input'
import { Label } from '@/shared/ui/label'
import {
  CaretDownIcon,
  CaretUpIcon,
  CheckCircleIcon,
} from '@phosphor-icons/react'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { createFileRoute } from '@tanstack/react-router'
import { useMemo, useState } from 'react'

interface OrderItem {
  product: { id: string; name: string; imageUrl: string; price: number } | null
  name: string
  price: number
  quantity: number
  observation?: string
}

interface Order {
  id: string
  user?: { id: string; name: string; email: string }
  items: OrderItem[]
  deliveryType: 'entrega' | 'retirada' | 'consumo-no-local'
  deliveryAddress?: string
  deliveryFee: number
  subtotal: number
  total: number
  status:
    | 'pending'
    | 'confirmed'
    | 'preparing'
    | 'ready'
    | 'delivering'
    | 'delivered'
    | 'cancelled'
  coupon?: string
  discount: number
  createdAt: string
}

const API_URL = env.VITE_API_URL || 'http://localhost:3333'

const statusLabels: Record<Order['status'], string> = {
  pending: 'Pendente',
  confirmed: 'Confirmado',
  preparing: 'Preparando',
  ready: 'Pronto',
  delivering: 'Em entrega',
  delivered: 'Entregue',
  cancelled: 'Cancelado',
}

const statusColors: Record<Order['status'], string> = {
  pending: 'bg-yellow-100 text-yellow-800',
  confirmed: 'bg-blue-100 text-blue-800',
  preparing: 'bg-orange-100 text-orange-800',
  ready: 'bg-purple-100 text-purple-800',
  delivering: 'bg-indigo-100 text-indigo-800',
  delivered: 'bg-green-100 text-green-800',
  cancelled: 'bg-red-100 text-red-800',
}

const deliveryTypeLabels: Record<Order['deliveryType'], string> = {
  entrega: 'Entrega',
  retirada: 'Retirada',
  'consumo-no-local': 'Consumo no local',
}

export const Route = createFileRoute('/deliveries')({
  head: () => ({
    meta: [
      {
        title: 'Entregas | ChefNoBolso',
      },
    ],
  }),
  component: RouteComponent,
})

function RouteComponent() {
  const { session } = useAuthContext()
  const queryClient = useQueryClient()
  const [tab, setTab] = useState<'ongoing' | 'done'>('ongoing')
  const [expandedOrder, setExpandedOrder] = useState<string | null>(null)
  const [startDate, setStartDate] = useState('')
  const [endDate, setEndDate] = useState('')

  const { data: ongoingData, isLoading: isLoadingOngoing } = useQuery({
    queryKey: ['ongoing-deliveries'],
    queryFn: async () => {
      const response = await fetch(`${API_URL}/deliveries/ongoing`, {
        headers: {
          Authorization: `Bearer ${session?.accessToken}`,
        },
      })
      if (!response.ok) throw new Error('Failed to fetch ongoing deliveries')
      return response.json()
    },
    enabled: !!session,
  })

  const { data: doneData, isLoading: isLoadingDone } = useQuery({
    queryKey: ['done-deliveries'],
    queryFn: async () => {
      const response = await fetch(`${API_URL}/deliveries/done`, {
        headers: {
          Authorization: `Bearer ${session?.accessToken}`,
        },
      })
      if (!response.ok) throw new Error('Failed to fetch done deliveries')
      return response.json()
    },
    enabled: !!session,
  })

  const finishMutation = useMutation({
    mutationFn: async (orderId: string) => {
      const response = await fetch(`${API_URL}/deliveries/${orderId}/finish`, {
        method: 'PATCH',
        headers: {
          Authorization: `Bearer ${session?.accessToken}`,
        },
      })
      if (!response.ok) throw new Error('Failed to finish delivery')
      return response.json()
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['ongoing-deliveries'] })
      queryClient.invalidateQueries({ queryKey: ['done-deliveries'] })
    },
  })

  const ongoingOrders: Order[] = ongoingData?.orders || []
  const doneOrders: Order[] = doneData?.orders || []

  const filteredDoneOrders = useMemo(() => {
    if (!startDate && !endDate) return doneOrders

    return doneOrders.filter((order) => {
      const orderDate = new Date(order.createdAt)
      const start = startDate ? new Date(startDate) : null
      const end = endDate ? new Date(endDate + 'T23:59:59') : null

      if (start && orderDate < start) return false
      if (end && orderDate > end) return false
      return true
    })
  }, [doneOrders, startDate, endDate])

  const orders = tab === 'ongoing' ? ongoingOrders : filteredDoneOrders
  const isLoading = tab === 'ongoing' ? isLoadingOngoing : isLoadingDone

  function formatDate(dateString: string) {
    return new Date(dateString).toLocaleDateString('pt-BR', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    })
  }

  function toggleOrder(orderId: string) {
    setExpandedOrder(expandedOrder === orderId ? null : orderId)
  }

  function clearFilters() {
    setStartDate('')
    setEndDate('')
  }

  function handleFinish(orderId: string) {
    if (confirm('Confirmar entrega deste pedido como finalizada?')) {
      finishMutation.mutate(orderId)
    }
  }

  if (!session || session.role !== 'DELIVERY') {
    return (
      <main className="page-wrap max-md:pb-30 min-h-[calc(100vh-257px)] pt-10">
        <section className="grid gap-4 place-items-center">
          <h1 className="text-2xl font-semibold">Suas Entregas</h1>
          <SignInCard />
        </section>
      </main>
    )
  }

  return (
    <main className="page-wrap max-md:pb-30 min-h-[calc(100vh-257px)] pt-10">
      <section className="grid gap-4">
        <div className="flex items-center justify-between gap-4 max-sm:flex-col">
          <h1 className="text-2xl font-semibold">Suas entregas</h1>
          <div className="flex items-center gap-2">
            <Button
              variant={tab === 'ongoing' ? 'default' : 'outline'}
              size="sm"
              onClick={() => setTab('ongoing')}
            >
              Em andamento
            </Button>
            <Button
              variant={tab === 'done' ? 'default' : 'outline'}
              size="sm"
              onClick={() => setTab('done')}
            >
              Concluídas
            </Button>
          </div>
        </div>

        {tab === 'done' && (
          <div className="flex items-end gap-3 flex-wrap">
            <div className="grid gap-1.5">
              <Label
                htmlFor="startDate"
                className="text-xs text-muted-foreground"
              >
                Data inicial
              </Label>
              <Input
                id="startDate"
                type="date"
                value={startDate}
                onChange={(e) => setStartDate(e.target.value)}
                className="w-40"
              />
            </div>
            <div className="grid gap-1.5">
              <Label
                htmlFor="endDate"
                className="text-xs text-muted-foreground"
              >
                Data final
              </Label>
              <Input
                id="endDate"
                type="date"
                value={endDate}
                onChange={(e) => setEndDate(e.target.value)}
                className="w-40"
              />
            </div>
            {(startDate || endDate) && (
              <Button variant="outline" size="sm" onClick={clearFilters}>
                Limpar
              </Button>
            )}
          </div>
        )}

        {isLoading ? (
          <div className="text-center py-10">Carregando pedidos...</div>
        ) : orders.length === 0 ? (
          <div className="text-center py-10 text-muted-foreground">
            {tab === 'ongoing'
              ? 'Nenhuma entrega em andamento no momento.'
              : startDate || endDate
                ? 'Nenhum pedido encontrado para o período selecionado.'
                : 'Nenhum pedido encontrado.'}
          </div>
        ) : (
          <div className="grid gap-4">
            {orders.map((order) => (
              <Card key={order.id}>
                <CardHeader className="pb-2">
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex-1">
                      <CardTitle className="text-lg flex items-center gap-2 flex-wrap">
                        Pedido #{order.id.slice(-6).toUpperCase()}
                        <span
                          className={cn(
                            'text-xs px-2 py-0.5 rounded-full font-medium',
                            statusColors[order.status],
                          )}
                        >
                          {statusLabels[order.status]}
                        </span>
                      </CardTitle>
                      <div className="flex flex-wrap gap-3 text-sm text-muted-foreground mt-1">
                        <span>{formatDate(order.createdAt)}</span>
                        {order.user && (
                          <span className="text-foreground">
                            {order.user.name} ({order.user.email})
                          </span>
                        )}
                      </div>
                    </div>
                    <div className="flex items-center gap-1">
                      {tab === 'ongoing' && (
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => handleFinish(order.id)}
                          disabled={finishMutation.isPending}
                        >
                          <CheckCircleIcon weight="bold" />
                          Finalizar
                        </Button>
                      )}
                      <Button
                        variant="ghost"
                        size="icon-sm"
                        onClick={() => toggleOrder(order.id)}
                      >
                        {expandedOrder === order.id ? (
                          <CaretUpIcon weight="bold" />
                        ) : (
                          <CaretDownIcon weight="bold" />
                        )}
                      </Button>
                    </div>
                  </div>
                  <div className="flex flex-wrap gap-4 text-sm text-muted-foreground mt-2">
                    <span>{deliveryTypeLabels[order.deliveryType]}</span>
                    <span>
                      {order.items.length}{' '}
                      {order.items.length === 1 ? 'item' : 'itens'}
                    </span>
                    <span className="font-medium text-foreground">
                      {priceFormatter.format(order.total)}
                    </span>
                  </div>
                </CardHeader>
                {expandedOrder === order.id && (
                  <CardContent>
                    <div className="border-t pt-4 space-y-3">
                      <h3 className="font-medium">Itens do pedido</h3>
                      <div className="space-y-2">
                        {order.items.map((item, index) => (
                          <div key={index} className="flex items-center gap-3">
                            <div className="w-12 h-12 rounded overflow-hidden shrink-0">
                              <img
                                src={
                                  item.product?.imageUrl ||
                                  'https://picsum.photos/400/400?random=0'
                                }
                                alt={item.name}
                                className="w-full h-full object-cover"
                              />
                            </div>
                            <div className="flex-1">
                              <p className="text-sm font-medium">{item.name}</p>
                              <p className="text-xs text-muted-foreground">
                                {item.quantity}x{' '}
                                {priceFormatter.format(item.price)}
                                {item.observation && ` • ${item.observation}`}
                              </p>
                            </div>
                            <span className="text-sm font-medium">
                              {priceFormatter.format(
                                item.price * item.quantity,
                              )}
                            </span>
                          </div>
                        ))}
                      </div>
                      <div className="border-t pt-3 space-y-1 text-sm">
                        <div className="flex justify-between">
                          <span className="text-muted-foreground">
                            Subtotal
                          </span>
                          <span>{priceFormatter.format(order.subtotal)}</span>
                        </div>
                        {order.deliveryFee > 0 && (
                          <div className="flex justify-between">
                            <span className="text-muted-foreground">
                              Taxa de entrega
                            </span>
                            <span>
                              {priceFormatter.format(order.deliveryFee)}
                            </span>
                          </div>
                        )}
                        {order.discount > 0 && (
                          <div className="flex justify-between text-green-600">
                            <span>
                              Desconto{order.coupon && ` (${order.coupon})`}
                            </span>
                            <span>
                              -{priceFormatter.format(order.discount)}
                            </span>
                          </div>
                        )}
                        <div className="flex justify-between font-semibold text-base pt-1">
                          <span>Total</span>
                          <span>{priceFormatter.format(order.total)}</span>
                        </div>
                      </div>
                      {order.deliveryAddress && (
                        <div className="text-sm">
                          <span className="text-muted-foreground">
                            Endereço:{' '}
                          </span>
                          <span>{order.deliveryAddress}</span>
                        </div>
                      )}
                    </div>
                  </CardContent>
                )}
              </Card>
            ))}
          </div>
        )}
      </section>
    </main>
  )
}
