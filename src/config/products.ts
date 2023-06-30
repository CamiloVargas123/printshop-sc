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
        amount: 250,
        price: 38.8,
        images: [],
      },
      {
        id: "imprenta_poster",
        title: "Posters",
        slug: "poster",
        amount: 100,
        price: 50.0,
        images: [],
      },
      {
        id: "imprenta_adhesivo",
        title: "Adhesivos",
        slug: "adhesivo",
        amount: 100,
        price: 50.0,
        images: [],
      },
      {
        id: "imprenta_pendon",
        title: "Pendon",
        slug: "pendon",
        amount: 10,
        price: 58.0,
        images: [],
      },
      {
        id: "imprenta_flyer",
        title: "Flayers",
        slug: "flayers",
        amount: 100,
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
        amount: 1,
        price: 120.0,
        images: [],
      },
      {
        id: "digital_diseño-web",
        title: "Diseño de Paginas Web",
        slug: "diseno-paginas-web",
        amount: 1,
        price: 150.0,
        images: [],
      },
      {
        id: "digital_diseño-contenido",
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