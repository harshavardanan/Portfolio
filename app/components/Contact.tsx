"use client";
import React from "react";
import { GlobeDemo } from "./GlobeDemo";
import ContactForm from "./ContactForm";
import Footer from "./Footer";

const Contact = () => {
  return (
    <div className="min-h-screen w-full bg-black text-white flex flex-col">
      {/* Header */}
      <h2 className="text-center text-2xl sm:text-3xl md:text-4xl font-bold text-white pt-8 sm:pt-10 md:pt-12 pb-4 sm:pb-6 px-4">
        Let&apos;s stay connected.
      </h2>

      {/* Main Content Area */}
      <div className="flex flex-col lg:flex-row justify-center items-center lg:items-stretch gap-6 sm:gap-8 lg:gap-10 px-4 sm:px-6 lg:px-8 py-4 sm:py-6 lg:py-10 flex-grow">
        {/* Globe Container */}
        <div className="w-full lg:w-1/2 max-w-lg lg:max-w-xl flex justify-center items-center">
          <GlobeDemo />
        </div>

        {/* Form Container */}
        <div className="w-full lg:w-1/2 max-w-md flex justify-center items-center">
          <ContactForm />
        </div>
      </div>

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default Contact;
