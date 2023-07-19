import { IVA } from "@/lib/utils";
import { CheckoutInputs, Orders } from "@/models";
import { RootState } from "@/redux/store";
import { db, storage } from "@/server/config";
import dayjs from "dayjs";
import { doc, setDoc } from "firebase/firestore";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";

export interface FilesUpload {
  idOrder: string
  file: string
  idProduct: string
}
interface SubmitOrder {
  paymentData: Omit<CheckoutInputs, "files">
  cart: RootState["cart"]
  files: FilesUpload[]
  idOrder: string
}

function removeUndefined<T>(obj: Record<string, unknown>): T {
  for (let key in obj) {
    if (obj.hasOwnProperty(key) && obj[key] === undefined) {
      delete obj[key];
    }
  }
  return obj as T
}
export async function submitOrder({ paymentData, cart, files, idOrder }: SubmitOrder) {
  const documentRef = doc(db, "orders", idOrder);
  const order: Orders = {
    id: documentRef.id,
    paymentData: removeUndefined(paymentData),
    fullName: paymentData.fullName.toLowerCase(),
    products: cart.items.map(item => {
      const url = files.find(file => file.idProduct === item.id)?.file
      if (!url) return { ...item, images: [item.images[0] ?? ''] }
      return {
        ...item,
        images: [item.images[0] ?? ''],
        file: url
      }
    }),
    amountAll: cart.amountAll,
    subTotalPrice: cart.subTotal,
    totalPrice: cart.subTotal * IVA,
    createdAt: dayjs().toDate(),
  }
  await setDoc(documentRef, order);
}

export async function uploadFile({ file, idOrder, idProduct }: { file: File, idOrder: string, idProduct: string }): Promise<FilesUpload> {
  const storageRef = ref(storage, `orders/${idOrder}/${file.name}`);
  const uploadTask = uploadBytes(storageRef, file);
  let url: string = ''

  const snapshot = await uploadTask;
  url = await getDownloadURL(snapshot.ref);

  return { file: url, idOrder, idProduct };
}