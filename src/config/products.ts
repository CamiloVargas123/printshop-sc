import { ProductCategory } from "@/models"

export enum TypesCategories {
  IMPRENTA = "imprenta",
  DIGITAL = "digital",
}

export enum TypesProducts {
  TARJETA_DE_VISITA = "tarjeta-visita",
  FLAYERS = "flayers",

  DISENO_LOGO = "diseno-logo",
  DISENO_FLAYERS = "diseno-flayers",
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
        price: 38.8,
        images: [],
        metadata: [
          {
            name: "Cantidad",
            values: [{name: 500, porcentage: 1}, {name: 1000, porcentage: 2}, {name: 2000, porcentage: 4}, {name: 3000, porcentage: 5.9}, {name: 5000, porcentage: 9.7}, {name: 10000, porcentage: 19}]
          },
          {
            name: "Caras a imprimir",
            values: [{name: "1 cara", porcentage: 1}, {name: "2 caras", porcentage: 1.9}],
          },
        ]
      },
      {
        id: `${TypesCategories.IMPRENTA}_${TypesProducts.FLAYERS}`,
        title: "Flayers",
        slug: "flayers",
        price: 20.0,
        images: [],
        metadata: [
          {
            name: "Cantidad",
            values: [{name: 500, porcentage: 1}, {name: 1000, porcentage: 2}, {name: 2000, porcentage: 4}, {name: 3000, porcentage: 5.9}, {name: 5000, porcentage: 9.7}, {name: 10000, porcentage: 19}]
          },
          {
            name: "Medidas (Ancho x Alto)",
            values: [{name: "A4 (21cm x 29,7cm)", porcentage: 1}, {name: "A5 (14,8cm x 21cm)", porcentage: 0.8}, {name: "A6 (10,5cm x 14,8cm)", porcentage: 0.7}],
          },
        ]
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
        price: 120.0,
        images: [],
        metadata: [
          {
            name: "Plataformas",
            values: [{name: "Facebook", porcentage: 1}, {name: "Instagram", porcentage: 1}, {name: "Twitter", porcentage: 1}, {name: "TikTok", porcentage: 1.5}, {name: "Youtube", porcentage: 1.9}],
          },
        ]
      },
      {
        id: `${TypesCategories.DIGITAL}_${TypesProducts.DISENO_LOGO}`,
        title: "Diseño de logos",
        slug: "diseno-logos",
        price: 150.0,
        images: [],
        metadata: [
          {
            name: "Tipo de logo",
            values: [{name: "Básico", porcentage: 1}, {name: "Medio", porcentage: 1.5}, {name: "Avanzado", porcentage: 2}]
          },
        ]
      },
      {
        id: `${TypesCategories.DIGITAL}_${TypesProducts.DISENO_FLAYERS}`,
        title: "Diseño de contenido",
        slug: "diseno-flayers",
        price: 126.0,
        images: [],
        metadata: [
          {
            name: "Tipo de diseño",
            values: [{name: "Básico", porcentage: 1}, {name: "Medio", porcentage: 1.5}, {name: "Avanzado", porcentage: 2}]
          },
        ]
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