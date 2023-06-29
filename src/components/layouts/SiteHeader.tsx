import Link from 'next/link'
import { buttonVariants } from '@/components/ui/Button'
import { siteConfig } from '@/config/site'
import MainNav from './MainNav'
import MobileNav from './MobileNav'
import { CartSheet } from '@/components/cart/CartSheet'

export default function SiteHeader() {
  return (
    <header className="sticky top-0 z-40 w-full border-b bg-background border-border">
      <div className="container flex h-14 items-center">
        <MainNav items={siteConfig.mainNav} />
        <MobileNav mainNavItems={siteConfig.mainNav} />
        <div className="flex flex-1 items-center justify-end space-x-4">
          <nav className="flex items-center space-x-2">
            <CartSheet />
            <Link href="/signin" className={buttonVariants({ size: "sm" })}>
              Sing In
              <span className="sr-only">Sing In</span>
            </Link>
          </nav>
        </div>
      </div>
    </header>
  )
}

