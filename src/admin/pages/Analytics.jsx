import React from "react"
import { DashboardLayout } from "../components/admin/DashboardLayout"
import { Card, CardContent, CardHeader, CardTitle } from "../components/ui/card"
import { Badge } from "../components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../components/ui/tabs"
import { BarChart3, TrendingUp, Users, BookOpen, Clock, Award } from "lucide-react"

const Analytics = () => {
  const overviewStats = [
    {
      title: "Total Enrollments",
      value: "12,456",
      change: "+12%",
      trend: "up",
      icon: Users,
    },
    {
      title: "Course Completion",
      value: "87.5%",
      change: "+5.2%",
      trend: "up",
      icon: Award,
    },
    {
      title: "Avg. Study Time",
      value: "2.4 hrs",
      change: "-8%",
      trend: "down",
      icon: Clock,
    },
    {
      title: "Active Courses",
      value: "89",
      change: "+3",
      trend: "up",
      icon: BookOpen,
    },
  ]

  const topCourses = [
    { name: "Introduction to React", enrollments: 4500, completion: 92 },
    { name: "Advanced JavaScript", enrollments: 3800, completion: 88 },
    { name: "UI/UX Design", enrollments: 3000, completion: 85 },
    { name: "Data Science with Python", enrollments: 2500, completion: 80 },
    { name: "Machine Learning Basics", enrollments: 2000, completion: 78 },
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
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {overviewStats.map((stat, index) => (
            <Card key={index} className="bg-white rounded-xl shadow-xl border border-gray-200 transition-all duration-300">
              <CardContent className="p-8">
                <div className="flex items-center justify-between mb-4">
                  <div>
                    <p className="text-sm font-medium text-gray-600">{stat.title}</p>
                    <p className="text-2xl font-bold text-[#333A2F]">{stat.value}</p>
                    <div className="flex items-center gap-1 mt-1">
                      <TrendingUp
                        className={`w-4 h-4 ${stat.trend === 'up' ? 'text-green-600' : 'text-red-600'}`}
                      />
                      <span
                        className={`text-sm font-medium ${stat.trend === 'up' ? 'text-green-600' : 'text-red-600'}`}
                      >
                        {stat.change}
                      </span>
                    </div>
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
                        <p className="text-2xl font-bold text-[#333A2F]">87%</p>
                        <p className="text-sm text-gray-600">Avg Completion Rate</p>
                      </div>
                      <div className="p-3 bg-[#C8CBB8] rounded-lg text-center">
                        <p className="text-2xl font-bold text-[#333A2F]">4.7</p>
                        <p className="text-sm text-gray-600">Avg Course Rating</p>
                      </div>
                    </div>
                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span className="text-[#333A2F]">High Performing Courses</span>
                        <span className="font-medium text-[#333A2F]">12 courses (&gt;85% completion)</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="text-[#333A2F]">Needs Improvement</span>
                        <span className="font-medium text-[#333A2F]">3 courses (&lt;75% completion)</span>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="students" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card className="bg-white rounded-xl shadow-xl border border-gray-200">
                <CardHeader>
                  <CardTitle className="text-[#333A2F]">Student Behavior Analytics</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                      <div className="p-3 bg-[#EBEDDF] rounded-lg text-center">
                        <p className="text-2xl font-bold text-[#333A2F]">2.4h</p>
                        <p className="text-sm text-gray-600">Avg Daily Study Time</p>
                      </div>
                      <div className="p-3 bg-[#C8CBB8] rounded-lg text-center">
                        <p className="text-2xl font-bold text-[#333A2F]">78%</p>
                        <p className="text-sm text-gray-600">Assignment Completion</p>
                      </div>
                    </div>
                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span className="text-[#333A2F]">Active Learners (Weekly)</span>
                        <span className="font-medium text-[#333A2F]">1,847 students</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="text-[#333A2F]">Course Completion Rate</span>
                        <span className="font-medium text-[#333A2F]">72% within deadline</span>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-white rounded-xl shadow-xl border border-gray-200">
                <CardHeader>
                  <CardTitle className="text-[#333A2F]">Learning Patterns</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span className="text-[#333A2F]">Peak Learning Hours</span>
                        <span className="font-medium text-[#333A2F]">2 PM - 6 PM</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="text-[#333A2F]">Most Active Day</span>
                        <span className="font-medium text-[#333A2F]">Tuesday</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="text-[#333A2F]">Avg Session Duration</span>
                        <span className="font-medium text-[#333A2F]">45 minutes</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="text-[#333A2F]">Mobile vs Desktop</span>
                        <span className="font-medium text-[#333A2F]">60% Mobile</span>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </DashboardLayout>
  )
}

export default Analytics
