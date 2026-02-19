'use client'

import { useState, useCallback } from 'react'
import { ChatMessage, DigitalTwinState } from '@/lib/types'
import { TWIN_CHAT_STEPS } from '@/lib/twin-chat-steps'
import { extractTwinUpdate } from '@/lib/twin-extraction'

function makeMessage(
  role: ChatMessage['role'],
  content: string,
  extracted?: Partial<DigitalTwinState>
): ChatMessage {
  return {
    id: crypto.randomUUID(),
    role,
    content,
    timestamp: new Date().toISOString(),
    extracted_update: extracted,
  }
}

// Factory — called as a lazy initialiser so each hook instance gets its own
// array with a fresh UUID and timestamp, not a shared module-level constant.
function makeInitialMessages(): ChatMessage[] {
  return [makeMessage('assistant', TWIN_CHAT_STEPS[0].question)]
}

export function useTwinChat(onUpdateState: (update: Partial<DigitalTwinState>) => void) {
  const [messages, setMessages] = useState<ChatMessage[]>(makeInitialMessages)
  const [stepIndex, setStepIndex] = useState(0)

  const currentStep = TWIN_CHAT_STEPS[stepIndex] ?? TWIN_CHAT_STEPS[TWIN_CHAT_STEPS.length - 1]
  const isDone = stepIndex >= TWIN_CHAT_STEPS.length - 1

  const sendMessage = useCallback(
    (text: string) => {
      const trimmed = text.trim()
      if (!trimmed) return

      const extracted = extractTwinUpdate(currentStep, trimmed)
      onUpdateState(extracted)

      const nextIndex = Math.min(stepIndex + 1, TWIN_CHAT_STEPS.length - 1)
      const nextStep = TWIN_CHAT_STEPS[nextIndex]
      const userMsg = makeMessage('user', trimmed)
      const assistantMsg = makeMessage('assistant', nextStep.question, extracted)

      setMessages((prev) => [...prev, userMsg, assistantMsg])
      setStepIndex(nextIndex)
    },
    [currentStep, stepIndex, onUpdateState]
  )

  // Resets the chat thread and step index back to the initial greeting.
  // Called on confirmation and on mount when no active session exists.
  const resetChat = useCallback(() => {
    setMessages(makeInitialMessages())
    setStepIndex(0)
  }, [])

  return { messages, currentStep, stepIndex, sendMessage, isDone, resetChat }
}
