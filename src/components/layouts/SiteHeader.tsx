import { Icons } from '@/components/Icons'
import { CartSheet } from '@/components/cart/CartSheet'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/Avatar'
import { Button, buttonVariants } from '@/components/ui/Button'
import { DropdownMenu, DropdownMenuContent, DropdownMenuGroup, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from '@/components/ui/DropdownMenu'
import { siteConfig } from '@/config/site'
import { UserRole } from '@/models'
import { SignOutButton } from '@clerk/nextjs'
import type { User } from '@clerk/nextjs/dist/types/server'
import Link from 'next/link'
import MainNav from './MainNav'
import MobileNav from './MobileNav'

interface SiteHeaderProps {
  user: User | null
}
export default function SiteHeader({ user }: SiteHeaderProps) {
  const initials = `${user?.firstName?.charAt(0) ?? ""} ${user?.lastName?.charAt(0) ?? ""}`
  const email = user?.emailAddresses?.find((e) => e.id === user.primaryEmailAddressId)?.emailAddress ?? ""
  const isAdmin = user?.privateMetadata?.role === UserRole.ADMIN
  return (
    <header className="sticky top-0 z-40 w-full border-b bg-background border-border">
      <div className="container flex h-14 items-center">
        <MainNav mainNavItems={siteConfig.mainNav} />
        <MobileNav mainNavItems={siteConfig.mainNav} />
        <div className="flex flex-1 items-center justify-end space-x-4">
          <nav className="flex items-center space-x-2">
            <CartSheet />
            {
              user ? (
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button
                      variant="secondary"
                      className="relative h-8 w-8 rounded-full"
                    >
                      <Avatar className="h-8 w-8">
                        <AvatarImage
                          src={user.imageUrl}
                          alt={user.username ?? ""}
                        />
                        <AvatarFallback>{initials}</AvatarFallback>
                      </Avatar>
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent className="w-56" align="end" forceMount>
                    <DropdownMenuLabel className="font-normal">
                      <div className="flex flex-col space-y-1">
                        <p className="text-sm font-medium leading-none">
                          {user.firstName} {user.lastName}
                        </p>
                        <p className="text-xs leading-none text-muted-foreground">
                          {email}
                        </p>
                      </div>
                    </DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    <DropdownMenuGroup>
                      <DropdownMenuItem asChild disabled={!isAdmin}>
                        <Link href={`/dashboard/${isAdmin ? "admin" : "account"}`}>
                          <Icons.terminal
                            className="mr-2 h-4 w-4"
                            aria-hidden="true"
                          />
                          Dashboard
                        </Link>
                      </DropdownMenuItem>
                      <DropdownMenuItem asChild disabled>
                        <Link href="/dashboard/settings">
                          <Icons.settings
                            className="mr-2 h-4 w-4"
                            aria-hidden="true"
                          />
                          Configuración
                        </Link>
                      </DropdownMenuItem>
                    </DropdownMenuGroup>
                    <DropdownMenuSeparator />
                    <SignOutButton>
                      <DropdownMenuItem>
                        <Icons.logout
                          className="mr-2 h-4 w-4"
                          aria-hidden="true"
                        />
                        Cerrar sesión
                      </DropdownMenuItem>
                    </SignOutButton>
                  </DropdownMenuContent>
                </DropdownMenu>
              ) : (
                <Link href="/sign-in" className={buttonVariants({ size: "icon", variant: "outline" })}>
                  <Icons.user className="w-5 h-5" />
                  <span className="sr-only">Acceder</span>
                </Link>
              )
            }
          </nav>
        </div>
      </div>
    </header>
  )
}