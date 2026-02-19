# COMPONENT_MAP.md — UI Component Map

---

## Page components

| Component | Route | Description |
|---|---|---|
| `LandingPage` | `/` | Three option cards, primary entry point |
| `TwinOnboardingPage` | `/onboarding/twin` | Chat panel + form panel for Digital Twin |
| `OrgOnboardingPage` | `/onboarding/org` | Chat panel + form panel for Virtual Org |
| `TwinSuccessPage` | `/onboarding/twin/success` | Summary + next step CTAs |
| `OrgSuccessPage` | `/onboarding/org/success` | Summary + next step CTAs |
| `MarketplacePage` | `/marketplace` | Category filter + module grid |
| `ModuleDetailPage` | `/marketplace/:moduleId` | Single module detail view |
| `PlanPage` | `/plan` | Saved modules in learning plan |
| `LoginPage` | `/login` | Auth stub |

---

## Shared layout components

| Component | Description |
|---|---|
| `AppShell` | Top-level layout wrapper with navigation |
| `NavBar` | Top navigation bar — Deep Navy background, logo, nav links |
| `ProtectedRoute` | Route wrapper that redirects to `/login` if no token |

---

## Onboarding components

| Component | Used in | Description |
|---|---|---|
| `ChatPanel` | Twin + Org onboarding | Message thread, input, send button, voice toggle |
| `ChatMessage` | ChatPanel | Individual message bubble (user or assistant) |
| `QuickReplyChips` | ChatPanel | Optional quick-reply buttons below the input |
| `VoiceButton` | ChatPanel | Activates voice input, shows live status |
| `VoiceStatusIndicator` | ChatPanel | Listening / Paused / Error state display |
| `FormPanel` | Twin + Org onboarding | Side panel showing all fields with editable inputs |
| `FieldCompletionBar` | FormPanel | "6 of 8 required fields completed" progress indicator |
| `TwinFormFields` | FormPanel | All fields specific to Digital Twin state |
| `OrgFormFields` | FormPanel | All fields specific to Virtual Org state |
| `PersonaRosterEditor` | OrgFormFields | Add/remove persona entries in the roster |
| `ConfirmButton` | Both onboarding pages | Triggers final validation and save; disabled if required fields missing |

---

## Marketplace components

| Component | Used in | Description |
|---|---|---|
| `CategoryFilter` | MarketplacePage | Horizontal or sidebar filter by category |
| `ModuleGrid` | MarketplacePage | Responsive grid of ModuleCard components |
| `ModuleCard` | ModuleGrid | Card with title, description, difficulty badge, estimated time |
| `DifficultyBadge` | ModuleCard, ModuleDetailPage | Colour-coded beginner / intermediate / advanced label |
| `SaveToPlanButton` | ModuleCard, ModuleDetailPage | Adds module to LearningPlan in localStorage |
| `ApplyToPersonaButton` | ModuleDetailPage | Stub — shows "Coming soon" tooltip |
| `EmptyCategoryState` | ModuleGrid | Empty state when a category has no modules |

---

## Plan components

| Component | Used in | Description |
|---|---|---|
| `PlanModuleList` | PlanPage | List of saved modules in the learning plan |
| `RemoveFromPlanButton` | PlanModuleList | Removes module from plan |

---

## Shared UI primitives

These are all built from shadcn/ui + Tailwind. Do not create custom equivalents.

| Component | shadcn/ui base | Notes |
|---|---|---|
| `Button` | `Button` | Primary (Royal Blue fill) and secondary (ghost) variants |
| `Card` | `Card` | 20–24px rounded corners, Cyan Tint or White background |
| `Input` | `Input` | Consistent height, visible label always |
| `Select` | `Select` | Used for tone, difficulty, channel selection |
| `Alert` | `Alert` | Error and info states |
| `Dialog` | `Dialog` | Modals — one primary action, Escape dismissal |
| `LoadingSpinner` | custom | Simple spinner for loading states |
| `EmptyState` | custom | Title + description + optional CTA for empty lists |
| `Skeleton` | `Skeleton` | Loading placeholder for cards and lists |
