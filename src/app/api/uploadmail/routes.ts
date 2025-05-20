import connectDB from "@/DB/db.config";
import { EmailUpload } from "@/DB/Schema/mailUpload";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  await connectDB();
  const { templateName, htmlOfEmail } = await request.json();
  try {
    const result = await EmailUpload.create({
      templateName,
      htmlOfEmail,
    });

    return NextResponse.json({
      message: "Email Upload  successfully",
      data: result,
    });
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to Upload  email" + error },
      { status: 500 },
    );
  }
}
