import { UserRole, type SidebarNavItem } from "@/models"

export type DashboardConfig = {
  [key: string]: {
    sidebarNav: SidebarNavItem[]
  }
}

export const dashboardConfig: DashboardConfig = {
  [UserRole.ADMIN]: {
    sidebarNav: [
      {
        title: "Pedidos",
        href: "/dashboard/orders(.*)",
        icon: "orders",
        items: [],
      },
    ],
  },
}
