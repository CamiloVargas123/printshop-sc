import { Icons } from "@/components/Icons";
import { formatPrice } from "@/lib/utils";
import { ProductCart } from "@/models";
import Image from "next/image";
import { Fragment } from "react";
import { Separator } from "@/components/ui/Separator";

interface ItemCartProps {
  item: ProductCart
  children?: React.ReactNode
}

export default function ItemCart({ item, children }: ItemCartProps) {
  return (
    <div className="space-y-3 min-w-full">
      <div className="flex flex-col gap-2 sm:gap-4 sm:flex-row items-center">
        <div className="relative h-16 w-16 overflow-hidden rounded">
          {item.images.length && item.images[0].url !== '' ? (
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
            <div className="flex h-full items-center justify-center bg-muted">
              <Icons.placeholder
                className="h-4 w-4"
                aria-hidden="true"
              />
            </div>
          )}
        </div>
        <div className="grid grid-cols-[155px,1fr] text-sm flex-1">
          <span className="line-clamp-1 font-semibold col-span-2">{item.title}</span>
          <span className="line-clamp-1">Precio:</span>
          <span className="line-clamp-1 text-muted-foreground">{formatPrice(item.price)}</span>
          {
            item.metadata.map(meta => (
              <Fragment key={meta.name}>
                <span className="line-clamp-1" title={meta.name}>{`${meta.name}:`}</span>
                <span className="line-clamp-1 text-muted-foreground" title={String(meta.values.name)}>{meta.values.name}</span>
              </Fragment>
            ))
          }
        </div>
        {children}
      </div>
      <Separator />
    </div>
  )
}