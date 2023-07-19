"use client"

import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from "@/components/ui/NavigationMenu"
import { siteConfig } from "@/config/site"
import { cn } from "@/lib/utils"
import { MainNavItem, NavItemWithOptionalChildren } from "@/models"
import Image from "next/image"
import Link from "next/link"
import { ComponentPropsWithoutRef, ElementRef, forwardRef } from "react"

interface MainNavProps {
  mainNavItems?: MainNavItem[]
}

export default function MainNav({ mainNavItems }: MainNavProps) {
  return (
    <div className="hidden gap-6 lg:flex">
      <Link
        aria-label="Home"
        href="/"
        className="hidden items-center space-x-2 lg:flex flex-nowrap"
      >
        <Image
          src="/images/brand/BIG-SAFE-LOGO.webp"
          alt="BIG-SAFE-LOGO"
          aria-label="BIG-SAFE-LOGO"
          width={50}
          height={50}
          className="object-none"
          priority
        />
      </Link>
      <NavigationMenu>
        <NavigationMenuList>
          {mainNavItems?.[0]?.items ? (
            <NavigationMenuItem>
              <NavigationMenuTrigger className="h-auto" >
                {mainNavItems[0].title}
              </NavigationMenuTrigger>
              <NavigationMenuContent>
                <ul className="grid items-center gap-3 p-4 md:w-[400px] lg:w-[500px] lg:grid-cols-[1fr_1fr]">
                  <li className="row-span-3">
                    <NavigationMenuLink asChild>
                      <Link
                        aria-label={siteConfig.name}
                        className="flex gap-2 h-full w-full select-none flex-col justify-end items-center rounded-sm bg-gradient-to-b from-secondary/30 to-secondary/70 p-6 no-underline outline-none focus:shadow-md"
                        href="/"
                      >
                        <Image
                          src="/images/brand/BIG-SAFE-LOGO.webp"
                          alt="BIG-SAFE-LOGO"
                          aria-label="BIG-SAFE-LOGO"
                          width={50}
                          height={50}
                          className="object-none"
                          priority
                        />
                        <h1 className="text-lg font-medium text-center">
                          {siteConfig.name}
                        </h1>
                        <h2 className="text-sm leading-tight text-secondary-foreground">
                          {siteConfig.description}
                        </h2>
                      </Link>
                    </NavigationMenuLink>
                  </li>
                  {mainNavItems[0].items.map((subItem) => (
                    <ListItem
                      key={subItem.title}
                      {...subItem}
                    >
                      {subItem.description}
                    </ListItem>
                  ))}
                </ul>
              </NavigationMenuContent>
            </NavigationMenuItem>
          ) : null}
          {mainNavItems
            ?.filter((item) => item.title !== mainNavItems[0]?.title)
            .map((item) =>
              item?.items ? (
                <NavigationMenuItem key={item.title}>
                  <NavigationMenuTrigger className="h-auto capitalize">
                    {item.title}
                  </NavigationMenuTrigger>
                  <NavigationMenuContent>
                    <ul className="w-[400px] gap-3 p-4 md:w-[500px] lg:w-[600px] grid grid-cols-2">
                      {item.items.map((subItem) => (
                        <ListItem
                          key={subItem.title}
                          {...subItem}
                        />
                      ))}
                    </ul>
                  </NavigationMenuContent>
                </NavigationMenuItem>
              ) : (
                item.href && (
                  <NavigationMenuItem key={item.title}>
                    <Link href={item.href} legacyBehavior passHref>
                      <NavigationMenuLink
                        className={cn(navigationMenuTriggerStyle(), "h-auto")}
                      >
                        {item.title}
                      </NavigationMenuLink>
                    </Link>
                  </NavigationMenuItem>
                )
              )
            )}
        </NavigationMenuList>
      </NavigationMenu>
    </div>
  )
}

const ListItem = forwardRef<
  ElementRef<"a">,
  ComponentPropsWithoutRef<"a"> &
  NavItemWithOptionalChildren
>(({ className, children, ...props }, ref) => {
  const { title, disabled } = props
  return (
    <li>
      <NavigationMenuLink asChild>
        <Link
          href={props.href ?? ''}
          ref={ref}
          className={cn(
            "block select-none space-y-1 rounded-sm p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground",
            className,
            disabled && "opacity-50 cursor-not-allowed pointer-events-none"
          )}
          {...props}
        >
          <div className="text-sm font-normal leading-none">{title}</div>
          {
            children &&
            <p className="line-clamp-2 text-sm leading-snug text-muted-foreground flex flex-col">
              {children}
            </p>
          }
        </Link>
      </NavigationMenuLink>
    </li>
  )
})

ListItem.displayName = "ListItem"