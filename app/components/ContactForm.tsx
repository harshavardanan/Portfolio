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
  const [loading, setLoading] = useState<boolean>(false);

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await fetch(process.env.NEXT_PUBLIC_EMAIL_URI!, {
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
    } catch (error) {
      setStatus("Something went wrong. Please try again later.");
    } finally {
      setLoading(false);
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
          <button
            type="submit"
            className="relative bottom-0 flex justify-center items-center gap-2 border border-[#444aee] rounded-xl text-[#FFF] font-black bg-[#000] uppercase px-8 py-4 z-10 overflow-hidden ease-in-out duration-700 group hover:text-[#000] hover:bg-[#FFF] active:scale-95 active:duration-0 focus:bg-[#FFF] focus:text-[#000] isolation-auto before:absolute before:w-full before:transition-all before:duration-700 before:hover:w-full before:-left-full before:hover:left-0 before:rounded-full before:bg-[#FFF] before:-z-10 before:aspect-square before:hover:scale-150 before:hover:duration-700"
            disabled={loading}
          >
            <span
              className={`truncate ease-in-out duration-300 ${
                loading
                  ? "opacity-0 -translate-x-96"
                  : "opacity-100 translate-x-0"
              }`}
            >
              Send Message
            </span>

            <div
              className={`absolute flex flex-row justify-center items-center gap-2 ease-in-out duration-300 ${
                loading
                  ? "opacity-100 translate-x-0"
                  : "opacity-0 -translate-x-96"
              }`}
            >
              <div className="animate-spin size-4 border-2 border-[#000] border-t-transparent rounded-full" />
              <span className="text-[#000]">Sending...</span>
            </div>

            <svg
              className={`fill-[#FFF] group-hover:fill-[#000] ease-in-out duration-700 ${
                loading ? "translate-x-96" : "translate-x-0"
              }`}
              stroke="currentColor"
              fill="currentColor"
              strokeWidth={0}
              viewBox="0 0 512 512"
              height={16}
              width={16}
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="m476.59 227.05-.16-.07L49.35 49.84A23.56 23.56 0 0 0 27.14 52 24.65 24.65 0 0 0 16 72.59v113.29a24 24 0 0 0 19.52 23.57l232.93 43.07a4 4 0 0 1 0 7.86L35.53 303.45A24 24 0 0 0 16 327v113.31A23.57 23.57 0 0 0 26.59 460a23.94 23.94 0 0 0 13.22 4 24.55 24.55 0 0 0 9.52-1.93L476.4 285.94l.19-.09a32 32 0 0 0 0-58.8z" />
            </svg>
          </button>
        </div>
        {status && <p className="text-white mt-4 text-center">{status}</p>}
      </form>
    </div>
  );
};

export default ContactForm;
