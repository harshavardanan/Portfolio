"use client";
import React from "react";
import { GlobeDemo } from "./GlobeDemo";
import ContactForm from "./ContactForm";
import Footer from "./Footer";

const Contact = () => {
  return (
    <div className="min-h-screen w-full bg-black text-white flex flex-col justify-center">
      {" "}
      {/* Changed justify-between to justify-center for vertical centering */}
      {/* Header */}
      <h2 className="text-center text-xl md:text-4xl font-bold text-white pt-12 pb-6">
        {" "}
        {/* Added padding */}
        Let&apos;s stay connected.
      </h2>
      {/* Main Content Area */}
      {/* On large screens: row, items stretch to equal height, prevent shrinking */}
      <div className="flex flex-col lg:flex-row lg:items-stretch justify-center gap-8 px-6 py-6 lg:py-10 flex-grow">
        {" "}
        {/* Added flex-grow */}
        {/* Globe Container */}
        {/* Explicitly set width to 50% on large screens, ensure it doesn't shrink, limit max width */}
        <div className="w-full lg:w-1/2 lg:flex-shrink-0 flex justify-center items-center max-w-xl mx-auto lg:mx-0">
          {" "}
          {/* Added max-w-xl */}
          <GlobeDemo />
        </div>
        {/* Form Container */}
        {/* Explicitly set width to 50% on large screens, ensure it doesn't shrink, limit max width */}
        <div className="w-full lg:w-1/2 lg:flex-shrink-0 flex justify-center items-center max-w-md mx-auto lg:mx-0">
          {" "}
          {/* Kept max-w-md */}
          <ContactForm />
        </div>
      </div>
      {/* Footer */}
      {/* Ensure footer stays at the bottom if using justify-between on main container */}
      {/* If using justify-center, Footer will be right below the content */}
      <Footer />
    </div>
  );
};

export default Contact;
