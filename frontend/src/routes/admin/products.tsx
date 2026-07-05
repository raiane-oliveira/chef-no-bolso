import { useAuthContext } from '@/features/auth/model/authentication-context'
import { SignInCard } from '@/features/auth/ui/sign-in-card'
import { env } from '@/shared/config/env'
import { priceFormatter } from '@/shared/lib/formatters'
import { Button } from '@/shared/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/shared/ui/card'
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
  MagnifyingGlassIcon,
  PencilIcon,
  PlusIcon,
  TrashIcon,
} from '@phosphor-icons/react'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { createFileRoute } from '@tanstack/react-router'
import { useMemo, useState } from 'react'

interface Product {
  id: string
  name: string
  description: string
  price: number
  imageUrl: string
  category: { id: string; name: string }
  featured: boolean
}

interface Category {
  id: string
  name: string
}

const API_URL = env.VITE_API_URL || 'http://localhost:3333'

export const Route = createFileRoute('/admin/products')({
  head: () => ({
    meta: [
      {
        title: 'Gerenciar Produtos | ChefNoBolso',
      },
    ],
  }),
  component: RouteComponent,
})

function RouteComponent() {
  const { session } = useAuthContext()
  const queryClient = useQueryClient()
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [editingProduct, setEditingProduct] = useState<Product | null>(null)
  const [search, setSearch] = useState('')
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    price: '',
    imageUrl: '',
    categoryId: '',
    featured: false,
  })

  const { data: productsData, isLoading: isLoadingProducts } = useQuery({
    queryKey: ['admin-products'],
    queryFn: async () => {
      const response = await fetch(`${API_URL}/products?limit=100`)
      if (!response.ok) throw new Error('Failed to fetch products')
      return response.json()
    },
    enabled: !!session && session.role === 'ADMIN',
  })

  const { data: categoriesData } = useQuery({
    queryKey: ['categories'],
    queryFn: async () => {
      const response = await fetch(`${API_URL}/categories`)
      if (!response.ok) throw new Error('Failed to fetch categories')
      return response.json()
    },
    enabled: !!session && session.role === 'ADMIN',
  })

  const createMutation = useMutation({
    mutationFn: async (data: typeof formData) => {
      const response = await fetch(`${API_URL}/products`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${session?.accessToken}`,
        },
        body: JSON.stringify({
          name: data.name,
          description: data.description,
          price: Number(data.price),
          imageUrl: data.imageUrl,
          category: data.categoryId,
          featured: data.featured,
        }),
      })
      if (!response.ok) throw new Error('Failed to create product')
      return response.json()
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['admin-products'] })
      resetForm()
    },
  })

  const updateMutation = useMutation({
    mutationFn: async ({ id, data }: { id: string; data: typeof formData }) => {
      const response = await fetch(`${API_URL}/products/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${session?.accessToken}`,
        },
        body: JSON.stringify({
          name: data.name,
          description: data.description,
          price: Number(data.price),
          imageUrl: data.imageUrl,
          category: data.categoryId,
          featured: data.featured,
        }),
      })
      if (!response.ok) throw new Error('Failed to update product')
      return response.json()
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['admin-products'] })
      resetForm()
    },
  })

  const deleteMutation = useMutation({
    mutationFn: async (id: string) => {
      const response = await fetch(`${API_URL}/products/${id}`, {
        method: 'DELETE',
        headers: {
          Authorization: `Bearer ${session?.accessToken}`,
        },
      })
      if (!response.ok) throw new Error('Failed to delete product')
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['admin-products'] })
    },
  })

  function resetForm() {
    setFormData({
      name: '',
      description: '',
      price: '',
      imageUrl: '',
      categoryId: '',
      featured: false,
    })
    setEditingProduct(null)
    setIsDialogOpen(false)
  }

  function handleOpenDialog(product?: Product) {
    if (product) {
      setEditingProduct(product)
      setFormData({
        name: product.name,
        description: product.description,
        price: String(product.price),
        imageUrl: product.imageUrl,
        categoryId: product.category?.id || '',
        featured: product.featured,
      })
    } else {
      resetForm()
    }
    setIsDialogOpen(true)
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (editingProduct) {
      updateMutation.mutate({ id: editingProduct.id, data: formData })
    } else {
      createMutation.mutate(formData)
    }
  }

  function handleDelete(id: string) {
    if (confirm('Tem certeza que deseja excluir este produto?')) {
      deleteMutation.mutate(id)
    }
  }

  if (!session) {
    return (
      <main className="page-wrap max-md:pb-30 min-h-[calc(100vh-257px)] pt-10">
        <section className="grid gap-4 place-items-center">
          <h1 className="text-2xl font-semibold">Gerenciar Produtos</h1>
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

  const products: Product[] = productsData?.products || []
  const categories: Category[] = categoriesData?.categories || []

  const filteredProducts = useMemo(() => {
    if (!search.trim()) return products
    return products.filter((product) =>
      product.name.toLowerCase().includes(search.toLowerCase()),
    )
  }, [products, search])

  return (
    <main className="page-wrap max-md:pb-30 min-h-[calc(100vh-257px)] pt-10">
      <section className="grid gap-6">
        <div className="flex items-center justify-between gap-4 max-sm:flex-col">
          <h1 className="text-2xl font-semibold">Gerenciar Produtos</h1>
          <div className="flex items-center gap-3">
            <div className="relative">
              <MagnifyingGlassIcon className="absolute size-4 left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
              <Input
                placeholder="Buscar produto..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="pl-9 w-64"
              />
            </div>
            <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
              <DialogTrigger asChild>
                <Button onClick={() => handleOpenDialog()}>
                  <PlusIcon weight="bold" />
                  Adicionar Produto
                </Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-[500px]">
                <form onSubmit={handleSubmit}>
                  <DialogHeader>
                    <DialogTitle>
                      {editingProduct ? 'Editar Produto' : 'Adicionar Produto'}
                    </DialogTitle>
                    <DialogDescription>
                      {editingProduct
                        ? 'Edite as informações do produto.'
                        : 'Preencha as informações para adicionar um novo produto.'}
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
                      <Label htmlFor="description">Descrição</Label>
                      <Input
                        id="description"
                        value={formData.description}
                        onChange={(e) =>
                          setFormData({
                            ...formData,
                            description: e.target.value,
                          })
                        }
                        required
                      />
                    </div>
                    <div className="grid gap-2">
                      <Label htmlFor="price">Preço</Label>
                      <Input
                        id="price"
                        type="number"
                        step="0.01"
                        min="0"
                        value={formData.price}
                        onChange={(e) =>
                          setFormData({ ...formData, price: e.target.value })
                        }
                        required
                      />
                    </div>
                    <div className="grid gap-2">
                      <Label htmlFor="imageUrl">URL da Imagem</Label>
                      <Input
                        id="imageUrl"
                        value={formData.imageUrl}
                        onChange={(e) =>
                          setFormData({ ...formData, imageUrl: e.target.value })
                        }
                        required
                      />
                    </div>
                    <div className="grid gap-2">
                      <Label htmlFor="category">Categoria</Label>
                      <select
                        id="category"
                        value={formData.categoryId}
                        onChange={(e) =>
                          setFormData({
                            ...formData,
                            categoryId: e.target.value,
                          })
                        }
                        className="flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-xs transition-colors placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50"
                        required
                      >
                        <option value="">Selecione uma categoria</option>
                        {categories.map((category) => (
                          <option key={category.id} value={category.id}>
                            {category.name}
                          </option>
                        ))}
                      </select>
                    </div>
                    <div className="flex items-center gap-2">
                      <input
                        type="checkbox"
                        id="featured"
                        checked={formData.featured}
                        onChange={(e) =>
                          setFormData({
                            ...formData,
                            featured: e.target.checked,
                          })
                        }
                        className="h-4 w-4 rounded border-input"
                      />
                      <Label htmlFor="featured">Produto em destaque</Label>
                    </div>
                  </div>
                  <DialogFooter>
                    <Button type="button" variant="outline" onClick={resetForm}>
                      Cancelar
                    </Button>
                    <Button
                      type="submit"
                      disabled={
                        createMutation.isPending || updateMutation.isPending
                      }
                    >
                      {editingProduct ? 'Salvar' : 'Adicionar'}
                    </Button>
                  </DialogFooter>
                </form>
              </DialogContent>
            </Dialog>
          </div>
        </div>

        {isLoadingProducts ? (
          <div className="text-center py-10">Carregando produtos...</div>
        ) : filteredProducts.length === 0 ? (
          <div className="text-center py-10 text-muted-foreground">
            {search
              ? 'Nenhum produto encontrado para a busca.'
              : 'Nenhum produto encontrado.'}
          </div>
        ) : (
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {filteredProducts.map((product) => (
              <Card key={product.id} className="overflow-hidden">
                <div className="relative aspect-video overflow-hidden">
                  <img
                    src={product.imageUrl}
                    alt={product.name}
                    className="h-full w-full object-cover"
                  />
                </div>
                <CardHeader className="pb-2">
                  <CardTitle className="text-lg">{product.name}</CardTitle>
                  <p className="text-sm text-muted-foreground line-clamp-2">
                    {product.description}
                  </p>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center justify-between">
                    <span className="text-lg font-semibold">
                      {priceFormatter.format(product.price)}
                    </span>
                    <div className="flex gap-2">
                      <Button
                        variant="outline"
                        size="icon-sm"
                        onClick={() => handleOpenDialog(product)}
                      >
                        <PencilIcon weight="bold" />
                      </Button>
                      <Button
                        variant="outline"
                        size="icon-sm"
                        onClick={() => handleDelete(product.id)}
                        className="text-red-600 hover:text-red-600"
                      >
                        <TrashIcon weight="bold" />
                      </Button>
                    </div>
                  </div>
                  {product.category && (
                    <p className="text-xs text-muted-foreground mt-2">
                      Categoria: {product.category.name}
                    </p>
                  )}
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </section>
    </main>
  )
}
