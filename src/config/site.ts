import { MainNavItem } from "@/models"

import { productCategories } from "@/config/products"
import { slugify } from "@/lib/utils"
import { env } from "@/env.mjs"

export type SiteConfig = typeof siteConfig

export const siteConfig = {
  name: "Big Safe",
  description:
    "Descubre cómo Big Safe, marketing & technologys puede mejorar tus estrategias de marketing y tecnología. ¡Aprovecha su potencial para impulsar tu negocio!",
  url: env.NEXT_PUBLIC_APP_URL,
  ogImage: `${env.NEXT_PUBLIC_APP_URL}/opengraph-image.png}`,
  mainNav: [
    {
      title: "Lobby",
      items: [
        {
          title: "Productos",
          href: "/products",
          description: "Productos y servicios disponibles",
        },
        {
          title: "Contacto",
          href: "/contacto",
          description: "Contacta con nosotros",
        },
        {
          title: "Blog",
          href: "/blog",
          description: "Blog de noticias y novedades",
        },
      ],
    },
    ...productCategories.map((category) => ({
      title: category.title,
      items: [
        {
          title: "Todo",
          href: `/products/${slugify(category.title)}`,
        },
        ...category.products.map((product) => ({
          title: product.title,
          href: `/products/${slugify(category.title)}/${product.slug}`,
          description: product.description,
        })),
      ],
    })),
  ] satisfies MainNavItem[],
  /* links: {
    twitter: "https://twitter.com/",
    instagram: "https://instagram.com/",
  }, */
}
