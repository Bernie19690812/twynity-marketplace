# API_CONTRACTS.md — API Endpoints for Twynity Marketplace

> **MVP note:** Many of these endpoints may not exist yet. Where a backend endpoint is not available, use localStorage as the data store and mark the function with a `// TODO: replace with API call` comment.

---

## Base URL

```
NEXT_PUBLIC_API_URL=https://api.twynity.4th-ir.com
```

All endpoints follow the pattern: `/api/v1/{resource}`

---

## Authentication

| Method | Endpoint | Description |
|---|---|---|
| POST | `/api/v1/auth/login` | Exchange credentials for JWT |
| POST | `/api/v1/auth/refresh` | Refresh an expiring token |

Request body (login):
```json
{ "email": "user@example.com", "password": "string" }
```

Response:
```json
{ "data": { "token": "eyJ..." }, "metadata": { ... } }
```

---

## Digital Twin

| Method | Endpoint | Description |
|---|---|---|
| POST | `/api/v1/twins` | Create a new Digital Twin |
| GET | `/api/v1/twins/:id` | Get a single twin |
| PATCH | `/api/v1/twins/:id` | Update twin fields |

Request body (POST):
```json
{
  "twin_name": "Alex Digital",
  "use_case": "customer support",
  "role_title": "Support Lead",
  "tone": "professional",
  "knowledge_sources": ["https://example.com/docs"],
  "channels": ["web_chat"],
  "consent": true
}
```

---

## Virtual Organisation

| Method | Endpoint | Description |
|---|---|---|
| POST | `/api/v1/organisations` | Create a new Virtual Organisation |
| GET | `/api/v1/organisations/:id` | Get a single organisation |
| PATCH | `/api/v1/organisations/:id` | Update organisation fields |

Request body (POST):
```json
{
  "org_name": "Acme AI Corp",
  "industry_domain": "Finance",
  "primary_goal": "Automate compliance checks",
  "persona_roster": [
    { "persona_name": "Compliance Agent", "persona_role": "compliance_analyst" }
  ],
  "governance_rules": "No PII in outputs",
  "data_boundaries": "EU only",
  "admin_contact_email": "admin@acme.com"
}
```

---

## Marketplace

| Method | Endpoint | Description |
|---|---|---|
| GET | `/api/v1/marketplace/modules` | List all modules (paginated) |
| GET | `/api/v1/marketplace/modules/:id` | Get a single module |
| GET | `/api/v1/marketplace/categories` | List all categories |

Query params for list: `?page=1&per_page=20&category=communication_skills&difficulty=beginner`

---

## Learning Plan

| Method | Endpoint | Description |
|---|---|---|
| GET | `/api/v1/plans/me` | Get current user's plan |
| POST | `/api/v1/plans/me/modules` | Add a module to the plan |
| DELETE | `/api/v1/plans/me/modules/:moduleId` | Remove a module from the plan |

> **MVP fallback:** Use localStorage key `learning_plan` if this endpoint is not available.

---

## LLM extraction (onboarding)

| Method | Endpoint | Description |
|---|---|---|
| POST | `/api/v1/onboarding/extract` | Extract structured fields from a chat turn |

Request body:
```json
{
  "type": "digital_twin",
  "message": "My name is Alex and I want to use this for customer support with a professional tone",
  "current_state": { ... }
}
```

Response:
```json
{
  "data": {
    "extracted": {
      "twin_name": "Alex",
      "use_case": "customer support",
      "tone": "professional"
    },
    "confidence": 0.92
  }
}
```

> **MVP fallback:** If this endpoint is not available, use the Anthropic API directly from the client with `NEXT_PUBLIC_ANTHROPIC_API_KEY`. Document clearly if doing so.

---

## Error response shape

All errors follow this format (see `API_STANDARDS.md`):
```json
{
  "error": {
    "code": "INVALID_INPUT",
    "message": "twin_name is required",
    "details": { "field": "twin_name", "reason": "missing_required_field" }
  },
  "metadata": { "timestamp": "...", "request_id": "..." }
}
```
