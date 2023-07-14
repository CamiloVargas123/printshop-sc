import { cn } from "@/lib/utils"
import { forwardRef } from "react"
import { useFormField } from "./Form"

export type InputProps = React.InputHTMLAttributes<HTMLInputElement>

const InputDefault = forwardRef<HTMLInputElement, InputProps>(
  ({ className, ...props }, ref) => {
    return (
      <input
        className={cn(
          "flex h-10 w-full rounded-sm border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50",
          className
        )}
        ref={ref}
        {...props}
      />
    )
  }
)
InputDefault.displayName = "InputDefault"

const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ className, ...props }, ref) => {
    const { error } = useFormField()
    return <InputDefault
      ref={ref}
      className={cn(
        className,
        error && "border-destructive bg-destructive/20",
      )} {...props} />
  }
)
Input.displayName = "Input"

const InputUncontrolled = forwardRef<HTMLInputElement, InputProps>(
  ({ ...props }, ref) => {
    return <InputDefault ref={ref} {...props} />
  }
)
InputUncontrolled.displayName = "InputUncontrolled"

export { Input, InputUncontrolled }

