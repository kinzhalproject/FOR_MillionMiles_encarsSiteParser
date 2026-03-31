import { Header } from "@/components/Header";
import { Hero } from "@/components/Hero";
import { Filters } from "@/components/Filters";
import { CarGrid } from "@/components/CarGrid";
import { Services } from "@/components/Services";
import { Footer } from "@/components/Footer";

export default function Home() {
  return (
    <>
      <Header />
      <Hero />
      <Filters />
      <CarGrid />
      <Services />
      <Footer />
    </>
  );
}
