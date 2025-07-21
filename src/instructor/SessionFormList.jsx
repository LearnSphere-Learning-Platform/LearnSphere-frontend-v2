// import React from "react";
// import SessionForm from "./SessionForm";
// import { PlayCircle, Plus } from "lucide-react";

// const SessionFormList = ({ course, setCourse }) => {
//   const handleAddSession = () => {
//     const newSession = {
//       session: "",
//       module_description: "",
//       content: [], // Changed from 'videos' to 'content' to support multiple content types
//     };

//     setCourse((prev) => ({
//       ...prev,
//       course_content: [...prev.course_content, newSession],
//       no_of_sessions: prev.no_of_sessions + 1,
//     }));
//   };

//   const handleRemoveSession = (index) => {
//     const updated = [...course.course_content];
//     updated.splice(index, 1);

//     setCourse((prev) => ({
//       ...prev,
//       course_content: updated,
//       no_of_sessions: updated.length,
//     }));
//   };

//   const handleSessionChange = (index, updatedSession) => {
//     const updated = [...course.course_content];
//     updated[index] = updatedSession;

//     setCourse((prev) => ({
//       ...prev,
//       course_content: updated,
//     }));
//   };

//   return (
//     <div className="bg-white rounded-xl sm:rounded-2xl shadow-lg p-4 sm:p-6 lg:p-8">
//       <div className="flex items-center gap-2 sm:gap-3 mb-4 sm:mb-6">
//         <PlayCircle
//           className="w-5 h-5 sm:w-6 sm:h-6 flex-shrink-0"
//           style={{ color: "#333A2F" }}
//         />
//         <h2
//           className="text-xl sm:text-2xl font-bold"
//           style={{ color: "#333A2F" }}
//         >
//           Course Sessions
//         </h2>
//       </div>

//       <div className="space-y-4 sm:space-y-6">
//         {course.course_content.map((session, index) => (
//           <SessionForm
//             key={index}
//             index={index}
//             sessionData={session}
//             onChange={(updated) => handleSessionChange(index, updated)}
//             onRemove={() => handleRemoveSession(index)}
//           />
//         ))}

//         {course.course_content.length === 0 && (
//           <div className="text-center py-8 sm:py-12 border-2 border-dashed border-gray-300 rounded-xl">
//             <PlayCircle
//               className="w-10 h-10 sm:w-12 sm:h-12 mx-auto mb-3 sm:mb-4"
//               style={{ color: "#333A2F", opacity: 0.5 }}
//             />
//             <p
//               className="text-base sm:text-lg px-4"
//               style={{ color: "#333A2F", opacity: 0.7 }}
//             >
//               No sessions added yet
//             </p>
//             <p
//               className="text-sm px-4 mt-1"
//               style={{ color: "#333A2F", opacity: 0.5 }}
//             >
//               Click the button below to add your first session
//             </p>
//           </div>
//         )}

//         <div className="flex justify-center pt-2 sm:pt-4">
//           <button
//             type="button"
//             onClick={handleAddSession}
//             className="inline-flex items-center gap-2 px-4 sm:px-6 py-2.5 sm:py-3 text-sm sm:text-base text-white font-semibold rounded-xl shadow-lg hover:opacity-90 transform hover:scale-105 transition-all duration-200 min-h-[44px] touch-manipulation"
//             style={{ backgroundColor: "#333A2F" }}
//           >
//             <Plus className="w-4 h-4 sm:w-5 sm:h-5" />
//             Add Session
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default SessionFormList;

"use client";
import SessionForm from "./SessionForm";
import { PlayCircle, Plus } from "lucide-react";

const SessionFormList = ({
  course,
  setCourse,
  validationErrors,
  setValidationErrors,
}) => {
  const handleAddSession = () => {
    const newSession = {
      session: "",
      module_description: "",
      content: [], // Changed from 'videos' to 'content' to support multiple content types
    };
    setCourse((prev) => ({
      ...prev,
      course_content: [...prev.course_content, newSession],
      no_of_sessions: prev.no_of_sessions + 1,
    }));

    // Clear course content validation error when adding sessions
    if (validationErrors.course_content) {
      setValidationErrors((prev) => {
        const newErrors = { ...prev };
        delete newErrors.course_content;
        return newErrors;
      });
    }
  };

  const handleRemoveSession = (index) => {
    const updated = [...course.course_content];
    updated.splice(index, 1);
    setCourse((prev) => ({
      ...prev,
      course_content: updated,
      no_of_sessions: updated.length,
    }));

    // Clear validation errors for this session
    if (setValidationErrors) {
      setValidationErrors((prev) => {
        const newErrors = { ...prev };
        Object.keys(newErrors).forEach((key) => {
          if (
            key.includes(`session_${index}_`) ||
            key.includes(`content_${index}_`)
          ) {
            delete newErrors[key];
          }
        });
        return newErrors;
      });
    }
  };

  const handleSessionChange = (index, updatedSession) => {
    const updated = [...course.course_content];
    updated[index] = updatedSession;
    setCourse((prev) => ({
      ...prev,
      course_content: updated,
    }));

    // Clear validation errors for this session when data changes
    if (setValidationErrors) {
      setValidationErrors((prev) => {
        const newErrors = { ...prev };
        if (updatedSession.session.trim()) {
          delete newErrors[`session_${index}_title`];
        }
        if (updatedSession.module_description.trim()) {
          delete newErrors[`session_${index}_description`];
        }
        if (updatedSession.content && updatedSession.content.length > 0) {
          delete newErrors[`session_${index}_content`];
        }
        return newErrors;
      });
    }
  };

  // Get validation errors for course content
  const courseContentError = validationErrors?.course_content;

  return (
    <div className="bg-white rounded-xl sm:rounded-2xl shadow-lg p-4 sm:p-6 lg:p-8">
      <div className="flex items-center gap-2 sm:gap-3 mb-4 sm:mb-6">
        <PlayCircle
          className="w-5 h-5 sm:w-6 sm:h-6 flex-shrink-0"
          style={{ color: "#333A2F" }}
        />
        <h2
          className="text-xl sm:text-2xl font-bold"
          style={{ color: "#333A2F" }}
        >
          Course Sessions
        </h2>
      </div>

      {courseContentError && (
        <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-lg">
          <p className="text-red-600 text-sm">{courseContentError}</p>
        </div>
      )}

      <div className="space-y-4 sm:space-y-6">
        {course.course_content.map((session, index) => (
          <SessionForm
            key={index}
            index={index}
            sessionData={session}
            onChange={(updated) => handleSessionChange(index, updated)}
            onRemove={() => handleRemoveSession(index)}
            validationErrors={validationErrors}
            setValidationErrors={setValidationErrors}
          />
        ))}

        {course.course_content.length === 0 && (
          <div className="text-center py-8 sm:py-12 border-2 border-dashed border-gray-300 rounded-xl">
            <PlayCircle
              className="w-10 h-10 sm:w-12 sm:h-12 mx-auto mb-3 sm:mb-4"
              style={{ color: "#333A2F", opacity: 0.5 }}
            />
            <p
              className="text-base sm:text-lg px-4"
              style={{ color: "#333A2F", opacity: 0.7 }}
            >
              No sessions added yet
            </p>
            <p
              className="text-sm px-4 mt-1"
              style={{ color: "#333A2F", opacity: 0.5 }}
            >
              Click the button below to add your first session
            </p>
          </div>
        )}

        <div className="flex justify-center pt-2 sm:pt-4">
          <button
            type="button"
            onClick={handleAddSession}
            className="inline-flex items-center gap-2 px-4 sm:px-6 py-2.5 sm:py-3 text-sm sm:text-base text-white font-semibold rounded-xl shadow-lg hover:opacity-90 transform hover:scale-105 transition-all duration-200 min-h-[44px] touch-manipulation"
            style={{ backgroundColor: "#333A2F" }}
          >
            <Plus className="w-4 h-4 sm:w-5 sm:h-5" />
            Add Session
          </button>
        </div>
      </div>
    </div>
  );
};

export default SessionFormList;
