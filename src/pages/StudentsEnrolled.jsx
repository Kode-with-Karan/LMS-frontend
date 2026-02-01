import React, { useEffect, useState } from 'react'
import InstructorLayout from '../components/InstructorLayout'
import { getStudentsEnrolled } from '../services/instructorService'

export default function StudentsEnrolled(){
  const [students, setStudents] = useState([])
  const [status, setStatus] = useState({ loading: true, error: '' })

  useEffect(() => {
    getStudentsEnrolled()
      .then((res) => setStudents(res.data))
      .catch(() => setStatus({ loading: false, error: 'Unable to fetch students' }))
      .finally(() => setStatus((prev) => ({ ...prev, loading: false })))
  }, [])

  return (
    <InstructorLayout title="Students Enrolled">
      {status.loading ? <p>Loading…</p> : status.error ? <p>{status.error}</p> : (
        <table className="instructor-table">
          <thead>
            <tr><th>Student</th><th>Email</th><th>Course</th><th>Progress</th><th>Updated</th></tr>
          </thead>
          <tbody>
            {students.map((row) => (
              <tr key={row.id}>
                <td>{row.student?.name}</td>
                <td>{row.student?.email}</td>
                <td>{row.course?.title}</td>
                <td>{Math.round(row.progressPercentage || 0)}%</td>
                <td>{new Date(row.updatedAt).toLocaleDateString()}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </InstructorLayout>
  )
}
