export type ToneOption = 'professional' | 'friendly' | 'concise' | 'visionary' | 'custom'
export type ChannelOption = 'web_chat' | 'voice'
export type MessageRole = 'user' | 'assistant'

export interface DigitalTwinState {
  twin_name: string
  use_case: string
  role_title?: string
  tone: ToneOption
  preferred_language?: string
  knowledge_sources: string[]
  channels: ChannelOption[]
  consent: boolean
}

export interface ChatMessage {
  id: string
  role: MessageRole
  content: string
  timestamp: string
  extracted_update?: Partial<DigitalTwinState>
}

export interface OnboardingSession {
  id: string
  type: 'digital_twin' | 'virtual_org'
  state_json: Partial<DigitalTwinState>
  created_at: string
  updated_at: string
}

// ── Virtual Organisation onboarding ─────────────────────────────────────────

export type TargetOutcome = 'support' | 'sales' | 'hr' | 'finance' | 'compliance' | 'other'

export interface PersonaEntry {
  persona_name: string
  persona_role: string
}

export interface VirtualOrgState {
  org_name: string
  industry_domain: string
  primary_goal: string
  target_outcomes: TargetOutcome[]
  persona_roster: PersonaEntry[]
  governance_rules?: string
  data_boundaries?: string
  admin_contact_email: string
}

export interface OrgOnboardingSession {
  id: string
  type: 'virtual_org'
  state_json: Partial<VirtualOrgState>
  created_at: string
  updated_at: string
}

// ── Marketplace ─────────────────────────────────────────────────────────────

export type Difficulty = 'beginner' | 'intermediate' | 'advanced'

export type ModuleCategory =
  | 'communication_skills'
  | 'tool_connectors'
  | 'compliance_policy_packs'
  | 'knowledge_packs'
  | 'workflows_playbooks'

export interface MarketplaceModule {
  id: string
  title: string
  short_description: string
  category: ModuleCategory
  difficulty: Difficulty
  estimated_time: string
  tags: string[]
}

export type PlanTargetType = 'twin' | 'org_persona'

export interface LearningPlan {
  id: string
  target_type: PlanTargetType
  target_id?: string
  module_ids: string[]
  created_at: string
}
