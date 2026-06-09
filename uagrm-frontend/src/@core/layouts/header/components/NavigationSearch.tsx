'use client'
import {
    DialogContent,
    DialogTrigger,
    Dialog,
    DialogTitle,
    DialogHeader,
    DialogDescription
} from "@/components/ui/dialog";
import {AiOutlineSearch} from "react-icons/ai";
import {useState} from "react";
import {Navigation} from "@/navigation/Navigation";
import Link from "next/link";
import IconButton from "@/components/ui/IconButton";
import { MenuNavigationTypes } from "@/navigation/types";

export const NavigationSearch = () => {
    const [itemToSearch, setItemToSearch] = useState<string>('')
const navigationOriginal: MenuNavigationTypes = Navigation();
    const [navigationMenu, setNavigationMenu] = useState<MenuNavigationTypes>(navigationOriginal)
    const [open, setOpen] = useState<boolean>(false)

    function handleSearch(e: React.ChangeEvent<HTMLInputElement>) {
        const value = e.target.value.toLowerCase().trim()
        setItemToSearch(value)
        const navigationItems = navigationOriginal.filter(item => item.title.toLowerCase().includes(value))
        setNavigationMenu(navigationItems)
    }
    
    const handleChangeOpen = (value: boolean) => {
        setOpen(value)
    }

    return (
        <Dialog modal={true} open={open} onOpenChange={handleChangeOpen}>
            <DialogTrigger asChild className="cursor-pointer">
                <div className="flex items-center">
                    <IconButton>
                        <AiOutlineSearch className="text-2xl text-muted-foreground" />
                    </IconButton>
                    <div className="hidden sm:block">
                        <span className="text-muted-foreground m-1 text-lg flex-shrink-0 font-normal">
                            Search
                        </span>
                    </div>
                </div>
            </DialogTrigger>
            <DialogContent className="min-h-[300px] max-h-[600px] transparent-scrollbar flex flex-col border-none">
                <DialogHeader>
                    <DialogTitle className="flex justify-center items-center gap-2 mt-2 border-b pb-3">
                        <AiOutlineSearch className="text-2xl text-muted-foreground" />
                        <input 
                            value={itemToSearch} 
                            onChange={handleSearch}
                            placeholder="Search..."
                            className="bg-background focus:outline-none w-full text-base placeholder:text-muted-foreground"
                        />
                        <DialogDescription />
                    </DialogTitle>
                </DialogHeader>
                <div className={`grid gap-4 ${
                    navigationMenu.length > 5 ? "grid-cols-2" : "grid-cols-1"
                } justify-start mt-4`}>
                    {navigationMenu.map((item, index) => (
                        <Link 
                            href={item.path ?? ''} 
                            key={index} 
                            className="flex items-center gap-3 cursor-pointer p-2 rounded-lg hover:bg-accent hover:text-accent-foreground transition-colors"
                            onClick={() => setOpen(false)}
                        >
                            {item.icon && <item.icon className="text-lg text-muted-foreground" />}
                            <span className="text-sm font-medium text-foreground">
                                {item.title}
                            </span>
                        </Link>
                    ))}
                </div>
                {navigationMenu.length === 0 && itemToSearch && (
                    <div className="flex-1 flex items-center justify-center">
                        <span className="text-muted-foreground text-sm">
                            No results found for "{itemToSearch}"
                        </span>
                    </div>
                )}
            </DialogContent>
        </Dialog>
    )
}