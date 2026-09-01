import type { Locale } from "../i18n/ui";

/**
 * The houses whose rugs the collection carries. Adding a brand later is a
 * content edit: add its entry here (active: true) and set `brand: <slug>` on
 * its rugs' frontmatter. Long-form copy follows the site's Partial-with-EN-
 * fallback pattern. Do not invent brand histories — stubs state only what the
 * catalog shows (charter, copywriter check).
 */
export interface Brand {
  slug: string;
  active: boolean;
  name: string; // latinized display name, shared across locales
  story: Partial<Record<Locale, { tagline: string; body: string[] }>>;
}

export const brands: Brand[] = [
  {
    slug: "arsalani",
    active: true,
    name: "Arsalani",
    story: {
      en: {
        tagline: "The house itself — five generations of Qom masters, since 1866.",
        body: [
          "Arsalani is the family house behind this collection: founded from Kashan, rooted in Qom, and led today by the fifth generation. Its signature is the fine Qom silk piece — zarcharak and zaronim sizes at knot counts that turn wool and silk into light.",
          "Every rug carrying the Arsalani name was woven for the house or selected by it, and is documented with its reference, woven dimensions, and materials.",
        ],
      },
      fa: {
        tagline: "خودِ خانه — پنج نسل استادان قم، از ۱۲۴۵ خورشیدی.",
        body: [
          "ارسلانی خانه‌ای است که این مجموعه را ساخته: برخاسته از کاشان، ریشه‌گرفته در قم، و امروز به دست نسل پنجم. امضای آن فرش ابریشم ریزبافت قم است — قواره‌های ذرع‌وچارک و ذرع‌ونیم با رج‌شمارهایی که پشم و ابریشم را به نور بدل می‌کند.",
          "هر فرشی که نام ارسلانی را دارد یا برای این خانه بافته شده یا به انتخاب آن رسیده است، و با کد، ابعاد بافت و جنس مستند می‌شود.",
        ],
      },
    },
  },
  {
    slug: "orian-rugs",
    active: true,
    name: "Orian Rugs",
    story: {
      en: {
        tagline: "A guest house in the collection.",
        body: [
          "Pieces from Orian Rugs occasionally pass through our collection alongside our own work. The rugs we currently carry from this house are listed below with their full specifications.",
        ],
      },
      fa: {
        tagline: "میهمانی در مجموعه.",
        body: [
          "گاه قطعاتی از اوریان راگز در کنار بافته‌های خودمان در مجموعه ما جای می‌گیرند. فرش‌هایی که اکنون از این خانه داریم در زیر با مشخصات کامل آمده‌اند.",
        ],
      },
    },
  },
  {
    slug: "pyramid-rug-pads",
    active: true,
    name: "Pyramid Rug Pads",
    story: {
      en: {
        tagline: "A guest house in the collection.",
        body: [
          "The pieces we currently carry from this house are listed below with their full specifications.",
        ],
      },
      fa: {
        tagline: "میهمانی در مجموعه.",
        body: ["قطعاتی که اکنون از این خانه داریم در زیر با مشخصات کامل آمده‌اند."],
      },
    },
  },
  // Defined for later activation — from the house's historical brand list.
  { slug: "safavieh", active: false, name: "Safavieh", story: {} },
  { slug: "rhody-rug-inc", active: false, name: "Rhody Rug Inc.", story: {} },
];

export const brandBySlug = (slug: string): Brand | undefined =>
  brands.find((b) => b.slug === slug);

export const activeBrands = brands.filter((b) => b.active);

export const brandStory = (brand: Brand, locale: Locale) =>
  brand.story[locale] ?? brand.story.en;
