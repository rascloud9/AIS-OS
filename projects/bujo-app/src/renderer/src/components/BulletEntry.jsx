import { useState } from 'react'
import { getSignifier } from '../utils/parser'

const CYCLE = [' ', '!', 'x', '>', 'o', '-']
const SECTIONS = ['Today', 'This Month', 'Future']
const SHORT = { 'Today': 'Today', 'This Month': 'Month', 'Future': 'Future' }

export default function BulletEntry({ item, currentSection, onUpdate, onDelete, onMove }) {
  const [hovered, setHovered] = useState(false)
  const sig = getSignifier(item.marker)

  function cycleMarker() {
    const idx = CYCLE.indexOf(item.marker)
    const next = CYCLE[(idx + 1) % CYCLE.length]
    onUpdate({ marker: next })
  }

  const moveTargets = SECTIONS.filter(s => s !== currentSection)

  return (
    <div
      className={`flex items-start gap-2 py-0.5 px-2 -mx-2 rounded transition-colors ${
        hovered
          ? 'bg-stone-100 dark:bg-zinc-800/70'
          : ''
      }`}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {/* Signifier — click to cycle */}
      <button
        onClick={cycleMarker}
        className="w-5 shrink-0 text-center text-sm leading-6 hover:scale-125 transition-transform select-none"
        title="Click to cycle status"
      >
        <span className={sig.className}>{sig.symbol}</span>
      </button>

      {/* Text */}
      <span className={`flex-1 text-sm leading-6 ${sig.className}`}>
        {item.text}
      </span>

      {/* Hover actions */}
      {hovered && (
        <div className="flex items-center gap-1 shrink-0">
          {moveTargets.map(target => (
            <button
              key={target}
              onClick={() => onMove(target)}
              className="text-xs text-stone-400 dark:text-zinc-600 hover:text-amber-600 dark:hover:text-amber-400 transition-colors leading-6 px-1"
              title={`Move to ${target}`}
            >
              → {SHORT[target]}
            </button>
          ))}
          <button
            onClick={onDelete}
            className="text-stone-300 dark:text-zinc-600 hover:text-red-500 dark:hover:text-red-400 text-xs leading-6 transition-colors px-1"
            title="Delete"
          >
            ✕
          </button>
        </div>
      )}
    </div>
  )
}
