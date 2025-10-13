import { type SchemaTypeDefinition } from "sanity";
import timelineItem from "./timelineItem";
import skill from "./skill";

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [timelineItem, skill],
};
