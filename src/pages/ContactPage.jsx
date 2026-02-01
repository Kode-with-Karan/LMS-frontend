import React from 'react'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import ContactForm from '../components/ContactForm'
import '../styles/contact.css'

const infoCards = [
  { label: 'Email', value: 'hello@skillsphere.com', helper: '24/7 support', icon: 'M12 2a10 10 0 1 0 0 20 10 10 0 0 0 0-20Zm0 4.71-3.4 2.5 3.4 2.5 3.4-2.5Z' },
  { label: 'Phone', value: '+1 (415) 555-0110', helper: 'Call us anytime', icon: 'M3 6.5A1.5 1.5 0 0 1 4.5 5h3a1.5 1.5 0 0 1 1.5 1.5V9a1 1 0 0 1-1 1H6.08a9.45 9.45 0 0 0 4.98 4.98V15a1 1 0 0 1 1-1h2.5A1.5 1.5 0 0 1 16.5 12.5v-3A1.5 1.5 0 0 1 18 8v-2A1.5 1.5 0 0 0 16.5 4h-3a.5.5 0 0 1-.5-.5V2.5A.5.5 0 0 1 12.5 2h-1A.5.5 0 0 1 11 2.5v2a.5.5 0 0 1-.5.5h-2a.5.5 0 0 1-.5-.5V1.5A.5.5 0 0 0 7.5 1h-.5A1.5 1.5 0 0 0 5.5 2.5V4H4.5A1.5 1.5 0 0 0 3 5.5Z' },
  { label: 'Office', value: '420 Market St, San Francisco', helper: 'Visit us Monday–Friday', icon: 'M4 4h16v14l-8 4-8-4ZM6 6v8.34l6 3 6-3V6Zm0 0 6 4.5L18 6' },
  { label: 'Hours', value: 'Mon–Fri • 9am–6pm', helper: 'Weekends by appointment', icon: 'M12 2a10 10 0 1 0 10 10A10 10 0 0 0 12 2Zm1 11.41V7h-2v6.59L17.24 17 18 15.66Z' },
]

const scrollToContact = () => {
  const target = document.querySelector('.contact-form-wrapper')
  if(target){
    target.scrollIntoView({ behavior: 'smooth' })
  }
}

export default function ContactPage(){
  return (
    <div className="contact-page">
      <Navbar />
      <main>
        <section className="contact-hero">
          <div className="contact-hero__glow" aria-hidden="true" />
          <h1>Need Help? We’re Here for You.</h1>
          <p>Reach out and our team will respond within 24 hours.</p>
          <button type="button" className="contact-hero__cta" onClick={scrollToContact}>Get in touch</button>
        </section>

        <section className="contact-info">
          {infoCards.map((card) => (
            <article key={card.label} className="contact-info-card">
              <div className="feature-icon">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="#5B21B6" xmlns="http://www.w3.org/2000/svg">
                  <path d={card.icon} />
                </svg>
              </div>
              <h3>{card.label}</h3>
              <p>{card.value}</p>
              <p>{card.helper}</p>
            </article>
          ))}
        </section>

        <section className="contact-layout">
          <ContactForm />
          <div className="contact-map">
            <iframe
              title="SkillSphere map"
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3153.019274235029!2d-122.40135018468251!3d37.78799337975724!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x80858064bf345e0f%3A0xcd5f7b3160e2c2d5!2s101%20Market%20St%2C%20San%20Francisco%2C%20CA%2094105%2C%20USA!5e0!3m2!1sen!2sus!4v1700000000000!5m2!1sen!2sus"
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </div>
        </section>
      </main>
      <Footer />
    </div>
  )
}
