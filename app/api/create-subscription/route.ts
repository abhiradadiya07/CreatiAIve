import { NextRequest, NextResponse } from "next/server";
import Razorpay from "razorpay";
export async function POST(req: NextRequest) {
  let instance = new Razorpay({
    key_id: process.env.RAZORPAY_KEY_ID!,
    key_secret: process.env.RAZORPAY_KEY_SECRET,
  });
  const result = await instance.subscriptions.create({
    plan_id: process.env.SUBSCRIPTION_PLAN_ID!,
    customer_notify: 1,
    quantity: 1,
    total_count: 1,
    addons: [],
    notes: { key1: "Note" },
  });
  console.log("🚀 ~ POST ~ result:", result);
  return NextResponse.json(result, { status: 200 });
}
