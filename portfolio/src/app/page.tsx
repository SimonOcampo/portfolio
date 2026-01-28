import Hero from "@/components/Hero";
import Experience from "@/components/Experience";
import Projects from "@/components/Projects";
import Education from "@/components/Education";
import Involvement from "@/components/Involvement";

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
      <div className="relative z-10 flex flex-col">
        <Hero />
        <Projects />
        <Experience />
        <Involvement />
        <Education />
      </div>
    </main>
  );
}
