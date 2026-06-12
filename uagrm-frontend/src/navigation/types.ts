import { Role } from "@/modules/user/types/user.type";
import { IconType } from "react-icons";


interface SubMenuItem {
    title: string;
    path: string;
    action?: string;
    subject?: string;
    icon?: IconType;
    roles?: Role[]
}

interface MenuItem {
    title: string;
    path?: string;
    action?: string;
    subject?: string;
    icon: IconType;
    subMenuItems?: SubMenuItem[];
    roles?: Role[]
}
export type MenuNavigationTypes = MenuItem[];



