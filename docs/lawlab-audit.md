# Law Lab website audit

**Reference:** https://lawlab.com.bd/<br />
**Audited:** 30 August 2026<br />
**Method:** Public HTML (Ember Fastboot SSR), compiled router in `web-app-*.js`, production CSS, and public JSON:API at `/api/*`. Visual inspection of homepage, contact, about, team, services, stories, media, photos, appointment, policy, 404, and sign-in.

This rebuild must reproduce the **public UX and design system**. It must **not** copy proprietary logos, photographs, lawyer biographies, case files, PDFs, or verbatim marketing copy. Admin/CMS routes are documented but not rebuilt.

---

## 0. Reference stack (for reconstruction, not for cloning)

| Layer | Observed |
| ----- | -------- |
| App | Ember.js SPA + Fastboot SSR (`modulePrefix: web-app`) |
| Data | JSON:API (`/api/services`, `/api/members`, `/api/stories`, …) |
| Assets | `https://asset.lawlab.com.bd` |
| Media storage | `https://law-lab.s3.ap-southeast-1.amazonaws.com` |
| Auth | Google OAuth (`/sign-in`) + token endpoint `/api/tokens` (admin only) |
| Captcha | Google reCAPTCHA v2 on appointment |
| Analytics | Google Analytics UA-204845723-1 |
| Errors | Sentry |
| Video | YouTube embeds + Plyr |
| Maps | Google Maps iframe / “Open with Google Map” link |

**This project:** Next.js 16 (App Router) + TypeScript + Tailwind CSS 4. Restore that architecture; do not introduce Ember.

---

## 1. Route inventory

### 1.1 Public marketing routes (implement)

| Route | Page type | Status | Notes |
| ----- | --------- | ------ | ----- |
| `/` | Homepage | Live | Intro, 3 feature blocks, featured-posts slider, banner, appointment/contact CTAs |
| `/about` | CMS page | Live | Title “About Us”, long body + hero image (16:9-ish) |
| `/team` | Listing | Live | Members grouped by designation |
| `/members/:slug` | Detail | Live | Photo, name, credentials, designation, body, contact |
| `/services/criminal-lawyer` | Service category | Live | Title pattern “Criminal Lawyer Services”; lists Criminal services |
| `/services/constitutional-law-attorney` | Service category | Live | Constitutional cluster |
| `/services/civil-litigation-lawyer` | Service category | Live | Civil cluster |
| `/services/family-law-attorney` | Service category | Live | Family cluster |
| `/services/company-lawyer` | Service category | Live | Company cluster |
| `/services/pro-bono-lawyer` | Service category | Live | Pro bono cluster; SEO title “Pro Bono Lawyer in Bangladesh” |
| `/services/:service_id` | Service detail | Live | UUID id (not slug). Title, numbered heading, body, related cases |
| `/stories` | Listing | Live | Paginated cards; `?page=` |
| `/stories/:slug` | Article | Live | Image, title, body, optional document |
| `/precedents` | Listing | Live | Same card template as stories |
| `/precedents/:slug` | Article | Live | Same detail template |
| `/research` | Listing | Live | Same card template |
| `/research/:slug` | Article | Live | Same detail template |
| `/videos` | Listing | Live | YouTube thumbnail cards |
| `/videos/:slug` | Video detail | Live | Player + title/body |
| `/media/print` | Listing | Live | Category filter `Print`; paginator |
| `/media/print/:slug` | Media detail | Live | Image, excerpt/body, optional outbound link + PDF |
| `/media/electronic` | Listing | Live | Category `Electronic`; often YouTube `video-id` |
| `/media/electronic/:slug` | Media detail | Live | Player or article layout |
| `/photos` | Folder listing | Live | Album grid of folders |
| `/photos/:slug` | Album | Live | Photos inside folder |
| `/appointment` | Form | Live | Name, contact no, email, appointment time + reCAPTCHA |
| `/successful-appointment/:appointment_id` | Success | Live | Post-submit confirmation |
| `/contact` | Contact | Live | Map image, hours, two addresses, phones, emails |
| `/policy` | CMS page | Live | Privacy-style policy body |
| `/terms-and-conditions` | CMS page | Live | Terms body |
| `/sign-in` and `/signin` | Auth UI | Live | “Sign in with Google” — **admin gate**, not a public product feature |
| unknown path | 404 | Live | “Page Not Found” + Go Back + Home |

CMS sitemap page (`pages` slug `sitemap`) lists older aliases that 404 or redirect:

| Alias | Maps to |
| ----- | ------- |
| `/services/criminal` | `/services/criminal-lawyer` |
| `/services/constitutional` | `/services/constitutional-law-attorney` |
| `/services/civil` | `/services/civil-litigation-lawyer` |
| `/services/family-law` | `/services/family-law-attorney` |
| `/services/company` | `/services/company-lawyer` |
| `/services/pro-bono` | `/services/pro-bono-lawyer` |

Implement aliases as redirects.

There is **no** public `/services` index (bare `/services` 404s). Services are reached only via the header dropdown.

There is **no** `/we` index. “We” is a dropdown (About, Team).

### 1.2 Auth-gated (do not implement backend; optional shell UI only)

All `/admin/*` CRUD: dashboard, roles, permissions, users, pages, services, members, stories, precedents, research, videos, media-appearances, appointments, folders, photos, featured-posts, banners, embed-photos, embed-files.

Public rebuild should **not** recreate the CMS. `/sign-in` may show the Google button UI but must not impersonate Google OAuth.

### 1.3 Error routes in Ember

`/error-pages/401`, `/403`, `/404`, `/500`, `/520`, plus wildcard unknown-route. Public users only see the styled 404.

### 1.4 API-backed content counts (public JSON:API, first page)

| Resource | Observed count (page 1) | Notes |
| -------- | ----------------------- | ----- |
| services | 20 | UUID routes; grouped by practice area |
| members | 20 | slug + designation |
| designations | 13 | Head of Chambers → Court Assistants |
| stories | 14 | mix of published true/false |
| precedents | 9 | all published in sample |
| research | 20 | more exist; paginated |
| videos | 20 | YouTube ids |
| media_appearances | 20 | `category`: Print \| Electronic |
| folders | 20 | photos albums; positions up to 54+ |
| photos | 20 | belong to folders |
| pages | 4 | about, policy, terms, sitemap |
| banners | 1 | book promo (900×600) |

### 1.5 Header / footer link graph

**Header**

| Item | Type | Target |
| ---- | ---- | ------ |
| Logo + wordmark | link | `/` |
| We | dropdown | About → `/about`, Team → `/team` |
| Services | dropdown | 6 category routes above |
| Resources | dropdown | `/stories`, `/precedents`, `/research`, `/videos` |
| Media | dropdown | `/media/print`, `/media/electronic` |
| Photos | direct | `/photos` |
| Eng / বাংলা | locale toggle | localStorage `en-gb` \| `bn-bd`, then full reload |
| Hamburger | mobile only | full-screen / overlay menu |

**Footer**

| Item | Target |
| ---- | ------ |
| Contact Us | `/contact` |
| Policy | `/policy` |
| Terms and Conditions | `/terms-and-conditions` |
| LinkedIn | `https://www.linkedin.com/company/lawlabbd` |
| Twitter/X | `https://twitter.com/lawlabbd` |
| Facebook | `https://www.facebook.com/lawlabbd` |
| YouTube | `https://www.youtube.com/channel/UCxEf1ERzxY5EfQtrDEae7Zw` |
| Credit | “Corpo Visuals” → `https://corpovisuals.com` |

**Homepage in-body links:** `/stories`, `/precedents`, `/research`, `/appointment`, `/contact`.

---

## 2. Component inventory

Reusable pieces observed on the public site (rebuild as React Server/Client components).

| Component | Where used | Notes |
| --------- | ---------- | ----- |
| **SiteHeader** | All pages | Black bar; desktop 50vh header block on home, compact on inner pages |
| **DesktopNav** | ≥992px | Uppercase items, ember-basic-dropdown hover/click |
| **NavDropdown** | We / Services / Resources / Media | In-place dropdown; keyboard `role="button"` |
| **LanguageSwitcher** | Header | Two 50px tiles; selected = light grey on black inverted |
| **MobileMenuButton** | <992px | SVG hamburger; `display:none` on desktop |
| **MobileNav** | Overlay/drawer | Same links stacked; language switcher inside |
| **BrandLogo** | Header | Square emblem, 12vh desktop / 35px compact |
| **BrandWordmark** | Header | Wide SVG, 30vw, absolute bottom of hero header |
| **SiteFooter** | All pages | Black, links + social icons + credit |
| **PageHeader** | Inner pages | Large display title (Alfa Slab One) |
| **CompactContainer** | Global | max-width 1600px, 15px gutters |
| **HomeIntro** | Home | 50vh split: 40% copy left, image right |
| **FeatureTrio** | Home | CSS grid 6×6; giant Bebas numbers 01–03; gold underline |
| **FeaturedSlider** | Home | Tiny-slider of featured posts (story/precedent/research/video/media) |
| **HomeBanner** | Home | Single promotional image (book) |
| **CtaPair** | Home | Two full-bleed boxes: Appointment (filled) + Contact (outlined) |
| **ServiceCard** | Category pages | Numbered title + excerpt; 80% width on small screens |
| **ContentCard** | Stories/precedents/research/media | Image + title + excerpt |
| **VideoCard** | Videos + electronic media | 16:9 thumb + play affordance |
| **PhotoFolderCard** | `/photos` | Folder cover + title |
| **PhotoGrid** | Album | Masonry/grid of images |
| **MemberCard** | Team | Portrait + name + designation |
| **MemberProfile** | Member detail | Large portrait, stacked credentials |
| **ArticleBody** | CMS/HTML bodies | Justified serif/sans article prose |
| **Breadcrumb** | Admin + some inner | `breadcrumb-item`; public pages often title-only |
| **Paginator** | Listings | Centered; `page` query; 12 per page public |
| **AppointmentForm** | `/appointment` | 4 fields + recaptcha disclaimer |
| **SuccessState** | Appointment success | Centered confirmation |
| **ContactBlock** | `/contact` | Map, two columns of addresses, separator, tel/email |
| **MapEmbed** | Contact | Aspect box `padding-bottom: 45.83%` (~24:11) |
| **Modal/Dialog** | Rare on public | ember-modal-dialog exists; public uses dropdowns more than modals |
| **LoadingSpinner** | Lazy images/models | CSS spinner over aspect-ratio placeholder |
| **404View** | Unknown routes | Heading, message, Go Back, Home |
| **GoogleSignInButton** | `/sign-in` | Google logo + label |
| **SocialIconRow** | Footer | LinkedIn, X, Facebook, YouTube |
| **LangAwareText** | Everywhere | `title` / `title-bn`, `body` / `body-bn` |

---

## 3. Design system

Extracted from production CSS (`web-app-*.css`) and Fastboot HTML. Bootstrap 4 variables are present; the **visual brand** overrides them to black/gold.

### 3.1 Fonts

| Role | Family | Source |
| ---- | ------ | ------ |
| Display headings, CTA boxes | **Alfa Slab One** (700) | Self-hosted `@font-face`; Google Fonts equivalent is licensed OFL |
| Nav, giant numbers, compact UI | **Bebas Neue** | Self-hosted; OFL equivalent |
| Bangla + UI fallback | **Noto Sans Bengali** | Self-hosted; OFL |
| Body / article | System sans: `-apple-system, BlinkMacSystemFont, "Segoe UI", Helvetica, Arial` | — |
| Display stack (boxed titles) | `NotoSansBengali, AlfaSlabOne, Georgia, Cambria, "Times New Roman", Times, serif` | Bangla first so bn glyphs win |
| Number stack | `NotoSansBengali, BebasNeue, …sans-serif` | |

Weights in use: 300, 400, 500, 700.

### 3.2 Type scale (public surfaces)

Fluid `calc(rem + vw)` is the primary scale (desktop clamps to large rem).

| Token | Fluid | Approx desktop clamp | Usage |
| ----- | ----- | -------------------- | ----- |
| Nav / lang | `calc(.83125rem + .03375vw)` → `1rem` | 13–16px | Lang tiles, compact chrome |
| Body / intro | `calc(.9715rem + .2862vw)` → `2.4025rem` | ~16px → ~38px | Home intro paragraph |
| CTA box | `calc(1.10364rem + .52405vw)` → `3.72388rem` | ~18px → ~60px | “Get an Appointment” |
| Feature title | `calc(1.30845rem + .89271vw)` → `5.77201rem` | ~21px → ~92px | “Our Stories” |
| Feature number | `calc(3.5047rem + 4.84596vw)` → `27.73rem` | huge | “01” |
| Page titles | Alfa Slab One, large | Inner “About Us”, “Stories” | |
| Small | `.875rem`, `13px`, `15px` | Captions, form hints | |

Line heights: nav `1em`; feature titles `1.3em`; numbers `.9em`. Intro copy is comfortable paragraph leading (~1.4–1.6 visually).

Letter-spacing: nav is **uppercase**, tracking tight (Bebas-like). Body is normal.

### 3.3 Color palette

| Token | Hex | Use |
| ----- | --- | --- |
| Primary / canvas inverse | `#000` | Header, footer, appointment CTA fill, `--primary` |
| Paper | `#fff` | Page background, selected lang tile text inverse |
| Gold accent | `#e8a412` | Active nav, number underline, Plyr, list rules, focus |
| Mute 1 | `#e2e2e2` | Selected language background, chrome |
| Mute 2 | `#b8b8b8` | Footer links, nav hover |
| Mute 3 | `#aaa` / `#999` | Secondary icons |
| Body text (Bootstrap) | `#212529` | Default body |
| Success | `#12a16d` | Form success / Bootstrap override |
| Danger | `#a12f1f` | Validation |
| Grey | `#6c757d` | Muted |
| Dark | `#343a40` | — |
| Light | `#f8f9fa` | Surfaces |
| Hairline | `#dee2e6`, `#e9ecef` | Borders |

Page background is **white**. Chrome is **black**. Accent is **gold**, used sparingly (active state, underlines), not as large fills except media player.

### 3.4 Surfaces, radius, shadow, borders

| Token | Value |
| ----- | ----- |
| Border radius (brand) | **0** on most public UI (sharp) |
| Pills / player | `100px`, `50%`, `100%` (Plyr only) |
| Form controls | `2px`–`4px` (Bootstrap leftovers) |
| Header compact shadow | `0 1px 10px rgba(0,0,0,.2)` |
| Focus ring (Bootstrap) | `0 0 0 .2rem rgba(0,0,0,.25)` |
| Contact CTA | `2px solid #000` |
| Gold rule | `1px solid #e8a412` under feature numbers and some list headers |
| Footer link | `#b8b8b8` on `#000` |

### 3.5 Spacing and container

| Token | Value |
| ----- | ----- |
| Compact container | `width: 100%; margin-inline: auto` |
| Max width | **1600px** at large; **95%** then **100%** stepping down |
| Gutter | **15px** left/right |
| Feature section padding | 10% inline desktop; 3% smaller |
| Feature item margin-bottom | 80px (stacked) |
| CTA box padding | `30px 50px` |
| CTA grid gap | 20px |
| Header logo padding-top | 8vh (home hero) |
| Compact header height | **55px**, padding `0 12px` |
| Logo mark | 12vh × 12vh home; **35×35px** compact |
| Wordmark | 30vw, `bottom: -1px` of hero |
| Intro image / copy gap | 30px when stacked |
| Intro copy | width 40%, margin-top 7%, margin-left 5% |
| Lang tile | 50px wide, 5px padding (4px on small) |

Images use the **padding-bottom aspect-ratio box** pattern (`padding-bottom: 100%` logo, `19.07%` wordmark, `41.67%` banner ~12:5, `45.83%` map).

### 3.6 Grid

- Home features: `grid-template-columns/rows: repeat(6, 1fr)` then **block stack** below ~991px.
- CTA pair: `repeat(2, 1fr)` → `auto` (single column).
- Listings: 12-column Bootstrap-style `grid` component with props `xl=4, lg=4, md=6, sm=6` → **3 columns** ≥1200, **2 columns** tablet, **1 column** ≤575 (`_xs-12`).
- Breakpoints in CSS vars: xs 0, sm **576**, md **768**, lg **992**, xl **1200**, plus **1400** (`lg-max: 1400px - 1`). Extra: 480, 1024, 1399, 2600.

### 3.7 Buttons

| Variant | Look |
| ------- | ---- |
| Appointment CTA | Black fill, white Alfa Slab type, full cell, centered two-line copy |
| Contact CTA | White fill, 2px black border, black type, same type size |
| Nav item | Uppercase, white, 20px padding, 700; hover `#b8b8b8`; active `#e8a412` |
| Lang | 50×~28px, black bg / `#e2e2e2` text; selected inverted |
| Menu | Borderless, transparent, icon only |
| Form submit | Dark/black rectangular (Bootstrap `.btn` restyled to `#000`) |
| Google sign-in | White/light with Google G icon + “Sign in with Google” |
| Text links | Gold or grey; footer grey |

Heights are content-driven, not a fixed 40px system, except compact header 55px and lang tiles.

---

## 4. Responsive rules

Primary collapse is **991px** (orientation portrait **or** max-width 991px). Secondary: 767, 575, 1199, 1399.

### Header

| Width | Behavior |
| ----- | -------- |
| 1920 / 1440 / 1280 | Hero header `height: 50vh` on home; logo 12vh; nav flex + 40px offset; wordmark 30vw bottom-left; hamburger hidden |
| 1024 | Still desktop nav if ≥992 |
| 768 / 430 / 390 / 375 | Desktop nav `height: auto; padding-bottom: 84px` then compact: nav links `display:none`, hamburger `display:block`, logo 35px, wordmark hidden or mobile-brand-name shown, header wrapper `height: 55px` **fixed** top, `z-index: 100`, black + shadow |

Sticky compact bar: `._wrapper_1p59tk` is `position: fixed; top: 0`. A `._sticky-nav` class exists but is `display: none` in the served CSS (scroll-spy may toggle it; treat compact header as always-fixed on small, and home hero + overlapping compact on large).

### Home intro

| Width | Behavior |
| ----- | -------- |
| ≥992 | Row: copy 40% width, image remaining; height 50vh |
| <992 | `flex-direction: column-reverse`; copy 90% width; gap 30px; padding-bottom 50px; height auto |

### Feature trio

| Width | Behavior |
| ----- | -------- |
| ≥992 | 6-column CSS grid, large numbers, 10% side padding |
| <992 | Block stack, 80px gaps, 3% padding; numbers still large but constrained |

### CTA pair

| Width | Behavior |
| ----- | -------- |
| ≥768 | Two equal columns, 20px gap |
| <768 | Single column, full width |

### Listings / cards

| Width | Columns |
| ----- | ------- |
| ≥1400 / 1200 | 3 (xl/lg = 4/12) |
| 768–1199 | 2 (md/sm = 6/12) |
| ≤575 | 1 |
| Service cards | width 80% at ≤767 |

### Footer

| Width | Behavior |
| ----- | -------- |
| ≥992 | Flex row, space-between, white on black |
| <992 | Column, 15px vertical padding |

### Contact map

Keep aspect box; full compact-container width. “Open with Google Map” overlay/link.

### Forms

Single column, full width of compact container. Touch targets ≥44px on mobile (reference is slightly tighter on lang tiles — rebuild should meet 44px for a11y even if reference is 50×~28).

### Overflow

No horizontal scroll: images `max-width: 100%`, containers 100%/95%, grids wrap. Giant type uses `vw` so it can get huge on 1920 — that is intentional on the feature numbers.

### Breakpoint checklist (rebuild targets)

| Viewport | Header | Home | Lists |
| -------- | ------ | ---- | ----- |
| 375 × 812 | Compact + hamburger | Stacked intro, stacked features, stacked CTAs | 1 col |
| 390 × 844 | Same | Same | 1 col |
| 430 × 932 | Same | Same | 1 col |
| 768 × 1024 | Compact or mid | Stacked; CTA may still be 2-col at 768 | 2 col |
| 1024 | Desktop nav | Split intro, grid features, 2-col CTA | 2–3 col |
| 1280 | Desktop | Full home composition | 3 col |
| 1440 × 900 | Desktop | Full | 3 col |
| 1920 × 1080 | Desktop | Full, 1600px max | 3 col |

---

## 5. Interaction inventory

### Hover

- Nav links: white → `#b8b8b8`
- Active route: `#e8a412`
- Dropdown trigger: cursor pointer; opens menu (hover and/or click — ember-basic-dropdown)
- Footer links: lighten
- Cards: image/title click through; slight opacity or no lift (mostly **no shadow lift** — flat)
- CTA boxes: entire cell is a link; no strong transform
- Language unselected: pointer; selected: `cursor: default`

### Focus

- Dropdown triggers: `tabindex="0"`, `aria-expanded`, `aria-owns`
- Plyr: dotted 3px gold outline
- Buttons: Bootstrap focus ring (black 25% or gold on player)
- Rebuild: visible `:focus-visible` using gold `#e8a412` outline, 2px offset

### Active / pressed

- Lang selected inverts fill
- Nav current page gold
- Mobile menu button toggles overlay

### Dropdowns

- Four header mega-simple lists (not mega-menus with images)
- `ember-basic-dropdown-trigger--in-place`
- Keyboard: Enter/Space on trigger
- Click-outside to close

### Mobile menu

- Hamburger replaces nav <992px
- Full list of the same destinations + language
- No desktop leftover overflow

### Modals

- Public: none required except possibly image lightbox on photos (if present, simple overlay)
- Admin modal-dialog: out of scope

### Animation / motion

- Featured posts: **slider** (tiny-slider) — prev/next, slide
- Lazy image: spinner then fade-in when loaded
- Dropdown: short open/close
- No heavy parallax
- `prefers-reduced-motion: reduce` is already in vendor CSS — honor it (disable slider autoplay if any, use instant menu)

### Scroll

- Home: long page; header compact/fixed on small
- Listings: `preserveScrollPosition` true in Ember pagination — **keep scroll on page change** or reset to top of grid (match: stay near paginator)
- No scroll-jacking

### Forms

Appointment fields (validated):

| Field | Rules |
| ----- | ----- |
| name | required, 3–100 |
| contactNo | required, 3–50 |
| email | required, email format, 3–100 |
| appointmentTime | required, 3–60 (free-text datetime, not a native picker only) |

- reCAPTCHA + disclaimer
- Submit → POST appointment → navigate to `/successful-appointment/:id`
- Rebuild: client validation + mock success route (no Law Lab API writes)

Sign-in: Google OAuth only (admin). Do not implement token login.

### Navigation

- Client-side in Ember; rebuild with Next.js `<Link>`
- Locale is **not** in the URL. Stored in localStorage (`ember-local-storage` settings.locale). Switching **reloads the page**.
- Rebuild: cookie or localStorage + `next-intl`-style dictionary **without** adding a heavy i18n framework if a small context suffices. Keep `en-gb` / `bn-bd`.

### Search / filter

- **No public site search**
- Media lists filter by category (Print vs Electronic) via route, not a UI filter chip
- Admin has filters — out of scope

### Pagination

- Query `page` (1-based), public `perPage` **12**
- Centered paginator under grids
- Stories/research/videos/photos/media

### Empty / loading / error

- Loading: CSS spinner in aspect-ratio frame (featured slider, images)
- Empty: listings simply show fewer cards; no illustrated empty state observed
- 404: “Page Not Found” / “We cannot seem to find the page you are looking for.” + Go Back + Home
- Unpublished stories exist in API (`published: false`) — **do not list** them

### Images / media

- Responsive derivative sizes: 50–6000px keys on JSON images
- 16:9 thumbs for video/media (~1280×704)
- Member portraits
- Folder covers
- Homepage hero photo (lazy)
- Book banner 900×600
- Rebuild: original placeholders with the **same aspect ratios**, `next/image`, no stretching

### Icons

- Custom SVG: menu, social, Google logo, brand mark
- Not a Lucide-heavy UI. Use Lucide only where it matches (menu, social) or inline SVGs for fidelity

### SEO metadata pattern

Every Fastboot page:

- `<title>{Page} \| Law Lab` or `Law Lab`
- `meta description` (home: “A leading law firm in Dhaka, Bangladesh.”)
- `rel=canonical`
- OG: site_name, title, description, url, type=website, image `logo-banner.png` 1200×650
- Twitter: `@lawlabbd`, `summary_large_image`
- JSON-LD `@type: Attorney` on home (address, geo, telephone, hours)
- Favicon PNG from asset host

Per-route titles observed: About, Team, Stories, Precedents, Research, Videos, Photos, Appointment, Contact, Policy, In Print Media, In Electronic Media, `{Name} | Law Lab`, `{Service} | Law Lab`.

### Accessibility gaps on reference (fix in rebuild)

- Lang controls are `div role="button"` not `<button>`
- Some headings skip levels (h5 on contact)
- Color contrast of `#b8b8b8` on `#000` is borderline
- Appointment form SSR is an empty `<form>` until JS hydrates
- Rebuild should use real buttons, labels, `htmlFor`, `aria-expanded`, skip link, 44px targets

---

## 6. Homepage section sequence (do not stop early)

1. **Black header / brand** — logo, nav, language, (home) giant wordmark
2. **Intro** — firm paragraph + hero image
3. **Feature trio** — 01 Our Stories → `/stories`; 02 200 Years Precedents → `/precedents`; 03 Research and Analysis → `/research`
4. **Featured posts slider** — mixed content types
5. **Promo banner** — single image (book)
6. **CTA pair** — Appointment | Contact Us
7. **Footer**

---

## 7. Service / content architecture

### Services

- **Category pages** (6) list services whose practice area matches.
- **Detail pages** use UUID: `/services/{uuid}`.
- Fields: `title`, `title-bn`, `excerpt`, `body` (HTML), `cases` (HTML), `position`.
- Detail heading style: `#### 01 {Title}` (zero-padded index).
- Related **Cases** subsection when `cases` is present.

Sample English titles (structure only; **do not copy case narratives**): Service Matter; Custody and Guardianship; Pro Bono; Civil Appeal & Civil Miscellaneous Appeal; Company Incorporation; Death Sentence; Imprisonment for the Rest of Natural Life; Drafting MOA/AOA; Marriage; Land Survey Tribunal; Civil Revision; Mergers and Acquisitions; Public University; Imprisonment for Life; Title & Possession; Divorce; Restitution of Conjugal Right; Winding up; Bar Council Exam; ADR.

### Content templates (one UI, many types)

| Type | List route | Detail | Card media |
| ---- | ---------- | ------ | ---------- |
| story | `/stories` | `/stories/:slug` | image |
| precedent | `/precedents` | `/precedents/:slug` | image |
| research | `/research` | `/research/:slug` | image |
| video | `/videos` | `/videos/:slug` | YouTube |
| media print | `/media/print` | `/media/print/:slug` | image + optional PDF/link |
| media electronic | `/media/electronic` | `/media/electronic/:slug` | YouTube or image |
| photo folder | `/photos` | `/photos/:slug` | cover |
| member | `/team` | `/members/:slug` | portrait |

Separate **data** (`src/data/*`) from **presentation** (`src/components/*`).

### Team

Grouped by designation order: Head of Chambers, Senior Counsel, Counsels, Senior Associate, Co-Ordinator Pro Bono, Associates, Research Associates, Special Assistant, Senior Clerk, IT Assistant, Computer Operator, Court Assistants, Office Assistant.

---

## 8. Multilingual

| Locale | Code | UI label |
| ------ | ---- | -------- |
| English | `en-gb` | Eng |
| Bangla | `bn-bd` | বাংলা |

- Not in the path.
- Fields: `*-bn` on API records; ember-intl for chrome strings (`get-an`, `appointment`, nav labels).
- Switching reloads and re-renders all chrome + bodies.
- Rebuild: `LocaleProvider` + dictionaries for chrome; content records with `en` / `bn` keys.

---

## 9. Existing project architecture

Git `HEAD` is **Create Next App** (Next 16.2.10, React 19, Tailwind 4, App Router, `src/app`). Working tree currently has those files **deleted**. Restore from git, then extend:

```
src/app/                 # routes (App Router)
src/components/          # header, footer, cards, forms
src/lib/                 # locale, cn, metadata helpers
src/data/                # original replacement content
public/                  # original marks, placeholders
src/app/globals.css      # tokens
```

Do **not** add Ember, Bootstrap, or the reference API as a live backend.

---

## 10. Implementation constraints

1. Reproduce layout, type, color, interaction, and IA.
2. Original copy, original/placeholder images, original mark (same geometry: square emblem + wide wordmark).
3. No admin CMS, no Google OAuth, no writes to lawlab.com.bd.
4. Appointment: local validation + success page with generated id.
5. Cover every public route in §1.1 including 404 and sign-in shell.
6. Bilingual chrome + sample bn strings.
7. QA at 375 / 390 / 430 / 768 / 1024 / 1280 / 1440 / 1920.

---

## 11. Audit gaps

- Dropdown panels are not in Fastboot HTML (placeholders until client JS). Labels inferred from router + API categories.
- Sticky-header-on-scroll at large breakpoints is ambiguous (`._sticky-nav { display:none }`). Match compact-on-mobile + tall home header on desktop.
- Full photo album counts exceed first API page; rebuild uses a representative set.
- Exact inner padding of dropdown lists and card hover was not pixel-measured in a browser device lab; first implementation will be CSS-accurate then visually QA’d against the live site at 1440 and 375.
- Browser automation was not available in this session; audit used SSR HTML, CSS, JS router, and JSON:API.
