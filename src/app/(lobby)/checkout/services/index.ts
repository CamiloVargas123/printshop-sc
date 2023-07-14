'use server'
import { IVA } from "@/lib/utils";
import { CheckoutInputs, Orders } from "@/models";
import { RootState } from "@/redux/store";
import { db } from "@/server/config";
import { addDoc, collection } from "firebase/firestore";

interface SubmitOrder {
  paymentData: CheckoutInputs
  cart: RootState["cart"]
}
export async function submitOrder({ paymentData, cart }: SubmitOrder) {
  const order: Orders = {
    paymentData,
    products: cart.items.map((item, idx) => ({
      id: item.id,
      file: `test${idx}`,
      metadata: item.metadata,
      price: item.price,
      slug: item.slug,
      title: item.title,
    })),
    amountAll: cart.amountAll,
    subTotalPrice: cart.subTotal,
    toalPrice: cart.subTotal * IVA,
    createAt: new Date()
  }

  await addDoc(collection(db, "orders"), order);
}