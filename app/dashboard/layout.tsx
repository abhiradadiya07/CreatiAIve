import React from "react";
import Sidebar from "./_component/Sidebar";
import Header from "./_component/Header";

function layout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <div>
      <div className="md:w-64 md:block hidden fixed">
        <Sidebar />
      </div>

      <div className="md:ml-64">
        <Header />
        {children}
      </div>
    </div>
  );
}

export default layout;
