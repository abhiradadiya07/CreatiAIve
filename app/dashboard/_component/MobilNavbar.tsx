"use client";
import React from "react";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import Link from "next/link";
import { Menu, User2 } from "lucide-react";
import SideBarLinks from "./SideBarLinks";
import { UserButton } from "@clerk/nextjs";

export default function MobileNavBar() {
  return (
    <nav className="flex justify-between items-center">
      <div className="flex items-center">
        <Sheet>
          <SheetTrigger>
            <Menu
              height={35}
              width={35}
              className="border-2 rounded-md border-black"
            />
          </SheetTrigger>
          <SheetContent side="left">
            <SheetHeader>
              <SheetTitle>
                <Link
                  href={"/dashboard"}
                  className="flex justify-center items-center bg-gradient-to-r from-purple-500 to-blue-500 p-4 rounded-lg shadow-lg mb-6"
                >
                  <span className="ml-2 text-3xl font-extrabold text-white drop-shadow-lg">
                    Creati<span className="text-yellow-400">AI</span>ve
                  </span>
                </Link>
              </SheetTitle>
              <SheetDescription>
                <SideBarLinks />
              </SheetDescription>
            </SheetHeader>
          </SheetContent>
        </Sheet>
      </div>
      <UserButton />
    </nav>
  );
}
