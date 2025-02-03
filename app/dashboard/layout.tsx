"use client";
import React, { useState } from "react";
import Sidebar from "./_component/Sidebar";
import { TotalUsageContext } from "../(context)/TotalUsageContext";
import { UserSubscriptionContext } from "../(context)/UserSubscriptionContext";
import { UpdateCreditContext } from "../(context)/UpdateCreditContext";
import MobileNavBar from "./_component/MobilNavbar";

function layout({ children }: Readonly<{ children: React.ReactNode }>) {
  const [totalUsage, setTotalUsage] = useState<Number>(0);
  const [userSubscription, setUserSubscription] = useState<Boolean>(false);
  const [creditUsage, setCreditUsage] = useState<any>();
  return (
    <TotalUsageContext.Provider value={{ totalUsage, setTotalUsage }}>
      <UpdateCreditContext.Provider value={{ creditUsage, setCreditUsage }}>
        <UserSubscriptionContext.Provider
          value={{ userSubscription, setUserSubscription }}
        >
          <div className="lg:w-64 lg:block hidden fixed">
            <Sidebar />
          </div>
          <div className="block lg:hidden p-4">
            <MobileNavBar />
          </div>

          <div className="bg-slate-100 h-full min-h-screen">
            <div className="lg:ml-64">{children}</div>
          </div>
        </UserSubscriptionContext.Provider>
      </UpdateCreditContext.Provider>
    </TotalUsageContext.Provider>
  );
}

export default layout;
