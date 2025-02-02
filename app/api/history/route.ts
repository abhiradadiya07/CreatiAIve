// app/api/history/route.ts
import { db } from "@/utils/db";
import { AIOutput } from "@/utils/schema";
import { eq } from "drizzle-orm";
import { NextResponse } from "next/server";
import { currentUser } from "@clerk/nextjs/server";

export async function GET() {
  const user = await currentUser();

  if (!user) {
    return NextResponse.json(
      { success: false, message: "User not authenticated" },
      { status: 401 }
    );
  }

  try {
    const historyList = await db
      .select()
      .from(AIOutput)
      .where(eq(AIOutput.createdBy, user.primaryEmailAddress?.emailAddress));

    return NextResponse.json(
      { success: true, data: historyList },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error fetching history:", error);
    return NextResponse.json(
      { success: false, message: "Failed to fetch history" },
      { status: 500 }
    );
  }
}
