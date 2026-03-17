import type { ResumeData } from '@/types/resume'
import { ClassicTheme } from './themes/ClassicTheme'
import { ModernTheme } from './themes/ModernTheme'
import { MinimalTheme } from './themes/MinimalTheme'
import { ExecutiveTheme } from './themes/ExecutiveTheme'

interface ResumePreviewProps {
  data: ResumeData
}

export function ResumePreview({ data }: ResumePreviewProps) {
  return (
    <div id="resume-preview" className="bg-white shadow-md min-h-[297mm] w-full">
      {data.theme === 'classic' && <ClassicTheme data={data} />}
      {data.theme === 'modern' && <ModernTheme data={data} />}
      {data.theme === 'minimal' && <MinimalTheme data={data} />}
      {data.theme === 'executive' && <ExecutiveTheme data={data} />}
    </div>
  )
}
