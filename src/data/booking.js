import { contact, messages } from "./site.js";

// iOS and Android disagree on the SMS URI separator: RFC 5724 says "?body=",
// which Android honours, while iOS has wanted "&body=" since iOS 8.
export const isIOS = () =>
  typeof navigator !== "undefined" &&
  (/iPad|iPhone|iPod/.test(navigator.userAgent) ||
    // iPadOS 13+ reports as Mac, so fall back to a touch check.
    (navigator.platform === "MacIntel" && navigator.maxTouchPoints > 1));

export const smsHref = () => {
  const sep = isIOS() ? "&" : "?";
  return `sms:${contact.phoneE164}${sep}body=${encodeURIComponent(messages.sms)}`;
};

export const telHref = () => `tel:${contact.phoneE164}`;

export const whatsappHref = () =>
  `https://wa.me/${contact.whatsapp}?text=${encodeURIComponent(messages.whatsapp)}`;

export const mailtoHref = () =>
  `mailto:${contact.email}` +
  `?subject=${encodeURIComponent(messages.emailSubject)}` +
  `&body=${encodeURIComponent(messages.emailBody)}`;
