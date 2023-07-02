'use client'
import { Button } from '@/components/ui/Button'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/Form'
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/Select'
import { TypesCategories, TypesProducts } from '@/config/products'
import { Product } from '@/models'
import { useAppDispatch } from '@/redux/hooks'
import { addToCart } from '@/redux/slices/cart'
import { type ReactNode } from 'react'
import { UseFormReturn, useForm } from 'react-hook-form'
import { v4 as uuidv4 } from 'uuid'

const amountImprenta = ['250', '500', '1000']

const inputs: { [key: string]: { [key: string]: (form: UseFormReturn<Product>) => ReactNode } } = {
  [TypesCategories.IMPRENTA]: {
    [TypesProducts.FLAYERS]: (form) => (
      <>
        <FormField
          control={form.control}
          name="amount"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Cantidad</FormLabel>
              <FormControl>
                <Select
                  value={field.value?.toString()}
                  onValueChange={(value: string) =>
                    field.onChange(Number(value))
                  }
                  defaultValue={field.value?.toString()}
                >
                  <SelectTrigger className="capitalize">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectGroup>
                      {amountImprenta.map(
                        (option) => (
                          <SelectItem
                            key={option}
                            value={option}
                            className="capitalize"
                          >
                            {option}
                          </SelectItem>
                        )
                      )}
                    </SelectGroup>
                  </SelectContent>
                </Select>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      </>
    ),
  },

}

interface AddToCartProps {
  product: Product
}

export default function AddToCart({ product }: AddToCartProps) {
  const categoryType = product.id.split('_')[0]
  const productType = product.id.split('_')[1]

  const form = useForm<Product>({
    defaultValues: {
      ...product,
    },
  })

  function changeIdProduct(data: Product): Product {
    data.id = uuidv4()
    return data
  }

  const dispatch = useAppDispatch()
  function onSubmit(data: Product) {
    dispatch(addToCart(changeIdProduct(data)))
  }
  const formIputs = inputs[categoryType][productType]
  if (!formIputs) return null

  return (
    <Form {...form}>
      <form className="grid gap-4 rounded-sm border bg-card text-card-foreground shadow-sm p-2" onSubmit={form.handleSubmit(onSubmit)}>
        {
          formIputs(form)
        }
        <Button>
          Añadir al carrito
          <span className="sr-only">Añadir al carrito</span>
        </Button>
      </form>
    </Form>
  )
}