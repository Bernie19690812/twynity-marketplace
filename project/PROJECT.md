# PROJECT.md — Twynity Marketplace Frontend

## One-liner

Build a Twynity landing page that guides users into one of three journeys: (1) onboard a Digital Twin, (2) onboard a Virtual Organisation, or (3) enter a Marketplace to upskill Virtual Personas.

## Primary goal

Convert visitors into onboarded users by making the first 5 minutes frictionless, guided, and conversational.

---

## Who the users are

- **Teams** exploring AI agents and Virtual Personas.
- **Individuals** onboarding a personal Digital Twin.
- **Organisation admins** setting up a Virtual Organisation (multi-persona workforce).

---

## Scope (MVP)

### Landing page (public)
- Hero section explaining Twynity in one sentence + primary CTA.
- Three main option cards, each with: short description, primary CTA ("Start onboarding" / "Create org" / "Browse marketplace"), secondary CTA ("Talk to an onboarding agent").
- Trust section (logo placeholders, security/hosting note placeholders).
- Simple footer (contact, privacy, terms placeholders).

### Guided onboarding (in-app)
- Digital Twin onboarding flow.
- Virtual Organisation onboarding flow.
- Marketplace entry point with categories and recommended upskilling paths.

### Conversational onboarding
- Chat-based creation flow — users type freely.
- Option to switch to voice conversation with an onboarding agent.
- Form is progressively filled from chat answers ("form-backed chat").

---

## User journeys

### Journey A — Digital Twin onboarding
1. User clicks "Onboard your Digital Twin".
2. Chat asks: goal, role, tone/personality, knowledge sources.
3. Form is auto-filled in the background; user can review and edit at any time.
4. Optional: "Talk to onboarding agent" (voice).
5. User confirms → "Create Digital Twin".
6. Success screen with next steps and "Go to marketplace to upskill".

### Journey B — Virtual Organisation onboarding
1. User clicks "Onboard a Virtual Organisation".
2. Chat collects: org name, domain, personas needed, governance rules, data boundaries.
3. Form auto-fills; user reviews and edits.
4. Optional: voice onboarding agent.
5. User confirms → "Create Virtual Organisation".
6. Success screen with suggested persona templates and marketplace recommendations.

### Journey C — Marketplace (upskilling)
1. User clicks "Marketplace".
2. Browse categories (Communication, Tools, Compliance, Knowledge Packs, Workflows).
3. Choose upskilling modules for personas — add to "persona learning plan".
4. "Apply to Digital Twin / Apply to Organisation persona" is a stub in MVP.

---

## UX principles

- **Start with chat** (lowest friction), but always provide "review form" for control.
- **Progressive disclosure** — ask only what is needed now.
- **Clear privacy boundary messaging** — communicate what is stored and what is optional.
- **One primary action per screen.**

---

## Non-functional requirements

- Landing page LCP under 2.5 seconds on a good connection.
- Mobile-first responsive layout.
- Accessibility: keyboard navigation, ARIA labels for chat and voice controls.
- No sensitive secrets on the frontend. Safe input handling throughout.

---

## Risks and open points (track explicitly)

- Voice support: browser permissions and device availability vary.
- "Chat to form" extraction quality depends on LLM prompt design and validation robustness.
- Data handling and privacy copy accuracy must be reviewed before any public release.

---

## Out of scope for MVP

- Payments, subscriptions, and invoicing.
- Multi-language support.
- Advanced analytics dashboards.
- Full persona runtime and orchestration (onboarding and marketplace browsing only).
- Deep integrations (Teams, ServiceNow, SAP) beyond placeholders.
- Backend persistence for onboarding sessions (localStorage is acceptable in MVP).
- "Apply to Twin / Org Persona" from the Marketplace (stub only).
- User accounts and full authentication (stub login flow is acceptable).
