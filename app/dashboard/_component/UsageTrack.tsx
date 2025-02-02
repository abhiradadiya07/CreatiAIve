import { Button } from "@/components/ui/button";
import { db } from "@/utils/db";
import { AIOutput, UserSubscription } from "@/utils/schema";
import { useUser } from "@clerk/nextjs";
import { useContext, useEffect, useState } from "react";
import { HistoryList } from "../history/page";
import { eq } from "drizzle-orm";
import { TotalUsageContext } from "@/app/(context)/TotalUsageContext";
import { UserSubscriptionContext } from "@/app/(context)/UserSubscriptionContext";

function UsageTrack() {
  const { user } = useUser();
  const [maxWords, setMaxWord] = useState<any>(10000);
  const { totalUsage, setTotalUsage } = useContext(TotalUsageContext);
  const { userSubscription, setUserSubscription } = useContext(
    UserSubscriptionContext
  );

  useEffect(() => {
    user && getData();
    user && IsUserSubscribe();
  }, [user]);

  const getData = async () => {
    const result: HistoryList[] = await db
      .select()
      .from(AIOutput)
      .where(eq(AIOutput.createdBy, user?.primaryEmailAddress?.emailAddress));
    GetTotalUsage(result);
  };

  const GetTotalUsage = (result: HistoryList[]) => {
    let total: number = 0;
    result.forEach((element) => {
      total = total + Number(element.aiResponse?.length);
    });
    setTotalUsage(total);
  };

  const IsUserSubscribe = async () => {
    const result = await db
      .select()
      .from(UserSubscription)
      .where(
        eq(UserSubscription.email, user?.primaryEmailAddress?.emailAddress)
      );
    if (result.length > 0) {
      setUserSubscription(true);
      setMaxWord(100000);
    }
  };
  return (
    <div className="m-5">
      <div className="bg-primary text-white p-3 rounded-lg">
        <h2 className="font-semibold">Credits</h2>
        <div className="h-2 bg-[#9981f9] w-full rounded-full mt-3">
          <div
            className={`h-2 bg-white rounded-full`}
            style={{ width: (totalUsage / maxWords) * 100 + "%" }}
          ></div>
        </div>
        <h2 className="text-sm my-2">
          {totalUsage}/{maxWords} Credits Used
        </h2>
      </div>
      <Button variant={"outline"} className="w-full my-3 text-primary">
        Upgrade
      </Button>
    </div>
  );
}
export default UsageTrack;
