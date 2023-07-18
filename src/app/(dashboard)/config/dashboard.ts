import { UserRole, type SidebarNavItem } from "@/models"

interface SidebarNavItemWithRegex extends SidebarNavItem {
  regex: RegExp
}
export type DashboardConfig = {
  [key: string]: {
    sidebarNav: SidebarNavItemWithRegex[]
  }
}

export const dashboardConfig: DashboardConfig = {
  [UserRole.ADMIN]: {
    sidebarNav: [
      {
        title: "Pedidos",
        href: "/dashboard/orders",
        regex: /^\/dashboard\/orders(.*)/,
        icon: "orders",
        items: [],
      },
    ],
  },
}
