import { VoiceState } from '@/hooks/use-voice-input'

interface VoiceStatusIndicatorProps {
  voiceState: VoiceState
  errorMessage: string | null
}

const STATE_LABELS: Record<VoiceState, string> = {
  idle: '',
  listening: 'Listening…',
  error: '',
}

export function VoiceStatusIndicator({ voiceState, errorMessage }: VoiceStatusIndicatorProps) {
  if (voiceState === 'idle' && !errorMessage) return null

  return (
    <div
      className="mt-2 flex items-center gap-2 text-sm"
      role="status"
      aria-live="polite"
    >
      {voiceState === 'listening' && (
        <>
          <span className="h-2 w-2 rounded-full bg-cyan animate-pulse" aria-hidden />
          <span className="font-medium text-royal">{STATE_LABELS.listening}</span>
        </>
      )}
      {errorMessage && (
        <span className="font-normal text-red-600">{errorMessage}</span>
      )}
    </div>
  )
}
