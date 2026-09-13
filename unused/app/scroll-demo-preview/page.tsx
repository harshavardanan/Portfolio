import HeroScrollDemo from "@/components/container-scroll-animation-demo";

/**
 * /scroll-demo-preview – the untouched aceternity demo, exactly as installed
 * via `npx shadcn add @aceternity/container-scroll-animation-demo`, so it can
 * be reviewed on its own before deciding how to adapt it for Skills.
 */
export default function ScrollDemoPreviewPage() {
  return (
    <main className="min-h-screen bg-white dark:bg-black">
      <HeroScrollDemo />
    </main>
  );
}
