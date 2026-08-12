import { MapPin, Instagram, Phone, Mail } from "lucide-react";
import { BookingButtons } from "./BookingActions.jsx";
import { contact, property } from "../data/site.js";
import { gallery } from "../data/gallery.js";

const backdrop = gallery.find((g) => g.id === "aerial-courtyard");

export default function Reserve({ onCall }) {
  return (
    <section className="reserve" id="reserve">
      <div className="reserve__bg">
        <img
          src={backdrop.src}
          srcSet={`${backdrop.thumb} 800w, ${backdrop.src} 1600w`}
          sizes="100vw"
          width={backdrop.width}
          height={backdrop.height}
          alt=""
          aria-hidden="true"
          loading="lazy"
          decoding="async"
        />
        <span className="reserve__scrim" />
      </div>

      <div className="shell reserve__inner">
        <div className="reserve__copy reveal">
          <p className="eyebrow eyebrow--onDark">Reservations</p>
          <hr className="rule" />
          <h2 className="section-title reserve__title">
            Tell us when,
            <br />
            we'll have it ready.
          </h2>
          <p className="reserve__lede">
            Message, email or call — whichever suits. We answer quickly, and every
            option below opens with your enquiry already written.
          </p>

          <BookingButtons variant="stack" onCall={onCall} />

          <ul className="reserve__details">
            <li>
              <Phone size={15} strokeWidth={1.4} />
              <a href={`tel:${contact.phoneE164}`}>{contact.phoneDisplay}</a>
            </li>
            <li>
              <Mail size={15} strokeWidth={1.4} />
              <a href={`mailto:${contact.email}`}>{contact.email}</a>
            </li>
            <li>
              <Instagram size={15} strokeWidth={1.4} />
              <a href={contact.instagramUrl} target="_blank" rel="noopener noreferrer">
                @{contact.instagram}
              </a>
            </li>
            <li>
              <MapPin size={15} strokeWidth={1.4} />
              <a href={property.mapsUrl} target="_blank" rel="noopener noreferrer">
                {property.locality} — get directions
              </a>
            </li>
          </ul>
        </div>
      </div>
    </section>
  );
}
