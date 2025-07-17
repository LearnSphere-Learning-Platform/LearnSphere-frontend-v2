import React from "react";
import VideoForm from "./VideoForm";
import { Video, Plus } from "lucide-react";

const VideoFormList = ({ videos, onChange }) => {
  const handleAddVideo = () => {
    const newVideo = {
      id: Date.now(),
      title: "",
      duration: "",
      type: "video",
      preview: false,
      video_url: "",
      resources: [],
    };
    onChange([...videos, newVideo]);
  };

  const handleRemoveVideo = (index) => {
    const updated = [...videos];
    updated.splice(index, 1);
    onChange(updated);
  };

  const handleVideoChange = (index, updatedVideo) => {
    const updated = [...videos];
    updated[index] = updatedVideo;
    onChange(updated);
  };

  return (
    <div className="space-y-4">
      <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-3 mb-4">
        <div className="flex items-center gap-3">
          <Video
            className="w-4 h-4 sm:w-5 sm:h-5 flex-shrink-0"
            style={{ color: "#333A2F" }}
          />
          <h4
            className="text-base sm:text-lg font-semibold"
            style={{ color: "#333A2F" }}
          >
            Session Videos
          </h4>
        </div>
        <span
          className="px-2 sm:px-3 py-1 rounded-full text-xs sm:text-sm font-medium text-white w-fit"
          style={{ backgroundColor: "#333A2F" }}
        >
          {videos.length} video{videos.length !== 1 ? "s" : ""}
        </span>
      </div>

      {videos.length === 0 && (
        <div className="text-center py-6 sm:py-8 border-2 border-dashed border-gray-300 rounded-lg">
          <Video
            className="w-6 h-6 sm:w-8 sm:h-8 mx-auto mb-2"
            style={{ color: "#333A2F", opacity: 0.5 }}
          />
          <p
            className="text-sm sm:text-base px-4"
            style={{ color: "#333A2F", opacity: 0.7 }}
          >
            No videos added yet
          </p>
          <p
            className="text-xs sm:text-sm px-4 mt-1"
            style={{ color: "#333A2F", opacity: 0.5 }}
          >
            Add videos to this session
          </p>
        </div>
      )}

      <div className="space-y-3 sm:space-y-4">
        {videos.map((video, index) => (
          <VideoForm
            key={video.id}
            index={index}
            video={video}
            onChange={(v) => handleVideoChange(index, v)}
            onRemove={() => handleRemoveVideo(index)}
          />
        ))}
      </div>

      <div className="flex justify-center pt-2 sm:pt-4">
        <button
          type="button"
          onClick={handleAddVideo}
          className="inline-flex items-center gap-2 px-3 sm:px-4 py-2 sm:py-2.5 text-sm sm:text-base text-white font-medium rounded-lg shadow-md hover:opacity-90 transform hover:scale-105 transition-all duration-200 min-h-[44px] touch-manipulation"
          style={{ backgroundColor: "#333A2F" }}
        >
          <Plus className="w-4 h-4" />
          Add Video
        </button>
      </div>
    </div>
  );
};

export default VideoFormList;
