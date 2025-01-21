"use client";
import React from "react";
import { GlobeDemo } from "./GlobeDemo";
import ContactForm from "./ContactForm";

const Contact = () => {
  return (
    <div className="h-full w-full bg-black">
      <GlobeDemo />
      <ContactForm />
    </div>
  );
};

export default Contact;
