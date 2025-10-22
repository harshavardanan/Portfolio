"use client";
import React from "react";
import {
  IconBrandGithub,
  IconBrandLinkedin,
  IconBrandMedium,
} from "@tabler/icons-react";
import { LinkPreview } from "./ui/link-preview";

const Footer = () => {
  return (
    <footer className="w-full bg-black text-white py-6 mt-10">
      <div className="container mx-auto flex flex-col md:flex-row justify-between items-center px-6">
        <div className="text-center md:text-left mb-4 md:mb-0">
          <h3 className="text-lg font-semibold">Harshavardanan Moorthy</h3>
          <p className="text-sm text-gray-400">
            &copy; {new Date().getFullYear()} All rights reserved.
          </p>
        </div>
        <div className="flex space-x-6 items-center">
          <LinkPreview
            url="https://github.com/harshavardanan"
            className="text-gray-400 transition-colors inline-flex items-center justify-center"
          >
            <span className="inline-flex">
              <IconBrandGithub size={28} stroke={1.5} />
            </span>
          </LinkPreview>

          <LinkPreview
            url="https://linkedin.com/in/harshavardanan-m"
            className="text-gray-400 transition-colors inline-flex items-center justify-center"
          >
            <span className="inline-flex">
              <IconBrandLinkedin size={28} stroke={1.5} />
            </span>
          </LinkPreview>

          <LinkPreview
            url="https://medium.com/@harshavardanan22"
            className="text-gray-400 transition-colors inline-flex items-center justify-center"
          >
            <span className="inline-flex">
              <IconBrandMedium size={28} stroke={1.5} />
            </span>
          </LinkPreview>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
