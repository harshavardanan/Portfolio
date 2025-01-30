"use client";
import Image from "next/image";
import React from "react";
import { Timeline } from "./ui/timeline";

export function About() {
  const data = [
    {
      title: "2024",
      content: (
        <div>
          <p className=" text-neutral-200 text-xs md:text-sm font-normal mb-8">
            Pursuing Masters in Advanced computer science at University of
            leicester
          </p>
          <div className="grid grid-cols-2 gap-4">
            <Image
              src="https://media.istockphoto.com/id/1663470397/photo/remembrance-walk-facing-up-to-edwin-lutyens-arch-of-remembrance-in-leicester.jpg?s=612x612&w=0&k=20&c=x3KIfEwB64u8-0qpdO0Nho-K7qBEfG0YYYlEzgDndaE="
              alt="startup template"
              width={500}
              height={500}
              className="rounded-lg object-cover h-20 md:h-44 lg:h-60 w-full shadow-[0_0_24px_rgba(34,_42,_53,_0.06),_0_1px_1px_rgba(0,_0,_0,_0.05),_0_0_0_1px_rgba(34,_42,_53,_0.04),_0_0_4px_rgba(34,_42,_53,_0.08),_0_16px_68px_rgba(47,_48,_55,_0.05),_0_1px_0_rgba(255,_255,_255,_0.1)_inset]"
            />
            <Image
              src="https://associated-architects.ams3.digitaloceanspaces.com/wp-content/uploads/2019/10/12091056/Library-Sq-26312-012-copy.jpg"
              alt="startup template"
              width={500}
              height={500}
              className="rounded-lg object-cover h-20 md:h-44 lg:h-60 w-full shadow-[0_0_24px_rgba(34,_42,_53,_0.06),_0_1px_1px_rgba(0,_0,_0,_0.05),_0_0_0_1px_rgba(34,_42,_53,_0.04),_0_0_4px_rgba(34,_42,_53,_0.08),_0_16px_68px_rgba(47,_48,_55,_0.05),_0_1px_0_rgba(255,_255,_255,_0.1)_inset]"
            />
            <Image
              src="https://media.istockphoto.com/id/1168837613/photo/attenborough-tower-of-the-university-of-leicester-above-victoria-park-in-spring.jpg?s=612x612&w=0&k=20&c=zPflEz4raGfAgRbMI73RS1mz604FfQbSqSCrcuCLeY8="
              alt="startup template"
              width={500}
              height={500}
              className="rounded-lg object-cover h-20 md:h-44 lg:h-60 w-full shadow-[0_0_24px_rgba(34,_42,_53,_0.06),_0_1px_1px_rgba(0,_0,_0,_0.05),_0_0_0_1px_rgba(34,_42,_53,_0.04),_0_0_4px_rgba(34,_42,_53,_0.08),_0_16px_68px_rgba(47,_48,_55,_0.05),_0_1px_0_rgba(255,_255,_255,_0.1)_inset]"
            />
            <Image
              src="https://media.gettyimages.com/id/506254704/photo/leicester-england-leicester-city-and-king-power-chairman-vichai-srivaddhanaprabha-receives-an.jpg?s=612x612&w=0&k=20&c=qVs8Ycvmc9VvrKiBqDbMm7Z2bv96zybF9pUeOD-9ZrY="
              alt="startup template"
              width={500}
              height={500}
              className="rounded-lg object-cover h-20 md:h-44 lg:h-60 w-full shadow-[0_0_24px_rgba(34,_42,_53,_0.06),_0_1px_1px_rgba(0,_0,_0,_0.05),_0_0_0_1px_rgba(34,_42,_53,_0.04),_0_0_4px_rgba(34,_42,_53,_0.08),_0_16px_68px_rgba(47,_48,_55,_0.05),_0_1px_0_rgba(255,_255,_255,_0.1)_inset]"
            />
          </div>
        </div>
      ),
    },
    {
      title: "2021 - 2024",
      content: (
        <div>
          <p className="text-neutral-200 text-xs md:text-sm font-normal mb-8">
            Full-Stack Developer | Tata Consultancy Services
            <br />
            Proficient in technologies such as React, Node.js, MongoDB, Express,
            and Azure.
          </p>
          <div className="grid grid-cols-2 gap-4">
            <Image
              src="https://media.istockphoto.com/id/1453040063/photo/nasdaq-marketsite.jpg?s=612x612&w=0&k=20&c=iQJrGBcok7vYcyBIJOp_VwZgV2Yh69wvptejngsZOsE="
              alt="hero template"
              width={500}
              height={500}
              className="rounded-lg object-cover h-20 md:h-44 lg:h-60 w-full shadow-[0_0_24px_rgba(34,_42,_53,_0.06),_0_1px_1px_rgba(0,_0,_0,_0.05),_0_0_0_1px_rgba(34,_42,_53,_0.04),_0_0_4px_rgba(34,_42,_53,_0.08),_0_16px_68px_rgba(47,_48,_55,_0.05),_0_1px_0_rgba(255,_255,_255,_0.1)_inset]"
            />
            <Image
              src="https://media.glassdoor.com/l/13461/tata-consultancy-services-1667974141188.png?signature=31daff7753b48ffb0bdb4dc218e0b04509fb171bf04e0e045e20f58c03e5f78b"
              alt="feature template"
              width={500}
              height={500}
              className="rounded-lg object-cover h-20 md:h-44 lg:h-60 w-full shadow-[0_0_24px_rgba(34,_42,_53,_0.06),_0_1px_1px_rgba(0,_0,_0,_0.05),_0_0_0_1px_rgba(34,_42,_53,_0.04),_0_0_4px_rgba(34,_42,_53,_0.08),_0_16px_68px_rgba(47,_48,_55,_0.05),_0_1px_0_rgba(255,_255,_255,_0.1)_inset]"
            />
            <Image
              src="https://media.istockphoto.com/id/1273254647/photo/tata-consultancy-services.jpg?s=612x612&w=0&k=20&c=_65F9VmaGS79Z4DhHBxzDxjskjvYYZKdz-22HGJLcWw="
              alt="bento template"
              width={500}
              height={500}
              className="rounded-lg object-cover h-20 md:h-44 lg:h-60 w-full shadow-[0_0_24px_rgba(34,_42,_53,_0.06),_0_1px_1px_rgba(0,_0,_0,_0.05),_0_0_0_1px_rgba(34,_42,_53,_0.04),_0_0_4px_rgba(34,_42,_53,_0.08),_0_16px_68px_rgba(47,_48,_55,_0.05),_0_1px_0_rgba(255,_255,_255,_0.1)_inset]"
            />
            <Image
              src="https://media.gettyimages.com/id/135855816/photo/chennai-india-the-new-campus-of-tata-consultancy-services-is-seen-november-26-2010-in-chennai.jpg?s=612x612&w=0&k=20&c=iNXJGSR4HdEsTcsvTE9IOeh552RumdHbVmTcOI-NrP8="
              alt="cards template"
              width={500}
              height={500}
              className="rounded-lg object-cover h-20 md:h-44 lg:h-60 w-full shadow-[0_0_24px_rgba(34,_42,_53,_0.06),_0_1px_1px_rgba(0,_0,_0,_0.05),_0_0_0_1px_rgba(34,_42,_53,_0.04),_0_0_4px_rgba(34,_42,_53,_0.08),_0_16px_68px_rgba(47,_48,_55,_0.05),_0_1px_0_rgba(255,_255,_255,_0.1)_inset]"
            />
          </div>
        </div>
      ),
    },
  ];
  return (
    <div className="w-full">
      <Timeline data={data} />
    </div>
  );
}

export default About;
