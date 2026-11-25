/** Where "Start a project" requests go. */
export const CONTACT_EMAIL = process.env.NEXT_PUBLIC_CONTACT_EMAIL ?? "";

/** Stripe Payment Link for the AI receptionist ($497 setup + $97/mo). */
export const RECEPTIONIST_CHECKOUT = "https://buy.stripe.com/dRm8wP5qx9Nwgzl28r6wE01";

/** Crescia: where med spa owners book a call with Nick. Set NEXT_PUBLIC_CRESCIA_BOOKING_URL in Vercel. */
export const CRESCIA_BOOKING_URL = process.env.NEXT_PUBLIC_CRESCIA_BOOKING_URL ?? "";
