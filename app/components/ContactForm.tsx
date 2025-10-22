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

  const [buttonState, setButtonState] = useState<"idle" | "sending" | "sent">(
    "idle"
  );

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setButtonState("sending");

    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL!}/api/send-email`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(formData),
        }
      );

      const result = await response.json();

      if (result.success) {
        setFormData({ name: "", email: "", message: "" });
        setButtonState("sent");
      } else {
        setButtonState("idle");
      }
    } catch (error) {
      setButtonState("idle");
    } finally {
      if (buttonState !== "sent") {
        setTimeout(() => setButtonState("idle"), 2500);
      } else {
        setTimeout(() => setButtonState("idle"), 3000);
      }
    }
  };

  return (
    <div className="flex flex-col items-center justify-center bg-black rounded-2xl w-full p-6 sm:p-8 space-y-8 h-auto sm:h-[40rem]">
      <div className="flex h-full justify-center text-center w-full">
        <TextRevealCard text="Don't tell anyone..." revealText="I'm Batman" />
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
          <button
            type="submit"
            disabled={buttonState !== "idle"}
            className={`
              relative flex items-center justify-center gap-2
              px-6 py-3 rounded-lg font-medium text-white
              bg-blue-600 hover:bg-blue-700 active:bg-blue-800
              transition-all duration-300 ease-in-out
              overflow-hidden min-w-[160px]
              disabled:opacity-80 disabled:cursor-not-allowed
              border border-blue-400
            `}
          >
            <span
              className={`transition-all duration-300 ${
                buttonState !== "idle"
                  ? "opacity-0 -translate-x-4"
                  : "opacity-100 translate-x-0"
              }`}
            >
              Send Message
            </span>
            <div
              className={`absolute flex items-center gap-2 transition-all duration-300 ${
                buttonState === "sending" ? "opacity-100" : "opacity-0"
              }`}
            >
              <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
              <span>Sending...</span>
            </div>
            <span
              className={`absolute transition-all duration-300 ${
                buttonState === "sent" ? "opacity-100" : "opacity-0"
              }`}
            >
              Message Sent
            </span>
            <svg
              className={`w-4 h-4 transition-all duration-300 ${
                buttonState !== "idle"
                  ? "opacity-0 translate-x-4"
                  : "opacity-100 translate-x-0"
              }`}
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fillRule="evenodd"
                d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z"
                clipRule="evenodd"
              />
            </svg>
          </button>
        </div>
      </form>
    </div>
  );
};

export default ContactForm;
