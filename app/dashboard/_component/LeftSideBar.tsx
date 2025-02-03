"use client";
import React from "react";
import Link from "next/link";
import SideBarLinks from "./SideBarLinks";

export default function LeftSidebar() {
  return (
    <div className="h-screen">
      <Link
        href={"/dashboard"}
        className="flex justify-center items-center bg-gradient-to-r from-purple-500 to-blue-500 p-4 rounded-lg shadow-lg mb-6"
      >
        <span className="ml-2 text-3xl font-extrabold text-white drop-shadow-lg">
          Creati<span className="text-yellow-400">AI</span>ve
        </span>
      </Link>
      <hr className="my-6 border" />
      <SideBarLinks />
    </div>
  );
}
