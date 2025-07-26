"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Bell, Edit } from "lucide-react"

export function AnnouncementsManagement({ announcements, courses }) {
  return (
    <div className="space-y-4">
      {announcements.map((announcement) => (
        <Card key={announcement.id} className="bg-white">
          <CardHeader>
            <div className="flex justify-between items-start">
              <div>
                <CardTitle className="text-lg" style={{ color: "#333A2F" }}>
                  {announcement.title}
                </CardTitle>
                <CardDescription style={{ color: "#333A2F" }}>
                  {announcement.date} •{" "}
                  {announcement.courseId
                    ? courses.find((c) => c.id === announcement.courseId)?.title || "Unknown Course"
                    : "General Announcement"}
                </CardDescription>
              </div>
              <Button variant="ghost" size="sm" className="hover:bg-gray-100">
                <Edit className="w-4 h-4" style={{ color: "#333A2F" }} />
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            <p style={{ color: "#333A2F" }}>{announcement.content}</p>
          </CardContent>
        </Card>
      ))}

      {announcements.length === 0 && (
        <div className="text-center py-12">
          <Bell className="w-12 h-12 mx-auto mb-4" style={{ color: "#333A2F" }} />
          <h3 className="text-lg font-medium mb-2" style={{ color: "#333A2F" }}>
            No announcements yet
          </h3>
          <p style={{ color: "#333A2F" }}>Create your first announcement to communicate with students.</p>
        </div>
      )}
    </div>
  )
}
