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
}

export type CheckoutInputs = CheckoutData