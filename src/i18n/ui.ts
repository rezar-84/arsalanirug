export const locales = ["en", "fa"] as const;
export type Locale = (typeof locales)[number];
export const defaultLocale: Locale = "en";

export const localeMeta: Record<Locale, { dir: "ltr" | "rtl"; htmlLang: string; label: string }> = {
  en: { dir: "ltr", htmlLang: "en", label: "English" },
  fa: { dir: "rtl", htmlLang: "fa", label: "فارسی" },
};

// Contact details carried over from the old site. The WhatsApp number is a
// placeholder (the old Qom landline) until the real business line is provided
// — see README "Open items".
export const contact = {
  phone: "+982537723684",
  phoneDisplay: "+98 253 772 3684",
  whatsapp: "982537723684",
  email: "info@arsalanirug.com",
  instagram: "https://www.instagram.com/arsalanirug/",
};

export const categorySlugs = [
  "selected-available-rugs",
  "boutique-rugs",
  "patch-work",
  "oushak",
  "moshk-abad",
  "new-moshk-abad",
] as const;
export type CategorySlug = (typeof categorySlugs)[number];

export const materialSlugs = ["full-silk", "wool", "silk-touch"] as const;
export type MaterialSlug = (typeof materialSlugs)[number];

export const ui = {
  en: {
    siteName: "Arsalani Rug",
    siteTagline: "Luxury and modern Persian rugs — a family craft since 1866.",
    nav: {
      home: "Home",
      rugs: "The Collection",
      history: "History",
      guide: "Rug Guide",
      heritage: "Heritage",
      contact: "Contact",
    },
    categories: {
      all: "All Rugs",
      "selected-available-rugs": "Selected & Available",
      "boutique-rugs": "Boutique Rugs",
      "patch-work": "Patchwork",
      oushak: "Oushak",
      "moshk-abad": "Moshk Abad",
      "new-moshk-abad": "New Moshk Abad",
    } satisfies Record<CategorySlug | "all", string>,
    materials: {
      "full-silk": "Full Silk",
      wool: "Wool",
      "silk-touch": "Silk Touch",
    } satisfies Record<MaterialSlug, string>,
    specs: {
      title: "Details",
      sku: "Reference",
      dimensions: "Dimensions",
      origin: "Origin",
      material: "Material",
      category: "Collection",
      colors: "Palette",
      cm: "cm",
    },
    cta: {
      priceOnRequest: "Price on request",
      inquire: "Enquire about this rug",
      whatsapp: "WhatsApp",
      call: "Call us",
      email: "Email us",
      viewCollection: "View the collection",
      viewRug: "View rug",
      readStory: "Read our story",
      allFilter: "All",
      relatedRugs: "You may also admire",
    },
    gallery: {
      zoomHint: "Click to enlarge",
      close: "Close",
      prev: "Previous image",
      next: "Next image",
      zoomHelp: "Click or scroll to zoom · drag to pan",
    },
    home: {
      featuredKicker: "Curated selection",
      categoriesKicker: "Browse by collection",
      heroKicker: "Qom · Kashan · Oushak",
      heroTitle: "Woven Heirlooms",
      heroText:
        "Hand-knotted silk and wool masterpieces from the great Persian weaving houses — curated by the Arsalani family, in the trade since 1866.",
      featuredTitle: "Selected Pieces",
      categoriesTitle: "The Collections",
      heritageTitle: "A Family of Weavers Since 1866",
      heritageTeaser:
        "From Gholamhossein Arsalani, born in Kashan in 1866, to the bazaars of Tehran, Qom and beyond — five generations devoted to the art of the Persian carpet.",
      inquiryTitle: "Looking for a particular piece?",
      inquiryText:
        "Tell us the size, palette and style you have in mind — our family will source or commission it for you.",
    },
    catalog: {
      title: "The Collection",
      intro: "Hand-knotted rugs, each a single work — dimensions and provenance listed, prices on request.",
      empty: "No rugs match this selection.",
      filterMaterial: "Material",
      piecesCount: (n: number) => `${n} ${n === 1 ? "piece" : "pieces"}`,
    },
    heritage: {
      title: "Our Heritage",
      intro: "More than a century of Persian carpet craft, from Kashan to the world.",
    },
    contactPage: {
      title: "Contact Us",
      intro:
        "Visit us in the historic bazaars of Tehran and Qom, our showrooms in Izmir and Los Angeles — or write to us below.",
      locationsTitle: "Our Locations",
      formTitle: "Send a message",
      name: "Name",
      email: "Email",
      phone: "Phone (optional)",
      message: "Message",
      submit: "Send message",
      thankYouTitle: "Thank you",
      thankYouText: "Your message has been sent. We will be in touch shortly.",
    },
    locations: [
      { city: "Tehran, Iran", address: "Bazar Booali Sara, Tehran Grand Bazaar" },
      { city: "Qom, Iran", address: "Bazar Amjadi Sara, Qom" },
      { city: "Izmir, Türkiye", address: "Ataşehir Mah., Izmir" },
      { city: "Los Angeles, USA", address: "Los Angeles, California" },
    ],
    footer: {
      tagline: "Hand-knotted Persian rugs, woven to outlive us all.",
      rights: "All rights reserved.",
      navTitle: "Explore",
      contactTitle: "Get in touch",
    },
    notFound: {
      title: "Page not found",
      text: "The thread you followed has come loose. Let us guide you back.",
      backHome: "Back to home",
    },
    whatsappMessage: (title: string, sku: string, url: string) =>
      `Hello, I am interested in "${title}" (Ref ${sku}) — ${url}`,
  },
  fa: {
    siteName: "فرش ارسلانی",
    siteTagline: "فرش‌های دستباف نفیس ایرانی — هنری خانوادگی از ۱۲۴۵ خورشیدی.",
    nav: {
      home: "خانه",
      rugs: "مجموعه فرش‌ها",
      history: "تاریخ فرش",
      guide: "راهنمای فرش",
      heritage: "میراث ما",
      contact: "تماس با ما",
    },
    categories: {
      all: "همه فرش‌ها",
      "selected-available-rugs": "منتخب و موجود",
      "boutique-rugs": "فرش‌های بوتیک",
      "patch-work": "چهل‌تکه",
      oushak: "اوشاک",
      "moshk-abad": "مشک‌آباد",
      "new-moshk-abad": "مشک‌آباد نو",
    } satisfies Record<CategorySlug | "all", string>,
    materials: {
      "full-silk": "تمام ابریشم",
      wool: "پشم",
      "silk-touch": "گل ابریشم",
    } satisfies Record<MaterialSlug, string>,
    specs: {
      title: "مشخصات",
      sku: "کد",
      dimensions: "ابعاد",
      origin: "خاستگاه",
      material: "جنس",
      category: "مجموعه",
      colors: "رنگ‌بندی",
      cm: "سانتی‌متر",
    },
    cta: {
      priceOnRequest: "قیمت با هماهنگی",
      inquire: "استعلام این فرش",
      whatsapp: "واتس‌اپ",
      call: "تماس تلفنی",
      email: "ایمیل",
      viewCollection: "مشاهده مجموعه",
      viewRug: "مشاهده فرش",
      readStory: "داستان ما را بخوانید",
      allFilter: "همه",
      relatedRugs: "شاید بپسندید",
    },
    gallery: {
      zoomHint: "برای بزرگ‌نمایی کلیک کنید",
      close: "بستن",
      prev: "تصویر قبلی",
      next: "تصویر بعدی",
      zoomHelp: "برای بزرگ‌نمایی کلیک یا اسکرول کنید · برای جابه‌جایی بکشید",
    },
    home: {
      featuredKicker: "گزیده ما",
      categoriesKicker: "مرور بر اساس مجموعه",
      heroKicker: "قم · کاشان · اوشاک",
      heroTitle: "میراثِ بافته",
      heroText:
        "شاهکارهای دستباف ابریشم و پشم از خانه‌های بزرگ فرش‌بافی ایران — به انتخاب خاندان ارسلانی، فعال در این هنر از سال ۱۲۴۵ خورشیدی.",
      featuredTitle: "قطعات برگزیده",
      categoriesTitle: "مجموعه‌ها",
      heritageTitle: "خاندانی بافنده از ۱۲۴۵ خورشیدی",
      heritageTeaser:
        "از غلامحسین ارسلانی، زاده کاشان، تا بازارهای تهران و قم و فراتر — پنج نسل در خدمت هنر فرش ایرانی.",
      inquiryTitle: "به دنبال فرش خاصی هستید؟",
      inquiryText:
        "ابعاد، رنگ و سبک دلخواه‌تان را بگویید — خانواده ما آن را برایتان می‌یابد یا سفارش بافت می‌دهد.",
    },
    catalog: {
      title: "مجموعه فرش‌ها",
      intro: "فرش‌های دستباف، هر یک اثری یگانه — ابعاد و خاستگاه درج شده، قیمت با هماهنگی.",
      empty: "فرشی با این انتخاب یافت نشد.",
      filterMaterial: "جنس",
      piecesCount: (n: number) => `${n.toLocaleString("fa-IR")} تخته فرش`,
    },
    heritage: {
      title: "میراث ما",
      intro: "بیش از یک قرن هنر فرش ایرانی، از کاشان تا جهان.",
    },
    contactPage: {
      title: "تماس با ما",
      intro:
        "در بازارهای تاریخی تهران و قم، و نمایشگاه‌های ما در ازمیر و لس‌آنجلس منتظر شماییم — یا از فرم زیر برایمان بنویسید.",
      locationsTitle: "نشانی‌های ما",
      formTitle: "ارسال پیام",
      name: "نام",
      email: "ایمیل",
      phone: "تلفن (اختیاری)",
      message: "پیام",
      submit: "ارسال پیام",
      thankYouTitle: "سپاسگزاریم",
      thankYouText: "پیام شما ارسال شد. به‌زودی با شما تماس می‌گیریم.",
    },
    locations: [
      { city: "تهران، ایران", address: "بازار بزرگ تهران، سرای بوعلی" },
      { city: "قم، ایران", address: "بازار قم، سرای امجدی" },
      { city: "ازمیر، ترکیه", address: "محله آتاشهیر، ازمیر" },
      { city: "لس‌آنجلس، آمریکا", address: "لس‌آنجلس، کالیفرنیا" },
    ],
    footer: {
      tagline: "فرش دستباف ایرانی، بافته‌ای که از ما ماندگارتر است.",
      rights: "کلیه حقوق محفوظ است.",
      navTitle: "دسترسی",
      contactTitle: "در تماس باشید",
    },
    notFound: {
      title: "صفحه یافت نشد",
      text: "رشته‌ای که دنبال کردید گسسته است. بگذارید راه را نشانتان دهیم.",
      backHome: "بازگشت به خانه",
    },
    whatsappMessage: (title: string, sku: string, url: string) =>
      `سلام، درباره «${title}» (کد ${sku}) سوال دارم — ${url}`,
  },
} as const;

export function t(locale: Locale) {
  return ui[locale];
}

export function localizedPath(locale: Locale, path: string): string {
  const clean = path.startsWith("/") ? path : `/${path}`;
  if (locale === defaultLocale) return clean;
  return `/${locale}${clean === "/" ? "" : clean}`;
}

export function alternatePath(locale: Locale, currentPath: string): string {
  // strip any existing locale prefix, then rebuild for the target locale
  const stripped = currentPath.replace(/^\/fa(\/|$)/, "/");
  return localizedPath(locale, stripped === "" ? "/" : stripped);
}
