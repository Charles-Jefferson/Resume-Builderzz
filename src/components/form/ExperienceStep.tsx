import { useState } from 'react'
import { GripVertical, Trash2, Plus, Sparkles } from 'lucide-react'
import { DndContext, closestCenter, PointerSensor, useSensor, useSensors } from '@dnd-kit/core'
import type { DragEndEvent } from '@dnd-kit/core'
import {
  SortableContext,
  verticalListSortingStrategy,
  useSortable,
  arrayMove,
} from '@dnd-kit/sortable'
import { CSS } from '@dnd-kit/utilities'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import type { ExperienceEntry } from '@/types/resume'
import { useGeminiPolish } from '@/hooks/useGemini'

interface ExperienceStepProps {
  experience: ExperienceEntry[]
  onAdd: () => void
  onUpdate: (id: string, payload: Partial<ExperienceEntry>) => void
  onRemove: (id: string) => void
  onReorder: (ids: string[]) => void
  onError: (msg: string) => void
}

interface SortableItemProps {
  entry: ExperienceEntry
  onUpdate: (payload: Partial<ExperienceEntry>) => void
  onRemove: () => void
  onError: (msg: string) => void
}

function SortableItem({ entry, onUpdate, onRemove, onError }: SortableItemProps) {
  const { attributes, listeners, setNodeRef, transform, transition, isDragging } = useSortable({
    id: entry.id,
  })
  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.5 : 1,
  }

  const { loading, polishBullets } = useGeminiPolish()
  const [showBullets, setShowBullets] = useState(entry.bullets.length > 0)

  async function handlePolish() {
    if (!entry.description.trim()) {
      onError('Please add a description before polishing.')
      return
    }
    const bullets = await polishBullets(entry.role, entry.company, entry.description)
    if (bullets) {
      onUpdate({ bullets })
      setShowBullets(true)
    } else {
      onError('AI polish failed. You can still write bullets manually.')
    }
  }

  return (
    <div ref={setNodeRef} style={style} className="bg-white rounded-lg border border-gray-200 p-4 space-y-3">
      <div className="flex items-center gap-2">
        <button
          {...attributes}
          {...listeners}
          className="text-gray-400 hover:text-gray-600 cursor-grab active:cursor-grabbing touch-none"
          aria-label="Drag to reorder"
        >
          <GripVertical size={18} />
        </button>
        <span className="text-sm font-medium text-gray-700 flex-1">
          {entry.role || entry.company ? `${entry.role}${entry.role && entry.company ? ' @ ' : ''}${entry.company}` : 'New Entry'}
        </span>
        <button
          onClick={onRemove}
          className="text-gray-400 hover:text-red-500 transition-colors"
          aria-label="Remove entry"
        >
          <Trash2 size={16} />
        </button>
      </div>

      <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
        <Input
          label="Company"
          placeholder="Acme Corp"
          value={entry.company}
          onChange={(e) => onUpdate({ company: e.target.value })}
        />
        <Input
          label="Role"
          placeholder="Software Engineer"
          value={entry.role}
          onChange={(e) => onUpdate({ role: e.target.value })}
        />
        <Input
          label="Start Date"
          placeholder="Jan 2022"
          value={entry.startDate}
          onChange={(e) => onUpdate({ startDate: e.target.value })}
        />
        <Input
          label="End Date"
          placeholder="Present"
          value={entry.endDate}
          onChange={(e) => onUpdate({ endDate: e.target.value })}
        />
      </div>

      <Textarea
        label="Description (raw)"
        placeholder="Describe what you did in this role. Gemini will rewrite it as bullet points."
        rows={3}
        value={entry.description}
        onChange={(e) => onUpdate({ description: e.target.value })}
      />

      <div className="flex items-center gap-2">
        <Button
          variant="outline"
          size="sm"
          loading={loading}
          onClick={handlePolish}
        >
          <Sparkles size={14} />
          Polish with AI
        </Button>
        {entry.bullets.length > 0 && (
          <button
            className="text-xs text-gray-500 hover:text-gray-700 underline"
            onClick={() => setShowBullets(!showBullets)}
          >
            {showBullets ? 'Hide' : 'Show'} bullets ({entry.bullets.length})
          </button>
        )}
      </div>

      {showBullets && entry.bullets.length > 0 && (
        <div className="space-y-1.5 pt-1">
          <p className="text-xs font-medium text-gray-600">AI-generated bullets (click to edit):</p>
          {entry.bullets.map((bullet, idx) => (
            <div key={idx} className="flex gap-2 items-start">
              <span className="text-gray-400 mt-1.5 shrink-0">•</span>
              <input
                className="flex-1 text-sm border-b border-gray-200 focus:border-[#A41034] outline-none py-0.5 bg-transparent"
                value={bullet}
                onChange={(e) => {
                  const newBullets = [...entry.bullets]
                  newBullets[idx] = e.target.value
                  onUpdate({ bullets: newBullets })
                }}
              />
              <button
                className="text-gray-300 hover:text-red-400 mt-1"
                onClick={() => {
                  const newBullets = entry.bullets.filter((_, i) => i !== idx)
                  onUpdate({ bullets: newBullets })
                }}
              >
                <Trash2 size={12} />
              </button>
            </div>
          ))}
          <button
            className="text-xs text-[#A41034] hover:underline"
            onClick={() => onUpdate({ bullets: [...entry.bullets, ''] })}
          >
            + Add bullet
          </button>
        </div>
      )}
    </div>
  )
}

export function ExperienceStep({
  experience,
  onAdd,
  onUpdate,
  onRemove,
  onReorder,
  onError,
}: ExperienceStepProps) {
  const sensors = useSensors(useSensor(PointerSensor))

  function handleDragEnd(event: DragEndEvent) {
    const { active, over } = event
    if (over && active.id !== over.id) {
      const ids = experience.map((e) => e.id)
      const oldIndex = ids.indexOf(active.id as string)
      const newIndex = ids.indexOf(over.id as string)
      onReorder(arrayMove(ids, oldIndex, newIndex))
    }
  }

  return (
    <div className="space-y-4">
      <div>
        <h2 className="text-lg font-semibold text-gray-900">Work Experience</h2>
        <p className="text-sm text-gray-500 mt-0.5">Add up to 6 entries. Drag to reorder.</p>
      </div>

      <DndContext sensors={sensors} collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
        <SortableContext items={experience.map((e) => e.id)} strategy={verticalListSortingStrategy}>
          <div className="space-y-3">
            {experience.map((entry) => (
              <SortableItem
                key={entry.id}
                entry={entry}
                onUpdate={(payload) => onUpdate(entry.id, payload)}
                onRemove={() => onRemove(entry.id)}
                onError={onError}
              />
            ))}
          </div>
        </SortableContext>
      </DndContext>

      {experience.length < 6 && (
        <Button variant="outline" size="sm" onClick={onAdd}>
          <Plus size={14} />
          Add Experience
        </Button>
      )}

      {experience.length === 0 && (
        <div className="text-center py-8 text-gray-400 border-2 border-dashed border-gray-200 rounded-lg">
          <p className="text-sm">No experience entries yet.</p>
          <p className="text-xs mt-1">Click "Add Experience" to get started.</p>
        </div>
      )}
    </div>
  )
}
