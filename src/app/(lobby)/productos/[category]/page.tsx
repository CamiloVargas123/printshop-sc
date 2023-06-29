'use client'

import { Header } from '@/components/Header'
import { ProductCard } from '@/components/ProductCard'
import { Shell } from '@/components/Shell'
import { productCategories } from '@/config/products'
import { slugify } from '@/lib/utils'
import { usePathname } from 'next/navigation'

export default function CategoryPage() {
  const categoryPath = usePathname().split('/').at(-1)
  const category = productCategories.filter((category) => slugify(category.title) === categoryPath)[0]
  const subCategories = category.subcategories

  return (
    <Shell>
      <Header
        title={category.title}
        size="sm"
      />
      <section className='grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4'>
        {
          subCategories.map((subCategory) => (
            <ProductCard key={subCategory.title} product={subCategory} />
          ))
        }
      </section>
    </Shell>
  )
}
