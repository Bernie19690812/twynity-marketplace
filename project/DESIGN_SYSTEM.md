# Twynity Design System
**Version:** 2.0  
**Updated:** February 2026  
**Status:** Active

---

## Design Philosophy

Twynity's visual language is built on three principles:

- **Clarity first** — every element earns its place. No decorative noise.
- **Human at the center** — the product is about people, so the UI should feel warm, not cold.
- **Purposeful purple** — the brand color is used sparingly and intentionally, not as wallpaper.

The v2 direction moves away from the dark, starfield aesthetic of the POC toward a light, typographic interface that lets the product content (the twins themselves) take centre stage.

---

## Color Palette

### Brand Colors

| Token | Hex | Usage |
|---|---|---|
| `--color-brand-primary` | `#863DFF` | Primary CTAs, active states, links |
| `--color-brand-mid` | `#5629B2` | Hover states, secondary accents |
| `--color-brand-deep` | `#28195E` | Text on light backgrounds, dark accents |
| `--color-brand-light` | `#EDE8FF` | Backgrounds for highlighted sections, chips |
| `--color-brand-xlight` | `#F7F5FF` | Page section tints, card hover backgrounds |

### Neutral Colors

| Token | Hex | Usage |
|---|---|---|
| `--color-white` | `#FFFFFF` | Primary page background, card backgrounds |
| `--color-grey-50` | `#F9F9FB` | App shell background |
| `--color-grey-100` | `#F0EFF5` | Input backgrounds, dividers |
| `--color-grey-200` | `#E0DFF0` | Borders, subtle separators |
| `--color-grey-400` | `#9896B0` | Placeholder text, helper text |
| `--color-grey-600` | `#5E5C78` | Secondary body text |
| `--color-grey-900` | `#1A1830` | Primary body text, headings |

### Semantic Colors

| Token | Hex | Usage |
|---|---|---|
| `--color-success` | `#17A865` | Published/live status |
| `--color-success-light` | `#E6F7F0` | Success backgrounds |
| `--color-warning` | `#F59E0B` | Draft/processing status |
| `--color-error` | `#E53E3E` | Destructive actions (Delete), errors |

---

## Typography

Twynity uses a single type family with clear weight hierarchy. No decorative fonts.

**Primary font:** `Inter` (or system fallback: `-apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif`)

### Type Scale

| Token | Size | Weight | Line Height | Usage |
|---|---|---|---|---|
| `--text-display` | 40px | 700 | 1.15 | Landing hero headline |
| `--text-h1` | 32px | 700 | 1.2 | Page titles |
| `--text-h2` | 24px | 600 | 1.3 | Section headings |
| `--text-h3` | 18px | 600 | 1.4 | Card titles, form section labels |
| `--text-body-lg` | 16px | 400 | 1.6 | Body text, descriptions |
| `--text-body` | 14px | 400 | 1.5 | Default UI text, form labels |
| `--text-small` | 12px | 400 | 1.5 | Helper text, metadata |
| `--text-label` | 12px | 600 | 1.4 | Tags, status chips, nav labels |

### Typography Rules

- Headings use `--color-grey-900`
- Body text uses `--color-grey-600`
- Never use more than two weights in a single component
- Avoid centering body text. Reserve centering for hero/display text only

---

## Spacing System

Based on a 4px base unit. All spacing values are multiples of 4.

| Token | Value | Common use |
|---|---|---|
| `--space-1` | 4px | Icon padding, tight gaps |
| `--space-2` | 8px | Inline element gaps |
| `--space-3` | 12px | Input inner padding |
| `--space-4` | 16px | Default component padding |
| `--space-5` | 20px | Card padding |
| `--space-6` | 24px | Section inner spacing |
| `--space-8` | 32px | Between components |
| `--space-10` | 40px | Section gaps |
| `--space-16` | 64px | Page-level vertical rhythm |

---

## Layout

### Page Structure

- **Max content width:** 1200px, centered
- **Page background:** `--color-grey-50`
- **Default horizontal padding:** 24px (mobile), 48px (tablet+), 80px (desktop)
- **Navigation height:** 64px, sticky, white background with `box-shadow: 0 1px 0 var(--color-grey-200)`

### Grid

- **Dashboard grid:** 3 columns on desktop, 2 on tablet, 1 on mobile
- **Form max width:** 560px, centered
- **Landing sections:** Full-width with centered content column (max 720px for text, 1100px for feature grids)

---

## Components

### Buttons

**Primary** — used for the single most important action on a screen
- Background: `--color-brand-primary`
- Text: white, `--text-body`, 600 weight
- Padding: 12px 24px
- Border radius: 8px
- Hover: `--color-brand-mid`
- Never use more than one primary button per view

**Secondary** — supporting actions
- Background: white
- Border: 1.5px solid `--color-grey-200`
- Text: `--color-grey-900`
- Hover border: `--color-brand-primary`, text: `--color-brand-primary`

**Destructive** — irreversible actions (Delete, Unpublish)
- Text-only or outlined style in `--color-error`
- Never use a filled red button in a card context

**Ghost / Link** — inline navigation (Back, Edit)
- No background or border
- Text: `--color-brand-primary`
- Underline on hover

### Form Inputs

- Background: white
- Border: 1.5px solid `--color-grey-200`
- Border radius: 8px
- Padding: 12px 16px
- Focus border: `--color-brand-primary`, focus ring: `0 0 0 3px var(--color-brand-xlight)`
- Placeholder: `--color-grey-400`
- Label: `--text-body`, 600 weight, `--color-grey-900`, 6px below label

### Cards (Twin Cards)

- Background: white
- Border: 1px solid `--color-grey-200`
- Border radius: 12px
- Shadow: `0 1px 4px rgba(26,24,48,0.06)`
- Hover shadow: `0 4px 16px rgba(134,61,255,0.10)`
- Hover border: `--color-brand-light`
- Image area: aspect ratio 1:1, `border-radius: 8px`, `object-fit: cover`
- Padding: 16px

### Status Chips

- Border radius: 100px (pill)
- Padding: 4px 10px
- Font: `--text-label`
- Published: background `--color-success-light`, text `--color-success`
- Draft: background `#FFF8E6`, text `--color-warning`

### Navigation

- White background, 1px bottom border `--color-grey-200`
- Logo left-aligned
- Actions right-aligned
- User avatar: 36px circle, `--color-brand-primary` background, white initials

---

## Iconography

- Use **Lucide** icons (consistent with Next.js/React ecosystem)
- Default size: 20px (inline), 24px (standalone)
- Color inherits from parent text unless explicitly set
- Never use icons without an accessible label or tooltip

---

## Motion

- **Default transition:** `150ms ease-out` for color, border, shadow
- **Page transitions:** 200ms fade
- **Modal/drawer entrance:** 250ms ease-out, translate Y 8px → 0
- Avoid animations that delay user input by more than 100ms

---

## Accessibility

- Minimum contrast ratio: 4.5:1 for body text, 3:1 for large text and UI components
- All interactive elements must have a visible focus state
- Form inputs must have associated `<label>` elements (not just placeholders)
- Color is never the only means of conveying state

---

## What Changed from v1 (Dark Theme POC)

| Element | v1 (POC) | v2 (Current) |
|---|---|---|
| Page background | Near-black `#0D0B1A` with starfield | Light grey `#F9F9FB` |
| Text | White / light grey | Dark `#1A1830` / mid grey |
| Cards | Dark glass / outlined | White with subtle border + shadow |
| CTAs | Filled purple on dark | Filled purple on light (same color) |
| Accent use | Purple used broadly | Purple reserved for primary action only |
| Tone | Immersive / dramatic | Clean / professional |
