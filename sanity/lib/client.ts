// sanity/lib/client.ts
import { createClient } from "next-sanity";
import { apiVersion, dataset, projectId } from "../env";

export const client = createClient({
  projectId,
  dataset,
  apiVersion, // use the value from your env.ts
  useCdn: false, // false so you can see drafts during development
});
