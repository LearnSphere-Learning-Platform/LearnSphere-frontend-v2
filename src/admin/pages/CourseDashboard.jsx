import { useState, useRef, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import {
  Play, Pause, Volume2, VolumeX, Maximize, CheckCircle, Clock,
  BookOpen, Award, MessageCircle, ThumbsUp, Reply, Send, ChevronDown,
  ChevronRight, Star, Users, Calendar, FileText, Info, Bell,
  MessageSquare, User, Target
} from 'lucide-react';
import { useCourses } from "../components/context/CourseContext";

import VideoPlayer from '../components/courses/VideoPlayer';
import LessonSidebar from '../components/courses/LessonSidebar';
import TabNavigation from '../components/courses/TabNavigation';
import TestContent from '../components/courses/TestContent';
import courseData from '../../catalog/CourseData';
import LessonInfo from '../components/courses/LessonInfo';

const Dashboard = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const course = courseData.find(c => String(c.id) === String(id));

  if (!course) {
    return <div className="text-center p-6 text-gray-700">Course not found</div>;
  }

  const [currentCourse, setCurrentCourse] = useState(course);
  const [courseStatus, setCourseStatus] = useState(course.status || 'New');
  const [currentLesson, setCurrentLesson] = useState(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [volume, setVolume] = useState(1);
  const [showDiscussion, setShowDiscussion] = useState(false);
  const [expandedModule, setExpandedModule] = useState([]);
  const [newComment, setNewComment] = useState('');
  const [discussions, setDiscussions] = useState([]);
  const [activeTab, setActiveTab] = useState('overview');
  const [replyTo, setReplyTo] = useState(null);
  const [replyContent, setReplyContent] = useState('');
  const [likedComments, setLikedComments] = useState(new Set());
  const [courseContent, setCourseContent] = useState({});
  const [overallTestPassed, setOverallTestPassed] = useState(false);
  const [notes, setNotes] = useState([]);
  const [newNote, setNewNote] = useState('');
  const videoRef = useRef(null);

  // Approval states
  const [decisionMade, setDecisionMade] = useState(false);
  const [showDenyModal, setShowDenyModal] = useState(false);
  const [denyReason, setDenyReason] = useState('');

  useEffect(() => {
    const contentMap = {};
    courseData.forEach(course => {
      contentMap[course.id] = {
        modules: course.course_content.map((session, index) => ({
          id: index + 1,
          title: session.session,
          lessons: session.videos.map((video, videoIndex) => ({
            id: video.id,
            title: video.title,
            duration: video.duration,
            completed: false,
            videoUrl: video.preview && course.preview ? 
              `https://www.youtube.com/embed/${course.preview.split('v=')[1]?.split('&')[0]}` : null,
            type: video.type === 'video' || video.type === 'demo' ? 'video' : 'test'
          }))
        }))
      };
    });
    setCourseContent(contentMap);
  }, []);

  useEffect(() => {
    if (!currentLesson && currentCourse && currentCourse.course_content?.length > 0) {
      const firstModule = currentCourse.course_content[0];
      if (firstModule && firstModule.videos.length > 0) {
        setCurrentLesson({
          ...firstModule.videos[0],
          videoUrl: firstModule.videos[0].preview && currentCourse.preview
            ? `https://www.youtube.com/embed/${currentCourse.preview.split('v=')[1]?.split('&')[0]}`
            : null
        });
      }
    }
  }, [currentLesson, currentCourse]);

const { updateCourseStatus } = useCourses();

const handleApprove = () => {
  updateCourseStatus(currentCourse.id, 'Active');
  alert("Course approved successfully!");
  setDecisionMade(true);
  navigate("/courses");
  updateCourseStatus(courseId, "Active"); 
};



  const handleDeny = () => setShowDenyModal(true);

  const submitDeny = () => {
    if (!denyReason.trim()) return;
    console.log(`Denied course: ${currentCourse.course_name}`);
    console.log(`Reason: ${denyReason}`);
    alert(`Denial reason sent to instructor: ${denyReason}`);
    setDecisionMade(true);
    setShowDenyModal(false);
    navigate("/courses");
  };

  const toggleLessonCompletion = (lessonId) => {
    setCourseContent(prev => {
      const newContent = { ...prev };
      const courseId = currentCourse.id;
      newContent[courseId].modules.forEach(module => {
        module.lessons.forEach(lesson => {
          if (lesson.id === lessonId) lesson.completed = !lesson.completed;
        });
      });
      return newContent;
    });
  };

  const getCompletedLessonsCount = () => {
    if (!currentCourse || !courseContent[currentCourse.id]) return 0;
    return courseContent[currentCourse.id].modules.flatMap(m => m.lessons).filter(l => l.completed).length;
  };

  const getTotalLessonsCount = () => {
    if (!currentCourse || !courseContent[currentCourse.id]) return 0;
    return courseContent[currentCourse.id].modules.flatMap(m => m.lessons).length;
  };

  const getProgressPercentage = () => {
    const total = getTotalLessonsCount();
    const completed = getCompletedLessonsCount();
    return total > 0 ? Math.round((completed / total) * 100) : 0;
  };

  const handlePlayPause = () => {
    if (videoRef.current) {
      isPlaying ? videoRef.current.pause() : videoRef.current.play();
      setIsPlaying(!isPlaying);
    }
  };

  const handleMute = () => {
    if (videoRef.current) {
      videoRef.current.muted = !isMuted;
      setIsMuted(!isMuted);
    }
  };

  const handleVolumeChange = (e) => {
    const newVolume = parseFloat(e.target.value);
    setVolume(newVolume);
    if (videoRef.current) videoRef.current.volume = newVolume;
  };

  const handleTimeUpdate = () => {
    if (videoRef.current) setCurrentTime(videoRef.current.currentTime);
  };

  const handleLoadedMetadata = () => {
    if (videoRef.current) setDuration(videoRef.current.duration);
  };

  const handleVideoEnded = () => {
    setIsPlaying(false);
    if (currentLesson && !currentLesson.completed) {
      toggleLessonCompletion(currentLesson.id);
    }
  };

  const handleSeek = (e) => {
    if (videoRef.current) {
      const newTime = (e.target.value / 100) * duration;
      videoRef.current.currentTime = newTime;
      setCurrentTime(newTime);
    }
  };

  const renderTabContent = () => {
    const overview = currentCourse ? {
      title: currentCourse.course_name,
      description: currentCourse.description,
      learn: currentCourse.outcome || [],
      prerequisites: currentCourse.about_course?.skills || []
    } : null;

    switch (activeTab) {
      case 'overview':
        return (
          <div className="p-6">
            <h3 className="text-lg font-semibold mb-4" style={{ color: '#333A2F' }}>{overview?.title}</h3>
            <p className="text-gray-700 mb-4">{overview?.description}</p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="bg-gray-50 p-4 rounded-lg">
                <h4 className="font-semibold mb-2">What you'll learn</h4>
                <ul className="text-sm text-gray-600 space-y-1">
                  {overview?.learn.map((item, i) => <li key={i}>• {item}</li>)}
                </ul>
              </div>
              <div className="bg-gray-50 p-4 rounded-lg">
                <h4 className="font-semibold mb-2">Prerequisites</h4>
                <ul className="text-sm text-gray-600 space-y-1">
                  {overview?.prerequisites.map((item, i) => <li key={i}>• {item}</li>)}
                </ul>
              </div>
            </div>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-6">
        <h1 className="text-3xl font-bold" style={{ color: '#333A2F' }}>{currentCourse.course_name}</h1>
        <p className="text-gray-600">by {currentCourse.instructor.name}</p>

        {courseStatus === 'New' && (
          <div className="mt-2 px-3 py-1 bg-blue-100 text-blue-700 rounded text-sm inline-block">Pending Approval</div>
        )}
        {courseStatus === 'Active' && (
          <div className="mt-2 px-3 py-1 bg-green-100 text-green-700 rounded text-sm inline-block">Active</div>
        )}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        <div className="lg:col-span-3">
          {currentLesson && currentLesson.type === 'test' ? (
            <TestContent
              currentLesson={currentLesson}
              handleTestComplete={toggleLessonCompletion}
              handleOverallTestComplete={setOverallTestPassed}
            />
          ) : currentLesson && (
            <div className="bg-white rounded-lg shadow-md overflow-hidden">
              <VideoPlayer
                videoUrl={currentLesson.videoUrl}
                isPlaying={isPlaying}
                isMuted={isMuted}
                volume={volume}
                currentTime={currentTime}
                duration={duration}
                onPlayPause={handlePlayPause}
                onMute={handleMute}
                onVolumeChange={handleVolumeChange}
                onTimeUpdate={handleTimeUpdate}
                onLoadedMetadata={handleLoadedMetadata}
                onEnded={handleVideoEnded}
                onSeek={handleSeek}
                videoRef={videoRef}
              />
              <LessonInfo currentLesson={currentLesson} />
            </div>
          )}

          <TabNavigation
            activeTab={activeTab}
            setActiveTab={setActiveTab}
            renderTabContent={renderTabContent}
          />
        </div>

        <LessonSidebar
          currentCourse={currentCourse}
          courseContent={courseContent}
          expandedModule={expandedModule}
          onModuleToggle={setExpandedModule}
          onLessonSelect={setCurrentLesson}
          getCompletedLessonsCount={getCompletedLessonsCount}
          getTotalLessonsCount={getTotalLessonsCount}
          getProgressPercentage={getProgressPercentage}
          canGetCertificate={() => getProgressPercentage() === 100 && overallTestPassed}
          showDiscussion={showDiscussion}
          setShowDiscussion={setShowDiscussion}
          discussions={discussions}
          likedComments={likedComments}
          handleLike={(id) => {
            if (!likedComments.has(id)) {
              setLikedComments(new Set([...likedComments, id]));
              setDiscussions(discussions.map(d => d.id === id ? { ...d, likes: d.likes + 1 } : d));
            }
          }}
          handleReply={setReplyTo}
          replyTo={replyTo}
          replyContent={replyContent}
          setReplyContent={setReplyContent}
          handleReplySubmit={(id) => {
            if (replyContent.trim()) {
              const reply = {
                id: Date.now(),
                user: 'You',
                content: replyContent,
                timestamp: 'just now',
                likes: 0
              };
              setDiscussions(discussions.map(d =>
                d.id === id ? { ...d, replies: [...d.replies, reply] } : d
              ));
              setReplyTo(null);
              setReplyContent('');
            }
          }}
          newComment={newComment}
          setNewComment={setNewComment}
          handleCommentSubmit={() => {
            if (newComment.trim()) {
              const newEntry = {
                id: Date.now(),
                user: 'You',
                avatar: '',
                content: newComment,
                timestamp: 'just now',
                likes: 0,
                replies: []
              };
              setDiscussions([newEntry, ...discussions]);
              setNewComment('');
            }
          }}
          onLessonCheckboxToggle={(moduleId, lessonId) => {
            setCourseContent(prev => {
              const updated = { ...prev };
              updated[currentCourse.id].modules = updated[currentCourse.id].modules.map(module => {
                if (module.id === moduleId) {
                  return {
                    ...module,
                    lessons: module.lessons.map(lesson =>
                      lesson.id === lessonId ? { ...lesson, completed: !lesson.completed } : lesson
                    )
                  };
                }
                return module;
              });
              return updated;
            });
          }}
        />
      </div>

      {courseStatus === 'New' && !decisionMade && (
        <div className="mt-8 flex justify-end space-x-4">
          <button
            onClick={handleApprove}
            className="px-6 py-2 bg-green-600 text-white rounded hover:bg-green-700"
          >
            Approve
          </button>
          <button
            onClick={handleDeny}
            className="px-6 py-2 bg-red-600 text-white rounded hover:bg-red-700"
          >
            Deny
          </button>
        </div>
      )}

      {showDenyModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded shadow-md w-full max-w-md">
            <h2 className="text-xl font-semibold mb-4">Deny Course</h2>
            <p className="mb-4 text-gray-600">Please provide a reason for denial:</p>
            <textarea
              placeholder="Reason for denial"
              value={denyReason}
              onChange={(e) => setDenyReason(e.target.value)}
              className="w-full p-2 border rounded mb-4"
              rows={4}
            />
            <div className="flex justify-end space-x-2">
              <button onClick={() => setShowDenyModal(false)} className="px-4 py-2 rounded bg-gray-300 hover:bg-gray-400">
                Cancel
              </button>
              <button
                onClick={submitDeny}
                className="px-4 py-2 rounded bg-red-600 text-white hover:bg-red-700"
                disabled={!denyReason.trim()}
              >
                Send Reason
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Dashboard;