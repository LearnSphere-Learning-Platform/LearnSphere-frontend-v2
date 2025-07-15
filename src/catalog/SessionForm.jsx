import React from "react";
import VideoFormList from "./VideoFormList";

const SessionForm = ({ index, sessionData, onChange, onRemove }) => {
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    onChange({ ...sessionData, [name]: value });
  };

  const handleVideosChange = (updatedVideos) => {
    onChange({ ...sessionData, videos: updatedVideos });
  };

  return (
    <div className="border border-gray-300 rounded-lg p-5 bg-white shadow-sm">
      <div className="flex justify-between items-center mb-4">
        <h4 className="font-semibold text-gray-800">Session {index + 1}</h4>
        <button
          type="button"
          onClick={onRemove}
          className="text-red-500 text-sm hover:underline"
        >
          Remove Session
        </button>
      </div>

      <input
        type="text"
        name="session"
        placeholder="Session Title"
        value={sessionData.session}
        onChange={handleInputChange}
        className="w-full mb-3 border border-gray-300 rounded-md p-2"
      />
      <textarea
        name="module_description"
        placeholder="Module Description"
        value={sessionData.module_description}
        onChange={handleInputChange}
        className="w-full mb-4 border border-gray-300 rounded-md p-2"
      />

      <VideoFormList
        videos={sessionData.videos}
        onChange={handleVideosChange}
      />
    </div>
  );
};

export default SessionForm;
