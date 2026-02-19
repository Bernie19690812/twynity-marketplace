import { DigitalTwinState, ToneOption, ChannelOption } from './types'
import { ChatStep } from './twin-chat-steps'

const TONE_MAP: Record<string, ToneOption> = {
  professional: 'professional',
  friendly: 'friendly',
  concise: 'concise',
  visionary: 'visionary',
  custom: 'custom',
}

const REQUIRED_FIELDS: (keyof DigitalTwinState)[] = [
  'twin_name',
  'use_case',
  'tone',
  'channels',
  'consent',
]

function extractTone(input: string): Partial<DigitalTwinState> {
  const tone = TONE_MAP[input.toLowerCase().trim()]
  return tone ? { tone } : {}
}

function extractChannels(input: string): Partial<DigitalTwinState> {
  const lower = input.toLowerCase()
  const channels: ChannelOption[] = []
  if (lower.includes('web') || lower.includes('both')) channels.push('web_chat')
  if (lower.includes('voice') || lower.includes('both')) channels.push('voice')
  return channels.length ? { channels } : {}
}

function extractKnowledgeSources(input: string): Partial<DigitalTwinState> {
  const trimmed = input.trim()
  if (!trimmed || trimmed.toLowerCase() === 'skip') return {}
  const sources = trimmed.split('\n').map((s) => s.trim()).filter(Boolean)
  return sources.length ? { knowledge_sources: sources } : {}
}

export function extractTwinUpdate(
  step: ChatStep,
  userInput: string
): Partial<DigitalTwinState> {
  const trimmed = userInput.trim()
  const { field } = step

  if (field === 'done') return {}
  if (trimmed.toLowerCase() === 'skip' && !step.required) return {}

  switch (field) {
    case 'twin_name': return { twin_name: trimmed }
    case 'use_case': return { use_case: trimmed }
    case 'role_title': return trimmed ? { role_title: trimmed } : {}
    case 'tone': return extractTone(trimmed)
    case 'channels': return extractChannels(trimmed)
    case 'knowledge_sources': return extractKnowledgeSources(trimmed)
    case 'consent': return { consent: trimmed.toLowerCase().startsWith('yes') }
    default: return {}
  }
}

export function getRequiredFieldCount(): number {
  return REQUIRED_FIELDS.length
}

export function getCompletedRequiredCount(state: Partial<DigitalTwinState>): number {
  return REQUIRED_FIELDS.filter((field) => {
    const value = state[field]
    if (field === 'channels') return Array.isArray(value) && (value as ChannelOption[]).length > 0
    if (field === 'consent') return value === true
    return Boolean(value)
  }).length
}

export function isReadyToConfirm(state: Partial<DigitalTwinState>): boolean {
  return getCompletedRequiredCount(state) === REQUIRED_FIELDS.length
}
