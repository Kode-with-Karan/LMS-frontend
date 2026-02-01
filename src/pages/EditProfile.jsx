import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { getProfile, updateProfile, updateAvatar } from '../services/studentService'
import AvatarUploader from '../components/AvatarUploader'
import StudentLayout from '../components/StudentLayout'
import '../styles/editProfile.css'

export default function EditProfile(){
  const navigate = useNavigate()
  const [form, setForm] = useState({
    name: '',
    email: '',
    bio: '',
    phone: '',
    socialLinks: {
      linkedin: '',
      github: '',
      website: '',
    },
  })
  const [avatarFile, setAvatarFile] = useState(null)
  const [avatarPreview, setAvatarPreview] = useState('')
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [status, setStatus] = useState({ type: '', message: '' })

  const loadProfile = async () => {
    try{
      const res = await getProfile()
      const profile = res.data.profile
      setForm((prev) => ({
        ...prev,
        name: profile.name || '',
        email: profile.email || '',
        bio: profile.bio || '',
        phone: profile.phone || '',
        socialLinks: {
          linkedin: profile.socialLinks?.linkedin || '',
          github: profile.socialLinks?.github || '',
          website: profile.socialLinks?.website || '',
        },
      }))
      if(profile.avatar){
        setAvatarPreview(profile.avatar)
      }
    }catch(err){
      console.error(err)
    }finally{
      setLoading(false)
    }
  }

  useEffect(()=>{ loadProfile() }, [])

  const handleChange = (event) => {
    const { name, value } = event.target
    if(name.startsWith('social-')){
      const key = name.replace('social-', '')
      setForm((prev) => ({
        ...prev,
        socialLinks: {
          ...prev.socialLinks,
          [key]: value,
        },
      }))
      return
    }
    setForm((prev) => ({ ...prev, [name]: value }))
  }

  const handleAvatarSelect = (file) => {
    setAvatarFile(file)
    setAvatarPreview(URL.createObjectURL(file))
  }

  const handleSubmit = async (event) => {
    event.preventDefault()
    setSaving(true)
    try{
      await updateProfile({
        name: form.name,
        bio: form.bio,
        phone: form.phone,
        socialLinks: form.socialLinks,
      })
      if(avatarFile){
        const formData = new FormData()
        formData.append('avatar', avatarFile)
        await updateAvatar(formData)
      }
      setStatus({ type: 'success', message: 'Profile updated!' })
      setTimeout(() => navigate('/profile'), 400)
    }catch(err){
      setStatus({ type: 'error', message: err?.response?.data?.message || 'Could not save profile' })
    }finally{
      setSaving(false)
    }
  }

  if(loading){
    return (
      <StudentLayout>
        <p className="edit-loading">Loading profile…</p>
      </StudentLayout>
    )
  }

  return (
    <StudentLayout>
      <section className="edit-profile-page">
        <header className="edit-profile-hero">
          <h1>Edit profile</h1>
          <p>Update your story, add a fresh avatar, and keep your socials current.</p>
        </header>
        <div className="edit-profile-grid">
          <div className="edit-profile-side">
            <AvatarUploader currentAvatar={avatarPreview} preview={avatarPreview} onSelect={handleAvatarSelect} />
          </div>
          <form className="edit-profile-form" onSubmit={handleSubmit}>
            <label>
              Full name
              <input name="name" value={form.name} onChange={handleChange} required />
            </label>
            <label>
              Email
              <input name="email" value={form.email} disabled />
            </label>
            <label>
              Bio
              <textarea name="bio" value={form.bio} onChange={handleChange} rows={4} />
            </label>
            <label>
              Phone
              <input name="phone" value={form.phone} onChange={handleChange} />
            </label>
            <label>
              LinkedIn
              <input name="social-linkedin" value={form.socialLinks.linkedin} onChange={handleChange} />
            </label>
            <label>
              GitHub
              <input name="social-github" value={form.socialLinks.github} onChange={handleChange} />
            </label>
            <label>
              Website
              <input name="social-website" value={form.socialLinks.website} onChange={handleChange} />
            </label>
            {status.message && (
              <p className={`edit-status ${status.type === 'error' ? 'status-error' : 'status-success'}`}>
                {status.message}
              </p>
            )}
            <div className="edit-profile-actions">
              <button type="button" className="btn-cancel" onClick={() => navigate('/profile')} disabled={saving}>Cancel</button>
              <button type="submit" className="btn-save" disabled={saving}>{saving ? 'Saving…' : 'Save changes'}</button>
            </div>
          </form>
        </div>
      </section>
    </StudentLayout>
  )
}
