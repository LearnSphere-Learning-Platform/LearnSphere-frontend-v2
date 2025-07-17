import React, { useState } from "react";
// import { useNavigate } from "react-router-dom";
import { BookOpen, Star, Users, Clock, TrendingUp } from "lucide-react";
import MyCourses from "./components/MyCourses";
import Announcements from "./components/Announcements";
import CourseAddingForm from "../instructor/CourseAddingForm";
import useAllCourses from "../hooks/useAllCourses"; // Import the hook

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
const InstructorDashboard = () => {
  // const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("courses");
  const [currentView, setCurrentView] = useState("dashboard"); // New state for view management
  const [editingCourse, setEditingCourse] = useState(null); // New state for editing course
  const initialCourses = useAllCourses(); // Use the hook to get initial courses
  const [courses, setCourses] = useState(initialCourses); // Local state for course management

  // Update local courses when hook data changes
  React.useEffect(() => {
    setCourses(initialCourses);
  }, [initialCourses]);

  const handleCreateCourse = () => {
    setEditingCourse(null);
    setCurrentView("form");
  };

  const handleEditCourse = (course) => {
    setEditingCourse(course);
    setCurrentView("form");
  };

  const handleBackToDashboard = () => {
    setCurrentView("dashboard");
    setEditingCourse(null);
  };

  const handleSaveCourse = (courseData) => {
    if (editingCourse) {
      // Update existing course
      setCourses((prevCourses) =>
        prevCourses.map((course) =>
          course.id === editingCourse.id
            ? {
                ...courseData,
                id: editingCourse.id,
                created_at: editingCourse.created_at,
                updated_at: new Date().toISOString(),
              }
            : course
        )
      );
    } else {
      // Create new course
      const newCourse = {
        ...courseData,
        id: Date.now(),
        created_at: new Date().toISOString(),
        status: "draft",
        rating: 0,
        students: 0,
        duration: courseData.total_no_hours || "0h",
      };
      setCourses((prevCourses) => [...prevCourses, newCourse]);
    }

    setCurrentView("dashboard");
    setEditingCourse(null);
  };

  const handleDeleteCourse = (courseId) => {
    if (window.confirm("Are you sure you want to delete this course?")) {
      setCourses((prevCourses) =>
        prevCourses.filter((course) => course.id !== courseId)
      );
    }
  };

  const stats = {
    totalCourses: courses.length,
    totalStudents: courses.reduce(
      (sum, course) => sum + (course.students || 0),
      0
    ),
    averageRating:
      courses.length > 0
        ? courses.reduce(
            (sum, course) => sum + (course.rating || course.course_rating || 0),
            0
          ) / courses.length
        : 0,
    publishedCourses: courses.filter((course) => course.status === "published")
      .length,
  };

  // If we're in form view, show the CourseAddingForm
  if (currentView === "form") {
    return (
      <CourseAddingForm
        editingCourse={editingCourse}
        onSave={handleSaveCourse}
        onCancel={handleBackToDashboard}
      />
    );
  }

  // Otherwise, show the dashboard
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
            onEditCourse={handleEditCourse}
            onDeleteCourse={handleDeleteCourse}
          />
        )}

        {activeTab === "announcements" && <Announcements />}
      </main>
    </div>
  );
};

export default InstructorDashboard;
