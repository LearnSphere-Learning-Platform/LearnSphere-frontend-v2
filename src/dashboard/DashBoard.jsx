import { useState, useRef, useEffect } from 'react';
import { useParams } from 'react-router-dom';
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
import courseData from '../catalog/CourseData';
import LessonInfo from './components/LessonInfo';
import NotesTab from './components/NotesTab';
import DiscussionTab from './components/DiscussionTab';
import AnnouncementsTab from './components/AnnouncementsTab';
import ReviewsTab from './components/ReviewsTab';
import QATab from './components/QATab';

const Dashboard = () => {
  const { id } = useParams();
  const course = courseData.find(c => String(c.id) === String(id));

  // If course not found, show message
  if (!course) {
    return <div className="text-center p-6 text-gray-700">Course not found</div>;
  }

  // All state and logic below should use this course only
  const [currentCourse] = useState(course);
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
          lessons: (session.videos || session.content || []).map((video, videoIndex) => ({
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

  // Automatically set currentLesson to the first lesson of the first module
  useEffect(() => {
    if (!currentLesson && currentCourse && currentCourse.course_content?.length > 0) {
      const firstModule = currentCourse.course_content[0];
      if (firstModule && firstModule.videos && firstModule.videos.length > 0) {
        setCurrentLesson({
          ...firstModule.videos[0],
          videoUrl: firstModule.videos[0].preview && currentCourse.preview
            ? `https://www.youtube.com/embed/${currentCourse.preview.split('v=')[1]?.split('&')[0]}`
            : null
        });
      }
    }
  }, [currentLesson, currentCourse]);


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
        return <QATab />;
      case 'notes':
        return (
          <NotesTab
            notes={notes}
            newNote={newNote}
            setNewNote={setNewNote}
            handleAddNote={handleAddNote}
          />
        );
      case 'discussion':
        return (
          <DiscussionTab
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
          />
        );
      case 'announcements':
        return <AnnouncementsTab />;
      case 'reviews':
        return <ReviewsTab />;
      default:
        return null;
    }
  };

  if (!currentCourse) {
    return (
      <CourseList enrolledCourses={courseData} onSelect={handleCourseSelect} />
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 mt-25" style={{ backgroundColor: '#EBEDDF' }}>
      <div className="container mx-auto px-4 py-8">
        <div className="mb-6">
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
                  <LessonInfo currentLesson={currentLesson} />
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