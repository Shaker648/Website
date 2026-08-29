# رفع الموقع على Hostinger / Deploying to Hostinger

## أسرع طريقة تعرف المشكلة فين

ارفع ملف **`check.html`** على السيرفر وافتحه في المتصفح:

```
https://first1car.net/check.html
```

هيقول لك بالظبط إيه اللي ناقص وإزاي تصلّحه. امسحه بعد ما تخلص.

---

## أشهر سببين إن الموقع مش شغال

### ١. ملف ZIP بتاع GitHub بيفك في **مجلد جواه**

ده أكتر سبب متكرر. لما تضغط **Code → Download ZIP** على GitHub، الملف اللي
بينزل مش فيه الملفات على طول — فيه **مجلد** اسمه:

```
Website-claude-company-system-uk-website-xabib6/
```

وجواه الملفات. فلما تفكه في `public_html` بيبقى الشكل كده:

```
public_html/
└── Website-claude-company-system-uk-website-xabib6/    ← غلط
    ├── index.html
    ├── cars.html
    └── assets/
```

والموقع مش هيظهر على `first1car.net` — هيظهر على
`first1car.net/Website-claude-company-system-uk-website-xabib6/`.

**الحل** في File Manager بتاع Hostinger:

1. ادخل جوه المجلد ده
2. اضغط **Select All** (اختار كل الملفات والمجلدات اللي جواه)
3. **Move** → واكتب المسار `/public_html`
4. ارجع لـ `public_html` وامسح المجلد الفاضي

المفروض الشكل يبقى كده بالظبط:

```
public_html/
├── index.html          ← لازم يكون هنا مباشرة
├── cars.html
├── finance.html
├── about.html
├── branches.html
├── contact.html
├── .htaccess
├── robots.txt
├── sitemap.xml
└── assets/
    ├── css/
    ├── js/
    └── img/
```

---

### ٢. السيرفر بيفضّل `index.php` على `index.html`

لو نظام الموظفين لسه في `public_html`، فيه ملف `index.php` (صفحة دخول
الموظفين). Apache بيشغّل `index.php` **قبل** `index.html`، فلو فتحت
`first1car.net` هتلاقي صفحة دخول الموظفين مش الموقع — حتى لو كل الملفات
اترفعت صح.

**الحل:** ارفع ملف **`.htaccess`** اللي جاي مع الموقع. فيه السطر ده:

```apache
DirectoryIndex index.html index.htm index.php
```

اللي بيخلي `index.html` هو الأول.

> ⚠️ ملف `.htaccess` بيبدأ بنقطة، ودي بتخليه **مخفي**. في File Manager
> بتاع Hostinger لازم تفعّل **Settings → Show hidden files** عشان تشوفه.
> ولو مشوفتوش في ملفاتك يبقى مترفعش أصلاً.

> ⚠️ ملف `.htaccess` بتاع الموقع **بيمسح** بتاع النظام لو الاتنين في نفس
> المجلد. عشان كده حطيت قواعد حماية النظام (منع تحميل `config.php`
> و `auth.php`) جوه ملف الموقع — فمفيش حاجة بتضيع.

---

## الترتيب اللي أنصح بيه

خلي الموقع في الجذر والنظام في مجلد لوحده — أنضف وأأمن:

```
public_html/
├── index.html          ← الموقع للعملاء
├── … باقي صفحات الموقع
├── assets/
├── .htaccess
└── system/             ← نظام الموظفين
    ├── index.php
    ├── dashboard.php
    ├── config.php
    ├── .htaccess       ← انقل ملف النظام معاه
    └── …
```

بعدين الموظفين يدخلوا على `first1car.net/system/`.

**لو عملت كده:** كل ملفات النظام (الـ ٥٠ ملف `.php` وملف `logo.png`) تتنقل
لمجلد `system/`، ومعاهم `.htaccess` بتاع النظام. الموقع مش بيلمس قاعدة
البيانات خالص فمفيش حاجة هتتكسر.

---

## لو لسه مش شغال

جرّب بالترتيب ده:

| الحالة | السبب المحتمل | الحل |
|---|---|---|
| صفحة بيضا فاضية | ملفات `assets` مترفعتش | افتح `check.html` وشوف أنهي ملف ناقص |
| الموقع من غير ألوان ولا تنسيق | مجلد `assets/css` ناقص | ارفع مجلد `assets` كامل تاني |
| صفحة دخول الموظفين | `index.php` بيسبق `index.html` | ارفع `.htaccess` |
| **404 Not Found** | الملفات في مجلد فرعي | انقلهم لـ `public_html` مباشرة |
| **403 Forbidden** | صلاحيات الملفات | في File Manager: الملفات `644` والمجلدات `755` |
| **500 Server Error** | `.htaccess` فيه مشكلة | غيّر اسمه لـ `htaccess.txt` مؤقتاً وجرّب |
| لسه بيظهر القديم | كاش المتصفح | `Ctrl + F5`، أو جرّب في وضع التصفح الخفي |

---

## ملحوظة مهمة عن الملفات المخفية

الملفات اللي بتبدأ بنقطة (`.htaccess`) **مش بتظهر** افتراضياً — لا في
File Manager ولا في FTP. لو نقلت الملفات وسيبت `.htaccess` وراك، الموقع
هيشتغل بس هتفضل مشكلة `index.php`.

في Hostinger File Manager: **الترس ⚙ (Settings) → Show hidden files**.
