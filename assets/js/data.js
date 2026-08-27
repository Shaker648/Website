/* ============================================================================
   First 1 Car — Site content (single source of truth)
   ----------------------------------------------------------------------------
   EDIT THIS FILE to change anything on the website. Nothing else needs
   touching. Every text field is bilingual: { ar: "عربي", en: "English" }

   Branches, brands, models, trims and banks below are taken from the live
   inventory database (u935149902_inventory), so they match the system exactly.
   ============================================================================ */

const SITE = {

  /* ── Company ─────────────────────────────────────────────────────────── */
  company: {
    name:    { ar: "فيرست 1 كار",  en: "First 1 Car" },
    tagline: { ar: "موزع معتمد. من أكتر من ٣٠ سنة.",
               en: "An authorised distributor. For over 30 years." },
    intro:   {
      ar: "موزع معتمد لأكبر العلامات التجارية في السوق المصري من أكتر من ٣٠ سنة. تسع ماركات، خمس صالات عرض، تسليم وترخيص خلال ٤٨ ساعة، وأكتر من ١٠٠,٠٠٠ عميل وثقوا فينا.",
      en: "An authorised distributor for the biggest brands in the Egyptian market for over 30 years. Nine brands, five showrooms, delivery and licensing within 48 hours, and more than 100,000 customers who trusted us."
    },
    yearsInMarket:  30,
    customersServed: 100000,
    taxId: "895-607-506"
  },

  /* ── Contact ─────────────────────────────────────────────────────────── */
  contact: {
    /* every WhatsApp button on the site points here — confirmed line */
    whatsapp: "201117550080",

    /* sales hotlines, shown as a grid on the contact page */
    salesLines: [
      "01117550080", "01120080191", "01110440482", "01120058020",
      "01110203098", "01110203099", "01120080607", "01110066487",
      "01110070437", "01110070432", "01110067528"
    ],

    email: "admin@first1car.net",

    hours: {
      ar: "يومياً من ١٠ صباحاً حتى ١١ مساءً",
      en: "Daily, 10:00 AM – 11:00 PM"
    }
  },

  /* ── Social ──────────────────────────────────────────────────────────── */
  social: {
    facebook:  "https://www.facebook.com/share/1XQEkiGvd4/",
    instagram: "",                                     // TODO add if you have one
    tiktok:    "",                                     // TODO add if you have one
    youtube:   ""
  },

  /* ── What we give the customer ───────────────────────────────────────── */
  perks: [
    { icon: "💸", ar: "كاش باك يصل إلى ٥٪",  en: "Cash back up to 5%" },
    { icon: "📋", ar: "ترخيص هدية",           en: "Licensing on us" },
    { icon: "🛡️", ar: "تأمين مجاني",          en: "Free insurance" },
    { icon: "🔧", ar: "صيانة مجانية",         en: "Free servicing" }
  ],

  /* special programmes we run */
  programs: [
    { icon: "🏡", ar: "ربة المنزل", en: "Homemakers",
      dar: "برنامج مخصص لربات البيوت بشروط ميسّرة.",
      den: "A dedicated programme with easier requirements." },
    { icon: "🌍", ar: "الأجانب", en: "Foreign residents",
      dar: "إجراءات واضحة للمقيمين الأجانب في مصر.",
      den: "A clear process for foreign residents in Egypt." },
    { icon: "✈️", ar: "العاملون بالخارج", en: "Egyptians abroad",
      dar: "اشترِ من الخارج وسلّم لأهلك هنا.",
      den: "Buy from abroad, we deliver to your family here." }
  ],

  /* ── Branches (showrooms only — storage sites are not public) ────────── */
  branches: [
    {
      name:    { ar: "الفرع الرئيسي — الحجاز", en: "Main Branch — Hegaz" },
      address: { ar: "٦٢ شارع الحجاز، هليوبوليس، القاهرة",
                 en: "62 Hegaz St, Heliopolis, Cairo" },
      phones:  ["0226397788", "0226397555"],
      mapUrl:  "https://maps.app.goo.gl/hhjx5xhd8diZjaic9",
      lat: 30.1072696, lng: 31.3354600,
      main: true
    },
    {
      name:    { ar: "فرع مصر الجديدة", en: "Masr El Gedida" },
      address: { ar: "٤٤ شارع عبد العزيز فهمي، مصر الجديدة",
                 en: "44 Abdel Aziz Fahmy St, Masr El Gedida" },
      phones:  ["0226399874"],
      mapUrl:  "https://maps.app.goo.gl/G8UGyDD3iftuqBqz5",
      lat: 30.1091139, lng: 31.3370321
    },
    {
      name:    { ar: "فرع مدينة نصر", en: "Madinat Nasr" },
      address: { ar: "شارع عباس العقاد، بعد وندر لاند، مدينة نصر",
                 en: "Abbas El Akkad St, past Wonderland, Nasr City" },
      phones:  ["0223896441"],
      mapUrl:  "https://maps.app.goo.gl/fgtksvgnhD1swuuy5",
      lat: 30.0461563, lng: 31.3392406
    },
    {
      name:    { ar: "فرع الجيزة", en: "Giza" },
      address: { ar: "١٦٤ شارع البحر الأعظم، الجيزة",
                 en: "164 El Bahr El Aazam St, Giza" },
      phones:  ["0235712733"],
      mapUrl:  "https://maps.app.goo.gl/6PS5VYpB71HwdR5u6",
      lat: 30.0144694, lng: 31.2169664
    },
    {
      name:    { ar: "فرع العاشر من رمضان", en: "10th of Ramadan" },
      address: { ar: "الأردنية، عمارة ١، مول دلتا سنتر، قطعة ٧ MC — بجوار نادي الرواد وخلف مطعم بريجو",
                 en: "El Ordonia, Building 1, Delta Center Mall, Plot 7 MC — next to El Rowad Club, behind Bregio restaurant" },
      phones:  ["0554359936"],
      mapUrl:  "https://maps.app.goo.gl/ZH5KtXci7PqTBBBt6",
      lat: 30.2880449, lng: 31.7497728
    },
    {
      /* address and phone stay out until the branch actually opens */
      name:    { ar: "فرع جوزيف تيتو", en: "Joseph Tito" },
      address: null,
      phones:  [],
      mapUrl:  "",
      comingSoon: true
    }
  ],

  /* ── Brands, models and trims (mirrors the `models` table) ───────────── */
  /* logo: leave "" to render the styled brand plate. To use a real logo,
     drop the file at assets/img/brands/<id>.png and set logo:"assets/img/brands/<id>.png",
     or paste a direct image URL. If the image fails to load, the plate
     comes back automatically — the site never shows a broken image.        */
  brands: [
    {
      id: "chery", name: { ar: "شيري", en: "Chery" }, color: "#d51c29", logo: "",
      models: [
        { name:{ar:"تيجو 4 برو",en:"Tiggo 4 Pro"}, body:"suv",   trims:["Comfort","Luxury","Turbo"] },
        { name:{ar:"تيجو 7",en:"Tiggo 7"},         body:"suv",   trims:["Comfort","Luxury"] },
        { name:{ar:"تيجو 7 برو CKD",en:"Tiggo 7 Pro CKD"}, body:"suv", trims:["Comfort","Luxury"] },
        { name:{ar:"تيجو 7 برو ماكس",en:"Tiggo 7 Pro Max"}, body:"suv", trims:["Comfort","Luxury"] },
        { name:{ar:"تيجو 8",en:"Tiggo 8"},         body:"suv",   trims:["Luxury 5 Seats","Comfort 7 Seats","Luxury 7 Seats"] },
        { name:{ar:"تيجو 8 برو ماكس",en:"Tiggo 8 Pro Max"}, body:"suv", trims:["Luxury","Flagship"] },
        { name:{ar:"تيجو 9 هايبرد",en:"Tiggo 9 PHEV"}, body:"suv", trims:["Luxury"] },
        { name:{ar:"أريزو 5",en:"Arrizo 5"},       body:"sedan", trims:["MT","AT Basic","AT Comfort"] },
        { name:{ar:"أريزو 6",en:"Arrizo 6"},       body:"sedan", trims:["Comfort","Luxury"] },
        { name:{ar:"أريزو 8",en:"Arrizo 8"},       body:"sedan", trims:["Luxury","Flagship"] }
      ]
    },
    {
      id: "hyundai", name: { ar: "هيونداي", en: "Hyundai" }, color: "#002c5f", logo: "",
      models: [
        { name:{ar:"توسان",en:"Tucson"},           body:"suv",   trims:["Shadow","Blaze","Redline","Redline N-Pack","Night","Black Diamond","N-Line"] },
        { name:{ar:"إلنترا AD",en:"Elantra AD"},   body:"sedan", trims:["Modern SR","Top Line"] },
        { name:{ar:"i30 هاتشباك",en:"i30 Hatchback"}, body:"hatch", trims:["Blaze","Redline","N-Line"] },
        { name:{ar:"i30 فاست باك",en:"i30 Fastback"}, body:"sedan", trims:["Blaze","Redline","N-Line"] },
        { name:{ar:"i30 ستيشن",en:"i30 Station"},  body:"wagon", trims:["Blaze","Redline"] }
      ]
    },
    {
      id: "haval", name: { ar: "هافال", en: "Haval" }, color: "#c1121f", logo: "",
      models: [
        { name:{ar:"جوليون",en:"Jolion"}, body:"suv", trims:["Standard CKD","Deluxe CKD","High Deluxe CKD"] },
        { name:{ar:"H6",en:"H6"},         body:"suv", trims:["Platinum","Ultra","HEV Ultra"] },
        { name:{ar:"H7",en:"H7"},         body:"suv", trims:["Ultra","Ultra Black Edition"] }
      ]
    },
    {
      id: "changan", name: { ar: "شانجان", en: "Changan" }, color: "#0057b8", logo: "",
      models: [
        { name:{ar:"CS35 بلس",en:"CS35 Plus"}, body:"suv",   trims:["Elite","Premium","Flagship"] },
        { name:{ar:"CS55 بلس",en:"CS55 Plus"}, body:"suv",   trims:["Elite","Premium","Flagship"] },
        { name:{ar:"CS75",en:"CS75"},          body:"suv",   trims:["Elite","Flagship"] },
        { name:{ar:"UNI-T",en:"UNI-T"},        body:"suv",   trims:["Premium","Flagship"] },
        { name:{ar:"إيدو",en:"Eado"},          body:"sedan", trims:["Elite","Flagship"] },
        { name:{ar:"إيدو بلس",en:"Eado Plus"}, body:"sedan", trims:["Elite","Premium","Flagship"] },
        { name:{ar:"UNI-V",en:"UNI-V"},        body:"sedan", trims:["Flagship"] }
      ]
    },
    {
      id: "geely", name: { ar: "جيلي", en: "Geely" }, color: "#0b3d91", logo: "",
      models: [
        { name:{ar:"كوول راي",en:"Coolray"},   body:"suv",   trims:["Comfort","Premium","Sport"] },
        { name:{ar:"سيتي راي",en:"Cityray"},   body:"suv",   trims:["Comfort","Premium","Sport"] },
        { name:{ar:"إمجراند",en:"Emgrand"},    body:"sedan", trims:["Comfort","Luxury"] }
      ]
    },
    {
      id: "mitsubishi", name: { ar: "ميتسوبيشي", en: "Mitsubishi" }, color: "#e60012", logo: "",
      models: [
        { name:{ar:"ديستيناتور",en:"Destinator"},   body:"suv", trims:["ML","HL","PL"] },
        { name:{ar:"أوتلاندر",en:"Outlander"},      body:"suv", trims:["ML","HL","PL"] },
        { name:{ar:"إكليبس كروس",en:"Eclipse Cross"}, body:"suv", trims:["Inspire HI","Instyle TI","Infinity"] },
        { name:{ar:"إكسباندر",en:"Xpander"},        body:"mpv", trims:["ML","HL","PL"] }
      ]
    },
    {
      id: "gac", name: { ar: "جي إيه سي", en: "GAC" }, color: "#1a1a1a", logo: "",
      models: [
        { name:{ar:"GS3 إمزوم",en:"GS3 Emzoom"}, body:"suv",   trims:["Comfort","Elegance","Premium","R-Style"] },
        { name:{ar:"GS4",en:"GS4"},              body:"suv",   trims:["Premium"] },
        { name:{ar:"إمباو",en:"Empow"},          body:"sedan", trims:["Baseline","Premium","Sportline"] }
      ]
    },
    {
      id: "jmc", name: { ar: "جيه إم سي", en: "JMC" }, color: "#0f5298", logo: "",
      models: [
        { name:{ar:"بيك أب",en:"Pickup"}, body:"pickup", trims:["Standard"] }
      ]
    },
    {
      id: "foton", name: { ar: "فوتون", en: "Foton" }, color: "#00539f", logo: "",
      models: [
        { name:{ar:"ميكروباص",en:"Microbus"},        body:"van",    trims:["Standard"] },
        { name:{ar:"وندر نص طن",en:"Wonder 1/2 Ton"}, body:"pickup", trims:["Standard"] }
      ]
    }
  ],

  /* ── Finance partners (mirrors installment_bank_list) ────────────────── */
  banks: [
    { key: "abk", ar: "الأهلي الكويتي", en: "Al Ahli Kuwaiti (ABK)",        logo: "" },
    { key: "nbk", ar: "الوطني الكويتي", en: "Kuwaiti National (NBK)",       logo: "" },
    { key: "enbd", ar: "الإمارات دبي الوطني", en: "Emirates NBD",                 logo: "" },
    { key: "egbank", ar: "إيجي بنك", en: "EG Bank",                      logo: "" },
    { key: "misr", ar: "بنك مصر", en: "Banque Misr",                  logo: "" },
    { key: "cairo", ar: "بنك القاهرة", en: "Banque du Caire",              logo: "" },
    { key: "saib", ar: "بنك سايب", en: "SAIB Bank",                    logo: "" },
    { key: "ebe", ar: "المصري لتنمية الصادرات", en: "Export Development Bank (EBE)", logo: "" },
    { key: "agri", ar: "البنك الزراعي المصري", en: "Agricultural Bank of Egypt",   logo: "" },
    { key: "next", ar: "بنك نكست", en: "Next Bank",                    logo: "" },
    { key: "agricole", ar: "كريدي أجريكول", en: "Crédit Agricole",              logo: "" },
    { key: "drive", ar: "شركة درايف", en: "Drive Finance",                logo: "" },
    { key: "contact", ar: "كونتكت", en: "Contact",                      logo: "" },
    { key: "sky", ar: "سكاي", en: "Sky",                          logo: "" }
  ],

  /* ── Photography ─────────────────────────────────────────────────────
     Each slot takes either a local file (assets/img/cars/exterior.jpg) or a
     full https:// URL. Leave "" and the page keeps its designed placeholder.
     A photo that fails to load falls back to the placeholder on its own.    */
  photos: {
    exterior:     "",   // home · "من بره"
    interior:     "",   // home · "من جوه"
    showroom:     "",   // home · "السعر الرسمي"
    showroomWide: "",   // about · our story
    team:         "",   // about · authorised distributor
    ops:          ""    // about · how we work
  },

  /* ── Body-type labels used by the cars page filter ───────────────────── */
  bodyTypes: {
    suv:    { ar: "SUV",       en: "SUV" },
    sedan:  { ar: "سيدان",     en: "Sedan" },
    hatch:  { ar: "هاتشباك",   en: "Hatchback" },
    wagon:  { ar: "ستيشن",     en: "Estate" },
    mpv:    { ar: "٧ راكب",    en: "7-Seater" },
    pickup: { ar: "بيك أب",    en: "Pickup" },
    van:    { ar: "ميكروباص",  en: "Van" }
  }
};

/* ── Logo files ───────────────────────────────────────────────────────────
   The site ships with typographic brand plates, which need no image files.

   When you have the real logos, drop them in as PNG or SVG with transparent
   backgrounds, named by the id/key shown above:

       assets/img/brands/chery.png   assets/img/brands/hyundai.png   …
       assets/img/banks/misr.png     assets/img/banks/cairo.png      …

   then flip this to true. Any logo still missing simply keeps its plate —
   nothing on the page ever breaks.                                          */
const USE_LOGO_FILES = false;

if (USE_LOGO_FILES) {
  SITE.brands.forEach(function (b) { if (!b.logo) b.logo = 'assets/img/brands/' + b.id + '.png'; });
  SITE.banks.forEach(function (b)  { if (!b.logo) b.logo = 'assets/img/banks/'  + b.key + '.png'; });
}

/* Derived counts, so the copy never drifts from the data above. */
SITE.stats = {
  brands:   SITE.brands.length,
  models:   SITE.brands.reduce((n, b) => n + b.models.length, 0),
  trims:    SITE.brands.reduce((n, b) => n + b.models.reduce((m, x) => m + x.trims.length, 0), 0),
  branches: SITE.branches.filter(b => !b.comingSoon).length,
  banks:    SITE.banks.length
};
