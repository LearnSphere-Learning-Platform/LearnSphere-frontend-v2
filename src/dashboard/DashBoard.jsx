import { useState, useRef, useEffect } from 'react';
import { 
  Play, 
  Pause, 
  Volume2, 
  VolumeX, 
  Maximize, 
  CheckCircle, 
  Clock, 
  BookOpen, 
  Award, 
  MessageCircle, 
  ThumbsUp, 
  Reply,
  Send,
  ChevronDown,
  ChevronRight,
  Star,
  Users,
  Calendar,
  FileText,
  Info,
  Bell,
  MessageSquare,
  User,
  Target
} from 'lucide-react';
import VideoPlayer from './components/VideoPlayer';
import LessonSidebar from './components/LessonSidebar';
import TabNavigation from './components/TabNavigation';
import TestContent from './components/TestContent';
import CourseList from './components/CourseList';
import courseData from './catalogData';

const Dashboard = () => {
  // Use data from catalogData.jsx
  const [enrolledCourses] = useState(courseData);
  const [currentCourse, setCurrentCourse] = useState(null);
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

  // Initialize course content from catalogData
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
            type: video.type === 'video' ? 'video' : video.type === 'demo' ? 'video' : 'test'
          }))
        }))
      };
    });
    setCourseContent(contentMap);
  }, []);



  const handleCourseSelect = (course) => {
    setCurrentCourse(course);
    const content = courseContent[course.id];
    if (content && content.modules[0] && content.modules[0].lessons[0]) {
      setCurrentLesson(content.modules[0].lessons[0]);
    }
  };

  const handleLessonSelect = (lesson) => {
    setCurrentLesson(lesson);
    setIsPlaying(false);
    setCurrentTime(0);
  };

  const toggleLessonCompletion = (lessonId) => {
    setCourseContent(prev => {
      const newContent = { ...prev };
      const courseId = currentCourse.id;
      
      newContent[courseId].modules.forEach(module => {
        module.lessons.forEach(lesson => {
          if (lesson.id === lessonId) {
            lesson.completed = !lesson.completed;
          }
        });
      });
      
      return newContent;
    });
  };

  const getCompletedLessonsCount = () => {
    if (!currentCourse || !courseContent[currentCourse.id]) return 0;
    
    let completed = 0;
    courseContent[currentCourse.id].modules.forEach(module => {
      module.lessons.forEach(lesson => {
        if (lesson.completed) completed++;
      });
    });
    return completed;
  };

  const getTotalLessonsCount = () => {
    if (!currentCourse || !courseContent[currentCourse.id]) return 0;
    
    let total = 0;
    courseContent[currentCourse.id].modules.forEach(module => {
      total += module.lessons.length;
    });
    return total;
  };

  const getProgressPercentage = () => {
    const total = getTotalLessonsCount();
    const completed = getCompletedLessonsCount();
    return total > 0 ? Math.round((completed / total) * 100) : 0;
  };

  const handlePlayPause = () => {
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause();
      } else {
        videoRef.current.play();
      }
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
    if (videoRef.current) {
      videoRef.current.volume = newVolume;
    }
  };

  const handleTimeUpdate = () => {
    if (videoRef.current) {
      setCurrentTime(videoRef.current.currentTime);
    }
  };

  const handleLoadedMetadata = () => {
    if (videoRef.current) {
      setDuration(videoRef.current.duration);
    }
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

  // const formatTime = (time) => {
  //   const minutes = Math.floor(time / 60);
  //   const seconds = Math.floor(time % 60);
  //   return `${minutes}:${seconds.toString().padStart(2, '0')}`;
  // };

  const handleModuleToggle = (moduleId) => {
    setExpandedModule(prev =>
      prev.includes(moduleId)
        ? prev.filter(id => id !== moduleId)
        : [...prev, moduleId]
    );
  };

  const handleCommentSubmit = () => {
    if (newComment.trim()) {
      const newDiscussion = {
        id: Date.now(),
        user: "You",
        avatar: "https://via.placeholder.com/40x40?text=U",
        content: newComment,
        timestamp: "just now",
        likes: 0,
        replies: []
      };
      setDiscussions([newDiscussion, ...discussions]);
      setNewComment('');
    }
  };

  const handleLike = (discussionId) => {
    if (likedComments.has(discussionId)) return;
    
    setLikedComments(prev => new Set([...prev, discussionId]));
    setDiscussions(prev => 
      prev.map(d => 
        d.id === discussionId 
          ? { ...d, likes: d.likes + 1 }
          : d
      )
    );
  };

  const handleAddNote = () => {
    if (newNote.trim()) {
      const note = {
        id: Date.now(),
        content: newNote,
        timestamp: new Date().toLocaleTimeString(),
        lessonTitle: currentLesson?.title || 'General'
      };
      setNotes([note, ...notes]);
      setNewNote('');
    }
  };

  const handleReply = (discussionId) => {
    setReplyTo(discussionId);
  };

  const handleReplySubmit = (discussionId) => {
    if (replyContent.trim()) {
      const newReply = {
        id: Date.now(),
        user: "You",
        avatar: "https://via.placeholder.com/40x40?text=U",
        content: replyContent,
        timestamp: "just now",
        likes: 0
      };
      
      setDiscussions(prev => 
        prev.map(d => 
          d.id === discussionId 
            ? { ...d, replies: [...d.replies, newReply] }
            : d
        )
      );
      
      setReplyContent('');
      setReplyTo(null);
    }
  };

  const handleTestComplete = (testId, passed) => {
    if (passed) {
      toggleLessonCompletion(testId);
    }
  };

  const handleOverallTestComplete = (passed) => {
    setOverallTestPassed(passed);
  };

  const canGetCertificate = () => {
    return getProgressPercentage() === 100 && overallTestPassed;
  };

  const handleLessonCheckboxToggle = (moduleId, lessonId) => {
    console.log('=== HANDLE LESSON CHECKBOX TOGGLE ===');
    console.log('Module ID:', moduleId);
    console.log('Lesson ID:', lessonId);
    console.log('Current Course ID:', currentCourse?.id);
    
    setCourseContent(prev => {
      const newContent = { ...prev };
      const courseId = currentCourse.id;
      
      if (newContent[courseId] && newContent[courseId].modules) {
        newContent[courseId] = {
          ...newContent[courseId],
          modules: newContent[courseId].modules.map(module => {
            if (module.id === moduleId) {
              return {
                ...module,
                lessons: module.lessons.map(lesson => {
                  if (lesson.id === lessonId) {
                    console.log('Found lesson:', lesson);
                    console.log('Previous completed state:', lesson.completed);
                    const newCompleted = !lesson.completed;
                    console.log('New completed state:', newCompleted);
                    return {
                      ...lesson,
                      completed: newCompleted
                    };
                  }
                  return lesson;
                })
              };
            }
            return module;
          })
        };
      }
      
      console.log('New Course Content:', newContent);
      return newContent;
    });
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
            <h3 className="text-lg font-semibold mb-4" style={{ color: '#333A2F' }}>{overview?.title || 'Course Overview'}</h3>
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
      case 'qa':
        return (
          <div className="p-6">
            <h3 className="text-lg font-semibold mb-4" style={{ color: '#333A2F' }}>Q&A</h3>
            <div className="text-center text-gray-500 py-8">
              <MessageSquare className="w-12 h-12 mx-auto mb-4 opacity-50" />
              <p>No questions yet. Be the first to ask!</p>
            </div>
          </div>
        );
      case 'notes':
        return (
          <div className="p-6">
            <h3 className="text-lg font-semibold mb-4" style={{ color: '#333A2F' }}>My Notes</h3>
            <div className="space-y-4">
              {notes.map(note => (
                <div key={note.id} className="bg-white p-4 rounded-lg shadow-sm border-l-4 border-blue-400">
                  <div className="flex justify-between items-start mb-2">
                    <span className="text-xs text-gray-500 font-medium">{note.lessonTitle}</span>
                    <span className="text-xs text-gray-500">{note.timestamp}</span>
                  </div>
                  <p className="text-sm text-gray-700">{note.content}</p>
                </div>
              ))}
              <div className="mt-4">
                <textarea
                  value={newNote}
                  onChange={(e) => setNewNote(e.target.value)}
                  placeholder="Add a new note..."
                  className="w-full p-3 border rounded-lg resize-none focus:outline-none focus:ring-2 focus:ring-blue-500"
                  rows="3"
                />
                <button
                  onClick={handleAddNote}
                  className="mt-2 px-4 py-2 rounded-md text-white font-medium hover:opacity-90 transition-opacity"
                  style={{ backgroundColor: '#333A2F' }}
                >
                  Add Note
                </button>
              </div>
            </div>
          </div>
        );
      case 'discussion':
        return (
          <div className="p-6">
            <h3 className="text-lg font-semibold mb-4" style={{ color: '#333A2F' }}>Discussion</h3>
            <div className="space-y-4">
              {discussions.map(discussion => (
                <div key={discussion.id} className="bg-white p-4 rounded-lg shadow-sm">
                  <div className="flex items-start space-x-3 mb-2">
                    <img src={discussion.avatar} alt={discussion.user} className="w-10 h-10 rounded-full" />
                    <div>
                      <h4 className="font-semibold text-sm" style={{ color: '#333A2F' }}>{discussion.user}</h4>
                      <p className="text-xs text-gray-500">{discussion.timestamp}</p>
                    </div>
                  </div>
                  <p className="text-sm text-gray-700 mb-2">{discussion.content}</p>
                  <div className="flex items-center space-x-3 mb-2">
                    <button 
                      onClick={() => handleLike(discussion.id)}
                      className={`flex items-center text-sm ${likedComments.has(discussion.id) ? 'text-blue-600' : 'text-gray-600 hover:text-blue-600'}`}
                    >
                      <ThumbsUp className="w-4 h-4 mr-1" />
                      {discussion.likes}
                    </button>
                    <button 
                      onClick={() => handleReply(discussion.id)}
                      className="text-sm text-gray-600 hover:text-blue-600"
                    >
                      Reply
                    </button>
                  </div>
                  {replyTo === discussion.id && (
                    <div className="mt-2">
                      <textarea
                        value={replyContent}
                        onChange={(e) => setReplyContent(e.target.value)}
                        placeholder="Write a reply..."
                        className="w-full p-2 border rounded-lg resize-none focus:outline-none focus:ring-2 focus:ring-blue-500"
                        rows="2"
                      />
                      <button
                        onClick={() => handleReplySubmit(discussion.id)}
                        className="mt-2 px-4 py-2 rounded-md text-white font-medium hover:opacity-90 transition-opacity"
                        style={{ backgroundColor: '#333A2F' }}
                      >
                        Submit Reply
                      </button>
                    </div>
                  )}
                  {discussion.replies.length > 0 && (
                    <div className="mt-4 border-t pt-2">
                      {discussion.replies.map(reply => (
                        <div key={reply.id} className="flex items-start space-x-3 mb-2">
                          <img src={reply.avatar} alt={reply.user} className="w-8 h-8 rounded-full" />
                          <div>
                            <h5 className="font-semibold text-sm" style={{ color: '#333A2F' }}>{reply.user}</h5>
                            <p className="text-xs text-gray-500">{reply.timestamp}</p>
                            <p className="text-sm text-gray-700 mt-1">{reply.content}</p>
                            <div className="flex items-center space-x-3 mt-1">
                              <button 
                                onClick={() => handleLike(reply.id)}
                                className={`flex items-center text-sm ${likedComments.has(reply.id) ? 'text-blue-600' : 'text-gray-600 hover:text-blue-600'}`}
                              >
                                <ThumbsUp className="w-4 h-4 mr-1" />
                                {reply.likes}
                              </button>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              ))}
              <div className="mt-4">
                <textarea
                  value={newComment}
                  onChange={(e) => setNewComment(e.target.value)}
                  placeholder="Add a new discussion comment..."
                  className="w-full p-3 border rounded-lg resize-none focus:outline-none focus:ring-2 focus:ring-blue-500"
                  rows="3"
                />
                <button
                  onClick={handleCommentSubmit}
                  className="mt-2 px-4 py-2 rounded-md text-white font-medium hover:opacity-90 transition-opacity"
                  style={{ backgroundColor: '#333A2F' }}
                >
                  Post Comment
                </button>
              </div>
            </div>
          </div>
        );
      case 'announcements':
        return (
          <div className="p-6">
            <h3 className="text-lg font-semibold mb-4" style={{ color: '#333A2F' }}>Announcements</h3>
            <div className="text-center text-gray-500 py-8">
              <Bell className="w-12 h-12 mx-auto mb-4 opacity-50" />
              <p>No announcements yet.</p>
            </div>
          </div>
        );
      case 'reviews':
        return (
          <div className="p-6">
            <h3 className="text-lg font-semibold mb-4" style={{ color: '#333A2F' }}>Reviews</h3>
            <div className="text-center text-gray-500 py-8">
              <Star className="w-12 h-12 mx-auto mb-4 opacity-50" />
              <p>No reviews yet. Be the first to review this course!</p>
            </div>
          </div>
        );
      default:
        return null;
    }
  };

  if (!currentCourse) {
    return (
      <CourseList enrolledCourses={enrolledCourses} onSelect={handleCourseSelect} />
    );
  }

  return (
    <div className="min-h-screen bg-gray-50" style={{ backgroundColor: '#EBEDDF' }}>
      <div className="container mx-auto px-4 py-8">
        <div className="mb-6">
          <button 
            onClick={() => setCurrentCourse(null)}
            className="px-4 py-2 rounded-md text-white font-medium hover:opacity-90 transition-opacity mb-4"
            style={{ backgroundColor: '#333A2F' }}
          >
            ← Back to Dashboard
          </button>
          <h1 className="text-3xl font-bold" style={{ color: '#333A2F' }}>
            {currentCourse.course_name}
          </h1>
          <p className="text-gray-600">by {currentCourse.instructor.name}</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Video Player Section */}
          <div className="lg:col-span-3">
            {currentLesson && (currentLesson.type === 'test' || currentLesson.type === 'final-test') ? (
              <TestContent
                currentLesson={currentLesson}
                handleTestComplete={handleTestComplete}
                handleOverallTestComplete={handleOverallTestComplete}
              />
            ) : (
              currentLesson && (
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
                  {/* Lesson Info */}
                  <div className="p-6">
                    <h2 className="text-2xl font-bold mb-2" style={{ color: '#333A2F' }}>
                      {currentLesson.title}
                    </h2>
                    <div className="flex items-center space-x-4 text-gray-600">
                      <div className="flex items-center">
                        <Clock className="w-4 h-4 mr-1" />
                        {currentLesson.duration}
                      </div>
                      {currentLesson.completed && (
                        <div className="flex items-center text-green-600">
                          <CheckCircle className="w-4 h-4 mr-1" />
                          Completed
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              )
            )}
            <TabNavigation
              activeTab={activeTab}
              setActiveTab={setActiveTab}
              renderTabContent={renderTabContent}
            />
          </div>
          {/* Course Sidebar */}
          <LessonSidebar
            currentCourse={currentCourse}
            courseContent={courseContent}
            expandedModule={expandedModule}
            onModuleToggle={handleModuleToggle}
            onLessonSelect={handleLessonSelect}
            getCompletedLessonsCount={getCompletedLessonsCount}
            getTotalLessonsCount={getTotalLessonsCount}
            getProgressPercentage={getProgressPercentage}
            canGetCertificate={canGetCertificate}
            showDiscussion={showDiscussion}
            setShowDiscussion={setShowDiscussion}
            discussions={discussions}
            likedComments={likedComments}
            handleLike={handleLike}
            handleReply={handleReply}
            replyTo={replyTo}
            replyContent={replyContent}
            setReplyContent={setReplyContent}
            handleReplySubmit={handleReplySubmit}
            newComment={newComment}
            setNewComment={setNewComment}
            handleCommentSubmit={handleCommentSubmit}
            onLessonCheckboxToggle={handleLessonCheckboxToggle}
          />
        </div>
      </div>
    </div>
  );
}

export default Dashboard;