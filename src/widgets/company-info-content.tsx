import { cn } from '@/shared/lib/utils'
import { Button } from '@/shared/ui/button'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/shared/ui/tabs'
import {
  CreditCardIcon,
  MoneyIcon,
  PhoneCallIcon,
  PixLogoIcon,
  WhatsappLogoIcon,
} from '@phosphor-icons/react'

const disponibilities = [
  {
    dayName: 'Domingo',
    hour: '10:00 às 17:30',
  },
  {
    dayName: 'Segunda',
    hour: '10:00 às 18:00',
  },
  {
    dayName: 'Terça',
    hour: '10:00 às 18:00',
  },
  {
    dayName: 'Quarta',
    hour: '10:00 às 18:00',
  },
  {
    dayName: 'Quinta',
    hour: '10:00 às 18:00',
  },
  {
    dayName: 'Sexta',
    hour: '10:00 às 18:00',
  },
  {
    dayName: 'Sábado',
    hour: '10:00 às 18:00',
  },
]

export function CompanyInfoContent() {
  const today = new Date().getDay() // 0 (Domingo) a 6 (Sábado)

  const agenda = Array.from({ length: 7 }, (_, i) => {
    const isActive = i === today
    const disponibility = disponibilities[i]

    return (
      <li
        key={i}
        className={cn(
          'flex p-3 justify-between rounded-md w-full',
          isActive && 'bg-input/50',
        )}
      >
        <span>{disponibility.dayName}</span>
        <span className="font-medium">{disponibility.hour}</span>
      </li>
    )
  })

  return (
    <Tabs defaultValue="about">
      <TabsList variant="line" className="px-0 w-full border-b">
        <TabsTrigger value="about">Sobre</TabsTrigger>
        <TabsTrigger value="schedule">Horário</TabsTrigger>
        <TabsTrigger value="payment">Pagamento</TabsTrigger>
      </TabsList>

      <TabsContent value="about" className="px-6 min-h-86 space-y-4 pt-4">
        <section className="grid gap-2">
          <h4 className="text-lg font-semibold">Contato</h4>
          <div className="flex flex-wrap gap-4">
            <Button asChild variant="outline">
              <a
                href="https://wa.me/5583999999999"
                target="_blank"
                rel="noopener noreferrer"
              >
                <WhatsappLogoIcon />
                (83) 9 9999-9999
              </a>
            </Button>
            <Button asChild variant="outline">
              <a
                href="tel:+5583999999999"
                target="_blank"
                rel="noopener noreferrer"
              >
                <PhoneCallIcon weight="fill" />
                (83) 9 9999-9999
              </a>
            </Button>
          </div>
        </section>

        <section className="grid gap-2">
          <h4 className="font-semibold text-lg">Endereço</h4>
          <div>
            <p>R. Odon Bezerra, 300</p>
            <p>Liberdade, Campina Grande - PB</p>
          </div>
        </section>
      </TabsContent>

      <TabsContent value="schedule" className="px-4 space-y-4 pt-2">
        <ul className="w-full mx-auto">{agenda}</ul>
      </TabsContent>

      <TabsContent value="payment" className="px-4 min-h-86 pt-4 space-y-4">
        <div className=" flex-wrap content-start items-start flex gap-4 justify-center">
          <div className="flex items-center bg-input/50 w-max px-4 py-2 rounded gap-2.5">
            <MoneyIcon />
            Dinheiro
          </div>

          <div className="flex items-center bg-input/50 w-max px-4 py-2 rounded gap-2.5">
            <PixLogoIcon weight="fill" />
            Pix
          </div>

          <div className="flex items-center bg-input/50 w-max px-4 py-2 rounded gap-2.5">
            <CreditCardIcon />
            Cartão de Crédito
          </div>

          <div className="flex items-center bg-input/50 w-max px-4 py-2 rounded gap-2.5">
            <CreditCardIcon weight="fill" />
            Cartão de Débito
          </div>
        </div>
      </TabsContent>
    </Tabs>
  )
}
