/* The Fur Salon — hero video playback
   ------------------------------------------------------------------
   iOS Low Power Mode, Safari's "Never Auto-Play" setting and some
   Android data-saver modes block AUTOPLAY. They do not block playback
   that a person started. So: try to autoplay, and if the browser
   refuses, start on the first thing the visitor does (a tap, a scroll,
   a key press). People touch or scroll within a second or two, so it
   reads as automatic.

   This is what sites with "video that plays even on low power" do.
   ------------------------------------------------------------------ */
(function () {
  var vids = [].slice.call(document.querySelectorAll('video.vcell, video.sp-vid'));
  if (!vids.length) return;

  /* If they've asked for less motion, leave the poster in place. */
  if (matchMedia('(prefers-reduced-motion: reduce)').matches) return;

  /* ---- phones play the hero clips one after another -------------------
     On desktop the three clips sit side by side and all loop. On a phone
     there is only room for one, so instead of hiding two thirds of the
     footage we show them in sequence: each clip plays once, then hands over
     to the next and the last hands back to the first. The cells are stacked
     and crossfaded by .is-live rather than display-toggled, because a
     display:none video cannot be primed and would stall on handover. */
  var hero = vids.filter(function (v) { return v.classList.contains('vcell'); });
  var mq = matchMedia('(max-width:759px)');
  var rotating = false;
  var at = 0;

  function active(v) {
    if (rotating && v.classList.contains('vcell')) return v.classList.contains('is-live');
    return getComputedStyle(v).display !== 'none';
  }

  function show(i) {
    at = (i + hero.length) % hero.length;
    hero.forEach(function (v, n) {
      if (n === at) {
        v.classList.add('is-live');
        try { v.currentTime = 0; } catch (e) {}
        var r = v.play(); if (r && r.then) r.then(null, function () {});
      } else {
        v.classList.remove('is-live');
        v.pause();
      }
    });
    /* warm up the next clip so the handover doesn't stall on a metadata-only
       preload, which is what the markup asks for by default */
    var next = hero[(at + 1) % hero.length];
    if (next && next.preload !== 'auto') { next.preload = 'auto'; next.load(); }
  }

  function onEnded() { show(at + 1); }

  function setRotation(on) {
    if (on === rotating) return;
    rotating = on;
    hero.forEach(function (v) {
      v.removeEventListener('ended', onEnded);
      if (on) {
        v.removeAttribute('loop');
        v.loop = false;
        v.addEventListener('ended', onEnded);
      } else {
        v.loop = true;
        v.classList.remove('is-live');
        var r = v.play(); if (r && r.then) r.then(null, function () {});
      }
    });
    if (on) show(0);
  }

  if (hero.length > 1) {
    setRotation(mq.matches);
    (mq.addEventListener ? mq.addEventListener.bind(mq, 'change') : mq.addListener.bind(mq))(
      function (e) { setRotation(e.matches !== undefined ? e.matches : mq.matches); }
    );
  }

  function visible(v) {
    return active(v);
  }

  function tryPlay() {
    var pending = 0;
    vids.forEach(function (v) {
      if (!visible(v) || !v.paused) return;
      pending++;
      var r = v.play();
      if (r && r.then) r.then(function () { pending--; }, function () {});
    });
    return pending;
  }

  function anyStalled() {
    return vids.some(function (v) { return visible(v) && v.paused; });
  }

  tryPlay();

  /* Only these events grant user activation, per the HTML spec's
     "activation triggering input event" list. scroll and wheel are NOT on it,
     which is why a trackpad scroll on a Mac cannot start a blocked video and a
     click can. touchstart is not on it either; touchend is, which is what a
     scroll gesture on a phone ends with. */
  var events = ['keydown', 'mousedown', 'pointerdown', 'pointerup', 'touchend'];
  function kick() {
    tryPlay();
    if (!anyStalled()) off();
  }
  function off() {
    events.forEach(function (e) {
      window.removeEventListener(e, kick, { passive: true, capture: true });
    });
    window.removeEventListener('mousemove', onMove);
  }
  events.forEach(function (e) {
    window.addEventListener(e, kick, { passive: true, capture: true });
  });

  /* Desktop has no activation event for wheel or trackpad scrolling, so a
     blocked clip cannot start from scrolling alone. Moving the mouse doesn't
     grant activation either, but it reliably precedes a click, so we use it
     to retry cheaply in case the restriction has since lifted. */
  var moves = 0;
  function onMove() {
    if (++moves < 3) return;
    window.removeEventListener('mousemove', onMove);
    kick();
  }
  window.addEventListener('mousemove', onMove, { passive: true });

  /* Coming back from another tab or unlocking the phone is also a
     moment where playback can resume. */
  document.addEventListener('visibilitychange', function () {
    if (!document.hidden) tryPlay();
  });

  /* Retry whenever the hero scrolls back into view. Scrolling is itself a
     user gesture, so this is often the moment a refused clip is allowed to
     start. This is the same approach the Shopify themes use. */
  if (window.IntersectionObserver) {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) {
        if (!e.isIntersecting) return;
        var v = e.target;
        if (visible(v) && v.paused) v.play().catch(function () {});
      });
    }, { threshold: 0.15 });
    vids.forEach(function (v) { io.observe(v); });
  }

  /* A clip that gets paused by the OS mid-scroll should pick itself up. */
  vids.forEach(function (v) {
    v.addEventListener('pause', function () {
      if (document.hidden || !visible(v)) return;
      setTimeout(function () { if (v.paused) v.play().catch(function () {}); }, 300);
    });
  });

  /* Give up quietly after a while so we're not listening forever. */
  setTimeout(function () { if (!anyStalled()) off(); }, 15000);
})();
