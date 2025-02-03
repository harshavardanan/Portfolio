"use client";
import React, { useState, ChangeEvent, FormEvent } from "react";
import { TextRevealCard, TextRevealCardDescription } from "./ui/text-reveal";
require("dotenv").config();

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

    const response = await fetch(process.env.NEXT_PUBLIC_EMAIL_URI, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formData),
    });

    const result = await response.json();

    if (result.success) {
      setStatus("Thanks, I have received your message!");
      setFormData({ name: "", email: "", message: "" });
    } else {
      setStatus("Failed to send message. Please try again.");
    }
  };

  return (
    <div className="flex flex-col items-center justify-center bg-black rounded-2xl w-full p-6 sm:p-8 space-y-8 h-auto sm:h-[40rem]">
      <div className="flex justify-center text-center w-full">
        <TextRevealCard
          text="You bring the logic"
          revealText="I’ll show my magic."
        />
      </div>

      <TextRevealCardDescription>
        Feel free to drop a message. I&apos;ll get back to you as soon as
        possible.
      </TextRevealCardDescription>

      <form onSubmit={handleSubmit} className="w-full max-w-2xl space-y-4">
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
          <button type="submit" className="p-[1px] relative">
            <div className="absolute inset-0 bg-gradient-to-r from-purple-500 to-blue-500 rounded-lg" />
            <div className="px-8 py-2  bg-black rounded-[6px]  relative group transition duration-200 text-white hover:bg-transparent">
              Send Message
            </div>
          </button>
        </div>
        {status && <p className="text-white mt-4 text-center">{status}</p>}
      </form>
    </div>
  );
};

export default ContactForm;
