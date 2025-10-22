// app/components/About.tsx
import Image from "next/image";
import { groq } from "next-sanity";
import { client } from "../../sanity/lib/client";
import { Timeline } from "./ui/timeline";

interface TimelineItem {
  _id: string;
  dateRange: string;
  description: string;
  images: {
    alt: string;
    imageUrl: string;
  }[];
}

const query = groq`*[_type == "timelineItem"] | order(dateRange desc) {
  _id,
  dateRange,
  description,
  images[]{
    alt,
    "imageUrl": image.asset->url  // ← Changed from asset->url to image.asset->url
  }
}`;

const About = async () => {
  const timelineItems: TimelineItem[] = await client.fetch(query);
  const data = timelineItems.map((item) => ({
    title: item.dateRange,
    content: (
      <div key={item._id}>
        <p className="mb-8 text-sm font-normal text-neutral-200 md:text-base">
          {item.description}
        </p>
        <div className="grid grid-cols-2 gap-4">
          {item.images?.map((image) => (
            <Image
              key={image.imageUrl}
              src={image.imageUrl}
              alt={image.alt}
              width={500}
              height={500}
              className="h-20 w-full rounded-lg object-cover shadow-md md:h-44 lg:h-60"
            />
          ))}
        </div>
      </div>
    ),
  }));

  return (
    <div className="w-full">
      <Timeline data={data} />
    </div>
  );
};

export default About;
