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
import { VerifyEmailForm } from "./components/VerifyEmailForm"

export const metadata: Metadata = {
  metadataBase: new URL(env.NEXT_PUBLIC_APP_URL),
  title: "Verificar email",
  description: "Verifica tu email para completar el registro",
}

export default function VerifyEmailPage() {
  const { userId } = auth()
  if (userId) return redirect("/")

  return (
    <Shell layout="auth">
      <Card>
        <CardHeader className="space-y-1">
          <CardTitle className="text-2xl">Verificar email</CardTitle>
          <CardDescription>
            Verifica tu email para completar el registro
          </CardDescription>
        </CardHeader>
        <CardContent className="grid gap-4">
          <VerifyEmailForm />
        </CardContent>
      </Card>
    </Shell>
  )
}
