import { Icons } from "@/components/Icons"
import { Button } from "@/components/ui/Button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/DropdownMenu"
import { cn } from "@/lib/utils"
import { type Column } from "@tanstack/react-table"

interface DataTableColumnHeaderProps<TData, TValue>
  extends React.HTMLAttributes<HTMLDivElement> {
  column: Column<TData, TValue>
  title: string
}

export function DataTableColumnHeader<TData, TValue>({
  column,
  title,
  className,
}: DataTableColumnHeaderProps<TData, TValue>) {
  if (!column.getCanSort()) {
    return <div className={cn(className)}>{title}</div>
  }

  return (
    <div className={cn("flex items-center space-x-2", className)}>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button
            aria-label="Ordernar columna"
            variant="ghost"
            size="sm"
            className="-ml-3 h-8 data-[state=open]:bg-accent"
          >
            <span>{title}</span>
            {column.getIsSorted() === "desc" ? (
              <Icons.arrowDown className="ml-2 h-4 w-4" aria-hidden="true" />
            ) : column.getIsSorted() === "asc" ? (
              <Icons.arrowUp className="ml-2 h-4 w-4" aria-hidden="true" />
            ) : (
              <Icons.chevronsUpDown
                className="ml-2 h-4 w-4"
                aria-hidden="true"
              />
            )}
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="start">
          <DropdownMenuItem
            aria-label="Ordernar por ascendente"
            onClick={() => column.toggleSorting(false)}
          >
            <Icons.arrowUp
              className="mr-2 h-3.5 w-3.5 text-muted-foreground/70"
              aria-hidden="true"
            />
            Asc
          </DropdownMenuItem>
          <DropdownMenuItem
            aria-label="Ordernar por descendente"
            onClick={() => column.toggleSorting(true)}
          >
            <Icons.arrowDown
              className="mr-2 h-3.5 w-3.5 text-muted-foreground/70"
              aria-hidden="true"
            />
            Desc
          </DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem
            aria-label="Dejar de ver columna"
            onClick={() => column.toggleVisibility(false)}
          >
            <Icons.viewOff
              className="mr-2 h-3.5 w-3.5 text-muted-foreground/70"
              aria-hidden="true"
            />
            Ocultar
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  )
}
