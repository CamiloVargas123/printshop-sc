'use client'
import { Header } from '@/components/Header'
import { Shell } from '@/components/Shell'
import { Form } from '@/components/ui/Form'
import { Separator } from '@/components/ui/Separator'
import { PaymentMethod, type CheckoutInputs } from '@/models'
import { useAppDispatch, useAppSelector } from '@/redux/hooks'
import { clearCart } from '@/redux/slices/cart'
import { zodResolver } from '@hookform/resolvers/zod'
import { nanoid } from 'nanoid'
import { useRouter } from 'next/navigation'
import { useTransition } from 'react'
import { useForm } from 'react-hook-form'
import { toast } from 'sonner'
import PaymentForm from './components/PaymentForm'
import PersonalDataForm from './components/PersonalDataForm'
import { checkoutInputsSchema } from './lib/validations/personalData'
import { FilesUpload, submitOrder, uploadFile } from './services'

export default function CheckoutPage() {
  const dispatch = useAppDispatch()
  const router = useRouter()
  const cart = useAppSelector(state => state.cart)
  const [isPending, startTransition] = useTransition()
  const form = useForm<CheckoutInputs>({
    resolver: zodResolver(checkoutInputsSchema),
    defaultValues: {
      fullName: "",
      telephone: "",
      city: "",
      state: "",
      address: "",
      postalCode: "",
      email: "",
      paymentMethod: PaymentMethod.TRANSFER,
      transferReference: "",
      note: "",
      addressOptional: "",
    },
  })

  function onSubmit(paymentData: CheckoutInputs) {
    if (cart.items.length === 0) return
    paymentData.note === "" && (paymentData.note = undefined)
    paymentData.addressOptional === "" && (paymentData.note = undefined)
    startTransition(async () => {
      try {
        const idOrder = nanoid()
        const files: Array<FilesUpload> = []
        if (paymentData.files) {
          for (const file of paymentData.files) {
            if (file) {
              const uploadedFile = await uploadFile({ file: file.file, idOrder: idOrder, idProduct: file.idProduct });
              files.push(uploadedFile);
            }
          }
        }
        paymentData.files = undefined
        await submitOrder({ paymentData, cart, files, idOrder }).then(() => {
          toast.success("Tu pedido ha sido enviado, en breve nos pondremos en contacto contigo.", { duration: 5000 })
          dispatch(clearCart())
          setTimeout(() => {
            router.push(`/`)
          }, 5000)
        })

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
          className="grid grid-cols-1 lg:grid-cols-2 gap-6"
          onSubmit={(...args) => void form.handleSubmit(onSubmit)(...args)}
        >
          <Shell className='py-0 md:py-0 px-0 lg:px-4 xl:px-8'>
            <h3 className="text-2xl font-medium text-muted-foreground line-clamp-1 text-center">Datos de envió</h3>
            <PersonalDataForm form={form} />
          </Shell>
          <Shell className='relative items-start auto-rows-min py-0 md:py-0 px-0 lg:px-4 xl:px-8'>
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
