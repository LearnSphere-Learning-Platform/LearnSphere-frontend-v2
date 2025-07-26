"use client"

import { BookOpen, Download } from "lucide-react"

export function DashboardHeader({ selectedTimeRange, onTimeRangeChange, course }) {
  if (!course) {
    return null // Or a loading state
  }

  return (
    <div className="bg-white border-b border-gray-200 px-6 py-6">
      <div className="max-w-7xl mx-auto">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-3">
              <div className="p-2 bg-[#EBEDDF] rounded-lg">
                <BookOpen className="h-6 w-6 text-[#333A2F]" />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-gray-800">{course.course_name}</h1>
                <p className="text-gray-600">Published • {course.total_learners} students enrolled</p>
              </div>
            </div>
          </div>
          <div className="flex items-center space-x-3">
            <div className="relative">
              <select
                value={selectedTimeRange}
                onChange={(e) => onTimeRangeChange(e.target.value)}
                className="appearance-none block w-32 px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-1 focus:ring-[#333A2F] focus:border-[#333A2F] sm:text-sm bg-white pr-8"
              >
                <option value="7d">Last 7 days</option>
                <option value="30d">Last 30 days</option>
                <option value="90d">Last 90 days</option>
                <option value="1y">Last year</option>
              </select>
              <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
                  <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 6.757 7.586 5.343 9z" />
                </svg>
              </div>
            </div>
            <button className="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-[#333A2F] hover:bg-[#333A2F]/90 h-10 px-4 py-2 text-white">
              <Download className="h-4 w-4 mr-2" />
              Export Data
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
