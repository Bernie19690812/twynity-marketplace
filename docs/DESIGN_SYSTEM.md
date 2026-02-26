# Twynity Design System
**Version:** 2.0
**Updated:** February 2026
**Status:** Active

---

## Design Philosophy

Twynity's visual language is built on three principles:

- **Clarity first** — every element earns its place. No decorative noise.
- **Human at the center** — the product is about people, so the UI should feel warm, not cold.
- **Purposeful purple** — the brand colour is used sparingly and intentionally, not as wallpaper.

The v2 direction moves away from the dark, starfield aesthetic of the POC toward a light, typographic interface that lets the product content (the twins themselves) take centre stage.

---

## Colour Palette

### Brand Colours

| Token | Hex | Usage |
|---|---|---|
| `--color-brand-primary` | `#863DFF` | Primary CTAs, active states only |
| `--color-brand-mid` | `#5629B2` | Hover states on primary elements |
| `--color-brand-deep` | `#28195E` | Text on light backgrounds, dark accents |
| `--color-brand-light` | `#EDE8FF` | Card hover backgrounds, chips |
| `--color-brand-xlight` | `#F7F5FF` | Page section tints |

**Purple use rule:** Purple (`--color-brand-primary`) is reserved for the single primary CTA on each screen and active/selected states. It must not be used as a background fill, section colour, or decorative element.

### Neutral Colours

| Token | Hex | Usage |
|---|---|---|
| `--color-white` | `#FFFFFF` | Card backgrounds, modal backgrounds |
| `--color-grey-50` | `#F9F9FB` | Page / app shell background |
| `--color-grey-100` | `#F0EFF5` | Input backgrounds, dividers |
| `--color-grey-200` | `#E0DFF0` | Borders, subtle separators |
| `--color-grey-400` | `#9896B0` | Placeholder text, helper text |
| `--color-grey-600` | `#5E5C78` | Secondary body text |
| `--color-grey-900` | `#1A1830` | Primary body text, headings |

### Semantic Colours

| Token | Hex | Usage |
|---|---|---|
| `--color-success` | `#17A865` | Published / live status |
| `--color-success-light` | `#E6F7F0` | Success state backgrounds |
| `--color-warning` | `#F59E0B` | Draft / processing status |
| `--color-error` | `#E53E3E` | Destructive actions, error messages |

---

## Typography

**Primary font:** `Inter` — loaded via `next/font/google`. No other fonts are permitted.

System fallback stack: `-apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif`

### Type Scale

| Token | Size | Weight | Line Height | Usage |
|---|---|---|---|---|
| `--text-display` | 40px | 700 | 1.15 | Landing hero headline |
| `--text-h1` | 32px | 700 | 1.2 | Page titles |
| `--text-h2` | 24px | 600 | 1.3 | Section headings |
| `--text-h3` | 18px | 600 | 1.4 | Card titles, form section labels |
| `--text-body` | 16px | 400 | 1.6 | Body text, descriptions |
| `--text-small` | 12px | 400 | 1.5 | Helper text, metadata |
| `--text-label` | 12px | 600 | 1.4 | Tags, status chips, nav labels |

### Typography Rules

- Headings use `--color-grey-900`
- Body text uses `--color-grey-600`
- Never use more than two weights in a single component
- Avoid centring body text — reserve centring for hero / display text only

---

## Spacing System

Based on a **4px base unit**. All spacing values are multiples of 4.

| Token | Value | Common use |
|---|---|---|
| `--space-1` | 4px | Icon padding, tight inline gaps |
| `--space-2` | 8px | Inline element gaps |
| `--space-3` | 12px | Input inner padding |
| `--space-4` | 16px | Default component padding |
| `--space-5` | 20px | Card padding |
| `--space-6` | 24px | Section inner spacing |
| `--space-8` | 32px | Between sibling components |
| `--space-10` | 40px | Section gaps |
| `--space-16` | 64px | Page-level vertical rhythm |

---

## Layout

### Page Structure

- **Page background:** `--color-grey-50` (`#F9F9FB`)
- **Max content width:** 1200px, centred
- **Default horizontal padding:** 24px (mobile), 48px (tablet+), 80px (desktop)
- **Navigation height:** 64px, sticky, white background with `box-shadow: 0 1px 0 var(--color-grey-200)`

### Grid

- **Dashboard grid:** 3 columns (desktop), 2 (tablet), 1 (mobile)
- **Form max width:** 560px, centred
- **Landing sections:** full-width with centred content column (max 720px for text, 1100px for feature grids)

---

## Components

### Buttons

**Primary** — the single most important action on a screen

- Background: `--color-brand-primary` (`#863DFF`)
- Text: white, `--text-body`, 600 weight
- Padding: 12px 24px
- Border radius: 8px
- Hover: `--color-brand-mid`
- One primary button per view maximum

**Secondary** — supporting actions

- Background: white
- Border: 1.5px solid `--color-grey-200`
- Text: `--color-grey-900`
- Hover: border becomes `--color-brand-primary`, text becomes `--color-brand-primary`

**Destructive** — irreversible actions (Delete, Unpublish)

- Text-only or outlined style in `--color-error`
- Never use a filled red button

**Ghost / Link** — inline navigation (Back, Edit)

- No background or border
- Text: `--color-brand-primary`
- Underline on hover

### Cards

- Background: `--color-white`
- Border: 1px solid `--color-grey-200`
- Border radius: 12px
- Shadow: `0 1px 4px rgba(26, 24, 48, 0.06)`
- Hover shadow: `0 4px 16px rgba(134, 61, 255, 0.10)`
- Hover border: `--color-brand-light`
- Padding: 16px

### Form Inputs

- Background: white
- Border: 1.5px solid `--color-grey-200`
- Border radius: 8px
- Padding: 12px 16px
- Focus border: `--color-brand-primary`, focus ring: `0 0 0 3px var(--color-brand-xlight)`
- Placeholder: `--color-grey-400`
- Label: `--text-body`, 600 weight, `--color-grey-900`, 6px gap below label
- Labels must always be visible — placeholder-only labels are not allowed

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

- Use **Lucide React** icons throughout
- Default size: 20px (inline), 24px (standalone)
- Colour inherits from parent text — do not hardcode icon colours separately
- All icons must have an accessible label or tooltip
- Do not mix icon styles on the same screen

---

## Motion

- **Default transition:** `150ms ease-out` for colour, border, shadow
- **Page transitions:** 200ms fade
- **Modal / drawer entrance:** 250ms ease-out, translate Y 8px → 0
- Do not use animations that delay user input by more than 100ms
- No decorative or ornamental animation

---

## Accessibility

- Minimum contrast ratio: 4.5:1 for body text, 3:1 for large text and UI components
- All interactive elements must have a visible focus state
- Form inputs must have associated `<label>` elements
- Colour is never the only means of conveying state

---

## Explicit Prohibitions

- Black or near-black page backgrounds
- Dark glass card styles
- Starfield or gradient background patterns
- Purple as a background fill or decorative surface colour
- Any colour outside the palette defined in this document
- Fonts other than Inter
- Gradients on UI elements
- Mixed icon styles on the same screen
