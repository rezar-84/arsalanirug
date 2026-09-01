import type { Locale } from "../i18n/ui";

/**
 * The weaving regions the site speaks about. Region landing pages
 * (/regions/<slug>) and the guide's "Weaving Cities" section both read from
 * here, so the prose exists once. Locales fall back to EN per the site
 * pattern. Historical claims follow the sources verified for /history and
 * /guide (V&A, UNESCO ICH 2010, standard rug references).
 */
export interface Region {
  slug: string;
  featured: boolean; // the two cities the house descends from
  name: Partial<Record<Locale, string>> & { en: string };
  kicker: Partial<Record<Locale, string>> & { en: string };
  body: Partial<Record<Locale, string[]>> & { en: string[] };
}

export const regions: Region[] = [
  {
    slug: "qom",
    featured: true,
    name: { en: "Qom", fa: "قم", tr: "Kum", es: "Qom", ja: "クム", de: "Ghom", ru: "Кум", ar: "قم", zh: "库姆" },
    kicker: { en: "Silk · c. 1930 – today", fa: "ابریشم · از حدود ۱۳۱۰ تا امروز" },
    body: {
      en: [
        "The youngest of the great weaving cities — and, in fineness, the summit. Qom had no carpet tradition until weavers from Kashan seeded workshops here in the early 20th century; unburdened by habit, the city specialised in what is hardest: silk warp, silk weft, silk pile, at knot counts that turn a floor covering into optics.",
        "A true Qom is usually small — a zarcharak, a zaronim, a prayer-size ghalicheh — because silk this fine is counted in years, not months. Look for jewel-box color, a signature woven into the end border, and a surface that changes hue as you walk around it. Most of our boutique collection is woven here; our own family helped write this city's short, astonishing history.",
      ],
      fa: [
        "جوان‌ترینِ شهرهای بزرگ بافندگی — و در ظرافت، بر قله. قم تا اوایل قرن چهاردهم خورشیدی سنت فرش نداشت؛ بافندگانی که از کاشان آمدند کارگاه‌هایش را بنیان نهادند و این شهرِ بی‌عادت، دشوارترین راه را برگزید: چله ابریشم، پود ابریشم، پرز ابریشم، با رج‌شمارهایی که کف‌پوش را به شیشه‌گریِ نور بدل می‌کند.",
        "قمِ اصیل معمولاً کوچک است — ذرع‌وچارک، ذرع‌ونیم، قالیچه — چون ابریشمی چنین ریز را به سال می‌شمارند نه به ماه. در پی رنگ‌های جواهرگون، امضای بافته در حاشیه، و سطحی باشید که با هر قدم رنگ عوض می‌کند. بیشترِ مجموعه بوتیک ما بافته همین شهر است؛ و خاندان ما در نوشتن همین تاریخِ کوتاهِ شگفت سهم داشته است.",
      ],
    },
  },
  {
    slug: "kashan",
    featured: true,
    name: { en: "Kashan", fa: "کاشان", tr: "Kaşan", es: "Kashan", ja: "カーシャーン", de: "Kaschan", ru: "Кашан", ar: "كاشان", zh: "卡尚" },
    kicker: { en: "Wool & silk · Safavid roots, UNESCO 2010", fa: "پشم و ابریشم · ریشه صفوی، ثبت یونسکو ۱۳۸۹" },
    body: {
      en: [
        "Kashan is memory. A royal workshop city under the Safavids — the Ardabil Carpet itself is signed by a Kashani — it led the 19th-century revival under masters like Mohtasham, whose luminous rugs of imported merino wool, spun via Manchester's mills, gave the trade the name 'Manchester Kashan'.",
        "In 2010 UNESCO inscribed Kashan's traditional carpet-weaving skills on the Intangible Cultural Heritage of Humanity list. The classic Kashan look: a dignified lachak-toranj in madder red and deep indigo, wool with a soft inner glow. Two old Manchester-wool Kashans anchor our collection — and our founder was born in this city in 1866.",
      ],
      fa: [
        "کاشان یعنی حافظه. شهرِ کارگاه‌های شاهی صفوی — فرش اردبیل امضای یک کاشانی را بر خود دارد — و پیشتازِ نوزایی قرن سیزدهم به دست استادانی چون محتشم؛ فرش‌های درخشانشان از پشم مرینوسِ رسیده از کارخانه‌های منچستر بود و «کاشان منچستر» از همین‌جا نام گرفت.",
        "در سال ۱۳۸۹ یونسکو مهارت‌های سنتی فرش‌بافی کاشان را میراث ناملموس بشریت شناخت. سیمای کلاسیک کاشان: لچک‌ترنجی باوقار در قرمزِ روناسی و سرمه‌ای، با پشمی که از درون می‌تابد. دو کاشانِ کهنه از پشم منچستر ستون مجموعه ما هستند — و بنیان‌گذار ما در همین شهر، به سال ۱۲۴۵، زاده شد.",
      ],
    },
  },
  {
    slug: "malayer",
    featured: false,
    name: { en: "Malayer", fa: "ملایر", ru: "Мелайер", ar: "ملاير", zh: "马拉耶尔", ja: "マラーイェル" },
    kicker: { en: "Village wool of the west", fa: "پشمِ روستایی غرب" },
    body: {
      en: [
        "Village weaving of western Iran: sincere, sturdy, rich in boteh — a collector's quiet secret. Malayer rugs carry the honesty of looms worked at home, with drawing that keeps a human pulse no city workshop reproduces.",
      ],
      fa: [
        "بافته روستایی غرب ایران: صمیمی، استوار، سرشار از بته — رازِ آرام مجموعه‌داران. فرش ملایر صداقتِ دارِ خانگی را با خود دارد؛ طراحی‌اش نبضی انسانی دارد که هیچ کارگاه شهری بازنمی‌سازد.",
      ],
    },
  },
  {
    slug: "shiraz",
    featured: false,
    name: { en: "Shiraz & Fars", fa: "شیراز و فارس", ru: "Шираз и Фарс", ar: "شيراز وفارس", zh: "设拉子与法尔斯", ja: "シーラーズとファールス" },
    kicker: { en: "Homeland of the Gabbeh", fa: "زادگاه گبه" },
    body: {
      en: [
        "Homeland of the Gabbeh and of tribal geometry — bold fields, few colors, and a lone tree or goat where pattern relaxes into poetry. The carpet-weaving skills of Fars are UNESCO-listed alongside Kashan's.",
      ],
      fa: [
        "زادگاه گبه و هندسه ایلیاتی — متن‌های دلیر، رنگ‌های اندک، و درختی یا بزی تنها آنجا که نقش به شعر می‌رسد. مهارت فرش‌بافی فارس هم‌رده کاشان در یونسکو ثبت است.",
      ],
    },
  },
  {
    slug: "oushak",
    featured: false,
    name: { en: "Oushak", fa: "اوشاک", tr: "Uşak", ru: "Ушак", ar: "أوشاك", zh: "乌沙克", ja: "ウシャク" },
    kicker: { en: "The Anatolian neighbour", fa: "همسایه آناتولیایی" },
    body: {
      en: [
        "The Anatolian neighbour: monumental scale, apricot and gold, beloved of decorators — an honorary guest in Persian collections, and in ours.",
      ],
      fa: [
        "همسایه آناتولیایی: مقیاس باشکوه، هلویی و طلایی، محبوب طراحان داخلی — میهمانِ گرامی مجموعه‌های ایرانی، و مجموعه ما.",
      ],
    },
  },
  {
    slug: "moshk-abad",
    featured: false,
    name: { en: "Moshk Abad", fa: "مشک‌آباد", ru: "Мошк-Абад", ar: "مشك‌آباد", zh: "莫什克阿巴德", ja: "モシュク・アバード" },
    kicker: { en: "Old village carpets near Arak", fa: "فرش‌های کهنه روستایی حوالی اراک" },
    body: {
      en: [
        "A village weaving name from the Arak region of central Iran, prized for durable, warmly-colored room-size carpets. Old Moshk Abad pieces are sought for the mellow patina their wool takes on with age; our collection carries both old and newer examples.",
      ],
      fa: [
        "نامی از بافندگی روستایی منطقه اراک در مرکز ایران، شناخته به قالی‌های بادوام و گرم‌رنگ در قواره‌های بزرگ. مشک‌آبادهای کهنه را برای پاتینِ ملایمی که پشمشان با گذر سال می‌گیرد می‌جویند؛ در مجموعه ما هم نمونه کهنه هست و هم نوتر.",
      ],
    },
  },
  {
    slug: "tabriz",
    featured: false,
    name: { en: "Tabriz", fa: "تبریز", ru: "Тебриз", ar: "تبريز", zh: "大不里士", ja: "タブリーズ" },
    kicker: { en: "The great school of the northwest", fa: "مکتب بزرگ شمال غرب" },
    body: {
      en: [
        "The great mercantile school of the northwest — masterly in every genre, from hunting scenes to pictorial rugs. We source Tabriz work on commission.",
      ],
      fa: [
        "مکتب بزرگ بازرگانی شمال غرب — چیره‌دست در هر ژانر، از شکارگاه تا فرش‌های تصویری. کار تبریز را به سفارش شما فراهم می‌کنیم.",
      ],
    },
  },
  {
    slug: "isfahan",
    featured: false,
    name: { en: "Isfahan", fa: "اصفهان", ru: "Исфахан", ar: "أصفهان", zh: "伊斯法罕", ja: "イスファハーン" },
    kicker: { en: "Safavid court refinement", fa: "ظرافت درباری صفوی" },
    body: {
      en: [
        "Safavid court refinement continued: ivory grounds, eslimi arabesques, silk-on-silk precision. We source Isfahan work on commission.",
      ],
      fa: [
        "ادامه ظرافت درباری صفوی: زمینه‌های کرم، اسلیمی‌ها، و دقتِ ابریشم بر ابریشم. کار اصفهان را به سفارش شما فراهم می‌کنیم.",
      ],
    },
  },
  {
    slug: "nain",
    featured: false,
    name: { en: "Nain", fa: "نایین", ru: "Наин", ar: "نايين", zh: "纳因", ja: "ナーイーン" },
    kicker: { en: "Ivory and blue formality", fa: "رسمیتِ کرم و آبی" },
    body: {
      en: [
        "Cool palettes of ivory and blue, wool trimmed with silk highlights — quiet formality. We source Nain work on commission.",
      ],
      fa: [
        "رنگ‌بندی خنکِ کرم و آبی، پشمِ گل‌ابریشم — رسمیتی آرام. کار نایین را به سفارش شما فراهم می‌کنیم.",
      ],
    },
  },
];

export const regionBySlug = (slug: string): Region | undefined =>
  regions.find((r) => r.slug === slug);

export const regionName = (region: Region, locale: Locale) =>
  region.name[locale] ?? region.name.en;

export const regionKicker = (region: Region, locale: Locale) =>
  region.kicker[locale] ?? region.kicker.en;

export const regionBody = (region: Region, locale: Locale) =>
  region.body[locale] ?? region.body.en;

/** Map a rug's `origin` string (or category, as fallback) to a region slug. */
const ORIGIN_MAP: Record<string, string> = {
  qom: "qom",
  kashan: "kashan",
  malayer: "malayer",
  shiraz: "shiraz",
  oushak: "oushak",
  "moshk abad": "moshk-abad",
  tabriz: "tabriz",
  isfahan: "isfahan",
  nain: "nain",
};

export function originToRegion(origin?: string, category?: string): string | undefined {
  if (origin) {
    const hit = ORIGIN_MAP[origin.toLowerCase().trim()];
    if (hit) return hit;
  }
  if (category === "oushak") return "oushak";
  if (category === "moshk-abad" || category === "new-moshk-abad") return "moshk-abad";
  return undefined;
}
