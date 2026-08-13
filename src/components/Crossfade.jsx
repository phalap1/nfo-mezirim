import { useEffect, useMemo, useRef, useState } from "react";

/**
 * Slow crossfade through a set of stills. The order is shuffled once per visit
 * so returning visitors don't always land on the same opening frame, and it
 * only advances while on screen.
 */
export default function Crossfade({ items, interval = 5200, className = "" }) {
  const reduced =
    typeof window !== "undefined" &&
    window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  const order = useMemo(() => {
    if (reduced || items.length < 2) return items;
    const a = [...items];
    for (let i = a.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [a[i], a[j]] = [a[j], a[i]];
    }
    return a;
  }, [items, reduced]);

  const [index, setIndex] = useState(0);
  const hostRef = useRef(null);

  useEffect(() => {
    if (reduced || order.length < 2) return;
    const host = hostRef.current;
    if (!host) return;

    let timer = 0;
    const io = new IntersectionObserver(
      ([entry]) => {
        window.clearInterval(timer);
        if (entry.isIntersecting) {
          timer = window.setInterval(
            () => setIndex((i) => (i + 1) % order.length),
            interval,
          );
        }
      },
      { threshold: 0.25 },
    );

    io.observe(host);
    return () => {
      io.disconnect();
      window.clearInterval(timer);
    };
  }, [order.length, interval, reduced]);

  return (
    <div className={`xfade ${className}`} ref={hostRef}>
      {order.map((item, i) => (
        <img
          key={item.id}
          className="xfade__img"
          src={item.src}
          srcSet={`${item.thumb} 540w, ${item.src} 1080w`}
          sizes="(max-width: 900px) 60vw, 30vw"
          width={item.width}
          height={item.height}
          alt={i === 0 ? item.caption : ""}
          aria-hidden={i === 0 ? undefined : "true"}
          loading={i === 0 ? "eager" : "lazy"}
          decoding="async"
          data-active={i === index || undefined}
        />
      ))}
    </div>
  );
}
