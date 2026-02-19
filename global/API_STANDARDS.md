# API_STANDARDS.md — API Design & Consumption Standards

---

## RESTful conventions

| Method | Use |
|---|---|
| GET | Retrieve resources (idempotent) |
| POST | Create new resources |
| PUT | Replace a resource (idempotent) |
| PATCH | Partial update |
| DELETE | Remove a resource |

All endpoints follow the pattern: `/api/v{version}/{resource}`

Examples: `GET /api/v1/twins`, `POST /api/v1/organisations`, `GET /api/v1/marketplace/modules`

Resource names are lowercase, hyphen-separated nouns in plural form. No verbs in URLs.

---

## Versioning

All APIs are versioned in the URL path: `/api/v1/`, `/api/v2/`. At least one previous version is maintained. Breaking changes require a new version. Deprecation notices are given 6 months in advance.

---

## Response format

### Success (single resource)
```json
{
  "data": {
    "id": "abc123",
    "twin_name": "Alex Digital",
    "created_at": "2025-01-01T10:00:00Z"
  },
  "metadata": {
    "timestamp": "2025-01-01T10:00:00Z",
    "version": "v1"
  }
}
```

### Success (list with pagination)
```json
{
  "data": [...],
  "pagination": {
    "page": 1,
    "per_page": 20,
    "total": 100,
    "total_pages": 5
  }
}
```

### Error
```json
{
  "error": {
    "code": "INVALID_INPUT",
    "message": "twin_name is required",
    "details": {
      "field": "twin_name",
      "reason": "missing_required_field"
    }
  },
  "metadata": {
    "timestamp": "2025-01-01T10:00:00Z",
    "request_id": "req-abc-123"
  }
}
```

---

## HTTP status codes

| Code | Meaning |
|---|---|
| 200 | OK — successful GET, PUT, PATCH |
| 201 | Created — successful POST |
| 204 | No Content — successful DELETE |
| 400 | Bad Request — invalid input |
| 401 | Unauthorised — authentication required |
| 403 | Forbidden — insufficient permissions |
| 404 | Not Found |
| 429 | Too Many Requests — rate limit exceeded |
| 500 | Internal Server Error |

---

## Pagination

All list endpoints support: `?page=1&per_page=20`

Default: page 1, 20 items per page. Always include pagination metadata in list responses.

---

## Authentication

```
Authorization: Bearer <jwt_token>
```

Tokens are JWT. Obtained via login endpoint. Stored in `localStorage` on the client. Added to all requests via Axios interceptor (see `FRONTEND.md`).

---

## Rate limiting

Default: 100 calls/minute per client. Headers returned on every response:
```
X-RateLimit-Limit: 100
X-RateLimit-Remaining: 87
X-RateLimit-Reset: 1675678800
```

On limit exceeded, API returns `429` with a `Retry-After` duration.

---

## Security rules

- All endpoints use HTTPS only.
- No secrets or credentials in request URLs or query parameters.
- Never expose internal stack traces in error responses.
- Input is validated server-side via Pydantic (FastAPI) regardless of client-side validation.
