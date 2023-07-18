'use server'
import { IVA } from "@/lib/utils";
import { CheckoutInputs, Orders } from "@/models";
import { RootState } from "@/redux/store";
import { db } from "@/server/config";
import dayjs from "dayjs";
import { doc, setDoc } from "firebase/firestore";
import { nanoid } from "nanoid";

interface SubmitOrder {
  paymentData: CheckoutInputs
  cart: RootState["cart"]
}
export async function submitOrder({ paymentData, cart }: SubmitOrder) {
  const documentRef = doc(db, "orders", nanoid());
  const order: Orders = {
    id: documentRef.id,
    paymentData,
    fullName: paymentData.fullName.toLowerCase(),
    products: cart.items.map(item => ({
      ...item,
      images: [item.images[0]],
      file: "",
    })),
    amountAll: cart.amountAll,
    subTotalPrice: cart.subTotal,
    totalPrice: cart.subTotal * IVA,
    createdAt: dayjs().toDate(),
  }
  await setDoc(documentRef, order);
}