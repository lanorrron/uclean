import Image from "next/image";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { MdPermIdentity } from "react-icons/md";
import { IoSettingsOutline } from "react-icons/io5";
import { Button } from "@/components/ui/button";
import { IoIosLogOut } from "react-icons/io";

import { useAuth } from "@/hooks/useAuth";



// Función para obtener iniciales del nombre
const getInitials = (fullName?: string): string => {
  if (!fullName) return "U";
  
  return fullName
    .split(' ')
    .map(word => word[0])
    .join('')
    .toUpperCase()
    .slice(0, 2);
};

const UserAvatar = ({ 
  src, 
  alt, 
  userName, 
  size = 40 
}: { 
  src?: string; 
  alt: string; 
  userName?: string;
  size?: number;
}) => {
  const initials = getInitials(userName);
  
  if (src) {
    return (
      <Image
        src={src}
        alt={alt}
        width={size}
        height={size}
        className="rounded-full border-2 border-none hover:border-primary transition-colors object-cover"
      />
    );
  }
  
  return (
    <div 
      className="rounded-full border-2 border-none hover:border-primary transition-colors bg-primary flex items-center justify-center text-primary-foreground font-medium"
      style={{ width: size, height: size }}
    >
      {initials}
    </div>
  );
};

export const ProfileDropdown = () => {
  const { user, logout } = useAuth();


  const fullName = user?.user_metadata?.firstName + " " + user?.user_metadata?.lastName

  const userImage = user?.user_metadata?.avatar_url || null;
  const userName = user?.user_metadata?.full_name || fullName  ;
  const userEmail = user?.email;

  return (
    <div className="flex justify-center items-center">
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <div className="cursor-pointer border-none shrink-0 px-2 ">
            <UserAvatar 
              src={userImage} 
              alt="profile image" 
              userName={userName}
              size={35}
            />
          </div>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="border-none w-64">
          <div className="flex items-center gap-3 p-4 border-b border-border">
            <UserAvatar 
              src={userImage}  // Ahora puede ser null
              alt="profile image" 
              userName={userName}
              size={48}
            />
            <div className="flex flex-col min-w-0">
              <span className="text-sm font-medium text-foreground truncate">
                {userName || "User"}
              </span>
              <span className="text-xs text-muted-foreground truncate">
                {userEmail || "No email"}
              </span>
            </div>
          </div>
          <div className="p-2">
 
            <Button
              variant="default"
              className="w-full h-9 mt-2 cursor-pointer hover:bg-red-600"
              onClick={()=>logout()}
            >
              <div className="flex items-center justify-center gap-2">
                <span className="text-sm font-medium">Logout</span>
                <IoIosLogOut size={18} className="font-semibold" />
              </div>
            </Button>
          </div>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
};