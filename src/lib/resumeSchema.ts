import { z } from 'zod'

export const personalInfoSchema = z.object({
  name: z.string().min(1, 'Name is required'),
  title: z.string().min(1, 'Job title is required'),
  email: z.string().email('Valid email is required'),
  phone: z.string(),
  location: z.string(),
  linkedin: z.string(),
})

export const experienceEntrySchema = z.object({
  id: z.string(),
  company: z.string().min(1, 'Company is required'),
  role: z.string().min(1, 'Role is required'),
  startDate: z.string(),
  endDate: z.string(),
  description: z.string(),
  bullets: z.array(z.string()),
})

export const skillGroupSchema = z.object({
  category: z.string(),
  skills: z.array(z.string()),
})

export const educationEntrySchema = z.object({
  id: z.string(),
  institution: z.string(),
  degree: z.string(),
  year: z.string(),
})

export const certEntrySchema = z.object({
  id: z.string(),
  name: z.string(),
  issuer: z.string(),
  year: z.string(),
})

export const resumeDataSchema = z.object({
  personal: personalInfoSchema,
  experience: z.array(experienceEntrySchema),
  skills: z.array(skillGroupSchema),
  rawSkills: z.string(),
  education: z.array(educationEntrySchema),
  certifications: z.array(certEntrySchema),
  summary: z.string(),
  theme: z.enum(['classic', 'modern', 'minimal', 'executive']),
})
