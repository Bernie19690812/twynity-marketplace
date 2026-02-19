'use client'

import { useState } from 'react'
import Link from 'next/link'
import { BookmarkPlus } from 'lucide-react'
import { ModuleCategory } from '@/lib/types'
import { MOCK_MODULES } from '@/lib/mock-modules'
import { useLearningPlan } from '@/hooks/use-learning-plan'
import { NavBar } from '@/components/nav-bar'
import { CategoryFilter, CategorySelection } from '@/components/marketplace/category-filter'
import { ModuleGrid } from '@/components/marketplace/module-grid'

export default function MarketplacePage() {
  const [selectedCategory, setSelectedCategory] = useState<CategorySelection>('all')
  const { isInPlan, addModule, removeModule, plan } = useLearningPlan()

  const filteredModules =
    selectedCategory === 'all'
      ? MOCK_MODULES
      : MOCK_MODULES.filter((m) => m.category === (selectedCategory as ModuleCategory))

  const savedCount = plan.module_ids.length

  return (
    <div className="flex min-h-screen flex-col bg-white">
      <NavBar />

      {/* Page header */}
      <section className="bg-navy px-6 py-12" aria-label="Marketplace header">
        <div className="mx-auto max-w-7xl flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div className="flex flex-col gap-2">
            <p className="text-sm font-medium uppercase tracking-widest text-cyan">
              4th-IR Platform
            </p>
            <h1 className="text-3xl font-bold text-white">Marketplace</h1>
            <p className="text-base font-normal text-white/60 max-w-md leading-relaxed">
              Browse capability modules and save them to your learning plan.
              Upskill any Virtual Persona in minutes.
            </p>
          </div>

          {savedCount > 0 && (
            <Link
              href="/plan"
              className="inline-flex items-center gap-2 rounded-lg bg-royal px-5 py-2.5 text-sm font-semibold text-white transition-colors duration-150 hover:bg-[#006690] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-cyan flex-shrink-0"
              aria-label={`View learning plan — ${savedCount} module${savedCount !== 1 ? 's' : ''} saved`}
            >
              <BookmarkPlus className="h-4 w-4" aria-hidden />
              My plan
              <span className="rounded-full bg-white/20 px-2 py-0.5 text-xs font-bold">
                {savedCount}
              </span>
            </Link>
          )}
        </div>
      </section>

      {/* Main content */}
      <main className="flex-1 px-6 py-10" id="main-content">
        <div className="mx-auto max-w-7xl flex flex-col gap-8">
          <CategoryFilter
            selected={selectedCategory}
            onSelect={setSelectedCategory}
          />

          <div className="flex items-center justify-between">
            <p className="text-sm font-normal text-navy/50">
              {filteredModules.length === 0
                ? 'No modules found'
                : `${filteredModules.length} module${filteredModules.length !== 1 ? 's' : ''}`}
            </p>
          </div>

          <ModuleGrid
            modules={filteredModules}
            selectedCategory={selectedCategory}
            isInPlan={isInPlan}
            onAdd={addModule}
            onRemove={removeModule}
          />
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-navy px-6 py-10 mt-10" role="contentinfo">
        <div className="mx-auto max-w-7xl flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
          <span className="text-base font-bold text-white">Twynity</span>
          <nav className="flex flex-wrap gap-6" aria-label="Footer navigation">
            <Link href="/contact" className="text-sm font-normal text-white/60 hover:text-white transition-colors duration-150">Contact</Link>
            <Link href="/privacy" className="text-sm font-normal text-white/60 hover:text-white transition-colors duration-150">Privacy Policy</Link>
            <Link href="/terms" className="text-sm font-normal text-white/60 hover:text-white transition-colors duration-150">Terms of Service</Link>
          </nav>
          <p className="text-xs font-light text-white/40">
            &copy; {new Date().getFullYear()} 4th-IR. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  )
}
