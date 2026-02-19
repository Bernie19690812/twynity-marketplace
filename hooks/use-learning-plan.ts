'use client'

import { useState, useEffect, useCallback } from 'react'
import { LearningPlan } from '@/lib/types'

const STORAGE_KEY = 'learning_plan'

function emptyPlan(): LearningPlan {
  return {
    id: 'plan_1',
    target_type: 'twin',
    module_ids: [],
    created_at: new Date().toISOString(),
  }
}

function loadFromStorage(): LearningPlan {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    return raw ? (JSON.parse(raw) as LearningPlan) : emptyPlan()
  } catch {
    return emptyPlan()
  }
}

function persistToStorage(plan: LearningPlan): void {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(plan))
}

export function useLearningPlan() {
  const [plan, setPlan] = useState<LearningPlan>(emptyPlan)
  const [isHydrated, setIsHydrated] = useState(false)

  useEffect(() => {
    setPlan(loadFromStorage())
    setIsHydrated(true)
  }, [])

  const addModule = useCallback((moduleId: string) => {
    setPlan((prev) => {
      if (prev.module_ids.includes(moduleId)) return prev
      const next = { ...prev, module_ids: [...prev.module_ids, moduleId] }
      persistToStorage(next)
      return next
    })
  }, [])

  const removeModule = useCallback((moduleId: string) => {
    setPlan((prev) => {
      const next = { ...prev, module_ids: prev.module_ids.filter((id) => id !== moduleId) }
      persistToStorage(next)
      return next
    })
  }, [])

  const isInPlan = useCallback(
    (moduleId: string) => plan.module_ids.includes(moduleId),
    [plan.module_ids]
  )

  return { plan, addModule, removeModule, isInPlan, isHydrated }
}
