import BulletEntry from './BulletEntry'

export default function LogSection({ title, items, currentSection, onUpdate, onDelete, onMove }) {
  const visible = items.filter(i => i.text.trim())

  return (
    <div className="mb-6">
      <h3 className="text-xs font-bold uppercase tracking-widest text-stone-400 dark:text-zinc-500 mb-2">
        {title}
      </h3>
      {visible.length === 0 ? (
        <p className="text-stone-300 dark:text-zinc-600 text-sm italic pl-7">—</p>
      ) : (
        <div>
          {visible.map(item => (
            <BulletEntry
              key={item.id}
              item={item}
              currentSection={currentSection}
              onUpdate={(changes) => onUpdate(item.id, changes)}
              onDelete={() => onDelete(item.id)}
              onMove={(toSection) => onMove(item.id, toSection)}
            />
          ))}
        </div>
      )}
    </div>
  )
}
