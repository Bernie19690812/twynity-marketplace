# ROUTES.md — Page Routes & Navigation Map

---

## Route structure

| Route | Page | Description |
|---|---|---|
| `/` | Landing | Three primary option cards |
| `/onboarding/twin` | Digital Twin Onboarding | Chat + form panel for Digital Twin creation |
| `/onboarding/org` | Virtual Org Onboarding | Chat + form panel for Virtual Org creation |
| `/onboarding/twin/success` | Twin Success | Confirmation screen after twin creation |
| `/onboarding/org/success` | Org Success | Confirmation screen after org creation |
| `/marketplace` | Marketplace Home | Category browsing, module grid |
| `/marketplace/:moduleId` | Module Detail | Single module detail page |
| `/plan` | Learning Plan | User's saved modules |
| `/login` | Login | Auth stub (MVP) |

---

## Navigation flow

```
/
├── → /onboarding/twin
│       └── → /onboarding/twin/success
│               └── → /marketplace
│               └── → (stub) Edit settings
│
├── → /onboarding/org
│       └── → /onboarding/org/success
│               └── → /marketplace
│               └── → (stub) Edit settings
│
└── → /marketplace
        ├── → /marketplace/:moduleId
        │       └── → /plan (Save to plan)
        └── → /plan
```

---

## Route guards

In MVP, most routes are accessible without authentication. The following should redirect to `/login` if no token is present:

- `/plan` — saving a plan requires a session
- `/onboarding/twin/success` — should not be accessible without a completed session
- `/onboarding/org/success` — should not be accessible without a completed session

Use the `ProtectedRoute` wrapper component (see `FRONTEND.md`).

---

## Next.js file structure mapping

```
app/
├── page.tsx                        → /
├── onboarding/
│   ├── twin/
│   │   ├── page.tsx                → /onboarding/twin
│   │   └── success/
│   │       └── page.tsx            → /onboarding/twin/success
│   └── org/
│       ├── page.tsx                → /onboarding/org
│       └── success/
│           └── page.tsx            → /onboarding/org/success
├── marketplace/
│   ├── page.tsx                    → /marketplace
│   └── [moduleId]/
│       └── page.tsx                → /marketplace/:moduleId
├── plan/
│   └── page.tsx                    → /plan
└── login/
    └── page.tsx                    → /login
```
