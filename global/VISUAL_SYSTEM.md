# Twynity Visual System

A single reference for all design tokens, components, layout patterns, and Claude Code prompting conventions. This file replaces `01-tokens.md`, `02-components.md`, `03-patterns.md`, and `04-claude-code-guide.md`.

---

## 1. Design Tokens

All values are CSS custom properties defined in `:root`. Copy this entire block into your `<style>`.

### CSS Variables

```css
:root {
  /* Backgrounds — dark to light elevation layers */
  --bg-base:     #080810;   /* page background */
  --bg-surface:  #0f0f1a;   /* panels, sidebars, nav */
  --bg-elevated: #161625;   /* cards, inputs, elevated containers */
  --bg-overlay:  #1e1e30;   /* modals, toasts, overlays */
  --bg-hover:    #252538;   /* hover states, scrollbar thumb */

  /* Brand — Violet scale */
  --violet-950:  #120820;
  --violet-900:  #1a0a2e;
  --violet-700:  #4c1d95;
  --violet-600:  #6d28d9;
  --violet-500:  #7c3aed;   /* primary action color */
  --violet-400:  #8b5cf6;   /* hover / active accent */
  --violet-300:  #a78bfa;   /* active tab text, links */

  /* Accent colors */
  --cyan:      #22d3ee;
  --cyan-dim:  rgba(34,211,238,0.12);
  --green:     #10b981;
  --green-dim: rgba(16,185,129,0.12);
  --amber:     #f59e0b;
  --red:       #ef4444;
  --red-dim:   rgba(239,68,68,0.12);

  /* Text hierarchy */
  --text-1: #f0f0f8;   /* primary text */
  --text-2: #9898b8;   /* secondary text */
  --text-3: #5e5e78;   /* tertiary / muted */
  --text-4: #3a3a52;   /* disabled / hints */

  /* Borders — white at low opacity */
  --b0: rgba(255,255,255,0.04);   /* subtle dividers */
  --b1: rgba(255,255,255,0.08);   /* card borders */
  --b2: rgba(255,255,255,0.13);   /* input borders */
  --b3: rgba(255,255,255,0.22);   /* strong borders */
  --bv: rgba(124,58,237,0.45);    /* violet focus ring */

  /* Shadows */
  --s1: 0 1px 3px rgba(0,0,0,0.4), 0 1px 2px rgba(0,0,0,0.3);
  --s2: 0 4px 16px rgba(0,0,0,0.5), 0 2px 6px rgba(0,0,0,0.3);
  --s3: 0 8px 40px rgba(0,0,0,0.7);
  --gv: 0 0 20px rgba(124,58,237,0.3);   /* violet glow */
  --gc: 0 0 14px rgba(34,211,238,0.25);  /* cyan glow */

  /* Spacing — 8px base grid */
  --sp-1: 4px;   --sp-2: 8px;   --sp-3: 12px;  --sp-4: 16px;
  --sp-5: 20px;  --sp-6: 24px;  --sp-7: 28px;  --sp-8: 32px;
  --sp-9: 36px;  --sp-10: 40px;

  /* Fixed heights */
  --h-btn-sm: 32px;
  --h-btn-md: 36px;
  --h-btn-lg: 40px;
  --h-input:  36px;
  --h-nav:    52px;

  /* Border radius */
  --r-xs:   4px;
  --r-sm:   6px;
  --r-md:   8px;
  --r-lg:   12px;
  --r-xl:   16px;
  --r-2xl:  20px;
  --r-full: 9999px;   /* pill / circle */

  /* Font families */
  --ff-display: 'Syne', sans-serif;      /* headings, titles */
  --ff-body:    'DM Sans', sans-serif;   /* body text, buttons */
  --ff-mono:    'DM Mono', monospace;    /* labels, meta, code */
}
```

### Google Fonts Import

```html
<link href="https://fonts.googleapis.com/css2?family=Syne:wght@400;500;600;700;800&family=DM+Sans:ital,wght@0,300;0,400;0,500;1,400&family=DM+Mono:wght@400;500&display=swap" rel="stylesheet">
```

### Typography Scale

| Use | Font | Size | Weight | Color |
|---|---|---|---|---|
| Page title | Syne | 32px | 700 | --text-1 |
| Section title | Syne | 18px | 700 | --text-1 |
| Card title | Syne | 13px | 700 | --text-1 |
| Body text | DM Sans | 14px | 400 | --text-1 |
| Button text | DM Sans | 13px | 500 | varies |
| Secondary text | DM Sans | 12px | 400 | --text-2 |
| Description | DM Sans | 11px | 400 | --text-3 |
| Section label | DM Mono | 10–11px | 500 | --text-4 |
| Tiny meta / timestamps | DM Mono / DM Sans | 9–10px | 400 | --text-4 |

### Color Usage Rules

- **Primary actions** — `--violet-500` background, white text
- **Secondary actions** — `--bg-elevated` background, `--text-2` text, `--b2` border
- **Ghost actions** — transparent background, `--text-2` text, `--b1` border
- **Success state** — `--green` background, white text
- **Danger state** — `--red` background, white text
- **Links** — `--violet-400`, hover `--violet-300`
- **Online indicators** — `--green` with a 6px dot
- **Pricing badges** — violet for paid, green for free, cyan for teams, amber for premium

### Background Elevation Layers

From back to front:

1. `--bg-base` — page
2. `--bg-surface` — sidebars, nav bars, panels
3. `--bg-elevated` — cards, inputs, list items
4. `--bg-overlay` — modals, toasts (with `backdrop-filter: blur(16px)`)
5. `--bg-hover` — hover states on elevated elements

Never skip a level — each layer should sit visually above the one before it.

### Grain Overlay

Every page gets a subtle noise texture on `body::after`:

```css
body::after {
  content: '';
  position: fixed;
  inset: 0;
  z-index: 9999;
  pointer-events: none;
  opacity: 0.03;
  background: url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E");
}
```

---

## 2. Component Library

### Reset & Base

```css
*, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
html, body { height: 100%; overflow: hidden; }
body {
  font-family: var(--ff-body);
  font-size: 14px;
  line-height: 1.5;
  background: var(--bg-base);
  color: var(--text-1);
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}
```

### Screen System

Each view is a `.screen` div. Only one is `.active` at a time. Toggle via JS.

```css
.screen { display: none; height: 100vh; flex-direction: column; overflow: hidden; }
.screen.active { display: flex; }
```

```html
<div class="screen active" id="s-home">...</div>
<div class="screen" id="s-settings">...</div>
```

```js
function go(id) {
  document.querySelectorAll('.screen').forEach(s => s.classList.toggle('active', s.id === id));
}
```

### Buttons

```css
.btn {
  display: inline-flex; align-items: center; justify-content: center; gap: 8px;
  height: var(--h-btn-md); padding: 0 16px; border-radius: var(--r-sm);
  font-size: 13px; font-weight: 500; font-family: var(--ff-body);
  border: none; cursor: pointer; transition: all 0.15s;
  text-decoration: none; white-space: nowrap; user-select: none;
}
.btn:hover    { filter: brightness(1.1); }
.btn:active   { transform: scale(0.97); }
.btn:disabled { opacity: 0.5; cursor: not-allowed; pointer-events: none; }

.btn-primary   { background: var(--violet-500); color: #fff; }
.btn-primary:hover { background: var(--violet-400); }
.btn-secondary { background: var(--bg-elevated); color: var(--text-2); border: 1px solid var(--b2); }
.btn-secondary:hover { background: var(--bg-hover); color: var(--text-1); }
.btn-ghost     { background: transparent; color: var(--text-2); border: 1px solid var(--b1); }
.btn-ghost:hover { background: var(--bg-elevated); color: var(--text-1); }
.btn-danger    { background: var(--red); color: #fff; }
.btn-success   { background: var(--green); color: #fff; }

.btn-sm   { height: var(--h-btn-sm); padding: 0 12px; font-size: 12px; }
.btn-lg   { height: var(--h-btn-lg); padding: 0 20px; font-size: 14px; }
.btn-icon { width: var(--h-btn-md); padding: 0; }
```

```html
<button class="btn btn-primary">Save Changes</button>
<button class="btn btn-secondary">Cancel</button>
<button class="btn btn-ghost btn-sm">Back</button>
<button class="btn btn-primary btn-lg">Get Started &rarr;</button>
<button class="btn btn-danger btn-sm">Delete</button>
<button class="btn btn-success" disabled>&#10003; Done</button>
```

Async state transition:
```js
btn.disabled = true;
btn.textContent = 'Saving...';
setTimeout(() => {
  btn.textContent = '\u2713 Saved';
  btn.classList.remove('btn-primary');
  btn.classList.add('btn-success');
}, 800);
```

### Form Inputs

```css
.input {
  height: var(--h-input); background: var(--bg-elevated);
  border: 1px solid var(--b2); border-radius: var(--r-sm);
  padding: 0 12px; color: var(--text-1); font-size: 13px;
  font-family: var(--ff-body); outline: none;
  transition: border-color 0.15s; width: 100%;
}
.input:focus { border-color: var(--bv); }

select.input {
  appearance: none; cursor: pointer;
  background-image: url("data:image/svg+xml,%3Csvg width='10' height='6' viewBox='0 0 10 6' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M1 1L5 5L9 1' stroke='%239898b8' stroke-width='1.5' stroke-linecap='round' stroke-linejoin='round'/%3E%3C/svg%3E");
  background-repeat: no-repeat;
  background-position: right 12px center;
  padding-right: 32px;
}

textarea.input { height: auto; padding: 10px 12px; resize: none; line-height: 1.5; }
```

```html
<input class="input" type="text" placeholder="Enter name...">
<select class="input">
  <option>Option 1</option>
</select>
<textarea class="input" rows="4" placeholder="Describe..."></textarea>

<!-- With label -->
<div style="margin-bottom: 12px;">
  <label style="font-size:12px;font-weight:500;color:var(--text-2);display:block;margin-bottom:4px;">
    Field Label
  </label>
  <input class="input" placeholder="...">
</div>
```

### Nav Bar

```css
.nav {
  height: var(--h-nav); background: var(--bg-surface);
  border-bottom: 1px solid var(--b0);
  display: flex; align-items: center; padding: 0 16px;
  flex-shrink: 0; z-index: 100;
}
.nav-logo { display: flex; align-items: center; cursor: pointer; user-select: none; }
.nav-logo img { height: 28px; width: auto; display: block; }
.nav-tabs { display: flex; align-items: center; gap: 4px; margin-left: 32px; }
.nav-tab {
  height: var(--h-nav); display: flex; align-items: center; padding: 0 14px;
  font-size: 13px; color: var(--text-3); cursor: pointer;
  border-bottom: 2px solid transparent; transition: all 0.15s; user-select: none;
}
.nav-tab:hover { color: var(--text-2); }
.nav-tab.is-active { color: var(--violet-300); border-bottom-color: var(--violet-400); }
.nav-spacer { flex: 1; }
.nav-end { display: flex; align-items: center; gap: 10px; }
.nav-user {
  width: 32px; height: 32px; border-radius: var(--r-full);
  background: linear-gradient(135deg, var(--violet-600), var(--violet-400));
  display: flex; align-items: center; justify-content: center;
  font-size: 11px; font-weight: 600; color: #fff; cursor: pointer;
}
```

```html
<div class="nav">
  <div class="nav-logo" onclick="go('s-home')">
    <img src="logo.png" alt="Logo">
  </div>
  <div class="nav-tabs">
    <div class="nav-tab is-active" onclick="go('s-home')">Home</div>
    <div class="nav-tab" onclick="go('s-settings')">Settings</div>
  </div>
  <div class="nav-spacer"></div>
  <div class="nav-end">
    <button class="btn btn-primary btn-sm">Action</button>
    <div class="nav-user">AB</div>
  </div>
</div>
```

### Badges

```css
.badge {
  display: inline-flex; align-items: center; padding: 2px 8px;
  border-radius: var(--r-full); font-size: 10px; font-weight: 500; line-height: 1.4;
}
.badge-v     { background: rgba(124,58,237,0.15); color: var(--violet-300); }
.badge-g     { background: var(--green-dim); color: var(--green); }
.badge-c     { background: var(--cyan-dim); color: var(--cyan); }
.badge-a     { background: rgba(245,158,11,0.12); color: var(--amber); }
.badge-muted { background: var(--bg-hover); color: var(--text-3); }
```

```html
<span class="badge badge-v">Pro</span>
<span class="badge badge-g">Active</span>
<span class="badge badge-c">$29/mo</span>
<span class="badge badge-a">Premium</span>
<span class="badge badge-muted">Default</span>
```

### Avatars

```css
.av {
  border-radius: var(--r-full);
  display: flex; align-items: center; justify-content: center;
  font-weight: 600; color: #fff; flex-shrink: 0;
}
.av-20 { width: 20px; height: 20px; font-size: 8px; }
.av-24 { width: 24px; height: 24px; font-size: 9px; }
.av-28 { width: 28px; height: 28px; font-size: 10px; }
.av-32 { width: 32px; height: 32px; font-size: 11px; }
.av-40 { width: 40px; height: 40px; font-size: 14px; }
.av-48 { width: 48px; height: 48px; font-size: 16px; }
.av-80 { width: 80px; height: 80px; font-size: 28px; }

.av-violet  { background: linear-gradient(135deg, var(--violet-600), var(--violet-400)); }
.av-teal    { background: linear-gradient(135deg, #0d9488, #2dd4bf); }
.av-emerald { background: linear-gradient(135deg, #059669, #34d399); }
.av-rose    { background: linear-gradient(135deg, #e11d48, #fb7185); }
.av-amber   { background: linear-gradient(135deg, #d97706, #fbbf24); }
```

```html
<div class="av av-32 av-violet">JD</div>
<div class="av av-48 av-teal">A</div>
<div class="av av-80 av-rose">M</div>

<!-- Overlapping stack -->
<div style="display:flex;">
  <div class="av av-24 av-violet" style="border:2px solid var(--bg-elevated);">A</div>
  <div class="av av-24 av-teal" style="margin-left:-6px;border:2px solid var(--bg-elevated);">B</div>
  <div class="av av-24 av-rose" style="margin-left:-6px;border:2px solid var(--bg-elevated);">C</div>
</div>
```

### Toast Notifications

```css
.toast {
  position: fixed; bottom: 80px; left: 50%;
  transform: translateX(-50%) translateY(20px);
  background: var(--bg-overlay); border: 1px solid var(--b2);
  border-radius: var(--r-lg); padding: 10px 18px;
  display: flex; align-items: center; gap: 10px;
  font-size: 13px; color: var(--text-1); z-index: 9000;
  opacity: 0; pointer-events: none; transition: all 0.3s ease;
  backdrop-filter: blur(16px); box-shadow: var(--s2);
}
.toast.show { opacity: 1; transform: translateX(-50%) translateY(0); pointer-events: auto; }
.toast-dot { width: 8px; height: 8px; border-radius: var(--r-full); flex-shrink: 0; }
```

```html
<div class="toast" id="toast-el">
  <span class="toast-dot" id="toast-dot"></span>
  <span id="toast-msg"></span>
</div>
```

```js
let toastTimer;
function toast(msg, type) {
  const el = document.getElementById('toast-el');
  const dot = document.getElementById('toast-dot');
  const colors = { violet:'#8b5cf6', green:'#10b981', cyan:'#22d3ee', amber:'#f59e0b' };
  document.getElementById('toast-msg').textContent = msg;
  dot.style.background = colors[type] || colors.violet;
  el.classList.add('show');
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => el.classList.remove('show'), 2800);
}
// Usage: toast('Item saved successfully', 'green')
```

### Scrollbar

```css
::-webkit-scrollbar { width: 4px; }
::-webkit-scrollbar-track { background: transparent; }
::-webkit-scrollbar-thumb { background: var(--bg-hover); border-radius: var(--r-full); }
```

### Animations

```css
@keyframes popIn {
  0%   { transform: scale(0); opacity: 0; }
  70%  { transform: scale(1.1); }
  100% { transform: scale(1); opacity: 1; }
}
@keyframes cardIn {
  0%   { transform: translateY(10px); opacity: 0; }
  100% { transform: translateY(0); opacity: 1; }
}
@keyframes fadeUp {
  0%   { transform: translateY(12px); opacity: 0; }
  100% { transform: translateY(0); opacity: 1; }
}
@keyframes msgIn {
  0%   { transform: translateY(8px); opacity: 0; }
  100% { transform: translateY(0); opacity: 1; }
}
@keyframes spin {
  0%   { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}
```

```html
<div style="animation: cardIn 0.3s ease both;">Card content</div>
<div style="animation: fadeUp 0.4s ease 0.2s both;">Delayed element</div>
<div style="animation: popIn 0.5s ease both;">Celebration icon</div>
```

Stagger delays for sequential reveals: `0s`, `0.1s`, `0.2s`, etc.

---

## 3. Layout Patterns

### Full-Screen Centered (Welcome / Landing)

Centered content over a dot-grid background with a radial glow.

```css
.dot-grid {
  background-image: radial-gradient(circle, var(--text-4) 0.7px, transparent 0.7px);
  background-size: 24px 24px;
}
.welcome-body {
  flex: 1; display: flex; align-items: center; justify-content: center;
  position: relative; overflow: hidden;
}
.welcome-glow {
  position: absolute; width: 400px; height: 400px;
  background: radial-gradient(circle, rgba(124,58,237,0.15), transparent 70%);
  pointer-events: none;
}
.welcome-content {
  position: relative; z-index: 1; text-align: center;
  display: flex; flex-direction: column; align-items: center; gap: 24px;
}
```

```html
<div class="screen active" id="s-welcome">
  <div class="welcome-body dot-grid">
    <div class="welcome-glow"></div>
    <div class="welcome-content">
      <img src="logo.png" alt="Logo" style="height:48px;">
      <div style="font-family:var(--ff-display);font-size:32px;font-weight:700;">
        Your headline here.
      </div>
      <div style="font-size:14px;color:var(--text-3);max-width:440px;">
        Supporting description text.
      </div>
      <div style="display:flex;gap:12px;margin-top:8px;">
        <button class="btn btn-primary btn-lg">Primary CTA &rarr;</button>
        <button class="btn btn-secondary btn-lg">Secondary CTA</button>
      </div>
    </div>
  </div>
</div>
```

### Three-Column Layout (Dashboard / Studio)

Left sidebar (fixed) + Center content (flex) + Right sidebar (fixed).

```css
.dashboard-body {
  flex: 1;
  display: grid;
  grid-template-columns: 280px 1fr 260px;
  overflow: hidden;
}
.panel-left {
  background: var(--bg-surface); border-right: 1px solid var(--b0);
  display: flex; flex-direction: column; overflow-y: auto; padding: 20px 16px;
}
.panel-center {
  background: var(--bg-base); display: flex; flex-direction: column; overflow: hidden;
}
.panel-right {
  background: var(--bg-surface); border-left: 1px solid var(--b0);
  display: flex; flex-direction: column; padding: 16px;
}
```

For a 2-column layout: `grid-template-columns: 280px 1fr;`

### Two-Column Split (Onboarding / Forms)

Left preview panel + Right form panel. Used for multi-step wizards.

```css
.split-body {
  flex: 1; display: grid; grid-template-columns: 460px 1fr; overflow: hidden;
}
.split-preview {
  display: flex; align-items: center; justify-content: center; position: relative;
}
.split-form {
  background: var(--bg-surface); border-left: 1px solid var(--b0);
  display: flex; flex-direction: column;
}
.split-form-header { padding: 20px 24px 0; }
.split-form-body   { flex: 1; overflow-y: auto; padding: 16px 24px; }
.split-form-footer {
  padding: 14px 24px; border-top: 1px solid var(--b0);
  display: flex; align-items: center; gap: 8px;
}
```

### Section Headers

Used above card grids and listing sections.

```css
.section-hdr {
  display: flex; align-items: center; justify-content: space-between; margin-bottom: 14px;
}
.section-title {
  font-family: var(--ff-mono); font-size: 11px;
  text-transform: uppercase; color: var(--text-4); letter-spacing: 0.5px;
}
.section-link { font-size: 11px; color: var(--violet-400); cursor: pointer; }
```

```html
<div class="section-hdr">
  <span class="section-title">Category Name</span>
  <span class="section-link">See all &rarr;</span>
</div>
```

### Marketplace Card

```css
.mkt-card {
  background: var(--bg-elevated); border: 1px solid var(--b1);
  border-radius: var(--r-xl); padding: 16px;
  cursor: pointer; transition: all 0.2s; position: relative; overflow: hidden;
}
.mkt-card::before {
  content: ''; position: absolute; top: 0; left: 0; right: 0; height: 2px;
  background: linear-gradient(90deg, var(--violet-500), var(--cyan));
  opacity: 0; transition: opacity 0.2s;
}
.mkt-card:hover { transform: translateY(-2px); box-shadow: var(--s2); border-color: var(--b2); }
.mkt-card:hover::before { opacity: 1; }
```

```html
<div class="mkt-card">
  <div style="font-size:20px;margin-bottom:10px;">&#128187;</div>
  <div style="font-family:var(--ff-display);font-size:13px;font-weight:700;">Card Title</div>
  <div style="font-size:10px;color:var(--text-4);margin-bottom:6px;">Category</div>
  <div style="margin-bottom:8px;"><span class="badge badge-c">$29/mo</span></div>
  <div style="font-size:11px;color:var(--text-3);margin-bottom:12px;">Description text here</div>
  <button class="btn btn-primary btn-sm">Action</button>
</div>
```

Grid: `display: grid; grid-template-columns: repeat(3, 1fr); gap: 12px;`
For 4 columns: `grid-template-columns: repeat(4, 1fr);`

### Chat Panel

```css
.chat-panel { background: var(--bg-base); display: flex; flex-direction: column; overflow: hidden; }
.chat-head {
  height: 52px; background: var(--bg-surface); border-bottom: 1px solid var(--b0);
  display: flex; align-items: center; padding: 0 16px; gap: 10px; flex-shrink: 0;
}
.chat-msgs {
  flex: 1; overflow-y: auto; padding: 16px; display: flex; flex-direction: column; gap: 12px;
}
.chat-msg { display: flex; align-items: flex-start; gap: 8px; }
.chat-msg.is-user { flex-direction: row-reverse; }
.chat-bubble {
  padding: 8px 14px; border-radius: var(--r-lg);
  font-size: 13px; line-height: 1.5; max-width: 380px; word-wrap: break-word;
}
.is-ai .chat-bubble   { background: var(--bg-elevated); border: 1px solid var(--b1); }
.is-user .chat-bubble { background: var(--violet-700); border: 1px solid var(--bv); }
.chat-ts { font-size: 9px; color: var(--text-4); margin-top: 3px; padding: 0 4px; }
.chat-input-wrap {
  padding: 12px 16px; border-top: 1px solid var(--b0);
  background: var(--bg-surface); flex-shrink: 0;
}
.chat-input-inner { display: flex; align-items: flex-end; gap: 8px; }
.chat-field {
  flex: 1; background: var(--bg-elevated); border: 1px solid var(--b2);
  border-radius: var(--r-md); padding: 8px 12px; color: var(--text-1);
  font-size: 13px; font-family: var(--ff-body);
  resize: none; outline: none; min-height: 36px; max-height: 80px;
}
.chat-field:focus { border-color: var(--bv); }
.send-btn {
  width: 36px; height: 36px; border-radius: var(--r-md);
  background: var(--violet-500); border: none; color: #fff;
  cursor: pointer; display: flex; align-items: center; justify-content: center;
  font-size: 16px; flex-shrink: 0;
}
.send-btn:hover { background: var(--violet-400); }
```

Auto-resize + Enter to send:
```js
document.querySelectorAll('.chat-field').forEach(ta => {
  ta.addEventListener('input', () => {
    ta.style.height = 'auto';
    ta.style.height = Math.min(ta.scrollHeight, 80) + 'px';
  });
  ta.addEventListener('keydown', e => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      ta.closest('.chat-input-inner').querySelector('.send-btn').click();
    }
  });
});
```

### Proto Footer (Development Navigation)

Fixed bottom bar with dots for quick screen switching during prototyping.

```css
.proto-footer {
  position: fixed; bottom: 0; left: 0; right: 0; z-index: 8000;
  background: rgba(30,30,48,0.85); backdrop-filter: blur(12px);
  border-top: 1px solid var(--b0); height: 36px;
  display: flex; align-items: center; justify-content: center; gap: 12px;
}
.proto-dot {
  width: 10px; height: 10px; border-radius: var(--r-full);
  background: var(--bg-hover); border: 1px solid var(--b2);
  cursor: pointer; transition: all 0.15s;
}
.proto-dot:hover { background: var(--text-4); }
.proto-dot.is-active { background: var(--violet-500); border-color: var(--violet-400); }
.proto-name { font-family: var(--ff-mono); font-size: 10px; color: var(--text-3); margin-left: 12px; }
```

```html
<div class="proto-footer">
  <div class="proto-dot is-active" onclick="go('s-home')"></div>
  <div class="proto-dot" onclick="go('s-settings')"></div>
  <span class="proto-name" id="proto-name">Home</span>
</div>
```

---

## 4. Claude Code Guide

### Project Setup

Place this file in your project folder. Create a `CLAUDE.md` in the project root:

```markdown
# Project: [Your Product Name]

## Design System
This project uses the Twynity visual system. All UI must follow `visual_system.md`.

## Rules
- Single HTML file, self-contained (HTML + CSS + JS)
- Dark theme only — use the exact CSS variables from the tokens section
- Google Fonts: Syne (display), DM Sans (body), DM Mono (mono)
- All interactive elements must have onclick handlers — no dead ends
- Screen-based navigation using the `.screen` / `.screen.active` pattern
- Include proto footer with dots for all screens
- Include toast notification system
- Include grain overlay on body::after
```

### Starting a New Project

```
Build a single-page HTML app for [product description].
Follow the design system in visual_system.md exactly.
Use all the CSS tokens, components, and patterns documented there.

Screens needed:
1. [Screen name] — [description]
2. [Screen name] — [description]
3. [Screen name] — [description]

Key interactions:
- [interaction 1]
- [interaction 2]
```

### Adding a Screen

```
Add a new screen called "[Name]" (id="s-name") to the app.
Follow the design system in visual_system.md.
It should have:
- Nav bar with tabs (update existing screens to include new tab)
- [Layout type from Section 3 of visual_system.md]
- [Specific content]
Update the SCREENS object, proto footer, and keyboard shortcuts.
```

### Common Prompt Patterns

**Marketplace / Card Grid**
```
Create a grid of cards with:
- 3 columns (or 4 for smaller cards)
- Each card: icon, title (Syne 13px bold), category label, price badge, description, action button
- Hover: lift up 2px, show shadow, reveal gradient top line
- Button: "Add" → disabled "Adding..." → green "✓ Added"
```

**Dashboard with Sidebar**
```
Create a 3-column layout:
- Left sidebar (280px): profile card, section lists with mono uppercase headers
- Center: main content area (chat, feed, editor, etc.)
- Right sidebar (260px): supplementary info, team list, activity feed
All panels use bg-surface with b0 border dividers.
```

**Multi-Step Wizard**
```
Create a 2-step onboarding wizard:
- Left: live preview card (dot-grid background, centered card with glow)
- Right: form panel with step indicator bars
- Step bars: done (green), active (violet gradient), pending (bg-elevated)
- Footer: Back button (hidden on step 1), step label "1 / 2", Next button
- Final step: "Activate →" button that creates the entity and goes to success screen
```

**Success / Celebration Screen**
```
Full-screen centered layout with:
- Dot-grid background with green radial glow
- Large green checkmark (80px circle, popIn animation)
- Title in Syne 28px bold (fadeUp animation)
- Subtitle in 14px text-3 (fadeUp with 0.1s delay)
- Two CTA buttons (fadeUp with 0.2s delay)
```

### Key Principles

1. **No dead ends** — every button, link, and card must navigate, toast, or trigger an action
2. **State transitions on buttons** — primary → "Loading..." (disabled) → "✓ Done" (btn-success)
3. **Toast for everything** — confirmations, errors, status changes
4. **Consistent elevation** — base → surface → elevated → overlay. Never skip levels.
5. **Mono uppercase for section labels** — `font-family: var(--ff-mono); font-size: 10px; text-transform: uppercase; color: var(--text-4); letter-spacing: 0.5px;`
6. **Animate entrances** — use `cardIn`, `fadeUp`, or `popIn` on new elements. Stagger delays for groups.
7. **Dividers** — `height: 1px; background: var(--b0); margin: 16px 0;`
8. **8px spacing grid** — use `--sp-*` variables. Common gaps: 8, 12, 16, 24px.

### File Structure

```
project/
├── CLAUDE.md              ← project instructions for Claude Code
├── visual_system.md       ← this file
├── logo.png
└── my-app.html            ← the prototype (single file)
```
