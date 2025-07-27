import Navbar from "@/components/landing/Navbar";
import HeroSection from "@/components/landing/HeroSection";
import TentangKami from "@/components/landing/TentangKami";
import BukuSection from "@/components/landing/BukuSection"; 
import LayananSection from "@/components/landing/LayananSection";
import Footer from "@/components/landing/Footer";
import Faq from "@/components/landing/Faq";

export default function Home() {
  return (
    <>  
      <Navbar />
      <HeroSection />
      <TentangKami />
      <BukuSection />
      <LayananSection />
      <Faq />
      <Footer />
    </>
  );
}
