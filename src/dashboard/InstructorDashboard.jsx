import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { BookOpen, Star, Users, Clock, TrendingUp } from "lucide-react";
import MyCourses from "./components/MyCourses";
import Announcements from "./components/Announcements";

const StatsCards = ({ stats }) => {
  const formatNumber = (num) => {
    if (num >= 1000000) {
      return (num / 1000000).toFixed(1) + "M";
    } else if (num >= 1000) {
      return (num / 1000).toFixed(0) + "K";
    }
    return num.toString();
  };

  const cards = [
    {
      title: "Total Courses",
      value: stats.totalCourses,
      icon: BookOpen,
      color: "text-blue-600",
      bgColor: "bg-blue-50",
    },
    {
      title: "Total Students",
      value: formatNumber(stats.totalStudents),
      icon: Users,
      color: "text-green-600",
      bgColor: "bg-green-50",
    },
    {
      title: "Average Rating",
      value: stats.averageRating.toFixed(1),
      icon: Star,
      color: "text-yellow-600",
      bgColor: "bg-yellow-50",
    },
    {
      title: "Published",
      value: stats.publishedCourses,
      icon: TrendingUp,
      color: "text-purple-600",
      bgColor: "bg-purple-50",
    },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
      {cards.map((card, index) => (
        <div
          key={index}
          className="bg-white rounded-lg shadow-sm p-6 hover:shadow-md transition-shadow"
        >
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600 mb-1">{card.title}</p>
              <p className="text-2xl font-bold text-gray-900">{card.value}</p>
            </div>
            <div className={`p-3 rounded-lg ${card.bgColor}`}>
              <card.icon className={`h-6 w-6 ${card.color}`} />
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

// Main Dashboard Component
const InstructorDashboard = ({ courses = [], onDeleteCourse }) => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("courses");

  const handleCreateCourse = () => {
    navigate("/course-adding");
  };

  const stats = {
    totalCourses: courses?.length || 0,
    totalStudents: courses.reduce((sum, course) => sum + course.students, 0),
    averageRating:
      courses?.length > 0
        ? courses.reduce((sum, course) => sum + course.rating, 0) /
          courses.length
        : 0,
    publishedCourses: courses?.filter((course) => course.status === "published")
      .length,
  };

  return (
    <div className="min-h-screen bg-[#EBEDDF]">
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <StatsCards stats={stats} />

        {/* Navigation Tabs */}
        <div className="bg-white rounded-lg shadow-sm mb-6">
          <div className="px-6 py-4 border-b border-gray-200">
            <div className="flex space-x-2">
              <button
                onClick={() => setActiveTab("courses")}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                  activeTab === "courses"
                    ? "bg-gray-800 text-white"
                    : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                }`}
              >
                My Courses
              </button>
              <button
                onClick={() => setActiveTab("announcements")}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                  activeTab === "announcements"
                    ? "bg-gray-800 text-white"
                    : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                }`}
              >
                Announcements
              </button>
            </div>
          </div>
        </div>

        {/* Tab Content */}
        {activeTab === "courses" && (
          <MyCourses
            courses={courses}
            onCreateCourse={handleCreateCourse}
            onDeleteCourse={onDeleteCourse}
          />
        )}

        {activeTab === "announcements" && <Announcements />}
      </main>
    </div>
  );
};

export default InstructorDashboard;
