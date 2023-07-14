import { Icons } from "@/components/Icons"

export enum UserRole {
  USER = "user",
  ADMIN = "admin",
}

export interface NavItem {
  title: string
  href?: string
  disabled?: boolean
  external?: boolean
  icon?: keyof typeof Icons
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
export interface ValueWithPorcentage {
  name: string | number
  porcentage: number
}
interface MetadataArrayValue {
  name: string
  values: ValueWithPorcentage[]
}
export interface MetadataUniqueValue {
  name: string
  values: ValueWithPorcentage
}
export interface ProductBasic {
  id: string
  title: string
  images: Image[]
  price: number
  slug: string
  description?: string
}
export interface ProductWithMetadata extends ProductBasic {
  metadata: MetadataArrayValue[]
}
export interface ProductWithMetadataCart extends ProductBasic {
  metadata: MetadataUniqueValue[]
}
export type Product = ProductWithMetadata
export type ProductCart = ProductWithMetadataCart

export interface ProductCategory extends MainNavItem {
  title: string
  image: Image
  products: Product[]
}

interface CheckoutData {
  fullName: string
  telephone: string
  city: string
  state: string
  address: string
  addressOptional?: string
  postalCode: string
  email?: string
  note?: string
  paymentMethod: PaymentMethod
  transferReference: string
}
export enum PaymentMethod {
  TRANSFER = 'Transferencia bancaria',
}

export type CheckoutInputs = CheckoutData

export type Orders = {
  id: string
  paymentData: CheckoutInputs
  products: Array<Omit<ProductCart, "images"> & { file: string }>
  amountAll: number
  subTotalPrice: number
  totalPrice: number
  createdAt: Date
}