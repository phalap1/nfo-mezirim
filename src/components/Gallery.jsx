import { useCallback, useEffect, useRef, useState } from "react";
import { X, ChevronLeft, ChevronRight } from "lucide-react";
import { gallery } from "../data/gallery.js";

function Tile({ item, index, onOpen }) {
  const [loaded, setLoaded] = useState(false);

  return (
    <button
      className={`tile tile--${item.aspect.replace(":", "x")}`}
      style={{ "--reveal-delay": `${(index % 3) * 90}ms` }}
      onClick={() => onOpen(index)}
      aria-label={`Open ${item.title}`}
    >
      <span className="tile__frame reveal">
        <img
          className="tile__lqip"
          src={item.lqip}
          alt=""
          aria-hidden="true"
          data-hidden={loaded || undefined}
        />
        <img
          className="tile__img"
          src={item.thumb}
          srcSet={`${item.thumb} ${Math.round(item.width / 2)}w, ${item.src} ${item.width}w`}
          sizes="(max-width: 620px) 92vw, (max-width: 1000px) 46vw, 31vw"
          width={item.width}
          height={item.height}
          alt={item.caption}
          loading="lazy"
          decoding="async"
          onLoad={() => setLoaded(true)}
          data-loaded={loaded || undefined}
        />
        <span className="tile__veil" />
        <span className="tile__meta">
          <span className="tile__title">{item.title}</span>
          <span className="tile__caption">{item.caption}</span>
        </span>
      </span>
    </button>
  );
}

function Lightbox({ index, onClose, onStep }) {
  const item = gallery[index];
  const touchX = useRef(null);

  useEffect(() => {
    const onKey = (e) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowRight") onStep(1);
      if (e.key === "ArrowLeft") onStep(-1);
    };
    window.addEventListener("keydown", onKey);
    document.body.classList.add("is-locked");
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.classList.remove("is-locked");
    };
  }, [onClose, onStep]);

  // Warm the neighbours so stepping through feels instant.
  useEffect(() => {
    [index - 1, index + 1].forEach((i) => {
      const n = gallery[(i + gallery.length) % gallery.length];
      const img = new Image();
      img.src = n.src;
    });
  }, [index]);

  return (
    <div
      className="lb"
      role="dialog"
      aria-modal="true"
      aria-label={`${item.title}. Image ${index + 1} of ${gallery.length}`}
      onTouchStart={(e) => (touchX.current = e.touches[0].clientX)}
      onTouchEnd={(e) => {
        if (touchX.current === null) return;
        const dx = e.changedTouches[0].clientX - touchX.current;
        if (Math.abs(dx) > 50) onStep(dx < 0 ? 1 : -1);
        touchX.current = null;
      }}
    >
      <button className="lb__scrim" onClick={onClose} aria-label="Close gallery" />

      <button className="lb__close" onClick={onClose} aria-label="Close gallery">
        <X size={20} strokeWidth={1.4} />
      </button>

      <button
        className="lb__nav lb__nav--prev"
        onClick={() => onStep(-1)}
        aria-label="Previous image"
      >
        <ChevronLeft size={22} strokeWidth={1.4} />
      </button>

      <figure className="lb__figure" key={item.id}>
        <img
          className="lb__img"
          src={item.src}
          width={item.width}
          height={item.height}
          alt={item.caption}
          decoding="async"
        />
        <figcaption className="lb__caption">
          <span className="lb__title">{item.title}</span>
          <span className="lb__sub">{item.caption}</span>
          <span className="lb__count">
            {String(index + 1).padStart(2, "0")} / {String(gallery.length).padStart(2, "0")}
          </span>
        </figcaption>
      </figure>

      <button
        className="lb__nav lb__nav--next"
        onClick={() => onStep(1)}
        aria-label="Next image"
      >
        <ChevronRight size={22} strokeWidth={1.4} />
      </button>
    </div>
  );
}

export default function Gallery() {
  const [open, setOpen] = useState(null);

  const step = useCallback(
    (dir) => setOpen((i) => (i + dir + gallery.length) % gallery.length),
    [],
  );

  return (
    <section className="gallery section-pad" id="gallery">
      <div className="shell gallery__head reveal">
        <div>
          <p className="eyebrow">The rooms</p>
          <hr className="rule" />
          <h2 className="section-title">Sixteen ways to picture the stay.</h2>
        </div>
        <p className="gallery__note">
          Every frame below was shot inside the apartments. Tap any one to view it
          full screen.
        </p>
      </div>

      <div className="shell">
        <div className="gallery__grid">
          {gallery.map((item, i) => (
            <Tile key={item.id} item={item} index={i} onOpen={setOpen} />
          ))}
        </div>
      </div>

      {open !== null && (
        <Lightbox index={open} onClose={() => setOpen(null)} onStep={step} />
      )}
    </section>
  );
}
