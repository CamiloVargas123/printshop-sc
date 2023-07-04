import { TailwindIndicator } from '@/components/TailwindIndicator'
import { ThemeProvider } from '@/components/ThemeProvider'
import { siteConfig } from '@/config/site'
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
    "imprenta online barata",
    "imprenta online barata y de calidad",
    "imprenta online barata y de calidad en españa",
    "marketing",
    "marketing online",
    "marketing digital",
    "marketing digital online",
    "marketing digital online barato",
    "manejo de redes sociales",
    "manejo de redes sociales online",
    "manejo de redes sociales online barato",
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
    images: [`${siteConfig.url}/og.jpg`],
  },
  icons: {
    icon: "/favicon.ico",
    shortcut: "/favicon-16x16.png",
    apple: "/apple-touch-icon.png",
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
          </ReduxProvider>
        </body>
      </html>
    </ClerkProvider>
  )
}
