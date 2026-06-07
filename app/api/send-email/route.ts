import { Resend } from "resend";
import { NextRequest, NextResponse } from "next/server";

const resend = new Resend(process.env.RESEND_API_KEY);

const RECEIVER_EMAIL = "harshamoorthy22@gmail.com";
const FROM_EMAIL = "Portfolio Contact <onboarding@resend.dev>";

function isValidEmail(email: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

export async function POST(req: NextRequest) {
  try {
    const { name, email, message } = await req.json();

    if (!name?.trim() || !email?.trim() || !message?.trim()) {
      return NextResponse.json(
        { success: false, error: "All fields are required." },
        { status: 400 },
      );
    }

    if (!isValidEmail(email)) {
      return NextResponse.json(
        { success: false, error: "Please enter a valid email address." },
        { status: 400 },
      );
    }

    if (message.trim().length < 10) {
      return NextResponse.json(
        { success: false, error: "Message must be at least 10 characters." },
        { status: 400 },
      );
    }

    const receivedAt = new Date().toLocaleString("en-GB", {
      timeZone: "Europe/London",
      dateStyle: "long",
      timeStyle: "short",
    });

    const portfolioEmailHtml = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
  <title>New Portfolio Message</title>
</head>
<body style="margin:0;padding:0;background:#f4f4f4;font-family:Arial,Helvetica,sans-serif;">
  <table width="100%" cellpadding="0" cellspacing="0" style="background:#f4f4f4;padding:24px 16px;">
    <tr>
      <td align="center">
        <table width="600" cellpadding="0" cellspacing="0" style="max-width:600px;width:100%;background:#ffffff;">
          <tr>
            <td style="padding:0;background:#0a0f1e;overflow:hidden;position:relative;">
              <table width="100%" cellpadding="0" cellspacing="0">
                <tr>
                  <td style="padding:28px 32px;vertical-align:middle;width:60%;">
                    <p style="margin:0 0 4px;font-size:11px;font-weight:700;letter-spacing:3px;text-transform:uppercase;color:#3b82f6;">Portfolio</p>
                    <h1 style="margin:0;font-size:22px;font-weight:800;color:#ffffff;letter-spacing:-0.3px;line-height:1.2;">Harshavardanan<br/>Moorthy</h1>
                  </td>
                  <td style="padding:0;vertical-align:middle;text-align:right;width:40%;">
                    <div style="overflow:hidden;height:90px;position:relative;">
                      <div style="display:inline-block;width:70px;height:90px;background:#1d4ed8;transform:skewX(-15deg);margin-right:-12px;opacity:0.9;"></div>
                      <div style="display:inline-block;width:50px;height:90px;background:#4f46e5;transform:skewX(-15deg);margin-right:-12px;opacity:0.85;"></div>
                      <div style="display:inline-block;width:36px;height:90px;background:#7c3aed;transform:skewX(-15deg);margin-right:0;opacity:0.8;"></div>
                    </div>
                  </td>
                </tr>
              </table>
            </td>
          </tr>
          <tr>
            <td style="padding:32px 32px 8px;background:#ffffff;">
              <p style="margin:0 0 18px;font-size:15px;color:#111827;">Hello Harshavardanan,</p>
              <p style="margin:0 0 18px;font-size:15px;color:#374151;line-height:1.7;">
                You have a new message from <strong>${name}</strong> (<a href="mailto:${email}" style="color:#2563eb;text-decoration:none;">${email}</a>) via your portfolio contact form.
              </p>
              <p style="margin:0 0 6px;font-size:13px;font-weight:700;color:#6b7280;text-transform:uppercase;letter-spacing:1px;">Message</p>
              <p style="margin:0 0 24px;font-size:15px;color:#374151;line-height:1.8;border-left:3px solid #3b82f6;padding-left:14px;white-space:pre-wrap;">${message}</p>
              <p style="margin:0 0 32px;">
                <a href="mailto:${email}?subject=Re: Your portfolio message"
                   style="display:inline-block;padding:10px 22px;background:#1d4ed8;color:#ffffff;font-size:13px;font-weight:600;text-decoration:none;border-radius:4px;">
                  Reply to ${name} &rarr;
                </a>
              </p>
            </td>
          </tr>
          <tr>
            <td style="padding:16px 32px 24px;background:#ffffff;border-top:1px solid #e5e7eb;">
              <p style="margin:0;font-size:11px;color:#9ca3af;line-height:1.6;">
                Received ${receivedAt} &nbsp;&middot;&nbsp;
                <a href="https://harshavardanan.in" style="color:#9ca3af;text-decoration:none;">harshavardanan.in</a>
              </p>
            </td>
          </tr>
        </table>
      </td>
    </tr>
  </table>
</body>
</html>`;

    const autoReplyHtml = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
  <title>Thank you for reaching out</title>
</head>
<body style="margin:0;padding:0;background:#f4f4f4;font-family:Arial,Helvetica,sans-serif;">
  <table width="100%" cellpadding="0" cellspacing="0" style="background:#f4f4f4;padding:24px 16px;">
    <tr>
      <td align="center">
        <table width="600" cellpadding="0" cellspacing="0" style="max-width:600px;width:100%;background:#ffffff;">
          <tr>
            <td style="padding:0;background:#0a0f1e;overflow:hidden;position:relative;">
              <table width="100%" cellpadding="0" cellspacing="0">
                <tr>
                  <td style="padding:28px 32px;vertical-align:middle;width:60%;">
                    <p style="margin:0 0 4px;font-size:11px;font-weight:700;letter-spacing:3px;text-transform:uppercase;color:#3b82f6;">Portfolio</p>
                    <h1 style="margin:0;font-size:22px;font-weight:800;color:#ffffff;letter-spacing:-0.3px;line-height:1.2;">Harshavardanan<br/>Moorthy</h1>
                  </td>
                  <td style="padding:0;vertical-align:middle;text-align:right;width:40%;">
                    <div style="overflow:hidden;height:90px;position:relative;">
                      <div style="display:inline-block;width:70px;height:90px;background:#1d4ed8;transform:skewX(-15deg);margin-right:-12px;opacity:0.9;"></div>
                      <div style="display:inline-block;width:50px;height:90px;background:#4f46e5;transform:skewX(-15deg);margin-right:-12px;opacity:0.85;"></div>
                      <div style="display:inline-block;width:36px;height:90px;background:#7c3aed;transform:skewX(-15deg);margin-right:0;opacity:0.8;"></div>
                    </div>
                  </td>
                </tr>
              </table>
            </td>
          </tr>
          <tr>
            <td style="padding:32px 32px 32px;background:#ffffff;">
              <p style="margin:0 0 18px;font-size:15px;color:#111827;">Hi ${name}, 👋</p>
              <p style="margin:0 0 18px;font-size:15px;color:#374151;line-height:1.7;">
                I have received your message! I will get back to you ASAP. 🚀
              </p>
              <p style="margin:0 0 18px;font-size:15px;color:#374151;line-height:1.7;">
                Best regards,<br/>
                <strong>Harshavardanan Moorthy</strong>
              </p>
            </td>
          </tr>
          <tr>
            <td style="padding:16px 32px 24px;background:#ffffff;border-top:1px solid #e5e7eb;">
              <p style="margin:0;font-size:11px;color:#9ca3af;line-height:1.6;">
                <a href="https://harshavardanan.in" style="color:#9ca3af;text-decoration:none;">harshavardanan.in</a>
              </p>
            </td>
          </tr>
        </table>
      </td>
    </tr>
  </table>
</body>
</html>`;

    // Send both emails concurrently
    const [emailToOwner, emailToSender] = await Promise.all([
      resend.emails.send({
        from: FROM_EMAIL,
        to: [RECEIVER_EMAIL],
        replyTo: email,
        subject: `New message from ${name} — Portfolio`,
        html: portfolioEmailHtml,
      }),
      resend.emails.send({
        from: FROM_EMAIL,
        to: [email],
        subject: `Thank you for reaching out! — Harshavardanan Moorthy`,
        html: autoReplyHtml,
      }),
    ]);

    // Check for errors in either send
    if (emailToOwner.error || emailToSender.error) {
      console.error("Resend error:", emailToOwner.error || emailToSender.error);
      return NextResponse.json(
        { success: false, error: "Failed to send message. Please try again." },
        { status: 500 },
      );
    }

    return NextResponse.json({ success: true }, { status: 200 });
  } catch (err) {
    console.error("Unexpected error in send-email route:", err);
    return NextResponse.json(
      {
        success: false,
        error: "An unexpected error occurred. Please try again later.",
      },
      { status: 500 },
    );
  }
}
