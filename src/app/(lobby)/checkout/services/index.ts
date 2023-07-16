'use server'
import { IVA } from "@/lib/utils";
import { CheckoutInputs, Orders } from "@/models";
import { RootState } from "@/redux/store";
import { db } from "@/server/config";
import dayjs from "dayjs";
import { addDoc, collection } from "firebase/firestore";
import { nanoid } from "nanoid";

interface SubmitOrder {
  paymentData: CheckoutInputs
  cart: RootState["cart"]
}
export async function submitOrder({ paymentData, cart }: SubmitOrder) {
  const order: Orders = {
    id: nanoid(),
    paymentData,
    fullName: paymentData.fullName.toLowerCase(),
    products: cart.items.map(item => ({
      id: item.id,
      file: "",
      metadata: item.metadata,
      price: item.price,
      slug: item.slug,
      title: item.title,
    })),
    amountAll: cart.amountAll,
    subTotalPrice: cart.subTotal,
    totalPrice: cart.subTotal * IVA,
    createdAt: dayjs().toDate(),
  }
  await addDoc(collection(db, "orders"), order);
}