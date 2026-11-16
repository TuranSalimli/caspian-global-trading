# Caspian Global Trading — Glass Packaging Catalog (React + Vite, frontend only)

## Run
    npm install
    npm run dev        # http://localhost:5173
    npm run build      # static site in dist/ (upload to any hosting)
    npm run preview    # preview the build

## Easy updates
- Company contacts / email: `src/config.js`
- Logo: replace `public/brand/logo-mark.png` and `logo-full.png`
- Colours / look: top of `src/styles.css` (`--blue`, `--blue-d` ...)
- Texts and translations (RU / EN / AZ): `src/i18n.js`
- Products: `src/data/products.json` — add an object, put its photo in `public/img/`:
    { "id":"cgt-new", "brand":"caspian", "name":"NEW", "cat":"spirits", "tier":"premium",
      "image":"cg-new.webp", "variants":[{"ml":500,"h":280,"d":70,"mass":500}] }
  Items without a photo get a bottle/jar outline: set `"shape":"jar"` or `"bottle"`. `cat`: spirits, vodka, wine, champagne, cognac, beer, soft, water, milk, oil, jars, pharma.

Data: one unified catalog — 45 + 162 + 4 additional items (supplier branding removed).
Note: "SATANDART" is spelled as in the source PDF (probably "STANDART").
