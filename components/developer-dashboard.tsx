'use client'

import { useState } from 'react'
import { ChevronDown, Code2, Copy, FileCode2, KeyRound, LayoutGrid, Settings, UserRound, X, Plus, Trash2, RefreshCw, Search } from 'lucide-react'

const keys = [
  ['Core API v1', 'Key: FF81', '12x142:11', 'Description adthe core API.'],
  ['Campaigns Access v2', 'Key: FF82', '12x142:11', 'Campaigns, campaigns and description.'],
  ['Core API v3', 'Key: FF83', '12x142:18', 'Description on coone core API.'],
  ['Campaigns Access v2', 'Key: FFP9', '12x142:20', 'Campaigns Access to your mouths.'],
]

export function DeveloperDashboard({ onClose }: { onClose: () => void }) {
  const [active, setActive] = useState('API Keys')
  const [toast, setToast] = useState('')
  const [endpoint, setEndpoint] = useState('')
  const [sourceUrl, setSourceUrl] = useState('')
  const [sources, setSources] = useState<string[]>(['Ampli-Ai-Fund / main'])
  const [sourceBusy, setSourceBusy] = useState(false)
  const [generatedKey, setGeneratedKey] = useState('')

  function notify(message: string) {
    setToast(message)
    window.setTimeout(() => setToast(''), 2200)
  }

  function generateKey() {
    const key = `af_${crypto.randomUUID().replaceAll('-', '').slice(0, 20)}`
    setGeneratedKey(key)
    notify('API key generated for this session')
  }

  async function addSource() {
    if (!sourceUrl.trim()) return notify('Enter a repository URL first')
    setSourceBusy(true)
    await new Promise((resolve) => window.setTimeout(resolve, 500))
    setSources((items) => [...items, sourceUrl.trim()])
    setSourceUrl('')
    setSourceBusy(false)
    notify('Source connected and ready for analysis')
  }

  return (
    <main className="developer-page">
      <aside className="dev-sidebar">
        <div className="brand-mark"><img src="/af-logo.png" alt="AF logo" /></div>
        <button className="dev-rail-button active" aria-label="Developer tools"><LayoutGrid size={18} /></button>
        <button className="dev-rail-button" aria-label="Applications" onClick={() => setActive('Applications')}><LayoutGrid size={18} /></button>
        <button className="dev-rail-button" aria-label="Settings" onClick={() => setActive('Settings')}><Settings size={18} /></button>
        <button className="dev-rail-button" aria-label="Close developer dashboard" onClick={onClose}><X size={18} /></button>
      </aside>
      <section className="dev-main">
        <header className="dev-topbar"><span className="dev-breadcrumb">Developer Dashboard</span><div className="dev-top-actions"><span>▣</span><span>♧</span><button className="dev-profile">MP</button><button className="dev-close-link" onClick={onClose}>Back to Dashboard</button></div></header>
        <div className="dev-content">
          <div className="dev-title-row"><h1>Developer Dashboard</h1><Code2 size={34} className="dev-title-icon" /></div>
          <div className="dev-layout">
            <nav className="dev-menu" aria-label="Developer navigation">
              {[['Profile', UserRound], ['Applications', LayoutGrid], ['API Keys', KeyRound], ['API Docs', FileCode2], ['Settings', Settings]].map(([label, Icon]) => <button key={label as string} className={active === label ? 'selected' : ''} onClick={() => setActive(label as string)}><Icon size={16} />{label as string}</button>)}
            </nav>
            <div className="dev-panels">
              {active === 'API Keys' && <section className="dev-panel keys-panel"><div className="dev-panel-heading"><div><h2>API Key Management</h2><p>For build up beer agreement to enter that scroll for your entry nt the API product.</p></div><button className="gold-button" onClick={generateKey}>Generate New API Key</button>{generatedKey && <code className="generated-key">{generatedKey}</code>}</div><div className="key-table"><div className="key-head"><span>Key Prefix</span><span>Description</span><span /></div>{keys.map(([name, prefix, date, description], i) => <div className="key-row" key={`${name}-${i}`}><div><strong>{name}</strong><code>{prefix}<Copy size={12} /></code></div><div><span>{date}</span><p>{description}</p></div><button className="revoke-button" onClick={() => notify(`${name} revoked`)}>Revoke</button><Copy size={15} /></div>)}</div></section>}
              {active === 'API Docs' && <section className="dev-panel docs-panel"><h2>API Docs</h2><div className="docs-grid"><div><h3>Authentications</h3><p>Detailed documentation for authentications.</p><a>Authentications for exons ↗</a></div><div><h3>Conversions</h3><p>Analytics documentation for conversions and inontons.</p><a>Conversions for znoe ↗</a></div><div><h3>Settings</h3><p>Detailed documentation for settings.</p><a>Settings documentation ↗</a></div><div><h3>Audience</h3><p>Amelient documentation for nisks.</p><a>Audience documentation ↗</a></div><div><h3>Tools</h3><p>Fint analytics documentation.</p><a>Tools documentations ↗</a></div></div><button className="outline-blue-button" onClick={() => notify('Full API reference opened')}>Full API Reference</button></section>}
              {active === 'Applications' && <section className="dev-panel applications-panel"><div className="dev-panel-heading"><div><h2>My Applications</h2><p>For build custom to koour your applications.</p></div><ChevronDown size={19} /></div><div className="app-table"><div className="app-head"><span>Name ↑</span><span>App</span><span>Created Date</span></div>{[['Android App', 'A', 'Jun 12, 2024'], ['Audie App', 'A', 'Jun 25, 2023']].map(([name, initial, date]) => <div className="app-row" key={name}><div><b>{initial}</b><span><strong>{name}</strong><small>Connected Apps connected</small></span></div><span>Connected</span><span>{date} <ChevronDown size={15} /></span></div>)}</div></section>}
              {active === 'Settings' && <section className="dev-panel explorer-panel"><div className="dev-panel-heading"><div><h2>Endpoint Explorer</h2><p>Enter and your mower personalization.</p></div><span className="code-mark">&lt;/&gt;</span></div><div className="endpoint-search"><input value={endpoint} onChange={(e) => setEndpoint(e.target.value)} placeholder="Enter endpoints and parameters..." /><button onClick={() => notify(endpoint ? `Testing ${endpoint}` : 'Enter an endpoint first')}>Try It Out</button></div><div className="code-tabs"><span className="active">Editor</span><span>Paramet</span><span>»</span><span className="active-gold">Stippet</span><span>Sources</span></div><div className="code-window"><pre>{`{
  "name": "etect",
  "description": "eecert",
  "sources": {
    "cates": {
      "type": "test",
      "description": "melguent.research"
    }
  },
  "conversions": {
    "type": "aoess",
    "spent": "seccrnt"
  }
}`}</pre><pre>{`{
  "endpoint": "Core API",
  "session": true,
  "sources": {
    "type": "test"
  },
  "data": {
    "test": 208,
    "revoke": "eliminate"
  }
}`}</pre></div><div className="endpoint-footer"><input placeholder="Enter endpoints parameter..." /><button onClick={() => notify('Endpoint request sent')}>Try It Out</button></div></section>}
              {active === 'Profile' && <section className="dev-panel profile-panel"><div className="dev-panel-heading"><div><h2>Source Management</h2><p>Connect repositories and inspect source readiness before wiring production integrations.</p></div><Search size={20} /></div><div className="source-add"><input value={sourceUrl} onChange={(event) => setSourceUrl(event.target.value)} placeholder="https://github.com/org/repository" aria-label="Repository URL" /><button className="gold-button" onClick={() => void addSource()} disabled={sourceBusy}><Plus size={15} />{sourceBusy ? 'Connecting…' : 'Add Source'}</button></div><div className="source-list">{sources.map((source) => <div className="source-item" key={source}><div><strong>{source}</strong><small>Ready for repository analysis</small></div><button aria-label={`Remove ${source}`} onClick={() => setSources((items) => items.filter((item) => item !== source))}><Trash2 size={15} /></button></div>)}</div><button className="outline-blue-button" onClick={() => notify(sources.length ? `Analyzed ${sources.length} source${sources.length === 1 ? '' : 's'} for routes, tools, and integrations` : 'Add a source to begin repository analysis')}><RefreshCw size={15} /> Analyze Repository</button></section>}
            </div>
          </div>
        </div>
      </section>
      {toast && <div className="toast"><Code2 size={15} />{toast}</div>}
    </main>
  )
}
