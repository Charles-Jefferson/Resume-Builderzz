import { useState } from 'react'
import { FileDown, Eye, EyeOff, RotateCcw } from 'lucide-react'
import { useResumeStore } from '@/hooks/useResumeStore'
import { PersonalInfoStep } from '@/components/form/PersonalInfoStep'
import { ExperienceStep } from '@/components/form/ExperienceStep'
import { SkillsStep } from '@/components/form/SkillsStep'
import { OptionalStep } from '@/components/form/OptionalStep'
import { ResumePreview } from '@/components/preview/ResumePreview'
import { ThemePicker } from '@/components/preview/ThemePicker'
import { Button } from '@/components/ui/button'
import { ToastContainer, useToast } from '@/components/ui/toast'
// import { exportHTML } from '@/components/export/ExportHTML'
import { exportPDF } from '@/components/export/ExportPDF'

const STEPS = [
  { id: 1, label: 'Info' },
  { id: 2, label: 'Experience' },
  { id: 3, label: 'Skills' },
  { id: 4, label: 'Optional' },
]

export default function App() {
  const [activeStep, setActiveStep] = useState(1)
  const [showPreviewMobile, setShowPreviewMobile] = useState(false)
  const { state, setPersonal, addExperience, updateExperience, removeExperience, reorderExperience,
    setRawSkills, setSkills, addEducation, updateEducation, removeEducation,
    addCert, updateCert, removeCert, setSummary, setTheme, reset } = useResumeStore()
  const { toasts, toast, dismiss } = useToast()

  function handleError(msg: string) {
    toast(msg, 'error', {
      label: 'Dismiss',
      onClick: () => dismiss(toasts[toasts.length - 1]?.id ?? ''),
    })
  }

  function handleReset() {
    if (window.confirm('Reset all resume data? This cannot be undone.')) {
      reset()
    }
  }

  return (
    <div className="min-h-screen flex flex-col bg-gray-100">
      {/* Header */}
      <header className="no-print bg-white border-b border-gray-200 sticky top-0 z-40 shadow-sm">
        <div className="max-w-screen-xl mx-auto px-4 h-14 flex items-center gap-4">
          <div className="flex items-center gap-2.5">
            <div className="w-45 h-7 rounded-md flex items-center justify-center">
              <img src="cvforge_logo_v2.svg" alt="Italian Trulli"/>
            </div>
            {/* <span className="font-semibold text-gray-900 text-sm">CV Forge</span> */}
          </div>

          <div className="flex-1" />

          {/* Theme picker — desktop only */}
          <div className="hidden lg:flex items-center gap-2">
            <span className="text-xs text-gray-500">Theme:</span>
            <ThemePicker current={state.theme} onChange={setTheme} />
          </div>

          <div className="flex items-center gap-2">
            {/* <Button
              variant="outline"
              size="sm"
              onClick={() => exportHTML(state.personal.name)}
              title="Download HTML"
            >
              <FileDown size={14} />
              <span className="hidden sm:inline">HTML</span>
            </Button> */}
            <Button
              variant="default"
              size="sm"
              onClick={exportPDF}
              title="Download PDF"
            >
              <FileDown size={14} />
              <span className="hidden sm:inline">PDF</span>
            </Button>
            <button
              className="p-2 rounded-md text-gray-400 hover:text-gray-700 hover:bg-gray-100 transition-colors cursor-pointer"
              onClick={handleReset}
              title="Reset resume"
            >
              <RotateCcw size={15} />
            </button>
          </div>
        </div>
      </header>

      {/* Main layout */}
      <div className="flex-1 w-full lg:flex lg:gap-0">
        {/* Left — form */}
        <div className="no-print lg:border-r border-gray-200 lg:overflow-y-auto lg:sticky lg:top-14 lg:h-[850px] lg:w-full">
          {/* Step tabs */}
          <div className="bg-white border-b border-gray-200 px-4">
            <div className="flex gap-0">
              {STEPS.map((step) => (
                <button
                  key={step.id}
                  onClick={() => setActiveStep(step.id)}
                  className={`relative px-4 py-3 text-sm font-medium transition-colors cursor-pointer border-b-2 -mb-px ${
                    activeStep === step.id
                      ? 'text-[#A41034] border-[#A41034]'
                      : 'text-gray-500 border-transparent hover:text-gray-700'
                  }`}
                >
                  <span className="mr-1.5 text-xs opacity-60">{step.id}.</span>
                  {step.label}
                </button>
              ))}
            </div>
          </div>

          {/* Step content */}
          <div className="p-5">
            {activeStep === 1 && (
              <PersonalInfoStep data={state.personal} onChange={setPersonal} />
            )}
            {activeStep === 2 && (
              <ExperienceStep
                experience={state.experience}
                onAdd={addExperience}
                onUpdate={updateExperience}
                onRemove={removeExperience}
                onReorder={reorderExperience}
                onError={handleError}
              />
            )}
            {activeStep === 3 && (
              <SkillsStep
                rawSkills={state.rawSkills}
                skillGroups={state.skills}
                onRawChange={setRawSkills}
                onGroupsChange={setSkills}
                onError={handleError}
              />
            )}
            {activeStep === 4 && (
              <OptionalStep
                summary={state.summary}
                education={state.education}
                certifications={state.certifications}
                personalName={state.personal.name}
                personalTitle={state.personal.title}
                experience={state.experience}
                onSummaryChange={setSummary}
                onAddEducation={addEducation}
                onUpdateEducation={updateEducation}
                onRemoveEducation={removeEducation}
                onAddCert={addCert}
                onUpdateCert={updateCert}
                onRemoveCert={removeCert}
                onError={handleError}
              />
            )}

            {/* Step navigation */}
            <div className="flex justify-between mt-6 pt-4 border-t border-gray-100">
              <Button
                variant="ghost"
                size="sm"
                disabled={activeStep === 1}
                onClick={() => setActiveStep((s) => Math.max(1, s - 1))}
              >
                ← Back
              </Button>
              {activeStep < 4 ? (
                <Button
                  variant="default"
                  size="sm"
                  onClick={() => setActiveStep((s) => Math.min(4, s + 1))}
                >
                  Next →
                </Button>
              ) : (
                <Button variant="default" size="sm" onClick={exportPDF}>
                  <FileDown size={14} />
                  Export PDF
                </Button>
              )}
            </div>
          </div>
        </div>

        {/* Right — preview (desktop) */}
        <div className="hidden lg:block lg:overflow-y-auto lg:sticky lg:top-14 lg:h-full lg:w-full bg-gray-200">
          {/* Theme picker in preview panel */}
          <div className="bg-gray-100 border-b border-gray-200 px-4 py-2 h-[46px]">
            <div className="flex items-center justify-between gap-2 flex-wrap">
              <span className="text-xs text-gray-500 font-medium uppercase tracking-wide pt-1.5 ">Preview</span>
              <div className="lg:hidden">
                <ThemePicker current={state.theme} onChange={setTheme} />
              </div>
            </div>
          </div>
          <div className="p-4">
            <ResumePreview data={state} />
          </div>
        </div>
      </div>

      {/* Mobile: floating preview button */}
      <div className="no-print lg:hidden fixed bottom-4 right-4 z-30">
        <Button
          variant="default"
          size="md"
          onClick={() => setShowPreviewMobile(true)}
          className="shadow-lg rounded-full px-5"
        >
          <Eye size={15} />
          Preview
        </Button>
      </div>

      {/* Mobile: preview modal */}
      {showPreviewMobile && (
        <div className="no-print lg:hidden fixed inset-0 z-50 bg-black/60 flex flex-col">
          <div className="bg-white flex-1 overflow-y-auto">
            {/* Modal header */}
            <div className="sticky top-0 bg-white border-b border-gray-200 px-4 py-2 flex items-center justify-between">
              <span className="font-medium text-sm">Preview</span>
              <button
                className="p-1.5 rounded hover:bg-gray-100 cursor-pointer"
                onClick={() => setShowPreviewMobile(false)}
              >
                <EyeOff size={16} />
              </button>
            </div>
            {/* Theme picker in modal */}
            <div className="px-4 py-2 border-b bg-gray-50">
              <ThemePicker current={state.theme} onChange={setTheme} />
            </div>
            <div className="p-3 overflow-x-auto">
              <div className="min-w-[600px]">
                <ResumePreview data={state} />
              </div>
            </div>
          </div>
        </div>
      )}

      <ToastContainer toasts={toasts} onDismiss={dismiss} />
    </div>
  )
}
