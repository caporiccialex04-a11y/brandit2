import Nav from "./components/Nav";
import Hero from "./components/Hero";
import Craft from "./components/Craft";
import Work from "./components/Work";
import About from "./components/About";
import Contact from "./components/Contact";
import Footer from "./components/Footer";

export default function App() {
  return (
    <>
      <Nav />
      <main>
        <Hero />
        <Craft />
        <Work />
        <About />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
