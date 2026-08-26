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
    var c = SITE.contact, s = SITE.social;

    var socials = Object.keys(ICONS).filter(function (k) { return s[k]; }).map(function (k) {
      return '<a href="' + s[k] + '" target="_blank" rel="noopener" aria-label="' + k + '">' +
             '<svg viewBox="0 0 24 24">' + ICONS[k] + '</svg></a>';
    }).join('');

    var links = NAV.map(function (n) {
      return '<a href="' + n.href + '" data-en="' + n.en + '">' + n.ar + '</a>';
    }).join('');

    var branchLinks = SITE.branches.map(function (b) {
      return '<a href="' + b.mapUrl + '" target="_blank" rel="noopener" data-en="' +
             b.name.en + '">' + b.name.ar + '</a>';
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
            '<a href="tel:' + c.phonePrimary.replace(/\s/g, '') + '" class="num">' + c.phonePrimary + '</a>' +
            '<a href="mailto:' + c.email + '">' + c.email + '</a>' +
            '<p data-en="' + c.hours.en + '">' + c.hours.ar + '</p>' +
          '</div>' +
        '</div>' +
        '<div class="footer-bottom">' +
          '<span data-en="© ' + new Date().getFullYear() + ' First 1 Car. All rights reserved.">' +
            '© ' + new Date().getFullYear() + ' فيرست 1 كار. جميع الحقوق محفوظة.</span>' +
          '<span data-en="Official prices — updated regularly">أسعار رسمية — يتم تحديثها أولاً بأول</span>' +
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
        return '<div class="marquee-item">' +
                 '<span class="dot" style="background:' + b.color + '"></span>' +
                 tr(b.name) +
               '</div>';
      }).join('');
      host.innerHTML = one + one;          // doubled so the loop is seamless
    }
    render();
    document.addEventListener('langchange', render);
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
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', boot);
  } else {
    boot();
  }
})();
