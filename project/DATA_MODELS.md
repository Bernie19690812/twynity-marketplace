# DATA_MODELS.md — Data Models & TypeScript Interfaces

---

## OnboardingSession

Represents an active or completed onboarding session.

```ts
interface OnboardingSession {
  id: string
  type: 'digital_twin' | 'virtual_org'
  state_json: DigitalTwinState | VirtualOrgState
  created_at: string // ISO 8601
  updated_at: string // ISO 8601
}
```

---

## DigitalTwinState

The structured output captured during Digital Twin onboarding.

```ts
type ToneOption = 'professional' | 'friendly' | 'concise' | 'visionary' | 'custom'
type ChannelOption = 'web_chat' | 'voice'

interface DigitalTwinState {
  twin_name: string           // required
  use_case: string            // required
  role_title?: string         // optional
  tone: ToneOption            // required
  preferred_language?: string // optional, e.g. "English", "French"
  knowledge_sources: string[] // optional, URLs or placeholders
  channels: ChannelOption[]   // required, min 1
  consent: boolean            // required
}
```

Required fields for confirmation: `twin_name`, `use_case`, `tone`, `channels`, `consent`.

---

## VirtualOrgState

The structured output captured during Virtual Organisation onboarding.

```ts
interface PersonaEntry {
  persona_name: string
  persona_role: string
}

type TargetOutcome = 'support' | 'sales' | 'hr' | 'finance' | 'compliance' | 'other'

interface VirtualOrgState {
  org_name: string               // required
  industry_domain: string        // required
  primary_goal: string           // required
  target_outcomes: TargetOutcome[] // required, min 1
  persona_roster: PersonaEntry[] // required, min 1
  governance_rules?: string      // optional
  data_boundaries?: string       // optional
  admin_contact_email: string    // required
}
```

Required fields for confirmation: `org_name`, `industry_domain`, `primary_goal`, `target_outcomes`, `persona_roster` (≥1 entry), `admin_contact_email`.

---

## MarketplaceModule

A capability module available in the marketplace.

```ts
type Difficulty = 'beginner' | 'intermediate' | 'advanced'
type ModuleCategory =
  | 'communication_skills'
  | 'tool_connectors'
  | 'compliance_policy_packs'
  | 'knowledge_packs'
  | 'workflows_playbooks'

interface MarketplaceModule {
  id: string
  title: string
  short_description: string
  category: ModuleCategory
  difficulty: Difficulty
  estimated_time: string  // e.g. "30 minutes", "2 hours"
  tags: string[]
}
```

---

## LearningPlan

A user's saved collection of marketplace modules for a specific target.

```ts
type PlanTargetType = 'twin' | 'org_persona'

interface LearningPlan {
  id: string
  target_type: PlanTargetType
  target_id?: string    // optional in MVP
  module_ids: string[]
  created_at: string    // ISO 8601
}
```

---

## ChatMessage

A single message in the onboarding chat thread.

```ts
type MessageRole = 'user' | 'assistant'

interface ChatMessage {
  id: string
  role: MessageRole
  content: string
  timestamp: string   // ISO 8601
  extracted_update?: Partial<DigitalTwinState> | Partial<VirtualOrgState> // optional audit trail
}
```

---

## LocalStorage keys

| Key | Type | Contents |
|---|---|---|
| `onboarding_twin` | `OnboardingSession` | Active Digital Twin session |
| `onboarding_org` | `OnboardingSession` | Active Virtual Org session |
| `learning_plan` | `LearningPlan` | User's saved module plan |
| `auth_token` | `string` | JWT bearer token |
