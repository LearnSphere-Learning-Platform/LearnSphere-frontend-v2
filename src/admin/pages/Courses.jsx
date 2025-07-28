import React, { useState, useEffect } from "react";
import { DashboardLayout } from "../components/admin/DashboardLayout";
import { useNavigate, useLocation } from "react-router-dom";
import {
  Search,
  Users,
  Clock,
  Star,
  Filter,
  MoreVertical,
  ChevronDown,
  BookOpen,
  Award,
  FileText,
  Play,
  Code,
  CheckCircle,
  Eye,
} from "lucide-react";
import { useCourses } from "../components/context/CourseContext";

const Courses = () => {
  const { courses, updateCourseStatus } = useCourses();

  // Use courses from context (now includes all 20 courses from courseData)
  const [localCourses, setLocalCourses] = useState(courses);
  const [statusFilter, setStatusFilter] = useState("all");
  const [searchTerm, setSearchTerm] = useState("");
  const [openDropdownId, setOpenDropdownId] = useState(null);
  const [showFilterDropdown, setShowFilterDropdown] = useState(false);
  const [modalCourseId, setModalCourseId] = useState(null);
  const [viewDetailsCourseId, setViewDetailsCourseId] = useState(null);
  const [showDenyModal, setShowDenyModal] = useState(false);
  const [denyReason, setDenyReason] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 8;

  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    setLocalCourses(courses);
  }, [courses]);

  useEffect(() => {
    if (location.state?.updatedCourse) {
      const updated = location.state.updatedCourse;
      setLocalCourses(prev =>
        prev.map(course => course.id === updated.id ? { ...course, status: 'Active' } : course)
      );
    }
  }, [location.state]);

  const handleApprove = (courseId) => {
    updateCourseStatus(courseId, "Active");
    setViewDetailsCourseId(null);
    alert("Course approved successfully!");
    navigate("/admin/courses?status=active");
  };

  const handleDeny = (courseId) => {
    setModalCourseId(courseId);
    setShowDenyModal(true);
  };

  const submitDeny = (courseId) => {
    if (!denyReason.trim()) return;
    updateCourseStatus(courseId, "Inactive");
    setShowDenyModal(false);
    setDenyReason("");
    setViewDetailsCourseId(null);
  };

  const toggleDropdown = (id) => {
    setOpenDropdownId(openDropdownId === id ? null : id);
  };

  const handleViewDetails = (course) => {
    if (course.status === "New") {
      navigate(`/course/${course.id}`);
    } else {
      setViewDetailsCourseId(course.id);
    }
    setOpenDropdownId(null);
  };

  const handleStatusChange = (courseId, newStatus) => {
    updateCourseStatus(courseId, newStatus);
    setOpenDropdownId(null);
  };

  const filteredCourses = localCourses.filter((course) => {
    const matchesSearch =
      course.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      course.instructor.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesStatus =
      statusFilter === "all" ||
      course.status.toLowerCase() === statusFilter.toLowerCase();

    return matchesSearch && matchesStatus;
  });

  // Pagination logic
  const totalPages = Math.ceil(filteredCourses.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentCourses = filteredCourses.slice(startIndex, endIndex);

  // Reset to first page when filters change
  useEffect(() => {
    setCurrentPage(1);
  }, [searchTerm, statusFilter]);

  const getStatusColor = (status) => {
    switch (status) {
      case "Active":
        return "bg-green-100 text-green-700";
      case "Inactive":
        return "bg-red-100 text-red-700";
      case "New":
        return "bg-blue-100 text-blue-700";
      default:
        return "bg-gray-100 text-gray-700";
    }
  };

  const filterOptions = [
    { value: "all", label: "All" },
    { value: "active", label: "Active" },
    { value: "inactive", label: "Inactive" },
    { value: "new", label: "New" },
  ];

  return (
    <DashboardLayout>
      <div className="space-y-8 p-6">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div className="space-y-2">
            <h1 className="text-3xl font-bold text-[#333A2F]">Course Management</h1>
            <p className="text-gray-600">
              Comprehensive course administration and content oversight
            </p>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row gap-4">
          <div className="relative flex-1">
            <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="Search courses..."
              className="pl-10 w-full py-2 border-none rounded-lg bg-[#EBEDDF] focus:ring-2 focus:ring-[#C8CBB8]"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>

          <div className="relative">
            <button
              onClick={() => setShowFilterDropdown(!showFilterDropdown)}
              className="flex items-center gap-2 px-4 py-2 border-none rounded-lg bg-[#333A2F] text-[#fff] font-bold hover:bg-[#C8CBB8]"
            >
              <Filter className="w-4 h-4 text-[#fff]" />
              {filterOptions.find(option => option.value === statusFilter)?.label || "All"}
              <ChevronDown className="w-4 h-4" />
            </button>

            {showFilterDropdown && (
              <div className="absolute right-0 mt-2 w-32 bg-white border border-[#C8CBB8] rounded-xl shadow-lg z-10">
                {filterOptions.map((option) => (
                  <button
                    key={option.value}
                    onClick={() => {
                      setStatusFilter(option.value);
                      setShowFilterDropdown(false);
                    }}
                    className="block w-full text-left px-4 py-2 hover:bg-[#EBEDDF] text-[#333A2F] font-bold rounded-lg"
                  >
                    {option.label}
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {currentCourses.map((course) => (
            <div key={course.id} className="rounded-xl shadow-xl border border-gray-200 p-6 bg-white space-y-3 relative hover:shadow-2xl transition">
              <div className="flex justify-between items-start">
                <div>
                  <h2 className="text-base font-bold text-[#333A2F]">{course.title}</h2>
                  <div className="flex gap-1 mt-1">
                    <span className={`px-2 py-0.5 text-xs rounded-lg font-bold ${getStatusColor(course.status)}`}>
                      {course.status}
                    </span>
                  </div>
                </div>

                <div className="relative">
                  <button
                    onClick={() => toggleDropdown(course.id)}
                    className="p-1 text-gray-400 hover:text-[#333A2F]"
                  >
                    <MoreVertical className="w-5 h-5" />
                  </button>

                  {openDropdownId === course.id && (
                    <div className="absolute right-0 mt-2 w-48 bg-white border border-[#C8CBB8] rounded-xl shadow z-10">
                      {course.status !== "New" && (
                        <button
                          onClick={() =>
                            handleStatusChange(
                              course.id,
                              course.status === "Active" ? "Inactive" : "Active"
                            )
                          }
                          className="flex items-center gap-2 px-4 py-2 text-sm w-full text-left hover:bg-[#EBEDDF] text-[#333A2F] font-bold rounded-lg"
                        >
                          {course.status === "Active" ? "Set Inactive" : "Set Active"}
                        </button>
                      )}
                      <button
                        onClick={() => handleViewDetails(course)}
                        className="flex items-center gap-2 px-4 py-2 text-sm w-full text-left hover:bg-[#EBEDDF] text-[#333A2F] font-bold rounded-lg"
                      >
                        View Details
                      </button>
                    </div>
                  )}
                </div>
              </div>

              <p className="text-sm text-gray-600">
                Instructor: {course.instructor}
              </p>
              <div className="flex justify-between text-sm">
                <div className="flex items-center gap-1 text-[#333A2F]">
                  <Users className="w-4 h-4" />
                  {course.students}
                </div>
                <div className="flex items-center gap-1 text-[#333A2F]">
                  <Clock className="w-4 h-4" />
                  {course.duration}
                </div>
                <div className="flex items-center gap-1 text-[#333A2F]">
                  <Star className="w-4 h-4 text-yellow-500" />
                  {course.rating}
                </div>
              </div>
            </div>
          ))}
        </div>

        {showDenyModal && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white p-8 rounded-xl shadow-2xl space-y-4 w-full max-w-sm border border-[#C8CBB8]">
              <h3 className="text-lg font-bold text-[#333A2F]">Deny Course</h3>
              <textarea
                className="w-full border-none rounded-lg bg-[#EBEDDF] p-2 focus:ring-2 focus:ring-[#C8CBB8] text-[#333A2F]"
                rows="3"
                placeholder="Reason for denial..."
                value={denyReason}
                onChange={(e) => setDenyReason(e.target.value)}
              />
              <div className="flex justify-end space-x-2">
                <button
                  className="px-4 py-2 bg-[#EBEDDF] text-[#333A2F] font-bold rounded-lg border border-[#C8CBB8]"
                  onClick={() => setShowDenyModal(false)}
                >
                  Cancel
                </button>
                <button
                  className="px-4 py-2 bg-red-500 text-white font-bold rounded-lg"
                  onClick={() => submitDeny(modalCourseId)}
                >
                  Submit
                </button>
              </div>
            </div>
          </div>
        )}

        {viewDetailsCourseId && (
          <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
            <div className="bg-white/95 backdrop-blur-md rounded-2xl shadow-2xl border border-white/20 max-w-4xl w-full max-h-[90vh] overflow-y-auto relative">
              <button
                className="absolute top-4 right-4 text-gray-600 hover:text-black text-2xl font-bold z-10"
                onClick={() => setViewDetailsCourseId(null)}
              >
                &times;
              </button>

              {(() => {
                const course = localCourses.find((c) => c.id === viewDetailsCourseId);
                if (!course) return <p>Course not found.</p>;

                return (
                  <div className="p-8">
                    {/* Course Header */}
                    <div className="mb-8">
                      <div className="flex items-start gap-6 mb-6">
                        {course.image && (
                          <img 
                            src={course.image} 
                            alt={course.title}
                            className="w-32 h-24 object-cover rounded-lg shadow-lg"
                          />
                        )}
                        <div className="flex-1">
                          <h2 className="text-3xl font-bold text-[#333A2F] mb-2">{course.title}</h2>
                          <p className="text-gray-600 mb-4">{course.description}</p>
                          <div className="flex items-center gap-6 text-sm">
                            <div className="flex items-center gap-2">
                              <Star className="w-5 h-5 text-yellow-500" />
                              <span className="font-semibold">{course.rating}</span>
                            </div>
                            <div className="flex items-center gap-2">
                              <Clock className="w-5 h-5 text-[#333A2F]" />
                              <span>{course.duration}</span>
                            </div>
                            <div className="flex items-center gap-2">
                              <Users className="w-5 h-5 text-[#333A2F]" />
                              <span>{course.students} students</span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Course Details Grid */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
                      {/* Left Column */}
                      <div className="space-y-6">
                        {/* Instructor Information */}
                        <div className="bg-[#EBEDDF]/50 rounded-xl p-6 border border-[#C8CBB8]/30">
                          <h3 className="text-xl font-bold text-[#333A2F] mb-4 flex items-center gap-2">
                            <BookOpen className="w-5 h-5" />
                            Instructor Information
                          </h3>
                          <div className="space-y-3">
                            <p><strong>Name:</strong> {course.instructor}</p>
                            {course.instructor_details && (
                              <>
                                <p><strong>Email:</strong> {course.instructor_details.mailid}</p>
                                <p><strong>Rating:</strong> {course.instructor_details.overall_rating}/5</p>
                                <p><strong>Courses:</strong> {course.instructor_details.no_of_courses_released}</p>
                                <p><strong>Students:</strong> {course.instructor_details.total_learners}</p>
                              </>
                            )}
                          </div>
                        </div>

                        {/* Course Features */}
                        <div className="bg-[#EBEDDF]/50 rounded-xl p-6 border border-[#C8CBB8]/30">
                          <h3 className="text-xl font-bold text-[#333A2F] mb-4 flex items-center gap-2">
                            <Award className="w-5 h-5" />
                            Course Features
                          </h3>
                          <div className="space-y-3">
                            <div className="flex items-center gap-2">
                              <CheckCircle className="w-5 h-5 text-green-600" />
                              <span>Level: {course.type}</span>
                            </div>
                            <div className="flex items-center gap-2">
                              <CheckCircle className="w-5 h-5 text-green-600" />
                              <span>Tests: {course.tests || 0} available</span>
                            </div>
                            <div className="flex items-center gap-2">
                              {course.pdfAvailable ? (
                                <CheckCircle className="w-5 h-5 text-green-600" />
                              ) : (
                                <span className="w-5 h-5 text-gray-400">○</span>
                              )}
                              <span>PDF Materials: {course.pdfAvailable ? "Available" : "Not Available"}</span>
                            </div>
                            <div className="flex items-center gap-2">
                              {course.certificate ? (
                                <CheckCircle className="w-5 h-5 text-green-600" />
                              ) : (
                                <span className="w-5 h-5 text-gray-400">○</span>
                              )}
                              <span>Certificate: {course.certificate ? "Available" : "Not Available"}</span>
                            </div>
                          </div>
                        </div>
                      </div>

                      {/* Right Column */}
                      <div className="space-y-6">
                        {/* Learning Outcomes */}
                        {course.outcome && (
                          <div className="bg-[#EBEDDF]/50 rounded-xl p-6 border border-[#C8CBB8]/30">
                            <h3 className="text-xl font-bold text-[#333A2F] mb-4 flex items-center gap-2">
                              <Eye className="w-5 h-5" />
                              Learning Outcomes
                            </h3>
                            <ul className="space-y-2">
                              {course.outcome.map((outcome, index) => (
                                <li key={index} className="flex items-start gap-2">
                                  <CheckCircle className="w-4 h-4 text-green-600 mt-0.5 flex-shrink-0" />
                                  <span className="text-sm">{outcome}</span>
                                </li>
                              ))}
                            </ul>
                          </div>
                        )}

                        {/* Course Skills */}
                        {course.about_course && course.about_course.skills && (
                          <div className="bg-[#EBEDDF]/50 rounded-xl p-6 border border-[#C8CBB8]/30">
                            <h3 className="text-xl font-bold text-[#333A2F] mb-4 flex items-center gap-2">
                              <Code className="w-5 h-5" />
                              Skills You'll Learn
                            </h3>
                            <div className="flex flex-wrap gap-2">
                              {course.about_course.skills.map((skill, index) => (
                                <span 
                                  key={index}
                                  className="px-3 py-1 bg-[#333A2F] text-white text-xs rounded-full"
                                >
                                  {skill}
                                </span>
                              ))}
                            </div>
                          </div>
                        )}
                      </div>
                    </div>

                    {/* Course Content Preview */}
                    {course.course_content && (
                      <div className="bg-[#EBEDDF]/50 rounded-xl p-6 border border-[#C8CBB8]/30">
                        <h3 className="text-xl font-bold text-[#333A2F] mb-4 flex items-center gap-2">
                          <FileText className="w-5 h-5" />
                          Course Content Preview
                        </h3>
                        <div className="space-y-4">
                          {course.course_content.map((session, sessionIndex) => (
                            <div key={sessionIndex} className="border-l-4 border-[#333A2F] pl-4">
                              <h4 className="font-semibold text-[#333A2F] mb-2">{session.session}</h4>
                              <p className="text-sm text-gray-600 mb-2">{session.module_description}</p>
                              <div className="space-y-1">
                                {session.content.map((item, itemIndex) => (
                                  <div key={itemIndex} className="flex items-center gap-2 text-sm">
                                    {item.type === 'video' && <Play className="w-4 h-4 text-blue-600" />}
                                    {item.type === 'pdf' && <FileText className="w-4 h-4 text-red-600" />}
                                    {item.type === 'assignment' && <Code className="w-4 h-4 text-purple-600" />}
                                    {item.type === 'coding-exercise' && <Code className="w-4 h-4 text-green-600" />}
                                    <span>{item.title}</span>
                                    <span className="text-gray-500">({item.duration})</span>
                                  </div>
                                ))}
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                );
              })()}
            </div>
          </div>
        )}

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="flex justify-center gap-2 pt-6">
            <button
              disabled={currentPage === 1}
              onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
              className="px-4 py-2 bg-[#EBEDDF] text-[#333A2F] font-bold rounded-lg hover:bg-[#C8CBB8] disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Previous
            </button>
            <span className="px-4 text-sm text-gray-400">
              Page {currentPage} of {totalPages}
            </span>
            <button
              disabled={currentPage === totalPages}
              onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
              className="px-4 py-2 bg-[#EBEDDF] text-[#333A2F] font-bold rounded-lg hover:bg-[#C8CBB8] disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Next
            </button>
          </div>
        )}
      </div>
    </DashboardLayout>
  );
};

export default Courses;
