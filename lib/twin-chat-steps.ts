import { DigitalTwinState } from './types'

export interface ChatStep {
  field: keyof DigitalTwinState | 'done'
  question: string
  quickReplies: string[]
  required: boolean
}

export const TWIN_CHAT_STEPS: ChatStep[] = [
  {
    field: 'twin_name',
    question: "Hi! I'm your onboarding assistant. Let's create your Digital Twin together.\n\nWhat would you like to name it?",
    quickReplies: [],
    required: true,
  },
  {
    field: 'use_case',
    question: "Great! What will your Digital Twin mainly be used for? Describe its primary use case.",
    quickReplies: ['Customer support', 'Internal knowledge base', 'Sales assistant'],
    required: true,
  },
  {
    field: 'role_title',
    question: "What role or job title does this Digital Twin represent? (Optional — tap Skip to continue)",
    quickReplies: ['Skip'],
    required: false,
  },
  {
    field: 'tone',
    question: "How should your Digital Twin communicate? Pick a tone:",
    quickReplies: ['Professional', 'Friendly', 'Concise', 'Visionary', 'Custom'],
    required: true,
  },
  {
    field: 'channels',
    question: "Which channels should your Digital Twin be available on?",
    quickReplies: ['Web Chat only', 'Voice only', 'Both'],
    required: true,
  },
  {
    field: 'knowledge_sources',
    question: "Any knowledge sources to connect? Add URLs or document names, one per line. (Optional — tap Skip if none)",
    quickReplies: ['Skip'],
    required: false,
  },
  {
    field: 'consent',
    question: "Almost done! Do you consent to 4th-IR processing this information to create your Digital Twin?",
    quickReplies: ['Yes, I consent', 'No, cancel'],
    required: true,
  },
  {
    field: 'done',
    question: "You're all set! Review your details on the right and click Confirm & Create whenever you're ready.",
    quickReplies: [],
    required: false,
  },
]
