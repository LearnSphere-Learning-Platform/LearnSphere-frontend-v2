"use client"

const activities = [
  {
    user: "John Doe",
    avatar: "JD",
    action: 'completed "React Hooks"',
    time: "2 hours ago",
  },
  {
    user: "Sarah Miller",
    avatar: "SM",
    action: "submitted Assignment 3",
    time: "4 hours ago",
  },
  {
    user: "Mike Johnson",
    avatar: "MJ",
    action: "left a 5-star review",
    time: "6 hours ago",
  },
  {
    user: "Emma Wilson",
    avatar: "EW",
    action: 'started "State Management"',
    time: "8 hours ago",
  },
]

export function RecentActivity() {
  return (
    <div className="rounded-lg border-0 shadow-sm bg-white p-6">
      <div className="pb-4">
        <h2 className="text-gray-800 text-lg font-semibold">Recent Activity</h2>
        <p className="text-gray-600 text-sm">Latest student interactions with your course</p>
      </div>
      <div className="space-y-4">
        {activities.map((activity, index) => (
          <div key={index} className="flex items-center space-x-3">
            <div className="relative flex h-8 w-8 shrink-0 overflow-hidden rounded-full">
              <img
                className="aspect-square h-full w-full"
                alt={activity.user}
                src="/placeholder.svg?height=32&width=32"
              />
              <div className="flex h-full w-full items-center justify-center rounded-full bg-white/50 text-[#333A2F] text-xs font-medium">
                {activity.avatar}
              </div>
            </div>
            <div className="flex-1">
              <p className="text-sm font-medium text-gray-800">
                {activity.user} {activity.action}
              </p>
              <p className="text-xs text-gray-500">{activity.time}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
