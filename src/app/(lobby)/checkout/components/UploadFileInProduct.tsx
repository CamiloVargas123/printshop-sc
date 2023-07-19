import { Icons } from "@/components/Icons"
import { Button, buttonVariants } from "@/components/ui/Button"
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/Form"
import { Input } from "@/components/ui/Input"
import { cn } from "@/lib/utils"
import { CheckoutInputs } from "@/models"
import { Label } from "@radix-ui/react-label"
import { UseFormReturn } from "react-hook-form"

interface UploadFileInProductProps {
  form: UseFormReturn<CheckoutInputs>
  itemId: string
  idx: number
}
export default function UploadFileInProduct({ form, itemId, idx }: UploadFileInProductProps) {

  function handleFileChange(event: React.ChangeEvent<HTMLInputElement>) {
    const file = event.target.files?.[0]
    if (!file) return
    form.setValue(`files.${idx}`, { file, idProduct: itemId })
    form.trigger(`files.${idx}`)
  }

  return (
    <FormField
      control={form.control}
      name={`files.${idx}`}
      render={({ field }) => (
        <FormItem className="flex flex-col items-end px-2">
          <FormLabel>
            {
              form.getValues(`files.${idx}`)?.file.name ? (
                <div className="flex flex-col gap-1 items-center sm:items-end w-auto sm:max-w-[100px] lg:max-w-[60px] xl:max-w-[100px]">
                  <Button variant="outline" size="icon" onClick={() => {
                    form.setValue(`files.${idx}`, undefined)
                    form.clearErrors(`files.${idx}`)
                  }} title="Remover archivo">
                    <Icons.x className="w-5 h-5 text-muted-foreground" />
                  </Button>
                  <span className="text-muted-foreground text-sm w-full line-clamp-1" title={form.getValues(`files.${idx}`)?.file.name}>{form.getValues(`files.${idx}`)?.file.name.split(".")[0]}</span>
                  <span className="sr-only">Remover archivo</span>
                </div>
              ) : (
                <Label htmlFor={`files.${idx}`} className={cn(buttonVariants({ variant: "outline", size: "icon" }), "cursor-pointer")} title="Subir archivo">
                  <Icons.fileUp className="w-5 h-5 text-muted-foreground" />
                  <span className="sr-only">Subir archivo</span>
                </Label>
              )
            }
          </FormLabel>
          <FormControl>
            <Input id={`files.${idx}`} type="file" className="sr-only" accept="image/png, image/jpeg, image/jpg, application/pdf" onChange={handleFileChange} />
          </FormControl>
          <FormMessage className="text-sm text-center leading-3" />
        </FormItem>
      )}
    />
  )
}
