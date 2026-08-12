// Single source of truth for everything the booking buttons touch.
// Contact details are transcribed from the contact card and CAC certificate
// supplied in /Documents/Ideas/nfo_mezirim — nothing here is invented.

export const contact = {
  phoneDisplay: "+234 813 763 9051",
  phoneE164: "+2348137639051",
  whatsapp: "2348137639051", // wa.me wants digits only, no leading +
  email: "nfomezirimapartmentslugbe@gmail.com",
  instagram: "nfomezirim_apartment",
  instagramUrl: "https://instagram.com/nfomezirim_apartment",
  tiktok: "nfo-mezirim apartments",
  tiktokUrl: "https://www.tiktok.com/@nfomezirim_apartments",
};

export const property = {
  name: "NFO-Mezirim Apartments",
  registeredName: "NFO-MEZIRIM APARTMENTS LUGBE",
  registrationNo: "9556747",
  locality: "Lugbe, Abuja",
  region: "FCT, Nigeria",
  addressLine: "6 Mazi Fidelis Nwosu Close",
  fullAddress: "6 Mazi Fidelis Nwosu Close, Lugbe, Abuja, FCT, Nigeria",
};

// Pre-filled reservation messages. Kept short — long bodies get truncated by
// some SMS apps and look like spam in WhatsApp previews.
export const messages = {
  sms: `Hello NFO-Mezirim Apartments, I'd like to check availability for a stay. Could you share rates and open dates?`,
  whatsapp: `Hello NFO-Mezirim Apartments 👋 I'd like to reserve an apartment in Lugbe. Could you share availability and rates?`,
  emailSubject: "Reservation enquiry — NFO-Mezirim Apartments, Lugbe",
  emailBody: `Hello NFO-Mezirim Apartments,

I'd like to enquire about staying at your Lugbe apartments.

Preferred check-in:
Preferred check-out:
Number of guests:

Please share availability and rates.

Thank you.`,
};
