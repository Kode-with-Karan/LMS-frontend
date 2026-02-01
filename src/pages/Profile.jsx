import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { getProfile } from '../services/studentService'
import ProfileCard from '../components/ProfileCard'
import SocialLinks from '../components/SocialLinks'
import StudentLayout from '../components/StudentLayout'
import '../styles/profile.css'

const formatDate = (value) => {
  if(!value) return '—'
  const date = new Date(value)
  return date.toLocaleDateString(undefined, { year: 'numeric', month: 'long', day: 'numeric' })
}

export default function Profile(){
  const [profile, setProfile] = useState(null)
  const [stats, setStats] = useState({})
  const [loading, setLoading] = useState(true)

  const loadProfile = async () => {
    try{
      const res = await getProfile()
      setProfile(res.data.profile)
      setStats(res.data.stats)
    }catch(err){
      console.error(err)
    }finally{
      setLoading(false)
    }
  }

  useEffect(()=>{ loadProfile() }, [])

  if(loading){
    return (
      <StudentLayout>
        <p className="profile-loading">Loading your profile…</p>
      </StudentLayout>
    )
  }

  return (
    <StudentLayout>
      <section className="profile-page">
        <header className="profile-hero">
          <div className="profile-avatar-wrapper">
            {profile?.avatar ? (
              <img src={profile.avatar} alt={profile.name} className="profile-avatar" />
            ) : (
              <div className="profile-avatar profile-avatar--placeholder">{profile?.name?.[0] || 'S'}</div>
            )}
          </div>
          <div className="profile-hero__info">
            <h1>{profile?.name}</h1>
            <p className="profile-email">{profile?.email}</p>
            <p className="profile-bio">{profile?.bio || 'No bio yet — add one in your profile.'}</p>
            <Link to="/profile/edit" className="btn-edit">Edit profile</Link>
          </div>
        </header>
        <div className="profile-stats">
          <ProfileCard label="Enrolled" value={stats.enrolledCourses ?? 0} description="Active courses" accent="accent-purple" />
          <ProfileCard label="Certificates" value={stats.certificates ?? 0} description="Earned" accent="accent-pink" />
          <ProfileCard label="Wishlist" value={stats.wishlistCount ?? 0} description="Saved for later" accent="accent-blue" />
          <ProfileCard label="Joined" value={formatDate(profile?.joinDate)} description="Since" accent="accent-green" />
        </div>
        <div className="profile-details">
          <div>
            <h2>About</h2>
            <p>Phone: {profile?.phone || 'Not provided'}</p>
            <SocialLinks links={profile?.socialLinks} />
          </div>
          <div>
            <h2>Bio</h2>
            <p>{profile?.bio || 'Add a bio to tell everyone who you are.'}</p>
          </div>
        </div>
      </section>
    </StudentLayout>
  )
}
