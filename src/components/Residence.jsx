import { ArrowUpRight } from "lucide-react";
import { useParallax } from "../hooks/useParallax.js";
import { gallery } from "../data/gallery.js";
import { property } from "../data/site.js";

const facade = gallery.find((g) => g.id === "facade");
const lounge = gallery.find((g) => g.id === "lounge");

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
          <p className="eyebrow">The residence</p>
          <hr className="rule" />
          <h2 className="section-title">
            A quiet address,
            <br />
            five minutes from the noise.
          </h2>
          <p className="lede">
            NFO-Mezirim sits on a residential close in Lugbe, close enough to the
            airport road to make an early flight and far enough back that you
            sleep through the traffic.
          </p>
          <p className="residence__text">
            Each apartment is finished the way you'd finish your own — full-height
            oak joinery, stone-topped kitchens, cove lighting you can dim to
            nothing, and beds dressed in fresh white linen before every arrival.
            Solar arrays across the roofline keep the lights and air conditioning
            running when the grid does not.
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
            <img
              className="residence__img residence__img--tall"
              src={lounge.src}
              srcSet={`${lounge.thumb} 540w, ${lounge.src} 1080w`}
              sizes="(max-width: 900px) 60vw, 30vw"
              width={lounge.width}
              height={lounge.height}
              alt={lounge.caption}
              loading="lazy"
              decoding="async"
            />
          </div>
          <img
            className="residence__img residence__img--wide"
            src={facade.src}
            srcSet={`${facade.thumb} 750w, ${facade.src} 1500w`}
            sizes="(max-width: 900px) 45vw, 24vw"
            width={facade.width}
            height={facade.height}
            alt={facade.caption}
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
