import { ProductCategory } from "@/models"

export enum TypesCategories {
  IMPRENTA = "imprenta",
  DIGITAL = "digital",
}

export enum TypesProducts {
  TARJETA_DE_VISITA = "tarjeta-visita",
  POSTERS = "posters",
  ADHESIVOS = "adhesivos",
  PENDON = "pendon",
  FLAYERS = "flayers",
  DISENO_WEB = "diseno-web",
  DISENO_CONTENIDO = "diseno-contenido",
  REDES_SOCIALES = "redes-sociales",
}

export const productCategories: ProductCategory[] = [
  {
    title: "Imprenta",
    image: {
      url: "/images/categories/imprenta.webp",
      name: "Servicio de imprenta",
    },
    products: [
      {
        id: `${TypesCategories.IMPRENTA}_${TypesProducts.TARJETA_DE_VISITA}`,
        title: "Tarjeta de visita",
        slug: "tarjeta-de-visita",
        amount: 250,
        price: 38.8,
        images: [],
      },
      {
        id: `${TypesCategories.IMPRENTA}_${TypesProducts.POSTERS}`,
        title: "Posters",
        slug: "poster",
        amount: 100,
        price: 50.0,
        images: [],
      },
      {
        id: `${TypesCategories.IMPRENTA}_${TypesProducts.ADHESIVOS}`,
        title: "Adhesivos",
        slug: "adhesivo",
        amount: 100,
        price: 50.0,
        images: [],
      },
      {
        id: `${TypesCategories.IMPRENTA}_${TypesProducts.PENDON}`,
        title: "Pendon",
        slug: "pendon",
        amount: 10,
        price: 58.0,
        images: [],
      },
      {
        id: `${TypesCategories.IMPRENTA}_${TypesProducts.FLAYERS}`,
        title: "Flayers",
        slug: "flayers",
        amount: 250,
        price: 20.0,
        images: [],
      },
    ].sort((a, b) => a.title.localeCompare(b.title))
  },
  {
    title: "Digital",
    image: {
      url: "/images/categories/digital.webp",
      name: "Diseños digitales",
    },
    products: [
      {
        id: `${TypesCategories.DIGITAL}_${TypesProducts.REDES_SOCIALES}`,
        title: "Manejo de Redes Sociales",
        slug: "manejo-redes-sociales",
        amount: 1,
        price: 120.0,
        images: [],
      },
      {
        id: `${TypesCategories.DIGITAL}_${TypesProducts.DISENO_WEB}`,
        title: "Diseño de Paginas Web",
        slug: "diseno-paginas-web",
        amount: 1,
        price: 150.0,
        images: [],
      },
      {
        id: `${TypesCategories.DIGITAL}_${TypesProducts.DISENO_CONTENIDO}`,
        title: "Diseño de contenido",
        slug: "diseno-contenido",
        amount: 1,
        price: 126.0,
        images: [],
      }
    ].sort((a, b) => a.title.localeCompare(b.title))
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