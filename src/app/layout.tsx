import '@/style/globals.css'
import { fontMono, fontSans } from '@/lib/fonts'
import { className } from '@/lib/utils'

export const metadata = {
  title: 'printshop',
  description: 'Venta de impresiones',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="es">
      <head />
      <body
        className={className(
          "min-h-screen bg-background",
          fontSans.variable,
          fontMono.variable
        )}
      >
        {children}
      </body>
    </html>
  )
}
