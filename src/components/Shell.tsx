import { cn } from "@/lib/utils"
import { cva, type VariantProps } from "class-variance-authority"

const shellVariants = cva("grid items-center gap-8 pb-8 pt-6 md:py-8", {
  variants: {
    variant: {
      default: "container",
      sidebar: "py-0 md:py-0",
      centered: "h-full m-auto max-w-md justify-center",
    },
  },
  defaultVariants: {
    variant: "default",
  },
})

interface ShellProps
  extends React.HTMLAttributes<HTMLDivElement>,
  VariantProps<typeof shellVariants> {
  as?: React.ElementType
}

function Shell({ className, as: Comp = "section", variant, ...props }: ShellProps) {
  return <Comp className={cn(shellVariants({ variant }), className)} {...props} />
}

export { Shell, shellVariants }