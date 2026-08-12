import { useEffect, useRef, useState } from "react";
import { ChevronDown } from "lucide-react";
import { property } from "../data/site.js";
import heroMp4 from "../assets/video/hero.mp4";
import heroMobileMp4 from "../assets/video/hero-mobile.mp4";
import heroPoster from "../assets/video/hero-poster.webp";

export default function Hero() {
  const videoRef = useRef(null);
  const [ready, setReady] = useState(false);

  // Serve the 740KB cut to phones and the 1.8MB cut to everyone else. Chosen
  // once on mount so we never download both.
  const [src] = useState(() =>
    typeof window !== "undefined" && window.matchMedia("(max-width: 760px)").matches
      ? heroMobileMp4
      : heroMp4,
  );

  useEffect(() => {
    const v = videoRef.current;
    if (!v) return;
    // Autoplay can still be refused (low power mode); the poster carries it.
    const play = v.play();
    if (play?.catch) play.catch(() => {});
  }, []);

  return (
    <header className="hero" id="top">
      <div className="hero__media">
        {/* Painted immediately and never removed: if autoplay is refused or the
            file is still in flight, the visitor still lands on the aerial. */}
        <img
          className="hero__poster"
          src={heroPoster}
          alt=""
          aria-hidden="true"
          fetchPriority="high"
          decoding="async"
        />
        <video
          ref={videoRef}
          className={`hero__video ${ready ? "is-ready" : ""}`}
          src={src}
          poster={heroPoster}
          autoPlay
          muted
          loop
          playsInline
          preload="auto"
          aria-hidden="true"
          tabIndex={-1}
          onCanPlay={() => setReady(true)}
        />
        <div className="hero__scrim" />
        <div className="hero__vignette" />
      </div>

      <div className="hero__inner shell">
        <p className="hero__eyebrow">
          {property.locality} <span className="hero__dot">·</span> {property.region}
        </p>
        <h1 className="hero__title display">
          Modern rooms,
          <br />
          <em>serene</em> ambiance.
        </h1>
        <p className="hero__lede">
          Fully serviced apartments behind a quiet gate in Lugbe — solar-backed,
          air-conditioned, and finished for stays that stretch from a night to a
          season.
        </p>
        <a className="hero__cue" href="#residence">
          <span>Step inside</span>
          <ChevronDown size={16} strokeWidth={1.5} />
        </a>
      </div>
    </header>
  );
}
