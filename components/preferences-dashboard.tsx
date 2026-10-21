'use client'

import { useState } from 'react'
import { Bell, ChevronDown, CircleHelp, Globe2, Moon, Settings, Sparkles, Sun, Users, X } from 'lucide-react'

const suggestions = [
  ['Data-Driven Audience Matching', 'Data-driven audience matching for various audiences and organizations.'],
  ['Cross-Platform Affinity Analysis', 'Analyze audience affinity across sites and cross-platform campaigns.'],
  ['Interest-Based Segment Discovery', 'Identify interest-based segments for smarter personalization.'],
  ['Geographic Trend Insights', 'Discover geographic insights to guide targeted decisions.'],
  ['Behavioral Pattern Alerts', 'Get alerts for meaningful behavior changes and opportunities.'],
]

export function PreferencesDashboard({ onClose }: { onClose: () => void }) {
  const [theme, setTheme] = useState('Dark')
  const [frequency, setFrequency] = useState('Daily')
  const [enabled, setEnabled] = useState([false, false, true, true, true])
  const [goal, setGoal] = useState('Maximize Conversion Rate')
  const [toast, setToast] = useState('')

  function notify(message: string) {
    setToast(message)
    window.setTimeout(() => setToast(''), 1800)
  }

  return <main className="preferences-page">
    <aside className="preferences-sidebar"><button className="preferences-brand" onClick={onClose} aria-label="Return to dashboard">AF</button><nav><button className="preferences-rail active" aria-label="Preferences"><Sparkles size={18} /></button><button className="preferences-rail" aria-label="Account"><Users size={18} /></button><button className="preferences-rail" aria-label="Settings"><Settings size={18} /></button><button className="preferences-rail" aria-label="Help"><CircleHelp size={18} /></button></nav></aside>
    <section className="preferences-main"><header className="preferences-topbar"><div className="preferences-heading"><h1>User Preferences</h1><p>Focus on your personalization (User Experience)</p></div><div className="preferences-actions"><button aria-label="Help"><CircleHelp size={18} /></button><Bell size={18} /><div className="preferences-avatar">MP</div><button className="personalization-pill">Personalization</button></div></header>
      <div className="preferences-content"><div className="preferences-toolbar"><span>Appearance and personalization</span><button onClick={() => notify('Preferences saved')}>Save Preferences</button></div><div className="preferences-grid"><section className="preferences-left"><div className="theme-card"><h2>Choose your theme</h2><div className="theme-options">{[['Dark', Moon], ['Light', Sun], ['System', Globe2]].map(([name, Icon]) => <button key={name as string} className={`theme-option ${theme === name ? 'selected' : ''}`} onClick={() => { setTheme(name as string); notify(`${name} theme selected`) }}><Icon size={43} /><span>{name as string}</span><i /></button>)}</div></div><div className="suggestions-card"><h2>Audience Suggestions</h2>{suggestions.map(([name, description], index) => <label className="suggestion-row" key={name}><input type="checkbox" checked={enabled[index]} onChange={() => setEnabled((items) => items.map((item, i) => i === index ? !item : item))} /><span className="custom-check">✓</span><span><strong>{name}</strong><small>{description}</small></span></label>)}</div></section><section className="insights-card"><div className="preferences-card-heading"><div><h2>Personalized Insights &amp; Optimization</h2><p>Configure the cadence and goals for your AI recommendations.</p></div><ChevronDown size={20} /></div><h3>Email Digest digest frequency</h3><div className="frequency-tabs">{['Daily', 'Weekly', 'Monthly'].map((item) => <button key={item} className={frequency === item ? 'selected' : ''} onClick={() => setFrequency(item)}>{item}</button>)}</div><div className="time-row"><button>12:00 AM <ChevronDown size={14} /></button><span>Precise time of day</span><button>12:00 PM <ChevronDown size={14} /></button></div><h3>Set your specific goals for AI optimization:</h3><div className="goal-list">{['Maximize Conversion Rate', 'Reduce Cost Per Acquisition', 'Reduce Cost Per Conversion Rate'].map((item, index) => <button key={item} className={goal === item ? 'selected' : ''} onClick={() => setGoal(item)}><span>{item}</span>{index === 0 && <small>Increase growth goals</small>}</button>)}</div><div className="summary-box"><h3>Interactive summary of current personalization:</h3><p>• {goal}<br />• {theme}: Language<br />• Favorited Preferences<br />• {enabled.filter(Boolean).length} Audience Suggestions Active<br />• Email {frequency} Digest frequency</p><div className="summary-orb">A-F</div></div></section></div></div></section>{toast && <div className="toast"><Sparkles size={15} />{toast}</div>}
  </main>
}
