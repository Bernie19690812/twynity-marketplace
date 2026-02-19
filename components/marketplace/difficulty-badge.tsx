import { Difficulty } from '@/lib/types'

interface DifficultyBadgeProps {
  difficulty: Difficulty
}

const BADGE_STYLES: Record<Difficulty, string> = {
  beginner: 'bg-cyan-tint text-royal',
  intermediate: 'bg-royal text-white',
  advanced: 'bg-navy text-white',
}

const LABELS: Record<Difficulty, string> = {
  beginner: 'Beginner',
  intermediate: 'Intermediate',
  advanced: 'Advanced',
}

export function DifficultyBadge({ difficulty }: DifficultyBadgeProps) {
  return (
    <span
      className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-semibold ${BADGE_STYLES[difficulty]}`}
      aria-label={`Difficulty: ${LABELS[difficulty]}`}
    >
      {LABELS[difficulty]}
    </span>
  )
}
