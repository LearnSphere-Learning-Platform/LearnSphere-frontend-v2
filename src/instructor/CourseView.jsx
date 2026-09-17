"use client";

import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

import { DashboardHeader } from "./DashboardHeader.jsx";
import { MetricsCards } from "./MetricsCards.jsx";
import { DashboardTabs } from "./DashboardTabs.jsx";
import { courseApi } from "../services/api.js";

// Adapts the real backend's InstructorCourseResponse (course/InstructorController
// GET /api/instructor/courses/{courseId}) into the shape DashboardHeader, MetricsCards
// and CourseContentOverview already expect (they were originally built against the
// CourseData.jsx mock, so we keep that shape here instead of touching those files).
function adaptCourseResponse(res) {
  if (!res) return null;
  return {
    course_name: res.courseName,
    total_learners: res.totalEnrolledStudents,
    course_rating: res.averageRating,
    instructor: {
      total_reviews: res.totalReviews,
    },
    no_of_sessions: res.totalSessions,
    total_hours: res.totalHours,
    course_content: (res.modules || []).map((module) => ({
      session: module.moduleTitle,
      module_description: module.moduleDescription,
      videos: (module.contents || []).map((content) => ({
        id: content.contentId,
        title: content.title,
        duration: content.duration,
        type: content.type,
        preview: false,
      })),
    })),
  };
}

export default function CourseView() {
  const { id } = useParams();
  const [selectedTimeRange, setSelectedTimeRange] = useState("7d");
  const [course, setCourse] = useState(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let cancelled = false;

    async function loadCourse() {
      setLoading(true);
      setError("");
      try {
        const res = await courseApi.get(`/api/instructor/courses/${id}`);
        if (!cancelled) {
          setCourse(adaptCourseResponse(res));
        }
      } catch (err) {
        if (!cancelled) {
          setError(err.message || "Failed to load course data.");
        }
      } finally {
        if (!cancelled) {
          setLoading(false);
        }
      }
    }

    if (id) {
      loadCourse();
    }

    return () => {
      cancelled = true;
    };
  }, [id]);

  if (loading) {
    return (
      <div className="min-h-screen bg-[#EBEDDF] flex items-center justify-center">
        <p className="text-gray-600">Loading course data...</p>
      </div>
    );
  }

  if (error || !course) {
    return (
      <div className="min-h-screen bg-[#EBEDDF] flex items-center justify-center">
        <p className="text-gray-600">
          {error || "Course not found."}
        </p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#EBEDDF] mt-32">
      <DashboardHeader
        selectedTimeRange={selectedTimeRange}
        onTimeRangeChange={setSelectedTimeRange}
        course={course}
      />
      <div className="max-w-7xl mx-auto p-6">
        <div className="space-y-8">
          <MetricsCards course={course} />
          <DashboardTabs course={course} />
        </div>
      </div>
    </div>
  );
}
