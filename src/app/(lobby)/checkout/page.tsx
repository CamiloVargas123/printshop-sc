'use client'
import { Header } from '@/components/Header'
import { Shell } from '@/components/Shell'
import { Form } from '@/components/ui/Form'
import { Separator } from '@/components/ui/Separator'
import { zodResolver } from '@hookform/resolvers/zod'
import { useTransition } from 'react'
import { useForm } from 'react-hook-form'
import { toast } from 'sonner'
import PaymentForm from './components/PaymentForm'
import PersonalDataForm from './components/PersonalDataForm'
import { checkoutInputsSchema } from './lib/validations/personalData'
import { CheckoutInputs, PaymentMethod } from './models'

export default function CheckoutPage() {

  const [isPending, startTransition] = useTransition()
  const form = useForm<CheckoutInputs>({
    resolver: zodResolver(checkoutInputsSchema),
    defaultValues: {
      name: "",
      telephone: "",
      city: "",
      state: "",
      address: "",
      postalCode: "",
      email: "",
      paymentMethod: PaymentMethod.TRANSFER,
      transferReference: "",
    },
  })
  console.log("🚀 ~ file: page.tsx:30 ~ CheckoutPage ~ form:", form.formState.errors)

  function onSubmit(data: CheckoutInputs) {
    startTransition(async () => {
      try {
        console.log("🚀 ~ file: page.tsx:27 ~ onSubmit ~ data:", data)
      } catch (error) {
        const unknownError = "Algo salió mal, por favor intentalo de nuevo."
        toast.error(unknownError)
      }
    })
  }

  return (
    <>
      <Header
        title="Finalizar compra"
      />
      <Form {...form}>
        <form
          className="grid grid-cols-1 lg:grid-cols-[1fr_450px] gap-6"
          onSubmit={(...args) => void form.handleSubmit(onSubmit)(...args)}
        >
          <Shell className='lg:pt-0'>
            <h3 className="text-2xl font-medium text-muted-foreground line-clamp-1 text-center">Datos de envió</h3>
            <PersonalDataForm form={form} />
          </Shell>
          <Shell className='relative items-start auto-rows-min lg:pt-0'>
            <Separator orientation="vertical" className="hidden lg:block absolute -left-2 top-0 lg:-left-3" />
            <Separator orientation="horizontal" className="block lg:hidden absolute left-0 -top-3" />
            <h3 className="text-2xl font-medium text-muted-foreground text-center">Tu pedido</h3>
            <PaymentForm form={form} isPending={isPending} />
          </Shell>
        </form>
      </Form>
    </>
  )
}
