"use client";
import React from "react";
import { GlobeDemo } from "./GlobeDemo";
import ContactForm from "./ContactForm";
import Footer from "./Footer";
import { SparklesPreview } from "./ui/SparklesPreview";

const Contact = () => {
  return (
    <div className="h-full w-full bg-black">
      <GlobeDemo />
      <ContactForm />
      {/* <SparklesPreview /> */}
      <Footer />
    </div>
  );
};

export default Contact;
