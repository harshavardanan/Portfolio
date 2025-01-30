const express = require("express");
require("dotenv").config();
const nodemailer = require("nodemailer");
const cors = require("cors");

const app = express();
const PORT = process.env.PORT || 5000;

app.use(express.json());
app.use(cors());

app.get("/api", (req, res) => {
  res.json({ message: "Hello, API is working!" });
});

app.post("/api/send-email", async (req, res) => {
  try {
    const { EMAIL_USER, EMAIL_PASS, RECEIVER_EMAIL } = process.env;

    if (!EMAIL_USER || !EMAIL_PASS || !RECEIVER_EMAIL) {
      return res
        .status(500)
        .json({ success: false, error: "Server configuration error." });
    }

    const { name, email, message } = req.body;

    if (!name || !email || !message) {
      return res
        .status(400)
        .json({ success: false, error: "All fields are required." });
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
      to: RECEIVER_EMAIL,
      subject: "New message from portfolio contact form",
      text: `From: ${name} <${email}>

Message:
${message}`,
    };

    await transporter.sendMail(mailOptions);
    res
      .status(200)
      .json({ success: true, message: "Email sent successfully!" });
  } catch (error) {
    console.error("Error sending email:", error);
    res
      .status(500)
      .json({ success: false, error: "An unexpected error occurred." });
  }
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
