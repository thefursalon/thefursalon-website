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
