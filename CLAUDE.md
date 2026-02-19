# CLAUDE.md — Twynity Marketplace Frontend

You are working on the **Twynity Marketplace** — a frontend web application built by **4th-IR**.
Read this file first, then load the referenced files in the order listed before writing any code.

---

## What this project is

A React/Next.js frontend that allows users to:
1. Onboard a **Digital Twin** (chat-based + form-backed)
2. Onboard a **Virtual Organisation** (chat-based + form-backed)
3. Browse a **Marketplace** to upskill Virtual Personas with capability modules

Full feature spec: [`project/PROJECT.md`](./project/PROJECT.md)

---

## Read order for Claude Code

### Before writing any code at all
1. `project/PROJECT.md` — what we're building and why
2. `global/TECH_STACK.md` — approved technologies only
3. `global/CODE_STANDARDS.md` — naming, functions, clean code rules

### Before writing any UI
4. `global/VISUAL_SYSTEM.md` — colours, typography, spacing, components (mandatory, no exceptions)
5. `global/FRONTEND.md` — React patterns, state, component design, shadcn/ui usage

### Before writing any API or data layer
6. `global/API_STANDARDS.md` — REST conventions, error format, pagination
7. `project/API_CONTRACTS.md` — specific endpoints this app consumes
8. `project/DATA_MODELS.md` — shape of Twin, Org, Persona, Module, LearningPlan objects

### Before writing any routes or navigation
9. `project/ROUTES.md` — page structure and routing map

### Before writing auth-related code
10. `project/AUTH_FLOW.md` — session handling, JWT, role types

### Before deploying or writing CI config
11. `global/GIT_WORKFLOW.md` — branching, commits, PR rules
12. `global/DEPLOYMENT.md` — environments, Docker, Azure targets

### For backend microservice integration
13. `global/MICROSERVICES.md` — File Management System and Platform Integration Service

---

## Key constraints (never violate these)

- **Visual system is locked.** Use only the Legacy Blue Palette. Font is Inter only. No colour or font additions.
- **Component library is shadcn/ui + Tailwind CSS.** Do not introduce other UI libraries.
- **TypeScript only.** No plain JS files in the src directory.
- **All async operations must handle loading, error, and empty states explicitly.**
- **API calls use Axios + TanStack Query.** No raw fetch() in components.
- **Voice is optional.** Text chat must always work as fallback.
- **No hardcoded API URLs.** Use environment variables via `NEXT_PUBLIC_` prefix.

---

## Project file map

```
/
├── CLAUDE.md                  ← You are here
├── global/
│   ├── TECH_STACK.md
│   ├── CODE_STANDARDS.md
│   ├── API_STANDARDS.md
│   ├── GIT_WORKFLOW.md
│   ├── DEPLOYMENT.md
│   ├── VISUAL_SYSTEM.md
│   ├── FRONTEND.md
│   ├── BACKEND.md
│   └── MICROSERVICES.md
└── project/
    ├── PROJECT.md
    ├── FEATURES.md
    ├── DATA_MODELS.md
    ├── ROUTES.md
    ├── API_CONTRACTS.md
    ├── AUTH_FLOW.md
    └── COMPONENT_MAP.md
```
