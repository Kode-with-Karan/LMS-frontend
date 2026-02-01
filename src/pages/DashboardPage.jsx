import React, { useContext, useEffect, useMemo, useState } from 'react'
import DashboardHeader from '../components/DashboardHeader'
import DashboardCourseCard from '../components/DashboardCourseCard'
import AuthContext from '../context/AuthContext'
import StudentLayout from '../components/StudentLayout'
import { getDashboardData, getEnrolledCourses, getNotifications, getRecentActivity } from '../services/studentService'

const formatDate = (value) => {
  if(!value) return ''
  return new Intl.DateTimeFormat('en-US', {
    month: 'short',
    day: 'numeric',
  }).format(new Date(value))
}

export default function DashboardPage(){
  const { user } = useContext(AuthContext)
  const [dashboard, setDashboard] = useState({ stats: {}, recommendations: [], certificates: [], overviewNotifications: [] })
  const [courses, setCourses] = useState([])
  const [notifications, setNotifications] = useState([])
  const [activity, setActivity] = useState([])
  const [status, setStatus] = useState({ loading: true, error: '' })

  const averageProgress = useMemo(() => {
    if(!courses.length) return 0
    const total = courses.reduce((acc, entry) => acc + (entry.course?.progressPercentage || 0), 0)
    return Math.round(total / courses.length)
  }, [courses])

  const dailyQuests = useMemo(() => {
    const questOneProgress = Math.min(100, (activity.length || 1) * 20)
    const questTwoProgress = Math.min(100, averageProgress)
    const questThreeProgress = Math.min(100, (dashboard?.stats?.completedCourses || 0) * 25)
    return [
      { title: 'Log in 5 days straight', reward: '+5 points', progress: questOneProgress },
      { title: 'Complete a lesson today', reward: '+10 points', progress: questTwoProgress },
      { title: 'Ace 3 quizzes without retry', reward: '+15 points', progress: questThreeProgress },
    ]
  }, [activity.length, averageProgress, dashboard?.stats?.completedCourses])

  const insights = useMemo(() => ({
    completionRate: Math.min(100, Math.max(0, averageProgress)),
    activeCourses: dashboard?.stats?.totalCourses ?? 0,
    completedCourses: dashboard?.stats?.completedCourses ?? 0,
    certificates: dashboard?.stats?.certificates ?? 0,
  }), [averageProgress, dashboard?.stats])

  useEffect(()=>{
    let isMounted = true
    const load = async () => {
      setStatus({ loading: true, error: '' })
      try{
        const [dashboardRes, coursesRes, notificationsRes, activityRes] = await Promise.all([
          getDashboardData(),
          getEnrolledCourses(),
          getNotifications(),
          getRecentActivity(),
        ])
        if(!isMounted) return
        setDashboard(dashboardRes.data)
        setCourses(coursesRes.data.map((entry) => {
          const courseInfo = entry.course || {}
          return {
            id: entry.id || entry._id,
            course: {
              ...courseInfo,
              progressPercentage: entry.progressPercentage ?? 0,
            },
          }
        }))
        setNotifications(notificationsRes.data)
        setActivity(activityRes.data)
        setStatus({ loading: false, error: '' })
      }catch(err){
        if(!isMounted) return
        setStatus({ loading: false, error: err?.response?.data?.message || 'Unable to load the dashboard' })
      }
    }
    load()
    return () => { isMounted = false }
  }, [])

  const statCards = useMemo(()=>{
    const stats = dashboard?.stats || {}
    return [
      { label: 'Active courses', value: stats.totalCourses ?? 0, helper: 'Courses you are following' },
      { label: 'Completed', value: stats.completedCourses ?? 0, helper: 'Finished milestones' },
      { label: 'Certificates', value: stats.certificates ?? 0, helper: 'Recognitions earned' },
      { label: 'Unread alerts', value: stats.unreadNotifications ?? 0, helper: 'Notifications waiting for you' },
    ]
  }, [dashboard])

  return (
    <StudentLayout header={<DashboardHeader name={user?.name} />}>
      {status.loading && <div className="dashboard-loading">One moment while we pull your progress...</div>}
      {status.error && <div className="dashboard-error">{status.error}</div>}
      {!status.loading && !status.error && (
        <>
          <div className="dashboard-main-grid">
            <section className="dashboard-hero card">
              <div className="hero-copy">
                <p className="hero-eyebrow">Premium learning</p>
                <h1>Unlock premium courses today</h1>
                <p className="hero-sub">Learn from industry experts with exclusive content designed to boost your skills.</p>
                <div className="hero-actions">
                  <button className="btn-hero">Go Premium →</button>
                  <button className="btn-hero-ghost">Explore</button>
                </div>
                <div className="hero-metrics">
                  <div className="hero-metric"><span className="dot success"></span><div><p className="metric-label">Courses</p><p className="metric-value">{dashboard?.stats?.completedCourses ?? 0}/{dashboard?.stats?.totalCourses ?? 0}</p></div></div>
                  <div className="hero-metric"><span className="dot warning"></span><div><p className="metric-label">Certificates</p><p className="metric-value">{dashboard?.stats?.certificates ?? 0}</p></div></div>
                  <div className="hero-metric"><span className="dot info"></span><div><p className="metric-label">Unread alerts</p><p className="metric-value">{dashboard?.stats?.unreadNotifications ?? 0}</p></div></div>
                </div>
              </div>
              <div className="hero-visual">
                <div className="progress-ring" aria-label="Average progress">
                  <div className="progress-ring__circle" style={{ background: `conic-gradient(#a855f7 ${averageProgress}%, #e2e8f0 ${averageProgress}% 100%)` }}>
                    <div className="progress-ring__inner">
                      <p className="progress-ring__value">{averageProgress}%</p>
                      <p className="progress-ring__label">Progress</p>
                    </div>
                  </div>
                </div>
                <div className="hero-badge">Keep your streak alive ✨</div>
              </div>
              </section>

            <div className="dashboard-main-column">

              <section className="dashboard-analytics card">
                <div className="panel-heading">
                  <div>
                    <h2>Learning Pulse</h2>
                    <p>Progress and momentum at a glance.</p>
                  </div>
                  <span className="panel-note">Live</span>
                </div>
                <div className="analytics-grid">
                  <div>
                    <div className="chart-track" aria-label="Completion rate">
                      <div className="chart-fill" style={{ width: `${insights.completionRate}%` }} />
                    </div>
                    <div className="chart-legend">
                      <span>Overall completion</span>
                      <strong>{insights.completionRate}%</strong>
                    </div>
                    <div className="sparkline" aria-hidden="true" />
                  </div>
                  <div className="insight-grid">
                    <div className="insight-pill">
                      <p className="stat-label">Active courses</p>
                      <span>{insights.activeCourses}</span>
                      <p className="stat-helper">Currently in your queue</p>
                    </div>
                    <div className="insight-pill">
                      <p className="stat-label">Completed</p>
                      <span>{insights.completedCourses}</span>
                      <p className="stat-helper">Finished end-to-end</p>
                    </div>
                    <div className="insight-pill">
                      <p className="stat-label">Certificates</p>
                      <span>{insights.certificates}</span>
                      <p className="stat-helper">Recognitions earned</p>
                    </div>
                    <div className="insight-pill">
                      <p className="stat-label">Momentum</p>
                      <span>{Math.min(100, insights.completionRate + (insights.completedCourses * 5))}%</span>
                      <p className="stat-helper">Keep your streak growing</p>
                    </div>
                  </div>
                </div>
              </section>

              <section className="dashboard-stats">
                {statCards.map((card) => (
                  <article key={card.label} className="stat-card card soft">
                    <p className="stat-label">{card.label}</p>
                    <p className="stat-value">{card.value}</p>
                    <p className="stat-helper">{card.helper}</p>
                  </article>
                ))}
              </section>

              <section className="dashboard-panel card">
                <div className="panel-heading">
                  <div>
                    <h2>Continue Watching</h2>
                    <p>Jump back into your lessons.</p>
                  </div>
                  <span className="panel-note">{courses.length} courses in progress</span>
                </div>
                <div className="dashboard-course-grid">
                  {courses.length ? (
                    courses.map((entry) => (
                      <DashboardCourseCard key={entry.id} course={entry.course} />
                    ))
                  ) : (
                    <div className="empty-state">You haven’t enrolled in any courses yet.</div>
                  )}
                </div>
              </section>

              <div className="dashboard-duo">


                {dashboard.recommendations?.length > 0 && (
                  <section className="recommendation-strip card">
                    <div className="panel-heading">
                      <div>
                        <h2>Recommended for you</h2>
                        <p>Handpicked courses to unlock new skills.</p>
                      </div>
                    </div>
                    <div className="recommendation-grid">
                      {dashboard.recommendations.map((course) => (
                        <div key={course._id} className="recommendation-pill">
                          <h3>{course.title}</h3>
                          <p>{course.category}</p>
                          <span>{course.instructorName}</span>
                          <p className="recommendation-rating">{course.rating?.toFixed(1) || '––'} ★</p>
                        </div>
                      ))}
                    </div>
                  </section>
                )}
              </div>

                              <section className="dashboard-quick-actions card">
                  <div className="panel-heading">
                    <div>
                      <h2>Quick Actions</h2>
                      <p>Tools to manage your account and accelerate learning.</p>
                    </div>
                    <span className="panel-note">Shortcuts</span>
                  </div>
                  <div className="quick-actions-grid">
                    <div className="quick-action-row">
                      <div>
                        <p className="quick-action-title">View Purchase History</p>
                        <p className="quick-action-meta">Invoices & receipts</p>
                      </div>
                      <a className="view-link" href="/purchase-history">Open</a>
                    </div>

                    <div className="quick-action-row">
                      <div>
                        <p className="quick-action-title">Manage Profile</p>
                        <p className="quick-action-meta">Update avatar & bio</p>
                      </div>
                      <a className="view-link" href="/profile/edit">Edit</a>
                    </div>

                    <div className="quick-action-row">
                      <div>
                        <p className="quick-action-title">Browse Recommendations</p>
                        <p className="quick-action-meta">Handpicked for you</p>
                      </div>
                      <a className="view-link" href="/courses">Browse</a>
                    </div>
                  </div>
                </section>

              <div className="dashboard-lower-grid">


                <div className="activity-card card">
                  <div className="panel-heading">
                    <div>
                      <h2>Recent Activity</h2>
                      <p>Moments that shaped your learning streak.</p>
                    </div>
                  </div>
                  <ul className="activity-list">
                    {activity.length ? activity.map((item) => (
                      <li key={item.id} className="activity-row">
                        <span className="activity-dot" aria-hidden="true"></span>
                        <div>
                          <p>{item.message}</p>
                          <small>{formatDate(item.timestamp)} • {item.detail}</small>
                        </div>
                        <span className="activity-type">{item.type === 'certificate' ? '🏅' : '📚'}</span>
                      </li>
                    )) : (
                      <li className="empty-state">No activity yet.</li>
                    )}
                  </ul>
                </div>
              </div>
            </div>

            <aside className="dashboard-rail">
              <div className="rail-card card">
                <div className="rail-header">
                  <h3>Events</h3>
                  <span className="rail-chip">This week</span>
                </div>
                <div className="rail-events">
                  {(notifications.slice(0, 4)).map((note) => (
                    <div key={note._id || note.id} className="rail-event-row">
                      <div className="rail-event-date">{formatDate(note.createdAt)}</div>
                      <div>
                        <p className="rail-event-title">{note.title}</p>
                        <p className="rail-event-meta">{note.message}</p>
                      </div>
                    </div>
                  ))}
                  {!notifications.length && <p className="empty-state">No events scheduled.</p>}
                </div>
              </div>

              <div className="rail-card card">
                <div className="rail-header">
                  <h3>Daily Quest</h3>
                  <span className="rail-chip">Keep the streak</span>
                </div>
                <div className="rail-quests">
                  {dailyQuests.map((quest, idx) => {
                    const done = quest.progress >= 100
                    return (
                      <div key={quest.title} className="rail-quest-row">
                        <div>
                          <p className="rail-quest-title">{quest.title}</p>
                          <p className="rail-quest-meta">{quest.reward}</p>
                          <div className="quest-progress">
                            <span style={{ width: `${quest.progress}%` }} />
                          </div>
                        </div>
                        <button className={`quest-btn ${done ? 'solid' : ''}`} type="button">{done ? 'Claim Reward' : `${Math.min(100, quest.progress)}%`}</button>
                      </div>
                    )
                  })}
                </div>
              </div>

                <div className="rail-card card">
                  <div className="rail-header">
                    <h3>Certificates</h3>
                    <span className="rail-chip">Recent</span>
                  </div>
                  <div className="rail-events">
                    {dashboard.certificates && dashboard.certificates.length ? (
                      dashboard.certificates.slice(0,4).map((cert) => (
                        <div key={cert.id} className="rail-event-row">
                          <div className="rail-event-date">{formatDate(cert.issuedAt)}</div>
                          <div>
                            <p className="rail-event-title">{cert.courseTitle}</p>
                            <p className="rail-event-meta">Certificate</p>
                          </div>
                          <a className="view-link" href={cert.certificateUrl || '#'} target="_blank" rel="noreferrer">View</a>
                        </div>
                      ))
                    ) : (
                      <p className="empty-state">No certificates yet.</p>
                    )}
                  </div>
                </div>

                

                <div className="rail-card card">
                  <div className="rail-header">
                    <h3>Notifications</h3>
                    <span className="rail-chip">Recent</span>
                  </div>
                  <div className="rail-events">
                    {notifications.length ? (
                      notifications.slice(0,6).map((note) => (
                        <div key={note._id || note.id} className={`rail-event-row ${note.read ? 'read' : ''}`}>
                          <div>
                            <p className="rail-event-title">{note.title}</p>
                            <p className="rail-event-meta">{note.message}</p>
                          </div>
                          <a className="view-link" href="/notifications">Open</a>
                        </div>
                      ))
                    ) : (
                      <p className="empty-state">No notifications.</p>
                    )}
                  </div>
                </div>

                <div className="rail-card card">
                  <div className="rail-header">
                    <h3>Recent Activity</h3>
                    <span className="rail-chip">Timeline</span>
                  </div>
                  <div className="rail-events">
                    {activity.length ? (
                      activity.slice(0,6).map((item) => (
                        <div key={item.id} className="rail-event-row">
                          <div>
                            <p className="rail-event-title">{item.message}</p>
                            <p className="rail-event-meta">{item.detail}</p>
                          </div>
                          <a className="view-link" href="/dashboard">View</a>
                        </div>
                      ))
                    ) : (
                      <p className="empty-state">No recent activity.</p>
                    )}
                  </div>
                </div>
            </aside>
          </div>
        </>
      )}
    </StudentLayout>
  )
}
