import { generateText } from 'ai'
import { NextResponse } from 'next/server'

const MAX_PROMPT_LENGTH = 4000

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const prompt = typeof body?.prompt === 'string' ? body.prompt.trim() : ''
    const tool = typeof body?.tool === 'string' ? body.tool : 'General strategist'

    if (!prompt || prompt.length > MAX_PROMPT_LENGTH) {
      return NextResponse.json({ error: 'Enter a prompt up to 4,000 characters.' }, { status: 400 })
    }

    const { text } = await generateText({
      abortSignal: AbortSignal.timeout(20_000),
      model: 'openai/gpt-5-mini',
      system: `You are the Ampli-AI Fund ${tool}. Give practical, concise guidance for crowdfunding campaign growth, audience development, analytics, and ethical outreach. Never invent campaign metrics or claim an integration ran unless the user provided the data. Structure responses with short headings and actionable next steps.`,
      prompt,
      maxOutputTokens: 700,
    })

    return NextResponse.json({ text })
  } catch (error) {
    console.error('[v0] AI routing error', error)
    return NextResponse.json({ error: 'The AI route is temporarily unavailable.' }, { status: 503 })
  }
}
