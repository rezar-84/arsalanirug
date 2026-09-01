import { getCollection, type CollectionEntry } from "astro:content";
import type { Locale } from "../i18n/ui";
import { originToRegion } from "../data/regions";

export type Rug = CollectionEntry<"rugs">;

// Rug ids look like "en/qom-golfarang" — split into locale + base slug.
export const rugLocale = (rug: Rug) => rug.id.split("/")[0] as Locale;
export const rugSlug = (rug: Rug) => rug.id.split("/").slice(1).join("/");

export async function getRugs(locale: Locale): Promise<Rug[]> {
  const all = await getCollection(
    "rugs",
    (r) => rugLocale(r) === locale && !r.data.draft
  );
  return all.sort(
    (a, b) => a.data.order - b.data.order || a.data.title.localeCompare(b.data.title)
  );
}

// Non-EN locales fall back to the EN entry (specs are language-neutral) so
// every locale's catalog is complete even while translations are in draft.
export async function getRugsWithFallback(locale: Locale): Promise<Rug[]> {
  if (locale === "en") return getRugs("en");
  const localized = await getRugs(locale);
  const have = new Set(localized.map(rugSlug));
  const en = await getRugs("en");
  return [...localized, ...en.filter((r) => !have.has(rugSlug(r)))].sort(
    (a, b) => a.data.order - b.data.order || rugSlug(a).localeCompare(rugSlug(b))
  );
}

export const formatDimensions = (rug: Rug, locale: Locale) => {
  const fmt = (n: number) => n.toLocaleString(locale === "fa" ? "fa-IR" : locale);
  return `${fmt(rug.data.lengthCm)} × ${fmt(rug.data.widthCm)}`;
};

export const regionOf = (rug: Rug): string | undefined =>
  originToRegion(rug.data.origin, rug.data.category);

export const rugsByBrand = (rugs: Rug[], brand: string) =>
  rugs.filter((r) => r.data.brand === brand);

export const rugsByRegion = (rugs: Rug[], region: string) =>
  rugs.filter((r) => regionOf(r) === region);
