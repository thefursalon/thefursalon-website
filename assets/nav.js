/* The Fur Salon: navigation behaviour
   1. On pages with a video hero, the bar is transparent over the hero and turns solid cream after it.
   2. The link of the section you are in gets a clay underline.
   3. A small live line: open now / opens at, from the salon hours (Mon to Sat, 9:00 to 17:00, Amsterdam time). */
(function () {
  var nav = document.getElementById('nav');
  if (!nav) return;
  var nl = (document.documentElement.lang || 'en').slice(0, 2) === 'nl';

  /* 1. transparent over the hero */
  var hero = document.querySelector('header.hero');
  if (hero && 'IntersectionObserver' in window) {
    document.documentElement.classList.add('nav-hero');
    nav.classList.add('over');
    window.__tfsHeroIO = new IntersectionObserver(function (es) {
      nav.classList.toggle('over', es[0].isIntersecting);
    }, { rootMargin: '-76px 0px 0px 0px', threshold: 0 });
    window.__tfsHeroIO.observe(hero);
  }

  /* 2. active section */
  var map = {};
  [].forEach.call(nav.querySelectorAll('.nav-links a[href^="#"]'), function (a) {
    var s = document.querySelector(a.getAttribute('href'));
    if (s) map[s.id] = a;
  });
  var ids = Object.keys(map);
  if (ids.length && 'IntersectionObserver' in window) {
    var io = new IntersectionObserver(function (es) {
      es.forEach(function (e) {
        if (e.isIntersecting) {
          ids.forEach(function (id) { map[id].classList.toggle('on', id === e.target.id); });
        }
      });
    }, { rootMargin: '-45% 0px -50% 0px' });
    ids.forEach(function (id) { io.observe(document.getElementById(id)); });
  }

  /* 3. open now */
  function status() {
    var parts = new Intl.DateTimeFormat('en-GB', { timeZone: 'Europe/Amsterdam', weekday: 'short', hour: '2-digit', minute: '2-digit', hour12: false })
      .formatToParts(new Date());
    var get = function (t) { return (parts.filter(function (p) { return p.type === t; })[0] || {}).value; };
    var day = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].indexOf(get('weekday'));
    var mins = parseInt(get('hour'), 10) * 60 + parseInt(get('minute'), 10);
    var openDay = day >= 1 && day <= 6;
    if (openDay && mins >= 540 && mins < 1020) return { open: true, t: nl ? 'Vandaag open tot 17:00' : 'Open today till 17:00' };
    if (openDay && mins < 540) return { open: false, t: nl ? 'Vandaag open vanaf 9:00' : 'Opens today 9:00' };
    if (day >= 1 && day <= 5) return { open: false, t: nl ? 'Morgen open vanaf 9:00' : 'Opens tomorrow 9:00' };
    if (day === 6) return { open: false, t: nl ? 'Maandag open vanaf 9:00' : 'Opens Monday 9:00' };
    return { open: false, t: nl ? 'Morgen open vanaf 9:00' : 'Opens tomorrow 9:00' };
  }
  var s = status();
  var home = document.querySelector('header.hero') ? '' : (location.pathname.indexOf('/services/') > -1 ? '../index.html' : 'index.html');
  function make() {
    var a = document.createElement('a');
    a.className = 'nav-status' + (s.open ? ' is-open' : '');
    a.href = home + '#contact';
    a.textContent = s.t;
    return a;
  }
  var end = nav.querySelector('.nav-end');
  if (end) end.insertBefore(make(), end.firstChild);
  [].forEach.call(document.querySelectorAll('[data-status]'), function (el) { el.textContent = s.t; el.classList.toggle('is-open', s.open); });
  var menu = document.querySelector('#tfsMenu .mmenu-in');
  if (menu) menu.insertBefore(make(), menu.firstChild);
})();

/* Smooth scroll for links to a section on the same page.
   CSS scroll-behavior alone gets cut off on iPhone when the mobile menu
   closes in the same tap, so the scroll is started here, one frame after
   the menu has let go of the page. Reduced motion = instant jump. */
(function () {
  var still = window.matchMedia && matchMedia('(prefers-reduced-motion: reduce)').matches;
  document.addEventListener('click', function (e) {
    if (e.defaultPrevented || e.button !== 0 || e.metaKey || e.ctrlKey || e.shiftKey) return;
    var a = e.target.closest && e.target.closest('a[href*="#"]');
    if (!a || a.target === '_blank') return;
    var url = new URL(a.href, location.href);
    if (url.origin !== location.origin || url.pathname.replace(/index\.html$/, '') !== location.pathname.replace(/index\.html$/, '')) return;
    var id = decodeURIComponent(url.hash.slice(1));
    var el = id ? document.getElementById(id) : null;
    if (!el && id !== 'top') return;
    e.preventDefault();
    requestAnimationFrame(function () {
      var go = { behavior: still ? 'auto' : 'smooth', block: 'start' };
      if (el) el.scrollIntoView(go); else window.scrollTo({ top: 0, behavior: go.behavior });
      if (history.replaceState) history.replaceState(null, '', '#' + id);
    });
  });
})();

/* Smooth wheel scrolling (desktop only), in the spirit of Lenis.
   The wheel moves a target; the page eases towards it every frame, so a
   notched mouse wheel glides instead of jumping 100px at a time.
   Left alone: touch screens, reduced motion, pinch-zoom (ctrl+wheel),
   sideways scrolling, anything that scrolls by itself (booking window,
   gallery, menu) and moments when the page is locked behind a dialog. */
(function () {
  if (!window.requestAnimationFrame) return;
  if (window.matchMedia && (matchMedia('(prefers-reduced-motion: reduce)').matches || matchMedia('(hover: none)').matches)) return;
  var root = document.documentElement, body = document.body;
  var target = window.scrollY, current = window.scrollY, running = false, last = 0;
  var EASE = 0.1; // share of the remaining distance covered per 60fps frame

  function max() { return Math.max(0, root.scrollHeight - window.innerHeight); }
  function locked() {
    return body.style.overflow === 'hidden' || /\b(mlock|tfs-ask|locked)\b/.test(body.className) ||
           getComputedStyle(body).overflowY === 'hidden';
  }
  function scrollsItself(el, dy) {
    for (; el && el !== body && el !== root; el = el.parentElement) {
      var oy = getComputedStyle(el).overflowY;
      if ((oy === 'auto' || oy === 'scroll') && el.scrollHeight > el.clientHeight + 1) {
        if (dy < 0 ? el.scrollTop > 0 : el.scrollTop + el.clientHeight < el.scrollHeight - 1) return true;
      }
    }
    return false;
  }
  function frame(t) {
    var dt = last ? Math.min(64, t - last) : 16.7; last = t;
    var k = 1 - Math.pow(1 - EASE, dt / 16.7);
    current += (target - current) * k;
    if (Math.abs(target - current) < 0.5) current = target;
    window.scrollTo(0, Math.round(current));
    if (current !== target) requestAnimationFrame(frame);
    else { running = false; last = 0; root.style.scrollBehavior = ''; }
  }
  window.addEventListener('wheel', function (e) {
    if (e.defaultPrevented || e.ctrlKey || locked()) return;
    if (Math.abs(e.deltaX) > Math.abs(e.deltaY)) return;
    if (scrollsItself(e.target, e.deltaY)) return;
    var dy = e.deltaY * (e.deltaMode === 1 ? 16 : e.deltaMode === 2 ? window.innerHeight : 1);
    e.preventDefault();
    if (!running) { current = window.scrollY; target = current; }
    target = Math.max(0, Math.min(max(), target + dy));
    if (!running) {
      running = true;
      root.style.scrollBehavior = 'auto'; // the CSS smooth setting would fight the per-frame steps
      requestAnimationFrame(frame);
    }
  }, { passive: false });
  /* keyboard, scrollbar drag or a link moved the page: start from there next time */
  window.addEventListener('scroll', function () { if (!running) { current = target = window.scrollY; } }, { passive: true });
})();

/* Hero logo docks into the nav.
   On the homepage the big dog mark and "THE FUR SALON" ride up with the
   scroll, shrink and slide into the logo spot in the centre of the bar.
   Two stand-ins live inside the (fixed) nav, so nothing gets clipped by
   the hero; the real hero logo is hidden while they fly. When they land,
   the bar turns cream and they cross-fade into the real nav logo.
   Reduced motion: the old behaviour (logo appears when the hero ends). */
(function () {
  var nav = document.getElementById('nav');
  var hero = document.querySelector('header.hero');
  var box = hero && hero.querySelector('.hero-mark');
  var hMark = box && box.querySelector('.heromark');
  var hName = box && box.querySelector('.hero-name');
  var nMark = nav && nav.querySelector('.logo .mark');
  var nName = nav && nav.querySelector('.logo .lw');
  if (!hMark || !hName || !nMark || !nName || !window.requestAnimationFrame) return;
  if (window.matchMedia && matchMedia('(prefers-reduced-motion: reduce)').matches) return;
  if (window.__tfsHeroIO) window.__tfsHeroIO.disconnect();

  var layer = document.createElement('div');
  layer.className = 'dock';
  layer.setAttribute('aria-hidden', 'true');
  var fMark = hMark.cloneNode(true);
  fMark.removeAttribute('class');
  var fName = document.createElement('div');
  fName.textContent = (hName.firstChild && hName.firstChild.nodeValue || 'THE FUR SALON').trim();
  layer.appendChild(fMark); layer.appendChild(fName);
  nav.appendChild(layer);

  var M = {}, ready = false, ticking = false;
  function c(el) { var r = el.getBoundingClientRect(); return { x: r.left + r.width / 2, y: r.top + r.height / 2, w: r.width, h: r.height }; }
  function px(v) { return parseFloat(v) || 0; }
  function measure() {
    var sy = window.scrollY, a = c(hMark), b = c(hName), m = c(nMark), n = c(nName);
    var hs = getComputedStyle(hName), ns = getComputedStyle(nName);
    M = {
      mark: { x: a.x, y: a.y + sy, w: a.w, h: a.h, tx: m.x, ty: m.y, s: m.w / a.w },
      name: { x: b.x, y: b.y + sy, tx: n.x, ty: n.y, fs: px(hs.fontSize), s: px(ns.fontSize) / px(hs.fontSize),
              ls0: px(hs.letterSpacing), ls1: px(ns.letterSpacing) }
    };
    M.D = Math.max(80, M.name.y - M.name.ty);
    fMark.style.cssText = 'position:absolute;left:0;top:0;width:' + a.w + 'px;height:' + a.h + 'px;color:#F3EFE4;transform-origin:50% 50%;will-change:transform';
    fName.style.cssText = 'position:absolute;left:0;top:0;white-space:nowrap;font-family:' + hs.fontFamily + ';font-weight:' + hs.fontWeight +
      ';font-size:' + M.name.fs + 'px;line-height:' + hs.lineHeight + ';color:#F3EFE4;transform-origin:50% 50%;will-change:transform';
    ready = true;
  }
  function lerp(a, b, t) { return a + (b - a) * t; }
  function render() {
    ticking = false;
    if (!ready) return;
    var sy = window.scrollY, p = Math.min(1, Math.max(0, sy / M.D)), e = p * p * (3 - 2 * p);
    var flying = sy > 0 && p < 1, docked = p >= 1;
    nav.classList.toggle('over', !docked && hero.getBoundingClientRect().bottom > 76);
    nav.classList.toggle('docked', docked);
    hMark.style.visibility = hName.style.visibility = sy > 0 ? 'hidden' : '';
    layer.style.opacity = docked ? '0' : sy > 0 ? '1' : '0';
    var fade = Math.max(0, 1 - p * 1.6);
    box.style.opacity = fade; box.style.visibility = fade < 0.02 ? 'hidden' : '';
    if (!(flying || docked)) return;
    var k = M.mark, pm = Math.min(1, p * 1.3), em = pm * pm * (3 - 2 * pm); // the mark slides aside a little earlier so it clears the name
    var cy = lerp(k.y - sy, k.ty, p), cx = lerp(k.x, k.tx, em), s = lerp(1, k.s, em);
    fMark.style.transform = 'translate(' + (cx - k.w / 2) + 'px,' + (cy - k.h / 2) + 'px) scale(' + s + ')';
    fMark.style.filter = 'drop-shadow(0 8px 26px rgba(0,0,0,' + (0.45 * (1 - e)).toFixed(3) + '))';
    var q = M.name, s2 = lerp(1, q.s, e);
    fName.style.letterSpacing = lerp(q.ls0, q.ls1 / q.s, e) + 'px';
    fName.style.textShadow = '0 3px 22px rgba(0,0,0,' + (0.5 * (1 - e)).toFixed(3) + ')';
    var w = fName.offsetWidth, h = fName.offsetHeight;
    fName.style.transform = 'translate(' + (lerp(q.x, q.tx, e) - w / 2) + 'px,' + (lerp(q.y - sy, q.ty, p) - h / 2) + 'px) scale(' + s2 + ')';
  }
  function req() { if (!ticking) { ticking = true; requestAnimationFrame(render); } }
  function start() { measure(); render(); }
  /* wait for the hero entrance animation and the web fonts before measuring */
  var go = function () { setTimeout(start, 1700); };
  if (document.fonts && document.fonts.ready) document.fonts.ready.then(go); else go();
  window.addEventListener('scroll', req, { passive: true });
  window.addEventListener('resize', function () { if (ready) { measure(); render(); } });
})();

/* Small motion: FAQ answers and "Read more" unfold to their height, and photos
   ease in with a slight zoom as they scroll into view. Reduced motion: instant. */
(function () {
  var still = window.matchMedia && matchMedia('(prefers-reduced-motion: reduce)').matches;
  var EASE = 'cubic-bezier(.2,.8,.2,1)';
  var can = !still && !!document.documentElement.animate;

  /* FAQ */
  [].forEach.call(document.querySelectorAll('details.faq'), function (d) {
    var sum = d.querySelector('summary');
    if (!sum) return;
    var running = null;
    sum.addEventListener('click', function (e) {
      if (!can) return;
      e.preventDefault();
      if (running) running.cancel();
      var cols = d.parentElement && parseInt(getComputedStyle(d.parentElement).columnCount, 10) > 1;
      var kids = [].slice.call(d.children).filter(function (k) { return k !== sum; });
      if (!d.open) {
        var h0 = d.offsetHeight; d.open = true; var h1 = d.offsetHeight;
        kids.forEach(function (k) { k.animate([{ opacity: 0, transform: 'translateY(-6px)' }, { opacity: 1, transform: 'none' }], { duration: 320, easing: EASE }); });
        if (!cols) { d.style.overflow = 'hidden'; running = d.animate([{ height: h0 + 'px' }, { height: h1 + 'px' }], { duration: 340, easing: EASE });
          running.onfinish = function () { d.style.overflow = ''; running = null; }; }
      } else {
        var a = d.offsetHeight, b = sum.offsetHeight;
        if (cols) { d.open = false; return; }
        d.style.overflow = 'hidden';
        running = d.animate([{ height: a + 'px' }, { height: b + 'px' }], { duration: 280, easing: EASE });
        kids.forEach(function (k) { k.animate([{ opacity: 1 }, { opacity: 0 }], { duration: 180, fill: 'forwards' }).onfinish = function () { this.cancel(); }; });
        running.onfinish = function () { d.open = false; d.style.overflow = ''; running = null; };
      }
    });
  });

  /* Read more (Who we are, on phones) */
  [].forEach.call(document.querySelectorAll('.more-toggle'), function (b) {
    var box = document.getElementById(b.getAttribute('aria-controls'));
    if (!box) return;
    b.addEventListener('click', function () {
      var o = b.getAttribute('aria-expanded') !== 'true';
      b.setAttribute('aria-expanded', o);
      b.textContent = o ? b.dataset.less : b.dataset.more;
      if (!can) { box.classList.toggle('open', o); return; }
      box.style.overflow = 'hidden';
      if (o) {
        box.classList.add('open');
        var h = box.offsetHeight;
        box.animate([{ height: '0px', opacity: 0 }, { height: h + 'px', opacity: 1 }], { duration: 460, easing: EASE }).onfinish = function () { box.style.overflow = ''; };
      } else {
        var h2 = box.offsetHeight;
        box.animate([{ height: h2 + 'px', opacity: 1 }, { height: '0px', opacity: 0 }], { duration: 360, easing: EASE }).onfinish = function () { box.classList.remove('open'); box.style.overflow = ''; };
      }
    });
  });

  /* Photos */
  if (!can || !('IntersectionObserver' in window)) return;
  var imgs = document.querySelectorAll('.photo img, .gal-item img, .sp-photo img, .c-photo img, .s-media img');
  if (!imgs.length) return;
  document.documentElement.classList.add('img-reveal');
  var io = new IntersectionObserver(function (es) {
    es.forEach(function (e) { if (e.isIntersecting) { e.target.classList.add('img-in'); io.unobserve(e.target); } });
  }, { rootMargin: '0px 0px -8% 0px', threshold: 0 });
  [].forEach.call(imgs, function (i) { io.observe(i); });
})();
