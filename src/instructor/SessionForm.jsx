import React from "react";
import VideoFormList from "./VideoFormList";
import { Trash2, BookOpen } from "lucide-react";

const SessionForm = ({ index, sessionData, onChange, onRemove }) => {
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    onChange({ ...sessionData, [name]: value });
  };

  const handleVideosChange = (updatedVideos) => {
    onChange({ ...sessionData, videos: updatedVideos });
  };

  return (
    <div className="border-2 border-gray-200 rounded-xl p-4 sm:p-6 bg-gray-50 transition-colors duration-200">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-4 sm:mb-6 gap-4 sm:gap-0">
        <div className="flex items-center gap-3">
          <div
            className="w-8 h-8 sm:w-10 sm:h-10 text-white rounded-full flex items-center justify-center font-bold text-sm sm:text-base flex-shrink-0"
            style={{ backgroundColor: "#333A2F" }}
          >
            {index + 1}
          </div>
          <div className="min-w-0 flex-1">
            <h3
              className="text-lg sm:text-xl font-bold"
              style={{ color: "#333A2F" }}
            >
              Session {index + 1}
            </h3>
            <p className="text-xs sm:text-sm text-gray-600">
              Configure session content and videos
            </p>
          </div>
        </div>

        <button
          type="button"
          onClick={onRemove}
          className="flex items-center justify-center gap-2 px-3 sm:px-4 py-2 hover:bg-red-50 rounded-lg transition-colors duration-200 text-red-600 self-start sm:self-auto min-h-[44px] touch-manipulation"
        >
          <Trash2 className="w-4 h-4" />
          <span className="text-sm">Remove</span>
        </button>
      </div>

      <div className="space-y-4 sm:space-y-6">
        {/* Session Title */}
        <div className="space-y-2">
          <label
            htmlFor={`session-title-${index}`}
            className="flex items-center gap-2 text-sm font-semibold text-gray-700"
          >
            <BookOpen className="w-4 h-4 flex-shrink-0" />
            Session Title *
          </label>
          <input
            id={`session-title-${index}`}
            type="text"
            name="session"
            placeholder="Enter session title"
            value={sessionData.session}
            onChange={handleInputChange}
            className="w-full px-3 sm:px-4 py-2.5 sm:py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#333A2F] bg-white text-sm sm:text-base min-h-[44px]"
            required
          />
        </div>

        {/* Module Description */}
        <div className="space-y-2">
          <label
            htmlFor={`module-description-${index}`}
            className="block text-sm font-semibold text-gray-700"
          >
            Module Description *
          </label>
          <textarea
            id={`module-description-${index}`}
            name="module_description"
            placeholder="Describe what students will learn in this session"
            value={sessionData.module_description}
            onChange={handleInputChange}
            className="w-full px-3 sm:px-4 py-2.5 sm:py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#333A2F] bg-white resize-none text-sm sm:text-base"
            rows={3}
            required
          />
        </div>

        {/* Video Form List */}
        <div className="bg-white rounded-lg p-3 sm:p-4 border border-gray-200">
          <VideoFormList
            videos={sessionData.videos}
            onChange={handleVideosChange}
          />
        </div>
      </div>
    </div>
  );
};

export default SessionForm;
