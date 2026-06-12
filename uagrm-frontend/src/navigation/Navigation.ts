import { Role } from "@/modules/user/types/user.type";
import { MenuNavigationTypes, } from "@/navigation/types";
import {
  LayoutDashboard,
  CreditCard,
  Building2,

  NotebookPen,
  User
} from "lucide-react";


export const Navigation = (): MenuNavigationTypes => {
  const routes: MenuNavigationTypes = [
    {
      title: "Dashboards",
      icon: LayoutDashboard,
      roles: [Role.ADMIN, Role.MODERATOR, Role.AGENT],
      subMenuItems: [
        {
          title: "Vista rápida",
          path: "/dashboard",
          roles: [Role.ADMIN, Role.MODERATOR, Role.AGENT],
        },
      ]
    },

    {
      title: "Reportes",
      path: "/reports",
      icon: NotebookPen,
      roles: [Role.ADMIN, Role.MODERATOR, Role.AGENT],
    },
        {
      title: "Usuarios",
      path: "/users",
      icon: User,
      roles: [Role.ADMIN, Role.MODERATOR, Role.AGENT],
    },

  ];
  return routes;
};


