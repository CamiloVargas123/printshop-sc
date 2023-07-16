
import { Header } from "@/components/Header";
import { Shell } from "@/components/Shell";
import { env } from "@/env.mjs";
import { Metadata } from "next";
import { OrdersTableShell } from "./components/OrdersTableShell";
import { getAllOrders } from "./services";

export const metadata: Metadata = {
  metadataBase: new URL(env.NEXT_PUBLIC_APP_URL),
  title: "Pedidos",
  description: "Administra tus pedidos",
}

interface PageOrdersProps {
  searchParams: { [key: string]: string | string[] | undefined }
}
export default async function PageOrders({ searchParams }: PageOrdersProps) {
  const allOrders = await getAllOrders() 
  return (
    <Shell variant={"sidebar"} >
      <Header title="Pedidos" description="Administra tus pedidos" size="sm" />
      <OrdersTableShell data={allOrders.orders} pageCount={allOrders.pageCount} />
    </Shell>
  )
}
