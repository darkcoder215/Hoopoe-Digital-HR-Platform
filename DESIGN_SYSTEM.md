# Hoopoe HR — Design System Rules (Figma MCP Integration)

This document tells Claude (and other AI tools) how to translate Figma designs into code in this repository. Adapt all Figma MCP output (`get_design_context`, etc.) to the conventions below — never paste raw output verbatim.

---

## 1. Token Definitions

**Location:** `src/app/globals.css` — single source of truth.

**Format:** Tailwind CSS v4 `@theme inline` directive. Tokens are CSS custom properties prefixed with their category (`--color-*`, `--font-*`, `--shadow-*`, `--animate-*`). Tailwind auto-generates utility classes from them (e.g. `--color-hoopoe-orange` → `bg-hoopoe-orange`, `text-hoopoe-orange`, `border-hoopoe-orange`).

**No external transformation pipeline** (no Style Dictionary, no `tailwind.config.js`). All tokens live in CSS.

### Brand color tokens

```css
--color-hoopoe-black:     #1A1D24;
--color-hoopoe-orange:    #D4793A;  /* primary */
--color-hoopoe-brown:     #B04A1E;
--color-hoopoe-mid-orange:#E8994A;
--color-hoopoe-lt-orange: #F7C97D;
--color-hoopoe-accent:    #E86B20;
--color-hoopoe-gold:      #F0B254;
--color-hoopoe-cream:     #FFF8F0;
--color-hoopoe-lt-gray:   #E5E0DD;
--color-hoopoe-navy:      #1E2332;
--color-hoopoe-surface:   #F5F2F0;
--color-hoopoe-success:   #22875A;
--color-hoopoe-danger:    #D93444;
```

**Mapping rule:** If a Figma node uses a hex close to one of the above, use the token (e.g. `bg-hoopoe-orange`). Only fall back to arbitrary values (`bg-[#abc123]`) when there is no reasonable token match — and then consider whether a new token belongs in `globals.css`.

### Typography tokens

```css
--font-sans:    'Inter', 'Thmanyah Sans', system-ui, sans-serif;  /* default body */
--font-display: 'Playfair Display', 'Thmanyah Serif Display', Georgia, serif;
--font-body:    'Inter', 'Thmanyah Sans', system-ui, sans-serif;
```

Use `font-display` for hero/section headings. Body defaults are set on `body` (weight 500, `letter-spacing: -0.01em`, `line-height: 1.6`). Headings get `letter-spacing: -0.02em` automatically. Prefer `font-bold` / `font-black` on labels and stat numbers — the design language is bold.

### Shadow tokens

```css
--shadow-sm / -md / -lg / -xl    /* warm-tinted neutrals */
--shadow-glow                    /* orange ambient glow */
```

### Animation tokens & keyframes

Defined inside `@theme inline` and surfaced as `animate-*` utilities. The available motions are:
`fade-in`, `slide-up`, `scale-in`, `pulse-orange`, `progress`, `count-up`, `shimmer`, `float`, `glow-pulse`, `slide-in-left`, `gradient-shift`.

Stagger delays use the helpers `.stagger-1` … `.stagger-9` (60ms increments).

---

## 2. Component Library

**Location:** `src/components/`

```
src/components/
├── ui/            # primitive, reusable building blocks
│   ├── Badge.tsx
│   ├── Button.tsx
│   ├── Card.tsx
│   ├── ScoreGauge.tsx
│   └── Skeleton.tsx
├── layout/        # AppShell, Sidebar, Topbar
└── dashboard/     # feature widgets (StatsCards, PipelineOverview, …)
```

**Architecture:** Plain React 19 function components, default-exported, typed props via local `interface` extending the relevant `HTMLAttributes`. No headless-UI lib, no Radix, no shadcn. **Reuse primitives in `ui/` first** before introducing new ones.

**No Storybook or component docs exist.** Use existing usages in `src/app/**` as the reference.

### Canonical primitive pattern (`Card.tsx`)

```tsx
import { cn } from '@/lib/utils';
import { HTMLAttributes } from 'react';

interface CardProps extends HTMLAttributes<HTMLDivElement> {
  highlighted?: boolean;
  hover?: boolean;
  padding?: 'sm' | 'md' | 'lg';
}

export default function Card({ className, highlighted, hover, padding = 'md', children, ...props }: CardProps) {
  return (
    <div
      className={cn(
        'bg-white border border-hoopoe-lt-gray/60 rounded-2xl shadow-sm transition-all duration-300',
        highlighted && 'border-l-[3px] border-l-hoopoe-orange',
        hover && 'hover:shadow-md hover:-translate-y-0.5',
        { 'p-4': padding === 'sm', 'p-6': padding === 'md', 'p-8': padding === 'lg' },
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
}
```

Rules of thumb when generating components from Figma:
- Default export, PascalCase filename matching the export.
- Always merge classes through `cn()` from `@/lib/utils`.
- Accept and forward `className` so consumers can override.
- Variants are boolean/enum props, not separate components.

---

## 3. Frameworks & Libraries

| Concern | Choice |
|---|---|
| Framework | **Next.js 16.2.1** (App Router, Turbopack). ⚠️ Read `node_modules/next/dist/docs/` before using Next APIs — this version has breaking changes. |
| UI runtime | React 19.2.4 |
| Language | TypeScript 5 (strict) |
| Styling | **Tailwind CSS v4** with `@tailwindcss/postcss`. Tokens via `@theme inline` in `globals.css`. |
| Class utils | `clsx` + `tailwind-merge` (exported as `cn`) |
| State | `zustand` (`src/stores/`) |
| Icons | `lucide-react` |
| Build | `next dev` / `next build` (Turbopack) |

There is **no `tailwind.config.js`** — do not create one. All Tailwind config flows through `globals.css`.

---

## 4. Asset Management

- Static assets live in `public/`.
- Subfolders: `public/fonts/` (self-hosted Thmanyah OTFs), `public/logos/`, plus root `*.svg` icons.
- Reference public assets with root-relative paths: `/logos/foo.svg`, `/fonts/...`.
- Use Next's `next/image` for raster images.
- No CDN; everything is served by Next.

---

## 5. Icon System

- **Library:** `lucide-react`. Do not introduce other icon sets or inline SVGs unless absolutely necessary.
- Import per icon: `import { ArrowRight, Search, Upload } from 'lucide-react';`
- Sizing via `size` prop or Tailwind `w-4 h-4`. Color via `text-*` utilities (icons inherit `currentColor`).
- Naming: keep lucide's PascalCase names. When mapping a Figma icon, pick the closest lucide equivalent before custom SVG.

---

## 6. Styling Approach

- **Utility-first Tailwind v4.** No CSS Modules, no styled-components, no CSS-in-JS.
- Global styles, font faces, keyframes, and reusable utility classes (`.glass-card`, `.hover-lift`, `.hover-glow`, `.gradient-text`, `.warm-surface`, `.metric-accent`, `.brand-bar`, `.section-header`, `.accent-line`, `.dot-pattern`, `.stagger-N`) live in `src/app/globals.css`. **Use these helpers instead of re-implementing the same effects with raw Tailwind.**
- **Direction:** App is **LTR English** (`<html lang="en" dir="ltr">`). Do not emit `mr-*` for the right edge of screens, RTL gradients, or `right-*` icon positioning when the design implies a left-to-right reading flow. The legacy `.slide-in-rtl` class is aliased to `slide-in-left` for backward compatibility.
- **Responsive:** Tailwind breakpoints (`sm md lg xl 2xl`). Mobile-first.
- Conditional classes: always go through `cn(...)`.

### Example composition

```tsx
<Card hover highlighted className="metric-accent hover-glow card-entrance stagger-2">
  <p className="text-xs uppercase tracking-wider font-bold text-hoopoe-black/60">
    Total Candidates
  </p>
  <p className="font-display text-4xl font-black text-hoopoe-black mt-2">128</p>
  <span className="accent-line" />
</Card>
```

---

## 7. Project Structure

```
src/
├── app/                     # Next.js App Router pages
│   ├── layout.tsx           # root layout, fonts, <html lang="en" dir="ltr">
│   ├── globals.css          # tokens + global styles (SOURCE OF TRUTH)
│   ├── page.tsx             # /
│   ├── candidates/[id]/     # dynamic route
│   ├── pipeline/
│   ├── upload/
│   └── settings/
├── components/
│   ├── ui/                  # primitives
│   ├── layout/              # AppShell, Sidebar, Topbar
│   └── dashboard/           # feature widgets
├── lib/
│   ├── constants.ts         # pipeline stages, positions, palettes
│   ├── mock-data.ts
│   ├── types.ts
│   └── utils.ts             # cn, formatDate, formatRelativeTime, getInitials, getScoreColor
└── stores/                  # zustand stores
```

**Path alias:** `@/*` → `src/*`. Always import via `@/components/...`, `@/lib/...`.

**Feature pattern:** Pages in `src/app/<route>/page.tsx` compose feature widgets from `src/components/dashboard/` (or sibling folders) plus primitives from `src/components/ui/`. Domain data flows from `src/stores/` (zustand) and `src/lib/mock-data.ts`.

---

## Figma → Code Workflow (mandatory)

1. **Fetch** the design with `get_design_context` (use `nodeId` + `fileKey` from the URL). Also pull a screenshot when layout is non-trivial.
2. **Map tokens first.** Replace any hex / font / shadow / radius value in the MCP output with the corresponding token from `globals.css`. If nothing matches, propose a new token rather than hardcoding.
3. **Reuse components.** Before generating new JSX, check `src/components/ui/` and `src/components/dashboard/` for an existing primitive or widget that matches the Figma node's intent. Extend via props/`className`, don't fork.
4. **Conform to conventions.** Default export, `cn()` for classes, lucide for icons, Tailwind utilities + the helper classes from `globals.css`, LTR layout, English copy.
5. **Place files** under the right folder (`ui/` for primitives, `dashboard/` or a new feature folder for composite widgets, `app/<route>/page.tsx` for pages).
6. **No new config files** (no tailwind.config, no PostCSS tweaks, no global CSS resets) unless explicitly required.
7. **Verify** with `npm run build` after meaningful changes.

If a Figma node's design conflicts with these rules (e.g. introduces a brand-new color system or RTL layout), surface the conflict to the user before implementing.
