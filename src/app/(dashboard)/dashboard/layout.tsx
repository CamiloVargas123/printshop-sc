import SiteHeader from "@/components/layouts/SiteHeader"
import { ScrollArea } from "@/components/ui/ScrollArea"
import { UserRole } from "@/models"
import { currentUser } from "@clerk/nextjs"
import { redirect } from "next/navigation"
import SidebarNav from "../components/layout/SidebarNav"
import { headers } from "next/dist/client/components/headers"
import { dashboardConfig } from "../config/dashboard"

interface DashboardLayoutProps {
  children: React.ReactNode
}

export default async function DashboardLayout({ children }: DashboardLayoutProps) {
  const user = await currentUser()
  const header = headers();
  const pathName = header.get("pathName")

  if (!user?.privateMetadata.role || !pathName) {
    redirect("/")
  }
  const sidebarNav = dashboardConfig[user.privateMetadata.role as UserRole].sidebarNav
  const pathNamesAccess = sidebarNav.map((item) => item.href)

  if(!pathNamesAccess.includes(pathName)) redirect("/unauthorized")

  return (
    <div className="flex min-h-screen flex-col">
      <SiteHeader user={user} />
      <div className="container flex-1 items-start md:grid md:grid-cols-[220px_minmax(0,1fr)] md:gap-6 lg:grid-cols-[240px_minmax(0,1fr)] lg:gap-10">
        <aside className="fixed top-14 z-30 -ml-2 hidden h-[calc(100vh-3.5rem)] w-full shrink-0 overflow-y-auto border-r md:sticky md:block">
          <ScrollArea className="py-6 pr-6 lg:py-8">
            <SidebarNav items={sidebarNav} />
          </ScrollArea>
        </aside>
        <main className="flex w-full flex-col overflow-hidden">{children}</main>
      </div>
    </div>
  )
}

