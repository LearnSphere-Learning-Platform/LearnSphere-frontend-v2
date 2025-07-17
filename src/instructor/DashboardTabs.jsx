"use client"

import { useState } from "react"
import { RecentActivity } from "./RecentActivity"
import { CourseProgress } from "./CourseProgress"
import { PendingActions } from "./PendingActions"
import { StudentsTable } from "./StudentsTable"
import { AssignmentsOverview } from "./AssignmentsOverview"
import { AnalyticsView } from "./AnalyticsView"
import { CourseContentOverview, CourseOverviewStats } from "./CourseContentOverview"

export function DashboardTabs({ course }) {
  const [activeTab, setActiveTab] = useState("overview")

  const tabs = [
    { name: "Overview", value: "overview" },
    { name: "Students", value: "students" },
    { name: "Assignments", value: "assignments" },
    { name: "Discussions", value: "discussions" },
    { name: "Analytics", value: "analytics" },
    { name: "Content", value: "content" },
  ]

  return (
    <div className="space-y-6">
      <div className="grid w-full grid-cols-6 bg-white border border-gray-200 rounded-md overflow-hidden">
        {tabs.map((tab) => (
          <button
            key={tab.value}
            onClick={() => setActiveTab(tab.value)}
            className={`py-3 px-4 text-sm font-medium text-center transition-colors duration-200
              ${activeTab === tab.value ? "bg-[#EBEDDF] text-[#333A2F]" : "text-gray-600 hover:bg-gray-50"}
            `}
          >
            {tab.name}
          </button>
        ))}
      </div>

      {activeTab === "overview" && (
        <div className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <RecentActivity />
            <CourseProgress />
          </div>
          <PendingActions />
        </div>
      )}

      {activeTab === "students" && (
        <div className="space-y-6">
          <StudentsTable />
        </div>
      )}

      {activeTab === "assignments" && (
        <div className="space-y-6">
          <AssignmentsOverview />
        </div>
      )}

      {activeTab === "discussions" && (
        <div className="text-center py-12">
          <p className="text-gray-500">Discussion management coming soon...</p>
        </div>
      )}

      {activeTab === "analytics" && (
        <div className="space-y-6">
          <AnalyticsView />
        </div>
      )}

      {activeTab === "content" && (
        <div className="space-y-6">
          <CourseOverviewStats course={course} />
          <CourseContentOverview course={course} />
        </div>
      )}
    </div>
  )
}
