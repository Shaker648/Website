/* ============================================================================
   First 1 Car — Site content (single source of truth)
   ----------------------------------------------------------------------------
   EDIT THIS FILE to change anything on the website: phone numbers, branches,
   brands, models and official prices. Nothing else needs to be touched.

   Every text field is bilingual:  { ar: "عربي", en: "English" }

   ⚠ Fields marked  // TODO  are placeholders — replace them with real values.
   ============================================================================ */

const SITE = {

  /* ── Company ─────────────────────────────────────────────────────────── */
  company: {
    name:    { ar: "فيرست 1 كار",  en: "First 1 Car" },
    tagline: { ar: "أول اختيارك، وآخر قلقك",
               en: "Your first choice. Your last worry." },
    intro:   {
      ar: "معرض سيارات متعدد الماركات، نقدّم سيارات زيرو بضمان الوكيل وأسعار رسمية معلنة، مع خدمة تقسيط من أكبر البنوك المصرية.",
      en: "A multi-brand showroom offering brand-new cars with official agency warranty, publicly listed official prices, and financing from Egypt's largest banks."
    },
    founded: 2016,                                    // TODO confirm year
    domain:  "first1car.net"
  },

  /* ── Contact ─────────────────────────────────────────────────────────── */
  contact: {
    phonePrimary: "+20 100 000 0000",                 // TODO real number
    phoneSales:   "+20 100 000 0000",                 // TODO real number
    whatsapp:     "201000000000",                     // TODO digits only, no +
    email:        "info@first1car.net",               // TODO confirm
    hours: {
      ar: "يومياً من ١٠ صباحاً حتى ١٠ مساءً — الجمعة إجازة",
      en: "Daily 10:00 – 22:00 — closed Fridays"
    }
  },

  /* ── Social ──────────────────────────────────────────────────────────── */
  social: {
    facebook:  "https://facebook.com/",               // TODO
    instagram: "https://instagram.com/",              // TODO
    tiktok:    "https://tiktok.com/",                 // TODO
    youtube:   ""                                     // leave "" to hide
  },

  /* ── Branches ────────────────────────────────────────────────────────── */
  /* mapUrl values below were found in the internal system — confirm they
     point at the right showroom before launch.                              */
  branches: [
    {
      name:    { ar: "الفرع الرئيسي", en: "Main Branch" },       // TODO
      address: { ar: "القاهرة، مصر",  en: "Cairo, Egypt" },      // TODO
      phone:   "+20 100 000 0000",                                // TODO
      mapUrl:  "https://maps.app.goo.gl/6PS5VYpB71HwdR5u6"
    },
    {
      name:    { ar: "الفرع الثاني",  en: "Second Branch" },      // TODO
      address: { ar: "القاهرة، مصر",  en: "Cairo, Egypt" },       // TODO
      phone:   "+20 100 000 0000",                                // TODO
      mapUrl:  "https://maps.app.goo.gl/G8UGyDD3iftuqBqz5"
    }
  ],

  /* ── Brands & models ─────────────────────────────────────────────────── */
  /* price = official price in EGP (السعر الرسمي).  Set to null to show
     "اتصل للسعر / Call for price" instead of a number.
     Models below are the ones actually present in the internal system.      */
  brands: [
    {
      id: "chery",
      name: { ar: "شيري", en: "Chery" },
      color: "#c8102e",
      models: [
        { name: { ar: "تيجو 7 برو", en: "Tiggo 7 Pro" }, body: "suv",   price: null },
        { name: { ar: "تيجو 7",     en: "Tiggo 7"     }, body: "suv",   price: null },
        { name: { ar: "تيجو 8",     en: "Tiggo 8"     }, body: "suv",   price: null }
      ]
    },
    {
      id: "geely",
      name: { ar: "جيلي", en: "Geely" },
      color: "#2b5fa8",
      models: [
        { name: { ar: "إمجراند", en: "Emgrand" }, body: "sedan", price: null },
        { name: { ar: "كوول راي", en: "Coolray" }, body: "suv",   price: null }
      ]
    },
    {
      id: "haval",
      name: { ar: "هافال", en: "Haval" },
      color: "#d21a1a",
      models: [
        { name: { ar: "جوليون", en: "Jolion" }, body: "suv", price: null },
        { name: { ar: "دارجو",  en: "Dargo"  }, body: "suv", price: null }
      ]
    },
    {
      id: "hyundai",
      name: { ar: "هيونداي", en: "Hyundai" },
      color: "#00287a",
      models: [
        { name: { ar: "أكسنت",  en: "Accent"  }, body: "sedan", price: null },
        { name: { ar: "إلنترا", en: "Elantra" }, body: "sedan", price: null },
        { name: { ar: "توسان",  en: "Tucson"  }, body: "suv",   price: null },
        { name: { ar: "كريتا",  en: "Creta"   }, body: "suv",   price: null }
      ]
    },
    {
      id: "changan",
      name: { ar: "شانجان", en: "Changan" },
      color: "#0d5bd4",
      models: [
        { name: { ar: "إيدو", en: "Eado"   }, body: "sedan", price: null },
        { name: { ar: "الصفين", en: "Alsvin" }, body: "sedan", price: null }
      ]
    },
    {
      id: "mitsubishi",
      name: { ar: "ميتسوبيشي", en: "Mitsubishi" },
      color: "#e60012",
      models: [
        { name: { ar: "إكسباندر", en: "Xpander" }, body: "suv",   price: null },
        { name: { ar: "أتراج",    en: "Attrage" }, body: "sedan", price: null },
        { name: { ar: "لانسر",    en: "Lancer"  }, body: "sedan", price: null }
      ]
    },
    {
      id: "gac",
      name: { ar: "جي إيه سي", en: "GAC" },
      color: "#111827",
      models: []                                        // TODO add models
    },
    {
      id: "byd",
      name: { ar: "بي واي دي", en: "BYD" },
      color: "#c8102e",
      models: []                                        // TODO add models
    }
  ],

  /* ── Banks we finance through ────────────────────────────────────────── */
  banks: [
    { ar: "البنك الأهلي المصري", en: "National Bank of Egypt" },
    { ar: "بنك مصر",             en: "Banque Misr" },
    { ar: "بنك القاهرة",         en: "Banque du Caire" },
    { ar: "البنك التجاري الدولي", en: "CIB" },
    { ar: "بنك القاهرة عمان",     en: "Cairo Amman Bank" },
    { ar: "بنك الإسكندرية",       en: "Bank of Alexandria" }
  ]                                                     // TODO confirm the list
};
