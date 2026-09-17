import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import {
  Megaphone,
  Plus,
  Search,
  Edit,
  Trash2,
  Calendar,
  BookOpen,
} from "lucide-react";
import { announcementApi } from "../../services/api";
import useAllCourses from "../../hooks/useAllCourses";

// Was previously seeded with 3 hardcoded sampleAnnouncements and only ever mutated in local
// React state (new/edited announcements arrived via router state from
// InstructorAnnouncementForm.jsx and were merged into that local array) - nothing was ever
// persisted, so a refresh silently reverted to the same 3 fake announcements. The announcement
// service already had create/edit/delete/list endpoints with no caller. Note: the backend
// Announcement entity has no isPublished/draft concept and no createdAt field (only
// `repliedAt`, which the create endpoint doesn't appear to set) - the "Draft" badge and posted
// date are dropped here rather than faked.

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
    if (!dateString) return null;
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  const formattedDate = formatDate(announcement.repliedAt);

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
        </div>
        <div className="flex space-x-2">
          <button
            onClick={() => onEdit(announcement)}
            className="p-2 text-gray-500 hover:text-blue-600 hover:bg-blue-50 rounded-md transition-colors cursor-pointer"
          >
            <Edit className="h-4 w-4" />
          </button>
          <button
            onClick={() => onDelete(announcement.id)}
            className="p-2 text-gray-500 hover:text-red-600 hover:bg-red-50 rounded-md transition-colors cursor-pointer"
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
          {announcement.courseName}
        </span>
      </div>

      {/* Footer */}
      <div className="flex items-center justify-between text-sm text-gray-500">
        <div className="flex items-center space-x-4">
          {formattedDate && (
            <div className="flex items-center space-x-1">
              <Calendar className="h-4 w-4" />
              <span>{formattedDate}</span>
            </div>
          )}
          {announcement.attachment && (
            <div className="flex items-center space-x-1">
              <span>📎</span>
              <span>Attachment</span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

const Announcements = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [announcements, setAnnouncements] = useState([]);
  const [loading, setLoading] = useState(true);
  const [loadError, setLoadError] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [filterType, setFilterType] = useState("all");
  const courses = useAllCourses();

  const instructorId = localStorage.getItem("instructorId");

  const loadAnnouncements = async () => {
    if (!instructorId) {
      setLoading(false);
      return;
    }
    setLoading(true);
    setLoadError("");
    try {
      const data = await announcementApi.get(
        `/api/learnsphere/announcement/instructor/${instructorId}`
      );
      setAnnouncements(
        (data || []).map((a) => ({
          id: a.announcementId,
          title: a.title,
          message: a.message,
          type: a.announcementType,
          course: a.courseId,
          attachment: a.attachmentLink,
          repliedAt: a.repliedAt,
        }))
      );
    } catch (e) {
      setLoadError(e.message || "Could not load announcements.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadAnnouncements();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // This component likely stays mounted as a persistent dashboard tab, so a plain create/edit
  // -> navigate back doesn't remount it and re-run the effect above - the form flags the
  // return trip via router state instead, so the just-saved announcement actually shows up.
  useEffect(() => {
    if (location.state?.announcementPosted) {
      loadAnnouncements();
      window.history.replaceState({}, document.title);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [location.state]);

  const courseNameFor = (courseId) =>
    courses.find((c) => String(c.id) === String(courseId))?.course_name || courseId;

  const handleDeleteAnnouncement = async (announcementId) => {
    if (!window.confirm("Are you sure you want to delete this announcement?")) return;
    const previous = announcements;
    setAnnouncements(announcements.filter((a) => a.id !== announcementId));
    try {
      await announcementApi.delete(`/api/learnsphere/announcement/delete/${announcementId}`);
    } catch (e) {
      setAnnouncements(previous);
      alert(`Could not delete announcement: ${e.message}`);
    }
  };

  const handleEditAnnouncement = (announcement) => {
    navigate("/instructor/announcement", { state: { announcement, isEdit: true } });
  };

  const handleCreateAnnouncement = () => {
    navigate("/instructor/announcement");
  };

  const filteredAnnouncements = announcements.filter((announcement) => {
    const matchesSearch =
      announcement.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      announcement.message.toLowerCase().includes(searchTerm.toLowerCase()) ||
      courseNameFor(announcement.course).toLowerCase().includes(searchTerm.toLowerCase());

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
        {loading ? (
          <div className="text-center py-12 text-gray-500">Loading announcements...</div>
        ) : loadError ? (
          <div className="text-center py-12 text-red-600">{loadError}</div>
        ) : filteredAnnouncements.length === 0 ? (
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
                announcement={{ ...announcement, courseName: courseNameFor(announcement.course) }}
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
