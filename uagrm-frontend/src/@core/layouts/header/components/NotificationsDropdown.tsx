'use client'
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuTrigger
} from "@/components/ui/dropdown-menu";
import {IoMdNotificationsOutline} from "react-icons/io";
import {Button} from "@/components/ui/button";
import * as React from "react";
import {RiMailOpenLine} from "react-icons/ri";
import {useState} from "react";
import {IoIosClose} from "react-icons/io";
import {TbPointFilled} from "react-icons/tb";
import {Tooltip, TooltipContent, TooltipProvider, TooltipTrigger} from "@/components/ui/tooltip";
import { Chip } from "@/components/ui/chip";

type NotificationType ={
    id: number;
    title: string;
    description: string;
    dateTime:string;
    image: string;
    status: 'new' | 'read';
}

export const NotificationsDropdown = () => {
    const [notifications, setNotifications] = useState<NotificationType[]>([
  
    ])

    const countNewNotifications = notifications.filter(notification => notification.status === 'new').length
    const isAllNotificationRead: boolean = notifications.every(notifications => notifications.status ==='read')
    const existNewNotifications: boolean = notifications.some(notification => notification.status === 'new')
    
    function removeNotification(id: number, e: React.MouseEvent) {
        e.stopPropagation()
        setNotifications((prevNotification) =>
            prevNotification.filter((notification) => notification.id !== id))
    }
    
    function markAllAs(status: 'read' | 'new'){
        setNotifications((prevNotifications) =>
            prevNotifications.map(notification => ({...notification, status})))
    }

    return (
        <div>
            <DropdownMenu>
                <DropdownMenuTrigger asChild>
                    <Button variant="ghost" size="icon-lg" color="inherit"
                            className="hover:rounded-full focus:invisible relative [&_svg]:h-6! [&_svg]:w-6! text-muted-foreground">
                        <IoMdNotificationsOutline />
                        {existNewNotifications &&
                            <span className="absolute top-2 right-2 h-[0.5rem] w-[0.5rem] rounded-full bg-destructive"></span>
                        }
                    </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="border-border w-80 max-h-[40rem]">
                    <div className="border-b border-border mb-2 w-full flex items-center justify-between p-4">
                        <DropdownMenuLabel className="text-lg font-semibold text-foreground">
                            Notifications
                        </DropdownMenuLabel>
                        <div className="flex items-center gap-2">
                            {countNewNotifications > 0 && (
                                <Chip variant="success" label={`${countNewNotifications} New`} />
                            )}
                            <TooltipProvider>
                                <Tooltip>
                                    <TooltipTrigger className="rounded-full p-2 hover:bg-accent transition-colors"
                                                    onClick={() => markAllAs(isAllNotificationRead ? 'new' : 'read')}>
                                        <RiMailOpenLine size="20px" className="text-muted-foreground" />
                                    </TooltipTrigger>
                                    <TooltipContent>
                                        <p className="text-sm">{isAllNotificationRead ? 'Mark all as unread' : 'Mark all as read'}</p>
                                    </TooltipContent>
                                </Tooltip>
                            </TooltipProvider>
                        </div>
                    </div>
                    <div className="transparent-scrollbar max-h-[25rem] overflow-y-auto">
                        {notifications.map((item) => (
                            <DropdownMenuItem key={item.id} className="group p-3 hover:bg-accent">
                                <div className="flex items-start justify-between w-full gap-3">
                                    <div className="flex items-start gap-3 flex-1">
                                        {item.image ? (
                                            <img 
                                                src={item.image} 
                                                alt={item.description} 
                                                width={40} 
                                                height={40}
                                                className="rounded-full flex-shrink-0"
                                            />
                                        ) : (
                                            <div className="rounded-full p-2 bg-muted flex-shrink-0">
                                                <span className="text-xs font-medium text-muted-foreground">
                                                    {item.title.split(' ').map(word => word[0]).join('').slice(0, 2).toUpperCase()}
                                                </span>
                                            </div>
                                        )}
                                        <div className="flex flex-col flex-1 min-w-0">
                                            <span className="text-sm font-medium text-foreground">
                                                {item.title}
                                            </span>
                                            <span className="text-sm text-muted-foreground mt-1">
                                                {item.description}
                                            </span>
                                            <span className="text-xs text-muted-foreground mt-1">
                                                {item.dateTime}
                                            </span>
                                        </div>
                                    </div>
                                    <div className="flex flex-col items-end gap-1">
                                        {item.status === 'new' && (
                                            <TbPointFilled className="text-primary text-lg" />
                                        )}
                                        <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 cursor-pointer">
                                            <IoIosClose 
                                                size={20}
                                                className="text-muted-foreground hover:text-destructive transition-colors"
                                                onClick={(e) => removeNotification(item.id, e)}
                                                style={{pointerEvents: "auto"}}
                                            />
                                        </div>
                                    </div>
                                </div>
                            </DropdownMenuItem>
                        ))}
                    </div>
                    <div className="mt-2 sticky bottom-0 bg-background p-3 border-t border-border">
                        <Button className="w-full">View All Notifications</Button>
                    </div>
                </DropdownMenuContent>
            </DropdownMenu>
        </div>
    )
}