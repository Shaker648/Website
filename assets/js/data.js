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
    tagline: { ar: "موزّع معتمد منذ عام ١٩٩٠",
               en: "An authorised distributor since 1990" },
    intro:   {
      ar: "موزّع معتمد لكبرى العلامات التجارية في السوق المصري منذ عام ١٩٩٠. تسع علامات تجارية، وخمس صالات عرض، وتسليم وترخيص خلال ٤٨ ساعة، وأكثر من ١٠٠٫٠٠٠ عميل منحونا ثقتهم.",
      en: "An authorised distributor for the leading brands in the Egyptian market since 1990. Nine brands, five showrooms, delivery and licensing within 48 hours, and more than 100,000 customers who placed their trust in us."
    },
    founded:        1990,
    yearsInMarket:  36,
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
      ar: "يومياً من العاشرة صباحاً حتى الحادية عشرة مساءً",
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
    { icon: "💸", ar: "استرداد نقدي يصل إلى ٥٪", en: "Cash back up to 5%" },
    { icon: "📋", ar: "الترخيص هديّة منّا",     en: "Licensing on us" },
    { icon: "🛡️", ar: "تأمين مجاني",          en: "Free insurance" },
    { icon: "🔧", ar: "صيانة مجانية",         en: "Free servicing" }
  ],

  /* special programmes we run */
  programs: [
    { icon: "🏡", ar: "ربّات البيوت", en: "Homemakers",
      dar: "برنامج مخصّص لربّات البيوت بشروط ميسّرة ومستندات مبسّطة.",
      den: "A dedicated programme with easier terms and simplified paperwork." },
    { icon: "🌍", ar: "المقيمون الأجانب", en: "Foreign residents",
      dar: "إجراءات واضحة ومحدّدة للمقيمين الأجانب داخل مصر.",
      den: "A clear, defined process for foreign residents in Egypt." },
    { icon: "✈️", ar: "المصريون بالخارج", en: "Egyptians abroad",
      dar: "اشترِ سيارتك وأنت بالخارج، ونتولّى تسليمها لأسرتك هنا.",
      den: "Buy from abroad and we hand the car to your family here." }
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
        { name:{ar:"تيجو 4 برو",en:"Tiggo 4 Pro"}, body:"suv",   trims:["Comfort","Luxury","Turbo"], photo:"assets/img/cars/tiggo-4-pro.jpg"  },
        { name:{ar:"تيجو 7",en:"Tiggo 7"},         body:"suv",   trims:["Comfort","Luxury"], photo:"assets/img/cars/tiggo-7.jpg"  },
        { name:{ar:"تيجو 7 برو CKD",en:"Tiggo 7 Pro CKD"}, body:"suv", trims:["Comfort","Luxury"] },
        { name:{ar:"تيجو 7 برو ماكس",en:"Tiggo 7 Pro Max"}, body:"suv", trims:["Comfort","Luxury"], photo:"assets/img/cars/tiggo-7-pro.jpg"  },
        { name:{ar:"تيجو 8",en:"Tiggo 8"},         body:"suv",   trims:["Luxury 5 Seats","Comfort 7 Seats","Luxury 7 Seats"], photo:"assets/img/cars/tiggo-8.jpg"  },
        { name:{ar:"تيجو 8 برو ماكس",en:"Tiggo 8 Pro Max"}, body:"suv", trims:["Luxury","Flagship"], photo:"assets/img/cars/tiggo-8-pro-max.jpg"  },
        { name:{ar:"تيجو 9 هايبرد",en:"Tiggo 9 PHEV"}, body:"suv", trims:["Luxury"], photo:"assets/img/cars/tiggo-9.jpg"  },
        { name:{ar:"أريزو 5",en:"Arrizo 5"},       body:"sedan", trims:["MT","AT Basic","AT Comfort"], photo:"assets/img/cars/arrizo-5.jpg"  },
        { name:{ar:"أريزو 6",en:"Arrizo 6"},       body:"sedan", trims:["Comfort","Luxury"], photo:"assets/img/cars/arrizo-6.jpg"  },
        { name:{ar:"أريزو 8",en:"Arrizo 8"},       body:"sedan", trims:["Luxury","Flagship"], photo:"assets/img/cars/arrizo-8.jpg"  }
      ]
    },
    {
      id: "hyundai", name: { ar: "هيونداي", en: "Hyundai" }, color: "#002c5f", logo: "",
      models: [
        { name:{ar:"توسان",en:"Tucson"},           body:"suv",   trims:["Shadow","Blaze","Redline","Redline N-Pack","Night","Black Diamond","N-Line"], photo:"assets/img/cars/tucson.jpg"  },
        { name:{ar:"إلنترا AD",en:"Elantra AD"},   body:"sedan", trims:["Modern SR","Top Line"], photo:"assets/img/cars/elantra-ad.jpg"  },
        { name:{ar:"i30 هاتشباك",en:"i30 Hatchback"}, body:"hatch", trims:["Blaze","Redline","N-Line"], photo:"assets/img/cars/i30.jpg"  },
        { name:{ar:"i30 فاست باك",en:"i30 Fastback"}, body:"sedan", trims:["Blaze","Redline","N-Line"], photo:"assets/img/cars/i30-fastback.jpg"  },
        { name:{ar:"i30 ستيشن",en:"i30 Station"},  body:"wagon", trims:["Blaze","Redline"], photo:"assets/img/cars/i30-station.jpg"  }
      ]
    },
    {
      id: "haval", name: { ar: "هافال", en: "Haval" }, color: "#c1121f", logo: "",
      models: [
        { name:{ar:"جوليون",en:"Jolion"}, body:"suv", trims:["Standard CKD","Deluxe CKD","High Deluxe CKD"], photo:"assets/img/cars/jolion.jpg"  },
        { name:{ar:"H6",en:"H6"},         body:"suv", trims:["Platinum","Ultra","HEV Ultra"], photo:"assets/img/cars/h6.jpg"  },
        { name:{ar:"H7",en:"H7"},         body:"suv", trims:["Ultra","Ultra Black Edition"], photo:"assets/img/cars/h7.jpg"  }
      ]
    },
    {
      id: "changan", name: { ar: "شانجان", en: "Changan" }, color: "#0057b8", logo: "",
      models: [
        { name:{ar:"CS35 بلس",en:"CS35 Plus"}, body:"suv",   trims:["Elite","Premium","Flagship"], photo:"assets/img/cars/cs35-plus.jpg"  },
        { name:{ar:"CS55 بلس",en:"CS55 Plus"}, body:"suv",   trims:["Elite","Premium","Flagship"], photo:"assets/img/cars/cs55-plus.jpg"  },
        { name:{ar:"CS75",en:"CS75"},          body:"suv",   trims:["Elite","Flagship"], photo:"assets/img/cars/cs75.jpg"  },
        { name:{ar:"UNI-T",en:"UNI-T"},        body:"suv",   trims:["Premium","Flagship"], photo:"assets/img/cars/uni-t.jpg"  },
        { name:{ar:"إيدو",en:"Eado"},          body:"sedan", trims:["Elite","Flagship"], photo:"assets/img/cars/eado.jpg"  },
        { name:{ar:"إيدو بلس",en:"Eado Plus"}, body:"sedan", trims:["Elite","Premium","Flagship"], photo:"assets/img/cars/eado-plus.jpg"  },
        { name:{ar:"UNI-V",en:"UNI-V"},        body:"sedan", trims:["Flagship"], photo:"assets/img/cars/uni-v.jpg"  }
      ]
    },
    {
      id: "geely", name: { ar: "جيلي", en: "Geely" }, color: "#0b3d91", logo: "",
      models: [
        { name:{ar:"كوول راي",en:"Coolray"},   body:"suv",   trims:["Comfort","Premium","Sport"] },
        { name:{ar:"سيتي راي",en:"Cityray"},   body:"suv",   trims:["Comfort","Premium","Sport"], photo:"assets/img/cars/cityray.jpg"  },
        { name:{ar:"إمجراند",en:"Emgrand"},    body:"sedan", trims:["Comfort","Luxury"], photo:"assets/img/cars/emgrand.jpg"  }
      ]
    },
    {
      id: "mitsubishi", name: { ar: "ميتسوبيشي", en: "Mitsubishi" }, color: "#e60012", logo: "",
      models: [
        { name:{ar:"ديستيناتور",en:"Destinator"},   body:"suv", trims:["ML","HL","PL"], photo:"assets/img/cars/destinator.jpg"  },
        { name:{ar:"أوتلاندر",en:"Outlander"},      body:"suv", trims:["ML","HL","PL"], photo:"assets/img/cars/outlander.jpg"  },
        { name:{ar:"إكليبس كروس",en:"Eclipse Cross"}, body:"suv", trims:["Inspire HI","Instyle TI","Infinity"], photo:"assets/img/cars/eclipse-cross.jpg"  },
        { name:{ar:"إكسباندر",en:"Xpander"},        body:"mpv", trims:["ML","HL","PL"], photo:"assets/img/cars/xpander.jpg"  }
      ]
    },
    {
      id: "gac", name: { ar: "جي إيه سي", en: "GAC" }, color: "#1a1a1a", logo: "",
      models: [
        { name:{ar:"GS3 إمزوم",en:"GS3 Emzoom"}, body:"suv",   trims:["Comfort","Elegance","Premium","R-Style"], photo:"assets/img/cars/gs3-emzoom.jpg"  },
        { name:{ar:"GS4",en:"GS4"},              body:"suv",   trims:["Premium"], photo:"assets/img/cars/gs4.jpg"  },
        { name:{ar:"إمباو",en:"Empow"},          body:"sedan", trims:["Baseline","Premium","Sportline"], photo:"assets/img/cars/empow.jpg"  }
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
        { name:{ar:"وندر نص طن",en:"Wonder 1/2 Ton"}, body:"pickup", trims:["Standard"], photo:"assets/img/cars/foton-wonder.jpg"  }
      ]
    }
  ],

  /* ── Finance partners (mirrors installment_bank_list) ────────────────── */
  banks: [
    { key: "abk", ar: "الأهلي الكويتي", en: "Al Ahli Kuwaiti (ABK)",        logo: "assets/img/banks/abk.png" },
    { key: "nbk", ar: "الوطني الكويتي", en: "Kuwaiti National (NBK)",       logo: "assets/img/banks/nbk.png" },
    { key: "enbd", ar: "الإمارات دبي الوطني", en: "Emirates NBD",                 logo: "assets/img/banks/enbd.png" },
    { key: "egbank", ar: "إيجي بنك", en: "EG Bank",                      logo: "assets/img/banks/egbank.png" },
    { key: "misr", ar: "بنك مصر", en: "Banque Misr",                  logo: "assets/img/banks/misr.png" },
    { key: "cairo", ar: "بنك القاهرة", en: "Banque du Caire",              logo: "assets/img/banks/cairo.png" },
    { key: "saib", ar: "بنك سايب", en: "SAIB Bank",                    logo: "assets/img/banks/saib.png" },
    { key: "ebe", ar: "المصري لتنمية الصادرات", en: "Export Development Bank (EBE)", logo: "assets/img/banks/ebe.png" },
    { key: "agri", ar: "البنك الزراعي المصري", en: "Agricultural Bank of Egypt",   logo: "assets/img/banks/agri.png" },
    { key: "next", ar: "بنك نكست", en: "Next Bank",                    logo: "assets/img/banks/next.png" },
    { key: "agricole", ar: "كريدي أجريكول", en: "Crédit Agricole",              logo: "assets/img/banks/agricole.png" },
    { key: "drive", ar: "شركة درايف", en: "Drive Finance",                logo: "assets/img/banks/drive.png" },
    { key: "contact", ar: "كونتكت", en: "Contact",                      logo: "assets/img/banks/contact.png" },
    { key: "sky", ar: "سكاي", en: "Sky",                          logo: "assets/img/banks/sky.png" }
  ],

  /* ── Photography ─────────────────────────────────────────────────────
     Each slot takes either a local file (assets/img/cars/exterior.jpg) or a
     full https:// URL. Leave "" and the page keeps its designed placeholder.
     A photo that fails to load falls back to the placeholder on its own.    */
  photos: {
    /* The hero image on the home page. Leave "" and the drawn car returns. */
    hero:         "assets/img/brand-lineup.jpg",
    exterior:     "assets/img/showroom-night.jpg",  // home · exterior
    interior:     "",   // home · "من جوه"
    showroom:     "",   // home · "السعر الرسمي"
    showroomWide: "assets/img/showroom-gac.jpg",  // about · our story
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

   The banks already carry their real logos above. The nine car brands still
   render a typographic plate. When you have the manufacturer marks, drop
   them in with transparent backgrounds named by brand id:

       assets/img/brands/chery.png   assets/img/brands/hyundai.png
       assets/img/brands/haval.png   assets/img/brands/changan.png   …

   then flip this to true. Any mark still missing simply keeps its plate —
   nothing on the page ever breaks.                                          */
const USE_BRAND_LOGO_FILES = true;

if (USE_BRAND_LOGO_FILES) {
  SITE.brands.forEach(function (b) { if (!b.logo) b.logo = 'assets/img/brands/' + b.id + '.png'; });
}

/* Derived counts, so the copy never drifts from the data above. */
SITE.stats = {
  brands:   SITE.brands.length,
  models:   SITE.brands.reduce((n, b) => n + b.models.length, 0),
  trims:    SITE.brands.reduce((n, b) => n + b.models.reduce((m, x) => m + x.trims.length, 0), 0),
  branches: SITE.branches.filter(b => !b.comingSoon).length,
  banks:    SITE.banks.length
};
