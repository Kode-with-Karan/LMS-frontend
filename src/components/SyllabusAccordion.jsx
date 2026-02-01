import React, { useState, useMemo } from 'react'
import { motion } from 'framer-motion'

export default function SyllabusAccordion({ syllabus = [], isEnrolled = false }){
  const [openIndex, setOpenIndex] = useState(0)
  const totalDuration = useMemo(()=> syllabus.reduce((acc, section)=>{
    const minutes = section.lectures.reduce((sum, lecture)=>{
      const value = parseFloat(lecture.duration)
      return sum + (Number.isNaN(value) ? 0 : value)
    }, 0)
    return acc + minutes
  }, 0), [syllabus])

  const totalLectures = useMemo(()=> syllabus.reduce((acc, section)=> acc + (section.lectures?.length || 0), 0), [syllabus])

  const toggle = (idx)=> setOpenIndex(prev => prev === idx ? null : idx)

  return (
    <div className="bg-white p-6 rounded-3xl shadow-lg space-y-4">
      <div className="flex justify-between items-center">
        <div>
          <h3 className="text-xl font-semibold text-slate-800">Course Syllabus</h3>
          <p className="text-sm text-slate-500">{totalLectures} lectures • {totalDuration.toFixed(1)} min total</p>
        </div>
      </div>
      <div className="space-y-3">
        {syllabus.map((section, idx)=>(
          <motion.div key={section.sectionTitle} layout className="border border-slate-200 rounded-2xl overflow-hidden">
            <button onClick={()=>toggle(idx)} className="w-full px-5 py-4 flex items-center justify-between bg-slate-50">
              <div>
                <div className="font-medium">{section.sectionTitle}</div>
                <div className="text-xs text-slate-500">{section.lectures.length} lectures</div>
              </div>
              <div className="text-sm text-slate-500">{openIndex===idx? 'Collapse':'Expand'}</div>
            </button>
            {openIndex===idx && (
              <motion.div initial={{ opacity:0, height:0 }} animate={{ opacity:1, height:'auto'}} transition={{ duration:0.3 }} className="px-5 py-4 space-y-3">
                {section.lectures.map((lecture,i)=>(
                  <div key={i} className="flex items-center justify-between p-3 rounded-2xl hover:bg-purple-50 transition">
                    <div>
                      <div className="font-semibold text-sm">{lecture.title}</div>
                      <div className="text-xs text-slate-500">{lecture.duration}</div>
                    </div>
                    <div className="flex items-center gap-2 text-xs">
                      {!isEnrolled && <span className="px-2 py-1 bg-slate-200 rounded-full">Locked</span>}
                      {lecture.isPreview && <span className="px-2 py-1 bg-amber-200 rounded-full">Preview</span>}
                    </div>
                  </div>
                ))}
              </motion.div>
            )}
          </motion.div>
        ))}
      </div>
    </div>
  )
}
