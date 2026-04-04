import React from "react";
import { client } from "@/sanity/lib/client";
import { groq } from "next-sanity";
import ShowcaseClient, { SanityProject } from "./ShowcaseClient";

const showcaseQuery = groq`*[_type == "project"] | order(_createdAt desc) {
  _id,
  title,
  description,
  technologies,
  liveUrl,
  repoUrl,
  mainImage {
    asset,
    alt
  }
}`;

const Showcase = async () => {
  const projects: SanityProject[] = await client.fetch(showcaseQuery);

  return <ShowcaseClient projects={projects} />;
};

export default Showcase;
