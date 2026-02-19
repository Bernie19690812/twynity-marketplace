'use client'

import { useState, useEffect, useCallback } from 'react'
import { VirtualOrgState, OrgOnboardingSession } from '@/lib/types'

// localStorage key: `onboarding_org` — defined in DATA_MODELS.md.
const STORAGE_KEY = 'onboarding_org'

function emptyState(): Partial<VirtualOrgState> {
  return { target_outcomes: [], persona_roster: [] }
}

function loadFromStorage(): Partial<VirtualOrgState> {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    if (!raw) return emptyState()
    const session = JSON.parse(raw) as OrgOnboardingSession
    return session.state_json ?? emptyState()
  } catch {
    return emptyState()
  }
}

function persistToStorage(state: Partial<VirtualOrgState>): void {
  const session: OrgOnboardingSession = {
    id: 'org_session',
    type: 'virtual_org',
    state_json: state,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  }
  localStorage.setItem(STORAGE_KEY, JSON.stringify(session))
}

export function useOrgSession() {
  const [orgState, setOrgState] = useState<Partial<VirtualOrgState>>(emptyState)
  const [isHydrated, setIsHydrated] = useState(false)

  useEffect(() => {
    setOrgState(loadFromStorage())
    setIsHydrated(true)
  }, [])

  const updateState = useCallback((update: Partial<VirtualOrgState>) => {
    setOrgState((prev) => {
      const next = { ...prev, ...update }
      persistToStorage(next)
      return next
    })
  }, [])

  const resetSession = useCallback(() => {
    localStorage.removeItem(STORAGE_KEY)
    setOrgState(emptyState())
  }, [])

  return { orgState, updateState, resetSession, isHydrated }
}
