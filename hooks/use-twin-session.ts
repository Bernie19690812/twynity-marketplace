'use client'

import { useState, useEffect, useCallback } from 'react'
import { DigitalTwinState, OnboardingSession } from '@/lib/types'

const STORAGE_KEY = 'onboarding_twin'

function emptyState(): Partial<DigitalTwinState> {
  return { knowledge_sources: [], channels: [], consent: false }
}

function loadFromStorage(): { state: Partial<DigitalTwinState>; existed: boolean } {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    if (!raw) return { state: emptyState(), existed: false }
    const session = JSON.parse(raw) as OnboardingSession
    return { state: session.state_json ?? emptyState(), existed: true }
  } catch {
    return { state: emptyState(), existed: false }
  }
}

function persistToStorage(state: Partial<DigitalTwinState>): void {
  const session: OnboardingSession = {
    id: 'twin_session',
    type: 'digital_twin',
    state_json: state,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  }
  localStorage.setItem(STORAGE_KEY, JSON.stringify(session))
}

export function useTwinSession() {
  const [twinState, setTwinState] = useState<Partial<DigitalTwinState>>(emptyState)
  const [isHydrated, setIsHydrated] = useState(false)
  // True when a saved session was found in localStorage on mount.
  const [hasStoredSession, setHasStoredSession] = useState(false)

  useEffect(() => {
    const { state, existed } = loadFromStorage()
    setTwinState(state)
    setHasStoredSession(existed)
    setIsHydrated(true)
  }, [])

  const updateState = useCallback((update: Partial<DigitalTwinState>) => {
    setTwinState((prev) => {
      const next = { ...prev, ...update }
      persistToStorage(next)
      return next
    })
  }, [])

  const resetSession = useCallback(() => {
    localStorage.removeItem(STORAGE_KEY)
    setTwinState(emptyState())
    setHasStoredSession(false)
  }, [])

  return { twinState, updateState, resetSession, isHydrated, hasStoredSession }
}
