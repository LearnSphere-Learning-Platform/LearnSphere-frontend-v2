// src/pages/admin/FlaggedReports.jsx

import { useState } from "react";
import { DashboardLayout } from "../components/admin/DashboardLayout";
import { Card, CardContent } from "../components/ui/card";
import { AlertCircle } from "lucide-react";
import { Button } from "../components/ui/button";
import { Alert, AlertDescription, AlertTitle } from "../components/ui/alert";

const initialReports = [
  {
    id: 1,
    course: "Python Basics",
    report: "Inappropriate content found in module 2",
    content: "This lesson is stupid and useless!",
    flaggedBy: "User789",
    date: "2025-07-17",
  },
  {
    id: 2,
    course: "JavaScript Essentials",
    report: "Spam link posted in discussion",
    content: "Check this amazing offer: http://spam-link.com",
    flaggedBy: "User456",
    date: "2025-07-16",
  },
  {
    id: 3,
    course: "Java Basics",
    report: "Harassment reported in forum",
    content: "@someone you're so dumb lol",
    flaggedBy: "User111",
    date: "2025-07-15",
  },
  ...Array.from({ length: 10 }).map((_, i) => ({
    id: 100 + i,
    course: "React Fundamentals",
    report: `Offensive comment ${i + 1}`,
    content: `Dummy content ${i + 1} flagged.`,
    flaggedBy: "User123",
    date: "2025-07-14",
  })),
];

const FlaggedReports = () => {
  const [expandedCourse, setExpandedCourse] = useState(null);
  const [reports, setReports] = useState(initialReports);

  const toggleExpand = (course) => {
    setExpandedCourse(expandedCourse === course ? null : course);
  };

  const handleRemoveContent = (reportId) => {
    const updated = reports.filter((r) => r.id !== reportId);
    setReports(updated);
  };

  const handleBlockUser = (user) => {
    const updated = reports.filter((r) => r.flaggedBy !== user);
    setReports(updated);
    alert(`User ${user} has been blocked and their reports have been removed.`);
  };

  const groupedByCourse = reports.reduce((acc, report) => {
    const course = report.course;
    if (!acc[course]) acc[course] = [];
    acc[course].push(report);
    return acc;
  }, {});

  const coursesWithFlags = Object.entries(groupedByCourse)
    .map(([course, reports]) => ({
      course,
      count: reports.length,
      reports,
    }))
    .sort((a, b) => b.count - a.count);

  return (
    <DashboardLayout>
      <div className="space-y-8 p-6 min-h-screen animate-fade-in">
        <div className="space-y-2">
          <h1 className="text-3xl font-bold flex items-center gap-3 text-[#333A2F]">
            <AlertCircle className="w-8 h-8 text-[#333A2F]" />
            Flagged Reports
          </h1>
          <p className="text-gray-600">
            Review reported courses with high flag counts.
          </p>
        </div>

        {coursesWithFlags.map((courseData) => (
          <Card key={courseData.course} className="transition bg-white rounded-xl shadow-xl border border-gray-200">
            <CardContent className="p-8 space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-semibold text-[#333A2F]">{courseData.course}</h3>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => toggleExpand(courseData.course)}
                  className="bg-[#EBEDDF] text-[#333A2F] font-bold rounded-lg hover:bg-[#C8CBB8] border-[#C8CBB8]"
                >
                  {courseData.count} Flag{courseData.count > 1 ? "s" : ""}
                </Button>
              </div>

              {expandedCourse === courseData.course && (
                <div className="mt-4 space-y-4">
                  {courseData.reports.map((report, index) => (
                    <div
                      key={index}
                      className="text-sm border border-[#C8CBB8] rounded-xl p-6 bg-[#EBEDDF]"
                    >
                      <div className="flex justify-between items-start">
                        <div className="space-y-2">
                          <div><strong className="text-[#333A2F]">User:</strong> <span className="text-gray-600">{report.flaggedBy}</span></div>
                          <div><strong className="text-[#333A2F]">Issue:</strong> <span className="text-gray-600">{report.report}</span></div>
                          <div><strong className="text-[#333A2F]">Content:</strong> <span className="text-gray-600">{report.content}</span></div>
                          <div><strong className="text-[#333A2F]">Date:</strong> <span className="text-gray-600">{report.date}</span></div>
                        </div>

                        <div className="ml-4 mt-2">
                          <Button
                            size="sm"
                            className="bg-[#333A2F] text-white font-bold rounded-lg hover:bg-[#2a3028]"
                            onClick={() => handleRemoveContent(report.id)}
                          >
                            Remove Content
                          </Button>
                        </div>
                      </div>
                    </div>
                  ))}

                  {courseData.count >= 10 && (
                    <div className="pt-2 flex justify-end">
                      <Button
                        size="sm"
                        className="bg-[#333A2F] text-white font-bold rounded-lg hover:bg-[#2a3028]"
                        onClick={() =>
                          handleBlockUser(courseData.reports[0].flaggedBy)
                        }
                      >
                        Block User
                      </Button>
                    </div>
                  )}

                  {courseData.count > 10 && (
                    <Alert
                      variant="destructive"
                      className="mt-4 bg-[#EBEDDF] border-[#C8CBB8] text-[#333A2F] rounded-xl"
                    >
                      <AlertTitle className="text-[#333A2F] font-bold">Flag Limit Exceeded</AlertTitle>
                      <AlertDescription className="text-gray-600">
                        This course has more than 10 flags.
                      </AlertDescription>
                    </Alert>
                  )}
                </div>
              )}
            </CardContent>
          </Card>
        ))}
      </div>
    </DashboardLayout>
  );
};

export default FlaggedReports;
