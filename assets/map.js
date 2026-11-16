/* The Fur Salon — click-to-load map
   ------------------------------------------------------------------
   A Google Maps iframe contacts Google and sets cookies the moment the
   page renders. That happens before anyone touches the cookie banner,
   and it keeps happening for people who press Decline, which makes the
   banner a promise the page doesn't keep.

   So the map ships as a static placeholder and only becomes an iframe
   when the visitor asks for it, either by accepting cookies or by
   clicking the map itself. A direct link to Google Maps is always
   available, so someone who never loads the embed can still get
   directions.
   ------------------------------------------------------------------ */
(function () {
  var slots = [].slice.call(document.querySelectorAll('.c-map[data-map]'));
  if (!slots.length) return;

  var LANG = (document.documentElement.lang || 'en').slice(0, 2);
  var COPY = {
    en: {
      title: 'Map loads from Google',
      body: 'Showing it sets Google cookies. Open it here, or use the link below.',
      show: 'Show the map',
      direct: 'Open in Google Maps'
    },
    nl: {
      title: 'Kaart komt van Google',
      body: 'Bij het tonen plaatst Google cookies. Open hem hier, of gebruik de link eronder.',
      show: 'Kaart tonen',
      direct: 'Openen in Google Maps'
    }
  };
  var T = COPY[LANG] || COPY.en;

  function load(slot) {
    if (slot.dataset.loaded) return;
    slot.dataset.loaded = '1';
    var f = document.createElement('iframe');
    f.src = slot.getAttribute('data-map');
    f.loading = 'lazy';
    f.title = slot.getAttribute('data-title') || 'Map';
    f.setAttribute('referrerpolicy', 'no-referrer-when-downgrade');
    slot.innerHTML = '';
    slot.appendChild(f);
  }

  function placeholder(slot) {
    var link = slot.getAttribute('data-link') || '#';
    var box = document.createElement('div');
    box.className = 'map-ask';
    box.innerHTML =
      '<div class="map-ask-in">' +
        '<b>' + T.title + '</b>' +
        '<p>' + T.body + '</p>' +
        '<button type="button" class="btn map-go">' + T.show + '</button>' +
        '<a class="map-direct" href="' + link + '" target="_blank" rel="noopener">' + T.direct + '</a>' +
      '</div>';
    box.querySelector('.map-go').addEventListener('click', function () { load(slot); });
    slot.appendChild(box);
  }

  /* The embed is Google's, so it follows the Google (analytics) decision.
     Consent is stored as JSON now; older visitors still have 'yes'/'no'. */
  function allowed() {
    var raw = null;
    try { raw = localStorage.getItem('tfs_consent'); } catch (e) {}
    if (!raw) return false;
    if (raw === 'yes') return true;
    if (raw === 'no') return false;
    try { return !!JSON.parse(raw).analytics; } catch (e) { return false; }
  }

  slots.forEach(function (slot) {
    if (allowed()) load(slot); else placeholder(slot);
  });

  /* If they allow it later in the same visit, the map appears without a second click. */
  window.addEventListener('tfs:consent', function (e) {
    var c = e.detail;
    if (c === true || (c && c.analytics)) slots.forEach(load);
  });
})();
