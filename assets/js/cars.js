/* ============================================================================
   First 1 Car — cars page
   Renders the brand filter and the model cards from SITE.brands.
   ONLY the official price (السعر الرسمي) is ever rendered here — the internal
   system's customer and trade prices are deliberately not part of SITE.
   ============================================================================ */
(function () {
  'use strict';

  var tabsEl = document.getElementById('brand-tabs');
  var gridEl = document.getElementById('model-grid');
  if (!tabsEl || !gridEl) return;

  var filter = 'all';                       // 'all' or a brand id

  var BODY = {
    suv:   { ar: 'SUV',   en: 'SUV' },
    sedan: { ar: 'سيدان', en: 'Sedan' },
    hatch: { ar: 'هاتشباك', en: 'Hatchback' }
  };

  function esc(s) {
    return String(s).replace(/[&<>"']/g, function (c) {
      return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c];
    });
  }

  function priceText(model) {
    var lang = window.currentLang();
    if (model.price == null) {
      return {
        cls:  'price-val ask',
        text: lang === 'ar' ? 'اتصل للسعر' : 'Call for price'
      };
    }
    var n = Number(model.price).toLocaleString('en-US');
    return {
      cls:  'price-val',
      text: lang === 'ar' ? n + ' جنيه' : 'EGP ' + n
    };
  }

  /* Flatten brands → models, keeping a reference back to the brand. */
  function allModels() {
    var out = [];
    SITE.brands.forEach(function (b) {
      (b.models || []).forEach(function (m) { out.push({ brand: b, model: m }); });
    });
    return out;
  }

  function renderTabs() {
    var lang = window.currentLang();
    var html = '<button type="button" class="brand-tab' + (filter === 'all' ? ' active' : '') +
               '" data-brand="all">' + (lang === 'ar' ? 'كل الماركات' : 'All brands') + '</button>';

    SITE.brands.forEach(function (b) {
      if (!b.models || !b.models.length) return;       // hide brands with nothing listed yet
      html += '<button type="button" class="brand-tab' + (filter === b.id ? ' active' : '') +
              '" data-brand="' + esc(b.id) + '">' +
                '<span class="dot" style="background:' + esc(b.color) + '"></span>' +
                esc(window.tr(b.name)) +
              '</button>';
    });
    tabsEl.innerHTML = html;
  }

  function renderGrid() {
    var lang  = window.currentLang();
    var wa    = SITE.contact.whatsapp;
    var items = allModels().filter(function (x) {
      return filter === 'all' || x.brand.id === filter;
    });

    if (!items.length) {
      gridEl.innerHTML =
        '<p class="lead" style="grid-column:1/-1;text-align:center">' +
        (lang === 'ar' ? 'لا توجد موديلات معروضة لهذه الماركة حالياً.'
                       : 'No models listed for this brand yet.') + '</p>';
      return;
    }

    gridEl.innerHTML = items.map(function (x, i) {
      var name  = window.tr(x.model.name);
      var brand = window.tr(x.brand.name);
      var p     = priceText(x.model);
      var body  = BODY[x.model.body] ? window.tr(BODY[x.model.body]) : '';

      // pre-written WhatsApp enquiry for this exact model
      var msg = lang === 'ar'
        ? 'السلام عليكم، حابب أستفسر عن ' + brand + ' ' + name + ' والسعر الرسمي.'
        : 'Hello, I would like to ask about the ' + brand + ' ' + name + ' and its official price.';

      return '' +
        '<article class="card model-card reveal"' + (i % 3 ? ' data-delay="' + (i % 3) + '"' : '') + '>' +
          '<div class="model-media">' +
            (body ? '<span class="model-badge">' + esc(body) + '</span>' : '') +
            '<div class="ph"><div class="ph-inner"><span>🚗</span>' +
              '<small>' + esc(brand + ' ' + name) + '</small>' +
            '</div></div>' +
          '</div>' +
          '<div class="model-body">' +
            '<span class="model-brand">' + esc(brand) + '</span>' +
            '<h3>' + esc(name) + '</h3>' +
            '<div class="price-row">' +
              '<div>' +
                '<span class="price-label">' +
                  (lang === 'ar' ? 'السعر الرسمي' : 'Official price') +
                '</span>' +
                '<span class="' + p.cls + ' num">' + esc(p.text) + '</span>' +
              '</div>' +
              '<a class="model-cta" target="_blank" rel="noopener" ' +
                 'href="https://wa.me/' + esc(wa) + '?text=' + encodeURIComponent(msg) + '">' +
                (lang === 'ar' ? 'استفسر' : 'Enquire') +
              '</a>' +
            '</div>' +
          '</div>' +
        '</article>';
    }).join('');

    // newly injected cards still need their reveal observer
    gridEl.querySelectorAll('.reveal').forEach(function (el) { el.classList.add('in'); });
  }

  function render() { renderTabs(); renderGrid(); }

  tabsEl.addEventListener('click', function (e) {
    var btn = e.target.closest('.brand-tab');
    if (!btn) return;
    filter = btn.dataset.brand;
    render();
  });

  document.addEventListener('langchange', render);
  render();
})();
