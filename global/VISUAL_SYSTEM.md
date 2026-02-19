# VISUAL_SYSTEM.md — 4th-IR Visual Language

**This system is locked. No visual rules may be invented outside this document. No alternative palettes, fonts, or decorative patterns are permitted.**

---

## Philosophy

The 4th-IR visual language is enterprise-ready, calm, and restrained. It prioritises clarity, hierarchy, consistency, and accessibility. Visual novelty and decoration are explicitly discouraged.

---

## Colour system — Legacy Blue Palette

This is the only permitted palette. Do not introduce any additional colours.

| Token | Hex | Usage |
|---|---|---|
| Deep Navy | `#12293F` | Base backgrounds, navigation bars, primary structural surfaces |
| Royal Blue | `#007AA4` | Primary CTAs, key interactive elements |
| Bright Cyan | `#00C2F3` | Active states, links, focused elements |
| Cyan Tint | `#D9F1FD` | Panels, cards, subtle background layers |
| White | `#FFFFFF` | Text on dark surfaces, neutral backgrounds |

Use tonal shades and tints of the above for hover states, disabled states, and elevation layers. Maintain accessible contrast at all times.

### Tailwind config mapping
```js
// tailwind.config.js
colors: {
  navy:     '#12293F',
  royal:    '#007AA4',
  cyan:     '#00C2F3',
  'cyan-tint': '#D9F1FD',
}
```

---

## Typography

**Font: Inter only.** No additional fonts may be introduced.

| Weight | Class | Usage |
|---|---|---|
| 300 Light | `font-light` | Timestamps, captions, secondary text |
| 400 Regular | `font-normal` | Body text, descriptions, general content |
| 500 Medium | `font-medium` | Navigation items, form labels, interactive elements |
| 600 Semibold | `font-semibold` | Card titles, metric titles, section headers |
| 700 Bold | `font-bold` | Main headings, important values |
| 900 Black | `font-black` | Primary headings or key metric values (use sparingly) |

Maintain clear hierarchy. Text must support fast scanning. Avoid decorative typography.

---

## Layout & spacing

- **12-column grid.**
- Base spacing increments: `8px` and `16px` only (Tailwind: `gap-2`, `gap-4`, `p-2`, `p-4`, etc.).
- No ad-hoc spacing values. Do not use arbitrary Tailwind values like `p-[13px]`.
- Layouts must be predictable, aligned, and consistent across screens.

---

## Components

### Cards
- Rounded corners: `rounded-2xl` (20–24px).
- Cards are the primary surface for grouping content.
- Avoid excessive nesting of cards within cards.
- Background: `bg-cyan-tint` or `bg-white`. Never introduce new background colours.

### Buttons
- **Primary:** Solid fill, `bg-royal` (`#007AA4`), white text.
- **Secondary:** Ghost/outline style, `border-royal`, `text-royal`.
- One primary action per screen — it must be visually dominant.
- Disabled states are visibly muted (not hidden). Use `opacity-50`.
- Hover and focus states must be clearly visible.

### Forms & inputs
- Labels must always be visible. Placeholder-only labels are not allowed.
- Consistent height across all input fields.
- Inline validation is preferred over submit-time validation.
- Error messages must be specific and actionable.
- Required fields must be clearly indicated.

### Tables & lists
- Clear row separation.
- Sortable headers where applicable.
- Empty states must explain what is missing and how to proceed.

### Modals & drawers
- One clear primary action per modal.
- Predictable dismissal: Escape key and outside-click both close.
- Modal stacking is not allowed.

---

## Motion & interaction

- Motion is used only for interaction feedback (state change communication).
- No decorative or ornamental animation.
- Transitions should be subtle: `transition-colors duration-150` or `transition-opacity duration-150`.

---

## Iconography

- Use a consistent, minimal icon style throughout.
- Icons must be line-based or solid monotone — do not mix styles within a screen.
- No gradients in icons.
- Icons inherit colour from their context (do not hardcode icon colours separately).
- Custom illustrative icons are not allowed.
- Recommended library: Lucide React (consistent line style, tree-shakeable).

---

## Explicit prohibitions

- Introducing colours outside the Legacy Blue Palette
- Introducing new fonts
- Decorative gradients in UI elements
- Mixing icon styles on the same screen
- Visual experimentation not grounded in this document
- "Creative reinterpretation" of the brand
