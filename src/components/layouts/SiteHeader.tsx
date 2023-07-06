import { Icons } from '@/components/Icons'
import { CartSheet } from '@/components/cart/CartSheet'
import { buttonVariants } from '@/components/ui/Button'
import { siteConfig } from '@/config/site'
import Link from 'next/link'
import MainNav from './MainNav'
import MobileNav from './MobileNav'

export default function SiteHeader() {
  return (
    <header className="sticky top-0 z-40 w-full border-b bg-background border-border">
      <div className="container flex h-14 items-center">
        <MainNav mainNavItems={siteConfig.mainNav} />
        <MobileNav mainNavItems={siteConfig.mainNav} />
        <div className="flex flex-1 items-center justify-end space-x-4">
          <nav className="flex items-center space-x-2">
            <CartSheet />
            <Link href="/sign-in" className={buttonVariants({ size: "icon", variant: "outline" })}>
              <Icons.user className="w-5 h-5" />
              <span className="sr-only">Acceder</span>
            </Link>
          </nav>
        </div>
      </div>
    </header>
  )
}