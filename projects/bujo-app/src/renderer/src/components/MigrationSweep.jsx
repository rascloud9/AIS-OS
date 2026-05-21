import { useState } from 'react'

export default function MigrationSweep({ todayData, onMigrate, onClose }) {
  const openItems = []

  for (const [category, items] of Object.entries(todayData)) {
    for (const item of items) {
      if (item.marker === ' ' && item.text.trim()) {
        openItems.push({ ...item, category })
      }
    }
  }

  const [decisions, setDecisions] = useState(
    Object.fromEntries(openItems.map(i => [i.id, 'keep']))
  )

  function setDecision(id, action) {
    setDecisions(prev => ({ ...prev, [id]: action }))
  }

  function confirm() {
    const result = openItems.map(i => ({
      category: i.category,
      id: i.id,
      action: decisions[i.id]
    }))
    onMigrate(result)
  }

  const ACTIONS = [
    { key: 'keep',      label: 'Keep',      color: 'bg-stone-200 dark:bg-zinc-700 text-stone-700 dark:text-zinc-300' },
    { key: 'migrate',   label: '› Migrate', color: 'bg-amber-100 dark:bg-amber-900 text-amber-700 dark:text-amber-300' },
    { key: 'irrelevant',label: '× Drop',    color: 'bg-stone-100 dark:bg-zinc-800 text-stone-400 dark:text-zinc-500' },
  ]

  return (
    <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50">
      <div className="bg-white dark:bg-zinc-900 border border-stone-200 dark:border-zinc-700 rounded-lg w-full max-w-lg max-h-[80vh] flex flex-col">
        <div className="flex items-center justify-between px-5 py-3 border-b border-stone-200 dark:border-zinc-800">
          <span className="text-sm font-bold text-amber-600 dark:text-amber-400 tracking-widest uppercase">
            Migration Sweep
          </span>
          <span className="text-xs text-stone-400 dark:text-zinc-500">{openItems.length} open items</span>
        </div>

        <div className="flex-1 overflow-y-auto px-5 py-3 space-y-3">
          {openItems.length === 0 ? (
            <p className="text-stone-400 dark:text-zinc-500 text-sm text-center py-6">No open items — clean slate.</p>
          ) : (
            openItems.map(item => (
              <div key={item.id} className="flex items-center gap-3">
                <div className="flex-1 min-w-0">
                  <span className="text-xs text-stone-400 dark:text-zinc-500 mr-2">{item.category}</span>
                  <span className="text-sm text-stone-700 dark:text-zinc-200">{item.text}</span>
                </div>
                <div className="flex gap-1 shrink-0">
                  {ACTIONS.map(a => (
                    <button
                      key={a.key}
                      onClick={() => setDecision(item.id, a.key)}
                      className={`text-xs px-2 py-0.5 rounded transition-opacity ${a.color} ${
                        decisions[item.id] === a.key ? 'opacity-100 ring-1 ring-stone-400 dark:ring-zinc-400' : 'opacity-40 hover:opacity-70'
                      }`}
                    >
                      {a.label}
                    </button>
                  ))}
                </div>
              </div>
            ))
          )}
        </div>

        <div className="flex justify-end gap-2 px-5 py-3 border-t border-stone-200 dark:border-zinc-800">
          <button onClick={onClose} className="text-sm text-stone-400 dark:text-zinc-500 hover:text-stone-700 dark:hover:text-zinc-300 px-3 py-1">
            Cancel
          </button>
          <button
            onClick={confirm}
            className="text-sm bg-amber-600 hover:bg-amber-500 text-white px-4 py-1 rounded transition-colors"
          >
            Apply
          </button>
        </div>
      </div>
    </div>
  )
}
