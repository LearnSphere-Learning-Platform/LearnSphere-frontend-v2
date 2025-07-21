import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
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
    console.log("Edit announcement:", announcementId);
  };

  const handleCreateAnnouncement = () => {
    navigate("/announcement");
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

export default Announcements;
