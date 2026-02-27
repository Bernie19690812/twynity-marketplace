import type { TwinStatus } from '@/lib/types'

const STATUS_CONFIG: Record<TwinStatus, { label: string; className: string }> = {
  draft: {
    label: 'Draft',
    className: 'bg-[#FFF8E6] text-warning',
  },
  processing: {
    label: 'Processing',
    className: 'bg-brand-light text-brand-primary',
  },
  ready: {
    label: 'Ready',
    className: 'bg-success-light text-success',
  },
  published: {
    label: 'Published',
    className: 'bg-success-light text-success',
  },
}

interface TwinStatusChipProps {
  status: TwinStatus
}

export function TwinStatusChip({ status }: TwinStatusChipProps) {
  const { label, className } = STATUS_CONFIG[status]
  return (
    <span
      className={`inline-flex items-center rounded-full px-2.5 py-1 text-xs font-semibold leading-none ${className}`}
    >
      {label}
    </span>
  )
}
