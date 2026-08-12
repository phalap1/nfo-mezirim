import { useCallback, useEffect, useState } from "react";
import { Phone, Mail, MessageCircle, X, Send } from "lucide-react";
import { contact } from "../data/site.js";
import { smsHref, telHref, mailtoHref, whatsappHref } from "../data/booking.js";

/**
 * The Call action opens the visitor's SMS app with the enquiry already written,
 * then leaves a sheet behind on the page so they can dial the same number
 * instead if they'd rather talk. Nothing sends without them tapping send.
 */
export function useCallFlow() {
  const [sheetOpen, setSheetOpen] = useState(false);

  const startCallFlow = useCallback(() => {
    setSheetOpen(true);
    // Let the sheet paint before the OS takes focus for the Messages app.
    window.setTimeout(() => {
      window.location.href = smsHref();
    }, 120);
  }, []);

  return { sheetOpen, startCallFlow, closeSheet: () => setSheetOpen(false) };
}

export function CallSheet({ open, onClose }) {
  useEffect(() => {
    if (!open) return;
    const onKey = (e) => e.key === "Escape" && onClose();
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, onClose]);

  if (!open) return null;

  return (
    <div className="sheet" role="dialog" aria-modal="true" aria-labelledby="sheet-title">
      <button className="sheet__scrim" onClick={onClose} aria-label="Close" />
      <div className="sheet__panel">
        <button className="sheet__close" onClick={onClose} aria-label="Close">
          <X size={18} strokeWidth={1.5} />
        </button>
        <p className="eyebrow">Reservations</p>
        <h3 id="sheet-title" className="sheet__title">
          Your message is ready to send
        </h3>
        <p className="sheet__body">
          We've opened your messaging app with a short enquiry addressed to{" "}
          <strong>{contact.phoneDisplay}</strong>. Send it when you're ready — or
          call the same number and speak to us now.
        </p>
        <div className="sheet__actions">
          <a className="btn btn--ink" href={telHref()}>
            <Phone size={17} strokeWidth={1.5} />
            Call {contact.phoneDisplay}
          </a>
          <a className="btn btn--ghost" href={smsHref()}>
            <Send size={17} strokeWidth={1.5} />
            Reopen the text
          </a>
        </div>
      </div>
    </div>
  );
}

/**
 * variant: "stack" for the booking section, "bar" for the floating bar.
 */
export function BookingButtons({ variant = "stack", onCall }) {
  const cls = `actions actions--${variant}`;

  return (
    <div className={cls}>
      <button className="btn btn--gold" onClick={onCall} type="button">
        <Phone size={17} strokeWidth={1.5} />
        <span>
          Call<span className="btn__long"> or text</span>
        </span>
      </button>

      <a
        className="btn btn--whatsapp"
        href={whatsappHref()}
        target="_blank"
        rel="noopener noreferrer"
      >
        <MessageCircle size={17} strokeWidth={1.5} />
        <span>WhatsApp</span>
      </a>

      <a className="btn btn--outline" href={mailtoHref()}>
        <Mail size={17} strokeWidth={1.5} />
        <span>Email</span>
      </a>
    </div>
  );
}
