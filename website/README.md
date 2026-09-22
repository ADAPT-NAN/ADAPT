# ADAPT-Nan website draft

A responsive, local website based on the two documents supplied in the parent ADAPT folder. The original Word files are unchanged.

## Preview

Open `index.html` directly in a browser, or run `npm start` from this folder and visit http://localhost:4173. Node.js is needed only for the preview server; there are no package dependencies to install. The server listens only on this computer. To change the port, use `PORT=4174 npm start`.

## Included

- Homepage and project overview
- Nine research topics with full source descriptions, theme filters, and keyword search
- University, high school, and community learning pathways
- 2026 publication outline, clearly identified as planned
- Searchable directory of 27 team members and their institutions
- Supplied project logo, partner artwork, and curriculum illustration
- Mobile navigation, keyboard focus styles, skip link, and search result announcements

## Files to edit

- `app.js`: page templates, learning descriptions, publication outline, resource status
- `content/data.js`: English research descriptions and team directory
- `content/th.js`: complete Thai research translations and source-provided Thai team names
- `content/translations.js`: Thai interface and page-copy translations, keyed by English wording
- `i18n.js`: language persistence, localized data, and reversible text/accessible-label translation
- `styles.css`: design and responsive layouts
- `assets/`: artwork extracted from the architecture document and an original SVG landscape illustration
- `content/architecture.txt` and `content/publication-plan.txt`: extracted source text for reference

The website uses plain HTML, CSS, and JavaScript, with hash-based routes so all pages also work without a hosting rewrite configuration. Google Fonts supplies DM Sans and Manrope when online; local fallback fonts are included in the styling. Core functionality does not require an external service.

## Source and editorial notes

Primary sources:
- `../ADAPT-Nan Website Architecture.docx`
- `../ADAPT Publication Plan_2026.docx`

Research descriptions and English team names follow the architecture document. Website summaries are adapted from those documents. The publication cover uses illustrative working wording, not an approved book title. The supplied curriculum graphic describes 45 hours, 3 credits, 16 online hours, and a 29-hour field block across seven days; enrollment details remain unconfirmed.

The supplied URL https://en.ird.fr/psf-adaptmod-2025-2027 was checked on 22 September 2026. It describes ADAPTMOD in Côte d’Ivoire, a different project. Its project information and contacts were not incorporated into ADAPT-Nan.

## Awaiting content

- Project contact email and confirmed office addresses
- Serious-game repository, paper library, and YouTube URLs
- Final curriculum downloads, schedules, and enrollment information
- Approved publication title, release details, and downloadable materials
- Project field photographs, if desired in place of the landscape illustration

These areas are explicitly marked as coming soon. No simulated submissions, invented contact details, or placeholder external links are used. Use the EN / ไทย switch in the header to change language. The preference is saved locally when browser storage is available. Switching preserves the current page, search text, research filter, and expanded publication sections. Search accepts Thai and English in either language. Thai team names follow the source document. Original logos and the curriculum artwork retain their embedded text; the curriculum content and image description are translated alongside the original English image.

## Validation

Run `npm run check` for JavaScript syntax checks.

Checked in the Codex browser: research filtering and keyword search, research detail navigation, 27-member team directory and institution search, learning pathway navigation, publication accordion, and mobile menu. Mobile layouts at 390 px were checked for horizontal overflow on the homepage, overview, research, a research detail, all learning pathways, resources, and team page. No broken loaded images or browser console errors were observed. The desktop homepage was visually reviewed at 1440 px.

This is a local draft; it has not been published and has no backend, CMS, or email sending service. For static hosting, upload `index.html`, `styles.css`, `app.js`, `i18n.js`, `assets/`, and all three JavaScript files in `content/`; the source-text reference files and preview server are not required.

Bilingual validation: checked translation coverage across all pages and all nine research articles, Thai/English switching, reload persistence, bilingual research and institution searches, and preservation of search/filter state. Thai browser title, document language, placeholders, accessible labels, and image descriptions are localized.
