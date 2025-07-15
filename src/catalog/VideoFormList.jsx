import React from "react";
import VideoForm from "./VideoForm";

const VideoFormList = ({ videos, onChange }) => {
  const handleAddVideo = () => {
    const newVideo = {
      id: Date.now(),
      title: "",
      duration: "",
      type: "video",
      preview: false,
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
      <h5 className="font-medium text-gray-700 mb-2">Videos</h5>
      {videos.map((video, index) => (
        <VideoForm
          key={video.id}
          index={index}
          video={video}
          onChange={(v) => handleVideoChange(index, v)}
          onRemove={() => handleRemoveVideo(index)}
        />
      ))}
      <button
        type="button"
        onClick={handleAddVideo}
        className="text-blue-500 hover:underline text-sm"
      >
        + Add Video
      </button>
    </div>
  );
};

export default VideoFormList;
