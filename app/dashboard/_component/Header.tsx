import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";
import React from "react";

function Header() {
  return (
    <div className="border-b-2 shadow-md p-5 flex justify-between items-center">
      <div className="flex gap-2 w-[40%] items-center p-2 rounded-md border">
        <Search className="mx-2" />
        <Input placeholder="Search..." className="outline-none" />
      </div>
      <div>
        <h2 className="bg-primary p-3 rounded-full text-md text-white">
          Join membership just for $9.99/Month
        </h2>
      </div>
    </div>
  );
}

export default Header;
