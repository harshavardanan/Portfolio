"use client";
import React, { useState, ChangeEvent, FormEvent } from "react";
import {
  TextRevealCard,
  TextRevealCardDescription,
  TextRevealCardTitle,
} from "./ui/text-reveal";

interface FormData {
  name: string;
  email: string;
  message: string;
}

const ContactForm: React.FC = () => {
  const [formData, setFormData] = useState<FormData>({
    name: "",
    email: "",
    message: "",
  });

  const [status, setStatus] = useState<string>("");

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const response = await fetch("/api/send-email", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formData),
    });

    const result = await response.json();

    if (result.success) {
      setStatus("Email sent successfully!");
      setFormData({ name: "", email: "", message: "" });
    } else {
      setStatus("Failed to send email. Please try again.");
    }
  };

  return (
    <div className="flex flex-col items-center justify-center bg-black h-[40rem] rounded-2xl w-full p-8 space-y-8">
      <TextRevealCard
        text="Have a project idea?"
        revealText="Let's build it!"
      />
      <TextRevealCardDescription className="text-white-400 text-sm">
        Feel free to drop a message. I'll get back to you as soon as possible.
      </TextRevealCardDescription>

      <form onSubmit={handleSubmit} className="max-w-2xl w-[40rem] space-y-4">
        <div className="flex flex-col gap-4">
          <input
            type="text"
            name="name"
            placeholder="Your name"
            autoComplete="off"
            value={formData.name}
            onChange={handleChange}
            required
            className="w-full py-3 px-4 text-white bg-gray-800 border border-gray-600 rounded-md outline-none focus:ring-2 focus:ring-blue-500"
          />
          <input
            type="email"
            name="email"
            placeholder="Your email address"
            autoComplete="off"
            value={formData.email}
            onChange={handleChange}
            required
            className="w-full py-3 px-4 text-white bg-gray-800 border border-gray-600 rounded-md outline-none focus:ring-2 focus:ring-blue-500"
          />
          <textarea
            name="message"
            placeholder="Type your message here..."
            rows={4}
            value={formData.message}
            onChange={handleChange}
            required
            className="w-full py-3 px-4 text-white bg-gray-800 border border-gray-600 rounded-md outline-none focus:ring-2 focus:ring-blue-500 resize-none"
          />
          <button
            type="submit"
            className="inline-flex h-12 animate-shimmer items-center justify-center rounded-md border border-slate-800 bg-[linear-gradient(110deg,#000103,45%,#1e2631,55%,#000103)] bg-[length:200%_100%] px-6 font-medium text-slate-400 transition-colors focus:outline-none focus:ring-2 focus:ring-slate-400 focus:ring-offset-2 focus:ring-offset-slate-50"
          >
            Send Message
          </button>
        </div>
        {status && <p className="text-white mt-4">{status}</p>}
      </form>
    </div>
  );
};

export default ContactForm;
