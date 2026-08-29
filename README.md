# First 1 Car — الموقع الرسمي / Public Website

موقع تعريفي للعملاء لمعرض **فيرست 1 كار**. عربي أولاً مع زر تبديل للإنجليزية.
A customer-facing website for the First 1 Car showroom. Arabic-first, with an English toggle.

كل البيانات في ملف واحد: **`assets/js/data.js`**
Everything lives in one file: **`assets/js/data.js`**

---

## 1 · اللي لسه ناقص / What still needs your input

معظم البيانات دلوقتي حقيقية ومسحوبة من قاعدة بيانات النظام. الناقص بس:
Most of the data is now real, taken from the system database. Only these remain:

| الحاجة | مكانها في `data.js` | الوضع |
|---|---|---|
| إنستجرام وتيك توك | `social.instagram` · `social.tiktok` | فارغان (فيسبوك مُدرَج) |
| عنوان فرع جوزيف تيتو | `branches[]` | مقفول لحد الافتتاح |
| **لوجوهات الماركات والبنوك** | `USE_LOGO_FILES` | شوف القسم ٣ تحت |
| **صور العربيات والمعرض** | ملفات صور | شوف القسم ٤ تحت |

كل الباقي حقيقي ومؤكَّد: واتساب `01117550080`، وبريد `admin@first1car.net`،
و٦ فروع، و١١ خط مبيعات، و٩ علامات، و٣٨ طرازاً، و٩٤ فئة، و١٤ جهة تمويل،
والسجل الضريبي، والمواعيد، وسنة التأسيس ١٩٩٠.

---

## 2 · الأسعار / Prices

كل الموديلات دلوقتي بتعرض **"اتصل للسعر"**، وده مقصود — الصفحة بتشرح للعميل
إن الأسعار بتتحرك مع السوق وإننا بنقولها لحظياً.

لو حبيت تعرض سعر رقم على أي موديل، حط الرقم في حقل `price`:

```js
{ name:{ar:"تيجو 7",en:"Tiggo 7"}, body:"suv", trims:["Comfort","Luxury"], price: 1250000 }
```

- رقم بالجنيه من غير فواصل → هيظهر `1,250,000 جنيه`
- من غير حقل `price` أو `price: null` → هيظهر **"اتصل للسعر"**

> ملاحظة: الموقع ده بيعرض **السعر الرسمي بس**. أسعار العميل وأسعار التاجر
> اللي في النظام الداخلي مش موجودة في الموقع خالص، ومفيش أي اتصال بقاعدة البيانات.

---

## 3 · اللوجوهات / Logos

الموقع دلوقتي بيرسم **بلاطة باسم الماركة بلون الماركة** بدل اللوجو، وشكلها نضيف
ومحتاجة صفر ملفات.

لما تجيب اللوجوهات الرسمية (من الوكلاء أو من البنوك):

**١.** حطهم PNG أو SVG بخلفية شفافة بالأسماء دي بالظبط:

```
assets/img/brands/chery.png       assets/img/banks/abk.png
assets/img/brands/hyundai.png     assets/img/banks/nbk.png
assets/img/brands/haval.png       assets/img/banks/enbd.png
assets/img/brands/changan.png     assets/img/banks/egbank.png
assets/img/brands/geely.png       assets/img/banks/misr.png
assets/img/brands/mitsubishi.png  assets/img/banks/cairo.png
assets/img/brands/gac.png         assets/img/banks/saib.png
assets/img/brands/jmc.png         assets/img/banks/ebe.png
assets/img/brands/foton.png       assets/img/banks/agri.png
                                  assets/img/banks/next.png
                                  assets/img/banks/agricole.png
                                  assets/img/banks/drive.png
                                  assets/img/banks/contact.png
                                  assets/img/banks/sky.png
```

**٢.** في `assets/js/data.js` غيّر سطر واحد:

```js
const USE_LOGO_FILES = true;
```

خلاص. أي لوجو مش موجود هيفضل بالبلاطة بتاعته — **الموقع عمره ما هيعرض صورة مكسورة.**
Any missing logo simply keeps its plate; the site never shows a broken image.

المقاس المفضل: ارتفاع ~120px، خلفية شفافة.

> لو عايز تستخدم لينك من النت بدل ملف، حط اللينك في حقل `logo` بتاع الماركة:
> `logo: "https://example.com/chery.png"` — ونفس نظام الحماية شغال.

---

## 4 · الصور / Photos

### كروت الطُرز

كل كارت موديل بيرسم **سيارة بشكل نوعها** (SUV، سيدان، هاتشباك، ستيشن، ٧ راكب،
بيك أب، ميكروباص) بلون الماركة. مفيش صور مطلوبة عشان الصفحة تبقى شكلها كامل.

**١٥ طرازاً لديها صور حقيقية بالفعل** (تيجو ٤ برو، تيجو ٧ برو، تيجو ٩، أريزو ٥، أريزو ٦،
i30، جوليون، CS55 بلس، UNI-T، UNI-V، إيدو، إمجراند، ديستيناتور، إكسباندر، وندر).
الباقي يعرض رسمة حسب نوع السيارة لحين توفّر صورته.

لإضافة صورة لأي طراز، أضف حقل `photo` بجانبه في `data.js`:

```js
{ name:{ar:"تيجو 7",en:"Tiggo 7"}, body:"suv", trims:["Comfort","Luxury"],
  photo:"assets/img/cars/tiggo7.jpg" }
```

الصورة هتغطي الرسمة. ولو اللينك بايظ، الرسمة بترجع لوحدها.

### صور الصفحات

ست أماكن للصور في الرئيسية وصفحة من نحن، كلها بتتظبط من مكان واحد
في `data.js`:

```js
photos: {
  exterior:     "assets/img/cars/exterior.jpg",   // الرئيسية · من بره
  interior:     "assets/img/interior/cabin.jpg",  // الرئيسية · من جوه
  showroom:     "assets/img/cars/showroom.jpg",   // الرئيسية · السعر
  showroomWide: "assets/img/cars/wide.jpg",       // من نحن · الحكاية
  team:         "assets/img/cars/team.jpg",       // من نحن · موزع معتمد
  ops:          "assets/img/cars/ops.jpg"         // من نحن · إزاي بنشتغل
}
```

كل خانة بتقبل **ملف محلي** أو **لينك https:// كامل**. سيبها `""` وهيفضل
التصميم البديل. لو الصورة مش موجودة أو اللينك بايظ، بترجع للتصميم البديل
لوحدها — **الموقع عمره ما هيعرض صورة مكسورة**.

المقاس المفضل: **1600×1200** أو أكبر، JPG، أقل من 400KB للصورة.

> ⚠ لو هتستخدم لينكات من النت: خد بالك إن أي موقع ممكن يشيل الصورة أو يمنع
> الاستخدام من موقع تاني (hotlink protection)، ووقتها الصورة هتختفي. الأضمن
> إنك تنزّل الصور وترفعها مع الموقع في `assets/img/`.


---

## 5 · النشر / Deploying

الموقع **HTML/CSS/JS عادي** — مفيش build ولا Node ولا تنصيب.
Plain static HTML/CSS/JS — no build step, no dependencies.

### على Hostinger (نفس استضافة النظام)

النظام الداخلي شغال دلوقتي في `public_html`. عشان متكسّرش حاجة:

```
public_html/
├── index.html          ← الموقع
├── cars.html
├── … باقي الصفحات
├── assets/
└── system/             ← انقل ملفات النظام هنا
    ├── dashboard.php
    ├── config.php
    ├── .htaccess       ← مهم: انقله معاهم
    └── …
```

بعد النقل الموظفين يدخلوا على `first1car.net/system/`.

> ⚠ لازم `.htaccess` بتاع النظام ينتقل معاه — هو اللي بيمنع تحميل
> `config.php` و `auth.php` من المتصفح.

أي استضافة تانية: ارفع الملفات زي ما هي. بيشتغل على Netlify / Vercel /
GitHub Pages / Cloudflare Pages من غير أي تعديل.

---

## 6 · الصفحات / Pages

| الصفحة | الملف | المحتوى |
|---|---|---|
| الرئيسية | `index.html` | هيرو متحرك، شريط الماركات، ٣٠ سنة/١٠٠ ألف عميل/٤٨ ساعة، المزايا، البرامج الخاصة |
| سياراتنا | `cars.html` | ٩ ماركات · ٣٨ موديل · ٩٤ فئة، بفلتر ماركة وفلتر نوع |
| التقسيط | `finance.html` | خطوات موافقات البنوك، ١٤ جهة تمويل، الأوراق المطلوبة |
| من نحن | `about.html` | ٣٠ سنة في السوق، معنى "موزع معتمد"، القيم، حائط الماركات |
| فروعنا | `branches.html` | ٥ فروع مفتوحة + جوزيف تيتو "قريباً" |
| اتصل بنا | `contact.html` | فورم بيفتح واتساب، ١١ خط مبيعات، الفروع، السجل الضريبي |

### الملفات

```
assets/
├── css/
│   ├── base.css          الألوان والخطوط والأساسيات
│   ├── components.css    الهيدر والفوتر وزرار الواتساب
│   └── pages.css         أقسام الصفحات
├── js/
│   ├── data.js           ★ كل المحتوى — عدّل هنا وبس
│   ├── site.js           الهيدر/الفوتر، اللغة، بلاطات الماركات، الأنيميشن
│   ├── cars.js           عرض الموديلات والفلاتر
│   ├── silhouettes.js    رسمات السيارات حسب النوع
│   └── bg.js             الخلفية المتحركة (الطريق والنجوم)
└── img/
    ├── logo.png          اللوجو (اتقص وبقى شفاف)
    ├── car-hero.svg      رسمة العربية في الهيرو
    ├── brands/           لوجوهات الماركات (فاضي دلوقتي)
    └── banks/            لوجوهات البنوك (فاضي دلوقتي)
```

---

## 7 · اللغة / Language

- **العربي هو الافتراضي.** أول ما حد يفتح الموقع بيلاقيه عربي RTL.
- زرار `EN` بيبدّل، والاختيار بيتحفظ في المتصفح ويفضل في كل الصفحات.
- أي نص فيه `data-en="…"` — العربي هو الأصل، والإنجليزي في الـ attribute:

```html
<h2 data-en="English version here">النص العربي هنا</h2>
```

> لو الإنجليزي فيه علامة تنصيص `"` لازم تتكتب `&quot;` — غير كده الجملة هتتقطع.

---

## 8 · ملاحظة أمان / Security note

الموقع **منفصل تماماً** عن النظام الداخلي: مفيش اتصال بقاعدة البيانات، ولا
أسعار تاجر، ولا بيانات عملاء، ولا أرقام مبيعات. اللي معروض هو السعر الرسمي بس،
من ملف `data.js` اليدوي.

This site is **fully separate** from the internal system: no database
connection, no trade prices, no customer data, no sales figures.
