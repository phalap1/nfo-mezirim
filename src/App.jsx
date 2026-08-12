import TopBar from "./components/TopBar.jsx";
import Hero from "./components/Hero.jsx";
import Residence from "./components/Residence.jsx";
import Gallery from "./components/Gallery.jsx";
import Walkthrough from "./components/Walkthrough.jsx";
import Amenities from "./components/Amenities.jsx";
import Reserve from "./components/Reserve.jsx";
import BookingBar from "./components/BookingBar.jsx";
import Footer from "./components/Footer.jsx";
import { CallSheet, useCallFlow } from "./components/BookingActions.jsx";
import { useReveal } from "./hooks/useReveal.js";

export default function App() {
  useReveal();
  const { sheetOpen, startCallFlow, closeSheet } = useCallFlow();

  return (
    <>
      <TopBar onCall={startCallFlow} />
      <main>
        <Hero />
        <Residence />
        <Gallery />
        <Walkthrough />
        <Amenities />
        <Reserve onCall={startCallFlow} />
      </main>
      <Footer />
      <BookingBar onCall={startCallFlow} />
      <CallSheet open={sheetOpen} onClose={closeSheet} />
    </>
  );
}
