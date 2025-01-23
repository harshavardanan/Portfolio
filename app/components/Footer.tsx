"use client";
import React from "react";
import {
  IconBrandGithub,
  IconBrandLinkedin,
  IconBrandMedium,
} from "@tabler/icons-react";

const Footer = () => {
  return (
    <footer className="w-full bg-gray-900 text-white py-6 mt-10">
      <div className="container mx-auto flex flex-col md:flex-row justify-between items-center px-6">
        <div className="text-center md:text-left mb-4 md:mb-0">
          <h3 className="text-lg font-semibold">Harshavardanan Moorthy</h3>
          <p className="text-sm text-gray-400">
            &copy; {new Date().getFullYear()} All rights reserved.
          </p>
        </div>
        <div className="flex space-x-6">
          <a
            href="https://github.com/harshavardanan"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-gray-400 transition-colors"
          >
            <IconBrandGithub size={28} />
          </a>
          <a
            href="https://linkedin.com/in/harshavardanan-m"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-gray-400 transition-colors"
          >
            <IconBrandLinkedin size={28} />
          </a>
          <a
            href="https://medium.com/@harshamoorthy22"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-gray-400 transition-colors"
          >
            <IconBrandMedium size={28} />
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
