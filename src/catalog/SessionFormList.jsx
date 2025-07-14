import React from "react";
import SessionForm from "./SessionForm";

const SessionFormList = ({ course, setCourse }) => {
  const handleAddSession = () => {
    const newSession = {
      session: "",
      module_description: "",
      videos: [],
    };

    setCourse((prev) => ({
      ...prev,
      course_content: [...prev.course_content, newSession],
      no_of_sessions: prev.no_of_sessions + 1,
    }));
  };

  const handleRemoveSession = (index) => {
    const updated = [...course.course_content];
    updated.splice(index, 1);

    setCourse((prev) => ({
      ...prev,
      course_content: updated,
      no_of_sessions: updated.length,
    }));
  };

  const handleSessionChange = (index, updatedSession) => {
    const updated = [...course.course_content];
    updated[index] = updatedSession;

    setCourse((prev) => ({
      ...prev,
      course_content: updated,
    }));
  };

  return (
    <div className="space-y-6 border border-gray-300 rounded-md p-4 bg-gray-50 mt-4">
      <h3 className="text-xl font-semibold text-gray-800 mb-3">
        Course Sessions
      </h3>

      {course.course_content.map((session, index) => (
        <SessionForm
          key={index}
          index={index}
          sessionData={session}
          onChange={(updated) => handleSessionChange(index, updated)}
          onRemove={() => handleRemoveSession(index)}
        />
      ))}

      <button
        type="button"
        onClick={handleAddSession}
        className="text-blue-600 hover:underline text-sm mt-2"
      >
        + Add Session
      </button>
    </div>
  );
};

export default SessionFormList;
