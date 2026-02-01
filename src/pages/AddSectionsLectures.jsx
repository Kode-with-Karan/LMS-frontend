import React, { useEffect, useState } from 'react'
import { useSearchParams } from 'react-router-dom'
import InstructorLayout from '../components/InstructorLayout'
import { addLecture, addSection, getInstructorCourse, getInstructorCourses } from '../services/instructorService'

export default function AddSectionsLectures(){
  const [courses, setCourses] = useState([])
  const [selectedCourse, setSelectedCourse] = useState('')
  const [courseDetail, setCourseDetail] = useState(null)
  const [sectionTitle, setSectionTitle] = useState('')
  const [lectureForm, setLectureForm] = useState({ title: '', description: '', videoUrl: '', duration: '', resourcesUrl: '', isPreview: false })
  const [status, setStatus] = useState({ loading: true, error: '', success: '' })
  const [searchParams] = useSearchParams()

  useEffect(() => {
    getInstructorCourses().then((res) => {
      setCourses(res.data)
      const preset = searchParams.get('courseId') || res.data[0]?._id || ''
      setSelectedCourse(preset)
      if(preset){
        loadCourse(preset)
      }
    }).finally(() => setStatus((prev) => ({ ...prev, loading: false })))
  }, [searchParams])

  const loadCourse = (id) => {
    if(!id) return
    setStatus({ loading: true, error: '', success: '' })
    getInstructorCourse(id)
      .then((res) => setCourseDetail(res.data))
      .catch(() => setStatus({ loading: false, error: 'Unable to load course', success: '' }))
      .finally(() => setStatus((prev) => ({ ...prev, loading: false })))
  }

  const handleAddSection = async () => {
    try{
      await addSection(selectedCourse, sectionTitle)
      setSectionTitle('')
      loadCourse(selectedCourse)
    }catch(err){
      setStatus({ loading: false, error: err?.response?.data?.message || 'Unable to add section', success: '' })
    }
  }

  const handleAddLecture = async (sectionIndex) => {
    try{
      await addLecture(selectedCourse, sectionIndex, lectureForm)
      setLectureForm({ title: '', description: '', videoUrl: '', duration: '', resourcesUrl: '', isPreview: false })
      loadCourse(selectedCourse)
    }catch(err){
      setStatus({ loading: false, error: err?.response?.data?.message || 'Unable to add lecture', success: '' })
    }
  }

  return (
    <InstructorLayout title="Add Sections & Lectures">
      <div className="form-grid" style={{ marginBottom: 12 }}>
        <div className="form-field">
          <label>Select Course</label>
          <select value={selectedCourse} onChange={(e) => { setSelectedCourse(e.target.value); loadCourse(e.target.value) }}>
            <option value="">Choose a course</option>
            {courses.map((course) => <option key={course._id} value={course._id}>{course.title}</option>)}
          </select>
        </div>
        <div className="form-field">
          <label>New Section Title</label>
          <div style={{ display: 'flex', gap: 8 }}>
            <input value={sectionTitle} onChange={(e) => setSectionTitle(e.target.value)} placeholder="Module title" />
            <button className="btn-primary" type="button" onClick={handleAddSection} disabled={!sectionTitle || !selectedCourse}>Add</button>
          </div>
        </div>
      </div>

      {status.error && <p style={{ color: 'red' }}>{status.error}</p>}
      {courseDetail ? (
        <div>
          {courseDetail.syllabus?.length ? courseDetail.syllabus.map((section, idx) => (
            <div key={idx} className="section-block">
              <div className="section-title">
                <span>{section.sectionTitle}</span>
                <span className="tag">Lectures: {section.lectures?.length || 0}</span>
              </div>
              <div className="form-grid">
                <div className="form-field">
                  <label>Lecture title</label>
                  <input value={lectureForm.title} onChange={(e) => setLectureForm({ ...lectureForm, title: e.target.value })} />
                </div>
                <div className="form-field">
                  <label>Video URL</label>
                  <input value={lectureForm.videoUrl} onChange={(e) => setLectureForm({ ...lectureForm, videoUrl: e.target.value })} />
                </div>
                <div className="form-field">
                  <label>Duration (e.g. 08:32)</label>
                  <input value={lectureForm.duration} onChange={(e) => setLectureForm({ ...lectureForm, duration: e.target.value })} />
                </div>
                <div className="form-field" style={{ gridColumn: '1/-1' }}>
                  <label>Description</label>
                  <textarea value={lectureForm.description} rows={3} onChange={(e) => setLectureForm({ ...lectureForm, description: e.target.value })} />
                </div>
                <div className="form-field">
                  <label>Resources URL</label>
                  <input value={lectureForm.resourcesUrl} onChange={(e) => setLectureForm({ ...lectureForm, resourcesUrl: e.target.value })} />
                </div>
                <div className="form-field">
                  <label>Preview?</label>
                  <select value={lectureForm.isPreview ? 'yes' : 'no'} onChange={(e) => setLectureForm({ ...lectureForm, isPreview: e.target.value === 'yes' })}>
                    <option value="no">No</option>
                    <option value="yes">Yes</option>
                  </select>
                </div>
              </div>
              <div className="button-row">
                <button className="btn-primary" type="button" onClick={() => handleAddLecture(idx)}>Add Lecture</button>
              </div>
              {section.lectures?.length ? (
                <ul style={{ marginTop: 8, paddingLeft: 18 }}>
                  {section.lectures.map((lecture) => (
                    <li key={lecture._id}>{lecture.title} <span style={{ color: '#475569' }}>({lecture.duration || 'n/a'})</span></li>
                  ))}
                </ul>
              ) : <p>No lectures yet.</p>}
            </div>
          )) : <p>No sections yet. Add one to begin.</p>}
        </div>
      ) : <p>Select a course to manage its syllabus.</p>}
    </InstructorLayout>
  )
}
