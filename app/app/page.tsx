'use client'

import { useState } from 'react'
import Link from 'next/link'
import { Plus, Star, MessageCircle, Pencil, Trash2 } from 'lucide-react'
import type { Twin } from '@/lib/types'
import { TwinStatusChip } from '@/components/twin/TwinStatusChip'

const MOCK_TWINS: Twin[] = [
  {
    id: '1',
    name: 'Alex Chen',
    role: 'Sales Lead',
    about: 'A friendly and direct sales assistant focused on qualifying leads quickly and converting prospects into customers.',
    faceImageUrl: '',
    voiceModelId: '',
    useCase: 'sales_engagement',
    channels: ['marketplace', 'website_embed'],
    interactionStyle: 'brief_direct',
    status: 'published',
    marketplaceListing: { price: 29, publishedAt: '2026-01-15T00:00:00Z' },
    reviews: { average: 4.5, count: 23 },
    createdAt: '2026-01-01T00:00:00Z',
    updatedAt: '2026-01-15T00:00:00Z',
  },
  {
    id: '2',
    name: 'Jordan Rivera',
    role: 'Life Coach',
    about: 'Warm and supportive mentoring for personal growth and career development. Helps clients set clear goals and stay accountable.',
    faceImageUrl: '',
    voiceModelId: '',
    useCase: 'coaching_mentoring',
    channels: ['internal_tool'],
    interactionStyle: 'conversational_warm',
    status: 'draft',
    reviews: { average: 0, count: 0 },
    createdAt: '2026-02-10T00:00:00Z',
    updatedAt: '2026-02-10T00:00:00Z',
  },
]

function StarRating({ average, count }: { average: number; count: number }) {
  if (count === 0) {
    return <p className="text-xs text-grey-400">No reviews yet</p>
  }
  const filled = Math.round(average)
  return (
    <div className="flex items-center gap-1">
      {[1, 2, 3, 4, 5].map(i => (
        <Star
          key={i}
          className="h-4 w-4"
          style={
            i <= filled
              ? { fill: 'var(--color-warning)', color: 'var(--color-warning)' }
              : { fill: 'none', color: 'var(--color-grey-200)' }
          }
          aria-hidden="true"
        />
      ))}
      <span className="text-xs font-medium text-grey-600 ml-1">{average.toFixed(1)}</span>
      <span className="text-xs text-grey-400">({count} reviews)</span>
    </div>
  )
}

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
          ? { ...t, status: 'published' as const, marketplaceListing: { price: 19, publishedAt: new Date().toISOString() } }
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
              + Create Twyn
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

      <main className="mx-auto max-w-4xl px-6 py-10">

        {/* Page header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-grey-900">My Twyns</h1>
          <p className="text-sm text-grey-400 mt-1">Select one to chat or create another.</p>
        </div>

        {/* Vertical twin list */}
        <div className="flex flex-col gap-4">
          {twins.map(twin => (
            <article
              key={twin.id}
              className="flex gap-6 bg-white rounded-xl border border-grey-200 shadow-[0_1px_4px_rgba(26,24,48,0.06)] hover:shadow-[0_4px_16px_rgba(134,61,255,0.10)] hover:border-brand-light transition-all duration-150 p-6"
            >
              {/* Face image */}
              <div className="w-36 h-36 flex-shrink-0 rounded-xl overflow-hidden bg-brand-light">
                {twin.faceImageUrl ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img
                    src={twin.faceImageUrl}
                    alt={`${twin.name}'s avatar`}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center">
                    <span className="text-5xl font-bold text-brand-primary" aria-hidden="true">
                      {twin.name.charAt(0).toUpperCase()}
                    </span>
                  </div>
                )}
              </div>

              {/* Profile */}
              <div className="flex flex-col gap-2 flex-1 min-w-0">

                {/* Name + status chip */}
                <div className="flex items-start justify-between gap-3">
                  <h2 className="text-xl font-bold text-grey-900">{twin.name}</h2>
                  <TwinStatusChip status={twin.status} />
                </div>

                {/* Role */}
                <p className="text-sm font-semibold text-brand-primary">{twin.role}</p>

                {/* Character / personality */}
                {twin.about && (
                  <p className="text-sm text-grey-600 line-clamp-2">{twin.about}</p>
                )}

                {/* Published status */}
                <div className="flex items-center gap-1.5">
                  <span
                    className={`h-2 w-2 rounded-full flex-shrink-0 ${twin.status === 'published' ? 'bg-success' : 'bg-grey-300'}`}
                    aria-hidden="true"
                  />
                  <span className={`text-xs ${twin.status === 'published' ? 'text-success font-medium' : 'text-grey-400'}`}>
                    {twin.status === 'published'
                      ? `Published to Marketplace${twin.marketplaceListing ? ` · $${twin.marketplaceListing.price}/mo` : ''}`
                      : 'Not published to Marketplace'}
                  </span>
                </div>

                {/* Reviews */}
                <StarRating average={twin.reviews?.average ?? 0} count={twin.reviews?.count ?? 0} />

                {/* Actions */}
                <div className="flex flex-wrap items-center gap-2 mt-2">
                  <Link
                    href={`/chat/${twin.id}`}
                    className="flex items-center gap-1.5 rounded-lg bg-brand-primary px-4 py-2 text-xs font-semibold text-white transition-colors duration-150 hover:bg-brand-mid focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-primary/40"
                  >
                    <MessageCircle className="h-3.5 w-3.5" aria-hidden="true" />
                    Chat
                  </Link>

                  <Link
                    href={`/create?edit=${twin.id}`}
                    className="flex items-center gap-1.5 rounded-lg border border-grey-200 px-4 py-2 text-xs font-medium text-grey-600 transition-colors duration-150 hover:border-brand-primary hover:text-brand-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-primary/40"
                  >
                    <Pencil className="h-3.5 w-3.5" aria-hidden="true" />
                    Edit
                  </Link>

                  {(twin.status === 'ready' || twin.status === 'draft') && (
                    <button
                      type="button"
                      onClick={() => handlePublish(twin.id)}
                      className="text-xs font-medium text-brand-primary hover:underline focus-visible:outline-none transition-colors duration-150"
                    >
                      Publish
                    </button>
                  )}

                  {twin.status === 'published' && (
                    <button
                      type="button"
                      onClick={() => handleUnpublish(twin.id)}
                      className="text-xs font-medium text-grey-400 hover:text-error hover:underline focus-visible:outline-none transition-colors duration-150"
                    >
                      Unpublish
                    </button>
                  )}

                  <button
                    type="button"
                    onClick={() => handleDelete(twin.id)}
                    className="ml-auto flex items-center gap-1.5 rounded-lg border border-grey-200 px-3 py-2 text-xs font-medium text-error transition-colors duration-150 hover:border-error hover:bg-[#FFF5F5] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-error/40"
                  >
                    <Trash2 className="h-3.5 w-3.5" aria-hidden="true" />
                    Delete
                  </button>
                </div>
              </div>
            </article>
          ))}

          {/* Add new twin */}
          <Link
            href="/create"
            className="flex items-center justify-center gap-3 rounded-xl border-2 border-dashed border-grey-200 bg-white p-8 transition-all duration-150 hover:border-brand-primary hover:bg-brand-xlight focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-primary/40 group"
            aria-label="Create a new Twyn"
          >
            <div className="flex h-10 w-10 items-center justify-center rounded-full border-2 border-grey-200 text-grey-400 transition-colors duration-150 group-hover:border-brand-primary group-hover:text-brand-primary">
              <Plus className="h-5 w-5" aria-hidden="true" />
            </div>
            <p className="text-sm font-medium text-grey-400 transition-colors duration-150 group-hover:text-brand-primary">
              Create a new Twyn
            </p>
          </Link>
        </div>
      </main>
    </div>
  )
}
