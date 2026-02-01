import React from 'react'
import { motion } from 'framer-motion'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import TeamCard from '../components/TeamCard'
import StatCounter from '../components/StatCounter'
import '../styles/about.css'
import { Link } from 'react-router-dom'

const milestones = [
  { title: '2018 — Launch', detail: 'We started as a small cohort of passionate instructors sharing real-world skills.' },
  { title: '2020 — Growth', detail: 'Community reached 25k learners as we built mentorship, micro-credentials, and outcomes-driven content.' },
  { title: '2022 — Impact', detail: 'Introduced SkillSphere Labs for live challenges and partnered with global studios.' },
  { title: 'Now', detail: 'We empower lifelong learners with curated journeys, analytics, and a collaborative learning network.' },
]

const stats = [
  { value: 50000, label: 'Students', suffix: '+' },
  { value: 1200, label: 'Courses', suffix: '+' },
  { value: 300, label: 'Instructors', suffix: '+' },
  { value: 4.8, label: 'Average rating', suffix: '' },
]

const team = [
  { name: 'Zeina Patel', role: 'VP of Learning Design', image: 'https://images.unsplash.com/photo-1552058544-f2b08422138a?auto=format&fit=facearea&w=200&q=80', linkedin: 'https://www.linkedin.com' },
  { name: 'Miles Ortega', role: 'Head of Community', image: 'https://images.unsplash.com/photo-1504593811423-6dd665756598?auto=format&fit=facearea&w=200&q=80', linkedin: 'https://www.linkedin.com' },
  { name: 'Lena Park', role: 'Creative Director', image: 'https://images.unsplash.com/photo-1524504388940-b1c1722653e1?auto=format&fit=facearea&w=200&q=80', linkedin: 'https://www.linkedin.com' },
  { name: 'Theo Martinez', role: 'Chief Technology Officer', image: 'https://images.unsplash.com/photo-1504593811909-9d404c350539?auto=format&fit=facearea&w=200&q=80', linkedin: 'https://www.linkedin.com' },
]

export default function AboutPage(){
  return (
    <div className="about-page">
      <Navbar />
      <main>
        <section className="about-hero">
          <motion.div
            className="about-illustration--orb"
            animate={{ y: [0, -18, 0] }}
            transition={{ duration: 6, repeat: Infinity }}
          />
          <div className="about-illustration" aria-hidden="true" />
          <div className="about-hero__content">
            <p className="section-title">Empowering Skills for the Future</p>
            <h1>Learn. Grow. Succeed.</h1>
            <p>SkillSphere is where bold learners and expert instructors build the next era of practical knowledge.</p>
            <Link to="/courses" className="about-hero__cta">Explore Courses</Link>
          </div>
        </section>

        <section className="about-story">
          <p className="section-title">Our Story</p>
          <div className="story-grid">
            {milestones.map((mile) => (
              <article key={mile.title} className="story-item">
                <h3>{mile.title}</h3>
                <p>{mile.detail}</p>
              </article>
            ))}
          </div>
        </section>

        <section className="mission-vision">
          <article className="mission-card">
            <h3>Mission</h3>
            <p>Deliver practice-first learning with coaching, projects, and community that unlock measurable career momentum.</p>
          </article>
          <article className="mission-card">
            <h3>Vision</h3>
            <p>Be the trusted learning home for builders worldwide, where every learner finds clarity, confidence, and a path forward.</p>
          </article>
        </section>

        <section className="stats-grid">
          {stats.map((stat) => (
            <article key={stat.label} className="stat-card">
              <StatCounter value={stat.value} label={stat.label} suffix={stat.suffix} precision={stat.label === 'Average rating' ? 1 : 0} />
            </article>
          ))}
        </section>

        <section className="team-section">
          <p className="section-title">Meet the Team</p>
          <div className="team-grid">
            {team.map((member) => (
              <TeamCard key={member.name} {...member} />
            ))}
          </div>
        </section>
      </main>
      <Footer />
    </div>
  )
}
