import React, { useEffect, useMemo, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import CourseHeader from '../components/CourseHeader'
import VideoPlayer from '../components/VideoPlayer'
import LectureSidebar from '../components/LectureSidebar'
import { getCourseLearning, completeLecture as completeLectureRequest } from '../services/studentService'
import StudentLayout from '../components/StudentLayout'
import '../styles/courseLearning.css'

export default function CourseLearning(){
  const { courseId } = useParams()
  const navigate = useNavigate()
  const [course, setCourse] = useState(null)
  const [sections, setSections] = useState([])
  const [progress, setProgress] = useState({ progressPercentage: 0, completedLectures: [], lastWatchedLecture: null })
  const [activeLectureId, setActiveLectureId] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [isMarking, setIsMarking] = useState(false)

  const flattenedLectures = useMemo(() => (
    sections.flatMap((section) => (section.lectures || []).map((lecture) => ({
      ...lecture,
      sectionTitle: section.sectionTitle,
    })))
  ), [sections])

  const currentLecture = useMemo(() => {
    if(!flattenedLectures.length) return null
    if(activeLectureId){
      return flattenedLectures.find((lecture) => lecture.id === activeLectureId) || flattenedLectures[0]
    }
    return flattenedLectures[0]
  }, [activeLectureId, flattenedLectures])

  useEffect(()=>{
    let isMounted = true
    const load = async () => {
      setLoading(true)
      setError('')
      try{
        const res = await getCourseLearning(courseId)
        if(!isMounted) return
        setCourse(res.data.course)
        setSections(res.data.sections || [])
        setProgress(res.data.progress || { progressPercentage: 0, completedLectures: [], lastWatchedLecture: null })
        setActiveLectureId(res.data.progress?.lastWatchedLecture || null)
      }catch(err){
        if(!isMounted) return
        setError(err?.response?.data?.message || 'Unable to load the course content')
      }finally{
        if(isMounted) setLoading(false)
      }
    }
    load()
    return () => { isMounted = false }
  }, [courseId])

  const completedSet = useMemo(() => new Set(progress.completedLectures || []), [progress.completedLectures])

  const handleSelectLecture = (lectureId) => {
    setActiveLectureId(lectureId)
  }

  const findLectureIndex = (lectureId) => flattenedLectures.findIndex((lecture) => lecture.id === lectureId)

  const goToLectureAtIndex = (index) => {
    if(index >= 0 && index < flattenedLectures.length){
      setActiveLectureId(flattenedLectures[index].id)
    }
  }

  const handleNextLecture = () => {
    if(!currentLecture) return
    const nextIndex = findLectureIndex(currentLecture.id) + 1
    goToLectureAtIndex(nextIndex)
  }

  const handlePreviousLecture = () => {
    if(!currentLecture) return
    const prevIndex = findLectureIndex(currentLecture.id) - 1
    goToLectureAtIndex(prevIndex)
  }

  const markLectureComplete = async (lectureId, autoAdvance = false) => {
    if(isMarking) return
    setIsMarking(true)
    try{
      const res = await completeLectureRequest(courseId, lectureId)
      setProgress(res.data.progress)
      if(autoAdvance){
        const nextIndex = findLectureIndex(lectureId) + 1
        goToLectureAtIndex(nextIndex)
      }
    }catch(err){
      setError(err?.response?.data?.message || 'Unable to update progress')
    }finally{
      setIsMarking(false)
    }
  }

  const handleVideoEnded = () => {
    if(currentLecture){
      markLectureComplete(currentLecture.id, true)
    }
  }

  const goBack = () => navigate('/my-courses')

  return (
    <StudentLayout>
      <div className="course-learning-page student-page-surface">
        <div className="course-learning-shell">
          {loading && <div className="student-status">Loading course…</div>}
          {error && <div className="student-status status-error">{error}</div>}
          {!loading && !error && course && currentLecture && (
            <>
              <CourseHeader
                title={course.title}
                instructor={course.instructorName}
                progress={progress.progressPercentage}
                totalLectures={course.totalLectures}
              />
              <div className="learning-grid">
                <div className="video-column">
                  <VideoPlayer
                    lecture={currentLecture}
                    onEnded={handleVideoEnded}
                    onPrev={handlePreviousLecture}
                    onNext={handleNextLecture}
                    onMarkComplete={()=>markLectureComplete(currentLecture.id)}
                    isCompleted={completedSet.has(currentLecture.id)}
                  />
                  <div className="learning-actions">
                    <button className="btn-secondary" onClick={goBack}>Back to My Learning</button>
                    <button className="btn-secondary" onClick={() => handleSelectLecture(flattenedLectures[0]?.id)}>Restart course</button>
                  </div>
                </div>
                <LectureSidebar
                  course={course}
                  sections={sections}
                  activeLectureId={currentLecture.id}
                  completedLectures={completedSet}
                  onSelectLecture={handleSelectLecture}
                  progressPercentage={progress.progressPercentage}
                />
              </div>
            </>
          )}
        </div>
      </div>
    </StudentLayout>
  )
}
