// Bullet journal signifier map: markdown marker → display symbol + style
export const SIGNIFIERS = {
  ' ': { symbol: '•', className: 'text-stone-800 dark:text-zinc-100' },
  'x': { symbol: '×', className: 'text-stone-400 dark:text-zinc-500 line-through decoration-stone-400 dark:decoration-zinc-500' },
  'X': { symbol: '×', className: 'text-stone-400 dark:text-zinc-500 line-through decoration-stone-400 dark:decoration-zinc-500' },
  '>': { symbol: '›', className: 'text-amber-600 dark:text-amber-400' },
  '<': { symbol: '‹', className: 'text-blue-600 dark:text-blue-400' },
  '!': { symbol: '★', className: 'text-red-600 dark:text-red-400 font-bold' },
  '-': { symbol: '–', className: 'text-stone-400 dark:text-zinc-400 italic' },
  'o': { symbol: '○', className: 'text-emerald-600 dark:text-emerald-400' },
  'O': { symbol: '○', className: 'text-emerald-600 dark:text-emerald-400' },
}

export function getSignifier(marker) {
  return SIGNIFIERS[marker] ?? SIGNIFIERS[' ']
}

export function parseTodos(markdown) {
  const lines = markdown.split('\n')
  const sections = {}
  const sectionOrder = []
  let archiveRaw = []

  let currentSection = null
  let currentCategory = null
  let inArchive = false

  for (const line of lines) {
    if (line.startsWith('# ') || line.trim() === '---') {
      if (inArchive) archiveRaw.push(line)
      continue
    }

    const sectionMatch = line.match(/^## (.+)$/)
    if (sectionMatch) {
      currentSection = sectionMatch[1].trim()
      inArchive = currentSection === 'Archive'
      if (!sections[currentSection]) {
        sections[currentSection] = {}
        sectionOrder.push(currentSection)
      }
      currentCategory = null
      if (inArchive) archiveRaw.push(line)
      continue
    }

    if (inArchive) {
      archiveRaw.push(line)
      continue
    }

    const categoryMatch = line.match(/^### (.+)$/)
    if (categoryMatch && currentSection) {
      currentCategory = categoryMatch[1].trim()
      if (!sections[currentSection][currentCategory]) {
        sections[currentSection][currentCategory] = []
      }
      continue
    }

    if (!currentSection || !currentCategory) continue

    // Checkbox items: - [x] text
    const taskMatch = line.match(/^- \[(.)\] (.+)$/)
    if (taskMatch) {
      sections[currentSection][currentCategory].push({
        id: crypto.randomUUID(),
        marker: taskMatch[1],
        text: taskMatch[2].trim()
      })
      continue
    }

    // Plain items: - text (notes without checkbox)
    const noteMatch = line.match(/^- (.+)$/)
    if (noteMatch && noteMatch[1].trim()) {
      sections[currentSection][currentCategory].push({
        id: crypto.randomUUID(),
        marker: '-',
        text: noteMatch[1].trim()
      })
    }
  }

  return { sections, sectionOrder, archiveRaw }
}

export function serializeTodos({ sections, sectionOrder, archiveRaw }) {
  let out = '# To-Dos\n\n---\n\n'

  for (const section of sectionOrder) {
    if (section === 'Archive') continue
    out += `## ${section}\n\n`

    for (const [category, items] of Object.entries(sections[section])) {
      out += `### ${category}\n`
      if (!items.length) {
        out += '- \n'
      } else {
        for (const item of items) {
          out += item.marker === '-'
            ? `- ${item.text}\n`
            : `- [${item.marker}] ${item.text}\n`
        }
      }
      out += '\n'
    }

    out += '---\n\n'
  }

  if (archiveRaw.length) out += archiveRaw.join('\n') + '\n'

  return out
}
