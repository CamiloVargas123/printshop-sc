import { sortArrayString } from "@/lib/utils"

interface ProductCategory {
  title: string
  subcategories: {
    title: string
    description?: string
    image?: string
    items?: string[]
    slug: string
  }[]
}

export const productCategories: ProductCategory[] = [
  {
    title: "imprenta",
    subcategories: [
      {
        title: "Imprenta",
        description: "Todo tipo de impresiones",
        items: sortArrayString(["Tarjeta de visita", "Posters", "Adesivos", "Pendon", "Flayers"]),
        slug: "imprenta",
      },
      {
        title: "Oficina",
        description: "Impresiones para oficina",
        slug: "office",
      },
      {
        title: "Gran Formato",
        description: "Impresiones de gran formato",
        slug: "large-format",
      },
      {
        title: "Textil",
        description: "Impresiones en textil",
        slug: "textile",
      },
      {
        title: "Merchandising",
        description: "Merchandising",
        slug: "merchandising",
      },
    ],
  },
  {
    title: "Marketing Digital",
    subcategories: [
      {
        title: "Marketing Digital",
        description: "Marketing digital",
        items: sortArrayString(["Diseño de logo", "Diseño de pagina web", "Diseño de contenido"]),
        slug: "marketing-digital",
      },
      {
        title: "Manejo de Redes Sociales",
        description: "Manejo de redes sociales",
        items: sortArrayString(["Facebook", "Instagram", "Twitter", "TikTok"]),
        slug: "manejo-redes-sociales",
      },
    ],
  }
].sort((a, b) => a.title.localeCompare(b.title))

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