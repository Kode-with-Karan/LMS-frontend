import React, { useMemo, useState } from 'react'
import LectureItem from './LectureItem'

export default function LectureSidebar({ sections = [], activeLectureId, completedLectures = new Set(), onSelectLecture, progressPercentage, course }){
  const [openSections, setOpenSections] = useState(() => sections.map((_, index) => index))
  const totalLectures = useMemo(()=> sections.reduce((sum, section)=> sum + (section.lectures?.length || 0), 0), [sections])

  const toggleSection = (index) => {
    setOpenSections((prev) => prev.includes(index) ? prev.filter((i) => i !== index) : [...prev, index])
  }

  return (
    <aside className="sidebar">
      <div className="sidebar-header">
        <h2>{course?.title}</h2>
        <p>{totalLectures} lectures • {progressPercentage?.toFixed?.(0) ?? progressPercentage}% complete</p>
        <div className="sidebar-progress">
          <div className="progress-track">
            <div className="progress-fill" style={{ width: `${Math.min(progressPercentage, 100)}%` }} />
          </div>
        </div>
      </div>
      <div className="section-list">
        {sections.map((section, sectionIndex) => (
          <div key={`${section.sectionTitle}-${sectionIndex}`} className="sidebar-section">
            <button type="button" className="section-toggle" onClick={()=>toggleSection(sectionIndex)}>
              <span>{section.sectionTitle}</span>
              <span>{openSections.includes(sectionIndex) ? '▾' : '▸'}</span>
            </button>
            {openSections.includes(sectionIndex) && (
              <div className="section-lectures">
                {(section.lectures || []).map((lecture) => (
                  <LectureItem
                    key={lecture.id}
                    lecture={lecture}
                    isActive={lecture.id === activeLectureId}
                    isCompleted={completedLectures.has(lecture.id)}
                    onSelect={onSelectLecture}
                  />
                ))}
              </div>
            )}
          </div>
        ))}
      </div>
    </aside>
  )
}
