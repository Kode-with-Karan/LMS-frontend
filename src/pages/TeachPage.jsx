import React from 'react'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import InstructorForm from '../components/InstructorForm'
import StatCounter from '../components/StatCounter'
import '../styles/teach.css'

const features = [
  { title: 'Global Audience', detail: 'Share knowledge with learners in 120+ countries', icon: '🌐' },
  { title: 'High Revenue Share', detail: 'Earn more with transparent revenue splits', icon: '💰' },
  { title: 'Flexible Teaching', detail: 'Set your own hours and launch courses at your pace', icon: '⏱️' },
  { title: 'Marketing Support', detail: 'We promote your courses across our channels', icon: '📣' },
  { title: 'Analytics Dashboard', detail: 'Track engagement, completion, and learner feedback', icon: '📊' },
  { title: 'Secure Payments', detail: 'Payouts in multiple currencies on a fixed schedule', icon: '🔒' },
]

const steps = [
  { title: 'Create Course', detail: 'Outline a practical series of lessons with live labs and templates.' },
  { title: 'Publish & Promote', detail: 'We review, style, and amplify your course to drive enrollment.' },
  { title: 'Earn Revenue', detail: 'Track payouts, enrollments, and learner impact in one portal.' },
]

export default function TeachPage(){
  const scrollToForm = () => {
    const target = document.querySelector('.instructor-application')
    if(target){
      target.scrollIntoView({ behavior: 'smooth' })
    }
  }
  return (
    <div className="teach-page">
      <Navbar />
      <main>
        <section className="teach-hero">
          <div className="teach-hero__highlight" aria-hidden="true" />
          <div className="teach-hero__content">
            <p className="section-title">Share Your Knowledge. Earn Without Limits.</p>
            <h1>Start Teaching Today</h1>
            <p>Reach a global audience with co-designed learning paths, supportive production, and predictable payouts.</p>
            <button className="teach-hero__cta" type="button" onClick={scrollToForm}>Start Teaching Today</button>
          </div>
        </section>

        <section className="teach-features">
          <p className="section-title">Why Teach on SkillSphere?</p>
          <div className="feature-grid">
            {features.map((feature) => (
              <article key={feature.title} className="feature-card">
                <div className="feature-icon" aria-hidden="true">{feature.icon}</div>
                <h3>{feature.title}</h3>
                <span>{feature.detail}</span>
              </article>
            ))}
          </div>
        </section>

        <section className="earnings-showcase">
          <article className="earnings-card">
            <h3>Average monthly income</h3>
            <StatCounter value={5400} label="Monthly earnings" prefix="$" precision={0} />
            <div className="earnings-graph">
              {[60, 90, 70].map((height) => (
                <div key={height} className="graph-bar" style={{ height: `${height}%` }}>
                  <span>{height}%</span>
                </div>
              ))}
            </div>
          </article>
          <article className="earnings-card">
            <h3>Top instructor earnings</h3>
            <StatCounter value={12000} label="Top payouts" prefix="$" precision={0} />
            <div className="earnings-graph">
              {[80, 100, 55].map((height) => (
                <div key={height} className="graph-bar" style={{ height: `${height}%` }}>
                  <span>{height}%</span>
                </div>
              ))}
            </div>
          </article>
        </section>

        <section className="teach-how">
          <p className="section-title">How it Works</p>
          <div className="how-steps">
            {steps.map((step, index) => (
              <article key={step.title} className="step-card">
                <h4>{`${index + 1}. ${step.title}`}</h4>
                <p>{step.detail}</p>
              </article>
            ))}
          </div>
        </section>

        <section className="instructor-application">
          <aside className="application-cta">
            <h3>Ready to inspire?</h3>
            <p>Send your expertise, passion, and resume. We will accelerate you through production and launch in weeks.</p>
          </aside>
          <InstructorForm />
        </section>
      </main>
      <Footer />
    </div>
  )
}
