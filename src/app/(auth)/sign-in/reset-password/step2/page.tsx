import { Shell } from "@/components/Shell"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/Card"
import { auth } from "@clerk/nextjs"
import { type Metadata } from "next"
import { redirect } from "next/navigation"
import { ResetPasswordStep2Form } from "./components/ResetPasswordStep2Form"

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_URL || 'localhost:3000'),
  title: "Restablecer contraseña",
  description: "Ingresa tu código de verificación y tu nueva contraseña",
}

export default function ResetPasswordStep2Page() {
  const { userId } = auth()
  if (userId) return redirect("/")

  return (
    <Shell layout="auth">
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
