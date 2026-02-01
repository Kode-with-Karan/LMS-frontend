import React, { useEffect, useState } from 'react'
import { getCertificates } from '../services/studentService'
import CertificateCard from '../components/CertificateCard'
import StudentLayout from '../components/StudentLayout'
import '../styles/certificates.css'

export default function Certificates(){
  const [certificates, setCertificates] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(()=>{
    let isMounted = true
    const loadCertificates = async () => {
      try{
        const res = await getCertificates()
        if(!isMounted) return
        setCertificates(res.data.certificates || [])
      }catch(err){
        if(!isMounted) return
        setError(err?.response?.data?.message || 'Unable to load certificates')
      }finally{
        if(isMounted) setLoading(false)
      }
    }
    loadCertificates()
    return () => { isMounted = false }
  }, [])

  return (
    <StudentLayout>
      <section className="certificates-page">
        <header className="certificates-header student-hero">
          <div>
            <p className="section-title">Certificates</p>
            <h1>Your earned badges</h1>
            <p className="section-subtitle">Download, preview, and share every credential.</p>
          </div>
        </header>
        {loading && <p className="certificates-empty">Loading certificates…</p>}
        {error && <p className="certificates-status certificates-status--error">{error}</p>}
        <div className="certificates-grid">
          {!loading && certificates.length === 0 && (
            <p className="certificates-empty">No certificates yet. Complete a course to unlock recognition.</p>
          )}
          {certificates.map((certificate) => (
            <CertificateCard key={certificate.id} certificate={certificate} />
          ))}
        </div>
      </section>
    </StudentLayout>
  )
}
