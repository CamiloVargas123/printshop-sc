"use client"

import { Icons } from "@/components/Icons"
import { Button } from "@/components/ui/Button"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/Form"
import { Input } from "@/components/ui/Input"
import { checkEmailSchema } from "@/lib/validations/auth"
import { isClerkAPIResponseError, useSignIn } from "@clerk/nextjs"
import { zodResolver } from "@hookform/resolvers/zod"
import { useRouter } from "next/navigation"
import { useTransition } from "react"
import { useForm } from "react-hook-form"
import { toast } from "sonner"
import type { z } from "zod"

type Inputs = z.infer<typeof checkEmailSchema>

export function ResetPasswordForm() {
  const router = useRouter()
  const { isLoaded, signIn } = useSignIn()
  const [isPending, startTransition] = useTransition()

  const form = useForm<Inputs>({
    resolver: zodResolver(checkEmailSchema),
    defaultValues: {
      email: "",
    },
  })

  function onSubmit(data: Inputs) {
    if (!isLoaded) return

    startTransition(async () => {
      try {
        const firstFactor = await signIn.create({
          strategy: "reset_password_email_code",
          identifier: data.email,
        })

        if (firstFactor.status === "needs_first_factor") {
          router.push("/sign-in/reset-password/step2")
          toast.message("Reviza tu email", {
            description: "Te hemos enviado un código de verificarión de 6 dígitos",
          })
        }
      } catch (error) {
        const unknownError = "Algo salió mal, por favor intentalo de nuevo."

        isClerkAPIResponseError(error)
          ? toast.error(error.errors[0]?.longMessage ?? unknownError)
          : toast.error(unknownError)
      }
    })
  }

  return (
    <Form {...form}>
      <form
        className="grid gap-4"
        onSubmit={(...args) => void form.handleSubmit(onSubmit)(...args)}
      >
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input placeholder="example@hotmail.com" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button disabled={isPending}>
          {isPending && (
            <Icons.spinner
              className="mr-2 h-4 w-4 animate-spin"
              aria-hidden="true"
            />
          )}
          Continuar
          <span className="sr-only">Continuar para restablecer contraseña con tu código</span>
        </Button>
      </form>
    </Form>
  )
}
