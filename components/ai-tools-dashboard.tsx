'use client'

import { useState } from 'react'
import { BarChart3, BrainCircuit, Network, Plus, RefreshCw, Rocket, Settings, Sparkles, Target, Users, X } from 'lucide-react'

const tools = [
  ['Target AI', 'Audience builder: analyze data patterns to define ideal client personas.', Target, 'target-tool'],
  ['Optimizer', 'Optimize campaigns, refine segments, and predict audience growth.', Rocket, 'optimizer-tool'],
  ['Reporter', 'Generate in-depth, customizable reports for performance analysis.', BarChart3, 'reporter-tool'],
  ['Integrations', 'Securely connect external data sources and other platform APIs.', Network, 'integrations-tool'],
  ['Predictive', 'Predictive modeling: forecast performance based on AI algorithms.', BrainCircuit, 'predictive-tool'],
  ['Audience Sync', 'Sync audience data across external platforms and CRM systems.', RefreshCw, 'sync-tool'],
] as const

export function AiToolsDashboard({ onClose }: { onClose: () => void }) {
  const [toast, setToast] = useState('')
  function useTool(name: string) {
    setToast(`${name} opened`)
    window.setTimeout(() => setToast(''), 2200)
  }

  return <main className="ai-tools-page">
    <aside className="ai-sidebar"><div className="brand-mark">AF</div><button className="ai-rail-button active" aria-label="AI tools"><Sparkles size={19} /></button><button className="ai-rail-button" aria-label="Audience"><Users size={19} /></button><button className="ai-rail-button" aria-label="Settings"><Settings size={19} /></button><button className="ai-rail-button" aria-label="Close AI tools" onClick={onClose}><X size={19} /></button></aside>
    <section className="ai-main"><header className="ai-topbar"><span>AI Tools</span><div className="ai-top-actions"><Sparkles size={17} /><span className="ai-bell">♧</span><button className="avatar avatar-user">MP</button></div></header><div className="ai-content"><div className="ai-title-row"><h1>Your AI Toolkit</h1><div className="ai-orbit"><span>AF</span></div><button className="add-tool-button" onClick={() => useTool('Add Tool')}><Plus size={20} /> Add Tool</button></div><div className="ai-tools-grid">{tools.map(([name, description, Icon, className]) => <article className={`ai-tool-card ${className}`} key={name}><div className="ai-tool-icon"><Icon size={48} strokeWidth={1.5} /></div><div className="ai-tool-copy"><h2>{name}</h2><p>{description}</p></div><button className="use-tool-button" onClick={() => useTool(name)}>Use Tool</button></article>)}</div></div></section>{toast && <div className="toast"><Sparkles size={15} /> {toast}</div>}</main>
}
