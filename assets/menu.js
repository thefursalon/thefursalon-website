/* The Fur Salon — mobile menu
   Builds itself from the existing nav links, so there is only ever one
   list of links to maintain. Language comes from <html lang>. */
(function () {
  var nav = document.getElementById('nav');
  if (!nav) return;
  var links = nav.querySelector('.nav-links');
  var cta = nav.querySelector('.nav-end .btn');
  if (!links) return;

  var nl = (document.documentElement.lang || 'en').slice(0, 2) === 'nl';
  var T = nl
    ? { open: 'Menu openen', close: 'Menu sluiten', label: 'Menu' }
    : { open: 'Open menu', close: 'Close menu', label: 'Menu' };

  var btn = document.createElement('button');
  btn.type = 'button';
  btn.className = 'burger';
  btn.setAttribute('aria-label', T.open);
  btn.setAttribute('aria-expanded', 'false');
  btn.setAttribute('aria-controls', 'tfsMenu');
  btn.innerHTML = '<span></span><span></span>';

  var end = nav.querySelector('.nav-end');
  (end || nav.querySelector('.nav-in')).appendChild(btn);

  var panel = document.createElement('div');
  panel.id = 'tfsMenu';
  panel.className = 'mmenu';
  panel.setAttribute('aria-hidden', 'true');
  panel.setAttribute('role', 'dialog');
  panel.setAttribute('aria-modal', 'true');
  panel.setAttribute('aria-label', T.label);

  var inner = document.createElement('div');
  inner.className = 'mmenu-in';
  [].forEach.call(links.querySelectorAll('a'), function (a) {
    var c = a.cloneNode(true);
    c.className = '';
    inner.appendChild(c);
  });
  if (cta) {
    var b = cta.cloneNode(true);
    b.className = 'btn';
    inner.appendChild(b);
  }
  panel.appendChild(inner);
  document.body.appendChild(panel);

  var open = false;
  var lastY = 0;

  function focusables() {
    return [].slice.call(panel.querySelectorAll('a[href],button')).concat([btn]);
  }

  function set(state) {
    open = state;
    panel.classList.toggle('on', state);
    btn.classList.toggle('on', state);
    panel.setAttribute('aria-hidden', state ? 'false' : 'true');
    btn.setAttribute('aria-expanded', state ? 'true' : 'false');
    btn.setAttribute('aria-label', state ? T.close : T.open);
    if (state) {
      lastY = window.scrollY;
      document.body.classList.add('mlock');
      var f = panel.querySelector('a');
      if (f) setTimeout(function () { f.focus(); }, 240);
    } else {
      document.body.classList.remove('mlock');
      btn.focus();
    }
  }

  btn.addEventListener('click', function () { set(!open); });

  panel.addEventListener('click', function (e) {
    if (e.target.closest('a')) set(false);
  });

  document.addEventListener('keydown', function (e) {
    if (!open) return;
    if (e.key === 'Escape') { set(false); return; }
    if (e.key !== 'Tab') return;
    var f = focusables();
    if (!f.length) return;
    var first = f[0], last = f[f.length - 1];
    if (e.shiftKey && document.activeElement === first) { e.preventDefault(); last.focus(); }
    else if (!e.shiftKey && document.activeElement === last) { e.preventDefault(); first.focus(); }
  });

  /* if the viewport grows past the breakpoint while open, close it
     so the desktop nav is never left behind a stuck overlay */
  window.addEventListener('resize', function () {
    if (open && window.innerWidth > 900) set(false);
  });
})();
