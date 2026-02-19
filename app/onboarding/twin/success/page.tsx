'use client'

import { Suspense } from 'react'
import Link from 'next/link'
import { useSearchParams } from 'next/navigation'
import { CheckCircle } from 'lucide-react'
import { NavBar } from '@/components/nav-bar'

// The name is passed via ?name= query param set by handleConfirm in the
// onboarding page. localStorage is already cleared before we navigate here,
// so this page never needs to read or write the session.
function SuccessContent() {
  const params = useSearchParams()
  const displayName = params.get('name') || 'Your Digital Twin'

  return (
    <main className="flex flex-1 items-center justify-center px-6 py-20">
      <div className="flex flex-col items-center gap-8 max-w-lg text-center">
        <div className="flex h-16 w-16 items-center justify-center rounded-full bg-cyan-tint">
          <CheckCircle className="h-8 w-8 text-royal" aria-hidden />
        </div>

        <div className="flex flex-col gap-2">
          <h1 className="text-3xl font-bold text-navy">{displayName} is ready!</h1>
          <p className="text-base font-normal text-navy/60 leading-relaxed">
            Your Digital Twin has been created. Head to the Marketplace to add
            capability modules, or edit your settings any time.
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
  )
}

export default function TwinSuccessPage() {
  return (
    <div className="flex min-h-screen flex-col bg-white">
      <NavBar />
      {/* useSearchParams() requires Suspense when used in a page component */}
      <Suspense fallback={<div className="flex flex-1 items-center justify-center" />}>
        <SuccessContent />
      </Suspense>
    </div>
  )
}
