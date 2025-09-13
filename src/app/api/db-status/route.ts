import connectDB from "@/DB/db.config";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    await connectDB();
    return NextResponse.json({ status: "Connected" });
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : String(error);
    return NextResponse.json(
      { status: `Error: ${errorMessage}` },
      { status: 500 },
    );
  }
}
