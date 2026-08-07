import Header from "@/components/Header";
import Hero from "@/components/Hero";
import Applications from "@/components/Applications";
import News from "@/components/News";
import Gallery from "@/components/Gallery";
import Social from "@/components/Social";
import Footer from "@/components/Footer";

const Index = () => {
  return (
    <main className="min-h-screen">
      <Header />
      <Hero />
      <News />
      <Applications />
      <Gallery />
      <Social />
      <Footer />
    </main>
  );
};

export default Index;