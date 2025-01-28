"use client";
import { FileClock, Home, Settings, WalletCards } from "lucide-react";
import Image from "next/image";
import { usePathname } from "next/navigation";
import React, { useEffect } from "react";

function Sidebar() {
  const MenuList = [
    {
      name: "Home",
      icon: Home,
      path: "/dashboard",
    },
    {
      name: "History",
      icon: FileClock,
      path: "/dashboard/history",
    },
    {
      name: "Billing",
      icon: WalletCards,
      path: "/dashboard/billing",
    },
    {
      name: "Settings",
      icon: Settings,
      path: "/dashboard/settings",
    },
  ];

  const path = usePathname();
  useEffect(() => {
    console.log(path);
  }, []);

  return (
    <div className="h-screen border p-5 shadow-sm bg-white">
      <div className="flex justify-center">
        <Image src={"/logo.svg"} alt="Logo" width={120} height={100} />
      </div>
      <hr className="my-6 border" />
      <div className="mt-8">
        {MenuList.map((menu, index) => (
          <div
            className={`flex gap-2 mb-2 p-3 cursor-pointer hover:bg-primary rounded-lg hover:text-white items-center ${
              path == menu.path && "bg-primary text-white"
            }`}
            key={index}
          >
            <menu.icon className="h-7 w-7" />
            <h2 className="text-xl">{menu.name}</h2>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Sidebar;
