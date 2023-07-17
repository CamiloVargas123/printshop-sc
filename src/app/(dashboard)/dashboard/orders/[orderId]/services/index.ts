import { Orders } from "@/models";
import { db } from "@/server/config";
import { doc, getDoc } from "firebase/firestore";

export async function getOrderById(orderId: string): Promise<Orders | undefined> {
  const docRef = doc(db, "orders", orderId);
  const docSnap = await getDoc(docRef);
  if (docSnap.exists()) {
    return docSnap.data() as Orders;
  } else {
    return undefined
  }
}