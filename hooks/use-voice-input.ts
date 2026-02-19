'use client'

// Voice input uses the Web Speech API (browser-native, no additional packages).
// Docs: https://developer.mozilla.org/en-US/docs/Web/API/Web_Speech_API
// Voice is optional — text chat always works as fallback.

import { useState, useRef, useCallback } from 'react'

// TypeScript does not include the Web Speech API in its DOM lib. Declared here.
interface SpeechRecognitionEvent extends Event {
  results: SpeechRecognitionResultList
}

interface SpeechRecognitionErrorEvent extends Event {
  error: string
}

interface ISpeechRecognition extends EventTarget {
  lang: string
  interimResults: boolean
  maxAlternatives: number
  onstart: (() => void) | null
  onresult: ((event: SpeechRecognitionEvent) => void) | null
  onerror: ((event: SpeechRecognitionErrorEvent) => void) | null
  onend: (() => void) | null
  start(): void
  stop(): void
}

type SpeechRecognitionConstructor = new () => ISpeechRecognition

declare global {
  interface Window {
    SpeechRecognition?: SpeechRecognitionConstructor
    webkitSpeechRecognition?: SpeechRecognitionConstructor
  }
}

export type VoiceState = 'idle' | 'listening' | 'error'

export function useVoiceInput(onTranscript: (text: string) => void) {
  const [voiceState, setVoiceState] = useState<VoiceState>('idle')
  const [errorMessage, setErrorMessage] = useState<string | null>(null)
  const recognitionRef = useRef<ISpeechRecognition | null>(null)

  const startListening = useCallback(() => {
    const SpeechRecognitionImpl =
      window.SpeechRecognition ?? window.webkitSpeechRecognition

    if (!SpeechRecognitionImpl) {
      setVoiceState('error')
      setErrorMessage('Voice input is not supported in this browser. Use text chat instead.')
      return
    }

    const recognition = new SpeechRecognitionImpl()
    recognition.lang = 'en-US'
    recognition.interimResults = false
    recognition.maxAlternatives = 1

    recognition.onstart = () => {
      setVoiceState('listening')
      setErrorMessage(null)
    }
    recognition.onresult = (event) => {
      const transcript = event.results[0][0].transcript
      onTranscript(transcript)
      setVoiceState('idle')
    }
    recognition.onerror = (event) => {
      setVoiceState('error')
      setErrorMessage(
        event.error === 'not-allowed'
          ? 'Microphone access denied. Using text input instead.'
          : 'Voice input error. Please try again or use text chat.'
      )
    }
    recognition.onend = () => setVoiceState('idle')

    recognitionRef.current = recognition
    recognition.start()
  }, [onTranscript])

  const stopListening = useCallback(() => {
    recognitionRef.current?.stop()
    setVoiceState('idle')
  }, [])

  const clearError = useCallback(() => setErrorMessage(null), [])

  return { voiceState, errorMessage, startListening, stopListening, clearError }
}
