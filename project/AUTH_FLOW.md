# AUTH_FLOW.md — Authentication Flow

> **MVP scope:** Authentication is a stub in MVP. A basic login page exists and a JWT token can be stored, but full auth implementation is deferred. All notes below describe the target state.

---

## Auth method

JWT bearer tokens. Obtained via `POST /api/v1/auth/login`. Stored in `localStorage` under key `auth_token`. Added to all outbound API requests via the Axios request interceptor.

---

## Login flow

1. User navigates to `/login`.
2. User submits email and password.
3. App calls `POST /api/v1/auth/login`.
4. On success: store token in `localStorage`, redirect to `/`.
5. On failure: show inline error message ("Invalid credentials").

---

## Protected routes (MVP)

The following routes redirect to `/login` if no token is present: `/plan`, `/onboarding/twin/success`, `/onboarding/org/success`.

Use the `ProtectedRoute` component:

```tsx
function ProtectedRoute({ children }: { children: React.ReactNode }) {
  const token = localStorage.getItem('auth_token')
  if (!token) return <Navigate to="/login" replace />
  return <>{children}</>
}
```

---

## Token handling

- All requests include `Authorization: Bearer <token>` header (set in Axios interceptor).
- On `401` response: Axios interceptor redirects to `/login` and clears the token.
- Token expiry: handled server-side. If expired, the next request returns `401` and triggers redirect.

---

## Logout

```ts
function logout() {
  localStorage.removeItem('auth_token')
  window.location.href = '/login'
}
```

---

## Roles (target state, not MVP)

| Role | Access |
|---|---|
| `individual` | Create and manage own Digital Twin, browse marketplace |
| `org_admin` | Create and manage Virtual Organisation and its persona roster |
| `platform_admin` | Manage marketplace modules and all users |

In MVP, role is not enforced on the frontend. Stub the role check where needed with a comment.

---

## Service-to-service auth (backend only)

Backend services authenticate with each other using Client Credentials JWT via the Platform Integration Service (PIS). See `MICROSERVICES.md` for PIS details.
