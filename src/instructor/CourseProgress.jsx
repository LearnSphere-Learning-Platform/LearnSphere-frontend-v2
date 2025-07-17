"use client"

const progressData = [
  { title: "Introduction to React", progress: 92 },
  { title: "Components & Props", progress: 78 },
  { title: "State & Lifecycle", progress: 65 },
  { title: "Hooks", progress: 43 },
  { title: "Context API", progress: 28 },
]

export function CourseProgress() {
  return (
    <div className="rounded-lg border-0 shadow-sm bg-white p-6">
      <div className="pb-4">
        <h2 className="text-[#333A2F] text-lg font-semibold">Course Progress Overview</h2>
        <p className="text-gray-600 text-sm">How students are progressing through your course</p>
      </div>
      <div className="space-y-4">
        {progressData.map((item, index) => (
          <div key={index} className="space-y-2">
            <div className="flex justify-between text-sm">
              <span className="text-gray-700 font-medium">{item.title}</span>
              <span className="text-gray-500">{item.progress}% completed</span>
            </div>
            <div className="relative h-2 w-full overflow-hidden rounded-full bg-gray-200">
              <div
                className="h-full bg-[#333A2F] transition-all duration-500 ease-in-out"
                style={{ width: `${item.progress}%` }}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
