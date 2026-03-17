import { Trash2, Plus, Sparkles } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import type { EducationEntry, CertEntry, ExperienceEntry } from '@/types/resume'
import { useGeminiPolish } from '@/hooks/useGemini'

interface OptionalStepProps {
  summary: string
  education: EducationEntry[]
  certifications: CertEntry[]
  personalName: string
  personalTitle: string
  experience: ExperienceEntry[]
  onSummaryChange: (v: string) => void
  onAddEducation: () => void
  onUpdateEducation: (id: string, payload: Partial<EducationEntry>) => void
  onRemoveEducation: (id: string) => void
  onAddCert: () => void
  onUpdateCert: (id: string, payload: Partial<CertEntry>) => void
  onRemoveCert: (id: string) => void
  onError: (msg: string) => void
}

export function OptionalStep({
  summary,
  education,
  certifications,
  personalName,
  personalTitle,
  experience,
  onSummaryChange,
  onAddEducation,
  onUpdateEducation,
  onRemoveEducation,
  onAddCert,
  onUpdateCert,
  onRemoveCert,
  onError,
}: OptionalStepProps) {
  const { loading, polishSummary } = useGeminiPolish()

  async function handleGenerateSummary() {
    if (!personalName || !personalTitle) {
      onError('Please fill in your name and title in Step 1 first.')
      return
    }
    const result = await polishSummary(
      personalName,
      personalTitle,
      experience.map((e) => ({ role: e.role, company: e.company }))
    )
    if (result) {
      onSummaryChange(result)
    } else {
      onError('Failed to generate summary. Please write it manually.')
    }
  }

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-lg font-semibold text-gray-900">Optional Details</h2>
        <p className="text-sm text-gray-500 mt-0.5">Education, certifications, and summary</p>
      </div>

      {/* Summary */}
      <section className="space-y-2">
        <h3 className="text-sm font-semibold text-gray-800 uppercase tracking-wide">Professional Summary</h3>
        <Textarea
          placeholder="A brief 2-3 sentence summary of your professional background and strengths..."
          rows={3}
          value={summary}
          onChange={(e) => onSummaryChange(e.target.value)}
        />
        <Button variant="outline" size="sm" loading={loading} onClick={handleGenerateSummary}>
          <Sparkles size={14} />
          Generate with AI
        </Button>
      </section>

      {/* Education */}
      <section className="space-y-3">
        <h3 className="text-sm font-semibold text-gray-800 uppercase tracking-wide">Education</h3>
        {education.map((edu) => (
          <div key={edu.id} className="bg-white rounded-lg border border-gray-200 p-3 space-y-3">
            <div className="flex justify-between items-center">
              <span className="text-sm font-medium text-gray-700">
                {edu.institution || edu.degree || 'New Entry'}
              </span>
              <button
                className="text-gray-400 hover:text-red-500"
                onClick={() => onRemoveEducation(edu.id)}
              >
                <Trash2 size={15} />
              </button>
            </div>
            <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
              <div className="sm:col-span-2">
                <Input
                  label="Institution"
                  placeholder="MIT"
                  value={edu.institution}
                  onChange={(e) => onUpdateEducation(edu.id, { institution: e.target.value })}
                />
              </div>
              <Input
                label="Year"
                placeholder="2020"
                value={edu.year}
                onChange={(e) => onUpdateEducation(edu.id, { year: e.target.value })}
              />
              <div className="sm:col-span-3">
                <Input
                  label="Degree"
                  placeholder="B.S. Computer Science"
                  value={edu.degree}
                  onChange={(e) => onUpdateEducation(edu.id, { degree: e.target.value })}
                />
              </div>
            </div>
          </div>
        ))}
        <Button variant="outline" size="sm" onClick={onAddEducation}>
          <Plus size={14} />
          Add Education
        </Button>
      </section>

      {/* Certifications */}
      <section className="space-y-3">
        <h3 className="text-sm font-semibold text-gray-800 uppercase tracking-wide">Certifications</h3>
        {certifications.map((cert) => (
          <div key={cert.id} className="bg-white rounded-lg border border-gray-200 p-3 space-y-3">
            <div className="flex justify-between items-center">
              <span className="text-sm font-medium text-gray-700">
                {cert.name || cert.issuer || 'New Entry'}
              </span>
              <button
                className="text-gray-400 hover:text-red-500"
                onClick={() => onRemoveCert(cert.id)}
              >
                <Trash2 size={15} />
              </button>
            </div>
            <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
              <div className="sm:col-span-2">
                <Input
                  label="Certification Name"
                  placeholder="AWS Solutions Architect"
                  value={cert.name}
                  onChange={(e) => onUpdateCert(cert.id, { name: e.target.value })}
                />
              </div>
              <Input
                label="Year"
                placeholder="2023"
                value={cert.year}
                onChange={(e) => onUpdateCert(cert.id, { year: e.target.value })}
              />
              <div className="sm:col-span-3">
                <Input
                  label="Issuer"
                  placeholder="Amazon Web Services"
                  value={cert.issuer}
                  onChange={(e) => onUpdateCert(cert.id, { issuer: e.target.value })}
                />
              </div>
            </div>
          </div>
        ))}
        <Button variant="outline" size="sm" onClick={onAddCert}>
          <Plus size={14} />
          Add Certification
        </Button>
      </section>
    </div>
  )
}
