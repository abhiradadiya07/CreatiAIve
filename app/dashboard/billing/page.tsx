"use client";
import { Button } from "@/components/ui/button";
import React, { useContext, useState } from "react";
import axios from "axios";
import { Loader2Icon } from "lucide-react";
import { db } from "@/utils/db";
import { UserSubscription } from "@/utils/schema";
import { useUser } from "@clerk/nextjs";
import moment from "moment";
import { UserSubscriptionContext } from "@/app/(context)/UserSubscriptionContext";
const BillingPage = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const { userSubscription, setUserSubscription } = useContext(
    UserSubscriptionContext
  );

  const { user } = useUser();
  const createSubscription = () => {
    setLoading(true);
    axios.post("/api/create-subscription", {}).then(
      (response) => {
        onPayment(response.data.id);
      },
      (error) => {
        setLoading(false);
      }
    );
  };
  const onPayment = (subId: string) => {
    const options = {
      key: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID,
      subscription_id: subId,
      name: "CreatiAIve",
      description: "Monthly Subscription",
      handler: async (resp: any) => {
        console.log(resp, "=======================");
        if (resp) {
          saveSubscription(resp?.razorpay_payment_id);
        }
        setLoading(false);
      },
    };
    console.log(options, "_____________________________");

    const rzp = new window.Razorpay(options);
    rzp.open();
  };

  const saveSubscription = async (paymentId: string) => {
    const result = await db.insert(UserSubscription).values({
      email: user?.primaryEmailAddress?.emailAddress,
      username: user?.fullName,
      active: true,
      paymentId: paymentId,
      joinDate: moment().format("DD/MM/yyyy"),
    });
    console.log(result);
    if (result) {
      window.location.reload();
    }
  };
  return (
    <div className="min-h-screen bg-slate-100 py-12 px-4 sm:px-6 lg:px-8">
      <script src="https://checkout.razorpay.com/v1/checkout.js"></script>
      <h2 className="font-bold text-3xl sm:text-4xl text-center p-8">
        Upgrade with Monthly Plan
      </h2>
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-center gap-8">
        {/* Free Plan Card */}
        <div className="bg-white rounded-lg shadow-lg p-8 text-center w-full md:w-1/2">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">Free Plan</h2>
          <p className="text-4xl font-bold text-gray-900 mb-6">
            $0<span className="text-lg text-gray-500">/Month</span>
          </p>
          <ul className="text-left text-gray-600 mb-8">
            <li className="mb-2 flex items-center">
              <span className="text-green-500 mr-2">✔</span> 10,000Words/Month
            </li>
            <li className="mb-2 flex items-center">
              <span className="text-green-500 mr-2">✔</span> 50+ Content
              Templates
            </li>
            <li className="mb-2 flex items-center">
              <span className="text-green-500 mr-2">✔</span> Unlimited Download
              and Copy
            </li>
            <li className="mb-2 flex items-center">
              <span className="text-green-500 mr-2">✔</span> 1 Month of History
            </li>
          </ul>
          {!userSubscription && <Button>Current Active Plan</Button>}
        </div>

        {/* Monthly Plan Card */}
        <div className="bg-white rounded-lg shadow-lg p-8 text-center border-2 w-full md:w-1/2 border-blue-500">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">
            Monthly Plan
          </h2>
          <p className="text-4xl font-bold text-gray-900 mb-6">
            $9.99<span className="text-lg text-gray-500">/Month</span>
          </p>
          <ul className="text-left text-gray-600 mb-8">
            <li className="mb-2 flex items-center">
              <span className="text-green-500 mr-2">✔</span> 10,0000Words/Month
            </li>
            <li className="mb-2 flex items-center">
              <span className="text-green-500 mr-2">✔</span> 50+ Templates
              Access
            </li>
            <li className="mb-2 flex items-center">
              <span className="text-green-500 mr-2">✔</span> Unlimited Download
              and Copy
            </li>
            <li className="mb-2 flex items-center">
              <span className="text-green-500 mr-2">✔</span> 1 Year of History
            </li>
          </ul>
          <Button
            onClick={() => createSubscription()}
            disabled={loading || userSubscription}
          >
            {loading && <Loader2Icon className="animate-spin" />}
            {userSubscription ? "Subscribe Now" : "Current Active Plane"}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default BillingPage;
