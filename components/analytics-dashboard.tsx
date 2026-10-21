'use client'

import { ArrowLeft, BarChart3, Download, RefreshCw, Sparkles, TrendingUp, Users } from 'lucide-react'
import { useState } from 'react'

const performance = [
  { label: 'Mon', value: 58 },
  { label: 'Tue', value: 72 },
  { label: 'Wed', value: 64 },
  { label: 'Thu', value: 86 },
  { label: 'Fri', value: 78 },
  { label: 'Sat', value: 92 },
  { label: 'Sun', value: 84 },
]

export function AnalyticsDashboard({ onClose }: { onClose: () => void }) {
  const [range, setRange] = useState('7 days')
  const [toast, setToast] = useState('')
  const notify = (message: string) => { setToast(message); window.setTimeout(() => setToast(''), 2200) }
  const exportReport = () => { const report = `Ampli-AI performance report\nRange: ${range}\nConversion rate: 18.4%\nAudience growth: +24.8%`; const blob = new Blob([report], { type: 'text/plain' }); const url = URL.createObjectURL(blob); const link = document.createElement('a'); link.href = url; link.download = 'ampli-ai-report.txt'; link.click(); URL.revokeObjectURL(url); notify('Report downloaded') }

  return <main className="analytics-page"><header className="analytics-header"><button className="analytics-back" onClick={onClose} aria-label="Return to dashboard"><ArrowLeft size={17} /> Dashboard</button><div className="analytics-heading"><span className="eyebrow">Insights center</span><h1>Performance Analytics</h1><p>Track campaign health, audience growth, and optimization opportunities in one place.</p></div><div className="analytics-header-actions"><button className="analytics-secondary" onClick={() => notify('Data refreshed')}><RefreshCw size={15} /> Refresh</button><button className="analytics-primary" onClick={exportReport}><Download size={15} /> Export report</button></div></header><div className="analytics-toolbar"><div className="analytics-tabs" role="tablist">{['7 days', '30 days', '90 days'].map((item) => <button key={item} role="tab" aria-selected={range === item} className={range === item ? 'selected' : ''} onClick={() => setRange(item)}>{item}</button>)}</div><span>Last updated just now</span></div><section className="analytics-stats"><article><span><TrendingUp size={16} /> Conversion rate</span><strong>18.4%</strong><small className="positive">+4.6% vs previous period</small></article><article><span><Users size={16} /> Audience growth</span><strong>24.8%</strong><small className="positive">+8.2% vs previous period</small></article><article><span><BarChart3 size={16} /> Campaign health</span><strong>92/100</strong><small>Healthy and trending up</small></article><article><span><Sparkles size={16} /> AI opportunities</span><strong>12</strong><small>3 high-impact recommendations</small></article></section><section className="analytics-grid"><article className="analytics-card performance-chart"><div className="analytics-card-heading"><div><span className="eyebrow">Engagement overview</span><h2>Audience response</h2></div><span className="chart-legend"><i /> Engagement score</span></div><div className="bar-chart" aria-label={`Audience response for ${range}`}>{performance.map((item) => <div className="bar-column" key={item.label}><strong>{item.value}</strong><div className="bar-track"><i style={{ height: `${item.value}%` }} /></div><span>{item.label}</span></div>)}</div></article><article className="analytics-card recommendations"><div className="analytics-card-heading"><div><span className="eyebrow">Next best actions</span><h2>Optimization queue</h2></div></div>{['Refresh campaign story hook', 'Test a creator-focused segment', 'Schedule a weekend launch reminder'].map((item, index) => <button className="recommendation" key={item} onClick={() => notify(`Queued: ${item}`)}><span>{index + 1}</span><div><strong>{item}</strong><small>{index === 0 ? 'High impact · 12 min' : 'Medium impact · 20 min'}</small></div><ArrowLeft size={15} /></button>)}</article></section>{toast && <div className="toast"><Sparkles size={15} /> {toast}</div>}</main>
}
