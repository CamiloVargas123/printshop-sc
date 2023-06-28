import { MainNavItem } from "@/models"

interface ProductCategory extends MainNavItem {
  title: string
  subcategories: {
    title: string
    description?: string
    image?: string
    slug?: string
  }[]
}

export const productCategories: ProductCategory[] = [
  {
    title: "imprenta",
    subcategories: [
      {
        title: "Tarjeta de visita",
        slug: "tarjeta-de-visita",
      },
      {
        title: "Posters",
        slug: "posters",
      },
      {
        title: "Adesivos",
        slug: "adesivos",
      },
      {
        title: "Pendon",
        slug: "pendon",
      },
      {
        title: "Flayers",
        slug: "flayers",
      },
    ],
  },
  {
    title: "Digital",
    subcategories: [
      {
        title: "Manejo de Redes Sociales",
        slug: "manejo-redes-sociales",
      },
      {
        title: "Diseño de Paginas Web",
        slug: "diseno-paginas-web",
      },
      {
        title: "Diseño de contenido",
        slug: "diseno-contenido",
      }
    ],
  }
]

export const productTags = [
  "new",
  "sale",
  "bestseller",
  "featured",
  "popular",
  "trending",
  "limited",
  "exclusive",
]