import { MarketplaceModule } from './types'

export const MOCK_MODULES: MarketplaceModule[] = [
  // Communication Skills
  {
    id: 'comm-001',
    title: 'Clear Written Communication',
    short_description:
      'Write concise, impactful messages for email, chat, and reports. Covers tone calibration, sentence structure, and clarity principles.',
    category: 'communication_skills',
    difficulty: 'beginner',
    estimated_time: '45 minutes',
    tags: ['writing', 'email', 'clarity'],
  },
  {
    id: 'comm-002',
    title: 'Stakeholder Briefing Templates',
    short_description:
      'Pre-built briefing structures for executive audiences. Includes summary frameworks and decision-ready formats.',
    category: 'communication_skills',
    difficulty: 'intermediate',
    estimated_time: '1.5 hours',
    tags: ['executive', 'briefings', 'templates'],
  },
  {
    id: 'comm-003',
    title: 'Conflict Resolution & De-escalation',
    short_description:
      'Structured dialogue patterns for handling difficult conversations and reaching aligned outcomes without escalation.',
    category: 'communication_skills',
    difficulty: 'advanced',
    estimated_time: '2 hours',
    tags: ['conflict', 'dialogue', 'empathy'],
  },

  // Tool Connectors
  {
    id: 'tool-001',
    title: 'Microsoft Teams Connector',
    short_description:
      'Integrate your Digital Twin into Microsoft Teams channels and direct messages for seamless in-workflow assistance.',
    category: 'tool_connectors',
    difficulty: 'beginner',
    estimated_time: '30 minutes',
    tags: ['teams', 'microsoft', 'chat'],
  },
  {
    id: 'tool-002',
    title: 'Slack Workspace Bridge',
    short_description:
      'Deploy your Virtual Persona into any Slack workspace as a native bot. Supports slash commands and DM flows.',
    category: 'tool_connectors',
    difficulty: 'beginner',
    estimated_time: '30 minutes',
    tags: ['slack', 'bot', 'workspace'],
  },
  {
    id: 'tool-003',
    title: 'ServiceNow Ticketing Integration',
    short_description:
      'Connect your persona to ServiceNow to triage, log, and update IT service tickets automatically using natural language.',
    category: 'tool_connectors',
    difficulty: 'intermediate',
    estimated_time: '2 hours',
    tags: ['servicenow', 'itsm', 'automation'],
  },

  // Compliance & Policy Packs
  {
    id: 'comp-001',
    title: 'GDPR Data Handling Basics',
    short_description:
      'Core GDPR awareness covering data subject rights, lawful bases for processing, and guidance on handling personal data safely.',
    category: 'compliance_policy_packs',
    difficulty: 'beginner',
    estimated_time: '1 hour',
    tags: ['gdpr', 'data-privacy', 'compliance'],
  },
  {
    id: 'comp-002',
    title: 'ISO 27001 Information Security Pack',
    short_description:
      "Embed ISO 27001 controls and security awareness into your Virtual Persona's responses, workflows, and data handling decisions.",
    category: 'compliance_policy_packs',
    difficulty: 'intermediate',
    estimated_time: '2.5 hours',
    tags: ['iso27001', 'infosec', 'risk'],
  },

  // Knowledge Packs
  {
    id: 'know-001',
    title: 'HR Onboarding Knowledge Pack',
    short_description:
      'Everything a new starter needs: company policies, culture norms, tool access guides, and first-week FAQs.',
    category: 'knowledge_packs',
    difficulty: 'beginner',
    estimated_time: '1 hour',
    tags: ['hr', 'onboarding', 'culture'],
  },
  {
    id: 'know-002',
    title: 'IT Support Runbooks',
    short_description:
      'Step-by-step resolution guides for the 50 most common IT support tickets. Structured for fast, consistent first-line responses.',
    category: 'knowledge_packs',
    difficulty: 'intermediate',
    estimated_time: '2 hours',
    tags: ['it', 'runbooks', 'support'],
  },
  {
    id: 'know-003',
    title: 'Sales Playbook 2025',
    short_description:
      'Qualification frameworks, objection-handling scripts, and closing techniques tuned for B2B enterprise sales motions.',
    category: 'knowledge_packs',
    difficulty: 'intermediate',
    estimated_time: '3 hours',
    tags: ['sales', 'b2b', 'qualification'],
  },

  // Workflows / Playbooks — intentionally empty to demonstrate the empty state
]

export function getModuleById(id: string): MarketplaceModule | undefined {
  return MOCK_MODULES.find((m) => m.id === id)
}
