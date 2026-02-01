import React, { useEffect, useState } from 'react'
import AdminLayout from '../components/AdminLayout'
import { fetchSiteSettings, updateSiteSettings } from '../services/adminService'

export default function SiteSettings(){
  const [form, setForm] = useState({
    platformFeePercentage: 20,
    minimumWithdrawal: 50,
    maintenanceMode: false,
    registrationEnabled: true,
    featuredCourses: '',
    emailFrom: '',
    smtpHost: '',
    smtpPort: 587,
    smtpUser: '',
    smtpPassword: '',
  })
  const [message, setMessage] = useState('')

  useEffect(() => {
    fetchSiteSettings().then((res) => {
      const data = res.data
      setForm({
        platformFeePercentage: data.platformFeePercentage || 0,
        minimumWithdrawal: data.minimumWithdrawal || 0,
        maintenanceMode: data.maintenanceMode || false,
        registrationEnabled: data.registrationEnabled ?? true,
        featuredCourses: (data.featuredCourses || []).join(', '),
        emailFrom: data.emailFrom || '',
        smtpHost: data.smtpHost || '',
        smtpPort: data.smtpPort || 587,
        smtpUser: data.smtpUser || '',
        smtpPassword: data.smtpPassword || '',
      })
    })
  }, [])

  const handleChange = (field, value) => setForm((prev) => ({ ...prev, [field]: value }))

  const handleSubmit = async (e) => {
    e.preventDefault()
    const payload = { ...form, featuredCourses: form.featuredCourses.split(',').map((id) => id.trim()).filter(Boolean) }
    await updateSiteSettings(payload)
    setMessage('Settings saved')
  }

  return (
    <AdminLayout title="Site Settings">
      {message && <div className="admin-card">{message}</div>}
      <form className="admin-card" onSubmit={handleSubmit}>
        <div className="filter-row">
          <div>
            <label className="admin-subtext">Platform Fee %</label>
            <input className="input-dark" type="number" value={form.platformFeePercentage} onChange={(e) => handleChange('platformFeePercentage', Number(e.target.value))} />
          </div>
          <div>
            <label className="admin-subtext">Minimum Withdrawal</label>
            <input className="input-dark" type="number" value={form.minimumWithdrawal} onChange={(e) => handleChange('minimumWithdrawal', Number(e.target.value))} />
          </div>
          <div>
            <label className="admin-subtext">Maintenance Mode</label>
            <div className="toggle" onClick={() => handleChange('maintenanceMode', !form.maintenanceMode)} style={{ cursor: 'pointer', display: 'inline-flex', alignItems: 'center', padding: 4, borderRadius: 20, border: '1px solid rgba(255,255,255,0.08)' }}>
              <div style={{ width: 50, height: 24, background: form.maintenanceMode ? '#38bdf8' : '#334155', borderRadius: 20, position: 'relative', transition: 'all 0.2s ease' }}>
                <span style={{ position: 'absolute', top: 2, left: form.maintenanceMode ? 28 : 4, width: 20, height: 20, background: '#0f172a', borderRadius: '50%', transition: 'all 0.2s ease' }} />
              </div>
            </div>
          </div>
          <div>
            <label className="admin-subtext">Registration Enabled</label>
            <div className="toggle" onClick={() => handleChange('registrationEnabled', !form.registrationEnabled)} style={{ cursor: 'pointer', display: 'inline-flex', alignItems: 'center', padding: 4, borderRadius: 20, border: '1px solid rgba(255,255,255,0.08)' }}>
              <div style={{ width: 50, height: 24, background: form.registrationEnabled ? '#10b981' : '#334155', borderRadius: 20, position: 'relative', transition: 'all 0.2s ease' }}>
                <span style={{ position: 'absolute', top: 2, left: form.registrationEnabled ? 28 : 4, width: 20, height: 20, background: '#0f172a', borderRadius: '50%', transition: 'all 0.2s ease' }} />
              </div>
            </div>
          </div>
        </div>

        <div className="filter-row">
          <div>
            <label className="admin-subtext">Featured Courses (IDs, comma separated)</label>
            <input className="input-dark" value={form.featuredCourses} onChange={(e) => handleChange('featuredCourses', e.target.value)} />
          </div>
          <div>
            <label className="admin-subtext">Email From</label>
            <input className="input-dark" value={form.emailFrom} onChange={(e) => handleChange('emailFrom', e.target.value)} />
          </div>
          <div>
            <label className="admin-subtext">SMTP Host</label>
            <input className="input-dark" value={form.smtpHost} onChange={(e) => handleChange('smtpHost', e.target.value)} />
          </div>
        </div>

        <div className="filter-row">
          <div>
            <label className="admin-subtext">SMTP Port</label>
            <input className="input-dark" type="number" value={form.smtpPort} onChange={(e) => handleChange('smtpPort', Number(e.target.value))} />
          </div>
          <div>
            <label className="admin-subtext">SMTP User</label>
            <input className="input-dark" value={form.smtpUser} onChange={(e) => handleChange('smtpUser', e.target.value)} />
          </div>
          <div>
            <label className="admin-subtext">SMTP Password</label>
            <input className="input-dark" type="password" value={form.smtpPassword} onChange={(e) => handleChange('smtpPassword', e.target.value)} />
          </div>
        </div>

        <button className="btn" type="submit">Save Settings</button>
      </form>
    </AdminLayout>
  )
}
