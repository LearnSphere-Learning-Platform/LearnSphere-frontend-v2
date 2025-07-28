import React, { useState } from "react";
import {
  BookOpen,
  Plus,
  Search,
  Eye,
  Edit,
  Trash2,
  Star,
  Users,
  Clock,
} from "lucide-react";
import { useNavigate } from "react-router-dom";

const CourseCard = ({ course, onDelete, onEdit }) => {
  const navigate = useNavigate();

  const handleViewCourse = () => {
    navigate(`/instructor/course/${course.id}`);
  };

  const getStatusBadge = (status) => {
    const badges = {
      published: "bg-green-100 text-green-800",
      draft: "bg-yellow-100 text-yellow-800",
      intermediate: "bg-orange-100 text-orange-800",
      advanced: "bg-red-100 text-red-800",
      beginner: "bg-blue-100 text-blue-800",
    };

    return (
      <span
        className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
          badges[status] || "bg-gray-100 text-gray-800"
        }`}
      >
        {status}
      </span>
    );
  };

  return (
    <div className="bg-white border border-gray-200 rounded-lg overflow-hidden hover:shadow-md transition-shadow">
      {/* Status Badge */}
      <div className="p-4 pb-2">{getStatusBadge(course.status)}</div>

      {/* Course Image */}
      <div className="px-4 pb-4">
        <div className="aspect-video bg-gray-200 rounded-lg overflow-hidden">
          <img
            src={
              course.image ||
              course.image_url ||
              "https://via.placeholder.com/300x200?text=Course"
            }
            alt={course.title || course.course_name || "Course"}
            className="w-full h-full object-cover"
          />
        </div>
      </div>

      {/* Course Info */}
      <div className="p-4 pt-0">
        <h3 className="text-lg font-semibold text-gray-900 mb-2 line-clamp-2">
          {course.title || course.course_name || "Untitled Course"}
        </h3>
        <p className="text-gray-600 text-sm mb-4 line-clamp-2">
          {course.description ||
            course.about_course?.complete_description ||
            "No description available"}
        </p>

        {/* Stats */}
        <div className="flex items-center space-x-4 mb-4 text-sm text-gray-500">
          <div className="flex items-center space-x-1">
            <Star className="h-4 w-4 text-yellow-400 fill-current" />
            <span>{course.rating || course.course_rating || 0}</span>
          </div>
          <div className="flex items-center space-x-1">
            <Users className="h-4 w-4" />
            <span>{(course.students || 0).toLocaleString()}</span>
          </div>
          <div className="flex items-center space-x-1">
            <Clock className="h-4 w-4" />
            <span>
              {course.duration ||
                course.total_hours ||
                course.total_no_hours ||
                "0h 0m"}
            </span>
          </div>
        </div>

        {/* Actions */}
        <div className="flex space-x-2">
          <button
            onClick={handleViewCourse}
            className="flex-1 bg-gray-50 border border-gray-200 text-gray-700 px-3 py-2 rounded-md text-sm font-medium hover:bg-gray-100 transition-colors flex items-center justify-center space-x-2 cursor-pointer"
          >
            <Eye className="h-4 w-4" />
            <span>View Course</span>
          </button>
          <button
            onClick={() => onEdit(course)}
            className="p-2 text-gray-500 hover:text-blue-600 hover:bg-blue-50 rounded-md transition-colors cursor-pointer"
          >
            <Edit className="h-4 w-4" />
          </button>
          <button
            onClick={() => onDelete(course.id)}
            className="p-2 text-gray-500 hover:text-red-600 hover:bg-red-50 rounded-md transition-colors cursor-pointer"
          >
            <Trash2 className="h-4 w-4" />
          </button>
        </div>
      </div>
    </div>
  );
};

const MyCourses = ({
  courses = [],
  onCreateCourse,
  onEditCourse,
  onDeleteCourse,
}) => {
  const [searchTerm, setSearchTerm] = useState("");

  const filteredCourses = courses.filter((course) => {
    const title = (course.title || course.course_name || "").toLowerCase();
    const description = (
      course.description ||
      course.about_course?.complete_description ||
      ""
    ).toLowerCase();
    const search = searchTerm.toLowerCase();

    return title.includes(search) || description.includes(search);
  });

  return (
    <div className="bg-white rounded-lg shadow-sm">
      {/* Header */}
      <div className="px-6 py-4 border-b border-gray-200">
        <div className="flex justify-between items-start">
          <div>
            <h2 className="text-xl font-bold text-gray-900 mb-1">My Courses</h2>
            <p className="text-gray-600">
              Manage and track your course content
            </p>
          </div>
          <button
            onClick={onCreateCourse}
            className="bg-gray-800 text-white px-4 py-2 rounded-lg hover:bg-gray-700 transition-colors flex items-center space-x-2 cursor-pointer"
          >
            <Plus className="h-4 w-4" />
            <span>Create Course</span>
          </button>
        </div>
      </div>

      {/* Search */}
      <div className="p-6 border-b border-gray-200">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
          <input
            type="text"
            placeholder="Search courses..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>
      </div>

      {/* Course Grid */}
      <div className="p-6">
        {filteredCourses.length === 0 ? (
          <div className="text-center py-12">
            <BookOpen className="mx-auto h-12 w-12 text-gray-400 mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">
              No courses found
            </h3>
            <p className="text-gray-500 mb-6">
              {searchTerm
                ? "Try adjusting your search terms"
                : "Get started by creating your first course"}
            </p>
            {!searchTerm && (
              <button
                onClick={onCreateCourse}
                className="bg-gray-800 text-white px-4 py-2 rounded-lg hover:bg-gray-700 transition-colors flex items-center space-x-2 mx-auto cursor-pointer"
              >
                <Plus className="h-4 w-4" />
                <span>Create Your First Course</span>
              </button>
            )}
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredCourses.map((course) => (
              <CourseCard
                key={course.id || course._id}
                course={course}
                onDelete={onDeleteCourse}
                onEdit={onEditCourse}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default MyCourses;
