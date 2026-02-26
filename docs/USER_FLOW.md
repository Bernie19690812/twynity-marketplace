# Twynity — User Flow Documentation
**Version:** 2.0
**Updated:** February 2026
**Status:** Active

---

## Overview

This document defines the full user journey through the Twynity platform — from landing page through twin creation, dashboard management, and marketplace publishing. It is the source of truth for frontend user flow decisions.

---

## Flow Map

```
Landing Page
    │
    ├──► Browse Marketplace  ──► View Twin ──► Subscribe
    │
    └──► Create Your Twin
              │
         [Auth Gate]
         Sign up / Log in
              │
         Step 1 of 4: Identity
         Name, Role, Personality
              │
         Step 2 of 4: Face & Voice
         Upload / Capture
              │
         Step 3 of 4: Deployment & Use Case  ← NEW
         How will this twin be used?
              │
         Step 4 of 4: Review & Confirm
         Preview before creation
              │
         My Twyns Dashboard (/app)
              │
              ├──► Chat with twin
              ├──► Edit twin
              └──► Publish to Marketplace
```

---

## Screen-by-Screen Specification

---

### Screen 0 — Landing Page

**URL:** `/`
**Purpose:** Communicate what Twynity is and convert visitors to either creators or marketplace browsers.

**Design direction:** Light background (`--color-grey-50` / `#F9F9FB`), typographic layout, purple used only on the primary CTA. The hero should feel like a modern SaaS product page, not a game or immersive dark-mode experience.

**Layout:**
- Sticky navigation: Twynity logo left, "Log in" and "Get started" right
- Hero section: large headline, one-line subtext, two CTAs
- Optional: 3-column feature highlights below the fold (deferred to v2.1)

**Copy:**
- Headline: `Build your AI workforce — starting with you.`
- Subtext: `Create a digital twin of yourself. Deploy it anywhere.`
- Primary CTA: `Create Your Twin →`
- Secondary CTA: `Browse Marketplace`

**Behaviour:**
- "Create Your Twin" → auth gate → Step 1 of 4
- "Browse Marketplace" → `/marketplace`
- Logged-in users skip the auth gate and go directly to Step 1 or My Twyns dashboard

---

### Screen 1 — Auth Gate

**URL:** `/login` (or modal overlay)
**Trigger:** User clicks "Create Your Twin" while not authenticated
**Purpose:** Minimal-friction sign-up or login

**Options:**
- Continue with Google
- Continue with email (magic link or password)

**Design note:** Prefer a modal or half-screen overlay rather than a full-page redirect to reduce perceived friction.

---

### Screen 2 — Create Twin: Step 1 of 4 — Identity

**URL:** `/create`
**Purpose:** Define the twin's name, role, and personality

**Fields:**

| Field | Type | Required | Placeholder |
|---|---|---|---|
| Name | Text input | Yes | `Your twin's name` |
| Role | Text input | No | `e.g. Sales lead, Coach, Assistant` |
| Personality | Textarea | No | `e.g. I'm a friendly coach who speaks briefly and gets straight to the point.` |

**Design notes:**
- White card container, max-width 560px, centred
- Progress indicator: step counter `Step 1 of 4`
- "Back" ghost link top left
- "Next" primary button bottom, full-width on mobile

**Validation:**
- Name is required before proceeding
- Role and Personality are optional but encouraged — show a tip if both are empty

---

### Screen 3 — Create Twin: Step 2 of 4 — Face & Voice

**URL:** `/create` (step state)
**Purpose:** Give the twin a face and voice

**Sections:**

**Use an existing avatar (optional)**
- Dropdown: select from marketplace avatars the user has purchased
- Helper text: `Choosing an avatar uses its face and voice. You can still customise the name and personality.`

**Face Image**
- Primary action: `Take selfie` (camera capture)
- Secondary: `Upload an image` (file picker, accepts JPG / PNG)
- Guidance: `Use a clear, front-facing photo with good lighting.`

**Voice**
- Primary action: `Record voice` (in-browser, 15–30 seconds)
- Secondary: `Upload audio file` (WAV preferred, MP3 accepted)
- Guidance: `Read a short passage naturally. This trains your twin's voice.`

**Design notes:**
- Each sub-section (Avatar / Face / Voice) uses a white card with a soft border
- Upload areas use a dashed-border drop zone, not a plain file button
- Show a thumbnail preview once a face image is selected
- Show a waveform or duration indicator once audio is uploaded

**Edge cases:**
- If no face image is provided: allow the user to proceed with a warning. The twin will display a placeholder avatar.
- If no voice is provided: allow the user to proceed. The twin will use a default TTS voice until a real voice is added. Show a nudge on the dashboard.

---

### Screen 4 — Create Twin: Step 3 of 4 — Deployment & Use Case *(NEW in v2)*

**URL:** `/create` (step state)
**Purpose:** Capture how the twin will be used so the system can optimise behaviour, and so the user consciously considers deployment before creation.

**This step serves two functions:**
1. Product intelligence — understanding use cases helps Twynity personalise the twin's default behaviour
2. User commitment — asking about deployment makes creation feel intentional, not trivial

**Fields:**

| Field | Type | Required | Notes |
|---|---|---|---|
| Primary use case | Single select | Yes | See options below |
| Deployment channel | Multi-select | No | Where will this twin appear? |
| Interaction style | Single select | No | Helps tune response length and tone |

**Primary use case options (7):**
- Personal assistant
- Sales & customer engagement
- Coaching or mentoring
- Education & training
- Creative or entertainment
- Internal team knowledge
- Other

**Deployment channel options (multi-select):**
- Twynity Marketplace
- Embedded on a website
- Internal team tool
- Social / messaging (WhatsApp, Slack, etc.)
- Not sure yet

**Interaction style options:**
- Brief and direct
- Conversational and warm
- Detailed and thorough

**Design notes:**
- Use card-based radio buttons for single-select fields (not dropdowns) — more visual, easier to scan
- Multi-select uses toggle chips
- If "Not sure yet" is selected for channel and no style is selected, allow the user to proceed — do not block on optional fields
- This step should feel light — a quick configuration, not a long form

**Placement rationale:** Positioned after Face & Voice (Step 2) because the user has already committed their likeness and is now thinking about output and deployment. Placing it before Step 1 would add friction before the user has emotional investment in the creation.

---

### Screen 5 — Create Twin: Step 4 of 4 — Review & Confirm

**URL:** `/create` (step state)
**Purpose:** Show a summary of all inputs before the twin is created. Reduces errors and increases perceived value.

**Layout:**
- Summary card showing: name, role, personality, face thumbnail, voice duration, use case, deployment channel, interaction style
- Each section has an inline `Edit` link that jumps back to the relevant step
- Primary CTA: `Create my twin →`
- Secondary: `Back`

**Design notes:**
- No editable fields on this screen — read-only summary only
- The face thumbnail should be prominent
- If any required fields are missing, show a banner with a direct link to fix them — do not block silently

---

### Screen 6 — My Twyns Dashboard

**URL:** `/app`
**Replaces:** `TwynBook` (all references updated throughout the app)
**Purpose:** The user's personal workspace for managing their twins

**Page header:**
- Title: `My Twyns`
- Subtitle: `Your digital twins`
- Description: `Select one to chat, or create a new twin.`

**Twin card design:**
- White card, soft border, hover shadow with purple tint
- Face image: square, rounded corners, full-width at card top
- Name: `--text-h3`, `--color-grey-900`
- Role snippet: `--text-body`, `--color-grey-600`, 2-line truncation
- Status chip: Published (green) or Draft (amber)
- Price: shown only if published
- Actions: `Chat` (primary), `Edit` (ghost), `Delete` (destructive text)
- Publish / Unpublish: secondary action shown below status chip

**Add new twin card:**
- Dashed border, light grey background
- Centred `+` icon and `Add new twin` label
- Hover: background becomes `--color-brand-xlight`

---

### Screen 7 — Marketplace

**URL:** `/marketplace`
**Purpose:** Browse and subscribe to published twins

*(Detailed spec in a separate MARKETPLACE_FLOW.md)*

---

## Step Summary Table

| Step | Screen | Key Input | Required fields |
|---|---|---|---|
| — | Landing | — | — |
| — | Auth | Email / Google | Yes |
| 1 of 4 | Identity | Name, Role, Personality | Name only |
| 2 of 4 | Face & Voice | Image, Audio | Recommended (not blocked) |
| 3 of 4 | Deployment & Use Case | Use case, Channel, Style | Use case only |
| 4 of 4 | Review & Confirm | Confirm all inputs | — |
| — | My Twyns | Manage / publish | — |

---

## Edge Cases & Error States

**No face image provided:** Allow proceeding with a warning. Show a placeholder avatar in the dashboard and mark the twin as "Incomplete".

**No voice provided:** Allow proceeding. The twin will use a default TTS voice until a real voice is added. Show a dashboard nudge.

**User abandons mid-flow:** Save progress automatically as a draft on every field change (debounced). On return, resume from where they left off with a banner: `You have an unfinished twin. Continue?`

**Duplicate twin name:** Warn inline on Step 1 if the user already has a twin with the same name. Do not block — allow duplicates with a visible warning.

---

## Terminology

| Old term | New term | Notes |
|---|---|---|
| TwynBook | My Twyns | Dashboard page title and all UI copy |
| Digital twin | Twin (UI copy) / Digital twin (formal / docs) | Use "twin" in conversational UI |
| About (personality field) | Personality | Label updated in Step 1 |
| Publish to marketplace | Publish | Shortened for UI |
| 3-step flow | 4-step flow | Step 3 (Deployment & Use Case) is new |
