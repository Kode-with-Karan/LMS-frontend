import React, { useState } from 'react'

export default function CertificateCard({ certificate }){
  const [shared, setShared] = useState(false)

  const handleDownload = () => {
    if(certificate.certificateUrl){
      window.open(certificate.certificateUrl, '_blank')
    }
  }

  const handlePreview = handleDownload

  const handleShare = async () => {
    if(!certificate.certificateUrl) return
    try{
      await navigator.clipboard.writeText(certificate.certificateUrl)
      setShared(true)
      setTimeout(() => setShared(false), 2000)
    }catch(err){
      console.error(err)
    }
  }

  return (
    <article className="certificate-card">
      <div className="certificate-card__header">
        <h3>{certificate.courseTitle}</h3>
        <p>Issued {new Date(certificate.issuedAt).toLocaleDateString()}</p>
      </div>
      <p className="certificate-card__instructor">{certificate.instructorName}</p>
      <p className="certificate-card__id">Verification #{certificate.certificateId}</p>
      <div className="certificate-card__actions">
        <button type="button" className="btn-download" onClick={handleDownload} disabled={!certificate.certificateUrl}>
          Download
        </button>
        <button type="button" className="btn-preview" onClick={handlePreview} disabled={!certificate.certificateUrl}>
          Preview
        </button>
        <button type="button" className="btn-share" onClick={handleShare} disabled={!certificate.certificateUrl}>
          {shared ? 'Link copied' : 'Share'}
        </button>
      </div>
    </article>
  )
}
