"use client";
import { useNavigate } from "react-router-dom";
import useSelectedCourse from "../hooks/useSelectedCourse";

const levelColors = {
  beginner: "bg-green-100 text-green-800",
  intermediate: "bg-yellow-100 text-yellow-800",
  advanced: "bg-red-100 text-red-800",
};

export function CourseCard({ course }) {
  const navigate = useNavigate();
  const [, updateSelectedCourse] = useSelectedCourse();

  const handleClick = () => {
    updateSelectedCourse(course);
    navigate(`/user/course/${course.id}`);
  };

  const handleEnroll = (e) => {
    e.stopPropagation();
    updateSelectedCourse(course);
    if (course.price > 0) {
      navigate(`/user/course/${course.id}/payment`);
    } else {
      navigate(`/user/course/${course.id}`);
    }
  };

  const learners = course.instructor?.total_learners
    ? Number(
        course.instructor.total_learners.replace(/,/g, "")
      ).toLocaleString()
    : "N/A";

  return (
    <div
      onClick={handleClick}
      className="bg-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-200 overflow-hidden group border border-gray-100"
    >
      {/* Image */}
      <div className="relative">
        <img
          src={course.image || "/placeholder.svg"}
          alt={course.course_name}
          className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-200"
        />
        <span
          className={`absolute top-3 right-3 px-2 py-1 rounded-full text-xs font-medium ${
            levelColors[course.level?.toLowerCase()] || ""
          }`}
        >
          {course.level}
        </span>
      </div>

      {/* Content */}
      <div className="p-4">
        <h3 className="font-semibold text-lg mb-2 text-[#333A2F] group-hover:text-[#2a3028] transition-colors line-clamp-2">
          {course.course_name}
        </h3>
        <p className="text-sm text-gray-600 mb-2 flex items-center gap-2">
          <img
            src={course.instructor?.avatar}
            alt={course.instructor?.name}
            className="w-6 h-6 rounded-full"
          />
          by {course.instructor?.name}
        </p>
        <p className="text-sm text-gray-500 mb-4 line-clamp-2">
          {course.description}
        </p>

        {/* Stats */}
        <div className="flex items-center gap-4 text-sm text-gray-500 mb-4">
          <div className="flex items-center gap-1">
            <svg
              className="w-4 h-4 text-yellow-400 fill-current"
              viewBox="0 0 20 20"
            >
              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
            </svg>
            <span>{course.course_rating || "N/A"}</span>
          </div>
          <div className="flex items-center gap-1">
            <svg
              className="w-4 h-4"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197m13.5-9a2.5 2.5 0 11-5 0 2.5 2.5 0 015 0z"
              />
            </svg>
            <span>{learners}</span>
          </div>
          <div className="flex items-center gap-1">
            <svg
              className="w-4 h-4"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
            <span>{course.total_hours || "?"} hrs</span>
          </div>
        </div>

        {/* Footer */}
        <div className="flex items-center justify-between">
          <div className="text-2xl font-bold text-[#333A2F]">
            {course.price === 0 ? "Free" : `₹${course.price}`}
          </div>
          <button
            type="button"
            className="bg-[#333A2F] hover:bg-[#2a3028] text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors"
            onClick={handleEnroll}
          >
            Enroll Now
          </button>
        </div>
      </div>
    </div>
  );
}
