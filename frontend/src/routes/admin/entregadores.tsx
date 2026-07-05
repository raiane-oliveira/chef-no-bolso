import { useAuthContext } from '@/features/auth/model/authentication-context'
import { SignInCard } from '@/features/auth/ui/sign-in-card'
import { env } from '@/shared/config/env'
import { Button } from '@/shared/ui/button'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/shared/ui/dialog'
import { Input } from '@/shared/ui/input'
import { Label } from '@/shared/ui/label'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/shared/ui/table'
import { PlusIcon, TrashIcon } from '@phosphor-icons/react'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { createFileRoute } from '@tanstack/react-router'
import { useState } from 'react'

interface Deliverer {
  id: string
  nome: string
  email: string
  telefone: string
  veiculo: { tipo: 'moto' | 'carro' | 'bicicleta' | 'a_pe' }
  status: string
  userId: string
}

const API_URL = env.VITE_API_URL || 'http://localhost:3333'

export const Route = createFileRoute('/admin/entregadores')({
  head: () => ({
    meta: [
      {
        title: 'Gerenciar Entregadores | ChefNoBolso',
      },
    ],
  }),
  component: RouteComponent,
})

function RouteComponent() {
  const { session } = useAuthContext()
  const queryClient = useQueryClient()
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    password: '',
  })

  const { data: deliverersData, isLoading: isLoadingDeliverers } = useQuery({
    queryKey: ['admin-deliverers'],
    queryFn: async () => {
      const response = await fetch(`${API_URL}/deliveries/users?limit=100`, {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${session?.accessToken}`,
        },
      })
      if (!response.ok) throw new Error('Failed to fetch deliverers')
      return response.json()
    },
    enabled: !!session && session.role === 'ADMIN',
  })

  const createMutation = useMutation({
    mutationFn: async (data: typeof formData) => {
      const response = await fetch(`${API_URL}/auth/register/deliverer`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${session?.accessToken}`,
        },
        body: JSON.stringify({
          name: data.name,
          email: data.email,
          phone: data.phone,
          password: data.password,
        }),
      })
      if (!response.ok) throw new Error('Failed to create deliverer')
      return response.json()
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['admin-deliverers'] })
      resetForm()
    },
  })

  const deleteMutation = useMutation({
    mutationFn: async (id: string) => {
      const response = await fetch(`${API_URL}/users/${id}`, {
        method: 'DELETE',
        headers: {
          Authorization: `Bearer ${session?.accessToken}`,
        },
      })
      if (!response.ok) throw new Error('Failed to delete deliverer')
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['admin-deliverers'] })
    },
  })

  function resetForm() {
    setFormData({
      name: '',
      email: '',
      phone: '',
      password: '',
    })
    setIsDialogOpen(false)
  }

  function handleOpenDialog(deliverer?: Deliverer) {
    if (deliverer) {
      setFormData({
        name: deliverer.nome,
        email: deliverer.email,
        phone: deliverer.telefone,
        password: '',
      })
    } else {
      resetForm()
    }
    setIsDialogOpen(true)
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    createMutation.mutate(formData)
  }

  function handleDelete(id: string) {
    if (confirm('Tem certeza que deseja excluir este entregador?')) {
      deleteMutation.mutate(id)
    }
  }

  if (!session) {
    return (
      <main className="page-wrap max-md:pb-30 min-h-[calc(100vh-257px)] pt-10">
        <section className="grid gap-4 place-items-center">
          <h1 className="text-2xl font-semibold">Gerenciar Entregadores</h1>
          <SignInCard />
        </section>
      </main>
    )
  }

  if (session.role !== 'ADMIN') {
    return (
      <main className="page-wrap max-md:pb-30 min-h-[calc(100vh-257px)] pt-10">
        <section className="grid gap-4 place-items-center">
          <h1 className="text-2xl font-semibold">Acesso Negado</h1>
          <p className="text-muted-foreground">
            Você não tem permissão para acessar esta página.
          </p>
        </section>
      </main>
    )
  }

  const deliverers: Deliverer[] = deliverersData?.entregadores || []

  return (
    <main className="page-wrap max-md:pb-30 min-h-[calc(100vh-257px)] pt-10">
      <section className="grid gap-6">
        <div className="flex items-center justify-between gap-4 max-sm:flex-col">
          <h1 className="text-2xl font-semibold">Gerenciar Entregadores</h1>
          <div className="flex items-center gap-3">
            <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
              <DialogTrigger asChild>
                <Button onClick={() => handleOpenDialog()}>
                  <PlusIcon weight="bold" />
                  Adicionar Entregador
                </Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-[500px]">
                <form onSubmit={handleSubmit}>
                  <DialogHeader>
                    <DialogTitle>Adicionar Entregador</DialogTitle>
                    <DialogDescription>
                      Preencha as informações para adicionar um novo entregador.
                    </DialogDescription>
                  </DialogHeader>
                  <div className="grid gap-4 py-4">
                    <div className="grid gap-2">
                      <Label htmlFor="name">Nome</Label>
                      <Input
                        id="name"
                        value={formData.name}
                        onChange={(e) =>
                          setFormData({ ...formData, name: e.target.value })
                        }
                        required
                      />
                    </div>
                    <div className="grid gap-2">
                      <Label htmlFor="email">Email</Label>
                      <Input
                        id="email"
                        type="email"
                        value={formData.email}
                        onChange={(e) =>
                          setFormData({ ...formData, email: e.target.value })
                        }
                        required
                      />
                    </div>
                    <div className="grid gap-2">
                      <Label htmlFor="phone">Telefone</Label>
                      <Input
                        id="phone"
                        type="tel"
                        value={formData.phone}
                        onChange={(e) =>
                          setFormData({ ...formData, phone: e.target.value })
                        }
                        required
                      />
                    </div>
                    <div className="grid gap-2">
                      <Label htmlFor="password">Senha</Label>
                      <Input
                        id="password"
                        type="password"
                        value={formData.password}
                        onChange={(e) =>
                          setFormData({
                            ...formData,
                            password: e.target.value,
                          })
                        }
                      />
                    </div>
                  </div>
                  <DialogFooter>
                    <Button type="button" variant="outline" onClick={resetForm}>
                      Cancelar
                    </Button>
                    <Button type="submit" disabled={createMutation.isPending}>
                      Adicionar
                    </Button>
                  </DialogFooter>
                </form>
              </DialogContent>
            </Dialog>
          </div>
        </div>

        {isLoadingDeliverers ? (
          <div className="text-center py-10">Carregando entregadores...</div>
        ) : deliverersData.length === 0 ? (
          <div className="text-center py-10 text-muted-foreground">
            Nenhum entregador encontrado.
          </div>
        ) : (
          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Nome</TableHead>
                  <TableHead>Email</TableHead>
                  <TableHead>Telefone</TableHead>
                  <TableHead className="text-right">Ações</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {deliverers.map((deliverer) => (
                  <TableRow key={deliverer.id}>
                    <TableCell className="font-medium">
                      {deliverer.nome}
                    </TableCell>
                    <TableCell>{deliverer.email}</TableCell>
                    <TableCell>{deliverer.telefone}</TableCell>
                    <TableCell className="text-right">
                      <div className="flex justify-end gap-2">
                        <Button
                          variant="outline"
                          size="icon-sm"
                          onClick={() => handleDelete(deliverer.userId)}
                          className="text-red-600 hover:text-red-600"
                        >
                          <TrashIcon weight="bold" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        )}
      </section>
    </main>
  )
}
