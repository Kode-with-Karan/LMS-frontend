import React, { useContext, useEffect, useMemo, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import PurchaseCard from '../components/PurchaseCard'
import SyllabusAccordion from '../components/SyllabusAccordion'
import ReviewCard from '../components/ReviewCard'
import RatingStars from '../components/RatingStars'
import { getCourseDetail, submitReview, enrollCourse } from '../services/api'
import { motion } from 'framer-motion'
import AuthContext from '../context/AuthContext'

const DEMO_USER = { id: 'demo-user', name: 'Demo Learner' }

export default function CourseDetailPage(){
  const { slug } = useParams()
  const navigate = useNavigate()
  const { user } = useContext(AuthContext)
  const [course, setCourse] = useState(null)
  const [reviews, setReviews] = useState([])
  const [ratingAvg, setRatingAvg] = useState(0)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [reviewForm, setReviewForm] = useState({ rating: 5, comment: '' })
  const [submitting, setSubmitting] = useState(false)
  const [enrolling, setEnrolling] = useState(false)
  const [enrolled, setEnrolled] = useState(false)
  const [reviewFeedback, setReviewFeedback] = useState('')
  const [enrollFeedback, setEnrollFeedback] = useState('')
  const [refreshKey, setRefreshKey] = useState(0)

  const fetchDetail = () => {
    if(!slug) return
    setLoading(true)
    setError('')
    getCourseDetail(slug)
      .then(res=>{
        setCourse(res.data.courseDetails)
        setReviews(res.data.reviews)
        setRatingAvg(res.data.averageRating)
      })
      .catch(()=> setError('Course could not be loaded'))
      .finally(()=> setLoading(false))
  }

  useEffect(()=>{
    fetchDetail()
  }, [slug, refreshKey])

  const ratingCounts = useMemo(()=>{
    const counts = [0,0,0,0,0]
    reviews.forEach(review=>{ if(review.rating) counts[review.rating-1]++ })
    return counts
  }, [reviews])

  const breakdownTotal = ratingCounts.reduce((acc,val)=> acc + val, 0) || 1

  const learningPoints = useMemo(()=>{
    if(!course?.syllabus?.length) return []
    return course.syllabus.slice(0,4).map(section=>`Dive into ${section.sectionTitle}`)
  }, [course])

  const requirements = ['Laptop or desktop', 'Modern browser', `${course?.language || 'English'} proficiency`]
  const audiences = [
    `${course?.level || 'Beginner'} learners`,
    'Professionals looking to upskill',
    'Career changers seeking practical knowledge'
  ]

  const handleReviewSubmit = async (event)=>{
    event.preventDefault()
    if(!course) return
    setSubmitting(true)
    setReviewFeedback('')
    try{
      await submitReview(course._id, { rating: reviewForm.rating, comment: reviewForm.comment }, { headers: { 'x-user-id': DEMO_USER.id, 'x-user-name': DEMO_USER.name } })
      setReviewForm({ rating: 5, comment: '' })
      setReviewFeedback('Thanks for your review!')
      setRefreshKey(prev=>prev+1)
    }catch(err){
      setReviewFeedback(err?.response?.data?.message || 'Unable to submit review right now')
    }finally{ setSubmitting(false) }
  }

  const handlePurchase = async ()=>{
    if(!course) return
    const price = course.discountPrice && course.discountPrice > 0 ? course.discountPrice : course.price
    setEnrollFeedback('')
    if(!user){
      setEnrollFeedback('Please log in to continue to checkout.')
      navigate('/login')
      return
    }
    if((price || 0) <= 0){
      setEnrolling(true)
      try{
        await enrollCourse(course._id)
        setEnrolled(true)
        setEnrollFeedback('Course unlocked!')
      }catch(err){
        setEnrollFeedback(err?.response?.data?.message || 'Could not enroll right now')
      }finally{ setEnrolling(false) }
      return
    }
    navigate(`/checkout/${course.slug}`)
  }

  const heroMeta = course ? [
    { label: 'Students', value: course.totalStudents },
    { label: 'Lectures', value: course.totalLectures },
    { label: 'Duration', value: `${course.duration.toFixed(1)}h` },
  ] : []

  return (
    <div className="bg-gradient-to-b from-white via-sky-50 to-white min-h-screen">
      <Navbar />
      {loading ? (
        <div className="max-w-5xl mx-auto px-4 py-12 space-y-6">
          <div className="h-12 w-2/3 bg-slate-200 rounded-full animate-pulse" />
          <div className="h-8 w-1/3 bg-slate-200 rounded-full animate-pulse" />
          <div className="grid grid-cols-1 lg:grid-cols-[3fr_1fr] gap-6">
            <div className="space-y-4">
              {[...Array(4)].map((_,i)=>(<div key={i} className="h-20 bg-white rounded-2xl shadow animate-pulse" />))}
            </div>
            <div className="h-80 bg-white rounded-3xl shadow animate-pulse" />
          </div>
        </div>
      ) : error ? (
        <div className="max-w-3xl mx-auto px-4 py-12 text-center text-red-600">{error}</div>
      ) : (
        <main className="max-w-6xl mx-auto px-4 py-8 grid gap-8 lg:grid-cols-[3fr_1.15fr]">
          <motion.section initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} className="space-y-8">
            <div className="relative overflow-hidden rounded-[32px] bg-gradient-to-br from-sky-100 via-white to-amber-50 shadow-2xl p-8 text-slate-900 border border-slate-100">
              <div className="absolute inset-0 opacity-60 bg-[radial-gradient(circle_at_top,_rgba(14,165,233,0.18)_0%,_rgba(255,255,255,0)_70%)]" />
              <div className="relative grid gap-6 lg:grid-cols-[3fr_1fr]">
                <div className="space-y-3">
                  <p className="text-sm uppercase tracking-wide text-sky-700">{course.category}</p>
                  <h1 className="text-3xl md:text-4xl font-extrabold text-slate-900">{course.title}</h1>
                  <p className="text-sm text-slate-600 leading-relaxed">{course.shortDescription}</p>
                  <div className="flex flex-wrap gap-4 items-center text-sm font-medium mt-3 text-slate-700">
                    <div className="flex items-center gap-2 text-amber-600">
                      <span className="text-2xl">⭐</span>
                      <span>{ratingAvg?.toFixed(1)} ({reviews.length})</span>
                    </div>
                    <span className="text-slate-700">{course.totalStudents.toLocaleString()} students</span>
                    <span className="text-slate-700">Updated {new Date(course.updatedAt).toLocaleDateString()}</span>
                  </div>
                  <div className="flex flex-wrap gap-2 text-xs text-slate-700">
                    <span className="px-2 py-1 bg-white rounded-full border border-slate-200">{course.level}</span>
                    <span className="px-2 py-1 bg-white rounded-full border border-slate-200">{course.duration?.toFixed(1)}h</span>
                    <span className="px-2 py-1 bg-white rounded-full border border-slate-200">{course.totalLectures} lectures</span>
                  </div>
                  <div className="flex gap-2 text-xs text-slate-700 mt-4">
                    <span className="rounded-full bg-white px-3 py-1 border border-slate-200">Lifetime access</span>
                    <span className="rounded-full bg-white px-3 py-1 border border-slate-200">Downloadable resources</span>
                  </div>
                </div>
                <div className="rounded-3xl border border-slate-200 bg-white p-4 space-y-4 shadow-md">
                  {heroMeta.map(meta=> (
                    <div key={meta.label} className="flex justify-between">
                      <span className="text-xs uppercase tracking-wide text-slate-500">{meta.label}</span>
                      <span className="text-lg font-bold text-slate-900">{meta.value}</span>
                    </div>
                  ))}
                  <button className="w-full rounded-2xl bg-sky-600 text-white font-semibold py-3 hover:bg-sky-500 transition">Preview this course</button>
                </div>
              </div>
            </div>

            <motion.div className="bg-white rounded-3xl p-6 shadow-lg space-y-6" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
              <h2 className="text-2xl font-semibold text-slate-900">Course Overview</h2>
              <p className="text-slate-600 leading-relaxed">{course.description}</p>
              <div className="grid gap-6 lg:grid-cols-3">
                <div className="space-y-2">
                  <p className="font-semibold text-slate-700">What you'll learn</p>
                  <ul className="space-y-2 text-sm text-slate-600">
                    {learningPoints.map(point=> <li key={point} className="flex items-start gap-2"><span className="text-emerald-500">•</span>{point}</li>)}
                  </ul>
                </div>
                <div className="space-y-2">
                  <p className="font-semibold text-slate-700">Requirements</p>
                  <ul className="space-y-2 text-sm text-slate-600">
                    {requirements.map(req=> <li key={req} className="flex items-center gap-2"><span className="text-purple-500">✔</span>{req}</li>)}
                  </ul>
                </div>
                <div className="space-y-2">
                  <p className="font-semibold text-slate-700">Who this is for</p>
                  <ul className="space-y-2 text-sm text-slate-600">
                    {audiences.map(item=> <li key={item} className="flex items-center gap-2"><span className="text-indigo-500">★</span>{item}</li>)}
                  </ul>
                </div>
              </div>
            </motion.div>

            <SyllabusAccordion syllabus={course.syllabus} isEnrolled={enrolled} />

            <motion.div className="bg-white rounded-3xl p-6 shadow-lg space-y-4" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
              <h2 className="text-2xl font-semibold text-slate-900">Instructor</h2>
              <div id="instructor" className="flex flex-col gap-4 md:flex-row">
                <div className="w-32 h-32 rounded-full overflow-hidden bg-slate-200">
                  <img src={course.thumbnailUrl} alt={course.instructorName} className="w-full h-full object-cover" loading="lazy" />
                </div>
                <div className="space-y-2">
                  <h3 className="font-semibold text-lg">{course.instructorName}</h3>
                  <p className="text-sm text-slate-600">Experienced instructor with a passion for teaching practical skills.</p>
                  <div className="text-sm text-slate-500">{course.totalStudents} students • {course.totalLectures} courses</div>
                  <div className="flex items-center gap-3 text-sm text-slate-500">
                    <span className="px-2 py-1 rounded-full border">Follow</span>
                    <span className="px-2 py-1 rounded-full border">Message</span>
                    <a className="text-sky-600 text-sm" href="#">View profile</a>
                  </div>
                </div>
              </div>
            </motion.div>

            <motion.div className="bg-white rounded-3xl p-6 shadow-lg space-y-4" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
              <div className="flex items-center justify-between">
                <h2 className="text-2xl font-semibold text-slate-900">Reviews</h2>
                <span className="text-sm text-slate-500">Average rating</span>
              </div>
              <div className="flex items-center gap-3">
                <span className="text-4xl font-bold text-slate-900">{ratingAvg?.toFixed(1)}</span>
                <RatingStars rating={ratingAvg} size={1.1} />
              </div>
              <div className="space-y-2">
                {[5,4,3,2,1].map(star=> (
                  <div key={star} className="flex items-center gap-3 text-xs">
                    <span>{star}★</span>
                    <div className="flex-1 h-2 bg-slate-200 rounded-full overflow-hidden">
                      <div className="h-full bg-gradient-to-r from-sky-400 to-amber-300" style={{ width: `${(ratingCounts[star-1]/breakdownTotal)*100}%` }} />
                    </div>
                    <span className="w-10 text-right">{ratingCounts[star-1]}</span>
                  </div>
                ))}
              </div>
              <div className="space-y-4">
                {reviews.length === 0 && <p className="text-sm text-slate-500">No reviews yet. Be the first to share your experience.</p>}
                {reviews.slice(0,3).map(review=> <ReviewCard key={review._id} review={review} />)}
              </div>
              <form onSubmit={handleReviewSubmit} className="space-y-3">
                <div>
                  <label className="text-sm font-medium text-slate-700">Your Rating</label>
                  <div className="flex items-center gap-2 mt-2">
                    {[1,2,3,4,5].map(value=> (
                      <button type="button" key={value} onClick={()=>setReviewForm(prev=>({ ...prev, rating: value }))} className={`px-3 py-1 border rounded-full ${reviewForm.rating === value ? 'bg-sky-600 text-white border-sky-600' : 'bg-white text-slate-600'}`}>
                        {value}★
                      </button>
                    ))}
                  </div>
                </div>
                <div>
                  <label className="text-sm font-medium text-slate-700">Comment</label>
                  <textarea value={reviewForm.comment} onChange={(e)=>setReviewForm(prev=>({ ...prev, comment: e.target.value }))} placeholder="Share what you learned" className="mt-2 w-full border rounded-2xl p-3 text-sm text-slate-700" rows={4} />
                </div>
                {reviewFeedback && <p className="text-sm text-emerald-600">{reviewFeedback}</p>}
                <button type="submit" disabled={submitting} className="px-6 py-3 rounded-2xl bg-gradient-to-r from-sky-600 to-sky-500 text-white font-semibold shadow-lg hover:scale-[1.01] transition-transform">
                  {submitting ? 'Submitting...' : 'Post Review'}
                </button>
              </form>
            </motion.div>

            <motion.div className="bg-gradient-to-r from-sky-500 to-amber-300 rounded-3xl p-6 text-slate-900 shadow-2xl" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
              <h3 className="text-xl font-semibold">Ready to start?</h3>
              <p className="text-sm mt-2 text-slate-800">Continue where you left off and build real projects with SkillSphere.</p>
              <button onClick={handlePurchase} className="mt-4 px-6 py-3 rounded-2xl bg-white text-sky-700 font-semibold shadow-lg hover:scale-[1.01] transition-transform">{enrolled ? 'Go to course' : 'Buy now'}</button>
            </motion.div>
          </motion.section>

          <aside className="lg:col-span-1">
            <PurchaseCard course={course} onPurchase={handlePurchase} enrolling={enrolling} enrolled={enrolled} />
            {enrollFeedback && <p className="mt-4 text-sm text-emerald-600">{enrollFeedback}</p>}
          </aside>
        </main>
      )}
      <Footer />
    </div>
  )
}
