"use client"

import { Search, Filter, Download, MoreHorizontal } from "lucide-react"
import { useState, useEffect } from "react"
import { useParams } from "react-router-dom"
import { courseApi } from "../services/api"

function initials(name) {
  if (!name) return "?"
  const parts = name.trim().split(/\s+/)
  return ((parts[0]?.[0] || "") + (parts[1]?.[0] || "")).toUpperCase() || "?"
}

function formatLastActivity(value) {
  if (!value) return "—"
  const date = new Date(value)
  if (Number.isNaN(date.getTime())) return "—"
  return date.toLocaleString(undefined, { dateStyle: "medium", timeStyle: "short" })
}

export function StudentsTable() {
  const { id: courseId } = useParams()
  const [students, setStudents] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [search, setSearch] = useState("")
  const [dropdownOpen, setDropdownOpen] = useState(null)

  useEffect(() => {
    if (!courseId) {
      setLoading(false)
      setError("No course selected.")
      return
    }
    let cancelled = false
    setLoading(true)
    setError(null)
    courseApi
      .get(`/api/instructor/courses/${courseId}/students`)
      .then((data) => {
        if (!cancelled) setStudents(Array.isArray(data) ? data : [])
      })
      .catch((err) => {
        if (!cancelled) setError(err.message || "Failed to load students.")
      })
      .finally(() => {
        if (!cancelled) setLoading(false)
      })
    return () => {
      cancelled = true
    }
  }, [courseId])

  const toggleDropdown = (index) => {
    setDropdownOpen(dropdownOpen === index ? null : index)
  }

  const filteredStudents = students.filter((s) =>
    [s.username, s.email].some((field) =>
      field?.toLowerCase().includes(search.toLowerCase())
    )
  )

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
        <div className="flex items-center space-x-2">
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search students..."
            className="flex h-10 w-64 rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
          />
          <button className="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 border border-input bg-background hover:bg-accent hover:text-accent-foreground h-10 w-10">
            <Search className="h-4 w-4 text-[#333A2F]" />
          </button>
        </div>
        <div className="flex items-center space-x-2">
          <button className="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 border border-input bg-background hover:bg-accent hover:text-accent-foreground h-10 px-4 py-2">
            <Filter className="h-4 w-4 mr-2 text-[#333A2F]" />
            Filter
          </button>
          <button className="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 border border-input bg-background hover:bg-accent hover:text-accent-foreground h-10 px-4 py-2">
            <Download className="h-4 w-4 mr-2 text-[#333A2F]" />
            Export
          </button>
        </div>
      </div>

      <div className="rounded-lg border-0 shadow-sm bg-white overflow-x-auto">
        {loading ? (
          <div className="p-8 text-center text-gray-500 text-sm">Loading students…</div>
        ) : error ? (
          <div className="p-8 text-center text-red-600 text-sm">{error}</div>
        ) : filteredStudents.length === 0 ? (
          <div className="p-8 text-center text-gray-500 text-sm">
            {students.length === 0 ? "No students enrolled yet." : "No students match your search."}
          </div>
        ) : (
          <table className="w-full caption-bottom text-sm">
            <thead className="[&_tr]:border-b">
              <tr className="border-b transition-colors hover:bg-muted/50 data-[state=selected]:bg-muted">
                <th className="h-12 px-4 text-left align-middle font-medium text-gray-600 [&:has([role=checkbox])]:pr-0">
                  Student
                </th>
                <th className="h-12 px-4 text-left align-middle font-medium text-gray-600 [&:has([role=checkbox])]:pr-0">
                  Progress
                </th>
                <th className="h-12 px-4 text-left align-middle font-medium text-gray-600 [&:has([role=checkbox])]:pr-0">
                  Last Activity
                </th>
                <th className="h-12 px-4 text-left align-middle font-medium text-gray-600 [&:has([role=checkbox])]:pr-0">
                  Assignments
                </th>
                <th className="h-12 px-4 text-left align-middle font-medium text-gray-600 [&:has([role=checkbox])]:pr-0">
                  Grade
                </th>
                <th className="h-12 px-4 text-left align-middle font-medium text-gray-600 [&:has([role=checkbox])]:pr-0">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="[&_tr:last-child]:border-0">
              {filteredStudents.map((student, index) => (
                <tr
                  key={student.enrollmentId || student.userId || index}
                  className="border-b transition-colors hover:bg-muted/50 data-[state=selected]:bg-muted"
                >
                  <td className="p-4 align-middle [&:has([role=checkbox])]:pr-0">
                    <div className="flex items-center space-x-3">
                      <div className="relative flex h-8 w-8 shrink-0 overflow-hidden rounded-full">
                        <div className="flex h-full w-full items-center justify-center rounded-full bg-[#EBEDDF] text-[#333A2F] font-medium">
                          {initials(student.username)}
                        </div>
                      </div>
                      <div>
                        <p className="font-medium text-gray-800">{student.username || "Unknown"}</p>
                        <p className="text-sm text-gray-500">{student.email}</p>
                      </div>
                    </div>
                  </td>
                  <td className="p-4 align-middle [&:has([role=checkbox])]:pr-0">
                    <div className="space-y-1">
                      <div className="flex justify-between text-sm">
                        <span className="text-gray-600">{Math.round(student.progress || 0)}%</span>
                      </div>
                      <div className="relative h-2 w-20 overflow-hidden rounded-full bg-gray-200">
                        <div
                          className="h-full bg-[#333A2F] transition-all duration-500 ease-in-out"
                          style={{ width: `${Math.min(100, Math.max(0, student.progress || 0))}%` }}
                        />
                      </div>
                    </div>
                  </td>
                  <td className="p-4 align-middle [&:has([role=checkbox])]:pr-0 text-gray-600">
                    {formatLastActivity(student.lastActivity)}
                  </td>
                  <td className="p-4 align-middle [&:has([role=checkbox])]:pr-0">
                    <span className="inline-flex items-center rounded-full border border-transparent px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 bg-[#EBEDDF] text-[#333A2F]">
                      {student.assignmentsCompleted ?? 0}/{student.totalAssignments ?? 0} completed
                    </span>
                  </td>
                  <td className="p-4 align-middle [&:has([role=checkbox])]:pr-0">
                    <span className="inline-flex items-center rounded-full border border-transparent px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 bg-[#333A2F] text-white">
                      {student.grade || "—"}
                    </span>
                  </td>
                  <td className="p-4 align-middle [&:has([role=checkbox])]:pr-0 relative">
                    <button
                      onClick={() => toggleDropdown(index)}
                      className="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 hover:bg-accent hover:text-accent-foreground h-10 w-10"
                    >
                      <MoreHorizontal className="h-4 w-4" />
                    </button>
                    {dropdownOpen === index && (
                      <div className="absolute right-0 mt-2 w-40 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 z-10">
                        <div className="py-1" role="menu" aria-orientation="vertical" aria-labelledby="options-menu">
                          <a href="#" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100" role="menuitem">
                            View Profile
                          </a>
                          <a href="#" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100" role="menuitem">
                            Send Message
                          </a>
                          <a href="#" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100" role="menuitem">
                            View Progress
                          </a>
                        </div>
                      </div>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  )
}
