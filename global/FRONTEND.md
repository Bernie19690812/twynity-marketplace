# FRONTEND.md — Frontend Implementation Patterns

Stack: React + Next.js + TypeScript + Tailwind CSS + shadcn/ui + Axios + TanStack Query

---

## Component design rules

- **Single responsibility.** Each component does one thing. If a component fetches data AND renders AND handles clicks, split it.
- **Explicit state handling.** Every async operation must handle all four states: loading, error, empty, success.
- **Props over context.** Pass dependencies via props. Use context only for auth and theme.
- **No hidden coupling.** Components must not reach into global state silently.

```tsx
// Bad — hidden coupling
function UserName() {
  const user = useGlobalUser()
  return <span>{user.name}</span>
}

// Good — explicit dependency
function UserName({ user }: { user: User }) {
  return <span>{user.name}</span>
}
```

---

## State handling pattern

Every data-fetching component must handle all states explicitly:

```tsx
function DataView() {
  const { data, isLoading, error, refetch } = useQuery({ ... })

  if (isLoading) return <LoadingSpinner />

  if (error) return (
    <Alert variant="destructive">
      <AlertTitle>Something went wrong</AlertTitle>
      <AlertDescription>{error.message}</AlertDescription>
      <Button onClick={() => refetch()} className="mt-2">Try Again</Button>
    </Alert>
  )

  if (!data || data.length === 0) return (
    <EmptyState
      title="Nothing here yet"
      description="Get started by creating your first item."
      action={<Button>Create</Button>}
    />
  )

  return <DataList data={data} />
}
```

---

## API consumption

### Axios setup
```ts
// lib/api.ts
import axios from 'axios'

const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
  timeout: 10000,
})

api.interceptors.request.use((config) => {
  const token = localStorage.getItem('auth_token')
  if (token) config.headers.Authorization = `Bearer ${token}`
  return config
})

api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      window.location.href = '/login'
    }
    return Promise.reject(error)
  }
)

export default api
```

### TanStack Query usage
```ts
// hooks/use-modules.ts
import { useQuery } from '@tanstack/react-query'
import api from '@/lib/api'

export function useModules() {
  return useQuery({
    queryKey: ['modules'],
    queryFn: async () => {
      const { data } = await api.get('/api/v1/marketplace/modules')
      return data
    },
    staleTime: 5 * 60 * 1000,
  })
}
```

### Mutations
```ts
export function useCreateTwin() {
  return useMutation({
    mutationFn: async (payload: TwinCreate) => {
      const { data } = await api.post('/api/v1/twins', payload)
      return data
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['twins'] })
    },
  })
}
```

---

## Authentication

```ts
// Store token on login
localStorage.setItem('auth_token', token)

// Protected route wrapper
function ProtectedRoute({ children }: { children: React.ReactNode }) {
  const { isAuthenticated } = useAuth()
  if (!isAuthenticated) return <Navigate to="/login" replace />
  return <>{children}</>
}

// Logout
function logout() {
  localStorage.removeItem('auth_token')
  window.location.href = '/login'
}
```

---

## shadcn/ui usage

Install components individually as needed:
```bash
npx shadcn-ui@latest add button
npx shadcn-ui@latest add card
npx shadcn-ui@latest add dialog
npx shadcn-ui@latest add alert
npx shadcn-ui@latest add input
npx shadcn-ui@latest add form
```

Customise components in `components/ui/[component].tsx`. Do not override Tailwind config to fight the design system — adjust the component file instead.

---

## Common pitfalls to avoid

- Never access nested API response properties without null-guards (`data?.user?.name ?? 'Unknown'`)
- Never hardcode API URLs — always use `process.env.NEXT_PUBLIC_API_URL`
- Never skip loading, error, or empty states
- Never use raw `fetch()` in components — use Axios + TanStack Query
- Never use `any` in TypeScript — define interfaces for all API response shapes
