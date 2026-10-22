'use client'

import { useState } from 'react'
import {
  Activity,
  ArrowUpRight,
  BarChart3,
  Bell,
  BrainCircuit,
  CalendarClock,
  ChevronRight,
  CircleHelp,
  Compass,
  Gauge,
  Globe2,
  Layers3,
  Menu,
  MessageSquareText,
  Rocket,
  Search,
  Settings2,
  Sparkles,
  Target,
  Users,
  X,
} from 'lucide-react'

const modules = [
  { id: 'site', label: 'Site Intelligence', icon: Globe2, description: 'Understand how your site performs before launch.', tone: 'lime' },
  { id: 'crowd', label: 'Crowd Intelligence', icon: Users, description: 'Find the communities already talking about your idea.', tone: 'violet' },
  { id: 'campaign', label: 'Campaign Intelligence', icon: Target, description: 'Turn campaign signals into sharper decisions.', tone: 'orange' },
  { id: 'launch', label: 'Launch Intelligence', icon: Rocket, description: 'Build momentum around the moments that matter.', tone: 'blue' },
]

const signals = [
  ['CrUX API', 'Real-user experience', 'Good', 'lime'],
  ['Lighthouse API', 'Technical audit', '92 / 100', 'lime'],
  ['PageSpeed Insights', 'Core Web Vitals', 'Fast', 'lime'],
]

export function Dashboard() {
  const [activeModule, setActiveModule] = useState('site')
  const [showNotifications, setShowNotifications] = useState(false)
  const active = modules.find((module) => module.id === activeModule) ?? modules[0]
  const ActiveIcon = active.icon

  return (
    <main className="insight-app">
      <aside className="insight-sidebar">
        <button className="insight-logo" aria-label="Ampli home"><span>A</span></button>
        <div className="sidebar-section-label">Workspace</div>
        <nav className="insight-nav" aria-label="Primary navigation">
          <button className="insight-nav-item active" aria-current="page"><Layers3 /> Overview</button>
          {modules.map(({ id, label, icon: Icon }) => (
            <button key={id} className={`insight-nav-item ${activeModule === id ? 'selected' : ''}`} onClick={() => setActiveModule(id)}>
              <Icon /> <span>{label.replace(' Intelligence', '')}</span>
            </button>
          ))}
        </nav>
        <div className="sidebar-bottom">
          <button className="insight-nav-item"><Settings2 /> Settings</button>
          <div className="workspace-card"><div className="workspace-avatar">MP</div><div><strong>My workspace</strong><span>Pro plan</span></div><ChevronRight /></div>
        </div>
      </aside>

      <section className="insight-main">
        <header className="insight-topbar">
          <div className="mobile-brand"><span>A</span> Ampli</div>
          <div className="breadcrumbs"><span>Workspace</span><ChevronRight /><strong>Overview</strong></div>
          <div className="topbar-actions">
            <button className="topbar-icon" aria-label="Help"><CircleHelp /></button>
            <button className="topbar-icon notification-button" aria-label="Notifications" onClick={() => setShowNotifications(!showNotifications)}><Bell />{!showNotifications && <i />}</button>
            <div className="topbar-avatar">MP</div>
          </div>
          {showNotifications && <div className="notification-popover"><div><strong>Notifications</strong><button onClick={() => setShowNotifications(false)} aria-label="Close"><X /></button></div><p>Your site intelligence report is ready to review.</p><p>New signals found in 4 communities.</p></div>}
        </header>

        <div className="insight-content">
          <div className="hero-row"><div><div className="eyebrow"><span className="pulse-dot" /> Intelligence workspace</div><h1>Good morning, Michael.</h1><p>Make your next launch your most informed one yet.</p></div><button className="primary-cta"><Sparkles /> Run new analysis <ArrowUpRight /></button></div>

          <section className="module-strip" aria-label="Intelligence modules">
            {modules.map(({ id, label, icon: Icon, description, tone }) => <button key={id} onClick={() => setActiveModule(id)} className={`module-tab ${activeModule === id ? `active ${tone}` : ''}`}><Icon /><span><strong>{label}</strong><small>{description}</small></span><ChevronRight /></button>)}
          </section>

          <div className="section-heading"><div><div className="eyebrow">Active module</div><h2><ActiveIcon /> {active.label}</h2></div><button className="ghost-button"><CalendarClock /> Last 30 days <ChevronRight /></button></div>

          {activeModule === 'site' ? <SiteIntelligence /> : <ModulePreview active={active} />}
        </div>
      </section>
    </main>
  )
}

function SiteIntelligence() {
  return <>
    <section className="metric-grid"><article className="metric-card featured"><div className="metric-card-top"><span>Site health score</span><Gauge /></div><strong>87<span>/100</span></strong><div className="metric-progress"><i /></div><small><span className="positive">+8.4%</span> since last scan</small></article><article className="metric-card"><div className="metric-card-top"><span>Visitors analyzed</span><Activity /></div><strong>24.8k</strong><small><span className="positive">+12.6%</span> vs. previous period</small><div className="sparkline lime-line" /></article><article className="metric-card"><div className="metric-card-top"><span>Avg. load time</span><BarChart3 /></div><strong>1.8s</strong><small><span className="positive">−0.4s</span> faster than last scan</small><div className="sparkline blue-line" /></article><article className="metric-card"><div className="metric-card-top"><span>Conversion potential</span><Target /></div><strong>4.2%</strong><small><span className="positive">+1.1%</span> opportunity detected</small><div className="sparkline violet-line" /></article></section>
    <div className="dashboard-columns"><section className="panel signals-panel"><div className="panel-heading"><div><span className="eyebrow">Live signals</span><h3>Site intelligence sources</h3></div><button className="icon-action" aria-label="Search"><Search /></button></div><div className="signal-list">{signals.map(([name, detail, value, tone]) => <div className="signal-row" key={name}><div className={`signal-icon ${tone}`}><Activity /></div><div><strong>{name}</strong><span>{detail}</span></div><b>{value}</b><ArrowUpRight /></div>)}</div><button className="panel-link">View full site report <ArrowUpRight /></button></section><section className="panel opportunity-panel"><div className="panel-heading"><div><span className="eyebrow">AI recommendation</span><h3>One thing to fix next</h3></div><BrainCircuit className="brain-icon" /></div><div className="recommendation"><div className="recommendation-number">01</div><div><strong>Make your value proposition visible sooner</strong><p>Visitors on mobile are reaching the first CTA 2.4s later than desktop visitors. Move your proof point above the fold to capture more high-intent traffic.</p><button className="text-link">Explore recommendation <ArrowUpRight /></button></div></div></section></div>
  </>
}

function ModulePreview({ active }: { active: (typeof modules)[number] }) {
  const Icon = active.icon
  return <section className={`module-empty ${active.tone}`}><div className="empty-icon"><Icon /></div><span className="eyebrow">{active.label}</span><h3>Your intelligence layer is ready.</h3><p>Connect a campaign to unlock {active.label.toLowerCase()} signals, recommendations, and benchmarks in one place.</p><button className="primary-cta"><Sparkles /> Connect a campaign <ArrowUpRight /></button></section>
}
