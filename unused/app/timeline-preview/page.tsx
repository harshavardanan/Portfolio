import { Timeline } from "../components/ui/timeline";

/**
 * /timeline-preview – renders the Timeline with mock data so the new
 * split-flap heading can be reviewed without Sanity env vars configured.
 * Safe to delete once you're happy with the look on the real /About section.
 */
const mockData = [
  {
    title: "2024 — Now",
    content: (
      <p className="mb-8 text-sm font-normal text-neutral-200 md:text-base">
        Building fullstack products end to end: Next.js front ends, Node/
        Sanity content backends, and everything in between.
      </p>
    ),
  },
  {
    title: "2022 — 2024",
    content: (
      <p className="mb-8 text-sm font-normal text-neutral-200 md:text-base">
        Shipped several client projects, picked up React, TypeScript, and
        cloud deployment along the way.
      </p>
    ),
  },
  {
    title: "2020 — 2022",
    content: (
      <p className="mb-8 text-sm font-normal text-neutral-200 md:text-base">
        Started out learning the fundamentals — HTML, CSS, JavaScript — and
        built the first few real projects.
      </p>
    ),
  },
];

export default function TimelinePreviewPage() {
  return (
    <main className="min-h-screen bg-black">
      <Timeline data={mockData} />
    </main>
  );
}
