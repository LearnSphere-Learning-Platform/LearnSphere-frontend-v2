import React from "react";

const VideoForm = ({ index, video, onChange, onRemove }) => {
  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    onChange({
      ...video,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  return (
    <div className="border border-gray-200 rounded-md p-4 bg-gray-50">
      <div className="flex justify-between items-center mb-2">
        <p className="text-sm font-semibold text-gray-600">Video {index + 1}</p>
        <button
          type="button"
          onClick={onRemove}
          className="text-red-500 text-xs hover:underline"
        >
          Remove Video
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-2">
        <input
          type="text"
          name="title"
          placeholder="Title"
          value={video.title}
          onChange={handleInputChange}
          className="w-full border border-gray-300 rounded-md p-2"
        />
        <input
          type="text"
          name="duration"
          placeholder="Duration (e.g. 12:30)"
          value={video.duration}
          onChange={handleInputChange}
          className="w-full border border-gray-300 rounded-md p-2"
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-2">
        <select
          name="type"
          value={video.type}
          onChange={handleInputChange}
          className="w-full border border-gray-300 rounded-md p-2"
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

        <div className="space-y-1">
          <label className="block text-sm font-medium text-gray-700">
            Video URL
          </label>
          <input
            className="w-full border border-gray-300 rounded-md p-2"
            type="url"
            name="video_url"
            placeholder="https://example.com/video"
            value={video.video_url}
            onChange={handleInputChange}
          />
        </div>
      </div>
    </div>
  );
};

export default VideoForm;
