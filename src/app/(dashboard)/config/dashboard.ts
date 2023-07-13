import { UserRole, type SidebarNavItem } from "@/models"

export type DashboardConfig = {
  [key: string]: {
    sidebarNav: SidebarNavItem[]
  }
}

export const dashboardConfig: DashboardConfig = {
  [UserRole.USER]: {
    sidebarNav: [
      {
        title: "Cuenta",
        href: "/dashboard/account",
        icon: "user",
        items: [],
      },
    ],
  },
  [UserRole.ADMIN]: {
    sidebarNav: [
      {
        title: "Pedidos",
        href: "/dashboard/orders",
        icon: "orders",
        items: [],
      },
    ],
  },
}
