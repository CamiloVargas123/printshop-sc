import { Icons } from "@/components/Icons";
import ItemCart from "@/components/cart/ItemCart";
import { Button } from "@/components/ui/Button";
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/Form";
import { Input } from "@/components/ui/Input";
import { Label } from "@/components/ui/Label";
import { Separator } from "@/components/ui/Separator";
import { IVA, formatPrice } from "@/lib/utils";
import { useAppSelector } from "@/redux/hooks";
import { ScrollArea } from "@radix-ui/react-scroll-area";
import { Fragment } from "react";
import { UseFormReturn } from "react-hook-form";
import { CheckoutInputs, PaymentMethod } from "../models";
import Link from "next/link";

const PaymentMethodInfo: Record<PaymentMethod, React.ReactNode> = {
  [PaymentMethod.TRANSFER]: <p className="text-sm text-muted-foreground col-span-2">Paga por transferencia bancaria, <Link href="/how-to-pay" className="underline text-blue-500" target="_blank">¿Como pagar?</Link></p>,
}

interface PaymentFormProps {
  form: UseFormReturn<CheckoutInputs>
  isPending: boolean
}

export default function PaymentForm({ isPending, form }: PaymentFormProps) {
  const { items, amountAll, subTotal } = useAppSelector(state => state.cart)

  return (
    <div className="flex w-full flex-col gap-4">
      <p className="text-lg font-semibold text-foreground">Productos{` (${amountAll})`}</p>
      <Separator />
      {amountAll > 0 ? (
        <>
          <div className="flex flex-1 flex-col gap-5 overflow-hidden">
            <ScrollArea className="max-h-[250px] overflow-y-auto">
              <div className="flex flex-col gap-5">
                {items.map(item => <ItemCart key={item.id} item={item} />)}
              </div>
            </ScrollArea>
          </div>
          <Separator />
          <div className="grid gap-1.5 text-sm">
            <div className="flex">
              <span className="flex-1">Subtotal</span>
              <span>{formatPrice(subTotal.toFixed(2))}</span>
            </div>
            <div className="flex">
              <span className="flex-1">Envio</span>
              <span>Gratis</span>
            </div>
            <div className="flex">
              <span className="flex-1">IVA ~ 21% (España)</span>
              <span>{formatPrice((subTotal * (IVA - 1)).toFixed(2))}</span>
            </div>
            <Separator className="my-2" />
            <div className="flex">
              <span className="flex-1 font-semibold">Total</span>
              <span className="font-semibold">{formatPrice((subTotal * IVA).toFixed(2))}</span>
            </div>
          </div>
        </>
      ) : (
        <div className="flex h-full flex-col items-center justify-center space-y-2">
          <Icons.cart
            className="h-12 w-12 text-muted-foreground"
            aria-hidden="true"
          />
          <span className="text-lg font-medium text-muted-foreground">
            Tu carrito de compra está vacío
          </span>
        </div>
      )}
      <Separator />
      <FormField
        control={form.control}
        name="paymentMethod"
        render={({ field }) => (
          <FormItem className="grid grid-cols-[1rem_1fr] space-y-0 gap-2">
            {
              Object.values(PaymentMethod).map((method, index) => (
                <Fragment key={method}>
                  <Input
                    type='radio'
                    className="w-4 h-4 rounded-full border border-input bg-background text-primary flex-shrink-0"
                    {...field}
                    value={method}
                    id={`r${index}`}
                    name="paymentMethod"
                    checked={method === field.value}
                  />
                  <Label htmlFor={`r${index}`} className="w-full">
                    {method}
                  </Label>
                  {
                    method === field.value && PaymentMethodInfo[method]
                  }
                  {
                    method === field.value && method === PaymentMethod.TRANSFER && (
                      <FormField
                        control={form.control}
                        name="transferReference"
                        render={({ field }) => (
                          <FormItem className="col-span-full">
                            <FormLabel required>Referencia Bancaria</FormLabel>
                            <FormControl>
                              <Input {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    )
                  }
                </Fragment>
              ))
            }
            <FormMessage className="col-span-full" />
          </FormItem>
        )}
      />
      <Separator />
      <Button disabled={isPending || amountAll <= 0}>
        {isPending && (
          <Icons.spinner
            className="mr-2 h-4 w-4 animate-spin"
            aria-hidden="true"
          />
        )}
        Realizar pedido
        <span className="sr-only">Realizar pedido</span>
      </Button>
    </div>
  )
}