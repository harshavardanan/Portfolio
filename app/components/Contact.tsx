"use client";
import React from "react";
import { MountainScene } from "@/components/ui/mountain-scene";
import ContactForm from "./ContactForm";
import Footer from "./Footer";

const Contact = () => {
  return (
    <div className="w-full bg-black text-white">
      <div className="px-4 py-16 sm:px-6 sm:py-20 md:px-10 md:py-28 lg:px-16">
        <div className="mx-auto grid w-full max-w-7xl grid-cols-1 overflow-hidden rounded-2xl border border-neutral-900 lg:grid-cols-2">
          {/* ── Left: scenic backdrop ── */}
          <div className="relative flex min-h-[380px] items-end overflow-hidden bg-neutral-950 p-6 sm:min-h-[440px] sm:p-10 lg:min-h-[720px]">
            <MountainScene className="absolute inset-0 h-full w-full" />
            <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black via-black/10 to-black/40" />
          </div>

          {/* ── Right: contact form panel ── */}
          <div className="flex flex-col justify-center bg-black px-6 py-12 sm:px-10 lg:px-16 lg:py-16">
            <div className="mx-auto w-full max-w-md">
              <h2 className="text-3xl font-bold text-white sm:text-4xl">
                Let&apos;s stay connected.
              </h2>
              <p className="mt-3 mb-8 text-sm text-neutral-400 sm:text-base">
                Have a project in mind, a question, or just want to say hi?
                Send a message below and I&apos;ll get back to you soon.
              </p>

              <ContactForm />
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default Contact;
