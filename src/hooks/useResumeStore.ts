import { useReducer, useEffect, useCallback } from 'react'
import type { ResumeData, ExperienceEntry, EducationEntry, CertEntry, SkillGroup, Theme } from '@/types/resume'

const STORAGE_KEY = 'resume-builder-data'

const defaultData: ResumeData = {
  personal: { name: '', title: '', email: '', phone: '', location: '', linkedin: '' },
  experience: [],
  skills: [],
  rawSkills: '',
  education: [],
  certifications: [],
  summary: '',
  theme: 'classic',
}

function loadFromStorage(): ResumeData {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    if (raw) return { ...defaultData, ...JSON.parse(raw) as ResumeData }
  } catch {
    // ignore
  }
  return defaultData
}

type Action =
  | { type: 'SET_PERSONAL'; payload: Partial<ResumeData['personal']> }
  | { type: 'ADD_EXPERIENCE' }
  | { type: 'UPDATE_EXPERIENCE'; id: string; payload: Partial<ExperienceEntry> }
  | { type: 'REMOVE_EXPERIENCE'; id: string }
  | { type: 'REORDER_EXPERIENCE'; ids: string[] }
  | { type: 'SET_RAW_SKILLS'; payload: string }
  | { type: 'SET_SKILLS'; payload: SkillGroup[] }
  | { type: 'ADD_EDUCATION' }
  | { type: 'UPDATE_EDUCATION'; id: string; payload: Partial<EducationEntry> }
  | { type: 'REMOVE_EDUCATION'; id: string }
  | { type: 'ADD_CERT' }
  | { type: 'UPDATE_CERT'; id: string; payload: Partial<CertEntry> }
  | { type: 'REMOVE_CERT'; id: string }
  | { type: 'SET_SUMMARY'; payload: string }
  | { type: 'SET_THEME'; payload: Theme }
  | { type: 'RESET' }

function uid() {
  return Math.random().toString(36).slice(2)
}

function reducer(state: ResumeData, action: Action): ResumeData {
  switch (action.type) {
    case 'SET_PERSONAL':
      return { ...state, personal: { ...state.personal, ...action.payload } }
    case 'ADD_EXPERIENCE':
      if (state.experience.length >= 6) return state
      return {
        ...state,
        experience: [
          ...state.experience,
          { id: uid(), company: '', role: '', startDate: '', endDate: '', description: '', bullets: [] },
        ],
      }
    case 'UPDATE_EXPERIENCE':
      return {
        ...state,
        experience: state.experience.map((e) =>
          e.id === action.id ? { ...e, ...action.payload } : e
        ),
      }
    case 'REMOVE_EXPERIENCE':
      return { ...state, experience: state.experience.filter((e) => e.id !== action.id) }
    case 'REORDER_EXPERIENCE':
      return {
        ...state,
        experience: action.ids
          .map((id) => state.experience.find((e) => e.id === id))
          .filter(Boolean) as ExperienceEntry[],
      }
    case 'SET_RAW_SKILLS':
      return { ...state, rawSkills: action.payload }
    case 'SET_SKILLS':
      return { ...state, skills: action.payload }
    case 'ADD_EDUCATION':
      return {
        ...state,
        education: [...state.education, { id: uid(), institution: '', degree: '', year: '' }],
      }
    case 'UPDATE_EDUCATION':
      return {
        ...state,
        education: state.education.map((e) =>
          e.id === action.id ? { ...e, ...action.payload } : e
        ),
      }
    case 'REMOVE_EDUCATION':
      return { ...state, education: state.education.filter((e) => e.id !== action.id) }
    case 'ADD_CERT':
      return {
        ...state,
        certifications: [...state.certifications, { id: uid(), name: '', issuer: '', year: '' }],
      }
    case 'UPDATE_CERT':
      return {
        ...state,
        certifications: state.certifications.map((c) =>
          c.id === action.id ? { ...c, ...action.payload } : c
        ),
      }
    case 'REMOVE_CERT':
      return { ...state, certifications: state.certifications.filter((c) => c.id !== action.id) }
    case 'SET_SUMMARY':
      return { ...state, summary: action.payload }
    case 'SET_THEME':
      return { ...state, theme: action.payload }
    case 'RESET':
      return defaultData
    default:
      return state
  }
}

export function useResumeStore() {
  const [state, dispatch] = useReducer(reducer, undefined, loadFromStorage)

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state))
  }, [state])

  const setPersonal = useCallback((payload: Partial<ResumeData['personal']>) =>
    dispatch({ type: 'SET_PERSONAL', payload }), [])
  const addExperience = useCallback(() => dispatch({ type: 'ADD_EXPERIENCE' }), [])
  const updateExperience = useCallback((id: string, payload: Partial<ExperienceEntry>) =>
    dispatch({ type: 'UPDATE_EXPERIENCE', id, payload }), [])
  const removeExperience = useCallback((id: string) =>
    dispatch({ type: 'REMOVE_EXPERIENCE', id }), [])
  const reorderExperience = useCallback((ids: string[]) =>
    dispatch({ type: 'REORDER_EXPERIENCE', ids }), [])
  const setRawSkills = useCallback((payload: string) =>
    dispatch({ type: 'SET_RAW_SKILLS', payload }), [])
  const setSkills = useCallback((payload: SkillGroup[]) =>
    dispatch({ type: 'SET_SKILLS', payload }), [])
  const addEducation = useCallback(() => dispatch({ type: 'ADD_EDUCATION' }), [])
  const updateEducation = useCallback((id: string, payload: Partial<EducationEntry>) =>
    dispatch({ type: 'UPDATE_EDUCATION', id, payload }), [])
  const removeEducation = useCallback((id: string) =>
    dispatch({ type: 'REMOVE_EDUCATION', id }), [])
  const addCert = useCallback(() => dispatch({ type: 'ADD_CERT' }), [])
  const updateCert = useCallback((id: string, payload: Partial<CertEntry>) =>
    dispatch({ type: 'UPDATE_CERT', id, payload }), [])
  const removeCert = useCallback((id: string) =>
    dispatch({ type: 'REMOVE_CERT', id }), [])
  const setSummary = useCallback((payload: string) =>
    dispatch({ type: 'SET_SUMMARY', payload }), [])
  const setTheme = useCallback((payload: Theme) =>
    dispatch({ type: 'SET_THEME', payload }), [])
  const reset = useCallback(() => dispatch({ type: 'RESET' }), [])

  return {
    state,
    setPersonal,
    addExperience,
    updateExperience,
    removeExperience,
    reorderExperience,
    setRawSkills,
    setSkills,
    addEducation,
    updateEducation,
    removeEducation,
    addCert,
    updateCert,
    removeCert,
    setSummary,
    setTheme,
    reset,
  }
}
