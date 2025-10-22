export default {
  name: "skill",
  title: "Skills",
  type: "document",
  fields: [
    {
      name: "name",
      title: "Skill Name",
      type: "string",
      validation: (Rule: any) => Rule.required(),
    },
    {
      name: "category",
      title: "Category",
      type: "string",
      options: {
        list: [
          { title: "Frontend", value: "frontend" },
          { title: "Backend", value: "backend" },
          { title: "Database", value: "database" },
          { title: "Tools & Platforms", value: "tools" },
          { title: "Design", value: "design" },
          { title: "Programming", value: "programming" }, // ← Check this line!
          { title: "Other", value: "other" },
        ],
      },
      validation: (Rule: any) => Rule.required(),
    },
    {
      name: "icon",
      title: "Icon/Logo",
      type: "image",
      options: {
        hotspot: true,
      },
    },
    {
      name: "order",
      title: "Display Order",
      type: "number",
      initialValue: 0,
    },
  ],
  preview: {
    select: {
      title: "name",
      subtitle: "category",
      media: "icon",
    },
  },
};
