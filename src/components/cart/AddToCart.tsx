'use client'
import { Button } from '@/components/ui/Button'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/Form'
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/Select'
import { formatPrice } from '@/lib/utils'
import { productSchema } from '@/lib/validations/product'
import { Product, ProductCart } from '@/models'
import { useAppDispatch } from '@/redux/hooks'
import { addToCart } from '@/redux/slices/cart'
import { zodResolver } from '@hookform/resolvers/zod'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { v4 as uuidv4 } from 'uuid'

interface AddToCartProps {
  product: Product
}

export default function AddToCart(props: AddToCartProps) {
  const [product, setProduct] = useState(props.product)

  const defaultValues = {
    ...props.product,
    metadata: props.product.metadata.map((item) => ({ ...item, values: item.values[0] })),
  }
  const form = useForm<ProductCart>({
    resolver: zodResolver(productSchema),
    defaultValues: defaultValues,
  })

  function changeIdProduct(data: ProductCart): ProductCart {
    data.id = uuidv4()
    return data
  }

  const dispatch = useAppDispatch()
  function onSubmit(data: ProductCart) {
    dispatch(addToCart(changeIdProduct(data)))
  }

  function getSelectedValues({ name, value }: { name: string, value: string }) {
    return props.product.metadata.find((item) => item.name === name)?.values.find((item) => String(item.name) === value)
  }
  function onChangePrice() {
    const basePrice = props.product.price
    const getMetadataValues = form.getValues('metadata')
    const newPrice = getMetadataValues.reduce((acc, item) => {
      if (item.values.porcentage === 1) return acc
      return acc * item.values.porcentage
    }, basePrice)
    form.setValue('price', newPrice)
    setProduct({ ...product, price: newPrice })
  }

  return (
    <div className='flex flex-col gap-4'>
      <span className="text-2xl text-primary tracking-tighter font-mono">{formatPrice(product.price)}</span>
      <Form {...form}>
        <form className="grid gap-4 rounded-sm border bg-card text-card-foreground shadow-sm p-2" onSubmit={form.handleSubmit(onSubmit)}>
          {
            defaultValues.metadata.map((input, idx) => {
              return (
                <FormField
                  key={input.name}
                  control={form.control}
                  name={`metadata.${idx}`}
                  render={({ field }) => {
                    return <FormItem>
                      <FormLabel>{input.name}</FormLabel>
                      <FormControl>
                        <Select
                          value={field.value.values.name.toString()}
                          onValueChange={(value: string) => {
                            const newValues = getSelectedValues({ name: input.name, value })
                            if (newValues) {
                              field.onChange({ ...field.value, values: { ...newValues } })
                              onChangePrice()
                            }
                          }
                          }
                          defaultValue={field.value.values.name.toString()}
                        >
                          <SelectTrigger className="capitalize">
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectGroup>
                              {product.metadata[idx].values.map(
                                (option) => (
                                  <SelectItem
                                    key={option.name}
                                    value={option.name.toString()}
                                    className="capitalize"
                                  >
                                    {option.name}
                                  </SelectItem>
                                )
                              )}
                            </SelectGroup>
                          </SelectContent>
                        </Select>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  }}
                />
              )
            })
          }
          <Button>
            Añadir al carrito
            <span className="sr-only">Añadir al carrito</span>
          </Button>
        </form>
      </Form>
    </div>
  )
}