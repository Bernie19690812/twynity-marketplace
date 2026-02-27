import Link from "next/link";
import { Bot, Building2, ShoppingBag } from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { HeroWordCycle } from "@/components/hero-word-cycle";

export default function LandingPage() {
  return (
    <div className="flex min-h-screen flex-col bg-[#F9F9FB]">
      {/* Minimal sticky header */}
      <header className="sticky top-0 z-50 bg-white border-b border-[#E0DFF0]">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 h-16">
          <Link href="/" aria-label="Twynity home" className="flex items-center gap-2.5">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/twynity-logo.svg"
              alt=""
              className="h-12 w-12"
            />
            <span className="text-xl font-bold text-[#1A1830]">Twynity</span>
          </Link>
          <Link
            href="/login"
            className="rounded-lg border border-[#E0DFF0] px-4 py-2 text-sm font-medium text-[#1A1830] transition-colors duration-150 hover:border-[#863DFF] hover:text-[#863DFF] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#863DFF]/40"
          >
            Log in
          </Link>
        </div>
      </header>

      <main className="relative flex flex-1 items-center justify-center px-6 pt-10 pb-16 overflow-hidden">
        {/* Animated radial gradient background */}
        <div
          aria-hidden="true"
          className="hero-bg-pulse absolute inset-0 pointer-events-none"
          style={{
            background:
              'radial-gradient(ellipse 80% 55% at 50% 30%, rgba(134, 61, 255, 0.07) 0%, transparent 70%)',
          }}
        />

        <div className="relative mx-auto w-full max-w-5xl flex flex-col items-center gap-3">
          {/* Headline */}
          <h1 className="text-[40px] font-bold leading-tight text-[#1A1830] text-center">
            Building the Virtual Workforce of the Future
            <br />
            <span className="text-[#9896B0] font-normal">— starting with </span>
            <HeroWordCycle />
          </h1>

          {/* Subheading */}
          <p className="text-lg font-light text-[#9896B0] text-center mt-1">
            Your AI-powered team, built around you.
          </p>

          {/* Cards */}
          <div className="grid w-full grid-cols-1 gap-6 md:grid-cols-3 mt-10">
            <OptionCard
              icon={Bot}
              title="Create a Digital Twyn of yourself"
              description="Build Virtual Personas of yourself. Give it your voice, your likeness, define its personality and give it expertise that you don't have."
              label="Get started →"
              href="/app"
              primary
            />
            <OptionCard
              icon={Building2}
              title="Hire a Digital Twyn into your organisation"
              description="Hire a Digital Twyn for a role in your organisation. Define the role, skills, expertise and define the governance rules and supervision."
              label="Build your team"
              href="/onboarding/org"
            />
            <OptionCard
              icon={ShoppingBag}
              title="Browse the Marketplace for Twyns and Skills"
              description="Explore capability modules across Communication, Tools, Compliance, and Knowledge Packs."
              label="Browse modules"
              href="/marketplace"
            />
          </div>
        </div>
      </main>
    </div>
  );
}

interface OptionCardProps {
  icon: LucideIcon;
  title: string;
  description: string;
  label: string;
  href: string;
  primary?: boolean;
}

function OptionCard({
  icon: Icon,
  title,
  description,
  label,
  href,
  primary = false,
}: OptionCardProps) {
  return (
    <article className="flex flex-col gap-5 rounded-xl bg-white p-8 border border-[#E0DFF0] shadow-[0_1px_4px_rgba(26,24,48,0.06)] hover:shadow-[0_8px_28px_rgba(134,61,255,0.18)] hover:border-[#C4A8FF] hover:-translate-y-1 transition-all duration-200">
      <div
        className="flex h-14 w-14 items-center justify-center rounded-full"
        style={{ background: 'linear-gradient(135deg, #EDE8FF 0%, #C4A8FF 100%)' }}
      >
        <Icon className="h-7 w-7 text-[#863DFF]" aria-hidden />
      </div>
      <div className="flex flex-col gap-2 flex-1">
        <h2 className="text-lg font-semibold text-[#1A1830]">{title}</h2>
        <p className="text-sm text-[#5E5C78] leading-relaxed">{description}</p>
      </div>
      <Link
        href={href}
        className={
          primary
            ? "inline-flex items-center justify-center rounded-lg bg-[#863DFF] px-6 py-3 text-sm font-semibold text-white transition-colors duration-150 hover:bg-[#5629B2] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#863DFF]/40"
            : "inline-flex items-center justify-center rounded-lg border border-[#E0DFF0] px-6 py-3 text-sm font-semibold text-[#1A1830] transition-colors duration-150 hover:border-[#863DFF] hover:text-[#863DFF] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#863DFF]/40"
        }
      >
        {label}
      </Link>
    </article>
  );
}
