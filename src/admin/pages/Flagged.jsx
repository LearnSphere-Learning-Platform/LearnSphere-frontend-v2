// src/pages/admin/FlaggedReports.jsx

import { useState, useEffect } from "react";
import { DashboardLayout } from "../components/admin/DashboardLayout";
import { Card, CardContent } from "../components/ui/card";
import { AlertCircle } from "lucide-react";
import { Button } from "../components/ui/button";
import { Alert, AlertDescription, AlertTitle } from "../components/ui/alert";
import { discussionApi } from "../../services/api";

const FlaggedReports = () => {
  const [expandedCourse, setExpandedCourse] = useState(null);
  const [reports, setReports] = useState([]);
  const [loading, setLoading] = useState(true);

  // load the flagged discussions from the discussion service
  const loadReports = async () => {
    setLoading(true);
    try {
      const data = await discussionApi.get("/api/flags/flagged-discussions");
      setReports(
        (data || []).map((item) => ({
          id: item.discussionId,
          discussionId: item.discussionId,
          course: item.courseName || "Unknown course",
          content: item.content,
          flaggedBy: `User ${item.userId}`,
          flagCount: item.flagCount,
        }))
      );
    } catch (e) {
      console.warn("Could not load flagged discussions:", e.message);
    }
    setLoading(false);
  };

  useEffect(() => {
    loadReports();
  }, []);

  const toggleExpand = (course) => {
    setExpandedCourse(expandedCourse === course ? null : course);
  };

  // restore the post and clear its flags on the server
  const handleRestore = async (discussionId) => {
    try {
      await discussionApi.put(`/api/flags/discussion/${discussionId}/unhide`, {});
      setReports(reports.filter((r) => r.discussionId !== discussionId));
      alert("Post restored and flags cleared.");
    } catch (e) {
      alert(e.message || "Could not restore the post.");
    }
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

        {loading && <p className="text-gray-500">Loading flagged discussions...</p>}
        {!loading && coursesWithFlags.length === 0 && (
          <p className="text-gray-500">No flagged discussions right now.</p>
        )}

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
                          <div><strong className="text-[#333A2F]">Content:</strong> <span className="text-gray-600">{report.content}</span></div>
                          <div><strong className="text-[#333A2F]">Flags:</strong> <span className="text-gray-600">{report.flagCount}</span></div>
                        </div>

                        <div className="ml-4 mt-2 flex gap-2">
                          <Button
                            size="sm"
                            className="bg-[#333A2F] text-white font-bold rounded-lg hover:bg-[#2a3028]"
                            onClick={() => handleRestore(report.discussionId)}
                          >
                            Restore Post
                          </Button>
                        </div>
                      </div>
                    </div>
                  ))}

                  {courseData.count >= 3 && (
                    <Alert
                      variant="destructive"
                      className="mt-4 bg-[#EBEDDF] border-[#C8CBB8] text-[#333A2F] rounded-xl"
                    >
                      <AlertTitle className="text-[#333A2F] font-bold">Flag Threshold Reached</AlertTitle>
                      <AlertDescription className="text-gray-600">
                        This post has 3 or more flags and is hidden from students. Restore it if it is fine.
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
