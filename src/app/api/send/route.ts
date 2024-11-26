import MailSenderProvider from "@/lib/nodemailer.init";
import { NextResponse } from "next/server";
// import { Resend } from "resend";

// const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(request: Request) {
  const { data, htmlOfEmail } = await request.json();
  const { to, email, subject } = await data;
  try {
    const response = await MailSenderProvider.sendMail({
      from: `"Mahamudul hasan Miyad" <${email}>`,
      to: to,
      subject: subject,
      html: htmlOfEmail,
    });

    if (!response.messageId) {
      return NextResponse.json({ message: "Email delivery failed" });
    }
    return NextResponse.json({
      message: "Email sent successfully",
      data: response.messageId,
    });
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to send email" + error },
      { status: 500 }
    );
  }
}
