# NFO-Mezirim Apartments

A one-page site for a serviced apartment rental in Lugbe, Abuja. React + Vite,
no runtime dependencies beyond React and `lucide-react`, and every asset served
locally — the page makes **zero external network requests**.

```bash
npm install
npm run dev      # http://localhost:5173
npm run build    # → dist/
npm run preview  # serve the production build
```

## Where the content came from

Everything on the page was derived from `Documents/Ideas/nfo_mezirim` — four
phone/drone videos, a CAC registration certificate, and a contact card. No stock
photography and no invented facts.

| Source | Used for |
| --- | --- |
| `Change "Launch Discount 20%"…mp4` (aerial) | Hero video loop, three aerial stills |
| `others1.mp4` | "The full walk" clip, lounge/kitchen/bedroom stills |
| `others2.mp4` | "Rooms & suites" clip, bedroom/wardrobe stills |
| `others0.mp4` | Facade still |
| `Certification.jpg` | Registered name, CAC number |
| `valid contact informations.jpeg` | Phone, email, Instagram, TikTok, logo mark |

The page shows the locality (Lugbe, Abuja) and a map pin, not the street
address — the exact door is given to guests once a stay is confirmed. The pin
uses Google's Maps URL API rather than a `maps.app.goo.gl` short link, which is
a redirect that can be retired.

Amenity claims are limited to things visible on camera (solar arrays, split AC
units, the gas range, glass shower enclosures, the desk and printer, the gated
forecourt). Nothing about pricing or room counts is asserted, because the source
material does not establish it.

## Media pipeline

Source footage is 720×1280 portrait phone video and 1276×720 drone footage, so
the assets were cut and graded rather than used raw:

- **Stills** — frames scored for sharpness and exposure, the best 16 selected,
  then cropped (dropping the burned-in watermark band), partially white-balanced
  (a full gray-world correction kills the tungsten warmth these rooms rely on),
  auto-levelled, S-curved, and unsharp-masked. Exported as WebP at two widths
  with a 14px inline blur placeholder each.
- **Video** — two-pass H.264, muted, `faststart`. The hero is a 14-second cut of
  the drone pull-back at two resolutions (1.8 MB desktop / 740 KB mobile, chosen
  once at mount so only one downloads). Both walkthroughs start after the
  burned-in title cards clear.

Total page weight on first paint is the hero video plus ~210 KB of poster; the
gallery and walkthroughs load lazily.

## Booking actions

All three live in `src/data/booking.js`, driven by `src/data/site.js`.

- **Call** — opens the device SMS app with the enquiry pre-written, then leaves a
  sheet on the page offering `tel:` for the same number. iOS wants `&body=` and
  Android wants `?body=`, so the separator is chosen at call time.
- **Email** — `mailto:` with subject and a body containing check-in/check-out and
  guest-count prompts.
- **WhatsApp** — `wa.me/<number>?text=…`, opening straight into a chat.

To change the number, address or message copy, edit `src/data/site.js` — nothing
else hardcodes them.

## Layout

`src/App.jsx` composes the page: `Hero` → `Residence` → `Gallery` → `Walkthrough`
→ `Amenities` → `Reserve` → `Footer`, with a `TopBar` and a `BookingBar` that
appears once you're past the hero and steps aside over the reserve section.

Scroll reveals use one shared `IntersectionObserver` (`useReveal`), parallax
reads scroll position on `requestAnimationFrame` and only while on screen
(`useParallax`). Both no-op under `prefers-reduced-motion`.
