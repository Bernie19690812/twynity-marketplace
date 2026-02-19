'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { NavBar } from '@/components/nav-bar'
import { ChatPanel } from '@/components/onboarding/chat-panel'
import { FormPanel } from '@/components/onboarding/form-panel'
import { useTwinSession } from '@/hooks/use-twin-session'
import { useTwinChat } from '@/hooks/use-twin-chat'

export default function TwinOnboardingPage() {
  const router = useRouter()
  const { twinState, updateState, resetSession, isHydrated, hasStoredSession } = useTwinSession()
  const { messages, currentStep, sendMessage, isDone, resetChat } = useTwinChat(updateState)
  const [isConfirming, setIsConfirming] = useState(false)

  // On mount: if no active session exists in localStorage, reset the chat to
  // its initial greeting. Guards against stale in-memory state on re-entry
  // (e.g. bfcache restoring a previously confirmed session).
  useEffect(() => {
    if (!isHydrated) return
    if (!hasStoredSession) {
      resetChat()
    }
  }, [isHydrated]) // eslint-disable-line react-hooks/exhaustive-deps
  // Intentionally omit resetChat and hasStoredSession — this effect must run
  // exactly once after the initial hydration check, not on every render.

  const handleConfirm = () => {
    // 1. Capture the name before wiping state — it travels to the success page via URL.
    const twinName = twinState.twin_name ?? ''

    // 2. Clear localStorage key `onboarding_twin` and reset form state to empty.
    resetSession()

    // 3. Reset chat messages and step index back to the initial greeting.
    resetChat()

    // 4. Navigate. By the time the success page mounts, localStorage is already clear.
    //    If the user navigates back to this page they will see a fresh empty form.
    setIsConfirming(true)
    router.push(`/onboarding/twin/success?name=${encodeURIComponent(twinName)}`)
  }

  if (!isHydrated) {
    return (
      <div className="flex min-h-screen flex-col bg-white">
        <NavBar />
        <div className="flex flex-1 items-center justify-center">
          <div
            className="h-8 w-8 animate-spin rounded-full border-4 border-navy/20 border-t-royal"
            aria-label="Loading"
          />
        </div>
      </div>
    )
  }

  return (
    <div className="flex min-h-screen flex-col bg-white">
      <NavBar />

      <div className="flex flex-1 overflow-hidden flex-col md:flex-row">
        {/* Chat panel — left / top on mobile */}
        <section
          className="flex flex-col flex-1 overflow-hidden border-b border-navy/10 md:border-b-0 md:border-r"
          aria-label="Onboarding chat"
          style={{ minHeight: '60vh' }}
        >
          <div className="px-6 py-4 border-b border-navy/10 bg-white">
            <h1 className="text-base font-semibold text-navy">Onboard your Digital Twin</h1>
            <p className="text-xs font-normal text-navy/50 mt-0.5">
              Answer the questions below — your form fills automatically.
            </p>
          </div>

          <ChatPanel
            messages={messages}
            currentStep={currentStep}
            onSendMessage={sendMessage}
            isDone={isDone}
          />
        </section>

        {/* Form panel — right / bottom on mobile */}
        <aside
          className="flex flex-col md:w-96 xl:w-[420px] overflow-hidden"
          aria-label="Digital Twin form"
        >
          <FormPanel
            state={twinState}
            onUpdateField={updateState}
            onConfirm={handleConfirm}
            isConfirming={isConfirming}
          />
        </aside>
      </div>
    </div>
  )
}
