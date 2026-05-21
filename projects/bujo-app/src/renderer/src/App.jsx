import { useState, useEffect, useCallback } from 'react'
import { parseTodos, serializeTodos } from './utils/parser'
import LogSection from './components/LogSection'
import RapidEntry from './components/RapidEntry'
import MigrationSweep from './components/MigrationSweep'
import ArchiveLog from './components/ArchiveLog'

const VIEWS = ['Today', 'This Month', 'Future', 'Archive']

const TODAY = new Date().toLocaleDateString('en-US', {
  weekday: 'long', month: 'long', day: 'numeric', year: 'numeric'
})

export default function App() {
  const [data, setData] = useState(null)
  const [view, setView] = useState('Today')
  const [showMigration, setShowMigration] = useState(false)
  const [isDark, setIsDark] = useState(true)
  const [error, setError] = useState(null)

  const load = useCallback(async () => {
    const raw = await window.api.readTodos()
    if (!raw) { setError('Could not read todos.md'); return }
    setData(parseTodos(raw))
  }, [])

  const save = useCallback(async (newData) => {
    await window.api.writeTodos(serializeTodos(newData))
    setData(newData)
  }, [])

  useEffect(() => { load() }, [load])

  const addEntry = useCallback(({ text, marker, section, category }) => {
    if (!data) return
    const d = structuredClone(data)
    if (!d.sections[section]) d.sections[section] = {}
    if (!d.sections[section][category]) d.sections[section][category] = []
    d.sections[section][category].push({ id: crypto.randomUUID(), marker, text })
    save(d)
  }, [data, save])

  const updateEntry = useCallback((section, category, id, changes) => {
    if (!data) return
    const d = structuredClone(data)
    const items = d.sections[section]?.[category]
    if (!items) return
    const idx = items.findIndex(i => i.id === id)
    if (idx !== -1) items[idx] = { ...items[idx], ...changes }
    save(d)
  }, [data, save])

  const deleteEntry = useCallback((section, category, id) => {
    if (!data) return
    const d = structuredClone(data)
    const items = d.sections[section]?.[category]
    if (items) d.sections[section][category] = items.filter(i => i.id !== id)
    save(d)
  }, [data, save])

  const moveEntry = useCallback((fromSection, category, id, toSection) => {
    if (!data) return
    const d = structuredClone(data)
    const items = d.sections[fromSection]?.[category]
    if (!items) return
    const idx = items.findIndex(i => i.id === id)
    if (idx === -1) return
    const [item] = items.splice(idx, 1)
    if (!d.sections[toSection]) d.sections[toSection] = {}
    if (!d.sections[toSection][category]) d.sections[toSection][category] = []
    d.sections[toSection][category].push({ ...item, id: crypto.randomUUID() })
    save(d)
  }, [data, save])

  const archiveCompleted = useCallback(() => {
    if (!data) return
    const d = structuredClone(data)
    const today = new Date().toISOString().split('T')[0]
    const newRows = []

    for (const section of ['Today', 'This Month', 'Future']) {
      if (!d.sections[section]) continue
      for (const [category, items] of Object.entries(d.sections[section])) {
        const completed = items.filter(i => i.marker === 'x' && i.text.trim())
        d.sections[section][category] = items.filter(i => i.marker !== 'x')
        for (const item of completed) {
          newRows.push(`| ${today} | ${category} | ${item.text} | Done |`)
        }
      }
    }

    if (newRows.length === 0) return

    // Insert after the archive table separator row
    const sepIdx = d.archiveRaw.findIndex(l => l.match(/^\|[-| ]+\|$/))
    const insertAt = sepIdx !== -1 ? sepIdx + 1 : d.archiveRaw.length
    d.archiveRaw.splice(insertAt, 0, ...newRows)

    save(d)
  }, [data, save])

  const applyMigration = useCallback((decisions) => {
    if (!data) return
    const d = structuredClone(data)
    if (!d.sections['This Month']) d.sections['This Month'] = {}

    for (const { category, id, action } of decisions) {
      const items = d.sections['Today']?.[category]
      if (!items) continue
      const item = items.find(i => i.id === id)
      if (!item) continue
      if (action === 'migrate') {
        item.marker = '>'
        if (!d.sections['This Month'][category]) d.sections['This Month'][category] = []
        d.sections['This Month'][category].push({ id: crypto.randomUUID(), marker: ' ', text: item.text })
      } else if (action === 'irrelevant') {
        item.marker = 'x'
      }
    }

    save(d)
    setShowMigration(false)
  }, [data, save])

  if (error) return (
    <div className="flex items-center justify-center h-screen text-red-500 text-sm">{error}</div>
  )
  if (!data) return (
    <div className="flex items-center justify-center h-screen text-stone-400 dark:text-zinc-600 text-sm">Loading…</div>
  )

  const currentSection = data.sections[view] ?? {}

  return (
    <div className={isDark ? 'dark' : ''} style={{ height: '100vh', display: 'flex', flexDirection: 'column' }}>
      <div className="flex flex-col h-full bg-stone-50 dark:bg-zinc-900 text-stone-900 dark:text-zinc-100">

        {/* Top bar */}
        <div className="flex items-center justify-between px-6 py-3 border-b border-stone-200 dark:border-zinc-800 shrink-0">
          <span className="text-amber-600 dark:text-amber-400 text-xs font-bold tracking-widest uppercase select-none">
            ◆ BuJo
          </span>

          <nav className="flex gap-0.5">
            {VIEWS.map(v => (
              <button
                key={v}
                onClick={() => setView(v)}
                className={`px-4 py-1.5 text-xs rounded transition-colors ${
                  view === v
                    ? 'bg-stone-200 dark:bg-zinc-700 text-stone-900 dark:text-zinc-100'
                    : 'text-stone-400 dark:text-zinc-500 hover:text-stone-700 dark:hover:text-zinc-300'
                }`}
              >
                {v}
              </button>
            ))}
          </nav>

          <div className="flex items-center gap-3">
            <button
              onClick={archiveCompleted}
              className="text-xs text-stone-400 dark:text-zinc-600 hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors"
              title="Move all completed items to Archive"
            >
              archive ✓
            </button>
            <button
              onClick={() => setShowMigration(true)}
              className="text-xs text-stone-400 dark:text-zinc-600 hover:text-amber-600 dark:hover:text-amber-400 transition-colors"
            >
              migrate →
            </button>
            <button
              onClick={() => setIsDark(d => !d)}
              className="text-xs text-stone-400 dark:text-zinc-600 hover:text-stone-700 dark:hover:text-zinc-300 transition-colors"
              title="Toggle light/dark mode"
            >
              {isDark ? '☀' : '🌙'}
            </button>
          </div>
        </div>

        {/* Rapid entry — hide on Archive */}
        {view !== 'Archive' && (
          <RapidEntry currentView={view} sections={Object.keys(data.sections)} onAdd={addEntry} />
        )}

        {/* Log content */}
        <div className="flex-1 overflow-y-auto px-8 py-5">
          {view === 'Archive' ? (
            <ArchiveLog archiveRaw={data.archiveRaw} />
          ) : (
            <>
              {view === 'Today' && (
                <p className="text-xs text-stone-400 dark:text-zinc-600 mb-6 tracking-wide">{TODAY}</p>
              )}
              {Object.entries(currentSection).map(([category, items]) => (
                <LogSection
                  key={category}
                  title={category}
                  items={items}
                  currentSection={view}
                  onUpdate={(id, changes) => updateEntry(view, category, id, changes)}
                  onDelete={(id) => deleteEntry(view, category, id)}
                  onMove={(id, toSection) => moveEntry(view, category, id, toSection)}
                />
              ))}
              {Object.keys(currentSection).length === 0 && (
                <p className="text-stone-400 dark:text-zinc-600 text-sm italic">Nothing here yet.</p>
              )}
            </>
          )}
        </div>

        {/* Migration modal */}
        {showMigration && (
          <MigrationSweep
            todayData={data.sections['Today'] ?? {}}
            onMigrate={applyMigration}
            onClose={() => setShowMigration(false)}
          />
        )}

      </div>
    </div>
  )
}
