import { useState, useCallback } from 'react'
import {
  polishExperienceBullets,
  categorizeSkills,
  generateSummary,
  isGeminiConfigured,
} from '@/lib/gemini'
import type { SkillGroup } from '@/types/resume'

interface GeminiState {
  loading: boolean
  error: string | null
}

export function useGeminiPolish() {
  const [state, setState] = useState<GeminiState>({ loading: false, error: null })

  const polishBullets = useCallback(
    async (role: string, company: string, rawText: string): Promise<string[] | null> => {
      if (!isGeminiConfigured()) {
        setState({ loading: false, error: 'OpenRouter API key not configured. Add VITE_OPENROUTER_API_KEY to your .env file.' })
        return null
      }
      setState({ loading: true, error: null })
      try {
        const bullets = await polishExperienceBullets(role, company, rawText)
        setState({ loading: false, error: null })
        return bullets
      } catch (e) {
        const msg = e instanceof Error ? e.message : 'Failed to polish bullets'
        setState({ loading: false, error: msg })
        return null
      }
    },
    []
  )

  const polishSkills = useCallback(
    async (rawSkills: string): Promise<SkillGroup[] | null> => {
      if (!isGeminiConfigured()) {
        setState({ loading: false, error: 'OpenRouter API key not configured. Add VITE_OPENROUTER_API_KEY to your .env file.' })
        return null
      }
      setState({ loading: true, error: null })
      try {
        const grouped = await categorizeSkills(rawSkills)
        const skillGroups: SkillGroup[] = Object.entries(grouped).map(([category, skills]) => ({
          category,
          skills,
        }))
        setState({ loading: false, error: null })
        return skillGroups
      } catch (e) {
        const msg = e instanceof Error ? e.message : 'Failed to categorize skills'
        setState({ loading: false, error: msg })
        return null
      }
    },
    []
  )

  const polishSummary = useCallback(
    async (
      name: string,
      title: string,
      experience: Array<{ role: string; company: string }>
    ): Promise<string | null> => {
      if (!isGeminiConfigured()) {
        setState({ loading: false, error: 'OpenRouter API key not configured. Add VITE_OPENROUTER_API_KEY to your .env file.' })
        return null
      }
      setState({ loading: true, error: null })
      try {
        const summary = await generateSummary(name, title, experience)
        setState({ loading: false, error: null })
        return summary
      } catch (e) {
        const msg = e instanceof Error ? e.message : 'Failed to generate summary'
        setState({ loading: false, error: msg })
        return null
      }
    },
    []
  )

  const clearError = useCallback(() => setState((s) => ({ ...s, error: null })), [])

  return { ...state, polishBullets, polishSkills, polishSummary, clearError }
}
