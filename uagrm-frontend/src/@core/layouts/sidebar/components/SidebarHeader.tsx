"use client";
import { MdKeyboardDoubleArrowLeft } from "react-icons/md";
import { useContext } from "react";
import { IoMdClose } from "react-icons/io";
import { SettingsContext } from "@/context/settings-provider";
import Image from "next/image";

interface Props {
  isOpenDrawer?: boolean;
  onClose?: () => void;
}

export const SidebarHeader = ({ isOpenDrawer, onClose }: Props) => {
  const { settings, saveSettings } = useContext(SettingsContext);

  function toggleNavCollapse() {
    saveSettings({ ...settings, navCollapsed: !settings.navCollapsed });
  }

  const showTitle =
    isOpenDrawer || !settings.navCollapsed;

  return (
    <div className="px-2 mt-2 flex items-center relative group">

      <div
        className={`flex items-center justify-center rounded-md 
    bg-gradient-to-br from-primary to-secondary
    transition-all duration-300
    ${settings.navCollapsed ? "w-10 h-10" : "w-10 h-10"}
  `}
      >
        <span
          className={`text-white font-extrabold transition-all duration-300 
      ${settings.navCollapsed ? "text-2xl" : "text-3xl"}
    `}
        >
          U
        </span>
      </div>
<div
  className={`
    flex flex-col ml-2
    transition-all duration-300 overflow-hidden
    ${showTitle ? "w-auto opacity-100" : "w-0 opacity-0 group-hover:w-auto group-hover:opacity-100"}
  `}
>
<h1
  className="
    text-2xl
    font-bold
    bg-gradient-to-r
    to-secondary
    from-red-600
    bg-clip-text
    text-transparent
    whitespace-nowrap

    dark:from-white
    dark:to-primary
  "
>
   CLEAN
</h1>
</div>


      <div className="absolute right-4 cursor-pointer text-muted-foreground">
        {isOpenDrawer ? (
          <IoMdClose
            onClick={onClose}
            className="text-xl hover:text-sidebar-accent-foreground transition-colors"
          />
        ) : (
          <MdKeyboardDoubleArrowLeft
            className={`
              text-xl transition-all duration-300 hover:text-sidebar-accent-foreground
              ${settings.navCollapsed ? "rotate-180" : ""}
              ${settings.navCollapsed ? "hidden group-hover:block" : "block"}
            `}
            onClick={toggleNavCollapse}
          />
        )}
      </div>
    </div>
  );
};
