# The Fur Salon website

Static site (HTML, CSS, vanilla JS), no build step. Vercel serves the folder as is (see `vercel.json`).

- `index.html`, `services/`, `privacy.html`: English
- `nl/`: Dutch
- `assets/`: scripts, fonts, media, brand files
- `assets/analytics.js`: consent-gated Google Analytics 4 and Microsoft Clarity (public IDs only, no secrets)
- `assets/booking.js`: booking window that opens WhatsApp

No API keys or environment variables are used.
