"use client";
import React, { useState, ChangeEvent, FormEvent } from "react";
import { toast } from "sonner";
import { SendButton } from "@/components/ui/send-button";

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
  const [buttonState, setButtonState] = useState<
    "idle" | "sending" | "sent" | "error"
  >("idle");

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setButtonState("sending");

    try {
      const response = await fetch("/api/send-email", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const result = await response.json();
      if (response.ok && result.success) {
        setFormData({ name: "", email: "", message: "" });
        setButtonState("sent");
        setTimeout(() => setButtonState("idle"), 3000);
      } else {
        console.error("Failed to send message:", result.error || "Unknown error");
        toast.error(result.error || "Failed to send message. Please try again.");
        setButtonState("error");
        setTimeout(() => setButtonState("idle"), 4000);
      }
    } catch (error) {
      console.error("Error submitting form:", error);
      toast.error("Network error. Please try again later.");
      setButtonState("error");
      setTimeout(() => setButtonState("idle"), 4000);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="w-full space-y-5">
      <div>
        <label
          htmlFor="name"
          className="block text-sm font-medium text-white mb-1.5"
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
          placeholder="Your name"
          className="w-full px-4 py-3 text-sm sm:text-base rounded-lg bg-neutral-900 text-white placeholder-neutral-500 border border-neutral-800 focus:border-white/40 focus:ring-2 focus:ring-white/10 outline-none transition-all"
        />
      </div>

      <div>
        <label
          htmlFor="email"
          className="block text-sm font-medium text-white mb-1.5"
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
          placeholder="you@email.com"
          className="w-full px-4 py-3 text-sm sm:text-base rounded-lg bg-neutral-900 text-white placeholder-neutral-500 border border-neutral-800 focus:border-white/40 focus:ring-2 focus:ring-white/10 outline-none transition-all"
        />
      </div>

      <div>
        <label
          htmlFor="message"
          className="block text-sm font-medium text-white mb-1.5"
        >
          Message
        </label>
        <textarea
          name="message"
          id="message"
          rows={5}
          value={formData.message}
          onChange={handleChange}
          required
          placeholder="How can I help you?"
          className="w-full px-4 py-3 text-sm sm:text-base rounded-lg bg-neutral-900 text-white placeholder-neutral-500 border border-neutral-800 focus:border-white/40 focus:ring-2 focus:ring-white/10 outline-none transition-all resize-none"
        />
      </div>

      <SendButton state={buttonState} disabled={buttonState !== "idle"} />
    </form>
  );
};

export default ContactForm;
