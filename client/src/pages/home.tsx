import { Navbar } from "@/components/Navbar";
import { Hero } from "@/components/Hero";
import { About } from "@/components/About";
import { ServicesOverview } from "@/components/ServicesOverview";
import { Reviews } from "@/components/Reviews";

export default function HomePage() {
  return (
    <div className="min-h-screen">
      <Navbar />
      <main>
        <Hero />
        <About />
        <ServicesOverview />
        <Reviews />
      </main>
    </div>
  );
}
