import { Header } from '@/components/Header'
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

export default async function ProductsPage() {
  return (
    <>
      <Header
        title="Todas nuestras categorias"
        description="Sleeciona la categorias que necesitas para encontrar más facilmente lo que buscas"
        size="sm"
      />
      <section>
        <h2 className="text-2xl font-medium mb-2">Categorias</h2>
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {productCategories.map((category) => (
            <Link
              aria-label={`Ir a ${category}`}
              key={category.title}
              href={`/products/${slugify(category.title)}`}
            >
              <div className="group relative overflow-hidden rounded">
                <AspectRatio ratio={4 / 5}>
                  <div className="absolute inset-0 z-10 bg-muted-foreground/60 transition-colors group-hover:bg-muted-foreground/70" />
                  <Image
                    src={category.image.url}
                    alt={category.image.name}
                    fill
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    className="object-cover transition-transform group-hover:scale-105"
                    priority
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
    </>
  )
}

export async function generateStaticParams() {
  return productCategories.map((category) => slugify(category.title))
}