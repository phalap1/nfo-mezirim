import { ArrowUpRight } from "lucide-react";
import { useParallax } from "../hooks/useParallax.js";
import { featured } from "../data/gallery.js";
import { property } from "../data/site.js";
import Crossfade from "./Crossfade.jsx";
import aerial from "../assets/gallery/aerial-courtyard.webp";
import aerialSm from "../assets/gallery/aerial-courtyard-sm.webp";

const marks = [
  { figure: "24/7", label: "Solar-backed power" },
  { figure: "Every room", label: "Air conditioned" },
  { figure: "En-suite", label: "Private bathrooms" },
  { figure: "Gated", label: "Off-street parking" },
];

export default function Residence() {
  const artRef = useParallax(48);

  return (
    <section className="residence section-pad" id="residence">
      <div className="shell residence__grid">
        <div className="residence__copy reveal">
          <p className="eyebrow">The residence · Lugbe, Abuja</p>
          <hr className="rule" />
          <h2 className="section-title">
            A quiet address,
            <br />
            minutes from the expressway.
          </h2>
          <p className="lede">
            NFO-Mezirim is a luxury serviced shortlet apartment in Lugbe, Abuja.
            Conveniently situated along the Airport Road corridor, it is the perfect
            rental close to town and the airport — close enough to make an early flight
            and far enough back to sleep in total serenity.
          </p>
          <p className="residence__text">
            Whether you are looking for an apartment near the airport, a fully serviced
            stay close to the expressway, or a comfortable shortlet in Abuja, each home
            is finished the way you'd finish your own. Enjoy stone-topped kitchens,
            en-suite bedrooms, and fresh white linen. Rooftop solar arrays keep the
            lights and air conditioning running seamlessly 24/7.
          </p>
          <a
            className="residence__address"
            href={property.mapsUrl}
            target="_blank"
            rel="noopener noreferrer"
          >
            {property.locality}
            <br />
            {property.region}
            <span className="residence__map">
              View on Google Maps
              <ArrowUpRight size={14} strokeWidth={1.5} />
            </span>
          </a>
        </div>

        <div className="residence__art reveal" style={{ "--reveal-delay": "120ms" }}>
          <div className="residence__artInner" ref={artRef}>
            <Crossfade items={featured} className="residence__img--tall" />
          </div>
          <img
            className="residence__img residence__img--wide"
            src={aerial}
            srcSet={`${aerialSm} 800w, ${aerial} 1600w`}
            sizes="(max-width: 900px) 45vw, 24vw"
            width={1600}
            height={900}
            alt="The compound seen from above, with its gated forecourt"
            loading="lazy"
            decoding="async"
          />
        </div>
      </div>

      <div className="shell">
        <ul className="marks reveal">
          {marks.map((m) => (
            <li className="marks__item" key={m.label}>
              <span className="marks__figure">{m.figure}</span>
              <span className="marks__label">{m.label}</span>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
