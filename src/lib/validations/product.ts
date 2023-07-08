import { ProductCart, ValueWithPorcentage } from "@/models";
import { z } from "zod";

const valuesSchema: z.Schema<ValueWithPorcentage> = z.object({
  name: z.union([z.string().nonempty('Este campo es requerido.'), z.number().nonnegative('Valor no puede ser negativo.')]),
  porcentage: z.number().nonnegative('Porcentaje no puede ser negativo.')
})
const metadataSchema = z.object({
  name: z.string().trim().min(1, { message: 'Este campo es requerido.' }),
  values: z.lazy(() => valuesSchema)
})

export const productSchema: z.Schema<ProductCart> = z.object(
  {
    id: z.string().nonempty('Este campo es requerido.'),
    title: z.string().nonempty('Este campo es requerido.'),
    slug: z.string().nonempty('Este campo es requerido.'),
    price: z.number().nonnegative('Precio no puede ser negativo.'),
    images: z.array(z.object({ url: z.string().nonempty('Este campo es requerido.'), name: z.string().nonempty('Este campo es requerido.') })),
    metadata: z.array(z.lazy(() => metadataSchema))
  }
)

