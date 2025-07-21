import { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import useAllCourses from "../hooks/useAllCourses";

const InstructorAnnouncementForm = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const isEdit = location.state?.isEdit;
  const editAnnouncement = location.state?.announcement;
  const [announcement, setAnnouncement] = useState(
    isEdit && editAnnouncement
      ? { ...editAnnouncement }
      : {
          title: "",
          message: "",
          type: "info",
          course: "",
          attachment: "",
        }
  );

  const courses = useAllCourses();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setAnnouncement((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Instead of just logging, navigate back and pass the announcement and edit flag
    navigate("/instructor-dashboard", { state: { announcement, isEdit } });
  };

  const getSelectedCourse = () => {
    return courses.find((course) => course.id === announcement.course);
  };

  const getTypeEmoji = (type) => {
    const emojis = {
      info: "📢",
      urgent: "🚨",
      assignment: "📝",
      exam: "📋",
      event: "📅",
      update: "🔄",
      reminder: "⏰",
    };
    return emojis[type] || "📢";
  };

  return (
    <div className="min-h-screen bg-[#EBEDDF] p-4 sm:p-6 lg:p-8">
      <div className="w-full max-w-4xl mx-auto">
        <div className="flex items-baseline mb-8 mt-24">
          <button
            onClick={() => navigate(-1)}
            className="text-gray-600 hover:text-gray-900 transition-colors mr-2 flex"
          >
            <ArrowLeft className="h-[18px] w-[18px] mt-[3px]" />
          </button>
          <div>
            <h1 className="text-xl font-medium text-gray-800">
              {isEdit ? "Edit Announcement" : "Create New Announcement"}
            </h1>
            <p className="text-gray-600 text-[13px] mt-[2px]">
              Build an engaging learning experience for your students
            </p>
          </div>
        </div>

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
                        {course.course_name} 
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
                  <h3 className="text-lg font-semibold text-gray-800 mb-4">
                    Announcement Preview
                  </h3>
                  <div className="space-y-4">
                    {announcement.course && (
                      <div className="flex flex-wrap items-center gap-2">
                        <span className="px-3 py-1 bg-[#333A2F] text-white rounded-full text-xs font-medium">
                          {getSelectedCourse()?.name}
                        </span>
                        <span className="text-sm font-medium text-gray-700">
                          {getSelectedCourse()?.section}
                        </span>
                        <span className="text-xs text-gray-500 ml-auto">
                          {new Date().toLocaleDateString()}
                        </span>
                      </div>
                    )}

                    {announcement.title && (
                      <div className="flex items-start gap-2">
                        <span className="text-lg mt-1">
                          {getTypeEmoji(announcement.type)}
                        </span>
                        <h4 className="text-lg font-semibold text-gray-900">
                          {announcement.title}
                        </h4>
                      </div>
                    )}

                    {announcement.message && (
                      <div className="bg-white p-4 rounded-lg border border-gray-200">
                        <p className="text-gray-700 whitespace-pre-line">
                          {announcement.message}
                        </p>
                      </div>
                    )}

                    {announcement.attachment && (
                      <div className="flex items-center gap-2 text-sm text-blue-600">
                        <span>📎</span>
                        <a
                          href={announcement.attachment}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="hover:underline"
                        >
                          {announcement.attachment.length > 40
                            ? `${announcement.attachment.substring(0, 40)}...`
                            : announcement.attachment}
                        </a>
                      </div>
                    )}

                    <div className="pt-2 border-t border-gray-200">
                      <p className="text-xs text-gray-500">
                        This is how your announcement will appear to students.
                      </p>
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
                  onClick={() => navigate(-1)}
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
                  {isEdit ? "Save Changes" : "Post Announcement"}
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
