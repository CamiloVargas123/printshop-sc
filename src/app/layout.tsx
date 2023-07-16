import { TailwindIndicator } from '@/components/TailwindIndicator'
import { ThemeProvider } from '@/components/ThemeProvider'
import { Toaster } from '@/components/ui/Toaster'
import { siteConfig } from '@/config/site'
import { env } from '@/env.mjs'
import { fontMono, fontSans } from '@/lib/fonts'
import { cn } from '@/lib/utils'
import { ReduxProvider } from '@/redux/ReduxProvider'
import '@/style/globals.css'
import { ClerkProvider } from '@clerk/nextjs'
import { Metadata } from 'next'

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  alternates: {
    canonical: '/',
    languages: {
      'es-ES': '/es-ES',
    },
  },
  title: {
    default: siteConfig.name,
    template: `%s - ${siteConfig.name}`,
  },
  description: siteConfig.description,
  keywords: [
    "imprenta",
    "imprenta online",
    "marketing",
    "marketing digital",
    "manejo de redes sociales",
    "Campañas de publicidad en línea",
    "Estrategias de marketing de contenido",
    "Experiencia del usuario",
    "Soluciones de marketing digital",
  ],
  authors: [
    {
      name: "camilo vargas",
      url: "https://github.com/CamiloVargas123",
    },
  ],
  creator: "sebastian castaño",
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "white" },
    { media: "(prefers-color-scheme: dark)", color: "black" },
  ],
  openGraph: {
    type: "website",
    locale: "es_ES",
    url: new URL(siteConfig.url),
    title: siteConfig.name,
    description: siteConfig.description,
    siteName: siteConfig.name,
  },
  twitter: {
    card: "summary_large_image",
    title: siteConfig.name,
    description: siteConfig.description,
    images: [`${env.NEXT_PUBLIC_APP_URL}/opengraph-image.png}`],
  },
  icons: {
    icon: "/favicon.ico",
    shortcut: "/favicon.ico",
    apple: "/favicon.ico",
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <ClerkProvider>
      <html lang="es" suppressHydrationWarning>
        <head />
        <body
          className={cn(
            "min-h-screen",
            fontSans.variable,
            fontMono.variable
          )}
        >
          <ReduxProvider>
            <ThemeProvider attribute="class" defaultTheme="light" enableSystem={false}>
              {children}
              <TailwindIndicator />
            </ThemeProvider>
            <Toaster />
          </ReduxProvider>
        </body>
      </html>
    </ClerkProvider>
  )
}
