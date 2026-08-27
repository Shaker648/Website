/* ============================================================================
   First 1 Car — cars page
   Renders the brand filter, the body-type filter and the model cards from
   SITE.brands.

   ONLY the official price is ever shown here. The internal system's customer
   and trade prices are deliberately not part of SITE and never reach the web.
   ============================================================================ */
(function () {
  'use strict';

  var tabsEl  = document.getElementById('brand-tabs');
  var bodyEl  = document.getElementById('body-filter');
  var gridEl  = document.getElementById('model-grid');
  var countEl = document.getElementById('result-count');
  if (!tabsEl || !gridEl) return;

  var esc = window.esc, tr = window.tr, brandPlate = window.brandPlate;

  /* a #brand in the URL (from the home-page marquee) preselects that brand */
  var validIds = SITE.brands.map(function (b) { return b.id; });
  var brandFilter = validIds.indexOf(location.hash.slice(1)) > -1
    ? location.hash.slice(1) : 'all';
  var bodyFilter = 'all';

  /* ── model list, flattened with a link back to the brand ───────────── */
  function allModels() {
    var out = [];
    SITE.brands.forEach(function (b) {
      (b.models || []).forEach(function (m) { out.push({ brand: b, model: m }); });
    });
    return out;
  }

  /* body types that actually exist, in the order SITE.bodyTypes declares */
  function usedBodies() {
    var seen = {};
    allModels().forEach(function (x) { seen[x.model.body] = true; });
    return Object.keys(SITE.bodyTypes).filter(function (k) { return seen[k]; });
  }

  function priceOf(model) {
    var lang = window.currentLang();
    if (model.price == null) {
      return { cls: 'price-val ask', text: lang === 'ar' ? 'اتصل للسعر' : 'Call for price' };
    }
    var n = Number(model.price).toLocaleString('en-US');
    return { cls: 'price-val', text: lang === 'ar' ? n + ' جنيه' : 'EGP ' + n };
  }

  /* ── filters ───────────────────────────────────────────────────────── */
  function renderTabs() {
    var lang = window.currentLang();

    var html = '<button type="button" class="brand-tab' +
               (brandFilter === 'all' ? ' active' : '') + '" data-brand="all">' +
               (lang === 'ar' ? 'كل الماركات' : 'All brands') + '</button>';

    SITE.brands.forEach(function (b) {
      if (!b.models || !b.models.length) return;
      var ink = window.brandInk(b.color);
      html += '<button type="button" class="brand-tab' +
              (brandFilter === b.id ? ' active' : '') + '" data-brand="' + esc(b.id) + '">' +
                '<span class="dot" style="background:' + esc(ink) + '"></span>' +
                esc(tr(b.name)) +
              '</button>';
    });
    tabsEl.innerHTML = html;
  }

  function renderBodies() {
    if (!bodyEl) return;
    var lang = window.currentLang();

    var html = '<span class="label">' + (lang === 'ar' ? 'النوع' : 'Type') + '</span>' +
               '<button type="button" class="chip' + (bodyFilter === 'all' ? ' active' : '') +
               '" data-body="all">' + (lang === 'ar' ? 'الكل' : 'All') + '</button>';

    usedBodies().forEach(function (k) {
      html += '<button type="button" class="chip' + (bodyFilter === k ? ' active' : '') +
              '" data-body="' + esc(k) + '">' + esc(tr(SITE.bodyTypes[k])) + '</button>';
    });
    bodyEl.innerHTML = html;
  }

  /* ── cards ─────────────────────────────────────────────────────────── */
  function renderGrid() {
    var lang = window.currentLang();
    var wa   = SITE.contact.whatsapp;

    var items = allModels().filter(function (x) {
      return (brandFilter === 'all' || x.brand.id === brandFilter) &&
             (bodyFilter  === 'all' || x.model.body === bodyFilter);
    });

    if (countEl) {
      countEl.textContent = lang === 'ar'
        ? items.length + ' موديل' + (items.length === 1 ? '' : ' متاح')
        : items.length + (items.length === 1 ? ' model' : ' models');
    }

    if (!items.length) {
      gridEl.innerHTML = '<p class="lead" style="grid-column:1/-1;text-align:center">' +
        (lang === 'ar' ? 'مفيش موديلات مطابقة للاختيار ده — جرّب فلتر تاني.'
                       : 'No models match this filter — try another.') + '</p>';
      return;
    }

    gridEl.innerHTML = items.map(function (x, i) {
      var name  = tr(x.model.name);
      var brand = tr(x.brand.name);
      var p     = priceOf(x.model);
      var body  = SITE.bodyTypes[x.model.body] ? tr(SITE.bodyTypes[x.model.body]) : '';

      // show the first four trims, then "+N" so a seven-trim Tucson stays tidy
      var trims = x.model.trims || [];
      var shown = trims.slice(0, 4).map(function (t) {
        return '<span class="trim">' + esc(t) + '</span>';
      }).join('');
      var extra = trims.length > 4
        ? '<span class="trim-count">+' + (trims.length - 4) + '</span>' : '';

      var msg = lang === 'ar'
        ? 'السلام عليكم، حابب أستفسر عن ' + brand + ' ' + name + ' والسعر الرسمي.'
        : 'Hello, I would like to ask about the ' + brand + ' ' + name + ' and its official price.';

      return '' +
        '<article class="card model-card reveal in">' +
          '<div class="model-media">' +
            (body ? '<span class="model-badge">' + esc(body) + '</span>' : '') +
            (x.model.photo
              ? '<img src="' + esc(x.model.photo) + '" alt="' + esc(brand + ' ' + name) + '" ' +
                'onerror="this.remove()">'
              : '') +
            '<div class="sil-wrap">' +
              window.carArt(x.model.body, window.brandInk(x.brand.color)) +
            '</div>' +
          '</div>' +
          '<div class="model-body">' +
            '<span class="model-brand">' + esc(brand) + '</span>' +
            '<h3>' + esc(name) + '</h3>' +
            (trims.length
              ? '<div class="trims">' + shown + extra + '</div>'
              : '') +
            '<div class="price-row">' +
              '<div>' +
                '<span class="price-label">' +
                  (lang === 'ar' ? 'السعر الرسمي' : 'Official price') + '</span>' +
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
  }

  function render() { renderTabs(); renderBodies(); renderGrid(); }

  tabsEl.addEventListener('click', function (e) {
    var btn = e.target.closest('.brand-tab');
    if (!btn) return;
    brandFilter = btn.dataset.brand;
    render();
  });

  if (bodyEl) {
    bodyEl.addEventListener('click', function (e) {
      var btn = e.target.closest('.chip');
      if (!btn) return;
      bodyFilter = btn.dataset.body;
      render();
    });
  }

  window.addEventListener('hashchange', function () {
    var id = location.hash.slice(1);
    if (validIds.indexOf(id) > -1) { brandFilter = id; render(); }
  });

  document.addEventListener('langchange', render);
  render();
})();
