import Link from "next/link";
import { Bot, Building2, ShoppingBag } from "lucide-react";
import type { LucideIcon } from "lucide-react";

export default function LandingPage() {
  return (
    <div className="flex min-h-screen flex-col bg-[#F9F9FB]">
      {/* Minimal sticky header */}
      <header className="sticky top-0 z-50 bg-white border-b border-[#E0DFF0]">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 h-16">
          {/* Drop your logo file at public/twynity-logo.svg */}
          <Link href="/" aria-label="Twynity home" className="flex items-center">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/twynity-logo.svg"
              alt="Twynity"
              className="h-8 w-auto"
            />
          </Link>
          <Link
            href="/login"
            className="rounded-lg border border-[#E0DFF0] px-4 py-2 text-sm font-medium text-[#1A1830] transition-colors duration-150 hover:border-[#863DFF] hover:text-[#863DFF] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#863DFF]/40"
          >
            Log in
          </Link>
        </div>
      </header>

      <main className="flex flex-1 items-center justify-center px-6 py-16">
        <div className="mx-auto w-full max-w-5xl flex flex-col items-center gap-12">
          <h1 className="text-[40px] font-bold leading-tight text-[#1A1830] text-center">
            Build your AI workforce —
            <br className="hidden sm:block" />
            {" "}starting with you.
          </h1>

          <div className="grid w-full grid-cols-1 gap-6 md:grid-cols-3">
            <OptionCard
              icon={Bot}
              title="Create your Digital Twyn"
              description="Build an AI-powered representation of yourself. Define its personality, knowledge, and channels in a guided conversation."
              label="Get started →"
              href="/app"
              primary
            />
            <OptionCard
              icon={Building2}
              title="Hire a Twyn into your organisation"
              description="Add AI-powered personas to your team. Set roles, governance rules, and data boundaries — step by step."
              label="Build your team"
              href="/onboarding/org"
            />
            <OptionCard
              icon={ShoppingBag}
              title="Browse Marketplace"
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
    <article className="flex flex-col gap-5 rounded-xl bg-white p-8 border border-[#E0DFF0] shadow-[0_1px_4px_rgba(26,24,48,0.06)] hover:shadow-[0_4px_16px_rgba(134,61,255,0.10)] hover:border-[#EDE8FF] transition-all duration-150">
      <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-[#EDE8FF]">
        <Icon className="h-6 w-6 text-[#863DFF]" aria-hidden />
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
