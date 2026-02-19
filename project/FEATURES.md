# FEATURES.md — Feature Specifications

---

## Feature 1 — Landing page

### Hero section
- One-sentence explanation of what Twynity is.
- Single primary CTA directing the visitor to choose a journey.
- Must achieve LCP under 2.5 seconds — no heavy assets above the fold.

### Three option cards
Visually distinct cards, one per primary action.

Each card contains: title, 1–2 sentence description, primary CTA ("Start onboarding" / "Create org" / "Browse marketplace"), secondary CTA ("Talk to an onboarding agent").

Cards link to:
- `/onboarding/twin`
- `/onboarding/org`
- `/marketplace`

### Trust section
- Client/partner logo placeholders (images not required in MVP — use placeholder boxes).
- Security and hosting note placeholders ("Hosted on Azure", "ISO 27001 aligned" etc.).
- Copy to be confirmed before public release.

### Footer
- Contact placeholder link.
- Privacy policy placeholder link.
- Terms placeholder link.
- 4th-IR branding.

Fully responsive (mobile and desktop). Keyboard-navigable.

---

## Feature 2 — Chat-based onboarding (Digital Twin)

Chat UI collects the following structured fields:

| Field | Type | Required |
|---|---|---|
| twin_name | string | Yes |
| use_case | string | Yes |
| role_title | string | No |
| tone | enum: professional / friendly / concise / visionary / custom | Yes |
| knowledge_sources | string[] (URLs or placeholders) | No |
| channels | enum[]: web_chat / voice | Yes |
| consent | boolean | Yes |

Acceptance criteria:
- Chat supports user messages, assistant messages, optional quick-reply chips.
- Each turn attempts to extract updates and merge into the session state object.
- "Review & Edit Form" is accessible at any time.
- Missing required fields are clearly indicated before confirmation.

---

## Feature 3 — Chat-based onboarding (Virtual Organisation)

Chat UI collects the following structured fields:

| Field | Type | Required |
|---|---|---|
| org_name | string | Yes |
| industry_domain | string | Yes |
| primary_goal | string | Yes |
| persona_roster | { persona_name: string, persona_role: string }[] | Yes (min 1) |
| governance_rules | string | No |
| data_boundaries | string | No |
| admin_contact_email | string | Yes |

Acceptance criteria:
- Persona roster is built iteratively via chat ("Add another persona?" prompt).
- "Review & Edit Form" is accessible at any time.
- Required fields block final confirmation until complete.

---

## Feature 4 — Form-backed chat (progressive form filling)

A single source-of-truth state object is maintained for the active onboarding session. After each chat turn, extracted JSON is validated against the schema and merged into state. Manual edits to form fields override extracted values.

The form panel shows:
- All fields with editable inputs
- Completion status (e.g. "6 of 8 required fields completed")
- Field-level error indicators for missing required values

Implementation notes:
- Use a deterministic JSON schema per onboarding type for extraction.
- Validate extracted JSON before merging — never overwrite state with invalid data.
- Keep extraction logic in a dedicated utility function, not inside components.

---

## Feature 5 — Voice onboarding agent

"Talk to agent" button visible from landing page and onboarding screens.

When activated:
- Browser requests microphone permission.
- Live status indicator: Listening / Paused / Error.
- Spoken input is transcribed to text and appears in the chat thread.

On voice unavailable or permission denied:
- Clear error message displayed.
- User continues with text chat without losing progress.
- Stop button ends the voice session.

Technical choice: Web Speech API (browser-native). Document the choice in a code comment. Voice is optional — text must always work.

---

## Feature 6 — Confirmation + success screen

"Confirm & Create" button triggers:
1. Final validation of all required fields.
2. Save action (localStorage in MVP, backend endpoint in future).

Success screen shows:
- Summary of created Twin or Organisation.
- Two next-step CTAs: "Go to marketplace to upskill" (links to `/marketplace`) and "Edit settings" (stub, shows "coming soon").

---

## Feature 7 — Marketplace browsing

Categories (MVP):
- Communication Skills
- Tool Connectors
- Compliance & Policy Packs
- Knowledge Packs
- Workflows / Playbooks

Each module has: title, short_description, category, difficulty (beginner / intermediate / advanced), estimated_time, tags.

Acceptance criteria:
- Category browsing with module cards.
- Module detail page at `/marketplace/:moduleId`.
- "Save to plan" button persists module to LearningPlan in localStorage.
- "Apply to Digital Twin / Apply to Org Persona" button is a stub ("Coming soon").

---

## Feature 8 — State persistence

Onboarding session state persists across page refresh using localStorage. User can reset the active onboarding session (clears localStorage entry). Session is keyed by type: `onboarding_twin` and `onboarding_org`.

---

## Feature 9 — Error handling & empty states

Required in every screen:
- Network error: message + retry button.
- Validation error: field-level inline messages.
- Voice permission denied: inline message, fallback to text.
- Empty marketplace category: message explaining no modules exist yet.
- Loading: spinner or skeleton for chat extraction and page navigation.
