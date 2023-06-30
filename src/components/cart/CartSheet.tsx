'use client'

import { Icons } from "@/components/Icons"
import { UpdateCart } from "@/components/cart/UpdateCart"
import { Badge } from "@/components/ui/Badge"
import { Button } from "@/components/ui/Button"
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
import { formatPrice, unslugify } from "@/lib/utils"
import { useAppSelector } from "@/redux/hooks"
import Image from "next/image"

export function CartSheet() {
  const { items, amountAll } = useAppSelector(state => state.cart)
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
                  {items.map((item) => (
                    <div key={item.id} className="space-y-3">
                      <div className="flex items-center space-x-4">
                        <div className="relative h-16 w-16 overflow-hidden rounded">
                          {item.images.length ? (
                            <Image
                              src={
                                item.images[0]?.url ??
                                "/images/product-placeholder.webp"
                              }
                              alt={item.images[0]?.name ?? item.title}
                              fill
                              className="absolute object-cover"
                              loading="lazy"
                            />
                          ) : (
                            <div className="flex h-full items-center justify-center bg-secondary">
                              <Icons.placeholder
                                className="h-4 w-4"
                                aria-hidden="true"
                              />
                            </div>
                          )}
                        </div>
                        <div className="grid grid-cols-[80px_1fr] text-sm flex-1">
                          <span className="line-clamp-1 font-semibold col-span-2">{item.title}</span>
                          <span className="line-clamp-1">Cantidad:</span>
                          <span className="line-clamp-1 text-muted-foreground">{item.amount}</span>
                          <span className="line-clamp-1">Precio:</span>
                          <span className="line-clamp-1 text-muted-foreground">{formatPrice(item.price)}</span>
                          {
                            item.metadata?.map((meta) => (
                              <>
                                <span key={meta.name} className="line-clamp-1">{`${meta.name}:`}</span>
                                <span key={meta.value} className="line-clamp-1 text-muted-foreground">{meta.value}</span>
                              </>
                            ))
                          }
                          <span className="line-clamp-1 text-xs capitalize text-muted-foreground col-span-2">{unslugify(item.slug)}</span>
                        </div>
                        <UpdateCart cartItem={item} />
                      </div>
                      <Separator />
                    </div>
                  ))}
                </div>
              </ScrollArea>
            </div>
            <div className="grid gap-1.5 pr-6 text-sm">
              <Separator className="mb-2" />
              <div className="flex">
                <span className="flex-1">Subtotal</span>
                <span>{formatPrice(3.80.toFixed(2))}</span>
              </div>
              <div className="flex">
                <span className="flex-1">Envio</span>
                <span>Gratis</span>
              </div>
              <div className="flex">
                <span className="flex-1">IVA ~ 21% (España)</span>
                <span>Calcular al pagar</span>
              </div>
              <Separator className="mt-2" />
              <div className="flex">
                <span className="flex-1">Total</span>
                <span>{formatPrice((3.8 * 1.21).toFixed(2))}</span>
              </div>
              <SheetFooter className="mt-1.5">
                <Button
                  aria-label="Proceed to checkout"
                  size="sm"
                  className="w-full"
                >
                  Proceder a pagar
                </Button>
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
