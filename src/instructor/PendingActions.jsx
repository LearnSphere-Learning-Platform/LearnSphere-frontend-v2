"use client"

import { MessageSquare, FileCheck } from "lucide-react"

const systemStatus = [
  {
    icon: FileCheck,
    title: "All assignments auto-evaluated",
    description: "AI system processed 28 submissions today",
    action: "View Results",
    bgColor: "bg-white/50",
    borderColor: "border-gray-200",
    iconColor: "text-[#333A2F]",
    textColor: "text-[#333A2F]",
    descColor: "text-gray-600",
  },
  {
    icon: MessageSquare,
    title: "Discussion monitoring active",
    description: "8 new student interactions detected",
    action: "View Activity",
    bgColor: "bg-white/50",
    borderColor: "border-gray-200",
    iconColor: "text-[#333A2F]",
    textColor: "text-[#333A2F]",
    descColor: "text-gray-600",
  },
]

export function PendingActions() {
  return (
    <div className="rounded-lg border-0 shadow-sm bg-white p-6">
      <div className="pb-4">
        <h2 className="text-[#333A2F] text-lg font-semibold">System Status</h2>
        <p className="text-gray-600 text-sm">Automated processes and system updates</p>
      </div>
      <div className="space-y-3">
        {systemStatus.map((action, index) => (
          <div
            key={index}
            className={`flex items-center justify-between p-4 ${action.bgColor} rounded-lg border ${action.borderColor}`}
          >
            <div className="flex items-center space-x-3">
              <action.icon className={`h-5 w-5 ${action.iconColor}`} />
              <div>
                <p className={`font-medium ${action.textColor}`}>{action.title}</p>
                <p className={`text-sm ${action.descColor}`}>{action.description}</p>
              </div>
            </div>
            <button className="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 border border-gray-300 bg-transparent hover:bg-gray-100 h-9 px-3">
              {action.action}
            </button>
          </div>
        ))}
      </div>
    </div>
  )
}
