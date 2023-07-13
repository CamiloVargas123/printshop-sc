import { ProductCart } from "@/models"

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
  paymentData: CheckoutInputs
  products: Array<Omit<ProductCart, "images"> & { file: string }>
  amountAll: number
  subTotalPrice: number
  toalPrice: number
  createAt: Date
}