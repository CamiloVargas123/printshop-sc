import { Product } from "@/models"
import { createSlice, PayloadAction } from "@reduxjs/toolkit"
import { RootState } from "../store"

interface InitialState {
  items: Array<Product>
  amountAll: number
}
const initialState: InitialState = {
  items: [],
  amountAll: 0
}

export const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart: (state, action: PayloadAction<Product>) => {
      state.items = state.items.concat({ ...action.payload })
      state.amountAll += 1
    },
    removeToCart: (state, action: PayloadAction<Product>) => {
      state.items = state.items.filter(_product => _product.id != action.payload.id)
      state.amountAll -= 1
    }
  }
})

export const { addToCart, removeToCart } = cartSlice.actions
export const selectCart = (state: RootState) => state.cart

export default cartSlice.reducer;