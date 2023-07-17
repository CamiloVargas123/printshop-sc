"use client"

import { Icons } from "@/components/Icons"
import { DataTable } from "@/components/dataTable/DataTable"
import { DataTableColumnHeader } from "@/components/dataTable/DataTableColumnHeader"
import { Button } from "@/components/ui/Button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/DropdownMenu"
import { formatDate, formatPrice, includeStringIntoOtherString } from "@/lib/utils"
import { Orders } from "@/models"
import { type ColumnDef } from "@tanstack/react-table"
import Link from "next/link"
import { useSearchParams } from "next/navigation"
import { useEffect, useMemo, useRef, useState } from "react"
import { toast } from "sonner"
import { deleteOrder } from "../services"

interface OrdersTableShellProps {
  data: Orders[]
  pageCount: number
}

function paginatioData({ data, offset, limit }: { data: Orders[], offset: number, limit: number }): { orders: Orders[], pageCount: number } {
  return { orders: data.slice(offset, offset + limit), pageCount: Math.ceil(data.length / limit) }
}

function sortedOrders({ data, column, order }: { data: Orders[], column: string, order: string }): Orders[] {
  if (column === "createdAt") {
    if (order === "asc") {
      return data.sort((a, b) => new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime())
    }
    return data.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
  }
  if (column === "amountAll") {
    if (order === "asc") {
      return data.sort((a, b) => a.amountAll - b.amountAll)
    }
    return data.sort((a, b) => b.amountAll - a.amountAll)
  }
  if (column === "totalPrice") {
    if (order === "asc") {
      return data.sort((a, b) => a.totalPrice - b.totalPrice)
    }
    return data.sort((a, b) => b.totalPrice - a.totalPrice)
  }
  if (column === "fullName") {
    if (order === "asc") {
      return data.sort((a, b) => a.paymentData.fullName.localeCompare(b.paymentData.fullName))
    }
    return data.sort((a, b) => b.paymentData.fullName.localeCompare(a.paymentData.fullName))
  }
  return data.sort((a, b) => new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime())
}

function filteredOrders({ data, fullName }: { data: Orders[], fullName: string | null }) {
  return fullName !== null && fullName.length > 0
    ? data.filter((order) => includeStringIntoOtherString(order.paymentData.fullName, fullName))
    : data
}

export function OrdersTableShell({
  data,
  pageCount,
}: OrdersTableShellProps) {
  const searchParams = useSearchParams()
  const page = searchParams?.get("page") ?? "1"
  const perPage = searchParams?.get("perPage") ?? "5"
  const sort = searchParams?.get("sort")
  const fullName = searchParams?.get("fullName")
  const [column, order] = sort?.split(".") ?? []

  const limit = useMemo(() => Number(perPage), [perPage])
  const offset = useMemo(() => (Number(page) - 1) * limit, [page, limit])
  const originalData = useRef<Orders[]>(data)

  const [filteredData, setFilteredData] = useState<{ orders: Orders[], pageCount: number }>({
    orders: originalData.current,
    pageCount: Math.ceil(originalData.current.length / limit)
  })

  // this filter should be made in the backend, but NoSql databases are not good for this kind of query
  useEffect(() => {
    const result = paginatioData({ data: sortedOrders({ column, order, data: filteredOrders({ data: originalData.current, fullName: fullName }) }), offset, limit })
    setFilteredData({ orders: result.orders, pageCount: result.pageCount })
  }, [fullName, column, order, limit, offset])


  // Memoize the columns so they don't re-render on every render
  const columns = useMemo<ColumnDef<Orders, unknown>[]>(
    () => [
      {
        id: "fullName",
        accessorKey: "Nombre completo",
        header: ({ column }) => (
          <DataTableColumnHeader column={column} title="Nombre completo" />
        ),
        cell: ({ cell }) => cell.row.original.paymentData.fullName,
      },
      {
        id: "createdAt",
        accessorKey: "Creado el",
        header: ({ column }) => <DataTableColumnHeader column={column} title="Creado el" />,
        cell: ({ cell }) => formatDate(cell.row.original.createdAt),
        enableColumnFilter: false,
      },
      {
        id: "amountAll",
        accessorKey: "Productos pedidos",
        header: ({ column }) => (
          <DataTableColumnHeader column={column} title="Productos pedidos" />
        ),
        cell: ({ cell }) => cell.row.original.amountAll,
        enableColumnFilter: false,
      },
      {
        id: "totalPrice",
        accessorKey: "Precio",
        header: ({ column }) => (
          <DataTableColumnHeader column={column} title="Precio" />
        ),
        cell: ({ cell }) => formatPrice(cell.row.original.totalPrice),
        enableColumnFilter: false,
      },
      {
        // Column for row actions
        id: "actions",
        enableHiding: false,
        cell: ({ row }) => {
          const order = row.original

          return (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  aria-label="Open menu"
                  variant="ghost"
                  className="h-8 w-8 p-0"
                >
                  <Icons.verticalThreeDots
                    className="h-4 w-4"
                    aria-hidden="true"
                  />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-[150px]">
                <DropdownMenuItem
                  asChild
                >
                  <Link
                    href={`/dashboard/orders/${order.id}`}
                  >
                    <Icons.view
                      className="mr-2 h-3.5 w-3.5 text-muted-foreground/70"
                      aria-hidden="true"
                    />
                    Ver
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem
                  disabled
                  onClick={() => console.log("Edit order", order.id)}
                >
                  <Icons.edit
                    className="mr-2 h-3.5 w-3.5 text-muted-foreground/70"
                    aria-hidden="true"
                  />
                  Editar
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem
                  disabled
                  onClick={async () => {
                    await deleteOrder(order.id)
                    toast.success("Pedido eliminado")
                  }}
                >
                  <Icons.trash
                    className="mr-2 h-3.5 w-3.5 text-muted-foreground/70"
                    aria-hidden="true"
                  />
                  Borrar
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          )
        },
      },
    ] satisfies ColumnDef<Orders, unknown>[],
    []
  )

  return <DataTable
    columns={columns}
    data={filteredData.orders}
    pageCount={filteredData.pageCount}
    searchableColumns={[{
      id: "fullName",
      title: "nombre",
    }]}
  />
}
