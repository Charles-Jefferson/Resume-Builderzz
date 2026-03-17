import OpenAI from 'openai'

const apiKey = import.meta.env.VITE_OPENROUTER_API_KEY as string | undefined

let client: OpenAI | null = null

function getClient(): OpenAI {
  if (!apiKey) throw new Error('VITE_OPENROUTER_API_KEY is not set')
  if (!client) {
    client = new OpenAI({
      baseURL: 'https://openrouter.ai/api/v1',
      apiKey,
      dangerouslyAllowBrowser: true,
    })
  }
  return client
}

const MODEL = 'nvidia/nemotron-3-super-120b-a12b:free'

async function chat(prompt: string): Promise<string> {
  const res = await getClient().chat.completions.create({
    model: MODEL,
    messages: [{ role: 'user', content: prompt }],
  })
  return res.choices[0]?.message?.content?.trim() ?? ''
}

export async function polishExperienceBullets(
  role: string,
  company: string,
  rawText: string
): Promise<string[]> {
  const prompt = `You are a professional resume writer. Rewrite the following job description as 3-5 concise bullet points for a resume. Start each bullet with a strong action verb. Keep it factual and professional. Do not invent metrics.

Role: ${role} at ${company}
Description: ${rawText}

Return only the bullet points, one per line, starting with a dash (-). No preamble.`

  const text = await chat(prompt)
  return text
    .split('\n')
    .map((l) => l.replace(/^[-•*]\s*/, '').trim())
    .filter((l) => l.length > 0)
}

export async function categorizeSkills(
  rawSkills: string
): Promise<Record<string, string[]>> {
  const prompt = `Categorize the following skills into logical groups for a resume (e.g. Programming Languages, Frameworks, Tools, Soft Skills). Return a JSON object where each key is a category name and the value is an array of skills.

Skills: ${rawSkills}

Return only valid JSON, no markdown, no preamble.`

  const text = await chat(prompt)
  const cleaned = text.replace(/^```json\n?/, '').replace(/\n?```$/, '')
  return JSON.parse(cleaned) as Record<string, string[]>
}

export async function generateSummary(
  name: string,
  title: string,
  experience: Array<{ role: string; company: string }>
): Promise<string> {
  const expText = experience.map((e) => `${e.role} at ${e.company}`).join(', ')
  const prompt = `Write a 2-3 sentence professional resume summary for ${name}, a ${title} with experience as: ${expText}. Keep it confident, concise, and third-person optional. Return only the summary text, no preamble.`

  return chat(prompt)
}

export function isGeminiConfigured(): boolean {
  return !!apiKey
}
