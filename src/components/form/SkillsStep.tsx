import { useState } from 'react'
import { Sparkles, Pencil, Trash2 } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Textarea } from '@/components/ui/textarea'
import { Input } from '@/components/ui/input'
import { Badge } from '@/components/ui/badge'
import type { SkillGroup } from '@/types/resume'
import { useGeminiPolish } from '@/hooks/useGemini'

interface SkillsStepProps {
  rawSkills: string
  skillGroups: SkillGroup[]
  onRawChange: (raw: string) => void
  onGroupsChange: (groups: SkillGroup[]) => void
  onError: (msg: string) => void
}

export function SkillsStep({
  rawSkills,
  skillGroups,
  onRawChange,
  onGroupsChange,
  onError,
}: SkillsStepProps) {
  const { loading, polishSkills } = useGeminiPolish()
  const [editingIndex, setEditingIndex] = useState<number | null>(null)
  const [editingCategory, setEditingCategory] = useState('')

  async function handleCategorize() {
    if (!rawSkills.trim()) {
      onError('Please enter some skills first.')
      return
    }
    const groups = await polishSkills(rawSkills)
    if (groups) {
      onGroupsChange(groups)
    } else {
      onError('AI categorization failed. You can organize your skills manually.')
    }
  }

  function updateGroupSkills(index: number, skillsText: string) {
    const newGroups = [...skillGroups]
    newGroups[index] = {
      ...newGroups[index],
      skills: skillsText.split(',').map((s) => s.trim()).filter((s) => s.length > 0),
    }
    onGroupsChange(newGroups)
  }

  function updateGroupCategory(index: number, category: string) {
    const newGroups = [...skillGroups]
    newGroups[index] = { ...newGroups[index], category }
    onGroupsChange(newGroups)
  }

  function removeGroup(index: number) {
    onGroupsChange(skillGroups.filter((_, i) => i !== index))
  }

  function addGroup() {
    onGroupsChange([...skillGroups, { category: 'Other', skills: [] }])
  }

  return (
    <div className="space-y-4">
      <div>
        <h2 className="text-lg font-semibold text-gray-900">Skills</h2>
        <p className="text-sm text-gray-500 mt-0.5">
          Paste your skills as a comma-separated list. Gemini will categorize them.
        </p>
      </div>

      <Textarea
        label="Raw Skills"
        placeholder="React, TypeScript, Node.js, Python, AWS, Docker, Git, Communication, Leadership..."
        rows={3}
        value={rawSkills}
        onChange={(e) => onRawChange(e.target.value)}
      />

      <Button variant="outline" size="sm" loading={loading} onClick={handleCategorize}>
        <Sparkles size={14} />
        Categorize with AI
      </Button>

      {skillGroups.length > 0 && (
        <div className="space-y-3 pt-2">
          <p className="text-sm font-medium text-gray-700">Categorized Skills</p>
          {skillGroups.map((group, index) => (
            <div key={index} className="bg-white rounded-lg border border-gray-200 p-3 space-y-2">
              <div className="flex items-center gap-2">
                {editingIndex === index ? (
                  <Input
                    value={editingCategory}
                    onChange={(e) => setEditingCategory(e.target.value)}
                    onBlur={() => {
                      updateGroupCategory(index, editingCategory)
                      setEditingIndex(null)
                    }}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter') {
                        updateGroupCategory(index, editingCategory)
                        setEditingIndex(null)
                      }
                    }}
                    className="h-7 py-1 text-sm font-medium"
                    autoFocus
                  />
                ) : (
                  <span className="font-medium text-sm text-gray-800 flex-1">{group.category}</span>
                )}
                <button
                  className="text-gray-400 hover:text-gray-600"
                  onClick={() => {
                    setEditingIndex(index)
                    setEditingCategory(group.category)
                  }}
                >
                  <Pencil size={13} />
                </button>
                <button
                  className="text-gray-400 hover:text-red-500"
                  onClick={() => removeGroup(index)}
                >
                  <Trash2 size={13} />
                </button>
              </div>
              <div className="flex flex-wrap gap-1.5">
                {group.skills.map((skill, si) => (
                  <Badge key={si} variant="secondary">
                    {skill}
                  </Badge>
                ))}
              </div>
              <input
                className="w-full text-xs text-gray-500 border-b border-gray-100 focus:border-[#A41034] outline-none py-0.5 bg-transparent"
                placeholder="Edit skills (comma-separated)..."
                value={group.skills.join(', ')}
                onChange={(e) => updateGroupSkills(index, e.target.value)}
              />
            </div>
          ))}
          <button
            className="text-xs text-[#A41034] hover:underline"
            onClick={addGroup}
          >
            + Add category
          </button>
        </div>
      )}
    </div>
  )
}
