/* ============================================================================
   First 1 Car — animated backdrop
   A perspective "road" grid racing toward the horizon plus a parallax star
   field. Pure canvas, no libraries, ~60fps, pauses when the tab is hidden.
   ============================================================================ */
(function () {
  'use strict';

  var canvas = document.getElementById('bg-canvas');
  if (!canvas) return;

  var reduce = window.matchMedia('(prefers-reduced-motion:reduce)').matches;
  var ctx = canvas.getContext('2d', { alpha: true });
  if (!ctx) return;

  var W = 0, H = 0, dpr = 1;
  var stars = [];
  var scrollY = 0;
  var raf = null;

  function resize() {
    dpr = Math.min(window.devicePixelRatio || 1, 2);
    W = canvas.clientWidth;
    H = canvas.clientHeight;
    canvas.width  = Math.floor(W * dpr);
    canvas.height = Math.floor(H * dpr);
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    seedStars();
  }

  function seedStars() {
    // density scales with area so phones don't draw 400 stars
    var count = Math.round(Math.min((W * H) / 9000, 190));
    stars = [];
    for (var i = 0; i < count; i++) {
      stars.push({
        x: Math.random() * W,
        y: Math.random() * H,
        z: Math.random() * 0.85 + 0.15,      // depth: drives size, speed, alpha
        tw: Math.random() * Math.PI * 2       // twinkle phase
      });
    }
  }

  /* The horizon sits a little above the vertical middle. */
  function horizon() { return H * 0.62; }

  function drawGrid(t) {
    var hz = horizon();
    var vpX = W / 2;

    ctx.lineWidth = 1;

    /* ── horizontal rungs, spaced so they bunch up toward the horizon ── */
    var rows = 22;
    var speed = reduce ? 0 : (t * 0.045);
    for (var i = 0; i < rows; i++) {
      // p cycles 0→1; adding speed makes the rungs travel toward the viewer
      var p = ((i / rows) + (speed % (1 / rows)) * rows / rows) % 1;
      var ease = Math.pow(p, 2.6);                 // perspective compression
      var y = hz + ease * (H - hz) * 1.25;
      if (y > H + 2) continue;

      var a = (1 - p) * 0.16;
      ctx.strokeStyle = 'rgba(34,197,94,' + a.toFixed(3) + ')';
      ctx.beginPath();
      ctx.moveTo(0, y);
      ctx.lineTo(W, y);
      ctx.stroke();
    }

    /* ── radiating verticals converging on the vanishing point ── */
    var cols = 26;
    for (var j = 0; j <= cols; j++) {
      var f = j / cols;                            // 0..1 across the screen
      var xBottom = (f - 0.5) * W * 3.4 + vpX;     // fanned out at the bottom
      var edge = Math.abs(f - 0.5) * 2;            // 0 centre → 1 edges
      var a2 = (1 - edge) * 0.13 + 0.02;

      ctx.strokeStyle = 'rgba(147,51,234,' + a2.toFixed(3) + ')';
      ctx.beginPath();
      ctx.moveTo(vpX, hz);
      ctx.lineTo(xBottom, H);
      ctx.stroke();
    }

    /* ── glow band along the horizon line ── */
    var g = ctx.createLinearGradient(0, hz - 60, 0, hz + 8);
    g.addColorStop(0, 'rgba(34,197,94,0)');
    g.addColorStop(1, 'rgba(34,197,94,0.11)');
    ctx.fillStyle = g;
    ctx.fillRect(0, hz - 60, W, 68);
  }

  function drawStars(t) {
    var hz = horizon();
    for (var i = 0; i < stars.length; i++) {
      var s = stars[i];
      if (s.y > hz) continue;                      // stars live in the sky only

      // parallax: deeper stars drift less as the page scrolls
      var y = s.y - (scrollY * 0.05 * s.z);
      if (y < -4) y += hz;                         // wrap within the sky band

      var twinkle = reduce ? 1 : (0.62 + 0.38 * Math.sin(t * 0.0014 + s.tw));
      var alpha = s.z * 0.55 * twinkle;
      var r = s.z * 1.5;

      ctx.fillStyle = 'rgba(226,232,240,' + alpha.toFixed(3) + ')';
      ctx.beginPath();
      ctx.arc(s.x, y, r, 0, Math.PI * 2);
      ctx.fill();
    }
  }

  function frame(t) {
    ctx.clearRect(0, 0, W, H);
    drawStars(t);
    drawGrid(t);
    raf = requestAnimationFrame(frame);
  }

  function start() { if (raf === null) raf = requestAnimationFrame(frame); }
  function stop()  { if (raf !== null) { cancelAnimationFrame(raf); raf = null; } }

  window.addEventListener('resize', resize, { passive: true });
  window.addEventListener('scroll', function () { scrollY = window.scrollY; }, { passive: true });
  document.addEventListener('visibilitychange', function () {
    document.hidden ? stop() : start();
  });

  resize();
  if (reduce) {
    // draw one static frame and leave it there
    ctx.clearRect(0, 0, W, H);
    drawStars(0);
    drawGrid(0);
  } else {
    start();
  }
})();
