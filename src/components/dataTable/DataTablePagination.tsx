import { type Table } from "@tanstack/react-table"
import { Icons } from "@/components/Icons"
import { Button } from "@/components/ui/Button"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTriggerUncontrolled,
  SelectValue,
} from "@/components/ui/Select"

interface DataTablePaginationProps<TData> {
  table: Table<TData>
  pageSizes?: number[]
}

export function DataTablePagination<TData>({
  table,
  pageSizes = [5, 10, 15, 20],
}: DataTablePaginationProps<TData>) {
  return (
    <div className="flex w-full flex-col items-center gap-4 overflow-auto px-2 py-1 sm:flex-row justify-center lg:justify-end sm:gap-8">
      <div className="flex flex-col items-center gap-4 sm:flex-row lg:gap-8">
        <div className="flex items-center space-x-2">
          <p className="whitespace-nowrap text-sm font-medium">Filas por páginas</p>
          <Select
            value={`${table.getState().pagination.pageSize}`}
            onValueChange={(value) => {
              table.setPageSize(Number(value))
            }}
          >
            <SelectTriggerUncontrolled className="h-8 w-[70px]">
              <SelectValue placeholder={table.getState().pagination.pageSize} />
            </SelectTriggerUncontrolled>
            <SelectContent side="top">
              {pageSizes.map((pageSize) => (
                <SelectItem key={pageSize} value={`${pageSize}`}>
                  {pageSize}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        <div className="flex w-[100px] items-center justify-center whitespace-nowrap text-sm font-medium">
          Página {table.getState().pagination.pageIndex + 1} de{" "}
          {table.getPageCount()}
        </div>
        <div className="flex items-center space-x-2">
          <Button
            aria-label="Ir a la primera página"
            variant="outline"
            size="icon"
            className="hidden h-8 w-8 lg:flex"
            onClick={() => table.setPageIndex(0)}
            disabled={!table.getCanPreviousPage()}
          >
            <Icons.chevronsLeft className="h-4 w-4" aria-hidden="true" />
          </Button>
          <Button
            aria-label="Ir a la página anterior"
            variant="outline"
            size="icon"
            className="h-8 w-8"
            onClick={() => table.previousPage()}
            disabled={!table.getCanPreviousPage()}
          >
            <Icons.chevronLeft className="h-4 w-4" aria-hidden="true" />
          </Button>
          <Button
            aria-label="Ir a la página siguiente"
            variant="outline"
            size="icon"
            className="h-8 w-8"
            onClick={() => table.nextPage()}
            disabled={!table.getCanNextPage()}
          >
            <Icons.chevronRight className="h-4 w-4" aria-hidden="true" />
          </Button>
          <Button
            aria-label="Ir a la última página"
            variant="outline"
            size="icon"
            className="hidden h-8 w-8 lg:flex"
            onClick={() => table.setPageIndex(table.getPageCount() - 1)}
            disabled={!table.getCanNextPage()}
          >
            <Icons.chevronsRight className="h-4 w-4" aria-hidden="true" />
          </Button>
        </div>
      </div>
    </div>
  )
}
