"use client";
import React, { useState } from "react";
import { motion } from "framer-motion";
import { LampDemo, LampContainer } from "./ui/lamp";

const ContactForm = () => {
  const [message, setMessage] = useState("");

  return (
    <>
      <div className="relative  flex flex-col items-center px-5 ">
        {" "}
        <form className="max-w-2xl mx-auto space-y-4">
          <div className="flex flex-col md:flex-row gap-4">
            <input
              type="text"
              placeholder="Your name"
              autoComplete="off"
              className="w-full py-3 px-4 text-white bg-gray-800 border border-gray-600 rounded-md outline-none focus:ring-2 focus:ring-blue-500"
            />
            <input
              type="email"
              placeholder="Your email address"
              autoComplete="off"
              className="w-full py-3 px-4 text-white bg-gray-800 border border-gray-600 rounded-md outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <textarea
            placeholder="Type your message here..."
            rows={4}
            value={message}
            className="w-full py-3 px-4 text-white bg-gray-800 border border-gray-600 rounded-md outline-none focus:ring-2 focus:ring-blue-500 resize-none"
          />
          <button
            type="submit"
            className="inline-flex h-12 animate-shimmer items-center justify-center rounded-md border border-slate-800 bg-[linear-gradient(110deg,#000103,45%,#1e2631,55%,#000103)] bg-[length:200%_100%] px-6 font-medium text-slate-400 transition-colors focus:outline-none focus:ring-2 focus:ring-slate-400 focus:ring-offset-2 focus:ring-offset-slate-50"
          >
            Send Message
          </button>
        </form>
      </div>
    </>
  );
};

export default ContactForm;
