"use client";

import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

import { DashboardHeader } from "./DashboardHeader.jsx";
import { MetricsCards } from "./MetricsCards.jsx";
import { DashboardTabs } from "./DashboardTabs.jsx";
import courseData from "../catalog/CourseData.jsx"; // Import the course data

export default function CourseView() {
  const { id } = useParams();
  const [selectedTimeRange, setSelectedTimeRange] = useState("7d");
  const [course, setCourse] = useState(null);

  useEffect(() => {
    console.log("Loaded Course ID:", id);
    const foundCourse = courseData.find((c) => c.id === Number(id));
    setCourse(foundCourse);
  }, [id]);

  if (!course) {
    return (
      <div className="min-h-screen bg-[#EBEDDF] flex items-center justify-center">
        <p className="text-gray-600">
          Loading course data or course not found...
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
