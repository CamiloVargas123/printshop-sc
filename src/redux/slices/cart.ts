import { ProductCart } from "@/models"
import { PayloadAction, createSlice } from "@reduxjs/toolkit"
import { RootState } from "../store"

const cart = localStorage.getItem("cart") !== null ? JSON.parse(localStorage.getItem("cart") || "") : null
function saveCartToLocalStorage(cart: InitialState) {
  localStorage.setItem("cart", JSON.stringify(cart))
}

interface InitialState {
  items: Array<ProductCart>
  amountAll: number
  subTotal: number
}
const initialState: InitialState = cart ?? {
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
      saveCartToLocalStorage({ ...state })
    },
    removeToCart: (state, action: PayloadAction<ProductCart>) => {
      state.items = state.items.filter(_product => _product.id != action.payload.id)
      state.subTotal -= action.payload.price
      state.amountAll -= 1
      saveCartToLocalStorage({ ...state })
    },
    clearCart: (state) => {
      state.items = []
      state.subTotal = 0
      state.amountAll = 0
      saveCartToLocalStorage({ ...state })
    }
  }
})

export const { addToCart, removeToCart, clearCart } = cartSlice.actions
export const selectCart = (state: RootState) => state.cart

export default cartSlice.reducer;