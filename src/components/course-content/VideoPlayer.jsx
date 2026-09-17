import { useRef, useEffect } from 'react';
import { Play, Pause, Volume2, VolumeX, Maximize } from 'lucide-react';

// Shared between the student dashboard (dashboard/DashBoard.jsx) and the admin course
// preview (admin/pages/CourseDashboard.jsx) - the two copies of this file had drifted
// apart to nothing but a couple of missing "cursor-pointer" classes, so they're now one
// file. Same prop contract both consumers already used, nothing else changed behavior-wise.
const VideoPlayer = ({
  videoUrl,
  isPlaying,
  isMuted,
  volume,
  currentTime,
  duration,
  onPlayPause,
  onMute,
  onVolumeChange,
  onTimeUpdate,
  onLoadedMetadata,
  onEnded,
  onSeek,
  videoRef
}) => {
  const formatTime = (time) => {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds.toString().padStart(2, '0')}`;
  };

  const handleFullscreen = () => {
    if (videoRef.current) {
      if (document.fullscreenElement) {
        document.exitFullscreen();
      } else {
        videoRef.current.requestFullscreen();
      }
    }
  };

  return (
    <div className="relative">
      <video
        ref={videoRef}
        className="w-full h-64 sm:h-80 md:h-96 lg:h-[28rem] xl:h-[32rem] bg-black"
        src={videoUrl}
        onTimeUpdate={onTimeUpdate}
        onLoadedMetadata={onLoadedMetadata}
        onEnded={onEnded}
      />
      {/* Video Controls */}
      <div className="absolute bottom-0 left-0 right-0 bg-black bg-opacity-70 text-white p-4">
        <div className="flex items-center space-x-4">
          <button onClick={onPlayPause} className="hover:text-blue-400 transition-colors cursor-pointer">
            {isPlaying ? <Pause className="w-6 h-6" /> : <Play className="w-6 h-6" />}
          </button>
          <div className="flex items-center space-x-2 flex-1">
            <span className="text-sm">{formatTime(currentTime)}</span>
            <input
              type="range"
              min="0"
              max="100"
              value={duration ? (currentTime / duration) * 100 : 0}
              onChange={onSeek}
              className="flex-1 h-2 bg-gray-600 rounded-lg appearance-none cursor-pointer slider"
              style={{
                background: `linear-gradient(to right, #3B82F6 0%, #3B82F6 ${duration ? (currentTime / duration) * 100 : 0}%, #4B5563 ${duration ? (currentTime / duration) * 100 : 0}%, #4B5563 100%)`
              }}
            />
            <span className="text-sm">{formatTime(duration)}</span>
          </div>
          <div className="flex items-center space-x-2">
            <button onClick={onMute} className="hover:text-blue-400 transition-colors cursor-pointer">
              {isMuted ? <VolumeX className="w-5 h-5" /> : <Volume2 className="w-5 h-5" />}
            </button>
            <input
              type="range"
              min="0"
              max="1"
              step="0.1"
              value={volume}
              onChange={onVolumeChange}
              className="w-20 h-2 bg-gray-600 rounded-lg appearance-none cursor-pointer slider"
              style={{
                background: `linear-gradient(to right, #10B981 0%, #10B981 ${volume * 100}%, #4B5563 ${volume * 100}%, #4B5563 100%)`
              }}
            />
            <button onClick={handleFullscreen} className="hover:text-blue-400 transition-colors cursor-pointer">
              <Maximize className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>

      <style jsx>{`
        .slider::-webkit-slider-thumb {
          appearance: none;
          height: 16px;
          width: 16px;
          border-radius: 50%;
          background: #ffffff;
          cursor: pointer;
          box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
        }

        .slider::-moz-range-thumb {
          height: 16px;
          width: 16px;
          border-radius: 50%;
          background: #ffffff;
          cursor: pointer;
          border: none;
          box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
        }

        .slider:focus {
          outline: none;
        }
      `}</style>
    </div>
  );
};

export default VideoPlayer;
