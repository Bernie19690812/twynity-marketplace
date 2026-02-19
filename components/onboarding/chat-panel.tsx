'use client'

import { useState, useRef, useEffect, KeyboardEvent } from 'react'
import { Send } from 'lucide-react'
import { ChatMessage as ChatMessageType } from '@/lib/types'
import { ChatStep } from '@/lib/twin-chat-steps'
import { useVoiceInput } from '@/hooks/use-voice-input'
import { ChatMessage } from './chat-message'
import { QuickReplyChips } from './quick-reply-chips'
import { VoiceButton } from './voice-button'
import { VoiceStatusIndicator } from './voice-status-indicator'

interface ChatPanelProps {
  messages: ChatMessageType[]
  currentStep: ChatStep
  onSendMessage: (text: string) => void
  isDone: boolean
}

export function ChatPanel({ messages, currentStep, onSendMessage, isDone }: ChatPanelProps) {
  const [inputText, setInputText] = useState('')
  const bottomRef = useRef<HTMLDivElement>(null)

  const handleTranscript = (text: string) => setInputText(text)
  const { voiceState, errorMessage, startListening, stopListening } =
    useVoiceInput(handleTranscript)

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages])

  const handleSend = () => {
    const trimmed = inputText.trim()
    if (!trimmed) return
    onSendMessage(trimmed)
    setInputText('')
  }

  const handleKeyDown = (e: KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      handleSend()
    }
  }

  const handleQuickReply = (reply: string) => {
    onSendMessage(reply)
    setInputText('')
  }

  return (
    <div className="flex flex-col h-full">
      {/* Message thread */}
      <div
        className="flex-1 overflow-y-auto px-6 py-6 space-y-4"
        aria-label="Chat conversation"
        aria-live="polite"
      >
        {messages.map((msg) => (
          <ChatMessage key={msg.id} message={msg} />
        ))}
        <div ref={bottomRef} aria-hidden />
      </div>

      {/* Input area */}
      <div className="border-t border-navy/10 px-6 py-4">
        {!isDone && (
          <QuickReplyChips
            replies={currentStep.quickReplies}
            onSelect={handleQuickReply}
          />
        )}

        <div className="flex items-end gap-2">
          <textarea
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Type your message… (Enter to send, Shift+Enter for new line)"
            rows={2}
            aria-label="Chat message input"
            className="flex-1 resize-none rounded-lg border border-navy/20 bg-white px-4 py-2.5 text-sm font-normal text-navy placeholder:text-navy/30 focus:border-royal focus:outline-none transition-colors duration-150"
          />
          <VoiceButton
            voiceState={voiceState}
            onStart={startListening}
            onStop={stopListening}
          />
          <button
            type="button"
            onClick={handleSend}
            aria-label="Send message"
            disabled={!inputText.trim()}
            className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-lg bg-royal text-white transition-colors duration-150 hover:bg-[#006690] disabled:opacity-40 disabled:cursor-not-allowed focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-royal"
          >
            <Send className="h-4 w-4" aria-hidden />
          </button>
        </div>

        <VoiceStatusIndicator voiceState={voiceState} errorMessage={errorMessage} />
      </div>
    </div>
  )
}
