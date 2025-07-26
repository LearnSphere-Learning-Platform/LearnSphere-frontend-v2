"use client"

import { Users, DollarSign, TrendingUp, Star } from "lucide-react"

export function MetricsCards({ course }) {
  if (!course) {
    return null // Or a loading state
  }

  const metrics = [
    {
      title: "Total Students",
      value: course.total_learners || "N/A", // Use course data
      change: "+12%", // Static for now, as no dynamic change data in course object
      changeType: "positive",
      icon: Users,
      description: "from last month",
    },
    {
      title: "Course Revenue",
      value: "$42,350", // Static for now, as no revenue data in course object
      change: "+8%",
      changeType: "positive",
      icon: DollarSign,
      description: "from last month",
    },
    {
      title: "Completion Rate",
      value: "68%", // Static for now, as no completion rate data in course object
      change: "+3%",
      changeType: "positive",
      icon: TrendingUp,
      description: "from last month",
    },
    {
      title: "Average Rating",
      value: course.course_rating ? `${course.course_rating}` : "N/A", // Use course data
      change: course.instructor.total_reviews ? `${course.instructor.total_reviews} reviews` : "N/A reviews", // Use instructor reviews
      changeType: "neutral",
      icon: Star,
      description: "Based on reviews",
    },
  ]

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {metrics.map((metric, index) => (
        <div key={index} className="rounded-lg border-0 shadow-sm bg-white p-6">
          <div className="flex flex-row items-center justify-between space-y-0 pb-2">
            <h3 className="text-sm font-medium text-gray-600">{metric.title}</h3>
            <div className="p-2 bg-white/50 rounded-lg">
              <metric.icon className="h-4 w-4 text-[#333A2F]" />
            </div>
          </div>
          <div>
            <div className="text-2xl font-bold text-gray-800">{metric.value}</div>
            <p className="text-xs text-gray-500">
              <span className={`${metric.changeType === "positive" ? "text-[#333A2F]" : "text-gray-600"}`}>
                {metric.change}
              </span>{" "}
              {metric.description}
            </p>
          </div>
        </div>
      ))}
    </div>
  )
}
