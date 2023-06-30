import { ProductCategory } from "@/models"

export const productCategories: ProductCategory[] = [
  {
    title: "Imprenta",
    image: {
      url: "/images/categories/imprenta.webp",
      name: "Servicio de imprenta",
    },
    products: [
      {
        id: "imprenta_tarjeta-de-visita",
        title: "Tarjeta de visita",
        slug: "tarjeta-de-visita",
        quantity: 250,
        price: 38.8,
        images: [],
      },
      {
        id: "imprenta_poster",
        title: "Posters",
        slug: "poster",
        quantity: 100,
        price: 50.0,
        images: [],
      },
      {
        id: "imprenta_adhesivo",
        title: "Adhesivos",
        slug: "adhesivo",
        quantity: 100,
        price: 50.0,
        images: [],
      },
      {
        id: "imprenta_pendon",
        title: "Pendon",
        slug: "pendon",
        quantity: 10,
        price: 58.0,
        images: [],
      },
      {
        id: "imprenta_flyer",
        title: "Flayers",
        slug: "flayers",
        quantity: 100,
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
        id: "digital_redes-sociales",
        title: "Manejo de Redes Sociales",
        slug: "manejo-redes-sociales",
        quantity: 1,
        price: 120.0,
        images: [],
      },
      {
        id: "digital_diseño-web",
        title: "Diseño de Paginas Web",
        slug: "diseno-paginas-web",
        quantity: 1,
        price: 150.0,
        images: [],
      },
      {
        id: "digital_diseño-contenido",
        title: "Diseño de contenido",
        slug: "diseno-contenido",
        quantity: 1,
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