import { AsideShoppingCart } from '@/components/aside-shopping-cart'
import { ProductCard } from '@/components/product-card'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import type { Product } from '@/shared/api/types'
import {
  GiftIcon,
  MagnifyingGlassIcon,
  MapPinIcon,
} from '@phosphor-icons/react'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/')({ component: App })

function App() {
  return (
    <main className="pt-5 relative after:block after:absolute after:top-0 after:left-0 after:right-0 after:h-[10vh] after:min-h-50 after:max-h-100 after:-z-10 after:bg-accent-foreground">
      <section className="page-wrap flex flex-col gap-5">
        <div className="w-full bg-white p-1 rounded-lg h-84">
          <img
            src="https://picsum.photos/1200/300"
            className="w-full h-full object-cover rounded-lg"
          />
        </div>

        <div className="flex justify-between gap-7">
          <div className="flex gap-6">
            <div className="p-1 shadow-md -translate-y-20 flex-1 shrink-0 h-40 rounded-lg aspect-square bg-white">
              <img
                src="https://picsum.photos/400/400"
                className="w-full rounded-lg h-full object-cover"
              />
            </div>

            <div className="flex items-start flex-col gap-2">
              <h1 className="text-4xl font-bold">Lanchonete</h1>
              <div className="flex items-center gap-2 text-gray-600">
                <span className="text-destructive">
                  Fechado • Abrimos amanhã às 10h00
                </span>

                <span>•</span>

                <span className="flex items-center gap-2">
                  <MapPinIcon weight="fill" />
                  Campina Grande - PB
                </span>
              </div>

              <Button
                variant="link"
                className="text-gray-600 p-0 font-semibold"
              >
                Mais informações
              </Button>
            </div>
          </div>

          <Card className="max-w-80 gap-3 py-3 rounded-md min-w-40 w-full">
            <CardHeader className="flex px-4 items-center gap-2">
              <div className="rounded-full aspect-square w-9 bg-destructive p-2 text-white">
                <GiftIcon size="20" />
              </div>
              <CardTitle className="text-sm">Programa de fidelidade</CardTitle>
            </CardHeader>
            <CardContent className="px-4 space-y-2">
              <p className="text-sm text-gray-800">
                A cada <strong>R$ 1,00</strong> em compras você ganha{' '}
                <strong>1 ponto</strong> que pode ser trocado por prêmios.
              </p>
              <p className="text-sm text-gray-800">
                Os novos clientes ganham automaticamente{' '}
                <strong>50 pontos</strong>.
              </p>
            </CardContent>
          </Card>
        </div>
      </section>

      <section className="page-wrap mt-5 flex items-start gap-7 justify-between">
        <div className="flex flex-col gap-8.5 flex-1">
          <section className="flex justify-between">
            <Select>
              <SelectTrigger className="w-full bg-card data-[size=default]:h-full rounded-sm max-w-48">
                <SelectValue placeholder="Lista de categorias" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectLabel>Categorias</SelectLabel>
                  <SelectItem value="apple">Apple</SelectItem>
                  <SelectItem value="banana">Banana</SelectItem>
                  <SelectItem value="blueberry">Blueberry</SelectItem>
                  <SelectItem value="grapes">Grapes</SelectItem>
                  <SelectItem value="pineapple">Pineapple</SelectItem>
                </SelectGroup>
              </SelectContent>
            </Select>

            <div className="relative bg-card max-w-xs w-full">
              <MagnifyingGlassIcon className="absolute size-4 left-3 top-1/2 -translate-y-1/2 text-(--sea-ink-soft)" />
              <Input
                placeholder="Busque por um produto"
                className="pl-9 h-12"
                aria-label="Busque por um produto"
              />
            </div>
          </section>

          <section className="flex flex-col gap-5">
            <div>
              <h2 className="text-2xl font-semibold">Destaques</h2>
            </div>

            <div className="overflow-x-auto py-2 grid grid-cols-3 gap-4">
              {Array.from({ length: 3 }).map((_, i) => {
                const product: Product = {
                  id: `product-${i}`,
                  name: `Produto ${i + 1}`,
                  description: 'Descrição do produto',
                  price: (i + 1) * 10,
                  imageUrl: `https://picsum.photos/200/200?random=${i + 1}`,
                }

                return <ProductCard key={i} product={product} />
              })}
            </div>
          </section>

          <section className="flex flex-col gap-5">
            <div className="flex flex-col gap-2">
              <h2 className="text-2xl font-semibold">Os mais vendidos</h2>
              <p className="text-muted-foreground font-light">
                Os melhores dindins do nosso cardápio, os mais vendidos! Esses
                vão te surpreender.
              </p>
            </div>

            <div className="overflow-x-auto grid grid-cols-[repeat(auto-fit,minmax(350px,1fr))] gap-4">
              {Array.from({ length: 6 }).map((_, i) => {
                const product: Product = {
                  id: `product-${i}`,
                  name: `Produto ${i + 1}`,
                  description:
                    'lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent at vestibulum nisi, et luctus sapien. Praesent nec turpis tortor. Sed eget dapibus felis, in pharetra ex. Nunc sed neque vitae nibh porta ornare vel vel justo. Fusce egestas, nibh id rhoncus egestas, dolor odio dapibus diam, ac ultrices nulla nulla eu nulla. Aenean euismod efficitur sem, nec cursus lorem accumsan in. Sed aliquam turpis et tellus imperdiet, at maximus nulla blandit. Nam finibus lorem risus, ut mollis lacus maximus id.',
                  price: (i + 1) * 10,
                  imageUrl: `https://picsum.photos/200/200?random=${i + 1}`,
                }

                return (
                  <ProductCard
                    orientation="horizontal"
                    key={i}
                    product={product}
                  />
                )
              })}
            </div>
          </section>

          <section className="flex flex-col gap-5">
            <div className="flex flex-col gap-2">
              <h2 className="text-2xl font-semibold">Dindins Gourmets</h2>
              <p className="text-muted-foreground font-light">
                Nossa variedade de sabores irresistíveis!
              </p>
            </div>

            <div className="overflow-x-auto grid grid-cols-[repeat(auto-fit,minmax(350px,1fr))] gap-4">
              {Array.from({ length: 9 }).map((_, i) => {
                const product: Product = {
                  id: `product-${i}`,
                  name: `Produto ${i + 1}`,
                  description:
                    'lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent at vestibulum nisi, et luctus sapien. Praesent nec turpis tortor. Sed eget dapibus felis, in pharetra ex. Nunc sed neque vitae nibh porta ornare vel vel justo. Fusce egestas, nibh id rhoncus egestas, dolor odio dapibus diam, ac ultrices nulla nulla eu nulla. Aenean euismod efficitur sem, nec cursus lorem accumsan in. Sed aliquam turpis et tellus imperdiet, at maximus nulla blandit. Nam finibus lorem risus, ut mollis lacus maximus id.',
                  price: (i + 1) * 10,
                  imageUrl: `https://picsum.photos/200/200?random=${i + 1}`,
                }

                return (
                  <ProductCard
                    orientation="horizontal"
                    key={i}
                    product={product}
                  />
                )
              })}
            </div>
          </section>
        </div>

        <aside className="sticky max-w-80 w-full top-26.5">
          <AsideShoppingCart />
        </aside>
      </section>
    </main>
  )
}
