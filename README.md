# First 1 Car — الموقع الرسمي / Public Website

موقع تعريفي للعملاء لمعرض **فيرست 1 كار**. عربي أولاً مع زر تبديل للإنجليزية،
ويعرض **السعر الرسمي فقط**.

A customer-facing website for the First 1 Car showroom. Arabic-first with an
English toggle, and it publishes **the official price only**.

---

## 1 · اللي محتاج تملاه قبل النشر / Fill this in before launch

كل البيانات في ملف واحد: **`assets/js/data.js`**
Everything lives in one file: **`assets/js/data.js`**

افتحه ودوّر على كلمة `TODO` — دي كل الحاجات اللي لسه محتاجة بياناتك الحقيقية:
Open it and search for `TODO`. Those are the placeholders:

| اللي محتاج يتغيّر | Where | حالياً |
|---|---|---|
| أرقام التليفون والواتساب | `contact.phonePrimary` · `phoneSales` · `whatsapp` | أرقام وهمية |
| البريد الإلكتروني | `contact.email` | `info@first1car.net` |
| مواعيد العمل | `contact.hours` | ١٠ص – ١٠م، الجمعة إجازة |
| لينكات السوشيال | `social.facebook` · `instagram` · `tiktok` | فاضية |
| أسماء وعناوين الفروع | `branches[]` | "الفرع الرئيسي" / "الفرع الثاني" |
| سنة التأسيس | `company.founded` | 2016 |
| قائمة البنوك | `banks[]` | ٦ بنوك مقترحة |

> ⚠ رقم الواتساب لازم يكون **أرقام بس** بصيغة دولية بدون `+` وبدون مسافات —
> مثال: `201001234567`.
> The WhatsApp number must be **digits only**, international format, no `+`.

### الأسعار / Prices

كل موديل فيه حقل `price`:

```js
{ name: { ar: "تيجو 7", en: "Tiggo 7" }, body: "suv", price: 1250000 }
```

- حط الرقم بالجنيه من غير فواصل → هيظهر `1,250,000 جنيه`
- سيبه `null` → هيظهر **"اتصل للسعر"**

دلوقتي كل الموديلات `null` لحد ما تبعت لنا الأسعار الرسمية.
All models are currently `null` until you send the official price list.

### الصور / Photos

الموقع شغال دلوقتي من غير أي صور — فيه أماكن جاهزة بتصميم حلو مكان الصور.
The site works with zero photos today; styled placeholders sit where images go.

عشان تحط صورك، حطها بالأسماء دي بالظبط:

```
assets/img/cars/exterior.jpg        صورة عربية من بره
assets/img/interior/cabin.jpg       صورة من جوه
assets/img/cars/showroom.jpg        صورة المعرض
assets/img/cars/showroom-wide.jpg   صورة المعرض (صفحة من نحن)
assets/img/cars/team.jpg            صورة الفريق
```

وبعدين في الـ HTML بدّل البلوك ده:

```html
<div class="ph">…</div>
```

بـ:

```html
<img src="assets/img/cars/exterior.jpg" alt="">
```

المقاس المفضل: **1600×1200** أو أكبر، JPG، أقل من 400KB لكل صورة.

---

## 2 · النشر على الاستضافة / Deploying

الموقع **HTML/CSS/JS عادي** — مفيش build ولا Node ولا أي تنصيب.
Plain static HTML/CSS/JS — no build step, no dependencies.

### على Hostinger (نفس استضافة النظام)

النظام الداخلي شغال دلوقتي في `public_html`. عشان متكسّرش حاجة، الأفضل:

**الخيار المقترح** — الموقع في الجذر، والنظام في مجلد فرعي:

```
public_html/
├── index.html          ← الموقع (الصفحة الرئيسية)
├── cars.html
├── … باقي الصفحات
├── assets/
└── system/             ← انقل كل ملفات النظام هنا
    ├── dashboard.php
    ├── config.php
    └── …
```

بعد النقل، الموظفين يدخلوا على `first1car.net/system/`.

> ⚠ لو نقلت النظام لمجلد `system/`، انقل معاه ملف `.htaccess` بتاعه —
> هو اللي بيمنع تحميل `config.php` و `auth.php` من المتصفح.

**الخيار الأبسط** لو مش عايز تنقل النظام: ارفع الموقع في
`public_html/site/` وخلي الدومين يوجّه عليه.

### أي استضافة تانية

ارفع كل الملفات زي ما هي. الموقع بيشتغل على أي سيرفر ثابت
(Netlify, Vercel, GitHub Pages, Cloudflare Pages) من غير أي تعديل.

---

## 3 · هيكل الموقع / Site structure

| الصفحة | الملف | بتعمل إيه |
|---|---|---|
| الرئيسية | `index.html` | الهيرو المتحرك، الماركات، ليه إحنا، أقسام السكرول |
| سياراتنا | `cars.html` | كل الماركات والموديلات + **السعر الرسمي بس** |
| التقسيط | `finance.html` | خطوات موافقات البنوك، البنوك، الأوراق المطلوبة |
| من نحن | `about.html` | الحكاية، القيم، الأرقام |
| فروعنا | `branches.html` | العناوين والتليفونات ولينكات الخرائط |
| اتصل بنا | `contact.html` | فورم بيفتح واتساب + كل بيانات التواصل |

### الملفات

```
assets/
├── css/
│   ├── base.css          الألوان والخطوط والأساسيات
│   ├── components.css    الهيدر والفوتر وزرار الواتساب
│   └── pages.css         أقسام الصفحات
├── js/
│   ├── data.js           ★ كل المحتوى — عدّل هنا
│   ├── site.js           الهيدر/الفوتر، تبديل اللغة، الأنيميشن
│   ├── cars.js           عرض الموديلات والأسعار
│   └── bg.js             الخلفية المتحركة (الطريق والنجوم)
└── img/
    ├── logo.png          اللوجو (اتقص وبقى شفاف)
    └── car-hero.svg      رسمة العربية في الهيرو
```

---

## 4 · اللغة / Language

- **العربي هو الافتراضي.** أول ما حد يفتح الموقع بيلاقيه عربي RTL.
- زرار `EN` فوق بيبدّل، والاختيار بيتحفظ في المتصفح ويفضل معاه في كل الصفحات.
- أي نص في الـ HTML فيه `data-en="…"` — العربي هو الأصل، والإنجليزي في الـ attribute.

عشان تضيف نص جديد بلغتين:

```html
<h2 data-en="English version here">النص العربي هنا</h2>
```

---

## 5 · ملاحظة أمان مهمة / Security note

الموقع ده **منفصل تماماً** عن النظام الداخلي — مفيش أي اتصال بقاعدة البيانات،
ومفيش أي أسعار تاجر أو بيانات عملاء أو أرقام مبيعات فيه. اللي معروض هو
السعر الرسمي بس، من ملف `data.js` اليدوي.

This site is **fully separate** from the internal system: no database
connection, no trade prices, no customer data, no sales figures. Only the
official price, from the hand-edited `data.js`.

---

## 6 · الخطوة الجاية (اختياري) / Later, if you want it

دلوقتي الأسعار بتتكتب بالإيد في `data.js`. لو حبيت الموقع يسحب السعر الرسمي
**أوتوماتيك** من جدول `pricing` بتاع النظام، ده ممكن بملف PHP صغير واحد
بيقرا عمود `official_price` بس — ومحدش يقدر يوصل لأي عمود تاني.

Prices are hand-edited today. If you later want the site to pull the official
price **automatically** from the system's `pricing` table, that takes one small
PHP endpoint reading `official_price` only — no other column exposed.
