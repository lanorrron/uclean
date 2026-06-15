"use client";
import { useContext, useEffect, useState } from "react";
import { IoMdMenu } from "react-icons/io";
import { SettingsContext } from "@/context/settings-provider";
import { SidebarHeader } from "@/@core/layouts/sidebar/components/SidebarHeader";
import { SidebarContent } from "@/@core/layouts/sidebar/components/SidebarContent";
import Drawer from "@/@core/layouts/sidebar/components/Drawer";
import { NavigationSearch } from "./components/NavigationSearch";
import { ModeToggle } from "./components/ThemeDropdown";
import { NotificationsDropdown } from "./components/NotificationsDropdown";
import { ProfileDropdown } from "./components/ProfileDropdown";
import { MenuNavigationTypes } from "@/navigation/types";

interface Props {
  routes: MenuNavigationTypes
}

const Header = ({ routes }: Props) => {
  const { settings } = useContext(SettingsContext);
  const [openDrawer, setOpenDrawer] = useState<boolean>(false);

  const handleChangeOpenDrawer = () => {
    setOpenDrawer(!openDrawer);
  };

  useEffect(() => {
    const container = document.getElementById("scrollContainer");

    if (container) {
      const handleScroll = () => {
        const div = document.getElementById("myDiv");
        if (container.scrollTop > 10) {
          div?.classList.add(
            "px-4",
            "transition-all",
            "shadow-sm",
            "duration-500",
            "bg-background/30",
            "backdrop-blur-sm"
          );
        } else {
          div?.classList.remove("shadow-sm", "px-4", "bg-background/30", "backdrop-blur-sm");
        }
      };

      container.addEventListener("scroll", handleScroll);

      return () => {
        container.removeEventListener("scroll", handleScroll);
      };
    } else {
      console.error("El contenedor 'scrollContainer' no se encontró.");
    }
  }, []);



  return (
    <div className="sticky top-0 h-16 px-4 z-10">
      <div
        id="myDiv"
        className={`sticky top-0 h-16 px-4 rounded-xl transition-all p-2 grid grid-cols-3 items-center z-10
    ${openDrawer ? "bg-background" : "bg-background/30 backdrop-blur-sm"}
  `}
      >
        <div className="col-start-1 flex justify-start items-center gap-2 ">
          {settings.navHidden && (
            <div>
              <IoMdMenu
                onClick={handleChangeOpenDrawer}
                className={"cursor-pointer text-2xl"}
              />
              <Drawer
                onClose={handleChangeOpenDrawer}
                isOpen={openDrawer}
                classNameContent={"w-80"}
              >
                <SidebarHeader
                  isOpenDrawer={openDrawer}
                  onClose={handleChangeOpenDrawer}
                />
                <SidebarContent
                  routes={routes}
                  onClose={handleChangeOpenDrawer}
                  isOpenDrawer={openDrawer}
                />
              </Drawer>
            </div>
          )}
          <NavigationSearch />
        </div>
        <div className="col-start-3 flex justify-end gap-2">
          <ModeToggle />
          <NotificationsDropdown />
          <ProfileDropdown />
        </div>
      </div>

    </div>

  );
};
export default Header;
