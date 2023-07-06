import { Shell } from '@/components/Shell'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/Card'
import { currentUser } from '@clerk/nextjs'
import Link from 'next/link'
import { redirect } from 'next/navigation'
import { OAuthSignIn } from '../components/auth/OAuthSignIn'
import { SignInForm } from '../components/form/SignInForm'

export default async function SingInPage() {
  const user = await currentUser()
  if (user) return redirect("/")

  return (
    <Shell layout="auth">
      <Card>
        <CardHeader className="space-y-1">
          <CardTitle className="text-2xl">Acceder</CardTitle>
          <CardDescription>
            Selecciona un metodo para acceder
          </CardDescription>
        </CardHeader>
        <CardContent className="grid gap-4">
          <OAuthSignIn />
          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <span className="w-full border-t" />
            </div>
            <div className="relative flex justify-center text-xs uppercase">
              <span className="bg-background rounded-sm px-2 text-muted-foreground">
                O continua con
              </span>
            </div>
          </div>
          <SignInForm />
        </CardContent>
        <CardFooter className="flex flex-wrap items-center space-x-2">
          <div className="flex-1 text-sm text-muted-foreground">
            ¿No tienes una cuenta?{" "}
            <Link
              aria-label="Registrarse"
              href="/sign-up"
              className="text-primary underline-offset-4 transition-colors hover:underline"
            >
              Registrarse
            </Link>
          </div>
          <Link
            aria-label="Restablecer contraseña"
            href="/sign-in/reset-password"
            className="text-sm text-primary underline-offset-4 transition-colors hover:underline"
          >
            Restablecer contraseña
          </Link>
        </CardFooter>
      </Card>
    </Shell>
  )
}
