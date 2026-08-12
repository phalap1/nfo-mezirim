import { useEffect, useState } from "react";
import { BookingButtons } from "./BookingActions.jsx";
import { contact } from "../data/site.js";

/**
 * Floating booking bar. Hidden over the hero so it doesn't fight the video,
 * then pinned for the rest of the page. It also steps aside once the reserve
 * section is on screen, where the same actions already sit full size.
 */
export default function BookingBar({ onCall }) {
  const [shown, setShown] = useState(false);

  useEffect(() => {
    const reserve = document.getElementById("reserve");

    const onScroll = () => {
      const pastHero = window.scrollY > window.innerHeight * 0.8;
      const atReserve = reserve
        ? reserve.getBoundingClientRect().top < window.innerHeight * 0.75
        : false;
      setShown(pastHero && !atReserve);
    };

    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, []);

  return (
    <div className={`bookbar ${shown ? "is-shown" : ""}`} aria-hidden={!shown}>
      <div className="bookbar__inner">
        <div className="bookbar__label">
          <span className="bookbar__title">Reserve your stay</span>
          <span className="bookbar__sub">{contact.phoneDisplay}</span>
        </div>
        <BookingButtons variant="bar" onCall={onCall} />
      </div>
    </div>
  );
}
