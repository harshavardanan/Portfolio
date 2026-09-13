import Hero3D from "../components/Hero3D";

/**
 * /hero-preview – renders only the new 3D hero.
 * Handy for reviewing the model on its own; it has no Sanity dependency,
 * so it works even when NEXT_PUBLIC_SANITY_* env vars are not set.
 */
export default function HeroPreviewPage() {
  return (
    <main className="min-h-screen bg-black">
      <Hero3D />
    </main>
  );
}
