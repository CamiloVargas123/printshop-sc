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
          title: "Imprenta",
          href: "/imprenta",
          description: "Impresión de tarjetas, volantes, flayers, etc.",
          items: [],
        },
        {
          title: "Marketing Digital",
          href: "/marketing-digital",
          description: "Marketing digital, diseño web, deiseño de logo, etc.",
          items: [],
        },
        {
          title: "Manejo de Redes Sociales",
          href: "/manejo-redes-sociales",
          description: "Manejo de redes sociales, diseño de contenido, etc.",
          items: [],
        },
      ],
    },
    ...productCategories.map((category) => ({
      title: category.title,
      items: [
        {
          title: "All",
          href: `/categoria/${slugify(category.title)}`,
          description: `All ${category.title}.`,
          items: [],
        },
        ...category.subcategories.map((subcategory) => ({
          title: subcategory.title,
          href: `/categoria/${slugify(category.title)}/${subcategory.slug}`,
          description: subcategory.description,
          items: [],
        })),
      ],
    })),
  ] satisfies MainNavItem[],
  links: {
    twitter: "https://twitter.com/",
    instagram: "https://instagram.com/",
  },
}
