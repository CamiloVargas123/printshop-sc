export type UserRole = "user" | "admin"
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
  amount: number
  images: Image[]
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

export interface ProductCategory extends MainNavItem {
  title: string
  image: Image
  products: Product[]
}