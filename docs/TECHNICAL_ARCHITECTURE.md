# Twynity — Technical Architecture Overview
**Version:** 2.0
**Updated:** February 2026
**Status:** Active

---

## System Overview

Twynity is a platform for creating, managing, and deploying AI-powered digital twins. Users upload a face image and voice recording; the platform generates an interactive avatar that can respond in real time using the user's likeness and voice.

The frontend is a Next.js application. The backend is a FastAPI service. This document covers the frontend architecture and its integration points with the backend.

---

## Tech Stack

| Layer | Technology |
|---|---|
| Frontend framework | Next.js (App Router) |
| Styling | Tailwind CSS + CSS custom properties (design tokens) |
| Component library | shadcn/ui (base), custom Twynity components |
| Icons | Lucide React |
| State management | React Context + `useState` / `useReducer` (local); Zustand for global auth state |
| Form handling | React Hook Form + Zod validation |
| API communication | Axios + TanStack Query |
| Deployment | Vercel (frontend), FastAPI server (backend) |
| Auth | JWT token-based or OAuth (Google) — to be confirmed |

---

## Repository Structure

```
twynity-marketplace/
├── app/
│   ├── page.tsx                  # Landing page (/)
│   ├── login/
│   │   └── page.tsx              # Auth gate (/login)
│   ├── create/
│   │   └── page.tsx              # Twin creation flow — 4 steps (/create)
│   ├── app/
│   │   └── page.tsx              # My Twyns dashboard (/app)
│   └── marketplace/
│       └── page.tsx              # Marketplace browse (/marketplace)
├── components/
│   ├── ui/                       # Base primitives (Button, Input, Card, etc.)
│   ├── twin/
│   │   ├── TwinCard.tsx
│   │   ├── TwinForm/
│   │   │   ├── StepIdentity.tsx       # Step 1 — Name, Role, Personality
│   │   │   ├── StepFaceVoice.tsx      # Step 2 — Face image and voice upload
│   │   │   ├── StepDeployment.tsx     # Step 3 — Use case and deployment (NEW)
│   │   │   └── StepReview.tsx         # Step 4 — Read-only summary + confirm
│   │   └── TwinStatusChip.tsx
│   ├── marketplace/
│   │   └── MarketplaceCard.tsx
│   └── layout/
│       ├── Navbar.tsx
│       └── PageShell.tsx
├── lib/
│   ├── api.ts                    # Axios instance + interceptors
│   ├── types.ts                  # Shared TypeScript types
│   └── validation.ts             # Zod schemas per step
├── styles/
│   └── globals.css               # Design tokens, base styles
└── public/
    └── twynity-logo.svg
```

---

## TypeScript Types

### Creation Flow State

The 4-step creation flow is managed as a single page with internal step state.

```typescript
type CreationFlowState = {
  step: 1 | 2 | 3 | 4
  identity: {
    name: string
    role: string
    about: string
  }
  faceVoice: {
    avatarId: string | null           // purchased marketplace avatar, if selected
    faceImageFile: File | null
    faceImagePreviewUrl: string | null
    voiceFile: File | null
    voiceDurationSeconds: number | null
  }
  deployment: {                       // Step 3 — NEW
    useCase: UseCaseOption | null
    channels: DeploymentChannel[]
    interactionStyle: InteractionStyle | null
  }
}
```

### Deployment & Use Case Types (Step 3)

```typescript
type UseCaseOption =
  | 'personal_assistant'
  | 'sales_engagement'
  | 'coaching_mentoring'
  | 'education_training'
  | 'creative_entertainment'
  | 'internal_knowledge'
  | 'other'

type DeploymentChannel =
  | 'marketplace'
  | 'website_embed'
  | 'internal_tool'
  | 'social_messaging'
  | 'unsure'

type InteractionStyle =
  | 'brief_direct'
  | 'conversational_warm'
  | 'detailed_thorough'
```

### Twin (Dashboard Model)

```typescript
type Twin = {
  id: string
  name: string
  role: string
  about: string
  faceImageUrl: string
  voiceModelId: string
  useCase: UseCaseOption
  channels: DeploymentChannel[]
  interactionStyle: InteractionStyle | null
  status: 'draft' | 'processing' | 'ready' | 'published'
  marketplaceListing?: {
    price: number          // monthly, in USD
    publishedAt: string
  }
  createdAt: string
  updatedAt: string
}
```

---

## Page Architecture

### Landing Page (`/`)

Static page, no data fetching at build time. Navigation checks auth state client-side to conditionally show "Log in" vs "Go to My Twyns".

**Key components:** `Navbar`, `HeroSection`

---

### Twin Creation Flow (`/create`)

Multi-step form managed as a single page with internal step state (avoids URL-per-step complexity).

**Step routing logic:**
- Steps controlled by the `step` integer in `CreationFlowState`
- "Back" and "Next" update `step`
- On Step 4 "Create my twin →", the full form state is submitted to the API
- Draft auto-save: debounced `localStorage` write on each field change, cleared on successful submission

**Validation per step:**

| Step | Rule |
|---|---|
| Step 1 | `name` required (min 1 char, max 60 chars) |
| Step 2 | No hard block — warn if both face and voice are absent |
| Step 3 | `useCase` required before proceeding |
| Step 4 | Read-only; "Create" triggers final submission |

---

### My Twyns Dashboard (`/app`)

**Previously named:** TwynBook — all references updated to "My Twyns".
**Route:** `/app`

Authenticated route. Fetches the user's twins from the API on mount.

**API endpoints used:**
- `GET /twins` — fetch all user twins
- `DELETE /twins/:id` — delete a twin
- `POST /twins/:id/publish` — publish to marketplace
- `POST /twins/:id/unpublish` — remove from marketplace

**Component breakdown:**

| Component | Role |
|---|---|
| `MyTwynsPage` | Page shell, data fetching |
| `TwinGrid` | Responsive grid layout |
| `TwinCard` | Individual twin card with all actions |
| `AddTwinCard` | Dashed placeholder card, links to `/create` |

---

## API Integration

**Base URL (development):** `http://85.4.52.192:8087`
**Base URL (production):** TBD — configure via `NEXT_PUBLIC_API_URL`

### POST /twins — Create Twin Payload

The deployment fields from Step 3 are included in the twin creation request:

```typescript
// POST /twins  (multipart/form-data)
{
  name: string
  role: string
  about: string
  faceImage: File
  voiceFile: File
  useCase: UseCaseOption
  channels: DeploymentChannel[]
  interactionStyle: InteractionStyle | null
}
```

The backend uses `useCase` and `interactionStyle` to configure LLM system prompt defaults for the twin.

### Auth

Include JWT bearer token in `Authorization` header on all authenticated requests. Token stored in memory (not `localStorage`) for security; refresh handled via httpOnly cookie.

### Error Handling Convention

| Error type | Frontend behaviour |
|---|---|
| 4xx | Inline validation message or toast notification |
| 5xx | Generic error state with retry option |
| Network failure | Detect with `AbortController` timeout (5s reads, 30s file uploads) |

---

## Environment Variables

```bash
NEXT_PUBLIC_API_URL=http://85.4.52.192:8087   # Backend base URL
NEXT_PUBLIC_APP_ENV=development               # 'development' | 'production'
```

---

## Performance Notes

The original FastAPI backend had 4–10 second response times on twin interaction. Frontend mitigations:

- Show an optimistic loading state immediately on form submission (`"Creating your twin…"` spinner)
- Use polling or WebSocket to check twin processing status rather than blocking the UI
- Show twins with a `processing` status chip while the backend generates the voice model
- File uploads (face image, voice) use `XMLHttpRequest` with `onprogress` for progress bars

---

## Naming & Terminology Changes (v1 → v2)

| Old | New | Where it appears |
|---|---|---|
| `TwynBook` | `My Twyns` | Page title, route label, all UI copy |
| `<h1>TwynBook</h1>` on dashboard | `<h1>My Twyns</h1>` | Dashboard page |
| `twinbook` (internal identifiers) | `my-twyns` or `dashboard` | Route names, component names |
| 3-step creation flow | 4-step creation flow | Progress indicator, all documentation |
| — | `StepDeployment.tsx` | New component — Step 3 |
| — | `UseCaseOption`, `DeploymentChannel`, `InteractionStyle` | New TypeScript types |

---

## Deployment

**Frontend:** Vercel, connected to `main` branch of `github.com/Bernie19690812/twynity-marketplace`. Auto-deploys on push to `main`.

**Environment:** Set `NEXT_PUBLIC_API_URL` in Vercel project settings to point to the production backend.

**Build command:** `next build`
**Output directory:** `.next`
**Node version:** 18+
