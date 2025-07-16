import React from "react";
import {
  Trash2,
  Play,
  Eye,
  BookOpen,
  Code,
  FileText,
  CheckCircle,
  MessageCircle,
} from "lucide-react";

const VideoForm = ({ index, video, onChange, onRemove }) => {
  const handleInputChange = (e) => {
    const { name, value, type, checked, files } = e.target;
    const newValue =
      type === "checkbox" ? checked : type === "file" ? files[0] : value;

    onChange({
      ...video,
      [name]: newValue,
    });
  };

  return (
    <div className="border border-gray-200 rounded-lg p-4 sm:p-5 bg-gray-50 hover:bg-white transition-colors duration-200">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-4 gap-3 sm:gap-0">
        <div className="flex items-center gap-3">
          <div className="w-6 h-6 sm:w-8 sm:h-8 text-white rounded-full flex items-center justify-center font-bold text-xs sm:text-sm bg-[#333A2F] flex-shrink-0">
            {index + 1}
          </div>
          <div className="min-w-0 flex-1">
            <h5 className="font-semibold text-sm sm:text-base text-[#333A2F]">
              Video {index + 1}
            </h5>
            <p className="text-xs sm:text-sm text-[#333A2F]/70">
              Configure video details
            </p>
          </div>
        </div>
        <button
          type="button"
          onClick={onRemove}
          className="flex items-center justify-center gap-1 px-2 sm:px-3 py-2 hover:bg-red-50 rounded-lg transition-colors duration-200 text-[#333A2F] self-start sm:self-auto min-h-[44px] touch-manipulation"
        >
          <Trash2 className="w-4 h-4" />
          <span className="text-xs sm:text-sm">Remove</span>
        </button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
        <div className="space-y-2">
          <label className="block text-xs sm:text-sm font-semibold text-[#333A2F]">
            Video Title *
          </label>
          <input
            type="text"
            name="title"
            placeholder="Enter video title"
            value={video.title}
            onChange={handleInputChange}
            className="w-full px-3 py-2 sm:py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#333A2F] bg-white text-sm sm:text-base min-h-[44px]"
            required
          />
        </div>

        <div className="space-y-2">
          <label className="block text-xs sm:text-sm font-semibold text-[#333A2F]">
            Duration
          </label>
          <input
            type="text"
            name="duration"
            placeholder="e.g., 12:30"
            value={video.duration}
            onChange={handleInputChange}
            className="w-full px-3 py-2 sm:py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#333A2F] bg-white text-sm sm:text-base min-h-[44px]"
          />
        </div>

        <div className="space-y-2">
          <label className="block text-xs sm:text-sm font-semibold text-[#333A2F]">
            Video Type *
          </label>
          <select
            name="type"
            value={video.type}
            onChange={handleInputChange}
            className="w-full px-3 py-2 sm:py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#333A2F] bg-white text-sm sm:text-base min-h-[44px]"
            required
          >
            <option value="">Select Type</option>
            <option value="video">Video</option>
            <option value="demo">Demo</option>
            <option value="theory">Theory</option>
            <option value="coding-exercise">Coding Exercise</option>
            <option value="assignment">Assignment</option>
            <option value="summary">Summary</option>
            <option value="discussion">Discussion</option>
          </select>
        </div>

        <div className="space-y-2">
          <label className="block text-xs sm:text-sm font-semibold text-[#333A2F]">
            Video URL
          </label>
          <input
            type="url"
            name="video_url"
            placeholder="Enter video URL"
            value={video.video_url}
            onChange={handleInputChange}
            className="w-full px-3 py-2 sm:py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#333A2F] bg-white text-sm sm:text-base min-h-[44px]"
          />
        </div>
      </div>

      <div className="mt-4 pt-4 border-t border-gray-200">
        <label className="flex items-center gap-3 p-3 rounded-lg transition-colors duration-200 cursor-pointer bg-[#EBEDDF] hover:bg-[#EBEDDF]/80">
          <input
            type="checkbox"
            name="preview"
            checked={video.preview}
            onChange={handleInputChange}
            className="w-4 h-4 sm:w-5 sm:h-5 rounded accent-[#333A2F] flex-shrink-0"
          />
          <Eye className="w-4 h-4 text-[#333A2F] flex-shrink-0" />
          <span className="text-xs sm:text-sm font-medium text-[#333A2F]">
            Allow preview for non-enrolled students
          </span>
        </label>
      </div>
    </div>
  );
};

export default VideoForm;
