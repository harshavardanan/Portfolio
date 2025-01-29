import { NextRequest, NextResponse } from "next/server";
import nodemailer from "nodemailer";

export async function POST(req: NextRequest) {
  try {
    //const { EMAIL_USER, EMAIL_PASS, RECEIVER_EMAIL } = process.env;
    const EMAIL_USER = "harshavardanan2209@gmail.com";
    const EMAIL_PASS = "errm lkqr kcmz zgwy";

    if (!EMAIL_USER || !EMAIL_PASS) {
      return NextResponse.json(
        { success: false, error: "Server configuration error." },
        { status: 500 }
      );
    }

    const { name, email, message } = await req.json();

    if (!name || !email || !message) {
      return NextResponse.json(
        { success: false, error: "All fields are required." },
        { status: 400 }
      );
    }

    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: EMAIL_USER,
        pass: EMAIL_PASS,
      },
    });

    const mailOptions = {
      from: `"${name}" <${email}>`,
      to: "harshamoorthy22@gmail.com",
      subject: "New message from portfolio contact form",
      text: `From: ${name} <${email}>\n\nMessage:\n${message}`,
    };

    await transporter.sendMail(mailOptions);
    return NextResponse.json(
      { success: true, message: "Email sent successfully!" },
      { status: 200 }
    );
  } catch (error: string | unknown) {
    console.error("Error sending email:", error);
    return NextResponse.json(
      {
        success: false,
        error: "An unexpected error occurred.",
      },
      { status: 500 }
    );
  }
}

export async function GET() {
  return NextResponse.json(
    { message: "Hello, API is working!" },
    { status: 200 }
  );
}

export const dynamic = "error";
