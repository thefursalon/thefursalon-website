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
    new IntersectionObserver(function (es) {
      nav.classList.toggle('over', es[0].isIntersecting);
    }, { rootMargin: '-76px 0px 0px 0px', threshold: 0 }).observe(hero);
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
    if (openDay && mins >= 540 && mins < 1020) return { open: true, t: nl ? 'Nu open, tot 17:00' : 'Open now, until 17:00' };
    if (openDay && mins < 540) return { open: false, t: nl ? 'Vandaag open vanaf 9:00' : 'Opens today at 9:00' };
    if (day >= 1 && day <= 5) return { open: false, t: nl ? 'Gesloten, morgen open vanaf 9:00' : 'Closed, opens tomorrow at 9:00' };
    if (day === 6) return { open: false, t: nl ? 'Gesloten, maandag open vanaf 9:00' : 'Closed, opens Monday at 9:00' };
    return { open: false, t: nl ? 'Gesloten, morgen open vanaf 9:00' : 'Closed, opens tomorrow at 9:00' };
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
