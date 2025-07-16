import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import useAllCourses from "../hooks/useAllCourses";

const InstructorAnnouncementForm = () => {
  const navigate = useNavigate();
  const [announcement, setAnnouncement] = useState({
    title: "",
    message: "",
    type: "info",
    course: "",
    attachment: "",
  });

  const courses = useAllCourses();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setAnnouncement((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Announcement Submitted:", announcement);
    // Navigate back to dashboard after submission
    navigate("/");
  };

  const handleCancel = () => {
    navigate("/");
  };

  const getSelectedCourse = () => {
    return courses.find((course) => course.id === announcement.course);
  };

  return (
    <div className="min-h-screen bg-[#EBEDDF] p-4 sm:p-6 lg:p-8">
      <div className="w-full max-w-4xl mx-auto">
        {/* Back Button */}
        <button
          onClick={handleCancel}
          className="flex items-center space-x-2 text-gray-600 hover:text-gray-900 mb-6 transition-colors"
        >
          <ArrowLeft className="h-5 w-5" />
          <span>Back to Dashboard</span>
        </button>

        <form
          onSubmit={handleSubmit}
          className="bg-white rounded-2xl shadow-xl border border-gray-200 overflow-hidden"
        >
          <div className="bg-gradient-to-r from-[#333A2F] to-[#3a4235] px-6 py-8 sm:px-8 sm:py-10">
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-white text-center">
              Course Announcement
            </h2>
            <p className="text-gray-200 text-center mt-2 text-sm sm:text-base">
              Share important updates with your students
            </p>
          </div>

          <div className="px-6 py-8 sm:px-8 sm:py-10 lg:px-12">
            <div className="grid gap-6 sm:gap-8">
              {/* Course Selection */}
              <div className="space-y-2">
                <label className="block text-sm sm:text-base font-semibold text-gray-700">
                  Select Course*
                </label>
                <select
                  name="course"
                  value={announcement.course}
                  onChange={handleChange}
                  required
                  className="w-full border border-gray-300 rounded-lg px-4 py-3 sm:py-4 text-sm sm:text-base focus:ring-2 focus:ring-[#333A2F] focus:border-transparent transition-all duration-200 bg-white"
                >
                  <option value="">Choose a course...</option>
                  {courses.length === 0 ? (
                    <option disabled>Loading courses...</option>
                  ) : (
                    courses.map((course) => (
                      <option key={course.id} value={course.id}>
                        {course.name} ({course.section}) - {course.students}{" "}
                        students
                      </option>
                    ))
                  )}
                </select>

                {announcement.course && (
                  <div className="mt-2 p-3 bg-blue-50 rounded-lg border border-blue-200">
                    <p className="text-sm text-blue-800">
                      <span className="font-medium">Selected:</span>{" "}
                      {getSelectedCourse()?.name} -{" "}
                      {getSelectedCourse()?.section}
                    </p>
                    <p className="text-xs text-blue-600 mt-1">
                      This announcement will be sent to{" "}
                      {getSelectedCourse()?.students} students
                    </p>
                  </div>
                )}
              </div>

              {/* Title */}
              <div className="space-y-2">
                <label className="block text-sm sm:text-base font-semibold text-gray-700">
                  Announcement Title*
                </label>
                <input
                  type="text"
                  name="title"
                  value={announcement.title}
                  onChange={handleChange}
                  required
                  className="w-full border border-gray-300 rounded-lg px-4 py-3 sm:py-4 text-sm sm:text-base focus:ring-2 focus:ring-[#333A2F] focus:border-transparent transition-all duration-200 placeholder-gray-400"
                  placeholder="Enter a compelling announcement title"
                />
              </div>

              {/* Message */}
              <div className="space-y-2">
                <label className="block text-sm sm:text-base font-semibold text-gray-700">
                  Message Content*
                </label>
                <textarea
                  name="message"
                  value={announcement.message}
                  onChange={handleChange}
                  required
                  rows="6"
                  className="w-full border border-gray-300 rounded-lg px-4 py-3 sm:py-4 text-sm sm:text-base focus:ring-2 focus:ring-[#333A2F] focus:border-transparent transition-all duration-200 resize-none placeholder-gray-400"
                  placeholder="Write your detailed announcement message here. Be clear and informative..."
                />
                <p className="text-xs sm:text-sm text-gray-500">
                  {announcement.message.length}/500 characters
                </p>
              </div>

              {/* Type & Attachment */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="block text-sm sm:text-base font-semibold text-gray-700">
                    Announcement Type
                  </label>
                  <select
                    name="type"
                    value={announcement.type}
                    onChange={handleChange}
                    className="w-full border border-gray-300 rounded-lg px-4 py-3 sm:py-4 text-sm sm:text-base focus:ring-2 focus:ring-[#333A2F] focus:border-transparent transition-all duration-200 bg-white"
                  >
                    <option value="info">📢 General Information</option>
                    <option value="urgent">🚨 Urgent Notice</option>
                    <option value="assignment">📝 Assignment</option>
                    <option value="exam">📋 Exam Notice</option>
                    <option value="event">📅 Class Event</option>
                    <option value="update">🔄 Course Update</option>
                    <option value="reminder">⏰ Reminder</option>
                  </select>
                </div>

                <div className="space-y-2">
                  <label className="block text-sm sm:text-base font-semibold text-gray-700">
                    Attachment Link{" "}
                    <span className="text-gray-500 font-normal">
                      (optional)
                    </span>
                  </label>
                  <input
                    type="url"
                    name="attachment"
                    value={announcement.attachment}
                    onChange={handleChange}
                    className="w-full border border-gray-300 rounded-lg px-4 py-3 sm:py-4 text-sm sm:text-base focus:ring-2 focus:ring-[#333A2F] focus:border-transparent transition-all duration-200 placeholder-gray-400"
                    placeholder="https://example.com/document.pdf"
                  />
                </div>
              </div>

              {/* Preview */}
              {(announcement.title ||
                announcement.message ||
                announcement.course) && (
                <div className="bg-gray-50 rounded-xl p-6 border-l-4 border-[#333A2F]">
                  <h3 className="text-lg font-semibold text-gray-800 mb-3">
                    Preview
                  </h3>
                  <div className="space-y-3">
                    {announcement.course && (
                      <div className="flex items-center gap-2 text-sm text-gray-600">
                        <span className="px-3 py-1 bg-[#333A2F] text-white rounded-full text-xs font-medium">
                          {getSelectedCourse()?.id}
                        </span>
                        <span>
                          {getSelectedCourse()?.name} -{" "}
                          {getSelectedCourse()?.section}
                        </span>
                      </div>
                    )}
                    {announcement.title && (
                      <h4 className="font-medium text-gray-900 text-lg">
                        {announcement.title}
                      </h4>
                    )}
                    {announcement.message && (
                      <p className="text-gray-700 text-sm leading-relaxed">
                        {announcement.message}
                      </p>
                    )}
                    <div className="flex items-center gap-2 text-xs text-gray-500">
                      <span className="px-2 py-1 bg-gray-200 rounded-full">
                        {announcement.type}
                      </span>
                      {announcement.attachment && (
                        <span>📎 Attachment included</span>
                      )}
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Footer */}
          <div className="bg-gray-50 px-6 py-6 sm:px-8 sm:py-8 lg:px-12">
            <div className="flex flex-col sm:flex-row gap-4 sm:justify-between sm:items-center">
              <div className="text-xs sm:text-sm text-gray-600 order-2 sm:order-1">
                <p>* Required fields</p>
                <p className="mt-1">
                  Your announcement will be visible to all students in the
                  selected course.
                </p>
              </div>

              <div className="flex flex-col sm:flex-row gap-3 order-1 sm:order-2">
                <button
                  type="button"
                  onClick={handleCancel}
                  className="w-full sm:w-auto px-6 py-3 sm:px-8 sm:py-4 border border-gray-300 text-gray-700 rounded-lg font-semibold text-sm sm:text-base hover:bg-gray-50 transition-all duration-200 focus:ring-2 focus:ring-gray-300"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={
                    !announcement.title ||
                    !announcement.message ||
                    !announcement.course
                  }
                  className="w-full sm:w-auto bg-gradient-to-r from-[#333A2F] to-[#3a4235] text-white px-6 py-3 sm:px-8 sm:py-4 rounded-lg font-semibold text-sm sm:text-base hover:from-[#3a4235] hover:to-[#404739] disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 focus:ring-2 focus:ring-[#333A2F] focus:ring-offset-2 shadow-lg"
                >
                  Post Announcement
                </button>
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default InstructorAnnouncementForm;
import {
  Megaphone,
  Plus,
  Search,
  Eye,
  Edit,
  Trash2,
  Calendar,
  Users,
  AlertCircle,
  BookOpen,
} from "lucide-react";

// Sample announcements data
const sampleAnnouncements = [
  {
    id: "1",
    title: "New Course Update: React Advanced Patterns",
    message:
      "We've added 3 new modules covering advanced React patterns including render props, compound components, and custom hooks.",
    type: "update",
    course: "React - The Complete Guide",
    createdAt: "2024-01-15T10:30:00Z",
    isPublished: true,
    attachment: "",
  },
  {
    id: "2",
    title: "Scheduled Maintenance - January 20th",
    message:
      "Our platform will undergo scheduled maintenance on January 20th from 2:00 AM to 4:00 AM EST. Some features may be temporarily unavailable.",
    type: "urgent",
    course: "All Courses",
    createdAt: "2024-01-12T14:15:00Z",
    isPublished: true,
    attachment: "",
  },
  {
    id: "3",
    title: "New Assessment Feature Available",
    message:
      "We're excited to announce the launch of our new interactive assessment feature. Students can now take quizzes directly within the course modules.",
    type: "info",
    course: "JavaScript Fundamentals",
    createdAt: "2024-01-10T09:45:00Z",
    isPublished: false,
    attachment: "https://example.com/assessment-guide.pdf",
  },
];

// Announcement Card Component
const AnnouncementCard = ({ announcement, onDelete, onEdit }) => {
  const getTypeColor = (type) => {
    const colors = {
      update: "bg-blue-100 text-blue-800",
      urgent: "bg-red-100 text-red-800",
      info: "bg-green-100 text-green-800",
      assignment: "bg-purple-100 text-purple-800",
      exam: "bg-orange-100 text-orange-800",
      event: "bg-indigo-100 text-indigo-800",
      reminder: "bg-yellow-100 text-yellow-800",
    };
    return colors[type] || "bg-gray-100 text-gray-800";
  };

  const getTypeIcon = (type) => {
    switch (type) {
      case "update":
        return "🔄";
      case "urgent":
        return "🚨";
      case "info":
        return "📢";
      case "assignment":
        return "📝";
      case "exam":
        return "📋";
      case "event":
        return "📅";
      case "reminder":
        return "⏰";
      default:
        return "📢";
    }
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  return (
    <div className="bg-white border border-gray-200 rounded-lg p-6 hover:shadow-md transition-shadow">
      {/* Header */}
      <div className="flex justify-between items-start mb-4">
        <div className="flex items-center space-x-2">
          <span
            className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getTypeColor(
              announcement.type
            )}`}
          >
            {getTypeIcon(announcement.type)} {announcement.type}
          </span>
          {!announcement.isPublished && (
            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800">
              Draft
            </span>
          )}
        </div>
        <div className="flex space-x-2">
          <button
            onClick={() => onEdit(announcement.id)}
            className="p-2 text-gray-500 hover:text-blue-600 hover:bg-blue-50 rounded-md transition-colors"
          >
            <Edit className="h-4 w-4" />
          </button>
          <button
            onClick={() => onDelete(announcement.id)}
            className="p-2 text-gray-500 hover:text-red-600 hover:bg-red-50 rounded-md transition-colors"
          >
            <Trash2 className="h-4 w-4" />
          </button>
        </div>
      </div>

      {/* Content */}
      <h3 className="text-lg font-semibold text-gray-900 mb-2">
        {announcement.title}
      </h3>
      <p className="text-gray-600 text-sm mb-4 line-clamp-3">
        {announcement.message}
      </p>

      {/* Course Info */}
      <div className="flex items-center space-x-2 mb-4">
        <BookOpen className="h-4 w-4 text-gray-500" />
        <span className="text-sm text-gray-600 font-medium">
          {announcement.course}
        </span>
      </div>

      {/* Footer */}
      <div className="flex items-center justify-between text-sm text-gray-500">
        <div className="flex items-center space-x-4">
          <div className="flex items-center space-x-1">
            <Calendar className="h-4 w-4" />
            <span>{formatDate(announcement.createdAt)}</span>
          </div>
          {announcement.attachment && (
            <div className="flex items-center space-x-1">
              <span>📎</span>
              <span>Attachment</span>
            </div>
          )}
        </div>
        <button className="flex items-center space-x-1 text-blue-600 hover:text-blue-800 transition-colors">
          <Eye className="h-4 w-4" />
          <span>View Details</span>
        </button>
      </div>
    </div>
  );
};

const Announcements = () => {
  const navigate = useNavigate();
  const [announcements, setAnnouncements] = useState(sampleAnnouncements);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterType, setFilterType] = useState("all");

  const handleDeleteAnnouncement = (announcementId) => {
    setAnnouncements(
      announcements.filter((announcement) => announcement.id !== announcementId)
    );
  };

  const handleEditAnnouncement = (announcementId) => {
    // TODO: Navigate to edit announcement form
    console.log("Edit announcement:", announcementId);
  };

  const handleCreateAnnouncement = () => {
    navigate("/announcement-form");
  };

  const filteredAnnouncements = announcements.filter((announcement) => {
    const matchesSearch =
      announcement.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      announcement.message.toLowerCase().includes(searchTerm.toLowerCase()) ||
      announcement.course.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesFilter =
      filterType === "all" || announcement.type === filterType;

    return matchesSearch && matchesFilter;
  });

  return (
    <div className="bg-white rounded-lg shadow-sm">
      {/* Header */}
      <div className="px-6 py-4 border-b border-gray-200">
        <div className="flex justify-between items-start">
          <div>
            <h2 className="text-xl font-bold text-gray-900 mb-1">
              Announcements
            </h2>
            <p className="text-gray-600">
              Manage and publish announcements for your students
            </p>
          </div>
          <button
            onClick={handleCreateAnnouncement}
            className="bg-gray-800 text-white px-4 py-2 rounded-lg hover:bg-gray-700 transition-colors flex items-center space-x-2"
          >
            <Plus className="h-4 w-4" />
            <span>Post Announcement</span>
          </button>
        </div>
      </div>

      {/* Filters and Search */}
      <div className="p-6 border-b border-gray-200">
        <div className="flex flex-col sm:flex-row gap-4">
          {/* Search */}
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
            <input
              type="text"
              placeholder="Search announcements..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>

          {/* Filter */}
          <select
            value={filterType}
            onChange={(e) => setFilterType(e.target.value)}
            className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
            <option value="all">All Types</option>
            <option value="info">📢 General Information</option>
            <option value="urgent">🚨 Urgent Notice</option>
            <option value="assignment">📝 Assignment</option>
            <option value="exam">📋 Exam Notice</option>
            <option value="event">📅 Class Event</option>
            <option value="update">🔄 Course Update</option>
            <option value="reminder">⏰ Reminder</option>
          </select>
        </div>
      </div>

      {/* Announcements List */}
      <div className="p-6">
        {filteredAnnouncements.length === 0 ? (
          <div className="text-center py-12">
            <Megaphone className="mx-auto h-12 w-12 text-gray-400 mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">
              No announcements found
            </h3>
            <p className="text-gray-500 mb-6">
              {searchTerm || filterType !== "all"
                ? "Try adjusting your search or filter criteria"
                : "Get started by creating your first announcement"}
            </p>
            {!searchTerm && filterType === "all" && (
              <button
                onClick={handleCreateAnnouncement}
                className="bg-gray-800 text-white px-4 py-2 rounded-lg hover:bg-gray-700 transition-colors flex items-center space-x-2 mx-auto"
              >
                <Plus className="h-4 w-4" />
                <span>Post Your First Announcement</span>
              </button>
            )}
          </div>
        ) : (
          <div className="space-y-6">
            {filteredAnnouncements.map((announcement) => (
              <AnnouncementCard
                key={announcement.id}
                announcement={announcement}
                onDelete={handleDeleteAnnouncement}
                onEdit={handleEditAnnouncement}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};
