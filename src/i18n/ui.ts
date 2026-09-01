export const locales = ["en", "fa", "tr", "es", "ja", "de"] as const;
export type Locale = (typeof locales)[number];
export const defaultLocale: Locale = "en";

export const localeMeta: Record<Locale, { dir: "ltr" | "rtl"; htmlLang: string; label: string }> = {
  en: { dir: "ltr", htmlLang: "en", label: "English" },
  fa: { dir: "rtl", htmlLang: "fa", label: "فارسی" },
  tr: { dir: "ltr", htmlLang: "tr", label: "Türkçe" },
  es: { dir: "ltr", htmlLang: "es", label: "Español" },
  ja: { dir: "ltr", htmlLang: "ja", label: "日本語" },
  de: { dir: "ltr", htmlLang: "de", label: "Deutsch" },
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
tr: {
    siteName: "Arsalani Halı",
    siteTagline: "El dokuması İran halılarında lüks — 1866'dan beri bir aile zanaatı.",
    nav: { home: "Ana Sayfa", rugs: "Koleksiyon", history: "Tarihçe", guide: "Halı Rehberi", heritage: "Mirasımız", contact: "İletişim" },
    categories: {
      all: "Tüm Halılar",
      "selected-available-rugs": "Seçilmiş & Mevcut",
      "boutique-rugs": "Butik Halılar",
      "patch-work": "Patchwork",
      oushak: "Uşak",
      "moshk-abad": "Muşkabad",
      "new-moshk-abad": "Yeni Muşkabad",
    } satisfies Record<CategorySlug | "all", string>,
    materials: { "full-silk": "Saf İpek", wool: "Yün", "silk-touch": "İpek Dokunuşlu" } satisfies Record<MaterialSlug, string>,
    specs: { title: "Detaylar", sku: "Referans", dimensions: "Boyutlar", origin: "Menşei", material: "Malzeme", category: "Koleksiyon", colors: "Renk Paleti", cm: "cm" },
    cta: {
      priceOnRequest: "Fiyat sorunuz",
      inquire: "Bu halı hakkında bilgi alın",
      whatsapp: "WhatsApp", call: "Bizi arayın", email: "E-posta gönderin",
      viewCollection: "Koleksiyonu görün", viewRug: "Halıyı görün", readStory: "Hikâyemizi okuyun",
      allFilter: "Tümü", relatedRugs: "Beğenebilecekleriniz",
    },
    gallery: { zoomHint: "Büyütmek için tıklayın", close: "Kapat", prev: "Önceki görsel", next: "Sonraki görsel", zoomHelp: "Yakınlaştırmak için tıklayın veya kaydırın · sürükleyerek gezinin" },
    home: {
      featuredKicker: "Özenle seçildi", categoriesKicker: "Koleksiyona göre gezinin",
      heroKicker: "Kum · Kaşan · Uşak", heroTitle: "Dokunmuş Miraslar",
      heroText: "İran'ın büyük dokuma atölyelerinden el düğümü ipek ve yün başyapıtlar — 1866'dan beri bu zanaatın içindeki Arsalani ailesinin seçkisiyle.",
      featuredTitle: "Seçilmiş Parçalar", categoriesTitle: "Koleksiyonlar",
      heritageTitle: "1866'dan Beri Dokumacı Bir Aile",
      heritageTeaser: "Kaşan'da 1866'da doğan Gholamhossein Arsalani'den Tahran ve Kum çarşılarına — İran halısı sanatına adanmış beş kuşak.",
      inquiryTitle: "Belirli bir parça mı arıyorsunuz?",
      inquiryText: "Aklınızdaki ölçüyü, renkleri ve tarzı söyleyin — ailemiz onu sizin için bulur ya da dokutturur.",
    },
    catalog: {
      title: "Koleksiyon",
      intro: "El düğümü halılar, her biri tek bir eser — boyutlar ve menşei listelenmiştir, fiyatlar sorulur.",
      empty: "Bu seçime uyan halı yok.", filterMaterial: "Malzeme",
      piecesCount: (n: number) => `${n} parça`,
    },
    heritage: { title: "Mirasımız", intro: "Kaşan'dan dünyaya, bir asrı aşkın İran halı zanaatı." },
    contactPage: {
      title: "İletişim",
      intro: "Bizi Tahran ve Kum'un tarihi çarşılarında, İzmir ve Los Angeles'taki adreslerimizde ziyaret edin — ya da aşağıdan yazın.",
      locationsTitle: "Adreslerimiz", formTitle: "Mesaj gönderin",
      name: "Ad", email: "E-posta", phone: "Telefon (isteğe bağlı)", message: "Mesaj", submit: "Mesajı gönder",
      thankYouTitle: "Teşekkürler", thankYouText: "Mesajınız gönderildi. En kısa sürede dönüş yapacağız.",
    },
    locations: [
      { city: "Tahran, İran", address: "Bazar Booali Sara, Tahran Kapalıçarşısı" },
      { city: "Kum, İran", address: "Bazar Amjadi Sara, Kum" },
      { city: "İzmir, Türkiye", address: "Ataşehir Mah., İzmir" },
      { city: "Los Angeles, ABD", address: "Los Angeles, Kaliforniya" },
    ],
    footer: { tagline: "Hepimizden uzun yaşasın diye dokunan el halıları.", rights: "Tüm hakları saklıdır.", navTitle: "Keşfedin", contactTitle: "Bize ulaşın" },
    notFound: { title: "Sayfa bulunamadı", text: "İzlediğiniz iplik çözülmüş. İzin verin sizi geri götürelim.", backHome: "Ana sayfaya dön" },
    whatsappMessage: (title: string, sku: string, url: string) =>
      `Merhaba, "${title}" (Ref ${sku}) ile ilgileniyorum — ${url}`,
  },
  es: {
    siteName: "Arsalani Rug",
    siteTagline: "Alfombras persas de lujo tejidas a mano — un oficio familiar desde 1866.",
    nav: { home: "Inicio", rugs: "La Colección", history: "Historia", guide: "Guía de Alfombras", heritage: "Nuestro Legado", contact: "Contacto" },
    categories: {
      all: "Todas las alfombras",
      "selected-available-rugs": "Selectas y disponibles",
      "boutique-rugs": "Alfombras boutique",
      "patch-work": "Patchwork",
      oushak: "Oushak",
      "moshk-abad": "Moshk Abad",
      "new-moshk-abad": "Nuevo Moshk Abad",
    } satisfies Record<CategorySlug | "all", string>,
    materials: { "full-silk": "Seda pura", wool: "Lana", "silk-touch": "Toque de seda" } satisfies Record<MaterialSlug, string>,
    specs: { title: "Detalles", sku: "Referencia", dimensions: "Dimensiones", origin: "Origen", material: "Material", category: "Colección", colors: "Paleta", cm: "cm" },
    cta: {
      priceOnRequest: "Precio a consultar",
      inquire: "Consulte por esta alfombra",
      whatsapp: "WhatsApp", call: "Llámenos", email: "Escríbanos",
      viewCollection: "Ver la colección", viewRug: "Ver alfombra", readStory: "Lea nuestra historia",
      allFilter: "Todas", relatedRugs: "También podrían gustarle",
    },
    gallery: { zoomHint: "Haga clic para ampliar", close: "Cerrar", prev: "Imagen anterior", next: "Imagen siguiente", zoomHelp: "Clic o rueda para ampliar · arrastre para mover" },
    home: {
      featuredKicker: "Selección curada", categoriesKicker: "Explorar por colección",
      heroKicker: "Qom · Kashan · Oushak", heroTitle: "Herencias Tejidas",
      heroText: "Obras maestras de seda y lana anudadas a mano en los grandes talleres persas — seleccionadas por la familia Arsalani, en el oficio desde 1866.",
      featuredTitle: "Piezas selectas", categoriesTitle: "Las colecciones",
      heritageTitle: "Una familia de tejedores desde 1866",
      heritageTeaser: "De Gholamhossein Arsalani, nacido en Kashan en 1866, a los bazares de Teherán y Qom — cinco generaciones dedicadas al arte de la alfombra persa.",
      inquiryTitle: "¿Busca una pieza en particular?",
      inquiryText: "Díganos la medida, la paleta y el estilo que imagina — nuestra familia la encontrará o la mandará tejer para usted.",
    },
    catalog: {
      title: "La Colección",
      intro: "Alfombras anudadas a mano, cada una obra única — dimensiones y procedencia listadas, precios a consultar.",
      empty: "Ninguna alfombra coincide con esta selección.", filterMaterial: "Material",
      piecesCount: (n: number) => `${n} ${n === 1 ? "pieza" : "piezas"}`,
    },
    heritage: { title: "Nuestro Legado", intro: "Más de un siglo de arte de la alfombra persa, de Kashan al mundo." },
    contactPage: {
      title: "Contacto",
      intro: "Visítenos en los bazares históricos de Teherán y Qom, en Esmirna o Los Ángeles — o escríbanos aquí.",
      locationsTitle: "Nuestras direcciones", formTitle: "Envíe un mensaje",
      name: "Nombre", email: "Correo", phone: "Teléfono (opcional)", message: "Mensaje", submit: "Enviar mensaje",
      thankYouTitle: "Gracias", thankYouText: "Su mensaje ha sido enviado. Le responderemos muy pronto.",
    },
    locations: [
      { city: "Teherán, Irán", address: "Bazar Booali Sara, Gran Bazar de Teherán" },
      { city: "Qom, Irán", address: "Bazar Amjadi Sara, Qom" },
      { city: "Esmirna, Turquía", address: "Ataşehir Mah., Esmirna" },
      { city: "Los Ángeles, EE. UU.", address: "Los Ángeles, California" },
    ],
    footer: { tagline: "Alfombras persas tejidas a mano para sobrevivirnos a todos.", rights: "Todos los derechos reservados.", navTitle: "Explorar", contactTitle: "Contacto" },
    notFound: { title: "Página no encontrada", text: "El hilo que seguía se ha soltado. Permítanos guiarle de vuelta.", backHome: "Volver al inicio" },
    whatsappMessage: (title: string, sku: string, url: string) =>
      `Hola, me interesa "${title}" (Ref ${sku}) — ${url}`,
  },
  ja: {
    siteName: "アルサラーニ・ラグ",
    siteTagline: "手織りペルシャ絨毯の名品 — 1866年から続く一族の技。",
    nav: { home: "ホーム", rugs: "コレクション", history: "絨毯の歴史", guide: "絨毯ガイド", heritage: "私たちの歩み", contact: "お問い合わせ" },
    categories: {
      all: "すべての絨毯",
      "selected-available-rugs": "厳選・在庫あり",
      "boutique-rugs": "ブティック絨毯",
      "patch-work": "パッチワーク",
      oushak: "ウシャク",
      "moshk-abad": "モシュク・アバード",
      "new-moshk-abad": "新モシュク・アバード",
    } satisfies Record<CategorySlug | "all", string>,
    materials: { "full-silk": "総シルク", wool: "ウール", "silk-touch": "シルクタッチ" } satisfies Record<MaterialSlug, string>,
    specs: { title: "詳細", sku: "整理番号", dimensions: "サイズ", origin: "産地", material: "素材", category: "コレクション", colors: "配色", cm: "cm" },
    cta: {
      priceOnRequest: "価格はお問い合わせください",
      inquire: "この絨毯について問い合わせる",
      whatsapp: "WhatsApp", call: "お電話", email: "メール",
      viewCollection: "コレクションを見る", viewRug: "絨毯を見る", readStory: "私たちの物語を読む",
      allFilter: "すべて", relatedRugs: "こちらもおすすめ",
    },
    gallery: { zoomHint: "クリックで拡大", close: "閉じる", prev: "前の画像", next: "次の画像", zoomHelp: "クリックまたはスクロールで拡大 · ドラッグで移動" },
    home: {
      featuredKicker: "キュレーション", categoriesKicker: "コレクションから探す",
      heroKicker: "クム · カーシャーン · ウシャク", heroTitle: "織られた家宝",
      heroText: "ペルシャの名工房から届く、手結びのシルクとウールの傑作 — 1866年からこの道を歩むアルサラーニ家が選び抜きました。",
      featuredTitle: "厳選の逸品", categoriesTitle: "コレクション",
      heritageTitle: "1866年から続く織りの一族",
      heritageTeaser: "1866年カーシャーンに生まれたゴラームホセイン・アルサラーニから、テヘランとクムのバザールへ — ペルシャ絨毯の芸術に捧げた五世代。",
      inquiryTitle: "お探しの一枚がありますか？",
      inquiryText: "ご希望のサイズ・色調・様式をお聞かせください — 私たちの一族が探し出し、あるいは織り上げてお届けします。",
    },
    catalog: {
      title: "コレクション",
      intro: "手結びの絨毯、一枚一枚が唯一の作品 — サイズと産地を記載、価格はお問い合わせください。",
      empty: "この条件に合う絨毯はありません。", filterMaterial: "素材",
      piecesCount: (n: number) => `${n}枚`,
    },
    heritage: { title: "私たちの歩み", intro: "カーシャーンから世界へ — 一世紀を超えるペルシャ絨毯の技。" },
    contactPage: {
      title: "お問い合わせ",
      intro: "テヘランとクムの歴史あるバザール、イズミルやロサンゼルスの拠点でお待ちしています — 下記フォームからもどうぞ。",
      locationsTitle: "所在地", formTitle: "メッセージを送る",
      name: "お名前", email: "メールアドレス", phone: "電話番号（任意）", message: "メッセージ", submit: "送信",
      thankYouTitle: "ありがとうございます", thankYouText: "メッセージを受け付けました。追ってご連絡いたします。",
    },
    locations: [
      { city: "テヘラン（イラン）", address: "テヘラン・グランドバザール、ブーアリー・サラー" },
      { city: "クム（イラン）", address: "クム・バザール、アムジャディー・サラー" },
      { city: "イズミル（トルコ）", address: "アタシェヒル地区、イズミル" },
      { city: "ロサンゼルス（アメリカ）", address: "カリフォルニア州ロサンゼルス" },
    ],
    footer: { tagline: "私たちより長く生きるために織られた、手織りのペルシャ絨毯。", rights: "無断転載を禁じます。", navTitle: "メニュー", contactTitle: "ご連絡先" },
    notFound: { title: "ページが見つかりません", text: "たどった糸がほどけてしまいました。もとの場所へご案内します。", backHome: "ホームへ戻る" },
    whatsappMessage: (title: string, sku: string, url: string) =>
      `こんにちは。「${title}」（整理番号 ${sku}）について問い合わせます — ${url}`,
  },
  de: {
    siteName: "Arsalani Rug",
    siteTagline: "Handgeknüpfte persische Teppiche von höchstem Rang — ein Familienhandwerk seit 1866.",
    nav: { home: "Startseite", rugs: "Die Kollektion", history: "Geschichte", guide: "Teppich-Guide", heritage: "Unser Erbe", contact: "Kontakt" },
    categories: {
      all: "Alle Teppiche",
      "selected-available-rugs": "Ausgewählt & verfügbar",
      "boutique-rugs": "Boutique-Teppiche",
      "patch-work": "Patchwork",
      oushak: "Oushak",
      "moshk-abad": "Moshk Abad",
      "new-moshk-abad": "Neu-Moshk-Abad",
    } satisfies Record<CategorySlug | "all", string>,
    materials: { "full-silk": "Reine Seide", wool: "Wolle", "silk-touch": "Seidenglanz" } satisfies Record<MaterialSlug, string>,
    specs: { title: "Details", sku: "Referenz", dimensions: "Maße", origin: "Herkunft", material: "Material", category: "Kollektion", colors: "Palette", cm: "cm" },
    cta: {
      priceOnRequest: "Preis auf Anfrage",
      inquire: "Zu diesem Teppich anfragen",
      whatsapp: "WhatsApp", call: "Rufen Sie uns an", email: "Schreiben Sie uns",
      viewCollection: "Zur Kollektion", viewRug: "Teppich ansehen", readStory: "Unsere Geschichte lesen",
      allFilter: "Alle", relatedRugs: "Das könnte Ihnen auch gefallen",
    },
    gallery: { zoomHint: "Zum Vergrößern klicken", close: "Schließen", prev: "Vorheriges Bild", next: "Nächstes Bild", zoomHelp: "Klicken oder scrollen zum Zoomen · ziehen zum Verschieben" },
    home: {
      featuredKicker: "Kuratierte Auswahl", categoriesKicker: "Nach Kollektion stöbern",
      heroKicker: "Ghom · Kaschan · Oushak", heroTitle: "Gewebte Erbstücke",
      heroText: "Handgeknüpfte Meisterwerke aus Seide und Wolle aus den großen persischen Webhäusern — kuratiert von der Familie Arsalani, seit 1866 in diesem Handwerk.",
      featuredTitle: "Ausgewählte Stücke", categoriesTitle: "Die Kollektionen",
      heritageTitle: "Eine Weberfamilie seit 1866",
      heritageTeaser: "Von Gholamhossein Arsalani, 1866 in Kaschan geboren, bis zu den Basaren von Teheran und Ghom — fünf Generationen im Dienst der persischen Teppichkunst.",
      inquiryTitle: "Suchen Sie ein bestimmtes Stück?",
      inquiryText: "Nennen Sie uns Maß, Farbwelt und Stil — unsere Familie findet es für Sie oder lässt es knüpfen.",
    },
    catalog: {
      title: "Die Kollektion",
      intro: "Handgeknüpfte Teppiche, jeder ein Unikat — Maße und Herkunft verzeichnet, Preise auf Anfrage.",
      empty: "Kein Teppich entspricht dieser Auswahl.", filterMaterial: "Material",
      piecesCount: (n: number) => `${n} ${n === 1 ? "Stück" : "Stücke"}`,
    },
    heritage: { title: "Unser Erbe", intro: "Über ein Jahrhundert persischer Teppichkunst, von Kaschan in die Welt." },
    contactPage: {
      title: "Kontakt",
      intro: "Besuchen Sie uns in den historischen Basaren von Teheran und Ghom, in Izmir oder Los Angeles — oder schreiben Sie uns.",
      locationsTitle: "Unsere Standorte", formTitle: "Nachricht senden",
      name: "Name", email: "E-Mail", phone: "Telefon (optional)", message: "Nachricht", submit: "Nachricht senden",
      thankYouTitle: "Vielen Dank", thankYouText: "Ihre Nachricht wurde gesendet. Wir melden uns in Kürze.",
    },
    locations: [
      { city: "Teheran, Iran", address: "Bazar Booali Sara, Großer Basar von Teheran" },
      { city: "Ghom, Iran", address: "Bazar Amjadi Sara, Ghom" },
      { city: "Izmir, Türkei", address: "Ataşehir Mah., Izmir" },
      { city: "Los Angeles, USA", address: "Los Angeles, Kalifornien" },
    ],
    footer: { tagline: "Handgeknüpfte persische Teppiche, gewebt, um uns alle zu überdauern.", rights: "Alle Rechte vorbehalten.", navTitle: "Entdecken", contactTitle: "Kontakt" },
    notFound: { title: "Seite nicht gefunden", text: "Der Faden, dem Sie folgten, hat sich gelöst. Lassen Sie sich zurückführen.", backHome: "Zur Startseite" },
    whatsappMessage: (title: string, sku: string, url: string) =>
      `Guten Tag, ich interessiere mich für "${title}" (Ref ${sku}) — ${url}`,
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

export function stripLocale(currentPath: string): string {
  const stripped = currentPath.replace(/^\/(fa|tr|es|ja|de)(\/|$)/, "/");
  return stripped === "" ? "/" : stripped;
}

export function alternatePath(locale: Locale, currentPath: string): string {
  // strip any existing locale prefix, then rebuild for the target locale
  return localizedPath(locale, stripLocale(currentPath));
}
