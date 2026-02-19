# TECH_STACK.md — 4th-IR Approved Technologies

All technologies listed here are approved for use. Do not introduce tools outside this list without explicit approval.

---

## Frontend

| Layer | Technology | Version / Notes |
|---|---|---|
| Language | TypeScript | Strict mode enabled |
| Framework | React.js | Component-based UI |
| Meta-framework | Next.js | Use when SSR, SSG, or API routes are needed |
| Styling | Tailwind CSS | Utility-first; no custom CSS unless unavoidable |
| Component primitives | shadcn/ui | Preferred for all UI components |
| HTTP client | Axios | With interceptors for auth + error handling |
| Server state | TanStack Query | Caching, retries, invalidation |

## Backend

| Layer | Technology | Notes |
|---|---|---|
| Language | Python | Primary backend language |
| Framework | FastAPI | Async-first, OpenAPI auto-docs |
| Relational DB | PostgreSQL | Primary relational store |
| Document DB | MongoDB | Flexible/schemaless use cases |
| Containerisation | Docker | Multi-stage builds |
| Local dev | Docker Compose | Full local stack |

## DevOps & Infrastructure

| Layer | Technology | Notes |
|---|---|---|
| Cloud | Microsoft Azure | Primary cloud provider |
| Container registry | Azure Container Registry (ACR) | All images pushed here |
| Hosting options | Azure Container Apps / App Service / ACI / VMs | Choose per service complexity |
| CI/CD | GitHub Actions | All pipelines |
| Secrets | Azure Key Vault | Production secrets only; GitHub Secrets for CI |
| Web server | Nginx | Reverse proxy |

## AI / ML (platform-level)

| Layer | Technology |
|---|---|
| LLM orchestration | LangChain, LlamaIndex |
| Model training | PyTorch, TensorFlow |
| Model hub | Hugging Face |

## Design

| Tool | Use |
|---|---|
| Figma | UI/UX design and handoff |
| Framer | Design-led web pages |
| Adobe Creative Cloud | Graphic design assets |

---

## Decision rationale

See `GL_02_Tech_Decisions` for the full rationale behind each technology choice. Key principles:

- **Consistency over novelty.** Use what's on this list.
- **TypeScript everywhere** on the frontend for type safety.
- **FastAPI** for all new Python services — async-first, auto-documented.
- **Azure** for all cloud infrastructure — do not introduce AWS or GCP resources.
- **shadcn/ui** over other component libraries — it integrates cleanly with Tailwind and is accessible by default.
