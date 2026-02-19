import { Check, BookmarkPlus } from 'lucide-react'

interface SaveToPlanButtonProps {
  moduleId: string
  isInPlan: boolean
  onAdd: (moduleId: string) => void
  onRemove: (moduleId: string) => void
  size?: 'md' | 'lg'
}

const SIZE_CLASSES = {
  md: 'px-4 py-2 text-sm',
  lg: 'w-full justify-center px-6 py-3 text-base font-semibold',
}

export function SaveToPlanButton({
  moduleId,
  isInPlan,
  onAdd,
  onRemove,
  size = 'md',
}: SaveToPlanButtonProps) {
  const handleClick = () => (isInPlan ? onRemove(moduleId) : onAdd(moduleId))

  return (
    <button
      type="button"
      onClick={handleClick}
      aria-pressed={isInPlan}
      aria-label={isInPlan ? 'Remove from learning plan' : 'Save to learning plan'}
      className={[
        'inline-flex items-center gap-2 rounded-lg font-medium transition-colors duration-150 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-royal',
        SIZE_CLASSES[size],
        isInPlan
          ? 'bg-cyan-tint text-royal hover:bg-red-50 hover:text-red-600'
          : 'bg-royal text-white hover:bg-[#006690]',
      ].join(' ')}
    >
      {isInPlan ? (
        <>
          <Check className="h-4 w-4 flex-shrink-0" aria-hidden />
          Saved to plan
        </>
      ) : (
        <>
          <BookmarkPlus className="h-4 w-4 flex-shrink-0" aria-hidden />
          Save to plan
        </>
      )}
    </button>
  )
}
