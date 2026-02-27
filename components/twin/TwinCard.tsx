'use client'

import Link from 'next/link'
import { MessageCircle, Pencil, Trash2 } from 'lucide-react'
import type { Twin } from '@/lib/types'
import { TwinStatusChip } from './TwinStatusChip'

interface TwinCardProps {
  twin: Twin
  onDelete?: (id: string) => void
  onPublish?: (id: string) => void
  onUnpublish?: (id: string) => void
}

export function TwinCard({ twin, onDelete, onPublish, onUnpublish }: TwinCardProps) {
  return (
    <article className="flex flex-col rounded-xl bg-white border border-grey-200 shadow-[0_1px_4px_rgba(26,24,48,0.06)] hover:shadow-[0_4px_16px_rgba(134,61,255,0.10)] hover:border-brand-light transition-all duration-150 overflow-hidden">

      {/* Face image */}
      <div className="aspect-square w-full bg-grey-100 overflow-hidden">
        {twin.faceImageUrl ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={twin.faceImageUrl}
            alt={`${twin.name}'s avatar`}
            className="w-full h-full object-cover"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center bg-brand-light">
            <span className="text-5xl font-bold text-brand-primary" aria-hidden="true">
              {twin.name.charAt(0).toUpperCase()}
            </span>
          </div>
        )}
      </div>

      {/* Content */}
      <div className="flex flex-col gap-3 p-4">
        <div className="flex items-start justify-between gap-2">
          <div className="flex flex-col gap-0.5 min-w-0">
            <h2 className="text-base font-semibold text-grey-900 truncate">{twin.name}</h2>
            {twin.role && (
              <p className="text-sm text-grey-600 line-clamp-2">{twin.role}</p>
            )}
          </div>
          <TwinStatusChip status={twin.status} />
        </div>

        {twin.status === 'published' && twin.marketplaceListing && (
          <p className="text-sm font-semibold text-brand-primary">
            ${twin.marketplaceListing.price}/mo
          </p>
        )}

        {/* Actions */}
        <div className="flex flex-col gap-2 mt-1">
          <Link
            href={`/chat/${twin.id}`}
            className="flex items-center justify-center gap-2 rounded-lg bg-brand-primary px-4 py-2.5 text-sm font-semibold text-white transition-colors duration-150 hover:bg-brand-mid focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-primary/40"
          >
            <MessageCircle className="h-4 w-4" aria-hidden="true" />
            Chat
          </Link>

          <div className="flex gap-2">
            <Link
              href={`/create?edit=${twin.id}`}
              className="flex-1 flex items-center justify-center gap-1.5 rounded-lg border border-grey-200 px-3 py-2 text-sm font-medium text-grey-600 transition-colors duration-150 hover:border-brand-primary hover:text-brand-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-primary/40"
            >
              <Pencil className="h-3.5 w-3.5" aria-hidden="true" />
              Edit
            </Link>

            <button
              type="button"
              onClick={() => onDelete?.(twin.id)}
              className="flex-1 flex items-center justify-center gap-1.5 rounded-lg border border-grey-200 px-3 py-2 text-sm font-medium text-error transition-colors duration-150 hover:border-error hover:bg-[#FFF5F5] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-error/40"
            >
              <Trash2 className="h-3.5 w-3.5" aria-hidden="true" />
              Delete
            </button>
          </div>

          {(twin.status === 'ready' || twin.status === 'draft') && (
            <button
              type="button"
              onClick={() => onPublish?.(twin.id)}
              className="text-sm font-medium text-brand-primary hover:underline focus-visible:outline-none transition-colors duration-150"
            >
              Publish to Marketplace
            </button>
          )}

          {twin.status === 'published' && (
            <button
              type="button"
              onClick={() => onUnpublish?.(twin.id)}
              className="text-sm font-medium text-grey-600 hover:text-error hover:underline focus-visible:outline-none transition-colors duration-150"
            >
              Unpublish
            </button>
          )}
        </div>
      </div>
    </article>
  )
}
