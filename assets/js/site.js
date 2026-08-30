/* ============================================================================
   First 1 Car — site behaviour
   Header/footer injection · Arabic⇄English toggle · scroll reveals ·
   cursor-follow card glow · counters · mobile drawer
   ============================================================================ */
(function () {
  'use strict';

  /* ── Language ───────────────────────────────────────────────────────── */
  var LS_KEY = 'f1c-lang';

  function readLang() {
    try { var v = localStorage.getItem(LS_KEY); if (v === 'ar' || v === 'en') return v; }
    catch (e) { /* private mode / blocked storage — fall through */ }
    return 'ar';                                  // Arabic is the default
  }
  function saveLang(v) {
    try { localStorage.setItem(LS_KEY, v); } catch (e) { /* nothing we can do */ }
  }

  var lang = readLang();

  /** Pick the right half of a {ar,en} pair. */
  function tr(pair) {
    if (pair == null) return '';
    return typeof pair === 'string' ? pair : (pair[lang] || pair.ar || '');
  }
  window.tr = tr;
  window.currentLang = function () { return lang; };

  /**
   * Swap every [data-en] element between its Arabic original and its English
   * text. The Arabic original is stashed on first run so the swap is lossless.
   */
  function applyLang() {
    document.documentElement.lang = lang;
    document.documentElement.dir  = lang === 'ar' ? 'rtl' : 'ltr';

    document.querySelectorAll('[data-en]').forEach(function (el) {
      if (!el.dataset.ar) el.dataset.ar = el.innerHTML.trim();
      el.innerHTML = lang === 'en' ? el.dataset.en : el.dataset.ar;
    });

    document.querySelectorAll('[data-en-placeholder]').forEach(function (el) {
      if (!el.dataset.arPlaceholder) el.dataset.arPlaceholder = el.placeholder;
      el.placeholder = lang === 'en' ? el.dataset.enPlaceholder : el.dataset.arPlaceholder;
    });

    document.querySelectorAll('.lang-btn').forEach(function (b) {
      b.textContent = lang === 'ar' ? 'EN' : 'ع';
      b.setAttribute('aria-label', lang === 'ar' ? 'Switch to English' : 'التبديل إلى العربية');
    });

    document.dispatchEvent(new CustomEvent('langchange', { detail: { lang: lang } }));
  }

  function toggleLang() {
    lang = lang === 'ar' ? 'en' : 'ar';
    saveLang(lang);
    applyLang();
  }


  /* ── Brand colour helpers ───────────────────────────────────────────── */
  /* Real brand colours (Hyundai navy, GAC black) vanish on a near-black
     page, so a brand's ink is lightened until it is legible, while the
     original hue still identifies the brand.                              */
  function hex2rgb(h) {
    h = h.replace('#', '');
    if (h.length === 3) h = h[0]+h[0]+h[1]+h[1]+h[2]+h[2];
    return [parseInt(h.slice(0,2),16), parseInt(h.slice(2,4),16), parseInt(h.slice(4,6),16)];
  }
  function luminance(hex) {
    return hex2rgb(hex).map(function (v) {
      v /= 255;
      return v <= 0.03928 ? v/12.92 : Math.pow((v+0.055)/1.055, 2.4);
    }).reduce(function (a, v, i) { return a + v * [0.2126,0.7152,0.0722][i]; }, 0);
  }
  function lighten(hex, amt) {
    return '#' + hex2rgb(hex).map(function (v) {
      return Math.round(v + (255 - v) * amt).toString(16).padStart(2,'0');
    }).join('');
  }
  function brandInk(hex) {
    var c = hex, guard = 0;
    while (luminance(c) < 0.42 && guard++ < 24) c = lighten(c, 0.13);
    return c;
  }
  window.brandInk = brandInk;

  function rgba(hex, a) { return 'rgba(' + hex2rgb(hex).join(',') + ',' + a + ')'; }

  /**
   * A brand's mark. Renders the real logo when `logo` is set; if that image
   * fails to load (bad URL, offline host) the onerror handler swaps in the
   * typographic plate, so the page never shows a broken image.
   * @param {object} brand  entry from SITE.brands or SITE.banks
   * @param {string} size   '' | 'sm' | 'lg'
   */
  function brandPlate(brand, size) {
    // A plate stands in for a logo, so it always carries the Latin name —
    // that is how the real marks read, in either language.
    var pair  = brand.name || brand;
    var label = pair.en || tr(pair);
    var color = brand.color || '#94a3b8';
    var ink   = brandInk(color);
    var style = '--bp-ink:' + ink + ';--bp-line:' + rgba(ink, .34) +
                ';--bp-glow:' + rgba(ink, .5);
    var cls   = 'bplate' + (size ? ' ' + size : '');
    var plain = '<span class="' + cls + '" style="' + style + '">' +
                esc(label) + '</span>';

    if (!brand.logo) return plain;

    // data-fallback holds the plate markup the onerror handler swaps in
    return '<span class="' + cls + ' img" data-fallback="' +
             esc(plain).replace(/"/g, '&quot;') + '">' +
             // NOT lazy: a lazy image below the fold never loads, so onerror
             // never fires and the plate would sit there empty
             '<img src="' + esc(brand.logo) + '" alt="' + esc(label) + '" ' +
             'onerror="(function(i){var p=i.parentNode;' +
             'p.outerHTML=p.getAttribute(\'data-fallback\');})(this)">' +
           '</span>';
  }
  window.brandPlate = brandPlate;

  function esc(s) {
    return String(s).replace(/[&<>"']/g, function (c) {
      return { '&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;' }[c];
    });
  }
  window.esc = esc;

  /* ── Header ─────────────────────────────────────────────────────────── */
  var NAV = [
    { href: 'index.html',    ar: 'الرئيسية', en: 'Home' },
    { href: 'cars.html',     ar: 'سياراتنا', en: 'Our Cars' },
    { href: 'finance.html',  ar: 'التقسيط',  en: 'Finance' },
    { href: 'about.html',    ar: 'من نحن',   en: 'About' },
    { href: 'branches.html', ar: 'فروعنا',   en: 'Branches' },
    { href: 'contact.html',  ar: 'اتصل بنا', en: 'Contact' }
  ];

  function currentPage() {
    var f = location.pathname.split('/').pop();
    return (!f || f === '') ? 'index.html' : f;
  }

  function navLinks(cls) {
    var here = currentPage();
    return NAV.map(function (n) {
      var active = n.href === here ? ' class="active"' : (cls ? ' class=""' : '');
      return '<a href="' + n.href + '"' + active + ' data-en="' + n.en + '">' + n.ar + '</a>';
    }).join('');
  }

  function buildHeader() {
    var host = document.getElementById('site-header');
    if (!host) return;
    var wa = SITE.contact.whatsapp;

    host.innerHTML =
      '<header class="nav" id="nav">' +
        '<div class="nav-inner">' +
          '<a href="index.html" class="brand">' +
            '<img src="assets/img/logo.png" alt="First 1 Car">' +
            '<span class="sr-only">First 1 Car</span>' +
          '</a>' +
          '<nav class="nav-links">' + navLinks() + '</nav>' +
          '<div class="nav-actions">' +
            '<button class="lang-btn" type="button">EN</button>' +
            '<a class="btn btn-primary nav-cta" href="https://wa.me/' + wa + '" ' +
               'target="_blank" rel="noopener" data-en="Book a test drive">احجز تجربة قيادة</a>' +
            '<button class="burger" type="button" aria-label="Menu" aria-expanded="false">' +
              '<span></span><span></span><span></span></button>' +
          '</div>' +
        '</div>' +
      '</header>' +
      '<div class="drawer" id="drawer">' + navLinks(true) +
        '<a class="btn btn-primary" href="https://wa.me/' + wa + '" target="_blank" ' +
           'rel="noopener" data-en="Book a test drive">احجز تجربة قيادة</a>' +
      '</div>';

    var nav    = document.getElementById('nav');
    var drawer = document.getElementById('drawer');
    var burger = host.querySelector('.burger');

    host.querySelector('.lang-btn').addEventListener('click', toggleLang);

    burger.addEventListener('click', function () {
      var open = drawer.classList.toggle('open');
      burger.classList.toggle('open', open);
      burger.setAttribute('aria-expanded', String(open));
    });
    drawer.addEventListener('click', function (e) {
      if (e.target.tagName === 'A') {
        drawer.classList.remove('open');
        burger.classList.remove('open');
        burger.setAttribute('aria-expanded', 'false');
      }
    });

    var onScroll = function () { nav.classList.toggle('scrolled', window.scrollY > 24); };
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
  }

  /* ── Footer ─────────────────────────────────────────────────────────── */
  var ICONS = {
    facebook:  '<path d="M24 12.07C24 5.4 18.63 0 12 0S0 5.4 0 12.07C0 18.1 4.39 23.09 10.13 24v-8.44H7.08v-3.49h3.05V9.41c0-3.02 1.79-4.69 4.53-4.69 1.31 0 2.69.24 2.69.24v2.96h-1.52c-1.49 0-1.96.93-1.96 1.89v2.26h3.33l-.53 3.49h-2.8V24C19.61 23.09 24 18.1 24 12.07"/>',
    instagram: '<path d="M12 2.16c3.2 0 3.58.01 4.85.07 3.25.15 4.77 1.69 4.92 4.92.06 1.27.07 1.65.07 4.85s-.01 3.58-.07 4.85c-.15 3.23-1.66 4.77-4.92 4.92-1.27.06-1.65.07-4.85.07s-3.58-.01-4.85-.07c-3.26-.15-4.77-1.7-4.92-4.92-.06-1.27-.07-1.65-.07-4.85s.01-3.58.07-4.85C2.38 3.92 3.89 2.38 7.15 2.23 8.42 2.17 8.8 2.16 12 2.16M12 0C8.74 0 8.33.01 7.05.07c-4.35.2-6.78 2.62-6.98 6.98C.01 8.33 0 8.74 0 12s.01 3.67.07 4.95c.2 4.36 2.62 6.78 6.98 6.98C8.33 23.99 8.74 24 12 24s3.67-.01 4.95-.07c4.35-.2 6.78-2.62 6.98-6.98.06-1.28.07-1.69.07-4.95s-.01-3.67-.07-4.95c-.2-4.35-2.62-6.78-6.98-6.98C15.67.01 15.26 0 12 0m0 5.84a6.16 6.16 0 1 0 0 12.32 6.16 6.16 0 0 0 0-12.32M12 16a4 4 0 1 1 0-8 4 4 0 0 1 0 8m6.41-11.85a1.44 1.44 0 1 0 0 2.88 1.44 1.44 0 0 0 0-2.88"/>',
    tiktok:    '<path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 3.16-4.51v-3.5a6.33 6.33 0 0 0-5.39 10.71 6.33 6.33 0 0 0 10.81-4.48V8.69a8.16 8.16 0 0 0 4.77 1.52V6.75a4.85 4.85 0 0 1-.93-.06"/>',
    youtube:   '<path d="M23.5 6.19a3.02 3.02 0 0 0-2.12-2.14C19.5 3.55 12 3.55 12 3.55s-7.5 0-9.38.5A3.02 3.02 0 0 0 .5 6.19C0 8.08 0 12 0 12s0 3.92.5 5.81a3.02 3.02 0 0 0 2.12 2.14c1.88.5 9.38.5 9.38.5s7.5 0 9.38-.5a3.02 3.02 0 0 0 2.12-2.14C24 15.92 24 12 24 12s0-3.92-.5-5.81M9.55 15.57V8.43L15.82 12z"/>'
  };

  function buildFooter() {
    var host = document.getElementById('site-footer');
    if (!host) return;
    var c = SITE.contact, s = SITE.social, lang = window.currentLang();

    var socials = Object.keys(ICONS).filter(function (k) { return s[k]; }).map(function (k) {
      return '<a href="' + s[k] + '" target="_blank" rel="noopener" aria-label="' + k + '">' +
             '<svg viewBox="0 0 24 24">' + ICONS[k] + '</svg></a>';
    }).join('');

    var links = NAV.map(function (n) {
      return '<a href="' + n.href + '" data-en="' + n.en + '">' + n.ar + '</a>';
    }).join('');

    var branchLinks = SITE.branches.map(function (b) {
      if (b.comingSoon) {
        // name and the "soon" note are separate nodes, so each translates on its own
        return '<p><span data-en="' + esc(b.name.en) + '">' + esc(b.name.ar) + '</span>' +
               '<span class="soon-note" data-en=" · soon"> · قريباً</span></p>';
      }
      return '<a href="' + b.mapUrl + '" target="_blank" rel="noopener" data-en="' +
             esc(b.name.en) + '">' + esc(b.name.ar) + '</a>';
    }).join('');

    host.innerHTML =
      '<footer class="footer"><div class="shell">' +
        '<div class="footer-grid">' +
          '<div class="footer-col">' +
            '<div class="brand"><img src="assets/img/logo.png" alt="First 1 Car"></div>' +
            '<p class="lead" data-en="' + SITE.company.intro.en.replace(/"/g, '&quot;') + '">' +
              SITE.company.intro.ar + '</p>' +
            '<div class="socials">' + socials + '</div>' +
          '</div>' +
          '<div class="footer-col"><h4 data-en="Explore">تصفّح</h4>' + links + '</div>' +
          '<div class="footer-col"><h4 data-en="Branches">فروعنا</h4>' + branchLinks + '</div>' +
          '<div class="footer-col"><h4 data-en="Get in touch">تواصل معنا</h4>' +
            c.salesLines.slice(0, 3).map(function (n) {
              return '<a href="tel:' + n + '" class="num">' + n + '</a>';
            }).join('') +
            '<a href="contact.html" data-en="All ' + c.salesLines.length + ' lines">' +
              'كل الأرقام (' + c.salesLines.length + ')</a>' +
            '<p data-en="' + esc(c.hours.en) + '">' + esc(c.hours.ar) + '</p>' +
          '</div>' +
        '</div>' +
        '<div class="footer-bottom">' +
          '<span data-en="© ' + new Date().getFullYear() + ' First 1 Car. All rights reserved.">' +
            '© ' + new Date().getFullYear() + ' فيرست 1 كار. جميع الحقوق محفوظة.</span>' +
          '<span class="num" data-en="Tax registration ' + SITE.company.taxId + '">' +
            'سجل ضريبي ' + SITE.company.taxId + '</span>' +
        '</div>' +
      '</div></footer>' +
      '<a class="wa-float" href="https://wa.me/' + c.whatsapp + '" target="_blank" rel="noopener" ' +
         'aria-label="WhatsApp"><svg viewBox="0 0 24 24"><path d="M17.47 14.38c-.3-.15-1.76-.87-2.03-.97-.27-.1-.47-.15-.67.15-.2.29-.77.96-.94 1.16-.17.2-.35.22-.64.07-.3-.15-1.25-.46-2.39-1.47-.88-.79-1.48-1.76-1.65-2.06-.17-.29-.02-.45.13-.6.13-.13.3-.35.44-.52.15-.17.2-.29.3-.49.1-.2.05-.37-.02-.52-.08-.15-.67-1.61-.92-2.21-.24-.58-.49-.5-.67-.51h-.57c-.2 0-.52.07-.79.37-.27.29-1.04 1.02-1.04 2.48s1.07 2.88 1.22 3.08c.15.2 2.1 3.2 5.08 4.49.71.3 1.26.49 1.69.63.71.23 1.36.19 1.87.12.57-.09 1.76-.72 2.01-1.41.25-.7.25-1.29.17-1.41-.07-.13-.27-.2-.57-.35M12.05 21.7h-.01a9.6 9.6 0 0 1-4.9-1.34l-.35-.21-3.65.96.97-3.56-.23-.36a9.62 9.62 0 0 1 8.17-14.7 9.6 9.6 0 0 1 6.79 2.82 9.55 9.55 0 0 1 2.81 6.79 9.62 9.62 0 0 1-9.6 9.6M20.52 3.45A11.83 11.83 0 0 0 12.05 0C5.5 0 .18 5.32.18 11.86c0 2.09.55 4.13 1.59 5.93L.08 24l6.35-1.66a11.83 11.83 0 0 0 5.66 1.44h.01c6.54 0 11.86-5.32 11.87-11.86a11.8 11.8 0 0 0-3.45-8.47"/></svg></a>';
  }

  /* ── Scroll reveal ──────────────────────────────────────────────────── */
  function initReveal() {
    var els = document.querySelectorAll('.reveal');
    if (!('IntersectionObserver' in window)) {
      els.forEach(function (el) { el.classList.add('in'); });
      return;
    }
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) {
        if (e.isIntersecting) { e.target.classList.add('in'); io.unobserve(e.target); }
      });
    }, { threshold: 0.12, rootMargin: '0px 0px -8% 0px' });
    els.forEach(function (el) { io.observe(el); });
  }

  /* ── Cursor-follow glow on cards ────────────────────────────────────── */
  function initCardGlow() {
    if (window.matchMedia('(hover:none)').matches) return;
    document.addEventListener('pointermove', function (e) {
      var card = e.target.closest && e.target.closest('.card');
      if (!card) return;
      var r = card.getBoundingClientRect();
      card.style.setProperty('--mx', (e.clientX - r.left) + 'px');
      card.style.setProperty('--my', (e.clientY - r.top) + 'px');
    }, { passive: true });
  }

  /* ── Tilt on the showcase panels ───────────────────────────────────── */
  function initTilt() {
    if (window.matchMedia('(hover:none)').matches) return;
    document.querySelectorAll('.showcase-media').forEach(function (el) {
      el.addEventListener('pointermove', function (e) {
        var r = el.getBoundingClientRect();
        var px = (e.clientX - r.left) / r.width  - 0.5;
        var py = (e.clientY - r.top)  / r.height - 0.5;
        el.style.setProperty('--ry', (px * 9).toFixed(2) + 'deg');
        el.style.setProperty('--rx', (-py * 9).toFixed(2) + 'deg');
      });
      el.addEventListener('pointerleave', function () {
        el.style.setProperty('--ry', '0deg');
        el.style.setProperty('--rx', '0deg');
      });
    });
  }

  /* ── Count-up numbers ──────────────────────────────────────────────── */
  function initCounters() {
    var els = document.querySelectorAll('[data-count]');
    if (!els.length || !('IntersectionObserver' in window)) {
      els.forEach(function (el) { el.textContent = el.dataset.count; });
      return;
    }
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) {
        if (!e.isIntersecting) return;
        io.unobserve(e.target);

        var el     = e.target;
        var target = parseFloat(el.dataset.count);
        var suffix = el.dataset.suffix || '';
        var t0     = null;

        function frame(ts) {
          if (t0 === null) t0 = ts;
          var p = Math.min((ts - t0) / 1600, 1);
          var eased = 1 - Math.pow(1 - p, 3);
          el.textContent = Math.round(target * eased).toLocaleString('en-US') + suffix;
          if (p < 1) requestAnimationFrame(frame);
        }
        requestAnimationFrame(frame);
      });
    }, { threshold: 0.5 });
    els.forEach(function (el) { io.observe(el); });
  }

  /* ── Brand marquee (built from SITE.brands) ────────────────────────── */
  function initMarquee() {
    var host = document.getElementById('marquee');
    if (!host) return;

    function render() {
      var one = SITE.brands.map(function (b) {
        return '<a class="marquee-item" href="cars.html#' + b.id + '">' +
                 brandPlate(b) +
               '</a>';
      }).join('');
      host.innerHTML = one + one;          // doubled so the loop is seamless
    }
    render();
    document.addEventListener('langchange', render);
  }




  /* ── Hero photograph ────────────────────────────────────────────────
     The drawn car ships in the markup so the hero is never empty. When
     SITE.photos.hero names an image that actually loads, it takes over
     and the drawing steps aside; if it fails, the drawing simply stays. */
  function initHeroPhoto() {
    var src   = (SITE.photos || {}).hero;
    var stage = document.querySelector('.hero-stage');
    if (!src || !stage) return;

    var img = new Image();
    img.className = 'hero-photo';
    img.alt = '';
    img.onload = function () {
      stage.classList.add('has-photo');   // hides the drawing, streaks and pad
    };
    img.onerror = function () { img.remove(); };
    img.src = src;
    stage.appendChild(img);
  }

  /* ── Showcase photography ───────────────────────────────────────────
     Each .showcase-media carries a data-photo key into SITE.photos. When
     that slot holds a path or URL the image is laid over the designed
     placeholder; if it fails to load it removes itself and the
     placeholder shows through, so a bad URL never leaves a blank panel. */
  function initPhotos() {
    document.querySelectorAll('[data-photo]').forEach(function (el) {
      var src = (SITE.photos || {})[el.dataset.photo];
      if (!src) return;
      var img = new Image();
      img.src = src;
      img.alt = '';
      img.className = 'showcase-photo';
      img.onerror = function () { img.remove(); };
      el.appendChild(img);
    });
  }

  /* ── Wire every WhatsApp / phone call-to-action on the page ─────────── */
  function wireCTAs() {
    var c = SITE.contact;
    document.querySelectorAll('.js-wa').forEach(function (a) {
      var msg = a.dataset.waMsg;
      a.href = 'https://wa.me/' + c.whatsapp + (msg ? '?text=' + encodeURIComponent(msg) : '');
      a.target = '_blank';
      a.rel = 'noopener';
    });
    document.querySelectorAll('.js-tel').forEach(function (a) {
      a.href = 'tel:' + c.salesLines[0];
    });
  }

  /* ── Boot ──────────────────────────────────────────────────────────── */
  function boot() {
    buildHeader();
    buildFooter();
    initMarquee();
    applyLang();            // after injection, so injected nodes get translated
    initReveal();
    initCardGlow();
    initTilt();
    initCounters();
    wireCTAs();
    initPhotos();
    initHeroPhoto();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', boot);
  } else {
    boot();
  }
})();
