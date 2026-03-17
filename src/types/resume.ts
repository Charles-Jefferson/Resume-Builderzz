export type Theme = 'classic' | 'modern' | 'minimal' | 'executive'

export interface PersonalInfo {
  name: string
  title: string
  email: string
  phone: string
  location: string
  linkedin: string
}

export interface ExperienceEntry {
  id: string
  company: string
  role: string
  startDate: string
  endDate: string
  description: string
  bullets: string[]
}

export interface SkillGroup {
  category: string
  skills: string[]
}

export interface EducationEntry {
  id: string
  institution: string
  degree: string
  year: string
}

export interface CertEntry {
  id: string
  name: string
  issuer: string
  year: string
}

export interface ResumeData {
  personal: PersonalInfo
  experience: ExperienceEntry[]
  skills: SkillGroup[]
  rawSkills: string
  education: EducationEntry[]
  certifications: CertEntry[]
  summary: string
  theme: Theme
}
