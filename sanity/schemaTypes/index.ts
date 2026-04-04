import { type SchemaTypeDefinition } from "sanity";
import timelineItem from "./timelineItem";
import skill from "./skill";
import project from "./project";

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [timelineItem, skill, project],
};
