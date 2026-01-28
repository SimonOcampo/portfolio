import Hero from "@/components/Hero";
import Projects from "@/components/Projects";

export default function Home() {
  return (
    <main className="relative min-h-screen selection:bg-primary selection:text-white">
      {/* Background: full-screen container */}
      <div
        aria-hidden
        className="fixed inset-0 z-[-1] bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-blue-900/20 via-background to-background"
      />
      <div aria-hidden className="fixed inset-0 z-[-1] bg-grid-pattern" />

      {/* Content above background */}
      <div className="relative z-10">
        <Hero />
        <Projects />
        {/* Add Experience Component here later */}
      </div>
    </main>
  );
}
