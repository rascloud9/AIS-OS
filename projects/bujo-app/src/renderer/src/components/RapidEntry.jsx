import { useState } from 'react'

const TYPES = [
  { marker: ' ', symbol: '•', label: 'Task' },
  { marker: 'o', symbol: '○', label: 'Event' },
  { marker: '-', symbol: '–', label: 'Note' },
  { marker: '!', symbol: '★', label: 'Priority' },
]

export default function RapidEntry({ currentView, sections, onAdd }) {
  const [text, setText] = useState('')
  const [marker, setMarker] = useState(' ')
  const [category, setCategory] = useState('Business')

  const section = currentView
  const categories = ['Business', 'Personal', 'EO', 'Follow-ups']

  function submit(e) {
    e.preventDefault()
    if (!text.trim()) return
    onAdd({ text: text.trim(), marker, section, category })
    setText('')
  }

  return (
    <form onSubmit={submit} className="flex items-center gap-2 px-6 py-2 border-b border-stone-200 dark:border-zinc-800 bg-stone-50 dark:bg-zinc-900">
      <div className="flex gap-1">
        {TYPES.map(t => (
          <button
            key={t.marker}
            type="button"
            onClick={() => setMarker(t.marker)}
            title={t.label}
            className={`w-7 h-7 text-sm rounded transition-colors ${
              marker === t.marker
                ? 'bg-stone-200 dark:bg-zinc-700 text-stone-900 dark:text-zinc-100'
                : 'text-stone-400 dark:text-zinc-500 hover:text-stone-700 dark:hover:text-zinc-300'
            }`}
          >
            {t.symbol}
          </button>
        ))}
      </div>

      <select
        value={category}
        onChange={e => setCategory(e.target.value)}
        className="bg-stone-100 dark:bg-zinc-800 text-stone-600 dark:text-zinc-400 text-xs rounded px-2 py-1 border border-stone-300 dark:border-zinc-700 focus:outline-none"
      >
        {categories.map(c => (
          <option key={c} value={c}>{c}</option>
        ))}
      </select>

      <input
        type="text"
        value={text}
        onChange={e => setText(e.target.value)}
        placeholder="Rapid log..."
        className="flex-1 bg-transparent text-sm text-stone-900 dark:text-zinc-100 placeholder-stone-300 dark:placeholder-zinc-600 focus:outline-none"
        autoFocus
      />

      <button
        type="submit"
        disabled={!text.trim()}
        className="text-xs text-stone-400 dark:text-zinc-500 hover:text-amber-600 dark:hover:text-amber-400 transition-colors disabled:opacity-30"
      >
        Add ↵
      </button>
    </form>
  )
}
