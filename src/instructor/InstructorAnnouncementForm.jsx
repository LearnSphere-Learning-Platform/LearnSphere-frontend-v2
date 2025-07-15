// import { useState } from "react";

// const InstructorAnnouncementForm = () => {
//   const [announcement, setAnnouncement] = useState({
//     title: "",
//     message: "",
//     type: "info",
//     attachment: "",
//   });

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setAnnouncement((prev) => ({ ...prev, [name]: value }));
//   };

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     console.log("Announcement Submitted:", announcement);
//     // API call or logic here
//   };

//   return (
//     <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 p-4 sm:p-6 lg:p-8">
//       <div className="w-full max-w-4xl mx-auto">
//         <form
//           onSubmit={handleSubmit}
//           className="bg-white rounded-2xl shadow-xl border border-gray-200 overflow-hidden"
//         >
//           {/* Header */}
//           <div className="bg-gradient-to-r from-[#333A2F] to-[#3a4235] px-6 py-8 sm:px-8 sm:py-10">
//             <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-white text-center">
//               Post Announcement
//             </h2>
//             <p className="text-gray-200 text-center mt-2 text-sm sm:text-base">
//               Share important updates with your community
//             </p>
//           </div>

//           {/* Form Content */}
//           <div className="px-6 py-8 sm:px-8 sm:py-10 lg:px-12">
//             <div className="grid gap-6 sm:gap-8">
//               {/* Title */}
//               <div className="space-y-2">
//                 <label className="block text-sm sm:text-base font-semibold text-gray-700">
//                   Announcement Title*
//                 </label>
//                 <input
//                   type="text"
//                   name="title"
//                   value={announcement.title}
//                   onChange={handleChange}
//                   required
//                   className="w-full border border-gray-300 rounded-lg px-4 py-3 sm:py-4 text-sm sm:text-base focus:ring-2 focus:ring-[#333A2F] focus:border-transparent transition-all duration-200 placeholder-gray-400"
//                   placeholder="Enter a compelling announcement title"
//                 />
//               </div>

//               {/* Message */}
//               <div className="space-y-2">
//                 <label className="block text-sm sm:text-base font-semibold text-gray-700">
//                   Message Content*
//                 </label>
//                 <textarea
//                   name="message"
//                   value={announcement.message}
//                   onChange={handleChange}
//                   required
//                   rows="6"
//                   className="w-full border border-gray-300 rounded-lg px-4 py-3 sm:py-4 text-sm sm:text-base focus:ring-2 focus:ring-[#333A2F] focus:border-transparent transition-all duration-200 resize-none placeholder-gray-400"
//                   placeholder="Write your detailed announcement message here. Be clear and informative..."
//                 />
//                 <p className="text-xs sm:text-sm text-gray-500">
//                   {announcement.message.length}/500 characters
//                 </p>
//               </div>

//               {/* Type and Attachment Row - Responsive Grid */}
//               <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//                 {/* Type */}
//                 <div className="space-y-2">
//                   <label className="block text-sm sm:text-base font-semibold text-gray-700">
//                     Announcement Type
//                   </label>
//                   <select
//                     name="type"
//                     value={announcement.type}
//                     onChange={handleChange}
//                     className="w-full border border-gray-300 rounded-lg px-4 py-3 sm:py-4 text-sm sm:text-base focus:ring-2 focus:ring-[#333A2F] focus:border-transparent transition-all duration-200 bg-white"
//                   >
//                     <option value="info">📢 General Information</option>
//                     <option value="urgent">🚨 Urgent Notice</option>
//                     <option value="event">📅 Event Announcement</option>
//                     <option value="update">🔄 System Update</option>
//                     <option value="promotion">🎉 Promotion</option>
//                   </select>
//                 </div>

//                 {/* Attachment */}
//                 <div className="space-y-2">
//                   <label className="block text-sm sm:text-base font-semibold text-gray-700">
//                     Attachment Link
//                     <span className="text-gray-500 font-normal">
//                       (optional)
//                     </span>
//                   </label>
//                   <input
//                     type="url"
//                     name="attachment"
//                     value={announcement.attachment}
//                     onChange={handleChange}
//                     className="w-full border border-gray-300 rounded-lg px-4 py-3 sm:py-4 text-sm sm:text-base focus:ring-2 focus:ring-[#333A2F] focus:border-transparent transition-all duration-200 placeholder-gray-400"
//                     placeholder="https://example.com/document.pdf"
//                   />
//                 </div>
//               </div>

//               {/* Preview Section */}
//               {(announcement.title || announcement.message) && (
//                 <div className="bg-gray-50 rounded-xl p-6 border-l-4 border-[#333A2F]">
//                   <h3 className="text-lg font-semibold text-gray-800 mb-3">
//                     Preview
//                   </h3>
//                   <div className="space-y-2">
//                     {announcement.title && (
//                       <h4 className="font-medium text-gray-900">
//                         {announcement.title}
//                       </h4>
//                     )}
//                     {announcement.message && (
//                       <p className="text-gray-700 text-sm leading-relaxed">
//                         {announcement.message}
//                       </p>
//                     )}
//                     <div className="flex items-center gap-2 text-xs text-gray-500">
//                       <span className="px-2 py-1 bg-gray-200 rounded-full">
//                         {announcement.type}
//                       </span>
//                       {announcement.attachment && (
//                         <span>📎 Attachment included</span>
//                       )}
//                     </div>
//                   </div>
//                 </div>
//               )}
//             </div>
//           </div>

//           {/* Footer with Submit Button */}
//           <div className="bg-gray-50 px-6 py-6 sm:px-8 sm:py-8 lg:px-12">
//             <div className="flex flex-col sm:flex-row gap-4 sm:justify-between sm:items-center">
//               <div className="text-xs sm:text-sm text-gray-600 order-2 sm:order-1">
//                 <p>* Required fields</p>
//                 <p className="mt-1">
//                   Your announcement will be visible to all community members.
//                 </p>
//               </div>

//               <div className="flex flex-col sm:flex-row gap-3 order-1 sm:order-2">
//                 <button
//                   type="button"
//                   className="w-full sm:w-auto px-6 py-3 sm:px-8 sm:py-4 border border-gray-300 text-gray-700 rounded-lg font-semibold text-sm sm:text-base hover:bg-gray-50 transition-all duration-200 focus:ring-2 focus:ring-gray-300"
//                 >
//                   Save Draft
//                 </button>
//                 <button
//                   type="submit"
//                   disabled={!announcement.title || !announcement.message}
//                   className="w-full sm:w-auto bg-gradient-to-r from-[#333A2F] to-[#3a4235] text-white px-6 py-3 sm:px-8 sm:py-4 rounded-lg font-semibold text-sm sm:text-base hover:from-[#3a4235] hover:to-[#404739] disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 focus:ring-2 focus:ring-[#333A2F] focus:ring-offset-2 shadow-lg"
//                 >
//                   Post Announcement
//                 </button>
//               </div>
//             </div>
//           </div>
//         </form>
//       </div>
//     </div>
//   );
// };

// export default InstructorAnnouncementForm;

import { useState } from "react";
import useAllCourses from "../hooks/useAllCourses";

const InstructorAnnouncementForm = () => {
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
  };

  const getSelectedCourse = () => {
    return courses.find((course) => course.id === announcement.course);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 p-4 sm:p-6 lg:p-8">
      <div className="w-full max-w-4xl mx-auto">
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
                  className="w-full sm:w-auto px-6 py-3 sm:px-8 sm:py-4 border border-gray-300 text-gray-700 rounded-lg font-semibold text-sm sm:text-base hover:bg-gray-50 transition-all duration-200 focus:ring-2 focus:ring-gray-300"
                >
                  Save Draft
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
