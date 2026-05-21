export default function ArchiveLog({ archiveRaw }) {
  const rows = archiveRaw
    .filter(line => line.startsWith('|') && !line.match(/^\|[-| ]+\|$/))
    .map(line => line.split('|').map(c => c.trim()).filter(Boolean))
    .filter(cols => cols[0] !== 'Date' && cols[0] !== 'Date/Time')

  function parseRow(cols) {
    if (cols.length >= 4) {
      return { date: cols[0], category: cols[1], item: cols[2], status: cols[3] }
    }
    return { date: cols[0], category: '—', item: cols[1], status: cols[2] }
  }

  const entries = rows.map(parseRow)

  return (
    <div>
      <p className="text-xs text-stone-400 dark:text-zinc-600 mb-6 tracking-wide">Completed &amp; archived items</p>

      {entries.length === 0 ? (
        <p className="text-stone-400 dark:text-zinc-600 text-sm italic">No archived items yet.</p>
      ) : (
        <div>
          <div className="flex gap-3 pb-2 mb-2 border-b border-stone-200 dark:border-zinc-800 text-xs font-bold uppercase tracking-widest text-stone-400 dark:text-zinc-600">
            <span className="w-24 shrink-0">Date</span>
            <span className="w-24 shrink-0">Category</span>
            <span className="flex-1">Item</span>
            <span className="w-16 shrink-0 text-right">Status</span>
          </div>

          {entries.map((e, i) => (
            <div key={i} className="flex gap-3 py-1 border-b border-stone-100 dark:border-zinc-800/40 text-sm">
              <span className="text-stone-400 dark:text-zinc-600 text-xs w-24 shrink-0 pt-0.5">{e.date}</span>
              <span className="text-stone-400 dark:text-zinc-500 text-xs w-24 shrink-0 pt-0.5">{e.category}</span>
              <span className="text-stone-700 dark:text-zinc-300 flex-1">{e.item}</span>
              <span className="text-xs text-emerald-600 w-16 shrink-0 text-right pt-0.5">{e.status}</span>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
