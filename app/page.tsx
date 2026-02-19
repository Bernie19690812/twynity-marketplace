import Link from "next/link";
import { Bot, Building2, ShoppingBag, ShieldCheck, Server, Lock } from "lucide-react";
import { NavBar } from "@/components/nav-bar";
import { JourneyCard } from "@/components/journey-card";

export default function LandingPage() {
  return (
    <div className="flex min-h-screen flex-col bg-white">
      <NavBar />

      <main className="flex flex-1 flex-col">
        {/* Hero */}
        <section
          className="bg-navy px-6 py-24 text-center"
          aria-label="Hero"
        >
          <div className="mx-auto max-w-3xl flex flex-col items-center gap-6">
            <p className="text-sm font-medium uppercase tracking-widest text-cyan">
              4th-IR Platform
            </p>
            <h1 className="text-4xl font-bold text-white leading-tight md:text-5xl">
              Your AI workforce,{" "}
              <span className="text-cyan">built your way.</span>
            </h1>
            <p className="text-lg font-normal text-white/70 leading-relaxed max-w-xl">
              Onboard a Digital Twin, build a Virtual Organisation, or browse
              the Marketplace to upskill your Virtual Personas — all in minutes.
            </p>
            <Link
              href="/onboarding/twin"
              className="mt-2 inline-flex items-center justify-center rounded-lg bg-royal px-8 py-4 text-base font-semibold text-white transition-colors duration-150 hover:bg-[#006690] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-cyan"
            >
              Get started free
            </Link>
          </div>
        </section>

        {/* Journey cards */}
        <section
          className="px-6 py-20 bg-white"
          aria-label="Choose your journey"
        >
          <div className="mx-auto max-w-7xl flex flex-col gap-12">
            <div className="text-center flex flex-col gap-2">
              <h2 className="text-2xl font-bold text-navy md:text-3xl">
                Where would you like to start?
              </h2>
              <p className="text-base font-normal text-navy/60">
                Pick a path below — each one has a guided, conversational
                onboarding flow.
              </p>
            </div>

            <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
              <JourneyCard
                icon={Bot}
                title="Digital Twin"
                description="Create an AI-powered replica of yourself or a role. Define its goals, personality, tone, and knowledge sources in a short guided conversation."
                primaryLabel="Start onboarding"
                primaryHref="/onboarding/twin"
                secondaryLabel="Talk to an onboarding agent"
                secondaryHref="/onboarding/twin?mode=voice"
              />
              <JourneyCard
                icon={Building2}
                title="Virtual Organisation"
                description="Build a multi-persona AI workforce for your team. Set governance rules, data boundaries, and persona roles — guided step by step."
                primaryLabel="Create organisation"
                primaryHref="/onboarding/org"
                secondaryLabel="Talk to an onboarding agent"
                secondaryHref="/onboarding/org?mode=voice"
              />
              <JourneyCard
                icon={ShoppingBag}
                title="Marketplace"
                description="Explore capability modules across Communication, Tools, Compliance, Knowledge Packs, and Workflows. Upskill any Virtual Persona instantly."
                primaryLabel="Browse marketplace"
                primaryHref="/marketplace"
                secondaryLabel="See recommended modules"
                secondaryHref="/marketplace?view=recommended"
              />
            </div>
          </div>
        </section>

        {/* Trust section */}
        <section
          className="bg-cyan-tint px-6 py-20"
          aria-label="Trust and security"
        >
          <div className="mx-auto max-w-7xl flex flex-col gap-12">
            <div className="text-center flex flex-col gap-2">
              <h2 className="text-2xl font-bold text-navy md:text-3xl">
                Enterprise-ready. Privacy-first.
              </h2>
              <p className="text-base font-normal text-navy/60">
                Built on Azure infrastructure with security and data boundaries
                at the core.
              </p>
            </div>

            <div className="grid grid-cols-1 gap-6 sm:grid-cols-3">
              <TrustItem
                icon={ShieldCheck}
                title="Secure by design"
                description="All data is encrypted in transit and at rest. Role-based access controls are applied throughout."
              />
              <TrustItem
                icon={Server}
                title="Hosted on Azure"
                description="Infrastructure runs entirely on Microsoft Azure, meeting enterprise compliance requirements."
              />
              <TrustItem
                icon={Lock}
                title="Your data stays yours"
                description="Data boundaries are explicit. Nothing is shared between organisations without consent."
              />
            </div>

            {/* Logo placeholder row */}
            <div className="flex flex-wrap items-center justify-center gap-8 pt-4">
              {["Partner A", "Partner B", "Partner C", "Partner D"].map(
                (name) => (
                  <div
                    key={name}
                    className="flex h-10 w-28 items-center justify-center rounded-lg bg-white/70 text-xs font-medium text-navy/40"
                    aria-label={`${name} logo placeholder`}
                  >
                    {name}
                  </div>
                )
              )}
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="bg-navy px-6 py-10" role="contentinfo">
        <div className="mx-auto max-w-7xl flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
          <span className="text-base font-bold text-white">Twynity</span>

          <nav
            className="flex flex-wrap gap-6"
            aria-label="Footer navigation"
          >
            <Link
              href="/contact"
              className="text-sm font-normal text-white/60 hover:text-white transition-colors duration-150"
            >
              Contact
            </Link>
            <Link
              href="/privacy"
              className="text-sm font-normal text-white/60 hover:text-white transition-colors duration-150"
            >
              Privacy Policy
            </Link>
            <Link
              href="/terms"
              className="text-sm font-normal text-white/60 hover:text-white transition-colors duration-150"
            >
              Terms of Service
            </Link>
          </nav>

          <p className="text-xs font-light text-white/40">
            &copy; {new Date().getFullYear()} 4th-IR. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
}

interface TrustItemProps {
  icon: React.ComponentType<{ className?: string; "aria-hidden"?: boolean }>;
  title: string;
  description: string;
}

function TrustItem({ icon: Icon, title, description }: TrustItemProps) {
  return (
    <div className="flex flex-col gap-4 rounded-2xl bg-white p-6">
      <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-navy">
        <Icon className="h-5 w-5 text-cyan" aria-hidden />
      </div>
      <div className="flex flex-col gap-1">
        <h3 className="text-base font-semibold text-navy">{title}</h3>
        <p className="text-sm font-normal text-navy/60 leading-relaxed">
          {description}
        </p>
      </div>
    </div>
  );
}
