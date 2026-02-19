'use client'

import { useEffect, useRef, useState } from 'react'
import Link from 'next/link'
import { CheckCircle } from 'lucide-react'
import { NavBar } from '@/components/nav-bar'
import { useOrgSession } from '@/hooks/use-org-session'

export default function OrgSuccessPage() {
  const { orgState, resetSession, isHydrated } = useOrgSession()

  // Capture the org name into local state before clearing the session.
  // displayName must survive the resetSession() call, which wipes orgState.
  const [displayName, setDisplayName] = useState('Your Virtual Organisation')
  const hasCleared = useRef(false)

  useEffect(() => {
    // Guard: only run once, after localStorage has hydrated into orgState.
    if (!isHydrated || hasCleared.current) return
    hasCleared.current = true

    if (orgState.org_name) setDisplayName(orgState.org_name)

    // Clear localStorage key `onboarding_org` and reset hook state to empty.
    // When the user navigates back to /onboarding/org they will see a fresh form.
    resetSession()
  }, [isHydrated, orgState.org_name, resetSession])

  return (
    <div className="flex min-h-screen flex-col bg-white">
      <NavBar />

      <main className="flex flex-1 items-center justify-center px-6 py-20">
        <div className="flex flex-col items-center gap-8 max-w-lg text-center">
          <div className="flex h-16 w-16 items-center justify-center rounded-full bg-cyan-tint">
            <CheckCircle className="h-8 w-8 text-royal" aria-hidden />
          </div>

          <div className="flex flex-col gap-2">
            <h1 className="text-3xl font-bold text-navy">{displayName} is ready!</h1>
            <p className="text-base font-normal text-navy/60 leading-relaxed">
              Your Virtual Organisation has been created. Browse the Marketplace to
              add capability modules to your persona roster.
            </p>
          </div>

          <div className="flex flex-col gap-3 w-full sm:flex-row sm:justify-center">
            <Link
              href="/marketplace"
              className="inline-flex items-center justify-center rounded-lg bg-royal px-6 py-3 text-base font-semibold text-white transition-colors duration-150 hover:bg-[#006690] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-royal"
            >
              Go to Marketplace
            </Link>
            <button
              type="button"
              disabled
              title="Coming soon"
              className="inline-flex items-center justify-center rounded-lg border border-royal px-6 py-3 text-base font-medium text-royal opacity-50 cursor-not-allowed"
            >
              Edit settings
            </button>
          </div>
        </div>
      </main>
    </div>
  )
}
