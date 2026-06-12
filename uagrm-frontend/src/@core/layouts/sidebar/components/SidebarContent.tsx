'use client'
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useContext, useEffect, useState } from "react";
import { SettingsContext } from "@/context/settings-provider";
import { MdOutlineKeyboardArrowRight } from "react-icons/md";
import { TbPointFilled } from "react-icons/tb";
import { MenuNavigationTypes } from "@/navigation/types";


interface Props {
    onClose?: () => void
    isOpenDrawer?: boolean
    routes: MenuNavigationTypes
}

export const SidebarContent = ({ onClose, isOpenDrawer, routes }: Props) => {
    const pathName = usePathname();
    const { settings } = useContext(SettingsContext);
    const [openSubMenus, setOpenSubMenus] = useState<number[]>([]);

    useEffect(() => {
        const activeIndex = routes.findIndex((item) =>
            item.subMenuItems?.some((subItem) => subItem.path === pathName)
        );
        if (activeIndex !== -1) {
            setOpenSubMenus([activeIndex]);
        } else {
            setOpenSubMenus([])
        }
    }, [pathName]);

    const toggleSubMenu = (index: number) => {
        setOpenSubMenus(prev => {
            if (prev.includes(index)) {
                return prev.filter(i => i !== index);
            } else {
                return [...prev, index];
            }
        });
    };

    const ellipsisTextClass = 'whitespace-nowrap text-ellipsis overflow-hidden max-w-[200px]'
    const isExactActive = (
        path?: string
    ) => {

        if (!path) return false;

        return pathName === path;
    };

    const isSubRouteActive = (
        path?: string
    ) => {

        if (!path) return false;

        return (
            pathName.startsWith(`${path}/`)
        );
    };

    return (
        <div className="flex-grow p-2 transparent-scrollbar">
            <div className="my-0 items-center overflow-hidden">
                <ul className="pt-2">
                    {routes.map((item, index) => (
                        <div key={index}>
                            {/* Items con path (enlaces) */}
                            {item.path ? (
                                <Link
                                    href={item.path}
                                    onClick={onClose}
                                    className={`group flex p-2 my-2 pl-3.5 rounded-lg transition-colors   ${isExactActive(item.path)
                                        ? 'bg-sidebar-primary text-primary-foreground'

                                        : isSubRouteActive(item.path)
                                            ? 'bg-sidebar-accent text-sidebar-accent-foreground'

                                            : 'text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground'
                                        } relative`}
                                >
                                    <div className="flex items-center w-full ">
                                        {item.icon && (
                                            <div>
                                                <item.icon size={'21px'} />
                                            </div>
                                        )}
                                        <div className={`ml-2 flex-1 ${(settings.navCollapsed && !isOpenDrawer)
                                            ? 'hidden group-hover:block transition-all duration-500'
                                            : 'block'
                                            } ${ellipsisTextClass}`}>
                                            <span className={` ${pathName === item.path ? 'text-primary-foreground font-mui font-medium' : 'text-muted-foreground font-mui font-medium'
                                                }`}>
                                                {item.title}
                                            </span>
                                        </div>
                                        {item.subMenuItems && (
                                            <div className="absolute right-2 text-muted-foreground">
                                                <MdOutlineKeyboardArrowRight
                                                    className={`text-lg transition-transform ${openSubMenus.includes(index) ? 'rotate-90' : ''
                                                        }`}
                                                    onClick={(e) => {
                                                        e.preventDefault();
                                                        e.stopPropagation();
                                                        toggleSubMenu(index);
                                                    }}
                                                />
                                            </div>
                                        )}
                                    </div>
                                </Link>
                            ) : (
                                /* Items sin path (solo títulos) */
                                <div
                                    className={`group flex p-2 my-2 pl-3.5 rounded-lg transition-colors cursor-pointer ${openSubMenus.includes(index)
                                        ? 'bg-sidebar-accent text-sidebar-accent-foreground'
                                        : 'text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground'
                                        } relative`}
                                    onClick={() => toggleSubMenu(index)}
                                >
                                    <div className="flex items-center w-full">
                                        {item.icon && (
                                            <div className="">
                                                <item.icon size={'21px'} />
                                            </div>
                                        )}
                                        <div className={`ml-2 flex-1 ${(settings.navCollapsed && !isOpenDrawer)
                                            ? 'hidden group-hover:block transition-all duration-500'
                                            : 'block'
                                            } ${ellipsisTextClass}`}>
                                            <span className="text-muted-foreground font-mui font-medium">
                                                {item.title}
                                            </span>
                                        </div>
                                        {item.subMenuItems && (
                                            <div
                                                className={`
            absolute right-2 text-muted-foreground
            ${settings.navCollapsed && !isOpenDrawer
                                                        ? "hidden group-hover:block"
                                                        : "block"
                                                    }
        `}
                                            >
                                                <MdOutlineKeyboardArrowRight
                                                    className={`text-lg transition-transform ${openSubMenus.includes(index)
                                                        ? "rotate-90"
                                                        : ""
                                                        }`}
                                                />
                                            </div>
                                        )}
                                    </div>
                                </div>
                            )}

                            {/* Submenús */}
                            {item.subMenuItems && openSubMenus.includes(index) && (
                                <ul className={`ml-4 mt-1 ${(settings.navCollapsed && !isOpenDrawer)
                                    ? 'hidden group-hover:block'
                                    : 'block'
                                    }`}>
                                    {item.subMenuItems.map((subItem, subIndex) => (
                                        <Link
                                            href={subItem.path}
                                            key={subIndex}
                                            onClick={onClose}
                                        >
                                            <li className={`text-sm flex items-center gap-x-2 cursor-pointer p-2 my-1 pl-3 rounded-md transition-colors ${pathName === subItem.path
                                                ? 'bg-primary text-primary-foreground'
                                                : 'text-muted-foreground hover:bg-sidebar-accent '
                                                }`}>
                                                <TbPointFilled className="text-sm flex-shrink-0" />
                                                <span className={`${ellipsisTextClass} font-mui font-medium`}>
                                                    {subItem.title}
                                                </span>
                                            </li>
                                        </Link>
                                    ))}
                                </ul>
                            )}
                        </div>
                    ))}
                </ul>
            </div>
        </div>
    );
};