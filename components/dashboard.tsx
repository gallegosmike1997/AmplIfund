'use client'

import { useMemo, useState } from 'react'
import { DeveloperDashboard } from './developer-dashboard'
import { AiToolsDashboard } from './ai-tools-dashboard'
import {
  Bell,
  CalendarDays,
  ChevronDown,
  Code2,
  ChevronLeft,
  ChevronRight,
  CircleHelp,
  Grid2X2,
  LayoutDashboard,
  Menu,
  MoreVertical,
  Pencil,
  Rocket,
  Search,
  Settings,
  Sparkles,
  TrendingUp,
  Users,
  X,
} from 'lucide-react'

const activitySeed = [
  ['Jules Carter', 'New Audience Analysis', '2 hours ago', 'JC'],
  ['Omar Delgado', 'Start New Audience Analysis', '2 hours ago', 'OD'],
  ['Rolfie and Audiene', 'Profitability Analysis', '3 hours ago', 'RA'],
  ['Sofia Patel', 'Scheduled a launch campaign', '4 hours ago', 'SP'],
]

const notifications = [
  ['New conversion’s from Launch Week', '2m', 'LC'],
  ['New audience report is ready', '8m', 'AR'],
  ['New conversion’s from Launch Week', '6m', 'JM'],
  ['Coworks a cono fento launch', '5m', 'CO'],
  ['New conversion’s in the North Star', '5m', 'NS'],
  ['Analytics audience center for clients', '1m', 'AC'],
]

export function Dashboard() {
  const [title, setTitle] = useState('Your Launch Hub')
  const [editingTitle, setEditingTitle] = useState(false)
  const [activeNav, setActiveNav] = useState('dashboard')
  const [month, setMonth] = useState(2)
  const [showNotifications, setShowNotifications] = useState(true)
  const [showAccount, setShowAccount] = useState(false)
  const [activity, setActivity] = useState(activitySeed)
  const [toast, setToast] = useState('')

  const months = ['January', 'February', 'March', 'April']
  const calendarDays = useMemo(() => Array.from({ length: 35 }, (_, i) => i - 2), [])

  function action(label: string) {
    setToast(`${label} opened`)
    window.setTimeout(() => setToast(''), 2200)
    if (label === 'New Audience Analysis') {
      setActivity((items) => [['You', label, 'Just now', 'YO'], ...items])
    }
  }

  if (activeNav === 'developer') return <DeveloperDashboard onClose={() => setActiveNav('dashboard')} />
  if (activeNav === 'ai-tools') return <AiToolsDashboard onClose={() => setActiveNav('dashboard')} />

  return (
    <main className="dashboard-shell">
      <aside className="sidebar" aria-label="Primary navigation">
        <div className="brand-mark">AF</div>
        <nav>
          {[
            ['dashboard', LayoutDashboard, 'Dashboard'],
            ['analytics', TrendingUp, 'Analytics'],
            ['developer', Code2, 'Developer Tools'],
            ['ai-tools', Sparkles, 'AI Tools'],
            ['calendar', CalendarDays, 'Calendar'],
            ['settings', Settings, 'Settings'],
          ].map(([key, Icon, label]) => (
            <button
              key={key as string}
              className={`nav-button ${activeNav === key ? 'active' : ''}`}
              onClick={() => setActiveNav(key as string)}
              aria-label={label as string}
              title={label as string}
            >
              <Icon size={19} strokeWidth={1.7} />
            </button>
          ))}
        </nav>
        <button className="nav-button menu-button" aria-label="Menu"><Menu size={19} /></button>
      </aside>

      <section className="main-content">
        <header className="topbar">
          <div className="eyebrow">{activeNav[0].toUpperCase() + activeNav.slice(1)}</div>
          <div className="top-actions">
            <button className="icon-button" aria-label="Help"><CircleHelp size={17} /></button>
            <button className="icon-button notification-trigger" onClick={() => setShowNotifications(!showNotifications)} aria-label="Toggle notifications"><Bell size={17} /><span /></button>
            <button className="avatar avatar-user account-trigger" onClick={() => setShowAccount(true)} aria-label="Open account page">MP</button>
          </div>
        </header>

        <div className="page-heading">
          {editingTitle ? (
            <input autoFocus value={title} onChange={(e) => setTitle(e.target.value)} onBlur={() => setEditingTitle(false)} onKeyDown={(e) => e.key === 'Enter' && setEditingTitle(false)} />
          ) : (
            <h1>{title}</h1>
          )}
          <button className="edit-title" onClick={() => setEditingTitle(true)} aria-label="Edit dashboard title"><Pencil size={14} /></button>
          <span className="dashboard-pill"><Grid2X2 size={13} /> Dashboard</span>
        </div>

        <div className="dashboard-grid">
          <section className="chart-card performance-card">
            <CardHeader title="Performance Charts" />
            <div className="chart-legend"><span className="legend-purple">⌁</span> Aquihit <ChevronDown size={12} /></div>
            <svg className="line-chart" viewBox="0 0 650 170" role="img" aria-label="Performance trend chart">
              <defs><linearGradient id="areaPurple" x1="0" x2="0" y1="0" y2="1"><stop stopColor="#c04fff" stopOpacity=".42" /><stop offset="1" stopColor="#c04fff" stopOpacity="0" /></linearGradient></defs>
              {[30, 70, 110, 150].map((y) => <line key={y} x1="0" x2="650" y1={y} y2={y} stroke="rgba(255,255,255,.1)" />)}
              <path d="M0 142 L110 76 L215 108 L320 37 L430 83 L540 64 L650 10 L650 170 L0 170Z" fill="url(#areaPurple)" />
              <path d="M0 142 L110 76 L215 108 L320 37 L430 83 L540 64 L650 10" fill="none" stroke="#49d8ff" strokeWidth="3" />
              <path d="M0 159 L110 119 L215 134 L320 72 L430 116 L540 77 L650 25" fill="none" stroke="#ffcb58" strokeWidth="2.5" />
              <line x1="320" x2="320" y1="12" y2="168" stroke="rgba(255,255,255,.22)" strokeDasharray="4 4" />
            </svg>
            <div className="axis-labels"><span>Jan</span><span>Feb</span><span>Mar</span><span>Apr</span><span>May</span><span>June</span></div>
            <div className="metric-line">Audience Reached: <strong>1.2M+</strong></div>
          </section>

          <section className="chart-card conversion-card">
            <CardHeader title="Total Conversion" />
            <div className="bar-chart">
              {[['Jan', [40, 82, 57]], ['Feb', [72, 93, 75]], ['Mars', [58, 108, 92]], ['Apr', [81, 116, 101]], ['May', [85, 109, 116]], ['June', [8, 82, 100]]].map(([label, bars]) => <div className="bar-group" key={label as string}><div className="bars">{(bars as number[]).map((height, i) => <i key={i} className={`bar bar-${i}`} style={{ height: `${height}%` }} />)}</div><span>{label}</span></div>)}
            </div>
            <div className="metric-line">Total Conversions: <strong>4.8K</strong></div>
          </section>

          <section className="chart-card calendar-card">
            <CardHeader title="Upcoming Launches" />
            <div className="calendar-controls"><button onClick={() => setMonth(Math.max(0, month - 1))}><ChevronLeft size={15} /></button><span>{months[month]}</span><button onClick={() => setMonth(Math.min(3, month + 1))}><ChevronRight size={15} /></button></div>
            <div className="weekdays">{['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map((d) => <span key={d}>{d}</span>)}</div>
            <div className="calendar-grid">{calendarDays.map((day, i) => <button key={i} className={`${day === 19 ? 'selected' : ''} ${day < 1 ? 'muted' : ''}`}>{day > 0 ? day : 30 + day}</button>)}</div>
          </section>

          <section className="quick-actions">
            <button className="action-card purple" onClick={() => action('New Audience Analysis')}><Search size={38} /><span>Start New<br />Audience Analysis</span></button>
            <button className="action-card blue" onClick={() => action('Schedule a Launch')}><CalendarDays size={39} /><span>Schedule a<br />Launch</span></button>
            <button className="action-card gold" onClick={() => action('View Reports')}><TrendingUp size={39} /><span>View Reports</span></button>
          </section>

          <section className="chart-card activity-card"><CardHeader title="Latest Activity Feed" actionLabel="Recent All" /><div className="activity-list">{activity.map(([name, detail, time, initials], i) => <div className="activity-row" key={`${name}-${i}`}><div className="avatar small-avatar">{initials}</div><div><strong>{name}: <span>{detail}</span></strong><small>Received {time}</small></div></div>)}</div></section>
        </div>
      </section>

      {showNotifications && <aside className="notifications"><div className="notification-heading"><h2>Notifications</h2><button onClick={() => setShowNotifications(false)} aria-label="Close notifications"><MoreVertical size={17} /></button></div>{notifications.map(([text, time, initials], i) => <div className="notification-row" key={i}><div className={`avatar ${i % 2 ? 'avatar-warm' : 'avatar-cool'}`}>{initials}</div><div><strong>Notification</strong><p>{text}</p></div><time>{time}</time></div>)}<button className="show-more" onClick={() => action('All notifications')}>Show More</button></aside>}
      {showAccount && <div className="account-overlay" role="dialog" aria-modal="true" aria-labelledby="account-title" onMouseDown={(event) => event.target === event.currentTarget && setShowAccount(false)}><section className="account-modal"><header className="account-modal-header"><div><span className="account-kicker">Account Page</span><h2 id="account-title">Account Overview</h2></div><button className="account-close" onClick={() => setShowAccount(false)} aria-label="Close account page"><X size={18} /></button></header><div className="account-overview-grid"><article className="account-card profile-account-card"><div className="account-card-heading"><h3>Profile</h3><span className="account-status">Active</span></div><div className="profile-summary"><div className="avatar profile-avatar">MP</div><div><strong>Profile</strong><span>email@domain.com</span></div></div><dl className="profile-details"><div><dt>Full name</dt><dd>Forin Profile</dd></div><div><dt>Phone</dt><dd>(818) 562-8896</dd></div><div><dt>Address</dt><dd>227 Montenwat Street,<br />Eloripon Road, CX 82500</dd></div></dl><button className="account-secondary-button" onClick={() => action('Manage Profile')}>Manage Profile</button></article><article className="account-card plan-account-card"><div className="account-card-heading"><h3>Current Plan: <em>Pro (Active)</em></h3></div><p>Your profile details and audience tools are ready for the next launch.</p><h4>Pro Plan Features</h4><ul className="plan-features"><li>Audience analysis started</li><li>Optimizes audience excellence</li><li>Reporter sections and insights</li><li>Platform integrations</li><li>Upgrade Subscription</li></ul><button className="account-primary-button" onClick={() => action('Upgrade Subscription')}>Upgrade Subscription</button></article><article className="account-card usage-account-card"><div className="account-card-heading"><h3>Usage</h3></div><div className="donut-row"><div className="donut donut-one" /><div className="donut donut-two" /></div><div className="usage-summary"><h4>Usage Summary</h4><div><span><i className="usage-dot blue-dot" />Usage</span><strong>$199.99</strong></div><small>Audience analysis started</small><div><span><i className="usage-dot purple-dot" />Amount</span><strong>$199.99</strong></div><small>Total Conversions: 4.8K</small></div></article></div><div className="account-lower-grid"><article className="account-card log-account-card"><div className="account-card-heading"><h3>Activity Log</h3><ChevronDown size={16} /></div>{activity.slice(0, 4).map(([name, detail, time, initials], i) => <div className="account-log-row" key={`${name}-${i}`}><span className="log-dot" /><div><strong>{detail}</strong><small>{time} · {name}</small></div><div className="avatar mini-account-avatar">{initials}</div></div>)}</article><article className="account-card log-account-card"><div className="account-card-heading"><h3>Billing History</h3><ChevronDown size={16} /></div>{['Audience analysis started', 'New launch scheduled', 'New launch analysis', 'Audience analysis started'].map((item, i) => <div className="account-log-row" key={`${item}-${i}`}><span className="log-dot" /><div><strong>{item}</strong><small>Time: 2024, 13:{39 - i * 3} PM</small></div><div className="avatar mini-account-avatar">PD</div></div>)}</article><article className="account-card invoice-account-card"><div className="account-card-heading"><h3>Billing History</h3><ChevronDown size={16} /></div><div className="invoice-item"><strong>Invoice #1234</strong><span>Amount: $199.99</span><span>Date: 2024-06-15</span><span>Status: <b>Paid</b></span><button onClick={() => action('View Invoice')}>View Invoice</button></div><div className="invoice-item"><strong>Invoice #1234</strong><span>Amount: $199.99</span><span>Date: 2024-06-15</span><span>Status: <b>Paid</b></span><button onClick={() => action('View Invoice')}>View Invoice</button></div></article></div></section></div>}
      {toast && <div className="toast"><Sparkles size={15} /> {toast}</div>}
    </main>
  )
}

function CardHeader({ title, actionLabel }: { title: string; actionLabel?: string }) {
  return <div className="card-header"><h2>{title}</h2>{actionLabel ? <button className="recent-button">{actionLabel}</button> : null}</div>
}
