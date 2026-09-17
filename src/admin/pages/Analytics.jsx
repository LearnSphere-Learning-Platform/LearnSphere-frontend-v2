import React, { useState, useEffect } from "react"
import { DashboardLayout } from "../components/admin/DashboardLayout"
import { Card, CardContent, CardHeader, CardTitle } from "../components/ui/card"
import { Badge } from "../components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../components/ui/tabs"
import { BarChart3, TrendingUp, Users, BookOpen, Award } from "lucide-react"
import { enrollmentApi } from "../../services/api"

// Course Performance Metrics and the Student Analytics tab were previously 100% invented
// numbers (87% completion, 4.7 rating, "2.4h avg study time", "60% Mobile", "Tuesday" as the
// most active day, etc.) with zero backing data or API calls. The enrollment service's
// AnalyticsController does have a real course-performance endpoint - wired that in below.
// What's still missing: there is no session/activity tracking anywhere in this codebase (no
// timestamps for when a user studies, no device/user-agent capture), so study time, peak
// hours, and mobile-vs-desktop genuinely cannot be computed from anything that exists today.
// Rather than keep showing fabricated numbers for those, the Student Analytics tab now says so
// plainly instead of a plausible-looking fake number - building that out for real means adding
// session-tracking to the frontend and a new endpoint to store it, which is a separate feature.
const Analytics = () => {
  const [metrics, setMetrics] = useState({
    totalEnrollments: 0,
    courseCompletionRate: 0,
    activeCourses: 0,
  })
  const [topCourses, setTopCourses] = useState([])
  const [performance, setPerformance] = useState({
    avgCompletionRate: 0,
    avgCourseRating: 0,
    courseDetails: [],
  })
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const load = async () => {
      try {
        const [metricsData, topData, performanceData] = await Promise.all([
          enrollmentApi.get("/api/analytics/metrics"),
          enrollmentApi.get("/api/analytics/courses/top-performing?limit=5"),
          enrollmentApi.get("/api/analytics/course-performance"),
        ])
        setMetrics({
          totalEnrollments: metricsData.totalEnrollments || 0,
          courseCompletionRate: metricsData.courseCompletionRate || 0,
          activeCourses: metricsData.activeCourses || 0,
        })
        setTopCourses(
          (topData || []).map((c) => ({
            name: c.courseName || c.course_name || "Course",
            enrollments: c.enrollments || c.students || 0,
            completion: Math.round(c.completionRate || c.completion_rate || 0),
          }))
        )
        const courseDetails = performanceData.courseDetails || []
        setPerformance({
          avgCompletionRate: performanceData.avgCompletionRate || 0,
          avgCourseRating: performanceData.avgCourseRating || 0,
          // highPerformingCourses/needsImprovementCourses come back from the backend as
          // hardcoded mock values (3 and 2, always) - counting from the real per-course
          // breakdown instead, using the same >85%/<75% thresholds the labels already promise.
          highPerforming: courseDetails.filter((c) => (c.completionRate || 0) > 85).length,
          needsImprovement: courseDetails.filter((c) => (c.completionRate || 0) < 75).length,
        })
      } catch (e) {
        console.warn("Could not load analytics:", e.message)
      } finally {
        setLoading(false)
      }
    }
    load()
  }, [])

  const overviewStats = [
    {
      title: "Total Enrollments",
      value: metrics.totalEnrollments.toLocaleString(),
      icon: Users,
    },
    {
      title: "Course Completion",
      value: `${Math.round(metrics.courseCompletionRate)}%`,
      icon: Award,
    },
    {
      title: "Active Courses",
      value: String(metrics.activeCourses),
      icon: BookOpen,
    },
  ]

  return (
    <DashboardLayout>
      <div className="space-y-8 p-6">
        {/* Header */}
        <div>
          <h1 className="text-3xl font-bold text-[#333A2F]">Analytics</h1>
          <p className="text-gray-600">Comprehensive learning insights and metrics</p>
        </div>

        {/* Overview Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {overviewStats.map((stat, index) => (
            <Card key={index} className="bg-white rounded-xl shadow-xl border border-gray-200 transition-all duration-300">
              <CardContent className="p-8">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">{stat.title}</p>
                    <p className="text-2xl font-bold text-[#333A2F]">
                      {loading ? "..." : stat.value}
                    </p>
                  </div>
                  <div className="p-3 bg-[#C8CBB8] rounded-lg">
                    <stat.icon className="w-6 h-6 text-[#333A2F]" />
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Analytics Tabs */}
        <Tabs defaultValue="courses" className="space-y-4">
          <TabsList>
            <TabsTrigger value="courses">Course Performance</TabsTrigger>
            <TabsTrigger value="students">Student Analytics</TabsTrigger>
          </TabsList>

          <TabsContent value="courses" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Top Performing Courses */}
              <Card className="bg-white rounded-xl shadow-xl border border-gray-200">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-[#333A2F]">
                    <BarChart3 className="w-5 h-5 text-[#333A2F]" />
                    Top Performing Courses
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  {loading ? (
                    <p className="text-sm text-gray-500">Loading...</p>
                  ) : topCourses.length === 0 ? (
                    <p className="text-sm text-gray-500">No enrollment data yet.</p>
                  ) : (
                    <div className="space-y-4">
                      {topCourses.map((course, index) => (
                        <div key={index} className="flex items-center justify-between p-3 bg-[#EBEDDF] rounded-lg">
                          <div>
                            <p className="font-medium text-sm text-[#333A2F]">{course.name}</p>
                            <p className="text-xs text-gray-600">{course.enrollments} enrollments</p>
                          </div>
                          <Badge variant="outline" className="border-[#C8CBB8] text-[#fff] bg-[#333A2F]">{course.completion}% completion</Badge>
                        </div>
                      ))}
                    </div>
                  )}
                </CardContent>
              </Card>

              {/* Course Performance Metrics */}
              <Card className="bg-white rounded-xl shadow-xl border border-gray-200">
                <CardHeader>
                  <CardTitle className="text-[#333A2F]">Course Performance Metrics</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                      <div className="p-3 bg-[#EBEDDF] rounded-lg text-center">
                        <p className="text-2xl font-bold text-[#333A2F]">
                          {loading ? "..." : `${Math.round(performance.avgCompletionRate)}%`}
                        </p>
                        <p className="text-sm text-gray-600">Avg Completion Rate</p>
                      </div>
                      <div className="p-3 bg-[#C8CBB8] rounded-lg text-center">
                        <p className="text-2xl font-bold text-[#333A2F]">
                          {loading ? "..." : performance.avgCourseRating.toFixed(1)}
                        </p>
                        <p className="text-sm text-gray-600">Avg Course Rating</p>
                      </div>
                    </div>
                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span className="text-[#333A2F]">High Performing Courses</span>
                        <span className="font-medium text-[#333A2F]">
                          {loading ? "..." : `${performance.highPerforming} courses (>85% completion)`}
                        </span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="text-[#333A2F]">Needs Improvement</span>
                        <span className="font-medium text-[#333A2F]">
                          {loading ? "..." : `${performance.needsImprovement} courses (<75% completion)`}
                        </span>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="students" className="space-y-6">
            <Card className="bg-white rounded-xl shadow-xl border border-gray-200">
              <CardContent className="p-8 text-center">
                <TrendingUp className="w-8 h-8 mx-auto mb-3 text-gray-400" />
                <p className="text-gray-600 font-medium">Student behavior analytics isn't tracked yet</p>
                <p className="text-sm text-gray-500 mt-1 max-w-md mx-auto">
                  Study time, peak learning hours, session length, and device breakdown all need
                  activity tracking that doesn't exist in the backend yet - this used to show
                  invented numbers instead of leaving this blank.
                </p>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </DashboardLayout>
  )
}

export default Analytics
