"use client";

import { defineConfig } from "sanity";
import { structureTool } from "sanity/structure";
import { visionTool } from "@sanity/vision";

import { schema } from "./sanity/schemaTypes";
import { structure } from "./sanity/structure";
import { apiVersion, dataset, projectId } from "./sanity/env";

export default defineConfig({
  name: "portfolio_studio",
  title: "Portfolio Studio",

  basePath: "/studio",
  projectId,
  dataset,

  schema,
  plugins: [
    structureTool({ structure }),
    visionTool({ defaultApiVersion: "2025-10-12" }),
  ],
});
