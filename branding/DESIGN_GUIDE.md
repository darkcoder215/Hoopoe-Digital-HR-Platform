# Hoopoe Digital - Design System Guide

> Comprehensive design system for all Hoopoe Digital HR Platform tools and systems.
> Derived from the official Branding Manual and provided design assets.

---

## Table of Contents

1. [Brand Identity](#1-brand-identity)
2. [Color System](#2-color-system)
3. [Typography](#3-typography)
4. [Spacing & Layout](#4-spacing--layout)
5. [Borders & Dividers](#5-borders--dividers)
6. [Shadows & Elevation](#6-shadows--elevation)
7. [Iconography & Imagery](#7-iconography--imagery)
8. [Component Patterns](#8-component-patterns)
9. [Responsive Breakpoints](#9-responsive-breakpoints)
10. [Accessibility](#10-accessibility)
11. [Logo Usage](#11-logo-usage)
12. [File & Folder Structure](#12-file--folder-structure)

---

## 1. Brand Identity

**Company:** Hoopoe Digital
**Tagline:** WiFi on the Go!
**Inspiration:** The Hoopoe bird (King Solomon's Hoopoe) - representing connection, intelligence, and elegance.

### Brand Personality
- **Professional** - Enterprise-grade HR platform
- **Warm** - Approachable orange-toned palette inspired by nature
- **Precise** - Clean layouts, clear hierarchy, sharp typography
- **Bilingual** - Full Arabic (RTL) and English (LTR) support

---

## 2. Color System

### 2.1 Primary Palette

| Name           | HEX       | RGB              | Usage                                      |
|----------------|-----------|------------------|---------------------------------------------|
| Black          | `#20242C` | 32, 36, 44       | Primary text, headings, logo text           |
| Orange         | `#CE8345` | 206, 131, 69     | Primary brand, CTAs, active states          |
| Brown          | `#A34823` | 163, 72, 35      | Accent, hover states, emphasis              |
| Mid Orange     | `#E7A15E` | 231, 161, 94     | Secondary buttons, highlights, tags         |
| Light Orange   | `#F9CF9D` | 249, 207, 157    | Backgrounds, cards, subtle highlights       |
| Light Gray     | `#E8E3E1` | 232, 227, 225    | Borders, dividers, disabled states          |

### 2.2 Secondary Palette

| Name           | HEX       | RGB              | Usage                                      |
|----------------|-----------|------------------|---------------------------------------------|
| Dark Navy Blue | `#252A35` | 37, 42, 53       | Dark mode bg, footer, sidebar              |
| Pure Black     | `#000000` | 0, 0, 0          | Rare - high-contrast text only             |
| White          | `#FFFFFF` | 255, 255, 255    | Page backgrounds, card surfaces            |

### 2.3 Semantic Colors

| Purpose     | Color                  | HEX       |
|-------------|------------------------|-----------|
| Success     | Forest Green           | `#2D7D46` |
| Warning     | Brand Orange           | `#CE8345` |
| Error       | Brand Brown            | `#A34823` |
| Info        | Dark Navy Blue         | `#252A35` |
| Disabled    | Light Gray             | `#E8E3E1` |
| Focus Ring  | Mid Orange @ 40%       | `#E7A15E66` |

### 2.4 Opacity Scale

Use brand colors at these opacity levels for tinted backgrounds:

| Opacity | Use Case                            |
|---------|-------------------------------------|
| 100%    | Solid buttons, text, icons          |
| 80%     | Hover overlays                      |
| 60%     | Active/pressed backgrounds          |
| 40%     | Focus rings, selection highlights   |
| 20%     | Subtle background tints, table rows |

### 2.5 CSS Custom Properties

```css
:root {
  /* Primary */
  --color-black:         #20242C;
  --color-orange:        #CE8345;
  --color-brown:         #A34823;
  --color-mid-orange:    #E7A15E;
  --color-light-orange:  #F9CF9D;
  --color-light-gray:    #E8E3E1;

  /* Secondary */
  --color-navy:          #252A35;
  --color-white:         #FFFFFF;

  /* Semantic */
  --color-success:       #2D7D46;
  --color-warning:       #CE8345;
  --color-error:         #A34823;
  --color-info:          #252A35;
  --color-disabled:      #E8E3E1;
  --color-focus:         rgba(231, 161, 94, 0.4);
}
```

---

## 3. Typography

### 3.1 Font Families

| Font                    | Role               | Language   | Weights Available                        |
|-------------------------|---------------------|------------|-------------------------------------------|
| **Gabriela Stencil**    | Display / Logo      | English    | Thin, Ultra Light, Light, Regular, Bold, Black |
| **Thmanyah Sans**       | UI / Body (Primary) | Arabic     | Light, Regular, Medium, Bold, Black       |
| **Thmanyah Serif Display** | Headings         | Arabic     | Light, Regular, Medium, Bold, Black       |
| **Thmanyah Serif Text** | Body / Reading      | Arabic     | Light, Regular, Medium, Bold, Black       |
| **Inter** (System)      | UI Fallback         | English    | 100-900                                   |

### 3.2 Font Stack (CSS)

```css
:root {
  /* English UI */
  --font-display:  'Gabriela Stencil', 'Georgia', serif;
  --font-body:     'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;

  /* Arabic UI */
  --font-ar-display: 'Thmanyah Serif Display', 'Thmanyah Sans', serif;
  --font-ar-body:    'Thmanyah Sans', 'Thmanyah Serif Text', sans-serif;
  --font-ar-reading: 'Thmanyah Serif Text', 'Thmanyah Sans', serif;
}
```

### 3.3 Type Scale

Use a **1.250 (Major Third)** modular scale for clean proportions.

| Token     | Size (px) | Size (rem) | Line Height | Weight       | Use Case                          |
|-----------|-----------|------------|-------------|--------------|-----------------------------------|
| `display` | 48        | 3.0        | 1.1         | Bold (700)   | Hero headings, landing pages      |
| `h1`      | 36        | 2.25       | 1.2         | Bold (700)   | Page titles                       |
| `h2`      | 28        | 1.75       | 1.25        | Semi (600)   | Section headings                  |
| `h3`      | 22        | 1.375      | 1.3         | Semi (600)   | Sub-section headings              |
| `h4`      | 18        | 1.125      | 1.35        | Medium (500) | Card titles, labels               |
| `body-lg` | 16        | 1.0        | 1.6         | Regular (400)| Primary body text                 |
| `body`    | 14        | 0.875      | 1.5         | Regular (400)| Default body, form inputs         |
| `body-sm` | 12        | 0.75       | 1.5         | Regular (400)| Captions, helper text, timestamps |
| `caption` | 11        | 0.6875     | 1.4         | Medium (500) | Labels, badges, overlines         |

### 3.4 Letter Spacing

| Size Range    | Letter Spacing |
|---------------|---------------|
| Display / H1  | `-0.02em`     |
| H2 / H3       | `-0.01em`     |
| Body           | `0em`         |
| Caption / Overline | `0.04em` |

### 3.5 Font Weight Mapping

| Weight Name  | Value | Usage                                |
|--------------|-------|--------------------------------------|
| Light        | 300   | Decorative, large display text       |
| Regular      | 400   | Body text, descriptions              |
| Medium       | 500   | Labels, captions, nav items          |
| Semi Bold    | 600   | Sub-headings, emphasis               |
| Bold         | 700   | Headings, CTAs, important elements   |
| Black        | 900   | Hero text, brand statements          |

---

## 4. Spacing & Layout

### 4.1 Base Unit

All spacing uses a **4px base unit** for consistency.

### 4.2 Spacing Scale

| Token   | Value  | Use Case                                            |
|---------|--------|------------------------------------------------------|
| `xs`    | 4px    | Inline icon gaps, tight internal padding             |
| `sm`    | 8px    | Between related elements (label + input)             |
| `md`    | 16px   | Standard padding inside cards, between form fields   |
| `lg`    | 24px   | Section padding, gaps between card groups            |
| `xl`    | 32px   | Major section separation                             |
| `2xl`   | 48px   | Page section vertical padding                        |
| `3xl`   | 64px   | Hero sections, major layout breathing room           |
| `4xl`   | 96px   | Landing page section gaps                            |

### 4.3 CSS Spacing Variables

```css
:root {
  --space-xs:  4px;
  --space-sm:  8px;
  --space-md:  16px;
  --space-lg:  24px;
  --space-xl:  32px;
  --space-2xl: 48px;
  --space-3xl: 64px;
  --space-4xl: 96px;
}
```

### 4.4 Layout Grid

| Context         | Columns | Gutter   | Margin    | Max Width  |
|-----------------|---------|----------|-----------|------------|
| Desktop (>1280) | 12      | 24px     | 48px      | 1280px     |
| Tablet (768-1279)| 8      | 20px     | 32px      | 100%       |
| Mobile (<768)   | 4       | 16px     | 16px      | 100%       |

### 4.5 Container Widths

```css
.container-sm  { max-width:  640px; }  /* Forms, auth pages          */
.container-md  { max-width:  960px; }  /* Content pages, settings    */
.container-lg  { max-width: 1280px; }  /* Dashboards, main layouts   */
.container-xl  { max-width: 1440px; }  /* Full-width admin panels    */
```

### 4.6 Component Internal Padding

| Component       | Padding              |
|-----------------|----------------------|
| Button (sm)     | `8px 16px`           |
| Button (md)     | `10px 20px`          |
| Button (lg)     | `14px 28px`          |
| Card            | `24px`               |
| Card (compact)  | `16px`               |
| Modal           | `32px`               |
| Input field     | `10px 14px`          |
| Table cell      | `12px 16px`          |
| Sidebar         | `16px`               |
| Navbar          | `0 48px` (horizontal)|
| Dropdown item   | `10px 16px`          |
| Badge / Tag     | `4px 10px`           |

---

## 5. Borders & Dividers

### 5.1 Border Radius

| Token       | Value  | Use Case                              |
|-------------|--------|----------------------------------------|
| `none`      | 0      | Tables, full-bleed elements            |
| `sm`        | 4px    | Buttons, badges, tags, inputs          |
| `md`        | 8px    | Cards, dropdowns, modals              |
| `lg`        | 12px   | Featured cards, image containers       |
| `xl`        | 16px   | Hero cards, marketing components       |
| `full`      | 9999px | Avatars, pills, circular buttons       |

### 5.2 Border Widths & Styles

| Style            | CSS                                     | Use Case                    |
|------------------|-----------------------------------------|-----------------------------|
| Default          | `1px solid var(--color-light-gray)`     | Card borders, form inputs   |
| Active / Focus   | `2px solid var(--color-orange)`         | Focused inputs, active tabs |
| Accent           | `3px solid var(--color-orange)`         | Left-border highlights      |
| Divider          | `1px solid #E8E3E1`                     | Between list items, sections|
| Error            | `2px solid var(--color-brown)`          | Validation error inputs     |

### 5.3 Brand Accent Bar

The Hoopoe brand uses a distinctive **orange horizontal bar** at the bottom of sections/pages:

```css
.brand-bar {
  height: 6px;
  background: linear-gradient(90deg, var(--color-orange), var(--color-mid-orange));
  border-radius: 3px;
}

.brand-bar-thick {
  height: 48px;
  background-color: var(--color-mid-orange);
}
```

---

## 6. Shadows & Elevation

| Level   | CSS Box Shadow                                          | Use Case                    |
|---------|---------------------------------------------------------|-----------------------------|
| `sm`    | `0 1px 2px rgba(32,36,44,0.06)`                        | Buttons, inputs             |
| `md`    | `0 4px 12px rgba(32,36,44,0.08)`                       | Cards, dropdowns            |
| `lg`    | `0 8px 24px rgba(32,36,44,0.12)`                       | Modals, popovers            |
| `xl`    | `0 16px 48px rgba(32,36,44,0.16)`                      | Dialogs, full-screen overlays|

```css
:root {
  --shadow-sm: 0 1px 2px rgba(32,36,44,0.06);
  --shadow-md: 0 4px 12px rgba(32,36,44,0.08);
  --shadow-lg: 0 8px 24px rgba(32,36,44,0.12);
  --shadow-xl: 0 16px 48px rgba(32,36,44,0.16);
}
```

---

## 7. Iconography & Imagery

### 7.1 Icon Style
- Use **outlined** icons (2px stroke) as default
- Use **filled** icons for active/selected states
- Icon sizes: `16px`, `20px`, `24px`, `32px`
- Icon color inherits text color by default
- Recommended libraries: **Lucide Icons**, **Phosphor Icons**

### 7.2 Decorative Pattern

The brand uses a **scattered dot/particle pattern** in `light orange` and `mid orange` as a decorative element on stationery and backgrounds. Use sparingly on:
- Login / auth pages (bottom corner)
- Empty states
- Marketing sections
- PDF / print exports

### 7.3 Image Treatment
- Border radius: `8px` (match card radius)
- Aspect ratios: `16:9` (hero), `4:3` (cards), `1:1` (avatars)
- Overlay for text on images: `rgba(37, 42, 53, 0.6)` (navy at 60%)

---

## 8. Component Patterns

### 8.1 Buttons

```
Primary:    bg: #CE8345  text: #FFFFFF  border: none        radius: 4px
Secondary:  bg: transparent  text: #CE8345  border: 2px #CE8345  radius: 4px
Ghost:      bg: transparent  text: #20242C  border: none        radius: 4px
Danger:     bg: #A34823  text: #FFFFFF  border: none        radius: 4px
Disabled:   bg: #E8E3E1  text: #999999  border: none        radius: 4px
```

**Button States:**
- Hover: Darken background by 10%
- Active: Darken background by 15%
- Focus: Add `0 0 0 3px var(--color-focus)` ring
- Transition: `all 150ms ease-in-out`

### 8.2 Form Inputs

```css
.input {
  padding: 10px 14px;
  border: 1px solid var(--color-light-gray);
  border-radius: 4px;
  font-size: 14px;
  line-height: 1.5;
  color: var(--color-black);
  background: var(--color-white);
  transition: border-color 150ms ease;
}
.input:focus {
  border-color: var(--color-orange);
  box-shadow: 0 0 0 3px var(--color-focus);
  outline: none;
}
.input--error {
  border-color: var(--color-brown);
}
```

### 8.3 Cards

```css
.card {
  background: var(--color-white);
  border: 1px solid var(--color-light-gray);
  border-radius: 8px;
  padding: 24px;
  box-shadow: var(--shadow-md);
}
.card--highlighted {
  border-left: 3px solid var(--color-orange);
}
```

### 8.4 Tables

```css
.table th {
  background: #F7F5F4;
  color: var(--color-black);
  font-weight: 600;
  font-size: 12px;
  letter-spacing: 0.04em;
  text-transform: uppercase;
  padding: 12px 16px;
  border-bottom: 2px solid var(--color-light-gray);
}
.table td {
  padding: 12px 16px;
  font-size: 14px;
  border-bottom: 1px solid var(--color-light-gray);
}
.table tr:hover {
  background: rgba(249, 207, 157, 0.15);
}
```

### 8.5 Navigation / Sidebar

```css
.sidebar {
  width: 260px;
  background: var(--color-navy);
  color: var(--color-white);
  padding: 16px;
}
.nav-item {
  padding: 10px 16px;
  border-radius: 4px;
  font-size: 14px;
  font-weight: 500;
  transition: background 150ms ease;
}
.nav-item:hover {
  background: rgba(255,255,255,0.08);
}
.nav-item--active {
  background: var(--color-orange);
  color: var(--color-white);
  font-weight: 600;
}
```

### 8.6 Modals / Dialogs

- Overlay: `rgba(32, 36, 44, 0.5)`
- Width: `480px` (small), `640px` (medium), `800px` (large)
- Padding: `32px`
- Border radius: `8px`
- Header bottom border: `1px solid var(--color-light-gray)`
- Footer top border: `1px solid var(--color-light-gray)`

### 8.7 Badges & Tags

```css
.badge {
  display: inline-flex;
  align-items: center;
  padding: 4px 10px;
  font-size: 11px;
  font-weight: 500;
  letter-spacing: 0.04em;
  border-radius: 9999px;
}
.badge--primary   { background: rgba(206,131,69,0.15); color: #A34823; }
.badge--success   { background: rgba(45,125,70,0.15);  color: #2D7D46; }
.badge--neutral   { background: rgba(32,36,44,0.08);   color: #20242C; }
```

### 8.8 Alerts / Notifications

```css
.alert {
  padding: 14px 20px;
  border-radius: 4px;
  border-left: 4px solid;
  font-size: 14px;
}
.alert--info    { background: rgba(37,42,53,0.06);    border-color: #252A35; }
.alert--success { background: rgba(45,125,70,0.08);   border-color: #2D7D46; }
.alert--warning { background: rgba(206,131,69,0.1);   border-color: #CE8345; }
.alert--error   { background: rgba(163,72,35,0.08);   border-color: #A34823; }
```

---

## 9. Responsive Breakpoints

| Name    | Min Width | Target Devices                |
|---------|-----------|-------------------------------|
| `xs`    | 0         | Small phones                  |
| `sm`    | 480px     | Large phones                  |
| `md`    | 768px     | Tablets, small laptops        |
| `lg`    | 1024px    | Laptops, desktops             |
| `xl`    | 1280px    | Large desktops                |
| `2xl`   | 1536px    | Ultra-wide monitors           |

```css
/* Mobile-first breakpoints */
@media (min-width: 480px)  { /* sm  */ }
@media (min-width: 768px)  { /* md  */ }
@media (min-width: 1024px) { /* lg  */ }
@media (min-width: 1280px) { /* xl  */ }
@media (min-width: 1536px) { /* 2xl */ }
```

---

## 10. Accessibility

### 10.1 Contrast Ratios (WCAG AA)

| Combination                          | Ratio  | Pass |
|--------------------------------------|--------|------|
| `#20242C` on `#FFFFFF`               | 14.7:1 | Yes  |
| `#FFFFFF` on `#CE8345`               | 3.2:1  | Use large text only |
| `#FFFFFF` on `#A34823`               | 4.8:1  | Yes  |
| `#FFFFFF` on `#252A35`               | 13.5:1 | Yes  |
| `#20242C` on `#F9CF9D`               | 8.1:1  | Yes  |

### 10.2 Guidelines

- Never use Orange (`#CE8345`) as a text color on white for body text (insufficient contrast); use it only for large headings (18px+ bold) or UI elements with additional indicators
- Always pair color indicators with icons or text labels
- Focus states must be visible: use `3px` focus ring in `--color-focus`
- Minimum touch target: `44px x 44px` on mobile
- All images require `alt` text; decorative images use `alt=""`

---

## 11. Logo Usage

### 11.1 Versions
- **Full Logo:** Bird symbol + "HOOPOE DIGITAL" text (horizontal)
- **Vertical Logo:** Bird symbol stacked above text
- **Symbol Only:** Bird icon (marquee/favicon use)

### 11.2 Clear Space
- Minimum clear space around the logo = **1x** the height of the "O" in HOOPOE
- Minimum logo width: **80px** (digital), **25mm** (print)

### 11.3 Approved Backgrounds
- White background (preferred)
- Light orange (`#F9CF9D`) background
- Dark navy (`#252A35`) background with white logo variant
- Black background with white logo variant

### 11.4 Do Not
- Rotate the logo
- Distort proportions
- Change brand colors
- Add drop shadows or effects
- Place on busy/cluttered backgrounds
- Reduce below minimum size

---

## 12. File & Folder Structure

```
branding/
├── DESIGN_GUIDE.md              ← This file
├── assets/
│   └── Branding_Manual.pdf      ← Original brand manual (26 pages)
├── fonts/
│   ├── thmanyah-sans/
│   │   ├── Thmanyahsans12-Light.otf
│   │   ├── Thmanyahsans12-Regular.otf
│   │   ├── Thmanyahsans12-Medium.otf
│   │   ├── Thmanyahsans12-Bold.otf
│   │   └── Thmanyahsans12-Black.otf
│   ├── thmanyah-serif-display/
│   │   ├── Thmanyahserifdisplay12-Light.otf
│   │   ├── Thmanyahserifdisplay12-Reg.otf
│   │   ├── Thmanyahserifdisplay12-Medium.otf
│   │   ├── Thmanyahserifdisplay12-Bold.otf
│   │   └── Thmanyahserifdisplay12-Black.otf
│   └── thmanyah-serif-text/
│       ├── Thmanyahseriftext12-Light.otf
│       ├── Thmanyahseriftext12-Regular.otf
│       ├── Thmanyahseriftext12-Medium.otf
│       ├── Thmanyahseriftext12-Bold.otf
│       └── Thmanyahseriftext12-Black.otf
└── logos/
    ├── hoopoe-digital-logo.jpeg ← High-res vertical logo
    └── WhatsApp Image 2026-03-29 at 12.12.05.jpeg
```

---

## Quick Reference: Tailwind Config

If using Tailwind CSS, extend your config:

```js
// tailwind.config.js
module.exports = {
  theme: {
    extend: {
      colors: {
        hoopoe: {
          black:        '#20242C',
          orange:       '#CE8345',
          brown:        '#A34823',
          'mid-orange': '#E7A15E',
          'lt-orange':  '#F9CF9D',
          'lt-gray':    '#E8E3E1',
          navy:         '#252A35',
        }
      },
      fontFamily: {
        display: ['Gabriela Stencil', 'Georgia', 'serif'],
        body:    ['Inter', 'system-ui', 'sans-serif'],
        'ar-display': ['Thmanyah Serif Display', 'Thmanyah Sans', 'serif'],
        'ar-body':    ['Thmanyah Sans', 'sans-serif'],
      },
      borderRadius: {
        sm: '4px',
        md: '8px',
        lg: '12px',
        xl: '16px',
      },
      spacing: {
        xs:  '4px',
        sm:  '8px',
        md:  '16px',
        lg:  '24px',
        xl:  '32px',
        '2xl': '48px',
        '3xl': '64px',
        '4xl': '96px',
      },
      boxShadow: {
        sm: '0 1px 2px rgba(32,36,44,0.06)',
        md: '0 4px 12px rgba(32,36,44,0.08)',
        lg: '0 8px 24px rgba(32,36,44,0.12)',
        xl: '0 16px 48px rgba(32,36,44,0.16)',
      },
    },
  },
}
```

---

*Copyrights Hoopoe Digital. All Rights Reserved.*
