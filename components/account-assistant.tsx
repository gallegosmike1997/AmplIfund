'use client'

import { useState } from 'react'
import { ArrowLeft, Check, ShieldCheck, Sparkles } from 'lucide-react'

type AccountAssistantProps = { onClose: () => void }

export function AccountAssistant({ onClose }: AccountAssistantProps) {
  const [step, setStep] = useState(1)
  const [form, setForm] = useState({ name: '', email: '', project: '', goal: '' })
  const [guidance, setGuidance] = useState('')
  const [busy, setBusy] = useState(false)
  const [created, setCreated] = useState(false)
  const [error, setError] = useState('')

  const update = (key: keyof typeof form, value: string) => setForm((current) => ({ ...current, [key]: value }))

  async function getGuidance() {
    if (!form.project.trim() || !form.goal.trim()) return setError('Add a project and primary goal first.')
    setError('')
    setBusy(true)
    try {
      const response = await fetch('/api/ai', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ tool: 'Account Creation Assistant', prompt: `Help a new Ampli-AI Fund user set up a safe workspace. Project: ${form.project}. Primary goal: ${form.goal}. Return a concise welcome note, three recommended first actions, and one privacy reminder. Do not claim an account or integrations were created.` }) })
      const data = await response.json()
      if (!response.ok) throw new Error(data.error || 'Unable to get guidance.')
      setGuidance(data.text)
      setStep(3)
    } catch (value) {
      setError(value instanceof Error ? value.message : 'Unable to get guidance.')
    } finally {
      setBusy(false)
    }
  }

  function finish() {
    if (!form.name.trim() || !form.email.trim()) return setError('Add your name and email to continue.')
    setError('')
    setCreated(true)
  }

  return <main className="account-assistant-page"><header className="account-assistant-header"><button className="analytics-back" onClick={onClose}><ArrowLeft size={15} /> Back to dashboard</button><div className="assistant-brand"><img src="/af-logo.png" alt="AF logo" /><span>Ampli-AI Fund</span></div></header><section className="assistant-layout"><div className="assistant-intro"><span className="eyebrow">Guided setup</span><h1>Create your workspace with an AI guide.</h1><p>Set up the essentials for campaign planning, audience insights, and ethical pre-launch outreach. You stay in control at every step.</p><div className="assistant-trust"><ShieldCheck size={19} /><span>Your details are used only to prepare this workspace preview.</span></div></div><div className="assistant-card"><div className="assistant-steps"><span className={step >= 1 ? 'active' : ''}>1 <small>Profile</small></span><i /><span className={step >= 2 ? 'active' : ''}>2 <small>Project</small></span><i /><span className={step >= 3 ? 'active' : ''}>3 <small>Guidance</small></span></div>{created ? <div className="assistant-success"><Check size={31} /><h2>Workspace ready to personalize</h2><p>We prepared your setup for {form.name}. Connect a campaign or explore the AI tools next.</p><button className="assistant-primary" onClick={onClose}>Open Launch Hub</button></div> : <>{step === 1 && <div className="assistant-form"><h2>Tell us about you</h2><label>Full name<input value={form.name} onChange={(event) => update('name', event.target.value)} placeholder="Alex Rivera" /></label><label>Email address<input type="email" value={form.email} onChange={(event) => update('email', event.target.value)} placeholder="alex@example.com" /></label><button className="assistant-primary" onClick={() => { if (!form.name.trim() || !form.email.trim()) return setError('Add your name and email to continue.'); setError(''); setStep(2) }}>Continue</button></div>}{step === 2 && <div className="assistant-form"><h2>What are you building?</h2><label>Project or campaign name<input value={form.project} onChange={(event) => update('project', event.target.value)} placeholder="Moonlight Studio" /></label><label>Primary goal<textarea value={form.goal} onChange={(event) => update('goal', event.target.value)} placeholder="Build an early following before launch" /></label><button className="assistant-primary" onClick={() => void getGuidance()} disabled={busy}><Sparkles size={16} /> {busy ? 'Preparing guidance…' : 'Get AI guidance'}</button></div>}{step === 3 && <div className="assistant-form"><h2>Your guided starting plan</h2><div className="assistant-guidance" aria-live="polite">{guidance}</div><button className="assistant-primary" onClick={finish}>Create workspace preview</button></div>}</>}{error && <p className="assistant-error" role="alert">{error}</p>}</div></section></main>
}
