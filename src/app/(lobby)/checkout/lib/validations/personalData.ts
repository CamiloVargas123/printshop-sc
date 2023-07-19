import { CheckoutInputs, PaymentMethod } from "@/models"
import { z } from "zod"

const acceptTypesFiles = ['image/png', 'image/jpeg', 'image/jpg', 'application/pdf']
const telephoneRegex = /^(\+\d{1,3})?\d{7,15}$/

const filesSchema = z.object({
  idProduct: z.string(),
  file: z.instanceof(File)
}).refine((data) => {
  return data?.file && acceptTypesFiles.includes(data.file.type)
},
  {
    message: 'Formato de archivo inválido.',
  }
).optional()

export const checkoutInputsSchema: z.Schema<CheckoutInputs> = z.object({
  fullName: z.string().nonempty('Este campo es requerido.'),
  telephone: z.string().nonempty('Este campo es requerido.').regex(telephoneRegex, 'Teléfono inválido.'),
  city: z.string().nonempty('Este campo es requerido.'),
  state: z.string().nonempty('Este campo es requerido.'),
  address: z.string().nonempty('Este campo es requerido.'),
  addressOptional: z.string().optional(),
  postalCode: z.string().nonempty('Este campo es requerido.').regex(/^\d{3,9}$/, 'Código postal inválido.'),
  email: z.string().email('Email inválido.').optional(),
  note: z.string().optional(),
  paymentMethod: z.nativeEnum(PaymentMethod, { required_error: 'Este campo es requerido.' }),
  transferReference: z.string(),
  files: z.array(filesSchema),
}).refine(data => {
  return data.paymentMethod === PaymentMethod.TRANSFER
    ? data.transferReference !== undefined && data.transferReference !== ''
    : true
}, {
  message: 'Este campo es requerido.',
  path: ['transferReference'],
})