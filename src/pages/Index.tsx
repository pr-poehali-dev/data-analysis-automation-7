import Header from "@/components/Header";
import Hero from "@/components/Hero";
import Applications from "@/components/Applications";
import News from "@/components/News";
import HowToStart from "@/components/HowToStart";
import Rules from "@/components/Rules";
import Gallery from "@/components/Gallery";
import Reviews from "@/components/Reviews";
import Social from "@/components/Social";
import Footer from "@/components/Footer";

const Index = () => {
  return (
    <main className="min-h-screen">
      <Header />
      <Hero />
      <News />
      <HowToStart />
      <Rules />
      <Applications />
      <Gallery />
      <Reviews />
      <Social />
      <Footer />
    </main>
  );
};

export default Index;