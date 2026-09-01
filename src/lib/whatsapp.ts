import { contact, t, type Locale } from "../i18n/ui";

export function whatsappUrl(locale: Locale, message?: string): string {
  const base = `https://wa.me/${contact.whatsapp}`;
  return message ? `${base}?text=${encodeURIComponent(message)}` : base;
}

export function rugWhatsappUrl(
  locale: Locale,
  title: string,
  sku: string,
  url: string
): string {
  return whatsappUrl(locale, t(locale).whatsappMessage(title, sku, url));
}
