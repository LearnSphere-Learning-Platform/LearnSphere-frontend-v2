"use client"

import { PlayCircle, Clock, Users, BookOpen } from "lucide-react"

export function CourseContentOverview({ course }) {
  if (!course || !course.course_content) {
    return null // Or a loading state
  }

  const renderCourseContent = () => (
    <div>
      <h3 className="text-xl font-semibold text-[#333A2F] mb-4">Course Curriculum</h3>
      <div className="space-y-4">
        {course.course_content.map((session, sessionIndex) => (
          <div key={sessionIndex} className="border border-gray-200 rounded-lg overflow-hidden">
            <div className="bg-[#EBEDDF] p-4">
              <h4 className="font-semibold text-[#333A2F]">{session.session}</h4>
              <p className="text-sm text-gray-600 mt-1">{session.module_description}</p>
            </div>
            <div className="p-4">
              <div className="space-y-2">
                {session.videos.map((video, videoIndex) => (
                  <div
                    key={video.id}
                    className="flex items-center justify-between py-2 border-b border-gray-100 last:border-b-0"
                  >
                    <div className="flex items-center space-x-3">
                      <PlayCircle className="w-4 h-4 text-[#333A2F]" />
                      <div>
                        <p className="text-sm font-medium text-[#333A2F]">{video.title}</p>
                        <div className="flex items-center space-x-2 text-xs text-gray-500">
                          <Clock className="w-3 h-3" />
                          <span>{video.duration}</span>
                          <span className="capitalize bg-[#EBEDDF] px-2 py-0.5 rounded text-[#333A2F] text-xs font-semibold">
                            {video.type.replace("-", " ")}
                          </span>
                          {video.preview && (
                            <span className="inline-flex items-center rounded-full border border-[#333A2F] px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 text-[#333A2F]">
                              Preview
                            </span>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )

  return <div className="rounded-lg border-0 shadow-sm bg-white p-6">{renderCourseContent()}</div>
}

export function CourseOverviewStats({ course }) {
  if (!course) {
    return null // Or a loading state
  }

  const totalVideos = course.course_content.reduce((acc, session) => acc + session.videos.length, 0)

  return (
    <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
      <div className="rounded-lg border-0 shadow-sm bg-white p-4">
        <div className="flex items-center space-x-3">
          <div className="p-2 bg-white/50 rounded-lg">
            <BookOpen className="h-5 w-5 text-[#333A2F]" />
          </div>
          <div>
            <p className="text-sm text-gray-600">Total Sessions</p>
            <p className="text-lg font-semibold text-[#333A2F]">{course.no_of_sessions}</p>
          </div>
        </div>
      </div>

      <div className="rounded-lg border-0 shadow-sm bg-white p-4">
        <div className="flex items-center space-x-3">
          <div className="p-2 bg-white/50 rounded-lg">
            <Clock className="h-5 w-5 text-[#333A2F]" />
          </div>
          <div>
            <p className="text-sm text-gray-600">Total Hours</p>
            <p className="text-lg font-semibold text-[#333A2F]">{course.total_hours}h</p>
          </div>
        </div>
      </div>

      <div className="rounded-lg border-0 shadow-sm bg-white p-4">
        <div className="flex items-center space-x-3">
          <div className="p-2 bg-white/50 rounded-lg">
            <Users className="h-5 w-5 text-[#333A2F]" />
          </div>
          <div>
            <p className="text-sm text-gray-600">Enrolled Students</p>
            <p className="text-lg font-semibold text-[#333A2F]">{course.total_learners}</p>
          </div>
        </div>
      </div>

      <div className="rounded-lg border-0 shadow-sm bg-white p-4">
        <div className="flex items-center space-x-3">
          <div className="p-2 bg-white/50 rounded-lg">
            <PlayCircle className="h-5 w-5 text-[#333A2F]" />
          </div>
          <div>
            <p className="text-sm text-gray-600">Total Videos</p>
            <p className="text-lg font-semibold text-[#333A2F]">{totalVideos}</p>
          </div>
        </div>
      </div>
    </div>
  )
}
