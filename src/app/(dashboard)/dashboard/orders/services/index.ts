'use server'
import { Orders } from "@/models";
import { db } from "@/server/config";
import dayjs from "dayjs";
import { DocumentData, Query, collection, endAt, getDocs, limit, orderBy, query, startAt, where } from "firebase/firestore";

export async function deleteOrder(id: string) {
  console.log("deleting order", id)
  //await deleteDoc(doc(db, "orders", id));
}
export async function getAllOrders(): Promise<{ orders: Orders[], pageCount: number }> {
  const ordersRef = collection(db, "orders");
  const documentOrdersSnapshots = await getDocs(ordersRef)
  if (documentOrdersSnapshots.empty) return { orders: [], pageCount: 0 }
  return Promise.resolve({ orders: documentOrdersSnapshots.docs.map(doc => ({ ...doc.data(), createdAt: dayjs.unix(doc.data().createdAt.seconds).toDate() })) as Orders[], pageCount: documentOrdersSnapshots.size })
}

interface GetOrdersProps {
  perPage: string | string[] | undefined;
  page: string | string[] | undefined;
  sort: string | string[] | undefined | null;
  fullName: string | string[] | undefined | null;
}

// this function is not used, it does not work properly the pagination
export async function getOrders({ perPage, page, sort, fullName }: GetOrdersProps): Promise<{ orders: Orders[], pageCount: number }> {
  const _limit = typeof perPage === "string" ? parseInt(perPage) : 5
  // Number of items to skip
  const offset = typeof page === "string"
    ? parseInt(page) > 0
      ? (parseInt(page) - 1) * _limit
      : 0
    : 0

  // Number of items per page
  // Column and order to sort by
  const [column, order] = typeof sort === "string" ? (sort.split(".") as [string, "asc" | "desc" | undefined]) : ["createdAt", undefined]

  const ordersRef = collection(db, "orders");
  let queryOrders: Query<DocumentData, DocumentData>
  let queryTotalOrders: Query<DocumentData, DocumentData>
  if (typeof fullName === "string") {
    queryTotalOrders = query(ordersRef, where('fullName', '>=', fullName), where('fullName', '<=', fullName + '\uf8ff'));
    if (order === "desc") {
      queryOrders = query(ordersRef, where('fullName', '>=', fullName), where('fullName', '<=', fullName + '\uf8ff'), orderBy(column, order), limit(_limit), endAt(offset !== 0 ? offset + 1 : offset));
    } else {
      queryOrders = query(ordersRef, where('fullName', '>=', fullName), where('fullName', '<=', fullName + '\uf8ff'), orderBy(column, order), limit(_limit), startAt(offset !== 0 ? offset + 1 : offset));
    }
  } else {
    queryTotalOrders = query(ordersRef);
    if (order === "desc") {
      queryOrders = query(ordersRef, orderBy(column, order), limit(_limit), endAt(offset));
    } else {
      queryOrders = query(ordersRef, orderBy(column, order), limit(_limit), startAt(offset));
    }
  }

  const documentOrdersSnapshots = await getDocs(queryOrders)
  const totlaOrdersSnapshots = await getDocs(queryTotalOrders)

  if (documentOrdersSnapshots.empty) return { orders: [], pageCount: 1 }

  return {
    orders: documentOrdersSnapshots.docs.map(doc => ({ ...doc.data(), createdAt: dayjs.unix(doc.data().createdAt.seconds).toDate() })) as Orders[], pageCount: Math.ceil(totlaOrdersSnapshots.size / _limit)
  }
}