"use client";
import React from "react";
import { FloatingDockDemo } from "./FloatingDockDemo";

const ContactForm = () => {
  return (
    <div className="bg-black text-white py-20 px-6 text-center">
      <h2 className="text-5xl font-semibold mb-4">Get in touch</h2>
      <p className="text-lg max-w-2xl mx-auto mb-6 text-gray-300">
        Whether you're looking for innovative solutions or just want to chat?
      </p>
      <form className="flex justify-center items-center gap-2 max-w-lg mx-auto">
        <input
          type="email"
          placeholder="Your email address"
          autoComplete="off"
          className="w-full py-3 px-4 text-white bg-gray-800 border border-gray-600 rounded-md outline-none focus:ring-2 focus:ring-blue-500"
        />
        <button
          type="submit"
          className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-3 px-6 rounded-md transition duration-200"
        >
          Send
        </button>
      </form>

      {/* <FloatingDockDemo /> */}
    </div>
  );
};

export default ContactForm;
