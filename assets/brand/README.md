# The Fur Salon — logo files

All built from the dog mark already on the website, set in Cinzel, the same
typeface as the site. Text is converted to outlines, so these open correctly in
Canva, Word, Instagram, and at a print shop without anyone needing the font.

Start by looking at `_all-profile-pictures.png` and `_all-lockups.png`. Those are
just previews of everything, so Anna can point at one.

---

## For WhatsApp and Instagram profile pictures

`profile-pictures/` — all 1000×1000 PNG, already square, safe to crop to a circle.

**Recommended: `avatar-01-mark-cream-on-olive.png`.**

The dog on its own, no text. That's not a shortcut, it's the right call: WhatsApp
shows a profile picture at about 40 pixels in a chat list and Instagram at about
56 in the feed. At that size a name is a grey smudge, and both apps print the
business name next to the picture anyway, so the text would be saying something
already on screen.

The versions with the name (`06`, `07`, `08`) are there because they read well on
the full Instagram profile page and on a WhatsApp Business profile someone has
opened deliberately. If you want one picture for everything, use `01`.

Worth knowing: `02-mark-olive-on-cream` is the weakest at small sizes, because the
cream background disappears into the white of a chat list.

## For banners, headers and print

`lockups/` — SVG and 2400px PNG.

- `lockup-horizontal-*` — wide. Facebook cover, email signature, letterhead,
  a sign above the door, the top of a price card.
- `lockup-stacked-*` — square-ish. Instagram story covers, square posts,
  stamps, business cards, a sticker on a bag.
- `wordmark-only-olive` — mark and name without the tagline, for when
  "tailored grooming" is already said nearby.

Colour naming is `ink-on-background`. So `cream-on-olive` means a cream logo with
an olive background baked in. The ones without a background are transparent, and
will pick up whatever they're placed on.

## For placing on photos

`mark-only/` — the dog alone on transparency, 1600px wide.

Use `mark-cream-transparent` on a dark photo, `mark-ink-transparent` on a light one.

---

## Colours

| Name | Hex | Where it's used |
|---|---|---|
| Olive | `#4A5340` | the site's nav, the main brand green |
| Deep | `#3A4133` | a darker olive, for contrast |
| Cream | `#F6F3EA` | the site background |
| Ink | `#2A2E24` | body text, nearly black |
| Clay | `#C0764A` | a clay orange, accent only, never the whole logo on its own |

## Typeface

Cinzel (Google Fonts, free). Weight 500 for the name, 400 for the tagline.

---

## One note for whoever edits the site

`assets/logo-lockup.svg` uses live `<text>` with a Google Fonts import. That looks
right in a browser and silently falls back to Georgia everywhere else. There is
now an outlined version at `lockups/logo-lockup-outlined.svg` that renders the same
in every tool. The old file has been left alone, so swapping it is a decision, not
something that happened by accident.
