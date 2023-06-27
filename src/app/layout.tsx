import '@/style/globals.css'
import { fontMono, fontSans } from '@/lib/fonts'
import { className } from '@/lib/utils'
import { ThemeProvider } from '@/components/theme-provider'

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
    <html lang="es" suppressHydrationWarning>
      <head />
      <body
        className={className(
          "min-h-screen",
          fontSans.variable,
          fontMono.variable
        )}
      >
        <ThemeProvider attribute="class" defaultTheme="light" enableSystem={false}>
          {children}
        </ThemeProvider>
      </body>
    </html>
  )
}
