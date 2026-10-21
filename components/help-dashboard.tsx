'use client'

import type { ReactNode } from 'react'
import { useState } from 'react'
import { BookOpen, ChevronDown, CircleHelp, FileText, LifeBuoy, PlayCircle, Search, Send, UsersRound, X } from 'lucide-react'

type HelpDashboardProps = { onClose: () => void }

const faqs = [
  ['Common Query 1', 'How do I change my billing information?', 'Open Account from the profile menu, then select Manage Profile to update billing details.'],
  ['Common Query 2', 'What happens if a launch is delayed?', 'Your launch remains saved and can be rescheduled from Upcoming Launches without losing its audience analysis.'],
  ['Common Query 3', 'How can I export audience data?', 'Open Reports, choose an audience segment, and use Export to download a CSV file.'],
  ['Common Query 4', 'Are there API limits?', 'API limits depend on your plan. Developer Tools shows your current keys, documentation, and endpoint guidance.'],
]

export function HelpDashboard({ onClose }: HelpDashboardProps) {
  const [query, setQuery] = useState('')
  const [openFaq, setOpenFaq] = useState<number | null>(null)
  const [toast, setToast] = useState('')

  function action(label: string) {
    setToast(`${label} opened`)
    window.setTimeout(() => setToast(''), 2200)
  }

  const visibleFaqs = faqs.filter((faq) => `${faq[0]} ${faq[1]} ${faq[2]}`.toLowerCase().includes(query.toLowerCase()))

  return (
    <main className="help-page">
      <aside className="help-sidebar" aria-label="Help navigation">
        <button className="help-brand" onClick={onClose} aria-label="Return to dashboard"><img src="/af-logo.png" alt="AF logo" /></button>
        <nav>
          <button className="help-rail-button active" aria-label="Help center"><LifeBuoy size={20} /></button>
          <button className="help-rail-button" aria-label="Dashboard" onClick={onClose}><LayoutGridIcon /></button>
          <button className="help-rail-button" aria-label="Documentation" onClick={() => action('Documentation')}><BookOpen size={19} /></button>
          <button className="help-rail-button" aria-label="Settings" onClick={() => action('Settings')}><CircleHelp size={19} /></button>
        </nav>
      </aside>
      <section className="help-main">
        <header className="help-topbar">
          <h1>Help Center &amp; Support</h1>
          <div className="help-top-actions"><button aria-label="Help"><CircleHelp size={19} /></button><div className="avatar help-avatar">MP</div><button className="submit-ticket-top" onClick={() => action('Submit a Ticket')}>Submit a Ticket</button></div>
        </header>
        <div className="help-content">
          <div className="help-search"><Search size={22} /><input aria-label="Search assistance or documentation" placeholder="Search for assistance or documentation..." value={query} onChange={(event) => setQuery(event.target.value)} /></div>
          <div className="help-cards">
            <HelpCard icon={<FileText size={65} />} title="Search Documentation" copy="Access extensive guides and how-tos." onClick={() => action('Search Documentation')} />
            <HelpCard icon={<PlayCircle size={65} />} title="Video Tutorials" copy="Learn visually with our step-by-step videos." onClick={() => action('Video Tutorials')} />
            <HelpCard icon={<Send size={65} />} title="Submit a Ticket" copy="Direct help for specific issues." onClick={() => action('Submit a Ticket')} />
            <HelpCard icon={<UsersRound size={65} />} title="Community Forum" copy="Discuss and share with other users." onClick={() => action('Community Forum')} />
          </div>
          <section className="faq-section"><h2>FAQs</h2><div className="faq-list">{visibleFaqs.map(([label, question, answer], index) => <div className="faq-item" key={label}><button className="faq-question" onClick={() => setOpenFaq(openFaq === index ? null : index)} aria-expanded={openFaq === index}><span><strong>{label}:</strong> {question}</span><ChevronDown size={19} /></button>{openFaq === index && <p>{answer}</p>}</div>)}</div></section>
        </div>
      </section>
      {toast && <div className="toast"><SparkleIcon />{toast}</div>}
    </main>
  )
}

function HelpCard({ icon, title, copy, onClick }: { icon: ReactNode; title: string; copy: string; onClick: () => void }) {
  return <button className="help-card" onClick={onClick}><span className="help-card-icon">{icon}</span><span><strong>{title}</strong><small>{copy}</small></span></button>
}

function LayoutGridIcon() { return <span className="layout-grid-icon" aria-hidden="true"><i /><i /><i /><i /></span> }
function SparkleIcon() { return <span className="sparkle-icon" aria-hidden="true">✦</span> }
