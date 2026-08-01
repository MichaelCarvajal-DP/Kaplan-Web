/**
 * Kaplan & Kaplan — single-page site per marketing spec.
 * Sections: Header · Hero · Specialties (tabs) · About · Team · Contact · Footer.
 * Palette #f5f5f5/#e6edf7/#183760/#2f5c99 · Cormorant Garamond + Inter.
 */
import { useState } from "react";
import Header from "@/components/Header";
import Hero from "@/components/Hero";
import Specialties from "@/components/Specialties";
import About from "@/components/About";
import Team from "@/components/Team";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";
export default function Home() {
  const [vertical, setVertical] = useState<"legal" | "consulting">("legal");
  return (
    <div className="min-h-screen flex flex-col bg-[#f5f5f5]">
      <Header />
      <main className="flex-1">
        <Hero onSelectVertical={setVertical} />
        <Specialties vertical={vertical} onVerticalChange={setVertical} />
        <About />
        <Team />
        <Contact />
      </main>
      <Footer />
    </div>
  );
}
