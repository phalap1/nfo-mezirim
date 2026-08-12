import {
  Sun,
  Wind,
  ChefHat,
  ShowerHead,
  Tv,
  Laptop,
  BedDouble,
  Car,
  Lightbulb,
  ShieldCheck,
} from "lucide-react";

// Every line here is something visible in the source footage — nothing claimed
// that the camera didn't show.
const amenities = [
  { icon: Sun, title: "Solar-backed power", note: "Rooftop arrays across the compound" },
  { icon: Wind, title: "Air conditioning", note: "Split units in every room" },
  { icon: ChefHat, title: "Fitted kitchen", note: "Gas range, extractor, stone island" },
  { icon: ShowerHead, title: "En-suite bathrooms", note: "Glass shower enclosures" },
  { icon: BedDouble, title: "King beds", note: "Fresh white linen on arrival" },
  { icon: Tv, title: "Media wall", note: "Television built into the joinery" },
  { icon: Laptop, title: "Work desk", note: "Desk, printer and shelving" },
  { icon: Lightbulb, title: "Ambient lighting", note: "Dimmable cove and pendant light" },
  { icon: Car, title: "Off-street parking", note: "Paved forecourt inside the gate" },
  { icon: ShieldCheck, title: "Gated compound", note: "Walled and privately secured" },
];

export default function Amenities() {
  return (
    <section className="amen section-pad" id="amenities">
      <div className="shell">
        <div className="amen__head reveal">
          <p className="eyebrow">What's inside</p>
          <hr className="rule" />
          <h2 className="section-title">Everything already handled.</h2>
        </div>

        <ul className="amen__grid">
          {amenities.map((a, i) => {
            const Icon = a.icon;
            return (
              <li
                className="amen__item reveal"
                key={a.title}
                style={{ "--reveal-delay": `${(i % 5) * 70}ms` }}
              >
                <span className="amen__icon">
                  <Icon size={19} strokeWidth={1.3} />
                </span>
                <span className="amen__title">{a.title}</span>
                <span className="amen__note">{a.note}</span>
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
