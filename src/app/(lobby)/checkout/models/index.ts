interface CheckoutData {
  name: string
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
export enum PaymentMethod  {
  TRANSFER = 'Transferencia bancaria',
}


export type CheckoutInputs = CheckoutData