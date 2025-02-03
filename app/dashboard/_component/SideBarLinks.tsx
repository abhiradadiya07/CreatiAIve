import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { FileClock, Home, Settings, WalletCards } from "lucide-react";
import UsageTrack from "./UsageTrack";

export default function SideBarLinks() {
  const pathname = usePathname();
  //   const sidebarLinks = [
  //     { path: "/", icon: Home, label: "Home" },
  //     { path: "/explore", icon: Search, label: "Explore" },
  //     { path: "/notifications", icon: Bell, label: "Notifications" },
  //     { path: "/profile", icon: User2, label: "Profile" },
  //   ];

  const MenuList = [
    {
      label: "Home",
      icon: Home,
      path: "/dashboard",
    },
    {
      label: "History",
      icon: FileClock,
      path: "/dashboard/history",
    },
    {
      label: "Billing",
      icon: WalletCards,
      path: "/dashboard/billing",
    },
    {
      label: "Settings",
      icon: Settings,
      path: "/dashboard/settings",
    },
  ];
  return (
    <div className="flex flex-col h-full">
      <ul>
        {MenuList.map(({ path, icon: Icon, label }) => (
          <li key={path} className={path !== "/" ? "mt-4" : ""}>
            <Link
              href={path}
              className={`flex justify-start items-center hover:font-bold hover:bg-primary hover:text-white rounded-lg p-4 dark:text-white ${
                pathname === path ? "font-bold bg-primary text-white" : ""
              }`}
            >
              <Icon className="text-2xl" height={25} width={25} />
              <h3 className="text-lg lg:text-xl ml-2">{label}</h3>
            </Link>
          </li>
        ))}
      </ul>

      <div className="absolute bottom-10 left-0 w-full">
        <UsageTrack />
      </div>
    </div>
  );
}
