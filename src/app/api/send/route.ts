import { NextResponse } from "next/server";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(request: Request) {
  const { email, subject, html } = await request.json();
  try {
    const response = await resend.emails.send({
      from: `${email}`,
      to: "mhmiyad6565@gmail.com",
      subject: subject,
      html: html,
    });

    // Log the response for debugging

    if (response.error) {
      return NextResponse.json({ error: response.error }, { status: 500 });
    }
    return NextResponse.json({ message: "Email sent successfully" });
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to send email" + error },
      { status: 500 }
    );
  }
}
