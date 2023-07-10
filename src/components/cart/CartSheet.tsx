'use client'

import { Icons } from "@/components/Icons"
import ItemCart from "@/components/cart/ItemCart"
import { UpdateCart } from "@/components/cart/UpdateCart"
import { Badge } from "@/components/ui/Badge"
import { Button, buttonVariants } from "@/components/ui/Button"
import { ScrollArea } from "@/components/ui/ScrollArea"
import { Separator } from "@/components/ui/Separator"
import {
  Sheet,
  SheetContent,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/Sheet"
import { IVA, formatPrice } from "@/lib/utils"
import { useAppSelector } from "@/redux/hooks"
import Link from "next/link"

export function CartSheet() {
  const { items, amountAll, subTotal } = useAppSelector(state => state.cart)
  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button
          aria-label="Cart"
          variant="outline"
          size="icon"
          className="relative"
        >
          {amountAll > 0 && (
            <Badge
              variant="secondary"
              className="absolute -right-2 -top-2 h-6 w-6 rounded-full p-2"
            >
              {amountAll}
            </Badge>
          )}
          <Icons.cart className="h-4 w-4" aria-hidden="true" />
        </Button>
      </SheetTrigger>
      <SheetContent className="flex w-full flex-col pr-0 sm:max-w-lg">
        <SheetHeader className="px-1">
          <SheetTitle>Carrito {amountAll > 0 && `(${amountAll})`}</SheetTitle>
        </SheetHeader>
        <Separator />
        {amountAll > 0 ? (
          <>
            <div className="flex flex-1 flex-col gap-5 overflow-hidden">
              <ScrollArea className="h-full">
                <div className="flex flex-col gap-5 pr-6">
                  {items.map(item => <ItemCart key={item.id} item={item}><UpdateCart cartItem={item} /></ItemCart>)}
                </div>
              </ScrollArea>
            </div>
            <div className="grid gap-1.5 pr-6 text-sm">
              <Separator className="mb-2" />
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
              <Separator className="mt-2" />
              <div className="flex">
                <span className="flex-1">Total</span>
                <span>{formatPrice((subTotal * IVA).toFixed(2))}</span>
              </div>
              <SheetFooter className="mt-1.5">
                <SheetTrigger asChild>
                  <Link
                    href="/checkout"
                    aria-label="Proceed to checkout"
                    className={buttonVariants({ className: "w-full h-10" })}
                  >
                    Proceder a pagar
                  </Link>
                </SheetTrigger>
              </SheetFooter>
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
      </SheetContent>
    </Sheet>
  )
}