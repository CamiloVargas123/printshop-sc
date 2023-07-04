import { Header } from '@/components/Header'
import { ProductCard } from '@/components/ProductCard'
import { productCategories } from '@/config/products'
import { slugify } from '@/lib/utils'
import { notFound } from 'next/navigation'

export default async function CategoryPage({ params }: { params: { category: string } }) {
  const category = productCategories.find((category) => slugify(category.title) === params.category)
  if (!category) return notFound()
  const products = category.products

  return (
    <>
      <Header
        title={category.title}
        size="sm"
      />
      <section className='grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4'>
        {
          products.map((product) => (
            <ProductCard key={product.title} categoryPath={slugify(category.title)} product={product} />
          ))
        }
      </section>
    </>
  )
}