import { defineField, defineType } from "sanity";

export default defineType({
  name: "project",
  title: "Projects",
  type: "document",
  fields: [
    defineField({
      name: "title",
      title: "Project Name",
      type: "string",
      validation: (Rule) => Rule.required().min(2).max(100),
    }),
    defineField({
      name: "description",
      title: "Description",
      type: "text",
      description: "A detailed explanation of the project.",
      validation: (Rule) => Rule.required().min(10).max(500),
    }),
    defineField({
      name: "technologies",
      title: "Technologies",
      type: "array",
      of: [{ type: "string" }],
      options: {
        layout: "tags",
      },
      description:
        'Add each technology as a tag (e.g., "React", "NodeJS", "AWS").',
      validation: (Rule) => Rule.required().min(1),
    }),
    defineField({
      name: "mainImage",
      title: "Main Image",
      type: "image",
      options: {
        hotspot: true,
      },
      fields: [
        {
          name: "alt",
          type: "string",
          title: "Alt Text",
          description:
            'Describe the image for SEO. Example: "Xitify Real-time Editor Dashboard built by Harshavardanan"',
          validation: (Rule) => Rule.required(),
        },
      ],
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "liveUrl",
      title: "Live Demo URL",
      type: "url",
      description: "Optional: Link to the live deployed project.",
      validation: (Rule) =>
        Rule.uri({
          scheme: ["http", "https"],
        }),
    }),
    defineField({
      name: "repoUrl",
      title: "Repository URL",
      type: "url",
      description: "Optional: Link to the source code repository.",
      validation: (Rule) =>
        Rule.uri({
          scheme: ["http", "https"],
        }),
    }),
  ],
  orderings: [
    {
      title: "Recently Added",
      name: "createdAtDesc",
      by: [{ field: "_createdAt", direction: "desc" }],
    },
  ],
  preview: {
    select: {
      title: "title",
      subtitle: "description",
      media: "mainImage",
    },
  },
});
