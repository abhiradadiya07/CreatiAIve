import { Button } from "@/components/ui/button";
import { UserProfile } from "@clerk/nextjs";
import React from "react";

function Settings() {
  return (
    <div className="flex items-center p-4 justify-center h-screen">
      <div className="z-0 relative">
        <UserProfile />
      </div>
    </div>
  );
}

export default Settings;
