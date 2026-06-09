import { MenuNavigationTypes, Role } from "@/navigation/types";
import {
  LayoutDashboard,
  Coins,
  CreditCard,
  Wallet,
  Building2,
  KeyRound,
  Code
} from "lucide-react";

export const Navigation = (): MenuNavigationTypes => {
  const routes: MenuNavigationTypes = [
    {
      title: "Dashboards",
      icon: LayoutDashboard,
      roles: [Role.ADMIN, Role.MODERATOR, Role.USER],
      subMenuItems: [
        {
          title: "Vista rápida",
          path: "/dashboard",
           roles: [Role.ADMIN, Role.MODERATOR, Role.USER],
        },
        {
          title: "Reportes",
          path: "/dashboard/report",
    roles: [Role.ADMIN, Role.MODERATOR, Role.USER],
        }
      ]
    },
    {
      title: "Cobrar",
      path: "/charge",
      icon: Coins,
  roles: [Role.ADMIN, Role.MODERATOR, Role.USER],
    },
    {
      title: "Pagos",
      path: "/payments",
      icon: CreditCard,
  roles: [Role.ADMIN, Role.MODERATOR, Role.USER],
    },

    {
      title: "Organización",
      icon: Building2,
  roles: [Role.ADMIN, Role.MODERATOR, Role.USER],
      subMenuItems: [
        {
          title: "Usuarios",
          path: "/organization/members",
       roles: [Role.ADMIN, Role.MODERATOR, Role.USER],
        }
      ]
    },
  ];

  return routes;
};


