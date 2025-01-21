import connectDB from "@/DB/db.config";
import User from "@/DB/Schema/mailTracking";
import { NextResponse } from "next/server";

export async function GET() {
  await connectDB();
  return NextResponse.json({ message: "Hello from the API" });
}
export async function POST(req: Request) {
  await connectDB();
  const body = await req.json();
  const { email } = body;
  if (!email) {
    return NextResponse.json({ error: "Email is required" });
  }
  try {
    const user = await User.findOne({ email });

    if (!user) {
      // Create a new user if not found
      const newUser = await User.create({ email, exportCount: 1 });
      return NextResponse.json({ exportCount: newUser.exportCount });
    }

    // Increment the export count
    if (user.exportCount >= 5) {
      return NextResponse.json({ error: "Export limit reached" });
    }

    user.exportCount += 1;
    await user.save();

    return NextResponse.json({ exportCount: user.exportCount });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "Internal server error" });
  }
}
