'use client'

import { ArrowLeft, CalendarDays, Check, Plus, Rocket } from 'lucide-react'
import { useState } from 'react'

const initialEvents = [
  { title: 'Audience review', date: 'Today · 10:00 AM', type: 'AI task' },
  { title: 'Pre-launch preview', date: 'Tomorrow · 2:30 PM', type: 'Outreach' },
  { title: 'Campaign launch window', date: 'Friday · 9:00 AM', type: 'Launch' },
]

export function CalendarDashboard({ onClose }: { onClose: () => void }) {
  const [events, setEvents] = useState(initialEvents)
  const [toast, setToast] = useState('')
  const addEvent = () => { setEvents((items) => [...items, { title: 'Daily launch plan', date: 'Next available slot', type: 'AI task' }]); setToast('Launch plan added to calendar'); window.setTimeout(() => setToast(''), 2000) }
  return <main className="calendar-page"><header className="calendar-page-header"><button className="back-button" onClick={onClose}><ArrowLeft size={16} /> Dashboard</button><div><span className="eyebrow">Planning workspace</span><h1>Launch Calendar</h1><p>Keep audience, outreach, and launch milestones in one place.</p></div><button className="gold-button" onClick={addEvent}><Plus size={15} /> Add milestone</button></header><section className="calendar-summary"><article><CalendarDays size={19} /><div><span>Upcoming milestones</span><strong>{events.length}</strong></div></article><article><Rocket size={19} /><div><span>Next launch</span><strong>Friday</strong></div></article><article><Check size={19} /><div><span>Ready this week</span><strong>2 of 4</strong></div></article></section><section className="calendar-events"><div className="calendar-events-heading"><div><span className="eyebrow">Your schedule</span><h2>Upcoming milestones</h2></div><button className="calendar-filter">All activity</button></div>{events.map((event, index) => <article className="calendar-event" key={`${event.title}-${index}`}><div className="event-icon"><CalendarDays size={17} /></div><div><strong>{event.title}</strong><small>{event.date}</small></div><span>{event.type}</span></article>)}</section>{toast && <div className="toast">{toast}</div>}</main>
}
