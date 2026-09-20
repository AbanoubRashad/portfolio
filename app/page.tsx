import { ContentProvider } from "@/components/content-provider";
import { Navbar } from "@/components/sections/navbar";
import { Hero } from "@/components/sections/hero";
import { About } from "@/components/sections/about";
import { Services } from "@/components/sections/services";
import { Projects } from "@/components/sections/projects";
import { Background } from "@/components/sections/background";
import { Contact } from "@/components/sections/contact";
import { Footer } from "@/components/sections/footer";

export default function Home() {
  return (
    <ContentProvider>
      <Navbar />
      <main>
        <Hero />
        <About />
        <Services />
        <Projects />
        <Background />
        <Contact />
      </main>
      <Footer />
    </ContentProvider>
  );
}
