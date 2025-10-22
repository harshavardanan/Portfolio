export default {
  name: "timelineItem",
  title: "Timeline Items",
  type: "document",
  fields: [
    {
      name: "dateRange",
      title: "Date Range",
      type: "string",
      description: 'e.g., "2022 - Present" or "Jan 2021 - Dec 2022"',
      validation: (Rule: any) => Rule.required(),
    },
    {
      name: "description",
      title: "Description",
      type: "text",
      rows: 5,
      description: "What you did during this time period",
      validation: (Rule: any) => Rule.required(),
    },
    {
      name: "images",
      title: "Images",
      type: "array",
      of: [
        {
          type: "object",
          fields: [
            {
              name: "image",
              title: "Image",
              type: "image",
              options: {
                hotspot: true,
              },
              validation: (Rule: any) => Rule.required(),
            },
            {
              name: "alt",
              title: "Alt Text",
              type: "string",
              description: "Describe the image for accessibility",
              validation: (Rule: any) => Rule.required(),
            },
          ],
          preview: {
            select: {
              media: "image",
              title: "alt",
            },
          },
        },
      ],
      description: "Add images for this timeline period",
    },
    {
      name: "order",
      title: "Display Order",
      type: "number",
      description:
        "Lower numbers appear first (optional, will sort by date if not set)",
      initialValue: 0,
    },
  ],
  preview: {
    select: {
      title: "dateRange",
      subtitle: "description",
    },
  },
  orderings: [
    {
      title: "Date Range (Newest First)",
      name: "dateRangeDesc",
      by: [{ field: "dateRange", direction: "desc" }],
    },
    {
      title: "Display Order",
      name: "orderAsc",
      by: [{ field: "order", direction: "asc" }],
    },
  ],
};
