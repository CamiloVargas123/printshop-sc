import { Shell } from "@/components/Shell"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/Card"
import { type Metadata } from "next"
import { VerifyEmailForm } from "./components/VerifyEmailForm"

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_URL || 'localhost:3000'),
  title: "Verificar email",
  description: "Verifica tu email para completar el registro",
}

export default function VerifyEmailPage() {
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
