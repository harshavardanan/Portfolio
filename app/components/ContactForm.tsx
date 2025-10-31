"use client";
import React, { useState, ChangeEvent, FormEvent } from "react";

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
      if (response.ok && result.success) {
        setFormData({ name: "", email: "", message: "" });
        setButtonState("sent");
        setTimeout(() => setButtonState("idle"), 3000);
      } else {
        console.error(
          "Failed to send message:",
          result.error || "Unknown error"
        );
        setButtonState("idle");
      }
    } catch (error) {
      console.error("Error submitting form:", error);
      setButtonState("idle");
    }
  };

  return (
    <div className="flex justify-center items-center w-full px-4 sm:px-6 py-6 sm:py-8 lg:py-10 bg-transparent">
      <div className="w-full max-w-md rounded-2xl border border-neutral-800 bg-neutral-900/50 backdrop-blur-md shadow-lg p-4 sm:p-6">
        <h2 className="text-xl sm:text-2xl font-semibold text-white mb-1 sm:mb-2">
          Get in touch
        </h2>
        <p className="text-xs sm:text-sm text-neutral-400 mb-4 sm:mb-6">
          I'd love to hear from you! Fill out the form below and I'll get back
          to you soon.
        </p>

        <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-5">
          <div>
            <label
              htmlFor="name"
              className="block text-xs sm:text-sm text-neutral-300 mb-1"
            >
              Name
            </label>
            <input
              type="text"
              name="name"
              id="name"
              value={formData.name}
              onChange={handleChange}
              required
              placeholder="John Doe"
              className="w-full px-3 sm:px-4 py-2 sm:py-2.5 text-sm sm:text-base rounded-lg bg-neutral-800 text-white placeholder-neutral-500 border border-neutral-700 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/30 outline-none transition-all"
            />
          </div>

          <div>
            <label
              htmlFor="email"
              className="block text-xs sm:text-sm text-neutral-300 mb-1"
            >
              Email
            </label>
            <input
              type="email"
              name="email"
              id="email"
              value={formData.email}
              onChange={handleChange}
              required
              placeholder="you@example.com"
              className="w-full px-3 sm:px-4 py-2 sm:py-2.5 text-sm sm:text-base rounded-lg bg-neutral-800 text-white placeholder-neutral-500 border border-neutral-700 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/30 outline-none transition-all"
            />
          </div>

          <div>
            <label
              htmlFor="message"
              className="block text-xs sm:text-sm text-neutral-300 mb-1"
            >
              Message
            </label>
            <textarea
              name="message"
              id="message"
              rows={4}
              value={formData.message}
              onChange={handleChange}
              required
              placeholder="Type your message here..."
              className="w-full px-3 sm:px-4 py-2 sm:py-2.5 text-sm sm:text-base rounded-lg bg-neutral-800 text-white placeholder-neutral-500 border border-neutral-700 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/30 outline-none transition-all resize-none"
            />
          </div>

          <button
            type="submit"
            disabled={buttonState !== "idle"}
            className="
              relative flex items-center justify-center gap-2
              px-4 sm:px-6 py-2.5 sm:py-3 rounded-lg 
              text-sm sm:text-base font-medium text-white
              bg-blue-600 hover:bg-blue-700 active:bg-blue-800
              transition-all duration-300 ease-in-out
              overflow-hidden w-full
              disabled:opacity-80 disabled:cursor-not-allowed
              border border-blue-400
            "
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
              <span className="text-sm sm:text-base">Sending...</span>
            </div>
            <span
              className={`absolute transition-all duration-300 text-sm sm:text-base ${
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
        </form>
      </div>
    </div>
  );
};

export default ContactForm;
