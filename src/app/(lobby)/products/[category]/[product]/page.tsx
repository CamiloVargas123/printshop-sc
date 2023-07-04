import { Icons } from "@/components/Icons"
import AddToCart from "@/components/cart/AddToCart"
import { AspectRatio } from "@/components/ui/AspectRatio"
import { Separator } from "@/components/ui/Separator"
import { productCategories } from "@/config/products"
import { slugify } from "@/lib/utils"
import Image from "next/image"
import { notFound } from "next/navigation"

export default async function ProductPage({ params }: { params: { category: string, product: string } }) {
  const product = productCategories.find((category) => slugify(category.title) === params.category)?.products.find((product) => slugify(product.slug) === params.product)
  if (!product) return notFound()
  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-4 lg:gap-6">
        <AspectRatio ratio={4 / 5}>
          {product.images.length ? (
            <Image
              src={product.images[0].url}
              alt={product.images[0].name}
              fill
              className="object-cover"
              loading="lazy"
            />
          ) : (
            <div className="flex h-full items-center justify-center bg-secondary rounded-sm">
              <Icons.placeholder
                className="h-9 w-9 text-muted-foreground"
                aria-hidden="true"
              />
            </div>
          )}
        </AspectRatio>
        <div className="flex flex-col gap-4 relative">
          <Separator orientation="vertical" className="hidden md:block absolute -left-2 top-0 lg:-left-3" />
          <Separator orientation="horizontal" className="block md:hidden absolute left-0 -top-3" />
          <h1 className="text-3xl font-bold tracking-tight">{product.title}</h1>
          <AddToCart product={product} />
        </div>
      </div>
    </>
  )
}

export async function generateStaticParams({
  params: { categoryPath },
}: {
  params: { categoryPath: string }
}) {
  return productCategories.map((category) => {
    if (slugify(category.title) === categoryPath) {
      return category.products.map((product) => ({ product: product.slug }))
    }
  })
}