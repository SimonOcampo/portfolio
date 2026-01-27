import Hero from "@/components/Hero";
import Projects from "@/components/Projects";

export default function Home() {
  return (
    <main className="bg-background min-h-screen selection:bg-primary selection:text-white">
      <div className="fixed inset-0 z-[-1] bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-blue-900/20 via-background to-background" />
      <Hero />
      <Projects />
      {/* Add Experience Component here later */}
    </main>
  );
}
