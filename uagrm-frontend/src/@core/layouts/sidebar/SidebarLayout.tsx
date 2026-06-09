"use client";
import { useContext } from "react";
import { SettingsContext } from "@/context/settings-provider";
import { SidebarHeader } from "@/@core/layouts/sidebar/components/SidebarHeader";
import { SidebarContent } from "@/@core/layouts/sidebar/components/SidebarContent";
import { MenuNavigationTypes } from "@/navigation/types";



interface Props {
  routes: MenuNavigationTypes
}
export const Sidebar = ({ routes }: Props) => {
  const { settings } = useContext(SettingsContext);
  if (settings.navHidden) return null



  return (
    <div className="flex flex-col h-screen">
      <div
        className={`md:flex hidden h-full ${(settings.navCollapsed) ? "w-17 hover:w-72" : "w-72"
          } flex-col rounded transition-all duration-500 ease-in-out group`}
      >
        <div className="sticky top-0  z-10 mt-2 ">
          <SidebarHeader />
        </div>
        <SidebarContent routes={routes} />

      </div>
    </div>
  );
};
