'use client'

import { useState } from 'react'
import Link from 'next/link'
import { Plus } from 'lucide-react'
import type { Twin } from '@/lib/types'
import { TwinCard } from '@/components/twin/TwinCard'

// Mock data for UI development — replace with API call (GET /twins) when backend is ready
const MOCK_TWINS: Twin[] = [
  {
    id: '1',
    name: 'Alex Chen',
    role: 'Sales Lead',
    about: 'A friendly and direct sales assistant focused on qualifying leads quickly.',
    faceImageUrl: '',
    voiceModelId: '',
    useCase: 'sales_engagement',
    channels: ['marketplace', 'website_embed'],
    interactionStyle: 'brief_direct',
    status: 'published',
    marketplaceListing: { price: 29, publishedAt: '2026-01-15T00:00:00Z' },
    createdAt: '2026-01-01T00:00:00Z',
    updatedAt: '2026-01-15T00:00:00Z',
  },
  {
    id: '2',
    name: 'Jordan Rivera',
    role: 'Life Coach',
    about: 'Warm and supportive mentoring for personal growth and career development.',
    faceImageUrl: '',
    voiceModelId: '',
    useCase: 'coaching_mentoring',
    channels: ['internal_tool'],
    interactionStyle: 'conversational_warm',
    status: 'draft',
    createdAt: '2026-02-10T00:00:00Z',
    updatedAt: '2026-02-10T00:00:00Z',
  },
]

export default function MyTwynsPage() {
  const [twins, setTwins] = useState<Twin[]>(MOCK_TWINS)

  const handleDelete = (id: string) => {
    if (!confirm('Delete this twin? This cannot be undone.')) return
    setTwins(prev => prev.filter(t => t.id !== id))
  }

  const handlePublish = (id: string) => {
    setTwins(prev =>
      prev.map(t =>
        t.id === id
          ? {
              ...t,
              status: 'published' as const,
              marketplaceListing: { price: 19, publishedAt: new Date().toISOString() },
            }
          : t
      )
    )
  }

  const handleUnpublish = (id: string) => {
    setTwins(prev =>
      prev.map(t => {
        if (t.id !== id) return t
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const { marketplaceListing, ...rest } = t
        return { ...rest, status: 'ready' as const } satisfies Twin
      })
    )
  }

  return (
    <div className="min-h-screen bg-grey-50">

      {/* Header */}
      <header className="sticky top-0 z-50 bg-white border-b border-grey-200">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 h-16">
          <Link href="/" aria-label="Twynity home" className="flex items-center">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/twynity-logo.svg" alt="Twynity" className="h-8 w-auto" />
          </Link>
          <nav className="flex items-center gap-4">
            <Link
              href="/create"
              className="rounded-lg bg-brand-primary px-4 py-2 text-sm font-semibold text-white transition-colors duration-150 hover:bg-brand-mid focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-primary/40"
            >
              + Create Twin
            </Link>
            <Link
              href="/login"
              className="rounded-lg border border-grey-200 px-4 py-2 text-sm font-medium text-grey-900 transition-colors duration-150 hover:border-brand-primary hover:text-brand-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-primary/40"
            >
              Log in
            </Link>
          </nav>
        </div>
      </header>

      <main className="mx-auto max-w-7xl px-6 py-10">

        {/* Page header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-grey-900">My Twyns</h1>
          <p className="text-base text-grey-600 mt-1">Your digital twins</p>
          <p className="text-sm text-grey-400 mt-0.5">Select one to chat or create another.</p>
        </div>

        {/* Twin grid */}
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {twins.map(twin => (
            <TwinCard
              key={twin.id}
              twin={twin}
              onDelete={handleDelete}
              onPublish={handlePublish}
              onUnpublish={handleUnpublish}
            />
          ))}

          {/* Add new twin card */}
          <Link
            href="/create"
            className="flex flex-col items-center justify-center gap-3 rounded-xl border-2 border-dashed border-grey-200 bg-white min-h-[280px] p-8 transition-all duration-150 hover:border-brand-primary hover:bg-brand-xlight focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-primary/40 group"
            aria-label="Add new twin"
          >
            <div className="flex h-12 w-12 items-center justify-center rounded-full border-2 border-grey-200 text-grey-400 transition-colors duration-150 group-hover:border-brand-primary group-hover:text-brand-primary">
              <Plus className="h-6 w-6" aria-hidden="true" />
            </div>
            <p className="text-sm font-medium text-grey-400 transition-colors duration-150 group-hover:text-brand-primary">
              Add new twin
            </p>
          </Link>
        </div>
      </main>
    </div>
  )
}
