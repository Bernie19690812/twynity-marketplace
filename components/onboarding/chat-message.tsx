import { ChatMessage as ChatMessageType } from '@/lib/types'

interface ChatMessageProps {
  message: ChatMessageType
}

export function ChatMessage({ message }: ChatMessageProps) {
  const isUser = message.role === 'user'

  return (
    <div className={`flex ${isUser ? 'justify-end' : 'justify-start'}`}>
      <div
        className={[
          'max-w-[75%] rounded-2xl px-4 py-3 text-sm font-normal leading-relaxed whitespace-pre-wrap',
          isUser
            ? 'bg-royal text-white rounded-br-sm'
            : 'bg-white text-navy border border-navy/10 rounded-bl-sm',
        ].join(' ')}
        role={isUser ? undefined : 'status'}
        aria-live={isUser ? undefined : 'polite'}
      >
        {message.content}
      </div>
    </div>
  )
}
