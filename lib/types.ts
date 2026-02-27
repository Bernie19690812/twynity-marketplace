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

// ── v2 Creation Flow & Dashboard Types ──────────────────────────────────────

export type UseCaseOption =
  | 'personal_assistant'
  | 'sales_engagement'
  | 'coaching_mentoring'
  | 'education_training'
  | 'creative_entertainment'
  | 'internal_knowledge'
  | 'other'

export type DeploymentChannel =
  | 'marketplace'
  | 'website_embed'
  | 'internal_tool'
  | 'social_messaging'
  | 'unsure'

export type InteractionStyle =
  | 'brief_direct'
  | 'conversational_warm'
  | 'detailed_thorough'

export type CreationFlowState = {
  step: 1 | 2 | 3 | 4
  identity: {
    name: string
    role: string
    about: string
  }
  faceVoice: {
    avatarId: string | null
    faceImageFile: File | null
    faceImagePreviewUrl: string | null
    voiceFile: File | null
    voiceDurationSeconds: number | null
  }
  deployment: {
    useCase: UseCaseOption | null
    channels: DeploymentChannel[]
    interactionStyle: InteractionStyle | null
  }
}

export type TwinStatus = 'draft' | 'processing' | 'ready' | 'published'

export type Twin = {
  id: string
  name: string
  role: string
  about: string
  faceImageUrl: string
  voiceModelId: string
  useCase: UseCaseOption
  channels: DeploymentChannel[]
  interactionStyle: InteractionStyle | null
  status: TwinStatus
  marketplaceListing?: {
    price: number
    publishedAt: string
  }
  reviews?: {
    average: number  // 0–5
    count: number
  }
  createdAt: string
  updatedAt: string
}
