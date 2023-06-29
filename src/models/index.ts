export interface NavItem {
  title: string
  href?: string
  disabled?: boolean
  external?: boolean
  //icon?: keyof typeof Icons
  label?: string
  description?: string
}

export interface NavItemWithChildren extends NavItem {
  items: NavItemWithChildren[]
}

export interface NavItemWithOptionalChildren extends NavItem {
  items?: NavItemWithOptionalChildren[]
}

export type MainNavItem = NavItemWithOptionalChildren

export type SidebarNavItem = NavItemWithChildren

interface Image {
  url: string
  name: string
}
export interface ProductBasic {
  id: string
  title: string
  images: Image[]
  quantity: number
  price: number
  slug: string
  description?: string
}
export interface ProductWithMetaDescription extends ProductBasic {
  metadata?: {
    name: string
    value: string
  }[]
}
export type Product = ProductWithMetaDescription


export interface SubCategories {
  title: string
  description?: string
  image?: Image
  slug: string
}
export interface ProductCategory extends MainNavItem {
  title: string
  image: Image
  subcategories: SubCategories[]
}