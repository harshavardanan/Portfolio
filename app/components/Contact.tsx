"use client";
import React from "react";
import { GlobeDemo } from "./GlobeDemo";
import ContactForm from "./ContactForm";
import Footer from "./Footer";

const Contact = () => {
  return (
    <div className="h-full w-full bg-black">
      <GlobeDemo />
      <ContactForm />
      <Footer />
    </div>
  );
};

export default Contact;
