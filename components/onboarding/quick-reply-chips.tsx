interface QuickReplyChipsProps {
  replies: string[]
  onSelect: (reply: string) => void
}

export function QuickReplyChips({ replies, onSelect }: QuickReplyChipsProps) {
  if (replies.length === 0) return null

  return (
    <div className="flex flex-wrap gap-2 mb-3" role="group" aria-label="Quick reply options">
      {replies.map((reply) => (
        <button
          key={reply}
          onClick={() => onSelect(reply)}
          className="rounded-full border border-royal px-4 py-1.5 text-sm font-medium text-royal bg-white hover:bg-cyan-tint transition-colors duration-150 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-royal"
          type="button"
        >
          {reply}
        </button>
      ))}
    </div>
  )
}
