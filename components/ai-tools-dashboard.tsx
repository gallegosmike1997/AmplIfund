'use client'

import { useEffect, useState } from 'react'
import { BarChart3, BrainCircuit, Network, Plus, RefreshCw, Rocket, Settings, Sparkles, Target, Users, X } from 'lucide-react'

const tools = [
  ['Target AI', 'Audience builder: analyze data patterns to define ideal client personas.', Target, 'target-tool'],
  ['Optimizer', 'Optimize campaigns, refine segments, and predict audience growth.', Rocket, 'optimizer-tool'],
  ['Reporter', 'Generate in-depth, customizable reports for performance analysis.', BarChart3, 'reporter-tool'],
  ['Integrations', 'Securely connect external data sources and other platform APIs.', Network, 'integrations-tool'],
  ['Predictive', 'Predictive modeling: forecast performance based on AI algorithms.', BrainCircuit, 'predictive-tool'],
  ['Audience Sync', 'Sync audience data across external platforms and CRM systems.', RefreshCw, 'sync-tool'],
] as const

export function AiToolsDashboard({ onClose, initialPrompt = '' }: { onClose: () => void; initialPrompt?: string }) {
  const [toast, setToast] = useState('')
  const [activeTool, setActiveTool] = useState('Target AI')
  const [prompt, setPrompt] = useState('')
  const [response, setResponse] = useState('')
  const [busy, setBusy] = useState(false)

  useEffect(() => {
    if (initialPrompt) {
      setActiveTool('Target AI')
      setPrompt(initialPrompt)
    }
  }, [initialPrompt])

  const toolPrompts: Record<string, string> = {
    'Target AI': 'Analyze my campaign audience and recommend three high-intent segments, their motivations, channels, and ethical validation steps.',
    Optimizer: 'Review my campaign strategy and recommend the highest-impact conversion improvements with clear experiments and success metrics.',
    Reporter: 'Create an executive campaign report outline covering performance, risks, opportunities, and next actions.',
    Integrations: 'Design a safe integration plan for campaign analytics, CRM, and audience data with permissions and failure handling.',
    Predictive: 'Build a practical forecasting approach for campaign growth using the data I should collect and explain the assumptions.',
    'Audience Sync': 'Create a privacy-conscious audience synchronization checklist for CRM and advertising destinations.',
    'Custom Assistant': 'Act as my campaign co-founder. Ask for any missing context, then give a prioritized plan with owners, effort, and measurable success criteria.'
  }

  function useTool(name: string) {
    setActiveTool(name)
    setPrompt(toolPrompts[name] ?? '')
    setResponse('')
    setToast(`${name} ready — prompt prepared`)
    window.setTimeout(() => setToast(''), 2200)
  }

  async function copyResponse() {
    if (!response) return
    await navigator.clipboard.writeText(response)
    setToast('Response copied')
    window.setTimeout(() => setToast(''), 1800)
  }

  function downloadResponse() {
    if (!response) return
    const blob = new Blob([response], { type: 'text/plain;charset=utf-8' })
    const url = URL.createObjectURL(blob)
    const link = document.createElement('a')
    link.href = url
    link.download = `${activeTool.toLowerCase().replaceAll(' ', '-')}-response.txt`
    link.click()
    URL.revokeObjectURL(url)
    setToast('Response downloaded')
    window.setTimeout(() => setToast(''), 1800)
  }

  async function runTool(event: React.FormEvent) {
    event.preventDefault()
    if (!prompt.trim() || busy) return
    setBusy(true)
    setResponse('')
    try {
      const controller = new AbortController()
      const timeout = window.setTimeout(() => controller.abort(), 25_000)
      const result = await fetch('/api/ai', { method: 'POST', signal: controller.signal, headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ tool: activeTool, prompt }) })
      window.clearTimeout(timeout)
      const data = await result.json()
      if (!result.ok) throw new Error(data.error)
      setResponse(data.text)
    } catch (error) {
      setResponse(error instanceof DOMException && error.name === 'AbortError' ? 'The AI request took too long. Try a shorter prompt or run the tool again.' : error instanceof Error ? error.message : 'Unable to run this tool right now.')
    } finally {
      setBusy(false)
    }
  }

  return <main className="ai-tools-page">
    <aside className="ai-sidebar"><div className="brand-mark"><img src="/af-logo.png" alt="AF logo" /></div><button className="ai-rail-button active" aria-label="AI tools"><Sparkles size={19} /></button><button className={`ai-rail-button ${activeTool === 'Target AI' ? 'active' : ''}`} aria-label="Audience" onClick={() => useTool('Target AI')}><Users size={19} /></button><button className={`ai-rail-button ${activeTool === 'Integrations' ? 'active' : ''}`} aria-label="Settings" onClick={() => useTool('Integrations')}><Settings size={19} /></button><button className="ai-rail-button" aria-label="Close AI tools" onClick={onClose}><X size={19} /></button></aside>
    <section className="ai-main"><header className="ai-topbar"><span>AI Tools</span><div className="ai-top-actions"><Sparkles size={17} /><span className="ai-bell">♧</span><button className="avatar avatar-user">MP</button></div></header><div className="ai-content"><div className="ai-title-row"><h1>Your AI Toolkit</h1><div className="ai-orbit"><span>AF</span></div><button className="add-tool-button" onClick={() => useTool('Custom Assistant')}><Plus size={20} /> Add Tool</button></div><div className="ai-tools-grid">{tools.map(([name, description, Icon, className]) => <article className={`ai-tool-card ${className} ${activeTool === name ? 'selected-tool' : ''}`} key={name}><div className="ai-tool-icon"><Icon size={48} strokeWidth={1.5} /></div><div className="ai-tool-copy"><h2>{name}</h2><p>{description}</p></div><button className="use-tool-button" onClick={() => useTool(name)}>{name === 'Target AI' ? 'Analyze Audience' : 'Use Tool'}</button></article>)}</div><form className="ai-workbench" onSubmit={runTool}><div><span className="account-kicker">{activeTool}</span><h2>AI Workbench</h2></div><textarea value={prompt} onChange={(event) => setPrompt(event.target.value)} maxLength={4000} placeholder="Describe your campaign question, audience, or growth challenge..." aria-label="AI workbench prompt" /><div className="workbench-footer"><span>{prompt.length}/4000</span><button type="submit" disabled={busy || !prompt.trim()}>{busy ? 'Working…' : 'Run tool'}</button></div>{response && <div className="ai-response-wrap"><div className="ai-response-actions"><span>Generated by {activeTool}</span><div><button type="button" onClick={copyResponse}>Copy</button><button type="button" onClick={downloadResponse}>Download</button></div></div><div className="ai-response" aria-live="polite">{response}</div></div>}</form></div></section>{toast && <div className="toast"><Sparkles size={15} /> {toast}</div>}</main>
}
