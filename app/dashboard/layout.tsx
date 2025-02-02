"use client";
import React, { useState } from "react";
import Sidebar from "./_component/Sidebar";
import Header from "./_component/Header";
import { TotalUsageContext } from "../(context)/TotalUsageContext";
import { UserSubscriptionContext } from "../(context)/UserSubscriptionContext";

function layout({ children }: Readonly<{ children: React.ReactNode }>) {
  const [totalUsage, setTotalUsage] = useState<Number>(0);
  const [userSubscription, setUserSubscription] = useState<Boolean>(false);
  return (
    <TotalUsageContext.Provider value={{ totalUsage, setTotalUsage }}>
      <UserSubscriptionContext.Provider
        value={{ userSubscription, setUserSubscription }}
      >
        <div className="bg-slate-100 h-screen">
          <div className="lg:w-64 lg:block hidden fixed">
            <Sidebar />
          </div>

          <div className="lg:ml-64">
            <Header />
            {children}
          </div>
        </div>
      </UserSubscriptionContext.Provider>
    </TotalUsageContext.Provider>
  );
}

export default layout;
