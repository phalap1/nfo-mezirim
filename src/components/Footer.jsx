import { Instagram, Music2 } from "lucide-react";
import logo from "../assets/brand/logo.png";
import { contact, property } from "../data/site.js";

export default function Footer() {
  return (
    <footer className="footer">
      <div className="shell footer__inner">
        <div className="footer__brand">
          <img src={logo} alt="" width="52" height="48" aria-hidden="true" />
          <span className="footer__word">NFO-Mezirim</span>
        </div>

        <address className="footer__address">
          <a href={property.mapsUrl} target="_blank" rel="noopener noreferrer">
            {property.area}
          </a>
        </address>

        <div className="footer__social">
          <a href={contact.instagramUrl} target="_blank" rel="noopener noreferrer">
            <Instagram size={16} strokeWidth={1.4} />
            <span>@{contact.instagram}</span>
          </a>
          <a href={contact.tiktokUrl} target="_blank" rel="noopener noreferrer">
            <Music2 size={16} strokeWidth={1.4} />
            <span>@{contact.tiktok}</span>
          </a>
        </div>

        <p className="footer__legal">
          {property.registeredName} · Registered with the Corporate Affairs
          Commission, business name no. {property.registrationNo}
        </p>
      </div>
    </footer>
  );
}
