import connectDB from "@/DB/db.config";
import { Contact } from "@/DB/Schema/contact";
import { NextResponse } from "next/server";

export async function GET() {
  await connectDB();
  try {
    const contacts = await Contact.find({});
    return NextResponse.json(contacts);
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to fetch contacts: " + error },
      { status: 500 },
    );
  }
}
