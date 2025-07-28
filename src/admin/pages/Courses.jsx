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
} from "lucide-react";
import { useCourses } from "../components/context/CourseContext";

const Courses = () => {
  const { courses, updateCourseStatus } = useCourses();

  const [localCourses, setLocalCourses] = useState(courses);
  const [statusFilter, setStatusFilter] = useState("all");
  const [searchTerm, setSearchTerm] = useState("");
  const [openDropdownId, setOpenDropdownId] = useState(null);
  const [showFilterDropdown, setShowFilterDropdown] = useState(false);
  const [modalCourseId, setModalCourseId] = useState(null);
  const [viewDetailsCourseId, setViewDetailsCourseId] = useState(null);
  const [showDenyModal, setShowDenyModal] = useState(false);
  const [denyReason, setDenyReason] = useState("");

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
          {filteredCourses.map((course) => (
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
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white rounded-xl shadow-2xl p-8 max-w-md w-full relative border border-[#C8CBB8]">
              <button
                className="absolute top-2 right-3 text-gray-600 hover:text-black text-xl"
                onClick={() => setViewDetailsCourseId(null)}
              >
                &times;
              </button>

              {(() => {
                const course = courses.find((c) => c.id === viewDetailsCourseId);
                if (!course) return <p>Course not found.</p>;

                return (
                  <div className="space-y-2">
                    <h2 className="text-xl font-bold text-[#333A2F]">{course.title}</h2>
                    <p className="text-[#333A2F]"><strong>Instructor:</strong> {course.instructor}</p>
                    <p className="text-[#333A2F]"><strong>Duration:</strong> {course.duration}</p>
                    <p className="text-[#333A2F]"><strong>Type:</strong> {course.type}</p>
                    <p className="text-[#333A2F]"><strong>Status:</strong> {course.status}</p>
                    <p className="text-[#333A2F]"><strong>No. of Tests:</strong> {course.tests || 5}</p>
                    <p className="text-[#333A2F]"><strong>PDF Available:</strong> {course.pdfAvailable ? "Yes" : "No"}</p>
                    <p className="text-[#333A2F]"><strong>Certificate:</strong> {course.certificate ? "Available" : "Not Available"}</p>
                  </div>
                );
              })()}
            </div>
          </div>
        )}
      </div>
    </DashboardLayout>
  );
};

export default Courses;
