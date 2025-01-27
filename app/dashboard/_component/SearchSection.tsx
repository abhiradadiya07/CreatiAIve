import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";
import React from "react";

function SearchSection({ onSearchInput }: any) {
  return (
    <div className="p-10 rounded-b-full bg-gradient-to-br from-purple-500 via-purple-700 to-blue-500 flex flex-col justify-center items-center text-white">
      <h1 className="text-3xl font-bold">Browse All Template</h1>
      <p>What would you like to create today?</p>
      <div className="w-full flex justify-center">
        <div className="flex gap-2 items-center p-2 border rounded-md bg-white mt-4 w-[50%]">
          <Search className="text-primary mx-1" />
          <Input
            onChange={(event) => onSearchInput(event.target.value)}
            placeholder="Search"
            className="text-black focus-visible:ring-primary font-medium"
          />
        </div>
      </div>
    </div>
  );
}

export default SearchSection;
