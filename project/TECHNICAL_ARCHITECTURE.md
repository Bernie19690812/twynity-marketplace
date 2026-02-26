# Twynity — Technical Architecture Overview
**Version:** 2.0  
**Updated:** February 2026  
**Status:** Active

---

## System Overview

Twynity is a platform for creating, managing, and deploying AI-powered digital twins. Users upload a face image and voice recording; the platform generates an interactive avatar that can respond in real time using the user's likeness and voice.

The frontend is a Next.js application deployed on Vercel. The backend is a FastAPI service. This document covers the frontend architecture and its integration points with the backend.

---

## Tech Stack

| Layer | Technology |
|---|---|
| Frontend framework | Next.js (App Router) |
| Styling | Tailwind CSS + CSS custom properties (design tokens) |
| Component library | Shadcn/ui (base), custom Twynity components |
| Icons | Lucide React |
| State management | React Context + `useState` / `useReducer` (local), Zustand for global auth state |
| Form handling | React Hook Form + Zod validation |
| API communication | `fetch` with typed wrappers / TanStack Query for server state |
| Deployment | Vercel (frontend), separate FastAPI server (backend) |
| Auth | To be confirmed — JWT token-based or OAuth (Google) |

---

## Repository Structure

```
twynity-marketplace/
├── app/
│   ├── page.tsx                  # Landing page (/)
│   ├── login/
│   │   └── page.tsx              # Auth gate
│   ├── create/
│   │   └── page.tsx              # Twin creation flow (4 steps)
│   ├── app/
│   │   └── page.tsx              # My Twyns dashboard (/app)
│   └── marketplace/
│       └── page.tsx              # Marketplace browse
├── components/
│   ├── ui/                       # Base components (Button, Input, Card, etc.)
│   ├── twin/                     # Twin-specific components
│   │   ├── TwinCard.tsx
│   │   ├── TwinForm/
│   │   │   ├── StepIdentity.tsx
│   │   │   ├── StepFaceVoice.tsx
│   │   │   ├── StepDeployment.tsx    ← NEW
│   │   │   └── StepReview.tsx
│   │   └── TwinStatusChip.tsx
│   ├── marketplace/
│   │   └── MarketplaceCard.tsx
│   └── layout/
│       ├── Navbar.tsx
│       └── PageShell.tsx
├── lib/
│   ├── api.ts                    # API client wrappers
│   ├── types.ts                  # Shared TypeScript types
│   └── validation.ts             # Zod schemas
├── styles/
│   └── globals.css               # Design tokens, base styles
└── public/
    └── twynity-logo.svg
```

---

## Page Architecture

### Landing Page (`/`)

Static page, no data fetching required at build time. Navigation checks auth state client-side to conditionally show "Log in" vs "Go to My Twyns".

**Key components:** `Navbar`, `HeroSection`, `FeatureGrid` (optional, v2.1+)

---

### Twin Creation Flow (`/create`)

The creation flow is a multi-step form managed as a single page with internal step state. This avoids URL-per-step complexity while keeping the UX smooth.

**State shape:**
```typescript
type CreationFlowState = {
  step: 1 | 2 | 3 | 4
  identity: {
    name: string
    role: string
    about: string
  }
  faceVoice: {
    avatarId: string | null        // purchased avatar, if selected
    faceImageFile: File | null
    faceImagePreviewUrl: string | null
    voiceFile: File | null
    voiceDurationSeconds: number | null
  }
  deployment: {                    // NEW — Step 3
    useCase: UseCaseOption | null
    channels: DeploymentChannel[]
    interactionStyle: InteractionStyle | null
  }
}
```

**Step routing logic:**
- Steps are controlled by a `step` integer in local state
- "Back" and "Next" update `step`
- On Step 4 "Create my twin", form data is submitted to the API
- Draft auto-save: debounced `localStorage` write on each field change, cleared on successful submission

**Validation per step:**
- Step 1: `name` required (min 1 char, max 60 chars)
- Step 2: No hard requirement, but warn if both face and voice are absent
- Step 3: `useCase` required
- Step 4: Read-only, just confirm

---

### My Twyns Dashboard (`/app`)

**Previously named:** TwynBook  
**Route:** `/app`

Authenticated route. Fetches the user's twins from the API on mount.

**Data model (Twin):**
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
  status: 'draft' | 'processing' | 'ready' | 'published'
  marketplaceListing?: {
    price: number          // monthly, in USD
    publishedAt: string
  }
  createdAt: string
  updatedAt: string
}
```

**API endpoints used:**
- `GET /twins` — fetch all user twins
- `DELETE /twins/:id` — delete a twin
- `POST /twins/:id/publish` — publish to marketplace
- `POST /twins/:id/unpublish` — remove from marketplace

**Component breakdown:**
- `MyTwynsPage` — page shell, data fetching
- `TwinGrid` — responsive grid layout
- `TwinCard` — individual twin card with all actions
- `AddTwinCard` — dashed placeholder card, links to `/create`

---

### Deployment & Use Case Step — New Data Flow

The new Step 3 (`StepDeployment`) collects:

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

This data is included in the twin creation API payload:

```typescript
// POST /twins
{
  name: string
  role: string
  about: string
  faceImage: File          // multipart
  voiceFile: File          // multipart
  useCase: UseCaseOption
  channels: DeploymentChannel[]
  interactionStyle: InteractionStyle
}
```

The backend uses `useCase` and `interactionStyle` to configure the LLM system prompt defaults for the twin.

---

## API Integration

**Base URL (development):** `http://85.4.52.192:8087`  
**Base URL (production):** TBD — configure via `NEXT_PUBLIC_API_URL` environment variable

**Auth:** Include JWT bearer token in `Authorization` header on all authenticated requests. Token stored in memory (not localStorage) for security; refresh handled via httpOnly cookie.

**Error handling convention:**
- 4xx errors: show inline validation messages or toast notifications
- 5xx errors: show a generic error state with a retry option
- Network failures: detect with `AbortController` timeout (5s for reads, 30s for file uploads)

---

## Environment Variables

```bash
NEXT_PUBLIC_API_URL=http://85.4.52.192:8087   # Backend base URL
NEXT_PUBLIC_APP_ENV=development               # 'development' | 'production'
```

---

## Performance Considerations

The original FastAPI backend had 4–10 second response times on twin interaction. The following frontend strategies mitigate perceived latency:

- Show an optimistic loading state immediately on form submission (spinner + "Creating your twin…" message)
- Use a polling or WebSocket approach to check twin processing status rather than blocking the UI
- On the dashboard, show twins with a `processing` status chip while the backend is generating the voice model
- File uploads (face image, voice) should show progress bars — use `XMLHttpRequest` with `onprogress` rather than `fetch` for this

---

## Naming & Terminology Changes (v1 → v2)

| Old | New | Where it appears |
|---|---|---|
| `TwynBook` | `My Twyns` | Page title, route label, all UI copy |
| `/app` page title "TwynBook" | "My Twyns" | `<h1>` on dashboard |
| `twinbook` (any internal identifiers) | `my-twyns` or `dashboard` | Route names, component names |
| Step count: 3 steps | 4 steps | Progress indicator, documentation |

---

## Deployment

**Frontend:** Vercel, connected to `main` branch of `github.com/Bernie19690812/twynity-marketplace`. Auto-deploys on push to `main`.

**Environment:** Set `NEXT_PUBLIC_API_URL` in Vercel project settings to point to the production backend when available.

**Build command:** `next build`  
**Output directory:** `.next`  
**Node version:** 18+
