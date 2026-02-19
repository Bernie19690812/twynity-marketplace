import Link from 'next/link'
import { Building2 } from 'lucide-react'
import { NavBar } from '@/components/nav-bar'

export default function OrgOnboardingPage() {
  return (
    <div className="flex min-h-screen flex-col bg-white">
      <NavBar />

      <main className="flex flex-1 items-center justify-center px-6 py-20">
        <div className="flex flex-col items-center gap-8 max-w-lg text-center">
          <div className="flex h-16 w-16 items-center justify-center rounded-full bg-cyan-tint">
            <Building2 className="h-8 w-8 text-royal" aria-hidden />
          </div>

          <div className="flex flex-col gap-2">
            <h1 className="text-3xl font-bold text-navy">Virtual Organisation</h1>
            <p className="text-base font-normal text-navy/60 leading-relaxed">
              The guided onboarding flow for Virtual Organisations is coming soon.
              In the meantime, explore the Marketplace to discover capability modules
              for your future persona roster.
            </p>
          </div>

          <div className="flex flex-col gap-3 w-full sm:flex-row sm:justify-center">
            <Link
              href="/marketplace"
              className="inline-flex items-center justify-center rounded-lg bg-royal px-6 py-3 text-base font-semibold text-white transition-colors duration-150 hover:bg-[#006690] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-royal"
            >
              Browse Marketplace
            </Link>
            <Link
              href="/"
              className="inline-flex items-center justify-center rounded-lg border border-royal px-6 py-3 text-base font-medium text-royal transition-colors duration-150 hover:bg-cyan-tint focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-royal"
            >
              Back to Home
            </Link>
          </div>
        </div>
      </main>
    </div>
  )
}
