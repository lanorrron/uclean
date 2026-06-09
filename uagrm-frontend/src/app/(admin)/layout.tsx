'use client'

import { Loader } from "@/@core/components/loader/Loader";
import Header from "@/@core/layouts/header/Header";
import { Sidebar } from "@/@core/layouts/sidebar/SidebarLayout";
import { useAuth } from "@/hooks/useAuth";
import { Navigation } from "@/navigation/Navigation";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function AdminLayout({ children, }: { children: React.ReactNode; }) {
  const { profile } = useAuth()
  const router = useRouter();
  const pathname = usePathname();
  const [authorized, setAuthorized] = useState<boolean | null>(null)

  const filteredRoutes = Navigation()
    .filter((route:any) => {
      if (!profile) return false;
      return route.roles?.includes(profile.role);
    })
    .map((route:any) => ({
      ...route,
      subMenuItems: route.subMenuItems?.filter(
        (sub:any) =>
          !sub.roles ||
          sub.roles.includes(profile!.role)
      ),
    }));

useEffect(() => {
  if (!profile) return;

  const allowedPaths = filteredRoutes.flatMap((r:any) => [
    r.path,
    ...(r.subMenuItems?.map((sub:any) => sub.path) || []),
  ]).filter(Boolean) as string[];

  if (!allowedPaths.includes(pathname)) {
    router.replace('/not-found');
    setAuthorized(false);
  } else {
    setAuthorized(true);
  }
}, [pathname, filteredRoutes, router]);


  if (authorized === null) {
    return (
      <div className="flex h-screen w-full items-center justify-center">
        <Loader size="48px" />
      </div>
    );
  }

  if (!authorized) {
    return null;
  }

  return (
    <div className="relative z-0 flex h-screen w-full overflow-hidden">

      <Sidebar routes={filteredRoutes} />
      <div
        id="scrollContainer"
        className="flex flex-col flex-1 h-full overflow-auto mr-3"
      >
        <Header routes={filteredRoutes} />
        <div className="flex-1 mt-2 mb-4 px-4">
          {children}
        </div>
      </div>
    </div>
  );
}
