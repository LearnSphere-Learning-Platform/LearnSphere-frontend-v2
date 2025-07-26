"use client"

import { BookOpen, TrendingUp, Award } from "lucide-react"

const assignmentStats = [
  { title: "Auto-Evaluated Today", value: "28", color: "text-[#333A2F]", icon: TrendingUp },
  { title: "Final Assessments", value: "15", color: "text-[#333A2F]", icon: Award },
  { title: "Average Grade", value: "87%", color: "text-gray-800", icon: BookOpen },
]

const assignments = [
  {
    title: "React Component Project",
    description: "Build a todo app",
    submissions: "45/50 submitted",
    evaluated: "45 auto-evaluated",
    avgGrade: "85%",
    type: "Project",
  },
  {
    title: "State Management Quiz",
    description: "Redux & Context API",
    submissions: "38/50 submitted",
    evaluated: "38 auto-evaluated",
    avgGrade: "92%",
    type: "Quiz",
  },
  {
    title: "Final Assessment",
    description: "Comprehensive React evaluation",
    submissions: "15/50 submitted",
    evaluated: "15 auto-evaluated",
    avgGrade: "89%",
    type: "Assessment",
  },
]

export function AssignmentsOverview() {
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {assignmentStats.map((stat, index) => (
          <div key={index} className="rounded-lg border-0 shadow-sm bg-white p-6">
            <div className="pb-2">
              <div className="flex items-center justify-between">
                <h3 className="text-sm font-medium text-gray-600">{stat.title}</h3>
                <div className="p-2 bg-white/50 rounded-lg">
                  <stat.icon className="h-4 w-4 text-[#333A2F]" />
                </div>
              </div>
            </div>
            <div>
              <div className={`text-2xl font-bold ${stat.color}`}>{stat.value}</div>
              <p className="text-xs text-gray-500">
                {stat.title === "Average Grade"
                  ? "Class average"
                  : stat.title === "Auto-Evaluated Today"
                    ? "Processed automatically"
                    : "Completed assessments"}
              </p>
            </div>
          </div>
        ))}
      </div>

      <div className="rounded-lg border-0 shadow-sm bg-white overflow-hidden">
        <div className="p-6 pb-4">
          <h2 className="text-[#333A2F] text-lg font-semibold">Assignment Overview</h2>
        </div>
        <table className="w-full caption-bottom text-sm">
          <thead className="[&_tr]:border-b">
            <tr className="border-b transition-colors hover:bg-muted/50 data-[state=selected]:bg-muted">
              <th className="h-12 px-4 text-left align-middle font-medium text-gray-600 [&:has([role=checkbox])]:pr-0">
                Assignment
              </th>
              <th className="h-12 px-4 text-left align-middle font-medium text-gray-600 [&:has([role=checkbox])]:pr-0">
                Type
              </th>
              <th className="h-12 px-4 text-left align-middle font-medium text-gray-600 [&:has([role=checkbox])]:pr-0">
                Submissions
              </th>
              <th className="h-12 px-4 text-left align-middle font-medium text-gray-600 [&:has([role=checkbox])]:pr-0">
                Auto-Evaluation
              </th>
              <th className="h-12 px-4 text-left align-middle font-medium text-gray-600 [&:has([role=checkbox])]:pr-0">
                Average Grade
              </th>
              <th className="h-12 px-4 text-left align-middle font-medium text-gray-600 [&:has([role=checkbox])]:pr-0">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="[&_tr:last-child]:border-0">
            {assignments.map((assignment, index) => (
              <tr key={index} className="border-b transition-colors hover:bg-muted/50 data-[state=selected]:bg-muted">
                <td className="p-4 align-middle [&:has([role=checkbox])]:pr-0">
                  <div>
                    <p className="font-medium text-[#333A2F]">{assignment.title}</p>
                    <p className="text-sm text-gray-500">{assignment.description}</p>
                  </div>
                </td>
                <td className="p-4 align-middle [&:has([role=checkbox])]:pr-0">
                  <span className="inline-flex items-center rounded-full border border-[#333A2F] px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 text-[#333A2F]">
                    {assignment.type}
                  </span>
                </td>
                <td className="p-4 align-middle [&:has([role=checkbox])]:pr-0">
                  <span className="inline-flex items-center rounded-full border border-transparent px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 bg-white/50 text-[#333A2F]">
                    {assignment.submissions}
                  </span>
                </td>
                <td className="p-4 align-middle [&:has([role=checkbox])]:pr-0">
                  <span className="inline-flex items-center rounded-full border border-green-200 px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 bg-green-100 text-green-800">
                    {assignment.evaluated}
                  </span>
                </td>
                <td className="p-4 align-middle [&:has([role=checkbox])]:pr-0 text-gray-600">{assignment.avgGrade}</td>
                <td className="p-4 align-middle [&:has([role=checkbox])]:pr-0">
                  <button className="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 border border-[#333A2F] text-[#333A2F] hover:bg-white/50 bg-transparent h-9 px-3">
                    View Details
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
