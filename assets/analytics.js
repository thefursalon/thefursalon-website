/* The Fur Salon — consent-gated tags
   ------------------------------------------------------------------
   TO GO LIVE: fill in the IDs below. Nothing loads until they are set,
   and nothing loads before the visitor has made a choice.

   Two categories, because they are genuinely different things:

     analytics  GA4. Counting. Nobody is retargeted because of it.
     marketing  Meta pixel. Builds an advertising profile of the visitor.

   Plenty of people will allow the first and refuse the second, and they
   are entitled to. One "accept everything" button would take the second
   consent without ever asking for it.
   ------------------------------------------------------------------ */
var TFS_GA4_ID   = 'G-LM56T7GDRL';   // property "The Fur Salon" (557378654), stream "Website"
var TFS_PIXEL_ID = '';   // e.g. '1234567890'
var TFS_CLARITY_ID = 'yx1ztj42o0'; // Microsoft Clarity project ID, e.g. 'abcd1234ef'. Heatmaps and recordings.

(function () {
  var KEY = 'tfs_consent';

  /* Stored as JSON: {"analytics":true,"marketing":false,"ts":...}
     Older visitors have a plain 'yes' or 'no' from the previous version;
     read those rather than asking them all over again. */
  function read() {
    var raw = null;
    try { raw = localStorage.getItem(KEY); } catch (e) {}
    if (!raw) return null;
    if (raw === 'yes') return { analytics: true,  marketing: true };
    if (raw === 'no')  return { analytics: false, marketing: false };
    try {
      var o = JSON.parse(raw);
      return { analytics: !!o.analytics, marketing: !!o.marketing };
    } catch (e) { return null; }
  }

  function write(c) {
    try {
      localStorage.setItem(KEY, JSON.stringify({
        analytics: !!c.analytics, marketing: !!c.marketing, ts: Date.now()
      }));
    } catch (e) {}
  }

  /* dataLayer + gtag exist immediately so events queue before consent
     and flush the moment it is granted. No lost conversions. */
  window.dataLayer = window.dataLayer || [];
  window.gtag = window.gtag || function () { dataLayer.push(arguments); };

  gtag('consent', 'default', {
    ad_storage: 'denied',
    ad_user_data: 'denied',
    ad_personalization: 'denied',
    analytics_storage: 'denied'
  });

  /* One helper the whole site calls. Works before and after consent.
     transport_type 'beacon' matters: most conversions here are a click on a
     wa.me link, which leaves the page (or hands off to the WhatsApp app) the
     same instant. A normal request gets cancelled in flight. A beacon is
     handed to the browser and survives the page closing. The old site's
     Google Ads tags died of exactly this. */
  window.tfsTrack = function (name, params) {
    params = params || {};
    params.transport_type = 'beacon';
    try { gtag('event', name, params); } catch (e) {}
    try {
      if (window.fbq) {
        /* Only a sent booking is a Lead. whatsapp_click fires on every book
           button tap, which opens the booking window first, so it is intent. */
        var std = { booking_submit: 'Lead', booking_start: 'InitiateCheckout' };
        if (std[name]) fbq('track', std[name], params);
        else fbq('trackCustom', name, params);
      }
    } catch (e) {}
  };

  function loadGA() {
    if (!TFS_GA4_ID || window.__tfsGA) return;
    window.__tfsGA = 1;
    var s = document.createElement('script');
    s.async = true;
    s.src = 'https://www.googletagmanager.com/gtag/js?id=' + TFS_GA4_ID;
    document.head.appendChild(s);
    gtag('js', new Date());
    gtag('config', TFS_GA4_ID, { anonymize_ip: true });
  }

  /* Clarity sets cookies and records sessions, so it belongs with analytics:
     it loads only after someone allows "Measuring the site". */
  function loadClarity() {
    if (!TFS_CLARITY_ID || window.__tfsCL) return;
    window.__tfsCL = 1;
    (function (c, l, a, r, i, t, y) {
      c[a] = c[a] || function () { (c[a].q = c[a].q || []).push(arguments); };
      t = l.createElement(r); t.async = 1; t.src = 'https://www.clarity.ms/tag/' + i;
      y = l.getElementsByTagName(r)[0]; y.parentNode.insertBefore(t, y);
    })(window, document, 'clarity', 'script', TFS_CLARITY_ID);
  }

  function loadPixel() {
    if (!TFS_PIXEL_ID || window.__tfsFB) return;
    window.__tfsFB = 1;
    !function (f, b, e, v, n, t, s) {
      if (f.fbq) return; n = f.fbq = function () {
        n.callMethod ? n.callMethod.apply(n, arguments) : n.queue.push(arguments);
      };
      if (!f._fbq) f._fbq = n; n.push = n; n.loaded = !0; n.version = '2.0'; n.queue = [];
      t = b.createElement(e); t.async = !0; t.src = v;
      s = b.getElementsByTagName(e)[0]; s.parentNode.insertBefore(t, s);
    }(window, document, 'script', 'https://connect.facebook.net/en_US/fbevents.js');
    fbq('init', TFS_PIXEL_ID);
    fbq('track', 'PageView');
  }

  function apply(c) {
    gtag('consent', 'update', {
      analytics_storage:   c.analytics ? 'granted' : 'denied',
      ad_storage:          c.marketing ? 'granted' : 'denied',
      ad_user_data:        c.marketing ? 'granted' : 'denied',
      ad_personalization:  c.marketing ? 'granted' : 'denied'
    });
    if (c.analytics) { loadGA(); loadClarity(); }
    if (c.marketing) loadPixel();
    /* The map is a Google embed, so it follows the Google decision.
       It also has its own click-to-load, so a refusal is not a dead end. */
    try { window.dispatchEvent(new CustomEvent('tfs:consent', { detail: c })); } catch (e) {}
  }

  /* Withdrawing consent has to be as easy as giving it, so every page carries
     a "Cookie settings" link in the footer that clears the answer and asks
     again. ?consent=reset does the same thing, which is handy for testing. */
  window.tfsConsentReset = function () {
    try { localStorage.removeItem(KEY); } catch (e) {}
    location.href = location.pathname;
  };

  document.addEventListener('click', function (e) {
    var a = e.target.closest && e.target.closest('.foot-cookies');
    if (!a) return;
    e.preventDefault();
    window.tfsConsentReset();
  });

  if (/[?&]consent=reset/.test(location.search)) {
    try { localStorage.removeItem(KEY); } catch (e) {}
  }

  /* Every outbound WhatsApp link is a conversion, not just the ones that go
     through the booking modal. Without this, the float button, the "say hello"
     link and the service-page CTAs are invisible, which would make the site
     look like it converts far worse than it does. */
  document.addEventListener('click', function (e) {
    var a = e.target.closest && e.target.closest('a[href*="wa.me"]');
    if (!a) return;
    var where = a.className.indexOf('wa-float') > -1 ? 'float'
              : a.className.indexOf('btn') > -1 ? 'button' : 'link';
    window.tfsTrack('whatsapp_click', {
      placement: where,
      page: location.pathname,
      label: (a.textContent || '').trim().slice(0, 40)
    });
  }, true);

  var saved = read();
  if (saved) { apply(saved); return; }

  /* The ask. A modal rather than a corner bar, because a bar people scroll
     past is not really a choice and it leaves analytics measuring a
     self-selected minority. Refusing is exactly as easy as accepting:
     making refusal harder turns this into a cookie wall, which is not lawful. */
  var COPY = {
    en: {
      title: 'A quick question',
      text: 'We use a couple of cookies to see how the site is doing, and to show the map. Nothing loads until you choose. ',
      warm: 'We’re a small salon, so knowing which parts of the site are working is worth a lot to us.',
      link: 'Privacy', no: 'Decline', yes: 'Accept', choose: 'Choose what to allow',
      aria: 'Cookie choice', save: 'Save choices',
      catA: 'Measuring the site', catAd: 'How many people visit and how they use the pages. Google Analytics and Microsoft Clarity.',
      catM: 'Advertising', catMd: 'Lets us show ads to people who visited, and see if they worked. Meta.'
    },
    nl: {
      title: 'Heel even',
      text: 'We gebruiken een paar cookies om te zien hoe de site het doet en om de kaart te tonen. Er laadt niets voordat je kiest. ',
      warm: 'We zijn een kleine salon, dus weten welke delen van de site werken is veel waard voor ons.',
      link: 'Privacy', no: 'Weigeren', yes: 'Accepteren', choose: 'Zelf kiezen',
      aria: 'Cookiekeuze', save: 'Keuzes opslaan',
      catA: 'De site meten', catAd: 'Hoeveel mensen er komen en hoe ze de pagina’s gebruiken. Google Analytics en Microsoft Clarity.',
      catM: 'Advertenties', catMd: 'Hiermee kunnen we advertenties tonen aan bezoekers en zien of ze werken. Meta.'
    }
  };

  document.addEventListener('DOMContentLoaded', function () {
    var t = COPY[(document.documentElement.lang || 'en').slice(0, 2)] || COPY.en;
    var up = location.pathname.indexOf('/services/') > -1 ? '../' : '';

    var wrap = document.createElement('div');
    wrap.id = 'tfsConsentWrap';
    wrap.innerHTML =
      '<div id="tfsConsent" role="dialog" aria-modal="true" aria-label="' + t.aria + '">' +
        '<h2>' + t.title + '</h2>' +
        '<p>' + t.text + '<a href="' + up + 'privacy.html">' + t.link + '</a></p>' +
        '<p class="tfsc-warm">' + t.warm + '</p>' +
        '<div class="tfsc-detail" hidden>' +
          '<label class="tfsc-row"><input type="checkbox" class="tfsc-an" checked>' +
            '<span><b>' + t.catA + '</b>' + t.catAd + '</span></label>' +
          '<label class="tfsc-row"><input type="checkbox" class="tfsc-mk">' +
            '<span><b>' + t.catM + '</b>' + t.catMd + '</span></label>' +
        '</div>' +
        '<div class="tfsc-btns">' +
          '<button type="button" class="tfsc-no">' + t.no + '</button>' +
          '<button type="button" class="tfsc-yes">' + t.yes + '</button>' +
        '</div>' +
        '<button type="button" class="tfsc-more">' + t.choose + '</button>' +
      '</div>';
    document.body.appendChild(wrap);

    var yes    = wrap.querySelector('.tfsc-yes');
    var no     = wrap.querySelector('.tfsc-no');
    var more   = wrap.querySelector('.tfsc-more');
    var detail = wrap.querySelector('.tfsc-detail');
    var an     = wrap.querySelector('.tfsc-an');
    var mk     = wrap.querySelector('.tfsc-mk');
    var open   = false;

    function close(c) {
      write(c);
      document.body.classList.remove('tfs-ask');
      wrap.classList.remove('corner');
      wrap.classList.remove('on');
      setTimeout(function () { wrap.remove(); }, 400);
      apply(c);
    }

    yes.addEventListener('click', function () {
      close(open ? { analytics: an.checked, marketing: mk.checked }
                 : { analytics: true, marketing: true });
    });
    no.addEventListener('click', function () {
      close({ analytics: false, marketing: false });
    });
    more.addEventListener('click', function () {
      open = true;
      detail.hidden = false;
      more.hidden = true;
      yes.textContent = t.save;
      an.focus();
    });

    /* Keep focus inside the dialog. Without this a keyboard user tabs straight
       into a page they have not yet consented to. */
    wrap.addEventListener('keydown', function (e) {
      if (e.key !== 'Tab') return;
      var f = [no, yes];
      if (open) f = [an, mk, no, yes]; else f = [more, no, yes];
      f = f.filter(function (el) { return el && !el.hidden; });
      var i = f.indexOf(document.activeElement);
      e.preventDefault();
      f[(i + (e.shiftKey ? -1 : 1) + f.length) % f.length].focus();
    });

    /* Escape is deliberately not wired up: closing without choosing is not
       one of the options. */

    /* Two stages. It arrives quietly in the corner while they are still
       looking at the hero, so the first impression is not a grey wall. If it
       is still unanswered a few seconds later it slides to the middle and
       blocks, because an unanswered consent banner is not consent.
       Only the transform changes between the two, so the move animates. */
    var hasSplash = !!document.getElementById('tfsSplash');
    var CORNER_AT = hasSplash ? 2800 : 600;    // just as the intro clears
    var CENTRE_AT = CORNER_AT + 7000;          // long enough to read the hero

    function corner() {
      wrap.classList.add('corner', 'on');
    }

    function centre() {
      if (!document.body.contains(wrap)) return;
      wrap.classList.remove('corner');
      document.body.classList.add('tfs-ask');
      no.focus();
    }

    setTimeout(corner, CORNER_AT);
    setTimeout(centre, CENTRE_AT);
  });

})();
