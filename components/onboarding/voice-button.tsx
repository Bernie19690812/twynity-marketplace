import { Mic, MicOff } from 'lucide-react'
import { VoiceState } from '@/hooks/use-voice-input'

interface VoiceButtonProps {
  voiceState: VoiceState
  onStart: () => void
  onStop: () => void
}

export function VoiceButton({ voiceState, onStart, onStop }: VoiceButtonProps) {
  const isListening = voiceState === 'listening'

  return (
    <button
      type="button"
      onClick={isListening ? onStop : onStart}
      aria-label={isListening ? 'Stop voice input' : 'Start voice input'}
      aria-pressed={isListening}
      className={[
        'flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-lg transition-colors duration-150',
        isListening
          ? 'bg-cyan text-navy hover:bg-[#00a8d4]'
          : 'bg-navy/10 text-navy hover:bg-navy/20',
      ].join(' ')}
    >
      {isListening ? (
        <MicOff className="h-4 w-4" aria-hidden />
      ) : (
        <Mic className="h-4 w-4" aria-hidden />
      )}
    </button>
  )
}
