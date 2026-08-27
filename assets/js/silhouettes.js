/* ============================================================================
   First 1 Car — body-type silhouettes
   Side profiles drawn once here and tinted per brand, so every model card
   shows a car shaped like the car it names, with no photography needed.
   All share one frame: 400×170, ground at y=140, wheels at x=105 / x=295.
   ============================================================================ */
(function () {
  'use strict';

  /* the wheel arches and the run along the ground, identical on every body */
  var BASE = 'L319,140 A24,24 0 0 0 271,140 L129,140 A24,24 0 0 0 81,140 Z';

  var BODY = {
    /* three-box saloon: low bonnet, raked screen, separate boot */
    sedan:
      'M28,140 L28,112 C28,104 33,98 42,95 L136,84 C147,82 156,78 164,71 ' +
      'L192,50 C199,45 207,42 216,42 L258,42 C268,42 276,45 283,51 ' +
      'L318,84 C326,91 336,95 347,97 L362,100 C370,102 374,107 374,113 L374,140 ' + BASE,

    /* taller, flatter roof, upright tail */
    suv:
      'M26,140 L26,104 C26,95 31,89 40,86 L128,74 C139,72 148,68 156,61 ' +
      'L182,38 C189,32 197,29 206,29 L288,29 C298,29 306,32 312,39 ' +
      'L342,74 C348,81 356,85 364,87 C372,89 376,94 376,100 L376,140 ' + BASE,

    /* short tail dropping almost straight from the roof */
    hatch:
      'M30,140 L30,110 C30,102 35,96 44,93 L134,82 C145,80 154,76 162,69 ' +
      'L190,46 C197,40 205,37 214,37 L286,37 C296,37 303,41 307,49 ' +
      'L330,98 C333,105 338,109 345,111 C354,113 358,118 358,124 L358,140 ' + BASE,

    /* estate: the roof carries all the way back before it drops */
    wagon:
      'M28,140 L28,110 C28,102 33,96 42,93 L132,82 C143,80 152,76 160,69 ' +
      'L188,46 C195,40 203,37 212,37 L330,37 C342,37 350,41 354,50 ' +
      'L362,74 C368,88 372,96 372,106 L372,140 ' + BASE,

    /* one-box people carrier: deep screen, long cabin */
    mpv:
      'M26,140 L26,104 C26,94 31,87 41,84 L120,70 ' +
      'L168,34 C175,29 183,26 192,26 L300,26 C312,26 320,30 324,39 ' +
      'L346,80 C352,88 360,92 368,94 C374,96 377,100 377,106 L377,140 ' + BASE,

    /* cab up front, open load bed behind */
    pickup:
      'M26,140 L26,106 C26,97 31,91 40,88 L124,76 C135,74 144,70 152,63 ' +
      'L176,40 C183,34 191,31 200,31 L246,31 C256,31 263,35 266,43 ' +
      'L266,86 L376,86 L376,140 ' + BASE,

    /* tall box, minimal bonnet */
    van:
      'M24,140 L24,98 C24,86 29,78 39,74 L104,48 ' +
      'C112,45 120,43 129,43 L344,43 C358,43 366,48 370,58 ' +
      'L378,86 C380,94 380,100 380,108 L380,140 ' + BASE
  };

  /* windows, drawn per body so the greenhouse reads correctly */
  var GLASS = {
    sedan:  ['M176,68 L200,54 C204,51 209,50 214,50 L238,50 L238,68 Z',
             'M248,50 L262,50 C268,50 272,52 276,56 L296,68 L248,68 Z'],
    suv:    ['M168,58 L190,42 C194,39 199,38 204,38 L236,38 L236,58 Z',
             'M246,38 L286,38 L286,58 L246,58 Z',
             'M296,38 L306,42 L322,58 L296,58 Z'],
    hatch:  ['M174,64 L198,50 C202,47 207,46 212,46 L240,46 L240,64 Z',
             'M250,46 L284,46 L292,64 L250,64 Z'],
    wagon:  ['M172,64 L196,50 C200,47 205,46 210,46 L238,46 L238,64 Z',
             'M248,46 L288,46 L288,64 L248,64 Z',
             'M298,46 L338,46 L344,64 L298,64 Z'],
    mpv:    ['M140,60 L178,42 C182,40 187,38 192,38 L226,38 L226,60 Z',
             'M236,38 L282,38 L282,60 L236,60 Z',
             'M292,38 L312,38 L322,60 L292,60 Z'],
    pickup: ['M164,58 L186,42 C190,39 195,38 200,38 L226,38 L226,58 Z',
             'M236,38 L254,38 L256,58 L236,58 Z'],
    van:    ['M112,66 L142,52 C146,50 151,50 156,50 L196,50 L196,66 Z',
             'M206,50 L262,50 L262,66 L206,66 Z']
  };

  /**
   * One car silhouette as an inline SVG string.
   * @param {string} body  key of BODY — falls back to 'sedan'
   * @param {string} ink   stroke colour (a brand's lightened ink)
   */
  window.carArt = function (body, ink) {
    var d = BODY[body] || BODY.sedan;
    var glass = (GLASS[body] || GLASS.sedan)
      .map(function (g) { return '<path d="' + g + '" fill="' + ink + '" opacity=".16"/>'; })
      .join('');

    var wheel = function (cx) {
      return '<circle cx="' + cx + '" cy="140" r="24" fill="none" stroke="' + ink +
               '" stroke-width="3.5" opacity=".85"/>' +
             '<circle cx="' + cx + '" cy="140" r="10" fill="none" stroke="' + ink +
               '" stroke-width="2.5" opacity=".5"/>';
    };

    return '<svg class="car-sil" viewBox="0 0 400 170" aria-hidden="true">' +
             '<path d="' + d + '" fill="none" stroke="' + ink +
               '" stroke-width="3.5" stroke-linejoin="round" opacity=".92"/>' +
             glass + wheel(105) + wheel(295) +
             '<ellipse cx="200" cy="166" rx="146" ry="7" fill="' + ink + '" opacity=".13"/>' +
           '</svg>';
  };
})();
