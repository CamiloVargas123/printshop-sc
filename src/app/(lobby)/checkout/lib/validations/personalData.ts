import { z } from "zod"
import { CheckoutInputs } from "../../models"

export const checkoutInputsSchema: z.Schema<CheckoutInputs> = z.object({
  name: z.string().nonempty('Este campo es requerido.'),
  telephone: z.string().nonempty('Este campo es requerido.').regex(/^(\+\d{1,3})?\d{7,15}$/, 'Teléfono inválido.'),
  city: z.string().nonempty('Este campo es requerido.'),
  state: z.string().nonempty('Este campo es requerido.'),
  address: z.string().nonempty('Este campo es requerido.'),
  addressOptional: z.string().optional(),
  postalCode: z.string().nonempty('Este campo es requerido.').regex(/^\d{3,9}$/, 'Código postal inválido.'),
  email: z.string().email('Email inválido.').optional(),
  note: z.string().optional(),
})