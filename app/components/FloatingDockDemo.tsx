import React from "react";
import { FloatingDock } from "./ui/floating-dock";
import {
  IconBrandGithub,
  IconExchange,
  IconHome,
  IconBrandLinkedin,
  IconBrandDiscord,
  IconBrandMedium,
} from "@tabler/icons-react";

export function FloatingDockDemo() {
  const links = [
    {
      title: "Home",
      icon: <IconHome className="h-full w-full text-neutral-500 " />,
      href: "#",
    },

    {
      title: "Discord",
      icon: (
        <IconBrandDiscord className="h-full w-full text-neutral-500 dark:text-neutral-300" />
      ),
      href: "https://discord.com/harshavardanan",
    },
    {
      title: "GitHub",
      icon: (
        <IconBrandGithub className="h-full w-full text-neutral-500 dark:text-neutral-300" />
      ),
      href: "https://github.com/harshavardanan",
    },
    {
      title: "LinkedIn",
      icon: (
        <IconBrandLinkedin className="h-full w-full text-neutral-500 dark:text-neutral-300" />
      ),
      href: "https://linkedin.com/in/harshavardanan-m",
    },
    {
      title: "Medium",
      icon: (
        <IconBrandMedium className="h-full w-full text-neutral-500 dark:text-neutral-300" />
      ),
      href: "https://medium.com/@harshamoorthy22",
    },
  ];

  return (
    <div className="flex items-center justify-center h-[15rem] w-full">
      <FloatingDock mobileClassName="translate-y-20" items={links} />
    </div>
  );
}
