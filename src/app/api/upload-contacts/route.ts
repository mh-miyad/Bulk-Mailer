import connectDB from "@/DB/db.config";
import { Contact } from "@/DB/Schema/contact";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  await connectDB();
  const contacts = await request.json();

  try {
    const result = await Contact.insertMany(contacts);

    return NextResponse.json({
      message: "Contacts uploaded successfully",
      data: result,
    });
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to upload contacts: " + error },
      { status: 500 },
    );
  }
}
