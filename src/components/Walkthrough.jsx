import { useEffect, useRef, useState } from "react";
import { Play, Pause } from "lucide-react";
import suitesMp4 from "../assets/video/walkthrough-suites.mp4";
import livingMp4 from "../assets/video/walkthrough-living.mp4";
import suitesPoster from "../assets/video/walkthrough-suites-poster.webp";
import livingPoster from "../assets/video/walkthrough-living-poster.webp";

const clips = [
  {
    id: "suites",
    src: suitesMp4,
    poster: suitesPoster,
    label: "Rooms & suites",
    note: "Bedrooms, workspace and wardrobes",
  },
  {
    id: "living",
    src: livingMp4,
    poster: livingPoster,
    label: "The full walk",
    note: "Lounge, kitchen and bathrooms",
  },
];

function Clip({ clip, delay }) {
  const ref = useRef(null);
  const [playing, setPlaying] = useState(false);

  // Play only while on screen — two looping videos running behind the fold is
  // wasted battery on a phone.
  useEffect(() => {
    const v = ref.current;
    if (!v) return;

    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          const p = v.play();
          if (p?.catch) p.catch(() => {});
        } else {
          v.pause();
        }
      },
      { threshold: 0.4 },
    );

    io.observe(v);
    return () => io.disconnect();
  }, []);

  const toggle = () => {
    const v = ref.current;
    if (!v) return;
    if (v.paused) v.play();
    else v.pause();
  };

  return (
    <figure className="clip reveal" style={{ "--reveal-delay": `${delay}ms` }}>
      <div className="clip__frame">
        <video
          ref={ref}
          className="clip__video"
          src={clip.src}
          poster={clip.poster}
          muted
          loop
          playsInline
          preload="none"
          onPlay={() => setPlaying(true)}
          onPause={() => setPlaying(false)}
        />
        <button
          className="clip__toggle"
          onClick={toggle}
          aria-label={playing ? `Pause ${clip.label}` : `Play ${clip.label}`}
        >
          {playing ? (
            <Pause size={16} strokeWidth={1.6} />
          ) : (
            <Play size={16} strokeWidth={1.6} />
          )}
        </button>
      </div>
      <figcaption className="clip__cap">
        <span className="clip__label">{clip.label}</span>
        <span className="clip__note">{clip.note}</span>
      </figcaption>
    </figure>
  );
}

export default function Walkthrough() {
  return (
    <section className="walk section-pad" id="walkthrough">
      <div className="shell walk__head reveal">
        <p className="eyebrow eyebrow--onDark">Walkthrough</p>
        <hr className="rule" />
        <h2 className="section-title walk__title">
          Take the tour before you take the keys.
        </h2>
        <p className="walk__lede">
          Two unedited walks through the apartments — no staging, no stock
          photography, just the rooms as they are on the day you arrive.
        </p>
      </div>

      <div className="shell walk__clips">
        {clips.map((c, i) => (
          <Clip key={c.id} clip={c} delay={i * 140} />
        ))}
      </div>
    </section>
  );
}
