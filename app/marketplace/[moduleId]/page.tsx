'use client'

import Link from 'next/link'
import { useParams } from 'next/navigation'
import { ArrowLeft, Clock, Layers } from 'lucide-react'
import { MOCK_MODULES, getModuleById } from '@/lib/mock-modules'
import { useLearningPlan } from '@/hooks/use-learning-plan'
import { NavBar } from '@/components/nav-bar'
import { DifficultyBadge } from '@/components/marketplace/difficulty-badge'
import { SaveToPlanButton } from '@/components/marketplace/save-to-plan-button'
import { ApplyToPersonaButton } from '@/components/marketplace/apply-to-persona-button'
import { ModuleCard } from '@/components/marketplace/module-card'

const CATEGORY_LABELS: Record<string, string> = {
  communication_skills: 'Communication Skills',
  tool_connectors: 'Tool Connectors',
  compliance_policy_packs: 'Compliance & Policy Packs',
  knowledge_packs: 'Knowledge Packs',
  workflows_playbooks: 'Workflows & Playbooks',
}

function NotFound() {
  return (
    <div className="flex min-h-screen flex-col bg-grey-50">
      <NavBar />
      <main className="flex flex-1 flex-col items-center justify-center gap-4 px-6 py-20 text-center">
        <div className="flex h-14 w-14 items-center justify-center rounded-full bg-brand-light">
          <Layers className="h-7 w-7 text-brand-primary" aria-hidden />
        </div>
        <p className="text-lg font-semibold text-grey-900">Module not found</p>
        <p className="text-sm font-normal text-grey-400">
          This module doesn&apos;t exist or may have been removed.
        </p>
        <Link
          href="/marketplace"
          className="mt-2 inline-flex items-center gap-2 text-sm font-medium text-brand-primary hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-primary/40 rounded"
        >
          <ArrowLeft className="h-4 w-4" aria-hidden />
          Back to Marketplace
        </Link>
      </main>
    </div>
  )
}

export default function ModuleDetailPage() {
  const { moduleId } = useParams<{ moduleId: string }>()
  const { isInPlan, addModule, removeModule } = useLearningPlan()
  const module = getModuleById(moduleId)

  if (!module) return <NotFound />

  const relatedModules = MOCK_MODULES.filter(
    (m) => m.category === module.category && m.id !== module.id
  ).slice(0, 3)

  const categoryLabel = CATEGORY_LABELS[module.category] ?? module.category

  return (
    <div className="flex min-h-screen flex-col bg-grey-50">
      <NavBar />

      <main className="flex-1 px-6 py-10">
        <div className="mx-auto max-w-6xl flex flex-col gap-10">

          {/* Back navigation */}
          <Link
            href="/marketplace"
            className="inline-flex items-center gap-2 text-sm font-medium text-grey-600 hover:text-grey-900 transition-colors duration-150 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-primary/40 rounded self-start"
          >
            <ArrowLeft className="h-4 w-4" aria-hidden />
            Back to Marketplace
          </Link>

          {/* Two-column layout */}
          <div className="grid grid-cols-1 gap-10 lg:grid-cols-[1fr_320px]">

            {/* ── Left — module content ── */}
            <article className="flex flex-col gap-8">

              {/* Category breadcrumb */}
              <p className="text-sm font-medium text-brand-primary">{categoryLabel}</p>

              {/* Title */}
              <div className="flex flex-col gap-4">
                <h1 className="text-3xl font-bold text-grey-900 leading-tight">
                  {module.title}
                </h1>

                {/* Meta row */}
                <div className="flex flex-wrap items-center gap-3">
                  <DifficultyBadge difficulty={module.difficulty} />
                  <span className="flex items-center gap-1.5 text-sm font-light text-grey-400">
                    <Clock className="h-4 w-4" aria-hidden />
                    {module.estimated_time}
                  </span>
                </div>
              </div>

              <hr className="border-grey-200" />

              {/* Full description */}
              <section aria-label="Module description">
                <h2 className="text-base font-semibold text-grey-900 mb-3">About this module</h2>
                <p className="text-base font-normal text-grey-600 leading-relaxed">
                  {module.short_description}
                </p>
              </section>

              {/* Tags */}
              {module.tags.length > 0 && (
                <section aria-label="Module tags">
                  <h2 className="text-base font-semibold text-grey-900 mb-3">Topics covered</h2>
                  <div className="flex flex-wrap gap-2">
                    {module.tags.map((tag) => (
                      <span
                        key={tag}
                        className="rounded-full border border-grey-200 bg-brand-light px-3 py-1 text-sm font-medium text-brand-primary"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </section>
              )}

              {/* What's included — placeholder for MVP */}
              <section aria-label="What's included">
                <h2 className="text-base font-semibold text-grey-900 mb-3">
                  What&apos;s included
                </h2>
                <ul className="flex flex-col gap-2" role="list">
                  {[
                    'Structured knowledge pack ready for your Virtual Persona',
                    'Configurable parameters to match your organisation context',
                    'Recommended follow-on modules for deeper capability',
                  ].map((item) => (
                    <li
                      key={item}
                      className="flex items-start gap-3 text-sm font-normal text-grey-600"
                    >
                      <span
                        className="mt-1.5 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-brand-primary"
                        aria-hidden
                      />
                      {item}
                    </li>
                  ))}
                </ul>
              </section>
            </article>

            {/* ── Right — sticky action panel ── */}
            <aside>
              <div className="sticky top-6 flex flex-col gap-4 rounded-2xl bg-brand-xlight border border-brand-light p-6">
                <p className="text-xs font-medium uppercase tracking-widest text-grey-400">
                  Add to your plan
                </p>

                <SaveToPlanButton
                  moduleId={module.id}
                  isInPlan={isInPlan(module.id)}
                  onAdd={addModule}
                  onRemove={removeModule}
                  size="lg"
                />

                <ApplyToPersonaButton />

                <hr className="border-grey-200" />

                {/* Module meta */}
                <dl className="flex flex-col gap-3">
                  <MetaRow label="Category" value={categoryLabel} />
                  <MetaRow
                    label="Difficulty"
                    value={
                      module.difficulty.charAt(0).toUpperCase() +
                      module.difficulty.slice(1)
                    }
                  />
                  <MetaRow label="Estimated time" value={module.estimated_time} />
                </dl>
              </div>
            </aside>
          </div>

          {/* ── More from this category ── */}
          {relatedModules.length > 0 && (
            <section aria-label={`More from ${categoryLabel}`} className="flex flex-col gap-6">
              <div className="flex items-center justify-between">
                <h2 className="text-xl font-semibold text-grey-900">
                  More from {categoryLabel}
                </h2>
                <Link
                  href={`/marketplace?category=${module.category}`}
                  className="text-sm font-medium text-brand-primary hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-primary/40 rounded"
                >
                  View all
                </Link>
              </div>

              <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {relatedModules.map((related) => (
                  <ModuleCard
                    key={related.id}
                    module={related}
                    isInPlan={isInPlan(related.id)}
                    onAdd={addModule}
                    onRemove={removeModule}
                  />
                ))}
              </div>
            </section>
          )}
        </div>
      </main>

      {/* Footer */}
      <footer className="mt-16 border-t border-grey-200 bg-white px-6 py-10" role="contentinfo">
        <div className="mx-auto max-w-6xl flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
          <span className="text-base font-bold text-grey-900">Twynity</span>
          <nav className="flex flex-wrap gap-6" aria-label="Footer navigation">
            <Link href="/contact" className="text-sm font-normal text-grey-600 hover:text-grey-900 transition-colors duration-150">Contact</Link>
            <Link href="/privacy" className="text-sm font-normal text-grey-600 hover:text-grey-900 transition-colors duration-150">Privacy Policy</Link>
            <Link href="/terms" className="text-sm font-normal text-grey-600 hover:text-grey-900 transition-colors duration-150">Terms of Service</Link>
          </nav>
          <p className="text-xs font-light text-grey-400">
            &copy; {new Date().getFullYear()} 4th-IR. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  )
}

interface MetaRowProps {
  label: string
  value: string
}

function MetaRow({ label, value }: MetaRowProps) {
  return (
    <div className="flex items-start justify-between gap-4">
      <dt className="text-xs font-medium text-grey-400 uppercase tracking-wide flex-shrink-0">
        {label}
      </dt>
      <dd className="text-sm font-medium text-grey-900 text-right">{value}</dd>
    </div>
  )
}
