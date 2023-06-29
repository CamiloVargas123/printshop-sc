import { ProductCategory } from "@/models"

export const productCategories: ProductCategory[] = [
  {
    title: "Imprenta",
    image: {
      url: "/images/categories/imprenta.webp",
      name: "Imprenta imagen representación",
    },
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
    image: {
      url: "/images/categories/digital.webp",
      name: "Digital imagen representación",
    },
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