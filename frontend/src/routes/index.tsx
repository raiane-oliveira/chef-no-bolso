import { AsideShoppingCart } from '@/features/add-to-cart/ui/aside-shopping-cart'
import { ProductCard } from '@/entities/product/ui/product-card'
import { Button } from '@/shared/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/shared/ui/card'
import { Input } from '@/shared/ui/input'
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from '@/shared/ui/select'
import type { Product } from '@/shared/api/types'
import {
  ChefHatIcon,
  GiftIcon,
  HandbagSimpleIcon,
  MagnifyingGlassIcon,
  MapPinIcon,
  XIcon,
} from '@phosphor-icons/react'
import { createFileRoute } from '@tanstack/react-router'
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogHeader,
  DialogOverlay,
  DialogPortal,
  DialogTitle,
  DialogTrigger,
} from '@/shared/ui/dialog'
import { Dialog as DialogPrimitive } from 'radix-ui'
import { priceFormatter } from '@/shared/lib/formatters'
import { useShoppingCartContext } from '@/features/add-to-cart/model/shopping-cart-context'
import { Footer } from '@/widgets/footer'
import { cn } from '@/shared/lib/utils'
import { CompanyInfoContent } from '@/widgets/company-info-content'
export const Route = createFileRoute('/')({
  head: () => ({
    meta: [
      {
        title: 'Início | ChefNoBolso',
      },
    ],
  }),
  component: App,
})

function App() {
  const { orders, totalItemsInCart, totalValue } = useShoppingCartContext()

  return (
    <>
      <main className="md:pt-5 relative after:block after:absolute after:top-0 after:left-0 after:right-0 after:h-[10vh] after:min-h-50 after:max-h-100 after:-z-10 after:bg-accent-foreground">
        <section className="md:page-wrap flex flex-col md:gap-5">
          <div className="w-full bg-white md:p-1 md:rounded-lg h-64 md:h-84">
            <img
              src="https://picsum.photos/1200/300"
              className="w-full h-full object-cover object-center md:rounded-lg"
            />
          </div>

          <div className="flex lg:flex-row flex-col justify-between gap-7">
            <div className="flex md:ml-7 flex-col max-md:-mt-2 max-md:rounded-lg max-md:bg-card items-center md:items-start md:flex-row lg:ml-12 gap-3 md:gap-6 md:-mb-18 lg:mb-0">
              <div className="md:p-1 p-1.5 md:shadow-md w-30 -mt-14 md:mt-0 md:-translate-y-20 flex-1 shrink-0 md:min-w-40 md:max-w-40 rounded-full md:rounded-lg overflow-hidden bg-white">
                <img
                  src="https://picsum.photos/400/400"
                  className="w-full rounded-full shadow-md md:shadow-none md:rounded-lg h-full object-cover"
                />
              </div>

              <div className="flex max-md:pb-1 items-center md:items-start flex-col gap-2">
                <h1 className="md:text-4xl text-2xl font-bold">ChefNoBolso</h1>

                <div className="md:flex items-center flex-wrap lg:items-start lg:flex-col gap-2">
                  <div className="flex max-md:justify-center flex-wrap text-sm md:text-base items-center gap-2 text-gray-600">
                    <span className="text-destructive md:text-base text-sm">
                      Fechado • Abrimos amanhã às 10h00
                    </span>

                    <span className="max-sm:hidden">•</span>

                    <span className="flex items-center gap-2">
                      <MapPinIcon weight="fill" />
                      Campina Grande - PB
                    </span>

                    <span className="lg:hidden max-sm:hidden">•</span>
                  </div>

                  <Dialog>
                    <DialogTrigger asChild>
                      <Button
                        variant="link"
                        className="text-gray-600 max-md:w-full md:mx-0 mx-auto p-0 font-semibold"
                      >
                        Mais informações
                      </Button>
                    </DialogTrigger>

                    <DialogContent className="px-0">
                      <DialogHeader className="flex-row px-4 justify-between items-center">
                        <DialogTitle className="flex text-xl items-center gap-2">
                          <ChefHatIcon size={26} />
                          ChefNoBolso
                        </DialogTitle>

                        <DialogClose className="cursor-pointer">
                          <XIcon />
                        </DialogClose>
                      </DialogHeader>

                      <CompanyInfoContent />
                    </DialogContent>
                  </Dialog>
                </div>
              </div>
            </div>

            <Card className="lg:max-w-80 max-md:max-w-[calc(100%-1.5rem)] max-md:mx-auto gap-3 py-3 rounded-md min-w-40 w-full">
              <CardHeader className="flex px-4 items-center gap-2">
                <div className="rounded-full aspect-square w-9 bg-destructive p-2 text-white">
                  <GiftIcon size="20" />
                </div>
                <CardTitle className="text-sm">
                  Programa de fidelidade
                </CardTitle>
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

        <section className="md:page-wrap mt-5 flex items-start gap-7 justify-between">
          <div className="flex flex-col gap-8.5 flex-1">
            <section className="flex max-md:px-3 justify-between">
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

              <div className="relative hidden md:block overflow-hidden rounded-md bg-card max-w-xs w-full">
                <MagnifyingGlassIcon className="absolute size-4 left-3 top-1/2 -translate-y-1/2 text-(--sea-ink-soft)" />
                <Input
                  placeholder="Busque por um produto"
                  className="pl-9 h-12"
                  aria-label="Busque por um produto"
                />
              </div>

              <Dialog>
                <DialogTrigger className="bg-card border hover:bg-input/50 cursor-pointer border-input px-3 rounded-md md:hidden">
                  <MagnifyingGlassIcon
                    aria-label="Busque por um produto"
                    className="size-5 text-(--sea-ink-soft)"
                  />
                </DialogTrigger>

                <DialogContent>
                  <DialogTitle>Pesquisar</DialogTitle>
                </DialogContent>
              </Dialog>
            </section>

            <section className="flex w-full flex-col gap-5">
              <div className="max-md:px-3">
                <h2 className="text-2xl font-semibold">Destaques</h2>
              </div>

              <div className="max-md:max-w-[calc(100vw-1rem)] max-md:pl-3 touch-pan-x overflow-x-auto py-2 grid md:grid-cols-3 grid-cols-[repeat(3,minmax(270px,1fr))] gap-4">
                {Array.from({ length: 3 }).map((_, i) => {
                  const product: Product = {
                    id: `product-${i}`,
                    name: `Produto ${i + 1}`,
                    description:
                      'lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
                    price: (i + 1) * 10,
                    imageUrl: `https://picsum.photos/400/400?random=${i + 1}`,
                  }
                  return <ProductCard key={i} product={product} />
                })}
              </div>
            </section>

            <section className="flex flex-col gap-5">
              <div className="flex flex-col max-md:px-3 gap-2">
                <h2 className="text-2xl font-semibold">Os mais vendidos</h2>
                <p className="text-muted-foreground font-light">
                  Os melhores dindins do nosso cardápio, os mais vendidos! Esses
                  vão te surpreender.
                </p>
              </div>

              <div className="overflow-x-auto max-md:px-3 grid grid-cols-[repeat(auto-fit,minmax(350px,1fr))] gap-4">
                {Array.from({ length: 6 }).map((_, i) => {
                  const product: Product = {
                    id: `product-${i}`,
                    name: `Produto ${i + 1}`,
                    description:
                      'lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent at vestibulum nisi, et luctus sapien. Praesent nec turpis tortor. Sed eget dapibus felis, in pharetra ex. Nunc sed neque vitae nibh porta ornare vel vel justo. Fusce egestas, nibh id rhoncus egestas, dolor odio dapibus diam, ac ultrices nulla nulla eu nulla. Aenean euismod efficitur sem, nec cursus lorem accumsan in. Sed aliquam turpis et tellus imperdiet, at maximus nulla blandit. Nam finibus lorem risus, ut mollis lacus maximus id.',
                    price: (i + 1) * 10,
                    imageUrl: `https://picsum.photos/400/400?random=${i + 1}`,
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

            <section className="flex flex-col max-md:px-3 gap-5">
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

          <aside className="sticky hidden lg:block max-w-80 w-full top-26.5">
            <AsideShoppingCart className="max-h-[calc(100vh-126px)] " />
          </aside>

          {orders.length > 0 && (
            <aside className="fixed lg:hidden w-full left-0 z-50 bottom-[72.5px]">
              <Dialog>
                <DialogTrigger asChild>
                  <Button className="w-full cursor-pointer rounded-none text-base justify-between py-3 h-auto">
                    <div className="relative">
                      <HandbagSimpleIcon className="size-7" />
                      <span className="absolute size-5 bg-card grid place-items-center text-accent-foreground text-xs rounded-full -bottom-1 -right-2">
                        {totalItemsInCart}
                      </span>
                    </div>
                    Ver sacola
                    <span>{priceFormatter.format(totalValue)}</span>
                  </Button>
                </DialogTrigger>

                <DialogPortal>
                  <DialogOverlay className="grid overflow-y-auto place-items-center">
                    <DialogPrimitive.Content className="fixed w-full inset-0 bg-(--bg-base) grid grid-rows-[auto_1fr]">
                      <DialogHeader className="flex-row p-4 items-center justify-between bg-card">
                        <DialogTitle className="flex items-center gap-2">
                          <ChefHatIcon size={26} />
                          ChefNoBolso
                        </DialogTitle>
                        <DialogClose className="cursor-pointer">
                          <XIcon />
                        </DialogClose>
                      </DialogHeader>

                      <AsideShoppingCart />
                    </DialogPrimitive.Content>
                  </DialogOverlay>
                </DialogPortal>
              </Dialog>
            </aside>
          )}
        </section>
      </main>

      <Footer
        className={cn(
          'lg:hidden border mt-10 mb-15',
          orders.length === 0 ? 'pb-10' : 'pb-20',
        )}
      />
    </>
  )
}
