import { ProductCart } from "@/models"
import { PayloadAction, createSlice } from "@reduxjs/toolkit"
import { RootState } from "../store"

interface InitialState {
  items: Array<ProductCart>
  amountAll: number
  subTotal: number
}
const initialState: InitialState = {
  items: [],
  amountAll: 0,
  subTotal: 0
}

export const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart: (state, action: PayloadAction<ProductCart>) => {
      state.items = state.items.concat({ ...action.payload })
      state.subTotal += action.payload.price
      state.amountAll += 1
    },
    removeToCart: (state, action: PayloadAction<ProductCart>) => {
      state.items = state.items.filter(_product => _product.id != action.payload.id)
      state.subTotal -= action.payload.price
      state.amountAll -= 1
    }
  }
})

export const { addToCart, removeToCart } = cartSlice.actions
export const selectCart = (state: RootState) => state.cart

export default cartSlice.reducer;