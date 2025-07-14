import React, { useState, useEffect } from "react";
import { BsFillPlayFill } from "react-icons/bs";

const ThumbnailImage = ({ videoId, thumbnailError, onError }) => {
  const baseUrl = `https://img.youtube.com/vi/${videoId}`;
  const placeholder =
    "https://placehold.co/640x360/333/fff?text=Course+Preview";

  const thumbnailUrls = [
    `${baseUrl}/maxresdefault.jpg`,
    `${baseUrl}/hqdefault.jpg`,
    placeholder,
  ];

  return (
    <img
      src={thumbnailError ? thumbnailUrls[2] : thumbnailUrls[0]}
      alt="Video thumbnail"
      className="w-full h-full object-cover filter contrast-[1.05] saturate-[1.1]"
      loading="eager"
      onError={(e) => {
        if (e.target.src !== thumbnailUrls[1]) {
          e.target.src = thumbnailUrls[1];
        } else {
          onError();
        }
      }}
    />
  );
};

const PlayButtonOverlay = () => (
  <div className="absolute inset-0 flex items-center justify-center bg-black/50 group-hover:bg-black/40 transition-all hover:scale-105">
    <div className="w-12 h-12 sm:w-16 sm:h-16 bg-white  rounded-full flex items-center justify-center group-hover:scale-105 transition-transform shadow-md">
      <BsFillPlayFill className="text-black text-3xl ml-1" />
    </div>
  </div>
);

const VideoModal = ({ videoId, onClose }) => {
  useEffect(() => {
    const handleEsc = (e) => e.key === "Escape" && onClose();
    window.addEventListener("keydown", handleEsc);
    return () => window.removeEventListener("keydown", handleEsc);
  }, [onClose]);

  return (
    <div
      className="fixed inset-0 bg-white/60 z-50 flex items-center justify-center p-2 sm:p-4"
      onClick={onClose}
    >
      <div className="relative w-full max-w-2xl lg:max-w-4xl mx-2">
        <button
          onClick={onClose}
          className="absolute -top-8 sm:-top-10 right-0 text-white text-3xl sm:text-4xl hover:text-gray-300 transition-colors"
          aria-label="Close video"
        >
          &times;
        </button>
        <div className="aspect-video border-2 border-white rounded-lg overflow-hidden">
          <iframe
            className="w-full h-full"
            src={`https://www.youtube.com/embed/${videoId}?autoplay=1`}
            title="Course Preview"
            allow="autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            loading="lazy"
            allowFullScreen
          />
        </div>
      </div>
    </div>
  );
};

const PreviewVideo = ({ videoId = "dQw4w9WgXcQ" }) => {
  const [showModal, setShowModal] = useState(false);
  const [thumbnailError, setThumbnailError] = useState(false);

  return (
    <div className="w-full max-w-full md:max-w-md mx-auto lg:ml-5 mt-4 lg:mt-15 px-4 sm:px-0 lg:mb-3">
      <div
        onClick={() => setShowModal(true)}
        className="relative aspect-video cursor-pointer group rounded-lg overflow-hidden border-2 border-white shadow-lg transition-all hover:shadow-xl"
      >
        <ThumbnailImage
          videoId={videoId}
          thumbnailError={thumbnailError}
          onError={() => setThumbnailError(true)}
        />
        <PlayButtonOverlay />
      </div>

      {showModal && (
        <VideoModal videoId={videoId} onClose={() => setShowModal(false)} />
      )}
    </div>
  );
};

export default PreviewVideo;
