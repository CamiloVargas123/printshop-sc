import { MainNavItem } from "@/models"

import { productCategories } from "@/config/products"
import { slugify } from "@/lib/utils"

export type SiteConfig = typeof siteConfig

export const siteConfig = {
  name: "printshop-sc",
  description:
    "Servicios de impresión digital ofrece impresiones personalizadas de alta calidad para diversos productos promocionales y materiales publicitarios",
  url: "http://localhost:3000/",
  ogImage: "",
  mainNav: [
    {
      title: "Lobby",
      items: [
        {
          title: "Productos",
          href: "/productos",
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
          href: `/productos/${slugify(category.title)}`,
        },
        ...category.products.map((product) => ({
          title: product.title,
          href: `/productos/${slugify(category.title)}/${product.slug}`,
          description: product.description,
        })),
      ],
    })),
  ] satisfies MainNavItem[],
  links: {
    twitter: "https://twitter.com/",
    instagram: "https://instagram.com/",
  },
}
