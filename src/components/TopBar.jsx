import { useEffect, useState } from "react";
import logo from "../assets/brand/logo.png";
import { property } from "../data/site.js";

const links = [
  { href: "#residence", label: "Residence" },
  { href: "#gallery", label: "Gallery" },
  { href: "#walkthrough", label: "Walkthrough" },
  { href: "#amenities", label: "Amenities" },
];

export default function TopBar({ onCall }) {
  const [solid, setSolid] = useState(false);

  useEffect(() => {
    const onScroll = () => setSolid(window.scrollY > window.innerHeight * 0.7);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <nav className={`topbar ${solid ? "is-solid" : ""}`}>
      <div className="shell topbar__inner">
        <a className="topbar__brand" href="#top">
          <img src={logo} alt="" width="44" height="41" aria-hidden="true" />
          <span className="topbar__word">
            NFO-Mezirim
            <span className="topbar__sub">{property.locality}</span>
          </span>
        </a>

        <ul className="topbar__links">
          {links.map((l) => (
            <li key={l.href}>
              <a href={l.href}>{l.label}</a>
            </li>
          ))}
        </ul>

        <button className="topbar__cta" onClick={onCall} type="button">
          Reserve
        </button>
      </div>
    </nav>
  );
}
