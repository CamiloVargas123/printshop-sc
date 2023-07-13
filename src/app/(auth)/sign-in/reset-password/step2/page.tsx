import { Shell } from "@/components/Shell"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/Card"
import { env } from "@/env.mjs"
import { auth } from "@clerk/nextjs"
import { type Metadata } from "next"
import { redirect } from "next/navigation"
import { ResetPasswordStep2Form } from "./components/ResetPasswordStep2Form"

export const metadata: Metadata = {
  metadataBase: new URL(env.NEXT_PUBLIC_APP_URL),
  title: "Restablecer contraseña",
  description: "Ingresa tu código de verificación y tu nueva contraseña",
}

export default function ResetPasswordStep2Page() {
  const { userId } = auth()
  if (userId) return redirect("/")

  return (
    <Shell variant={"centered"}>
      <Card>
        <CardHeader className="space-y-1">
          <CardTitle className="text-2xl">Restablecer contraseña</CardTitle>
          <CardDescription>
            Ingresa tu código de verificación y tu nueva contraseña
          </CardDescription>
        </CardHeader>
        <CardContent className="grid gap-4">
          <ResetPasswordStep2Form />
        </CardContent>
      </Card>
    </Shell>
  )
}
