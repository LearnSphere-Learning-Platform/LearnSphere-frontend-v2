"use client"

import { Play, FileText, Star } from "lucide-react"

const engagementData = [
  { label: "Video Watch Time", value: "78% avg completion" },
  { label: "Quiz Attempts", value: "2.3 avg attempts" },
  { label: "Discussion Participation", value: "65% active" },
  { label: "Resource Downloads", value: "234 total" },
]

const performanceData = [
  { label: "Course Completion Rate", value: "68%", color: "text-[#333A2F]" },
  { label: "Student Satisfaction", value: "4.8/5.0", color: "text-gray-800" },
  { label: "Drop-off Rate", value: "15%", color: "text-red-600" },
  { label: "Certificate Earned", value: "576", color: "text-[#333A2F]" },
]

const contentPerformance = [
  {
    title: "Introduction to React",
    icon: Play,
    views: 823,
    completion: 92,
    timeSpent: "12m 34s",
    rating: 4.9,
  },
  {
    title: "JSX and Components",
    icon: FileText,
    views: 756,
    completion: 78,
    timeSpent: "18m 22s",
    rating: 4.7,
  },
]

export function AnalyticsView() {
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="rounded-lg border-0 shadow-sm bg-white p-6">
          <div className="pb-4">
            <h2 className="text-gray-800 text-lg font-semibold">Engagement Analytics</h2>
            <p className="text-gray-600 text-sm">Student interaction with course content</p>
          </div>
          <div className="space-y-4">
            {engagementData.map((item, index) => (
              <div key={index} className="flex items-center justify-between">
                <span className="text-sm font-medium text-gray-700">{item.label}</span>
                <span className="text-sm text-gray-500">{item.value}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="rounded-lg border-0 shadow-sm bg-white p-6">
          <div className="pb-4">
            <h2 className="text-gray-800 text-lg font-semibold">Performance Metrics</h2>
            <p className="text-gray-600 text-sm">Course and student performance data</p>
          </div>
          <div className="space-y-4">
            {performanceData.map((item, index) => (
              <div key={index} className="flex items-center justify-between">
                <span className="text-sm font-medium text-gray-700">{item.label}</span>
                <span className={`text-sm font-semibold ${item.color}`}>{item.value}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="rounded-lg border-0 shadow-sm bg-white overflow-hidden">
        <div className="p-6 pb-4">
          <h2 className="text-gray-800 text-lg font-semibold">Content Performance</h2>
          <p className="text-gray-600 text-sm">How individual lessons and modules are performing</p>
        </div>
        <table className="w-full caption-bottom text-sm">
          <thead className="[&_tr]:border-b">
            <tr className="border-b transition-colors hover:bg-muted/50 data-[state=selected]:bg-muted">
              <th className="h-12 px-4 text-left align-middle font-medium text-gray-600 [&:has([role=checkbox])]:pr-0">
                Content
              </th>
              <th className="h-12 px-4 text-left align-middle font-medium text-gray-600 [&:has([role=checkbox])]:pr-0">
                Views
              </th>
              <th className="h-12 px-4 text-left align-middle font-medium text-gray-600 [&:has([role=checkbox])]:pr-0">
                Completion Rate
              </th>
              <th className="h-12 px-4 text-left align-middle font-medium text-gray-600 [&:has([role=checkbox])]:pr-0">
                Avg. Time Spent
              </th>
              <th className="h-12 px-4 text-left align-middle font-medium text-gray-600 [&:has([role=checkbox])]:pr-0">
                Student Rating
              </th>
            </tr>
          </thead>
          <tbody className="[&_tr:last-child]:border-0">
            {contentPerformance.map((content, index) => (
              <tr key={index} className="border-b transition-colors hover:bg-muted/50 data-[state=selected]:bg-muted">
                <td className="p-4 align-middle [&:has([role=checkbox])]:pr-0">
                  <div className="flex items-center space-x-2">
                    <content.icon className="h-4 w-4 text-[#333A2F]" />
                    <span className="text-gray-800">{content.title}</span>
                  </div>
                </td>
                <td className="p-4 align-middle [&:has([role=checkbox])]:pr-0 text-gray-600">{content.views}</td>
                <td className="p-4 align-middle [&:has([role=checkbox])]:pr-0">
                  <div className="flex items-center space-x-2">
                    <div className="relative h-2 w-16 overflow-hidden rounded-full bg-gray-200">
                      <div
                        className="h-full bg-[#333A2F] transition-all duration-500 ease-in-out"
                        style={{ width: `${content.completion}%` }}
                      />
                    </div>
                    <span className="text-sm text-gray-600">{content.completion}%</span>
                  </div>
                </td>
                <td className="p-4 align-middle [&:has([role=checkbox])]:pr-0 text-gray-600">{content.timeSpent}</td>
                <td className="p-4 align-middle [&:has([role=checkbox])]:pr-0">
                  <div className="flex items-center space-x-1">
                    <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                    <span className="text-gray-600">{content.rating}</span>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
