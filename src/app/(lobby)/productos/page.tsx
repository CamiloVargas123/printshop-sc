import { Header } from '@/components/Header'
import { Shell } from '@/components/Shell'
import { AspectRatio } from '@/components/ui/AspectRatio'
import { productCategories } from '@/config/products'
import { slugify } from '@/lib/utils'
import { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'

export const metadata: Metadata = {
  title: "Productos",
  description: "Todos nuestros productos",
}

export default function ProductsPage() {
  return (
    <Shell>
      <Header
        title="Todos nuestros productos"
        description="Encuentra los productos que necesitas"
        size="sm"
      />
      <section>
        <h2 className="text-2xl font-medium mb-2">Categorias</h2>
        <div className="flex gap-4 flex-wrap justify-between sm:justify-center">
          {productCategories.map((category) => (
            <Link
              aria-label={`Ir a ${category}`}
              key={category.title}
              href={`/productos/${slugify(category.title)}`}
              className='w-full sm:max-w-xs'
            >
              <div className="group relative overflow-hidden rounded">
                <AspectRatio ratio={4 / 5}>
                  <div className="absolute inset-0 z-10 bg-muted-foreground/60 transition-colors group-hover:bg-muted-foreground/70" />
                  <Image
                    src={category.image.url}
                    alt={category.image.name}
                    fill
                    className="object-cover transition-transform group-hover:scale-105"
                    loading="lazy"
                  />
                </AspectRatio>
                <div className="absolute inset-0 z-20 flex items-center justify-center">
                  <h3 className="text-2xl font-medium capitalize text-slate-100">
                    {category.title}
                  </h3>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </section>
    </Shell>
  )
}
