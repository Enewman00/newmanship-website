# PRD: Newmanship — Multi-App Marketing Website

## Overview

A marketing website for **Newmanship** — a parent brand covering four independent mobile apps. Built with **Astro 5** and **Tailwind CSS**, deployed as a static site optimized for SEO. The site exists purely to drive app store installs and organic search traffic. Privacy policies and terms live on each app's individual website — this site is marketing only.

**Site URL:** TBD (e.g., `newmanship.com` or similar)

---

## The Apps

### 1. Sumstone
- **Category:** Puzzle / Game
- **Tagline:** "The classic numbers puzzle — pick your tiles, reach the target, beat the clock."
- **Description:** Six numbers. One goal. Endless combinations. A calm, satisfying math puzzle inspired by the Countdown numbers round. No internet needed, no accounts, no pressure.
- **Platform:** iOS, Android (planned)
- **Design:** Warm parchment tones (`#F5F0E8` bg), Instrument Serif + DM Sans fonts
- **Key features:** Timed rounds, multiple difficulty levels, offline play, no ads

### 2. Stellar Habits
- **Category:** Productivity / Habit Tracker
- **Tagline:** "Your habits are stars waiting to be lit."
- **Description:** A habit tracker that replaces checkboxes with an interactive night sky. Hold your habits to watch them glow. A small, satisfying ritual that turns consistency into something beautiful.
- **Platform:** iOS
- **Design:** Dark celestial theme (`#050709` bg), Cormorant Garamond + Inter fonts, amber accents
- **Key features:** Hold-to-light ritual, personal constellations, year spiral, smart reminders, evening ritual mode, Pro tier

### 3. Choreganized
- **Category:** Productivity / Life Management
- **Tagline:** "Never Miss What Matters."
- **Description:** Stay on top of every chore, reminder, and recurring task — from car maintenance to home upkeep to personal health. Smart scheduling and clear priorities, all stored privately on your device.
- **Platform:** iOS, Android (planned)
- **Design:** Warm cream (`#FBF6EC` bg), Fraunces + Manrope fonts, indigo/coral/teal accents
- **Key features:** Recurring tasks, reminders, schedule management, on-device storage, priority system

### 4. Sprout Alarm
- **Category:** Lifestyle / Alarm Clock
- **Tagline:** "Wake up. Plant trees."
- **Description:** An alarm app where waking up earns eco points that fund real tree planting. 50% of subscription revenue goes to reforestation. Wake challenges make sure you're actually up.
- **Platform:** iOS (AlarmKit on iOS 26+), Android
- **Design:** Eco/nature theme, green accents
- **Key features:** Wake challenges (shake, math, word scramble), eco points, cosmetic themes, tree planting impact, Pro subscription

---

## Goals

1. **Drive organic search traffic** to each app's landing page via SEO-optimized content
2. **Increase app store installs** through compelling marketing pages with clear CTAs
3. **Establish brand presence** — Newmanship as a recognizable indie app studio
4. **Score 95+** on Lighthouse performance, accessibility, SEO, and best practices
5. **Rank for long-tail keywords** in each app's niche (habit tracker, math puzzle app, chore manager, eco alarm)

---

## Technical Decisions

| Decision | Choice | Rationale |
|---|---|---|
| Framework | Astro 5 | Zero JS by default, SSG, perfect Lighthouse scores, content collections |
| Styling | Tailwind CSS 4 | Utility-first, design system via CSS variables, dark mode support |
| Content | MDX via content collections | Type-safe blog posts, reusable components in markdown |
| Images | `astro:assets` (Sharp) | Automatic WebP/AVIF, responsive srcset, lazy loading |
| Analytics | Plausible | Privacy-focused, lightweight, no cookie banner needed |
| Deployment | Cloudflare Pages | Free tier, unlimited bandwidth, global edge CDN |
| Fonts | Self-hosted (subset) | Eliminate FOUT, faster loading than Google Fonts CDN |
| Icons | Inline SVG components | Zero network requests, styleable, accessible |

---

## Site Architecture

```
/                           Homepage — brand overview, app showcase grid, blog preview
/sumstone/                  Sumstone landing page
/stellar-habits/            Stellar Habits landing page
/choreganized/              Choreganized landing page
/sprout-alarm/              Sprout Alarm landing page
/blog/                      Blog listing page
/blog/[slug]/               Individual blog posts (MDX)
/sitemap-index.xml          Auto-generated sitemap
/robots.txt                 Crawl directives
/rss.xml                    Blog RSS feed
```

---

## SEO Strategy

### Structured Data (JSON-LD)

Every page gets:
- **Organization** schema in base layout (Newmanship brand)
- **BreadcrumbList** schema for navigation hierarchy
- **WebSite** schema with SearchAction on homepage

Each app landing page additionally gets:
- **SoftwareApplication** schema with `applicationCategory`, `operatingSystem`, `offers`, `aggregateRating`
- **FAQPage** schema for the FAQ section

Blog posts get:
- **Article** schema with author, datePublished, image

### Meta Strategy

- Unique `<title>` and `<meta description>` per page, keyword-optimized
- Open Graph tags (og:title, og:description, og:image, og:type)
- Twitter Card tags (summary_large_image)
- Canonical URLs on every page
- Smart App Banners: `<meta name="apple-itunes-app">` on each app page

### Content SEO

- **Hub-and-spoke model:** Each app page is a pillar; blog posts link back to relevant app pages
- **Long-tail keyword targeting:** Blog posts target problem-solution queries
  - "best offline math puzzle app"
  - "habit tracker without streaks"
  - "recurring chore reminder app"
  - "alarm app that plants trees"
- **FAQ sections** on each app page targeting question-based searches
- **Cross-app internal linking** where apps solve related problems

### Technical SEO

- Auto-generated sitemap via `@astrojs/sitemap`
- `robots.txt` allowing all crawlers
- Preloaded hero images (no lazy-load above fold)
- `font-display: swap` on all fonts
- Explicit `width`/`height` on all images (CLS prevention)
- Semantic HTML throughout (nav, main, article, section, aside)
- Core Web Vitals targets: LCP < 1.5s, INP < 100ms, CLS < 0.05

---

## Project Structure

```
src/
├── components/
│   ├── common/
│   │   ├── BaseHead.astro          # Meta tags, OG, structured data
│   │   ├── Header.astro            # Site nav with mobile hamburger
│   │   ├── Footer.astro            # Brand links, copyright
│   │   └── StructuredData.astro    # JSON-LD helper
│   ├── marketing/
│   │   ├── HeroSection.astro       # Full-width hero with CTA
│   │   ├── AppCard.astro           # App preview card for homepage grid
│   │   ├── FeatureGrid.astro       # 3-column feature showcase
│   │   ├── FeatureShowcase.astro   # Alternating image+text rows
│   │   ├── FAQSection.astro        # Accordion FAQ with schema
│   │   ├── CTASection.astro        # Download call-to-action band
│   │   ├── AppStoreBadges.astro    # iOS + Android store buttons
│   │   ├── TestimonialSection.astro # User quotes / app reviews
│   │   └── BlogPreview.astro       # Latest 3 posts for homepage
│   └── blog/
│       ├── BlogCard.astro          # Post preview card
│       ├── BlogPostLayout.astro    # Single post layout
│       └── TagList.astro           # Tag cloud / filter
│
├── layouts/
│   ├── BaseLayout.astro            # HTML shell, ViewTransitions
│   ├── AppLandingLayout.astro      # App page wrapper with schema
│   └── BlogLayout.astro            # Blog post wrapper with schema
│
├── pages/
│   ├── index.astro                 # Homepage
│   ├── sumstone/index.astro
│   ├── stellar-habits/index.astro
│   ├── choreganized/index.astro
│   ├── sprout-alarm/index.astro
│   ├── blog/
│   │   ├── index.astro             # Blog listing
│   │   └── [...slug].astro         # Dynamic blog post pages
│   ├── rss.xml.ts                  # RSS feed
│   └── robots.txt.ts               # Robots.txt
│
├── content/
│   ├── config.ts                   # Collection schemas
│   ├── blog/                       # MDX blog posts
│   └── apps/                       # App metadata JSON
│       ├── sumstone.json
│       ├── stellar-habits.json
│       ├── choreganized.json
│       └── sprout-alarm.json
│
├── styles/
│   └── global.css                  # Tailwind directives, custom properties
│
├── assets/
│   ├── images/                     # Processed by astro:assets
│   │   ├── app-icons/
│   │   ├── screenshots/
│   │   ├── og-images/
│   │   └── hero/
│   └── fonts/                      # Self-hosted font files
│
└── utils/
    └── seo.ts                      # Schema generators, meta helpers

public/
├── favicon.svg
└── apple-touch-icon.png

astro.config.mjs
tailwind.config.mjs
tsconfig.json
package.json
```

---

## Design System

The parent site needs its own identity that feels cohesive but doesn't clash with any individual app's brand.

### Parent Brand (Newmanship)

| Token | Value | Usage |
|---|---|---|
| Background | `#FAFAF8` | Page background (warm near-white) |
| Surface | `#F2F0EC` | Card/section backgrounds |
| Ink | `#1A1A1A` | Primary text |
| Ink Muted | `#6B6B6B` | Secondary text |
| Accent | `#2563EB` | Links, CTAs, interactive elements |
| Accent Hover | `#1D4ED8` | Hover states |

**Fonts:**
- Display: `Inter` (700) — clean, modern
- Body: `Inter` (400, 500) — readable at all sizes
- Mono: `JetBrains Mono` (400) — code snippets in blog

**General rules:**
- Light mode primary, with consideration for dark mode later
- Clean, minimal aesthetic — let the app screenshots be the visual stars
- Generous whitespace, clear hierarchy
- Mobile-first responsive design
- Each app section inherits a hint of that app's color palette as accent

---

## Phases

### Phase 1: Project Scaffold & Infrastructure

Set up the Astro project, tooling, deployment pipeline, and base components that everything else builds on.

#### Task 1.1: Initialize Astro project ✅ DONE (2026-05-12)
- `npm create astro@latest` with TypeScript strict
- Install integrations: `@astrojs/tailwind`, `@astrojs/mdx`, `@astrojs/sitemap`
- Configure `astro.config.mjs` with site URL, integrations, image optimization
- Set up `tailwind.config.mjs` with design system tokens
- Create `src/styles/global.css` with Tailwind directives, CSS custom properties, font-face declarations
- Create `tsconfig.json` with path aliases (`@/` → `src/`)
- Create `.gitignore` for Astro
- Note: Used Astro 4 + Tailwind v3 (Astro 5 + Tailwind v4 have Rust binary SIGILL issues on this ARM64 kernel)
- Note: Custom sitemap endpoint replaces @astrojs/sitemap (absolute path incompatibility)
- Also scaffolded base components, layouts, content collections, all app pages, and homepage (Tasks 1.3–1.5 partially complete)

#### Task 1.2: Self-host fonts ✅ DONE (2026-05-12)
- Subset Inter (400, 500, 700) and JetBrains Mono (400) to latin glyphs
- Place WOFF2 files in `src/assets/fonts/`
- Write `@font-face` declarations in `global.css` with `font-display: swap`
- Preload critical font files in BaseHead
- Note: Files placed in `public/fonts/` (not `src/assets/fonts/`) because CSS uses absolute `/fonts/` paths; `src/assets/` is processed by Vite and would produce hashed URLs incompatible with the static CSS declarations

#### Task 1.3: Base layout & common components ✅ DONE (2026-05-12)
- `BaseLayout.astro` — HTML shell, `<ViewTransitions />`, slot for content
- `BaseHead.astro` — charset, viewport, title, description, OG tags, Twitter cards, canonical URL, favicon, font preloads, analytics script tag
- `Header.astro` — sticky nav with logo, app links, blog link, mobile hamburger menu (CSS-only or minimal JS)
- `Footer.astro` — brand name, copyright, links to individual app websites
- `StructuredData.astro` — renders JSON-LD script tag from props
- Note: Completed as part of Task 1.1 scaffold

#### Task 1.4: SEO infrastructure ✅ DONE (2026-05-12)
- `src/utils/seo.ts` — helper functions to generate Organization, SoftwareApplication, Article, FAQPage, BreadcrumbList schemas
- `src/pages/robots.txt.ts` — dynamic robots.txt with sitemap reference
- `src/pages/rss.xml.ts` — RSS feed from blog collection
- Note: `@astrojs/sitemap` replaced with custom `sitemap-index.xml.ts` endpoint (absolute path bug in Astro 4)
- Note: Completed as part of Task 1.1 scaffold

#### Task 1.5: Content collections setup ✅ DONE (2026-05-12)
- `src/content/config.ts` — Zod schemas for `blog` (MDX) and `apps` (JSON data) collections
- Created all 4 app JSON files in `src/content/apps/` with full data
- Note: Completed as part of Task 1.1 scaffold

#### Task 1.6: Deployment pipeline ✅ DONE (2026-05-12)
- `public/_headers` — Cloudflare Pages `Cache-Control` headers: immutable for `/_astro/*` and `/fonts/*`, revalidate for HTML, moderate TTLs for feeds/sitemap; also sets security headers (X-Content-Type-Options, X-Frame-Options, Referrer-Policy)
- `.github/workflows/lighthouse.yml` — Lighthouse CI workflow runs on PRs and pushes to main; fails if any page scores below 95 on performance, accessibility, best-practices, or SEO
- `.lighthouserc.json` — Lighthouse CI config targeting all 5 key pages (`/`, `/sumstone/`, `/stellar-habits/`, `/choreganized/`, `/sprout-alarm/`) with 95+ score assertions
- Note: Cloudflare Pages project connection (GitHub repo → dashboard) is a manual one-time step

---

### Phase 2: Homepage

The main entry point — showcases all 4 apps, establishes the brand, and funnels visitors to individual app pages.

#### Task 2.1: Hero section ✅ DONE (2026-05-12)
- `HeroSection.astro` component — brand name, tagline ("Apps that make daily life a little better"), brief description
- Primary CTA: scroll to app grid
- Clean, minimal design with generous whitespace
- No lazy-loading on hero images (LCP optimization)
- Note: Component is prop-driven (tagline, description, ctaText, ctaHref) with sensible defaults; uses brand Tailwind tokens and inline SVG down-arrow on CTA

#### Task 2.2: App showcase grid ✅ DONE (2026-05-12)
- `AppCard.astro` component — app icon, name, tagline, category badge, "Learn more" link
- 2x2 grid on desktop, single column on mobile
- Each card uses a subtle tint of the app's brand color
- Cards link to `/[app-slug]/`
- Render from content collection data (loop over `apps` collection)
- Note: `AppCard` uses a luminance check to auto-select light/dark text based on each app's background color; inline `onmouseenter/leave` for dynamic border-color hover since Tailwind can't interpolate hex values at runtime; `APP_ORDER` array in `index.astro` controls display order since JSON collection has no order field

#### Task 2.3: Brand story section ✅ DONE (2026-05-12)
- Brief "About Newmanship" section — indie developer, craft-focused, privacy-first
- Keep it short: 2-3 sentences max
- Optional: small dev photo or illustrated avatar
- Note: Extracted to `BrandStory.astro` component; includes 3-column value pillars (Craft, Privacy, Simplicity) with inline SVG icons; accepts optional `avatarPath` prop for a dev photo when available

#### Task 2.4: Blog preview section ✅ DONE (2026-05-12)
- `BlogPreview.astro` — latest 3 blog posts as cards
- Each card: title, date, excerpt, "Read more" link
- "View all posts" link to `/blog/`
- Query from blog content collection, sorted by date, filter drafts
- Note: Section is conditionally rendered — hidden when blog collection is empty; renders once posts exist

#### Task 2.5: Homepage SEO ✅ DONE (2026-05-12)
- Page-specific meta title: "Newmanship — Apps That Make Daily Life Better"
- Meta description targeting brand + app category keywords
- Organization JSON-LD schema
- WebSite JSON-LD schema with `potentialAction` SearchAction
- OG image (create a branded 1200x630 image)
- Note: OG images generated with Pillow (Python) — `public/og/homepage.png` (1200x630, branded with app color strips) and `public/og/default.png` (fallback); `BaseHead.astro` default updated to `/og/default.png`; Organization schema enhanced with `logo` ImageObject; meta description is 159 chars targeting brand + all four app niches
- Note: `scripts/generate-og-images.py` regenerates the PNGs if brand colors change

---

### Phase 3: App Landing Pages

Four individual marketing pages — one per app. Each is an SEO-optimized landing page designed to convert visitors to app store installs.

#### Task 3.1: App landing page layout
- `AppLandingLayout.astro` — extends BaseLayout, adds SoftwareApplication JSON-LD, BreadcrumbList JSON-LD, smart app banner meta tag
- Accepts app data from content collection as props
- Consistent section structure: Hero → Features → How It Works → FAQ → Download CTA

#### Task 3.2: Sumstone landing page
- Hero: app icon, "Sumstone", tagline, description, App Store badge
- Feature showcase (3-4 features): timed puzzles, multiple difficulties, offline play, no ads/accounts
- "How to Play" section with brief visual explanation
- FAQ section (4-5 questions targeting search queries): "Is Sumstone free?", "Does Sumstone work offline?", "What is the Countdown numbers game?", "Is Sumstone available on Android?"
- Download CTA band with store badges
- SEO: title "Sumstone — Free Math Puzzle Game | Countdown Numbers", description targeting "math puzzle app", "countdown numbers game", "offline puzzle game"

#### Task 3.3: Stellar Habits landing page
- Hero: app icon, "Stellar Habits", tagline, description, App Store badge
- Feature showcase (6 features): hold-to-light, constellations, year spiral, smart reminders, evening ritual, Pro tier
- Visual section showing the night sky interface concept
- FAQ section: "How is Stellar Habits different from other habit trackers?", "What does hold-to-light mean?", "Is there a streak counter?", "What's included in Stellar Habits Pro?"
- Download CTA band
- SEO: title "Stellar Habits — Beautiful Habit Tracker for iOS", targeting "habit tracker app", "habit tracker without streaks", "mindful habit tracking"

#### Task 3.4: Choreganized landing page
- Hero: app icon, "Choreganized", tagline, description, store badges
- Feature showcase: recurring tasks, reminders, priority system, on-device privacy, smart scheduling
- Use-case section: "For your home", "For your health", "For your car" — showing versatility
- FAQ section: "Is my data stored on my device?", "Can I set recurring reminders?", "Is Choreganized free?", "Is Choreganized available on Android?"
- Download CTA band
- SEO: title "Choreganized — Smart Chore & Reminder Manager", targeting "chore reminder app", "recurring task manager", "home maintenance app"

#### Task 3.5: Sprout Alarm landing page
- Hero: app icon, "Sprout Alarm", tagline, description, store badges
- Feature showcase: wake challenges, eco points, tree planting impact, themes, AlarmKit integration
- Impact section: "How your mornings plant trees" — explain the 50% revenue → reforestation model
- FAQ section: "How does Sprout Alarm plant trees?", "What are wake challenges?", "Does Sprout Alarm work with Focus mode?", "What's included in Sprout Alarm Pro?"
- Download CTA band
- SEO: title "Sprout Alarm — Wake Up & Plant Trees", targeting "eco alarm app", "alarm app that plants trees", "alarm with wake challenges"

#### Task 3.6: App landing page shared components
- `FeatureShowcase.astro` — alternating left/right image+text rows for key features
- `FAQSection.astro` — accordion-style FAQ with FAQPage JSON-LD schema auto-generated from items
- `CTASection.astro` — full-width download band with store badges, app icon, and compelling copy
- `AppStoreBadges.astro` — official Apple/Google badge SVGs with proper links

---

### Phase 4: Blog System

Content marketing engine for long-tail SEO. Blog posts target problem-solution keywords and link back to relevant app pages.

#### Task 4.1: Blog infrastructure
- `BlogLayout.astro` — extends BaseLayout, adds Article JSON-LD, reading time estimate, author info, prev/next post navigation
- `src/pages/blog/index.astro` — paginated blog listing with BlogCard components, sorted newest-first
- `src/pages/blog/[...slug].astro` — dynamic route rendering MDX posts
- Tag/category filtering on listing page

#### Task 4.2: Blog components
- `BlogCard.astro` — post title, date, excerpt (first 160 chars), read time, tag badges, featured image thumbnail
- `TagList.astro` — horizontal tag list for filtering
- Table of contents component (auto-generated from headings)
- Related posts section at bottom of each post (same tags)

#### Task 4.3: Seed blog content (4 launch posts)
Write 4 initial blog posts (MDX), one relevant to each app, targeting long-tail keywords:

1. **"5 Ways to Make Math Fun Again"** — targets "math games for adults", links to Sumstone
2. **"Why Streaks Don't Work (And What Does)"** — targets "habit tracker without streaks", links to Stellar Habits
3. **"The Home Maintenance Schedule You'll Actually Follow"** — targets "home maintenance checklist app", links to Choreganized
4. **"How Your Morning Alarm Can Help the Planet"** — targets "eco-friendly alarm app", links to Sprout Alarm

Each post: 800-1200 words, keyword-optimized title/headings, internal links to app page, OG image

#### Task 4.4: RSS feed
- `src/pages/rss.xml.ts` — generates RSS feed from blog collection
- Include post title, description, pubDate, link, content snippet
- Add RSS autodiscovery `<link>` tag in BaseHead

---

### Phase 5: Asset Pipeline & Visual Polish

Gather app screenshots/icons, create OG images, optimize all assets, and polish the visual experience.

#### Task 5.1: App icon pipeline
- Copy app icons from each project's assets into `src/assets/images/app-icons/`
- Optimize to WebP at multiple sizes (64px for cards, 128px for landing heroes)
- Create favicon from Newmanship brand mark

#### Task 5.2: OG image creation
- Create 1200x630 OG images for:
  - Homepage (Newmanship brand + 4 app icons)
  - Each app landing page (app icon + name + tagline on branded background)
  - Blog post template (title text on branded background)
- Place in `src/assets/images/og-images/`

#### Task 5.3: Screenshot placeholders
- Create placeholder sections on each app page for screenshots
- Use `<picture>` with WebP + fallback
- Design screenshot frames (phone mockup CSS) for app screenshots
- Lazy-load all screenshots below the fold

#### Task 5.4: Animation & micro-interactions
- Subtle scroll-reveal animations on feature cards (CSS `@keyframes` + `IntersectionObserver`)
- Smooth scroll behavior for anchor links
- View Transitions between pages (Astro built-in)
- Hover effects on app cards and CTAs
- Keep all animations `prefers-reduced-motion` aware

#### Task 5.5: Dark mode
- Implement dark mode toggle in header
- Define dark mode color tokens in Tailwind config
- Persist preference in `localStorage`
- Handle View Transitions theme flash (re-apply on `astro:after-swap`)
- Each app section's accent colors should work in both modes

---

### Phase 6: Performance, Accessibility & Final SEO Audit

Ensure the site scores 95+ on all Lighthouse categories and passes accessibility standards.

#### Task 6.1: Performance audit & optimization
- Run Lighthouse on every page, fix any issues below 95
- Verify LCP < 1.5s (preload hero images, optimize critical CSS)
- Verify CLS < 0.05 (explicit image dimensions, no layout shifts)
- Verify INP < 100ms (minimal JS, no heavy event handlers)
- Add `loading="lazy"` to below-fold images, `loading="eager"` to hero
- Verify Brotli compression on Cloudflare
- Check no unused CSS/JS is shipped

#### Task 6.2: Accessibility audit
- Keyboard navigation on all interactive elements
- Skip-to-content link
- ARIA labels on hamburger menu, icon buttons, badges
- Color contrast ratios meet WCAG AA (4.5:1 for text)
- Focus indicators on all interactive elements
- Screen reader testing on nav, FAQ accordion, blog post layout
- `alt` text on all images (descriptive, keyword-inclusive where natural)

#### Task 6.3: SEO validation
- Validate all JSON-LD with Google Rich Results Test
- Verify sitemap includes all pages
- Verify robots.txt is correct
- Test OG tags with Facebook Sharing Debugger / Twitter Card Validator
- Check canonical URLs resolve correctly
- Verify smart app banner meta tags on app pages
- Check heading hierarchy (single H1 per page, no skipped levels)
- Verify meta descriptions are unique per page and < 160 chars

#### Task 6.4: Cross-browser & device testing
- Test on Safari, Chrome, Firefox (latest)
- Test on iPhone SE (small), iPhone 15 (medium), iPad (tablet)
- Test hamburger menu open/close on mobile
- Test View Transitions work across browsers
- Verify font loading doesn't cause FOUT/FOIT

---

### Phase 7: Analytics & Launch

Wire up analytics, set up monitoring, and launch.

#### Task 7.1: Analytics integration
- Add Plausible script tag to BaseHead (use `@astrojs/partytown` to offload to web worker)
- Configure custom events: app store badge clicks (per app), blog post reads, FAQ expansions
- Verify events fire correctly in Plausible dashboard

#### Task 7.2: Search Console setup
- Submit sitemap to Google Search Console
- Verify site ownership
- Submit all app landing pages for indexing
- Monitor Core Web Vitals in Search Console

#### Task 7.3: Pre-launch checklist
- [ ] All pages render correctly at `/`, `/sumstone/`, `/stellar-habits/`, `/choreganized/`, `/sprout-alarm/`, `/blog/`
- [ ] Lighthouse scores 95+ on all categories for all pages
- [ ] All JSON-LD validates in Rich Results Test
- [ ] OG images render correctly on social preview tools
- [ ] RSS feed is valid
- [ ] Sitemap includes all public pages
- [ ] Analytics events firing
- [ ] 404 page exists and is styled
- [ ] No console errors
- [ ] Favicon and apple-touch-icon display correctly

#### Task 7.4: Post-launch SEO tasks
- Submit site to Google Search Console and request indexing
- Set up Lighthouse CI to run on every PR
- Plan blog content calendar (1-2 posts per month targeting new long-tail keywords)
- Monitor keyword rankings for primary terms
- Add app store links once all apps are published
- Cross-link from each app's individual website to the parent site

---

## Subagent Task Mapping

Each task above is scoped for a single subagent execution. Dependencies are strictly sequential by phase — all tasks within a phase can run in parallel unless noted.

| Phase | Tasks | Parallelizable | Estimated Complexity |
|---|---|---|---|
| 1: Scaffold | 1.1–1.6 | 1.1 first, then 1.2–1.5 parallel, 1.6 after build works | Medium |
| 2: Homepage | 2.1–2.5 | 2.1–2.4 parallel (after Phase 1), 2.5 after all sections exist | Low–Medium |
| 3: App Pages | 3.1–3.6 | 3.1 + 3.6 first (layout + shared components), then 3.2–3.5 parallel | Medium |
| 4: Blog | 4.1–4.4 | 4.1 first, then 4.2–4.4 parallel | Medium |
| 5: Assets | 5.1–5.5 | 5.1–5.3 parallel, 5.4–5.5 parallel after | Low–Medium |
| 6: QA | 6.1–6.4 | All parallel (audit tasks are independent) | Low |
| 7: Launch | 7.1–7.4 | 7.1–7.2 parallel, 7.3 after both, 7.4 post-launch | Low |

**Total: 7 phases, 27 tasks**
