import ItemCart from "@/components/cart/ItemCart"
import { Table, TableBody, TableCell, TableRow } from "@/components/ui/Table"
import { notFound } from "next/navigation"
import { getOrderById } from "./services"
import { buttonVariants } from "@/components/ui/Button"
import { Icons } from "@/components/Icons"

export default async function OrderPage({ params }: { params: { orderId: string } }) {
  const order = await getOrderById(params.orderId)
  if (!order) return notFound()

  return (
    <div className="grid gap-6 grid-cols-1 xl:grid-cols-2">
      <Table className="max-w-[450px] min-w-min m-auto">
        <TableBody>
          <TableRow>
            <TableCell className="p-2">Nombre del cliente</TableCell>
            <TableCell className="p-2">{order.paymentData.fullName}</TableCell>
          </TableRow>
          <TableRow>
            <TableCell className="p-2">Número de teléfono</TableCell>
            <TableCell className="p-2">{order.paymentData.telephone}</TableCell>
          </TableRow>
          <TableRow>
            <TableCell className="p-2">Ciudad</TableCell>
            <TableCell className="p-2">{order.paymentData.city}</TableCell>
          </TableRow>
          <TableRow>
            <TableCell className="p-2">Estado / Provincia / Región</TableCell>
            <TableCell className="p-2">{order.paymentData.state}</TableCell>
          </TableRow>
          <TableRow>
            <TableCell className="p-2">Dirección</TableCell>
            <TableCell className="p-2">{order.paymentData.address}</TableCell>
          </TableRow>
          {
            order.paymentData.addressOptional &&
            <TableRow>
              <TableCell className="p-2">Detalles de la dirección</TableCell>
              <TableCell className="p-2">{order.paymentData.addressOptional}</TableCell>
            </TableRow>
          }
          <TableRow>
            <TableCell className="p-2">Código Postal</TableCell>
            <TableCell className="p-2">{order.paymentData.postalCode}</TableCell>
          </TableRow>
          <TableRow>
            <TableCell className="p-2">Email</TableCell>
            <TableCell className="p-2">{order.paymentData.email}</TableCell>
          </TableRow>
          {
            order.paymentData.note &&
            <TableRow>
              <TableCell className="p-2">Información adicional</TableCell>
              <TableCell className="p-2">{order.paymentData.note}</TableCell>
            </TableRow>
          }
        </TableBody>
      </Table>
      <div className="flex flex-col gap-2 w-full max-w-[450px] overflow-x-auto m-auto">
        {order.products.map(item => {
          return (
            <ItemCart key={item.id} item={item}>
              <a href={item.file} download className={buttonVariants({ size: "icon", variant: "outline" })}>
                <Icons.download className="w-5 h-5" />
                <span className="sr-only">Descargar</span>
              </a>
            </ItemCart>
          )
        })}
      </div>
    </div>
  )
}