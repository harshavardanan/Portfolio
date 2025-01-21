"use client";
import React from "react";
import { FaGithub, FaDiscord, FaLinkedin, FaMedium } from "react-icons/fa";

const Social = () => {
  return (
    <div className="fixed bottom-5 left-5 flex flex-col gap-3">
      <a
        href="https://github.com/harshavardanan"
        target="_blank"
        rel="noopener noreferrer"
        className="text-white hover:text-gray-500 transition-colors duration-300"
      >
        <FaGithub size={30} />
      </a>
      <a
        href="https://discord.com/harshavardanan"
        target="_blank"
        rel="noopener noreferrer"
        className="text-black hover:text-gray-500 transition-colors duration-300"
      >
        <FaDiscord size={30} />
      </a>
      <a
        href="https://linkedin.com/in/harshavardanan-m"
        target="_blank"
        rel="noopener noreferrer"
        className="text-black hover:text-gray-500 transition-colors duration-300"
      >
        <FaLinkedin size={30} />
      </a>
      <a
        href="https://medium.com/@harshamoorthy22"
        target="_blank"
        rel="noopener noreferrer"
        className="text-black hover:text-gray-500 transition-colors duration-300"
      >
        <FaMedium size={30} />
      </a>
    </div>
  );
};

export default Social;
