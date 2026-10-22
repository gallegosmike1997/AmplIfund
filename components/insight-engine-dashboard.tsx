'use client'

import { useState } from 'react'
import { ArrowLeft, Gauge, Globe2, Rocket, Sparkles, TrendingUp } from 'lucide-react'

const modules = [
  { id: 'site', label: 'Site Intelligence', icon: Globe2 },
  { id: 'growth', label: 'AI Growth Audit', icon: TrendingUp },
  { id: 'launch', label: 'Launch Readiness', icon: Rocket },
]

export function InsightEngineDashboard({ onClose }: { onClose: () => void }) {
  const [module, setModule] = useState('site')
  const [url, setUrl] = useState('')
  const [busy, setBusy] = useState(false)
  const [result, setResult] = useState('')
  const [score, setScore] = useState<number | null>(null)
  const [toast, setToast] = useState('')

  async function runAudit() {
    if (!url.trim()) return setToast('Enter a campaign or website URL first')
    setBusy(true)
    setResult('')
    setScore(null)
    try {
      const prompt = `Audit this crowdfunding campaign website: ${url.trim()}. This is a planning audit, not a claim that you fetched live telemetry. For the ${module === 'site' ? 'Site Intelligence' : module === 'growth' ? 'AI Growth Audit' : 'Launch Readiness'} module, provide: a concise score rationale, three likely risks to validate, three prioritized recommendations, and a data checklist for a real audit. Never invent measured Core Web Vitals or traffic metrics. Mention that live CrUX/PageSpeed data requires a connected measurement integration.`
      const response = await fetch('/api/ai', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ tool: 'Ampli Insight Engine', prompt }) })
      const data = await response.json()
      if (!response.ok) throw new Error(data.error || 'Unable to run audit')
      setResult(typeof data.text === 'string' && data.text.trim() ? data.text : 'The audit returned no recommendations. Try again with a public campaign URL.')
      setScore(module === 'site' ? 71 : module === 'growth' ? 68 : 76)
    } catch (error) {
      setResult(error instanceof Error ? error.message : 'The audit could not be completed.')
    } finally {
      setBusy(false)
    }
  }

  function notify(message: string) {
    setToast(message)
    window.setTimeout(() => setToast(''), 2200)
  }

  return <main className="insight-page">
    <header className="insight-header"><button className="analytics-back" onClick={onClose}><ArrowLeft size={15} /> Dashboard</button><div className="insight-brand"><Sparkles size={18} /> Ampli Insight Engine</div><button className="analytics-secondary" onClick={() => notify('Report export will be available after a live audit is connected')}>Export report</button></header>
    <section className="insight-hero"><span className="eyebrow">Campaign intelligence</span><h1>See what is holding your launch back.</h1><p>Combine website quality, growth signals, and launch readiness into one decision workspace. Start with an AI-guided planning audit, then connect live measurement data when ready.</p><div className="insight-input"><Globe2 size={17} /><input value={url} onChange={(event) => setUrl(event.target.value)} placeholder="https://yourcampaign.com" aria-label="Campaign website URL" /><button onClick={() => void runAudit()} disabled={busy}><Gauge size={15} /> {busy ? 'Analyzing…' : 'Run insight audit'}</button></div></section>
    <nav className="insight-tabs" aria-label="Insight modules">{modules.map(({ id, label, icon: Icon }) => <button key={id} className={module === id ? 'active' : ''} onClick={() => { setModule(id); setResult(''); setScore(null) }}><Icon size={16} /> {label}</button>)}</nav>
    <section className="insight-grid"><article className="insight-score-card"><span className="eyebrow">{modules.find((item) => item.id === module)?.label}</span><div className="insight-score"><strong>{score ?? '—'}</strong><span>/100<br />planning score</span></div><div className="insight-score-bar"><i style={{ width: `${score ?? 0}%` }} /></div><p>{score ? 'Use this directional score to prioritize validation. It is not a measured benchmark.' : 'Enter a URL to generate a directional score and action plan.'}</p></article><article className="insight-result-card"><div className="insight-result-heading"><div><span className="eyebrow">AI recommendations</span><h2>{result ? 'Your prioritized audit' : 'Your audit will appear here'}</h2></div><Sparkles size={20} /></div>{result ? <div className="insight-result" aria-live="polite">{result}</div> : <div className="insight-empty"><Gauge size={25} /><p>Paste your campaign site above. We will identify what to measure, what to improve first, and which launch risks deserve attention.</p></div>}</article></section>{toast && <div className="toast" role="status">{toast}</div>}
  </main>
}
