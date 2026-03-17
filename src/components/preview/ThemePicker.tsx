import type { Theme } from '@/types/resume'

interface ThemePickerProps {
  current: Theme
  onChange: (t: Theme) => void
}

const themes: { id: Theme; label: string; description: string; preview: string }[] = [
  { id: 'classic', label: 'Classic', description: 'Clean serif, corporate', preview: 'bg-white border border-gray-300' },
  { id: 'modern', label: 'Modern', description: 'Two-column, sidebar accent', preview: 'bg-gradient-to-r from-[#1a1a2e] to-white border border-gray-300' },
  { id: 'minimal', label: 'Minimal', description: 'Monospace, whitespace', preview: 'bg-[#fafafa] border border-gray-300' },
  { id: 'executive', label: 'Executive', description: 'Dark header, centered', preview: 'bg-gradient-to-b from-black to-white border border-gray-300' },
]

export function ThemePicker({ current, onChange }: ThemePickerProps) {
  return (
    <div className="flex gap-2 flex-wrap">
      {themes.map((t) => (
        <button
          key={t.id}
          onClick={() => onChange(t.id)}
          className={`flex items-center gap-2 px-3 py-1.5 rounded-lg border text-sm transition-all cursor-pointer ${
            current === t.id
              ? 'border-[#A41034] bg-[#A41034] text-white shadow-sm'
              : 'border-gray-200 bg-white text-gray-700 hover:border-[#A41034] hover:text-[#A41034]'
          }`}
          title={t.description}
        >
          <span className={`w-4 h-4 rounded-sm shrink-0 ${t.preview}`} />
          {t.label}
        </button>
      ))}
    </div>
  )
}
