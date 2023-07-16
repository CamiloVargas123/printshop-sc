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
import { formatDate, formatPrice } from "@/lib/utils"
import { Orders } from "@/models"
import { type ColumnDef } from "@tanstack/react-table"
import { useSearchParams } from "next/navigation"
import { useCallback, useEffect, useMemo, useState } from "react"
import { toast } from "sonner"
import { deleteOrder } from "../services"

interface OrdersTableShellProps {
  data: Orders[]
  pageCount: number
}
function compararStrings(str1: string, str2: string) {
  const normalize = (str: string) => str.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "");
  const normalizedStr1 = normalize(str1);
  const normalizedStr2 = normalize(str2);
  return normalizedStr1.includes(normalizedStr2);
}
interface Params {
  page: string
  perPage: string
  fullName: string | null
  column: string
  order: string
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

  const limit = typeof perPage === "string" ? parseInt(perPage) : 5

  const [filteredData, setFilteredData] = useState<{ orders: Orders[], pageCount: number }>({
    orders: data,
    pageCount: Math.ceil(data.length / limit)
  })
  useEffect(() => {
    const params: Params = {
      page,
      perPage,
      fullName,
      column,
      order,
    }
    setFilteredData(filter(params))
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchParams])
  const savedData = useMemo(() => data, [data])

  // this filter should be made in the backend, but NoSql databases are not good for this kind of query
  const filter = useCallback((params: Params): { orders: Orders[], pageCount: number } => {
    const offset = typeof params.page === "string"
      ? parseInt(params.page) > 0
        ? (parseInt(params.page) - 1) * limit
        : 0
      : 0
    const temFiltered: Orders[] = []

    if (params.fullName) {
      data.map((order) => {
        if (params.fullName && compararStrings(order.paymentData.fullName, params.fullName)) {
          temFiltered.push(order)
        }
      })
    }
    if (!params.fullName) temFiltered.push(...savedData)
    const sorted = temFiltered.sort((a, b) => {
      if (params.column === "createdAt" || !params.column) {
        if (params.order === "asc" || !params.column) {
          return new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime()
        }
        return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
      }
      if (params.column === "amountAll") {
        if (params.order === "asc") {
          return a.amountAll - b.amountAll
        }
        return b.amountAll - a.amountAll
      }
      if (params.column === "totalPrice") {
        if (params.order === "asc") {
          return a.totalPrice - b.totalPrice
        }
        return b.totalPrice - a.totalPrice
      }
      if (params.column === "fullName") {
        if (params.order === "asc") {
          return a.paymentData.fullName.localeCompare(b.paymentData.fullName)
        }
        return b.paymentData.fullName.localeCompare(a.paymentData.fullName)
      }
      return 0
    })
    return { orders: sorted.slice(offset).filter((_, index) => index < limit), pageCount: Math.ceil(temFiltered.length / limit) }
  }, [data, savedData, limit])

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
                  disabled
                  onClick={() => console.log("ver order", order.id)}
                >
                  <Icons.view
                    className="mr-2 h-3.5 w-3.5 text-muted-foreground/70"
                    aria-hidden="true"
                  />
                  Ver
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
