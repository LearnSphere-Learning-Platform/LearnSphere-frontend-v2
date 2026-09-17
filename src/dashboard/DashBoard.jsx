import { useState, useRef, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
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
  Target,
  Code,
  ClipboardCheck
} from 'lucide-react';
import { MdOutlineAssignment } from 'react-icons/md';
import VideoPlayer from '../components/course-content/VideoPlayer';
import LessonSidebar from '../components/course-content/LessonSidebar';
import TabNavigation from '../components/course-content/TabNavigation';
import TestContent from '../components/course-content/TestContent';
import CourseList from './components/CourseList';
import useCourseById from '../hooks/useCourseById';
import useAllCourses from '../hooks/useAllCourses';
import LessonInfo from './components/LessonInfo';
import NotesTab from './components/NotesTab';
import DiscussionTab from './components/DiscussionTab';
import AnnouncementsTab from './components/AnnouncementsTab';
import ReviewsTab from './components/ReviewsTab';
import QATab from './components/QATab';
import Quiz from '../quiz/Quiz';
import AssignmentForm from '../quiz/AssignmentForm';
import AssignmentReview from '../quiz/AssignmentReview';
import CodeEditor from '../quiz/CodeEditor';
import CourseFeedbackForm from './components/CourseFeedbackForm';
import { readJsonFromLocalStorage } from '../utils/safeJsonParse';
import jsPDF from 'jspdf';


// Quiz data for different topics
const quizDataMap = {
  'Quiz: Python Basics': {
    topic: 'Python Basics Quiz',
    questions: [
      {
        question: "What is Python?",
        options: [
          "A. A programming language", 
          "B. A snake", 
          "C. A database", 
          "D. An operating system"
        ],
        correct: 0
      },
      {
        question: "Which of the following is used to create a list in Python?",
        options: [
          "A. ()", 
          "B. []", 
          "C. {}", 
          "D. <>"
        ],
        correct: 1
      },
      {
        question: "What is the correct way to create a variable in Python?",
        options: [
          "A. var x = 5", 
          "B. x = 5", 
          "C. let x = 5", 
          "D. const x = 5"
        ],
        correct: 1
      },
      {
        question: "Which method is used to add an element to a list?",
        options: [
          "A. add()", 
          "B. append()", 
          "C. insert()", 
          "D. push()"
        ],
        correct: 1
      },
      {
        question: "What does the 'print()' function do?",
        options: [
          "A. Creates a file", 
          "B. Displays output", 
          "C. Calculates math", 
          "D. Imports modules"
        ],
        correct: 1
      }
    ]
  },
  'Quiz: React Fundamentals': {
    topic: 'React Fundamentals Quiz',
    questions: [
      {
        question: "What is React?",
        options: [
          "A. A database", 
          "B. A JavaScript library", 
          "C. An operating system", 
          "D. A programming language"
        ],
        correct: 1
      },
      {
        question: "What is a component in React?",
        options: [
          "A. A function or class that returns JSX", 
          "B. A CSS file", 
          "C. A database table", 
          "D. An HTML tag"
        ],
        correct: 0
      },
      {
        question: "What hook is used for state management?",
        options: [
          "A. useEffect", 
          "B. useState", 
          "C. useContext", 
          "D. useReducer"
        ],
        correct: 1
      },
      {
        question: "What does JSX stand for?",
        options: [
          "A. JavaScript XML", 
          "B. Java Syntax Extension", 
          "C. JavaScript Extension", 
          "D. Java XML"
        ],
        correct: 0
      },
      {
        question: "How do you pass data to a component?",
        options: [
          "A. Through CSS", 
          "B. Through props", 
          "C. Through state", 
          "D. Through context"
        ],
        correct: 1
      }
    ]
  },
  'Quiz: Data Analysis': {
    topic: 'Data Analysis Quiz',
    questions: [
      {
        question: "What is Pandas used for?",
        options: [
          "A. Web development", 
          "B. Data manipulation and analysis", 
          "C. Game development", 
          "D. Mobile app development"
        ],
        correct: 1
      },
      {
        question: "What is a DataFrame?",
        options: [
          "A. A 2D labeled data structure", 
          "B. A database", 
          "C. A chart", 
          "D. A file format"
        ],
        correct: 0
      },
      {
        question: "Which library is commonly used for plotting in Python?",
        options: [
          "A. NumPy", 
          "B. Matplotlib", 
          "C. Pandas", 
          "D. Scikit-learn"
        ],
        correct: 1
      },
      {
        question: "What does groupby() do in Pandas?",
        options: [
          "A. Groups data by specified criteria", 
          "B. Sorts data", 
          "C. Filters data", 
          "D. Merges data"
        ],
        correct: 0
      },
      {
        question: "What is the purpose of data cleaning?",
        options: [
          "A. To make data look pretty", 
          "B. To remove errors and inconsistencies", 
          "C. To compress data", 
          "D. To encrypt data"
        ],
        correct: 1
      }
    ]
  }
};

// Default quiz data for any quiz not in the map
const defaultQuizData = {
  topic: 'General Knowledge Quiz',
  questions: [
    {
      question: "What is the purpose of this quiz?",
      options: [
        "A. To test your knowledge", 
        "B. To waste time", 
        "C. To confuse you", 
        "D. To make you think"
      ],
      correct: 0
    },
    {
      question: "How many questions are typically in a quiz?",
      options: [
        "A. 1-2", 
        "B. 3-5", 
        "C. 10-15", 
        "D. 20+"
      ],
      correct: 2
    },
    {
      question: "What should you do if you're unsure about an answer?",
      options: [
        "A. Skip the question", 
        "B. Guess randomly", 
        "C. Review the material", 
        "D. Ask for help"
      ],
      correct: 2
    }
  ]
};

// Coding exercise data for different topics
const codingExerciseData = {
  'Building a Simple Model': {
    instructions: "Create a simple function that returns 'Hello World'",
    starter: `function helloWorld() {
  // Write your code here
  return "Hello World";
}

// Test your function
console.log(helloWorld());`,
    language: 'JavaScript',
    expectedOutput: 'Hello World',
    hint: 'Make sure to return the exact string "Hello World"'
  },
  'React Component Exercise': {
    instructions: "Create a simple React component that displays 'Hello React'",
    starter: `function App() {
  return (
    <div>
      <h1>Hello React</h1>
    </div>
  );
}`,
    language: 'React',
    expectedOutput: 'Hello React',
    hint: 'Use JSX to create a div with an h1 element'
  },
  'Python Function Exercise': {
    instructions: "Write a Python function that adds two numbers",
    starter: `def add_numbers(a, b):
    # Write your code here
    return a + b

# Test your function
print(add_numbers(5, 3))`,
    language: 'Python',
    expectedOutput: '8',
    hint: 'Use the + operator to add the two parameters'
  }
};

// Loads the course from the backend, then renders the dashboard with it
const Dashboard = () => {
  const { id } = useParams();
  const { course, loading } = useCourseById(id);
  const allCourses = useAllCourses();

  if (loading) {
    return <div className="text-center p-6 text-gray-700">Loading course...</div>;
  }

  // If course not found, show message
  if (!course) {
    return <div className="text-center p-6 text-gray-700">Course not found</div>;
  }

  return <DashboardContent course={course} allCourses={allCourses} />;
};

const DashboardContent = ({ course, allCourses }) => {
  const navigate = useNavigate();

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
  const [quizAttempts, setQuizAttempts] = useState({});
  const [quizScores, setQuizScores] = useState({});
  const [assignmentSubmissions, setAssignmentSubmissions] = useState({});
  const [showAssignmentReview, setShowAssignmentReview] = useState(false);
  const [showCodingExercise, setShowCodingExercise] = useState(false);
  const [showFeedbackForm, setShowFeedbackForm] = useState(false);
  const [feedbackSubmitted, setFeedbackSubmitted] = useState(false);
  const [courseFeedback, setCourseFeedback] = useState({});

  const videoRef = useRef(null);

  // Initialize course content for the current course (from the backend course data)
  useEffect(() => {
    const contentMap = {};
    contentMap[course.id] = {
      modules: course.course_content.map((session, index) => ({
        id: index + 1,
        title: session.session,
        lessons: (session.videos || session.content || []).map((video) => ({
          id: video.id,
          title: video.title,
          duration: video.duration,
          completed: false,
          videoUrl: video.type === 'video' ? video.url : null,
          // the backend calls it "coding", the dashboard expects "coding-exercise"
          type: video.type === 'coding' ? 'coding-exercise' : video.type
        }))
      }))
    };
    setCourseContent(contentMap);
  }, [course.id]);

  // Load completion data from localStorage
  useEffect(() => {
    if (course) {
      // Load quiz results
      const quizResults = readJsonFromLocalStorage('quizResults', {});
      const newQuizScores = {};
      const newQuizAttempts = {};
      
      Object.keys(quizResults).forEach(lessonId => {
        const result = quizResults[lessonId];
        newQuizScores[lessonId] = result.score;
        newQuizAttempts[lessonId] = 1; // Assuming one attempt per quiz
      });
      
      setQuizScores(newQuizScores);
      setQuizAttempts(newQuizAttempts);

      // Load assignment submissions
      const assignments = readJsonFromLocalStorage('assignmentSubmissions', {});
      setAssignmentSubmissions(assignments);

      // Load coding exercise results
      const codingResults = readJsonFromLocalStorage('codingResults', {});
      
      // Load feedback data
      const feedbackData = readJsonFromLocalStorage('courseFeedback', {});
      setCourseFeedback(feedbackData);
      setFeedbackSubmitted(feedbackData[currentCourse?.id] ? true : false);
      
      // Mark completed lessons
      setCourseContent(prev => {
        const newContent = { ...prev };
        const courseId = course.id;
        
        if (newContent[courseId]) {
          newContent[courseId].modules.forEach(module => {
            module.lessons.forEach(lesson => {
              // Check if lesson is completed based on type
              if (lesson.type === 'quiz' && quizResults[lesson.id]?.passed) {
                lesson.completed = true;
              } else if (lesson.type === 'assignment' && assignments[lesson.id]) {
                lesson.completed = true;
              } else if (lesson.type === 'coding-exercise' && codingResults[lesson.id]?.passed) {
                lesson.completed = true;
              }
            });
          });
        }
        
        return newContent;
      });
    }
  }, [course]);

  // Automatically set currentLesson to the first lesson of the first module
  useEffect(() => {
    if (!currentLesson && currentCourse && currentCourse.course_content?.length > 0) {
      const firstModule = currentCourse.course_content[0];
      const firstContent = (firstModule.videos || firstModule.content || [])[0];
      if (firstContent) {
        setCurrentLesson({
          ...firstContent,
          videoUrl: firstContent.type === 'video' ? firstContent.url : null,
          type: firstContent.type === 'coding' ? 'coding-exercise' : firstContent.type
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

  const handleQuizComplete = (quizId, score, passed) => {
    setQuizAttempts(prev => ({
      ...prev,
      [quizId]: (prev[quizId] || 0) + 1
    }));
    
    setQuizScores(prev => ({
      ...prev,
      [quizId]: score
    }));

    if (passed) {
      toggleLessonCompletion(quizId);
    }
  };

  const getQuizData = (lessonTitle) => {
    return quizDataMap[lessonTitle] || defaultQuizData;
  };



  const handleAssignmentSubmit = async (title, description, file) => {
    const assignmentData = {
      id: currentLesson.id,
      title,
      description,
      file: file ? {
        name: file.name,
        size: file.size,
        type: file.type
      } : null,
      submittedAt: new Date().toISOString(),
      lessonTitle: currentLesson.title
    };

    setAssignmentSubmissions(prev => ({
      ...prev,
      [currentLesson.id]: assignmentData
    }));

    // Mark assignment as completed
    toggleLessonCompletion(currentLesson.id);
    
    // Show success message
    console.log('Assignment submitted:', assignmentData);
  };

  const handleAssignmentReview = () => {
    setShowAssignmentReview(true);
  };

  const handleCodingExerciseComplete = (exerciseId, passed) => {
    if (passed) {
      toggleLessonCompletion(exerciseId);
    }
  };

  const handleFeedbackSubmit = (feedbackData) => {
    console.log('Feedback submitted:', feedbackData);
    
    // Save feedback to localStorage
    const allFeedback = readJsonFromLocalStorage('courseFeedback', {});
    allFeedback[currentCourse.id] = {
      ...feedbackData,
      submittedAt: new Date().toISOString(),
      courseId: currentCourse.id,
      courseName: currentCourse.course_name
    };
    localStorage.setItem('courseFeedback', JSON.stringify(allFeedback));
    
    // Update state
    setCourseFeedback(allFeedback);
    setFeedbackSubmitted(true);
    setShowFeedbackForm(false);
    
    alert('Thank you for your feedback! You can now download your certificate.');
  };

  const handleDownloadCertificate = () => {
    if (!canGetCertificate()) {
      alert('Please complete the course and submit feedback to download your certificate.');
      return;
    }

    // Student name comes from the logged-in user's stored profile (set at login in
    // authService.login), not from anything on the course itself.
    const storedUser = readJsonFromLocalStorage('user', {});
    const studentName = storedUser.fullName || localStorage.getItem('username') || 'Student';
    const rating = courseFeedback[currentCourse.id]?.rating;
    const certificateId = `LS-${currentCourse.id}-${Date.now().toString(36).toUpperCase()}`;

    // Landscape A4, in mm - previously this just downloaded a plain-text .txt file with no
    // layout at all. Now a designed PDF certificate matching the app's brand colors
    // (#333A2F / #EBEDDF used throughout the dashboard/course pages): triple border frame,
    // ornamental corners, a LearnSphere wordmark, a laurel-wrapped seal, and a subtle "LS"
    // watermark tucked into empty space so it never competes with the readable text.
    const doc = new jsPDF({ orientation: 'landscape', unit: 'mm', format: 'a4' });
    const pageWidth = doc.internal.pageSize.getWidth();
    const pageHeight = doc.internal.pageSize.getHeight();
    const accent = [51, 58, 47]; // #333A2F
    const cream = [235, 237, 223]; // #EBEDDF
    const gold = [180, 140, 60];
    const goldLight = [205, 170, 100];

    const letterSpace = (str, spaces = 1) => str.split('').join(' '.repeat(spaces));

    const drawPolygon = (points, style, color, lineWidth) => {
      const segs = [];
      for (let i = 1; i < points.length; i++) {
        segs.push([points[i][0] - points[i - 1][0], points[i][1] - points[i - 1][1]]);
      }
      if (style === 'F') {
        doc.setFillColor(...color);
      } else {
        doc.setDrawColor(...color);
        doc.setLineWidth(lineWidth || 0.2);
      }
      doc.lines(segs, points[0][0], points[0][1], [1, 1], style, true);
    };

    // jsPDF's built-in fonts (Helvetica/Times) don't have the Unicode star glyph - text with a
    // star character renders as "&". Draw actual 5-point star shapes instead.
    const drawStar = (cx, cy, outerR, innerR, filled) => {
      const pts = [];
      for (let i = 0; i < 10; i++) {
        const angle = (Math.PI / 5) * i - Math.PI / 2;
        const r = i % 2 === 0 ? outerR : innerR;
        pts.push([cx + r * Math.cos(angle), cy + r * Math.sin(angle)]);
      }
      drawPolygon(pts, filled ? 'F' : 'S', filled ? gold : [200, 200, 200], 0.2);
    };

    // A simple pointed-leaf polygon, tip pointing along angleDeg, base at (cx,cy)
    const drawLeaf = (cx, cy, angleDeg, length, width, color) => {
      const angle = (angleDeg * Math.PI) / 180;
      const cos = Math.cos(angle);
      const sin = Math.sin(angle);
      const local = [
        [0, 0],
        [length * 0.32, width / 2],
        [length, 0],
        [length * 0.32, -width / 2],
      ];
      const world = local.map(([x, y]) => [cx + x * cos - y * sin, cy + x * sin + y * cos]);
      drawPolygon(world, 'F', color);
    };

    // side: 1 = right branch, -1 = left branch. Leaves hug close to the medal along its lower
    // half, oriented tangent to that arc (like real laurel leaflets along a curved stem).
    const drawLaurelBranch = (cx, cy, side) => {
      const leafCount = 5;
      for (let i = 0; i < leafCount; i++) {
        const t = i / (leafCount - 1);
        const arcDeg = 200 - t * 120;
        const angle = side === 1 ? 180 - arcDeg : arcDeg;
        const radius = 9.5 + t * 3.5;
        const rad = (angle * Math.PI) / 180;
        const lx = cx + radius * Math.cos(rad);
        const ly = cy - radius * Math.sin(rad);
        const tangent = angle + (side === 1 ? -68 : 68);
        const size = 7 - t * 2.2;
        drawLeaf(lx, ly, -tangent, size, size * 0.42, i % 2 === 0 ? gold : goldLight);
      }
    };

    // ---------- Background ----------
    doc.setFillColor(...cream);
    doc.rect(0, 0, pageWidth, pageHeight, 'F');

    // Faint watermark monogram, tucked into empty space so it never competes with the text
    doc.saveGraphicsState();
    doc.setGState(new doc.GState({ opacity: 0.07 }));
    doc.setFont('times', 'bold');
    doc.setFontSize(60);
    doc.setTextColor(...accent);
    doc.text('LS', pageWidth / 2, pageHeight * 0.83, { align: 'center' });
    doc.restoreGraphicsState();

    // ---------- Border frame ----------
    doc.setDrawColor(...accent);
    doc.setLineWidth(1.3);
    doc.rect(8, 8, pageWidth - 16, pageHeight - 16);
    doc.setDrawColor(...gold);
    doc.setLineWidth(0.5);
    doc.rect(11.5, 11.5, pageWidth - 23, pageHeight - 23);
    doc.setDrawColor(...accent);
    doc.setLineWidth(0.25);
    doc.rect(13.5, 13.5, pageWidth - 27, pageHeight - 27);

    // Ornamental corner brackets over the border, all 4 corners
    const corner = (x, y, dx, dy) => {
      doc.setDrawColor(...gold);
      doc.setLineWidth(0.9);
      doc.line(x, y, x + dx * 14, y);
      doc.line(x, y, x, y + dy * 14);
      doc.setFillColor(...gold);
      doc.circle(x, y, 1.3, 'F');
    };
    corner(8, 8, 1, 1);
    corner(pageWidth - 8, 8, -1, 1);
    corner(8, pageHeight - 8, 1, -1);
    corner(pageWidth - 8, pageHeight - 8, -1, -1);

    // ---------- Header wordmark ----------
    const wmY = 26;
    doc.setFillColor(...accent);
    doc.circle(pageWidth / 2 - 24, wmY - 1.5, 3.2, 'F');
    doc.setFont('times', 'bold');
    doc.setFontSize(8);
    doc.setTextColor(255, 255, 255);
    doc.text('LS', pageWidth / 2 - 24, wmY, { align: 'center' });
    doc.setFont('helvetica', 'normal');
    doc.setFontSize(12);
    doc.setTextColor(...accent);
    doc.text(letterSpace('LEARNSPHERE', 1), pageWidth / 2 - 18, wmY + 0.5, { align: 'left' });

    // ---------- Title ----------
    doc.setTextColor(...accent);
    doc.setFont('times', 'bold');
    doc.setFontSize(32);
    doc.text(letterSpace('CERTIFICATE OF COMPLETION', 0.6), pageWidth / 2, 48, { align: 'center' });

    doc.setDrawColor(...gold);
    doc.setLineWidth(0.6);
    doc.line(pageWidth / 2 - 45, 55, pageWidth / 2 - 4, 55);
    doc.line(pageWidth / 2 + 4, 55, pageWidth / 2 + 45, 55);
    drawPolygon(
      [
        [pageWidth / 2, 55 - 2],
        [pageWidth / 2 + 2, 55],
        [pageWidth / 2, 55 + 2],
        [pageWidth / 2 - 2, 55],
      ],
      'F',
      gold
    );

    // ---------- Body ----------
    doc.setFont('helvetica', 'normal');
    doc.setFontSize(12.5);
    doc.setTextColor(90, 90, 90);
    doc.text('This certificate is proudly presented to', pageWidth / 2, 68, { align: 'center' });

    doc.setFont('times', 'bolditalic');
    doc.setFontSize(29);
    doc.setTextColor(...accent);
    doc.text(studentName, pageWidth / 2, 84, { align: 'center' });
    const nameWidth = doc.getTextWidth(studentName);
    doc.setDrawColor(...gold);
    doc.setLineWidth(0.5);
    doc.line(pageWidth / 2 - nameWidth / 2 - 6, 88, pageWidth / 2 + nameWidth / 2 + 6, 88);

    doc.setFont('helvetica', 'normal');
    doc.setFontSize(12.5);
    doc.setTextColor(90, 90, 90);
    doc.text('for successfully completing the course', pageWidth / 2, 99, { align: 'center' });

    doc.setFont('helvetica', 'bolditalic');
    doc.setFontSize(17);
    doc.setTextColor(...accent);
    doc.text(`“${currentCourse.course_name}”`, pageWidth / 2, 111, { align: 'center' });

    // Details row
    doc.setFont('helvetica', 'normal');
    doc.setFontSize(10.5);
    doc.setTextColor(100, 100, 100);
    const detailsY = 126;
    doc.text('INSTRUCTOR', pageWidth / 2 - 90, detailsY, { align: 'center' });
    doc.text('DURATION', pageWidth / 2, detailsY, { align: 'center' });
    doc.text('DATE', pageWidth / 2 + 90, detailsY, { align: 'center' });

    doc.setFont('helvetica', 'bold');
    doc.setFontSize(11.5);
    doc.setTextColor(...accent);
    doc.text(currentCourse.instructor?.name || 'N/A', pageWidth / 2 - 90, detailsY + 6, { align: 'center' });
    doc.text(`${currentCourse.total_no_hours || 'N/A'} hours`, pageWidth / 2, detailsY + 6, { align: 'center' });
    doc.text(new Date().toLocaleDateString(), pageWidth / 2 + 90, detailsY + 6, { align: 'center' });

    doc.setDrawColor(...gold);
    doc.setLineWidth(0.3);
    doc.line(pageWidth / 2 - 45, detailsY - 4, pageWidth / 2 - 45, detailsY + 8);
    doc.line(pageWidth / 2 + 45, detailsY - 4, pageWidth / 2 + 45, detailsY + 8);

    if (rating) {
      const rounded = Math.round(rating);
      const ratingY = detailsY + 20;
      doc.setFont('helvetica', 'normal');
      doc.setFontSize(10);
      doc.setTextColor(100, 100, 100);
      const label = `FEEDBACK RATING  (${rating}/5)`;
      const labelWidth = doc.getTextWidth(label);
      const startX = pageWidth / 2 - (labelWidth + 6 + 5 * 7) / 2;
      doc.text(label, startX, ratingY + 1.5);
      for (let i = 0; i < 5; i++) {
        drawStar(startX + labelWidth + 6 + i * 7 + 2.5, ratingY, 2.5, 1, i < rounded);
      }
    }

    // ---------- Seal with laurel wreath (bottom-left) ----------
    const sealX = 48;
    const sealY = pageHeight - 42;
    drawLaurelBranch(sealX, sealY, 1);
    drawLaurelBranch(sealX, sealY, -1);
    doc.setFillColor(...gold);
    doc.circle(sealX, sealY, 11, 'F');
    doc.setFillColor(...accent);
    doc.circle(sealX, sealY, 8.5, 'F');
    doc.setDrawColor(255, 255, 255);
    doc.setLineWidth(0.4);
    doc.circle(sealX, sealY, 6.8, 'S');
    doc.setTextColor(255, 255, 255);
    doc.setFont('times', 'bold');
    doc.setFontSize(10);
    doc.text('LS', sealX, sealY + 2.6, { align: 'center' });
    doc.setFillColor(...gold);
    doc.triangle(sealX - 5.5, sealY + 8, sealX - 1.5, sealY + 20, sealX - 9, sealY + 18, 'F');
    doc.triangle(sealX + 5.5, sealY + 8, sealX + 1.5, sealY + 20, sealX + 9, sealY + 18, 'F');

    // ---------- Signature (bottom-right) ----------
    const sigX = pageWidth - 65;
    doc.setDrawColor(...accent);
    doc.setLineWidth(0.4);
    doc.line(sigX - 38, pageHeight - 38, sigX + 38, pageHeight - 38);
    doc.setFont('times', 'bolditalic');
    doc.setFontSize(15);
    doc.setTextColor(...accent);
    doc.text('LearnSphere', sigX, pageHeight - 43, { align: 'center' });
    doc.setFont('helvetica', 'normal');
    doc.setFontSize(9);
    doc.setTextColor(100, 100, 100);
    doc.text('PROGRAM DIRECTOR', sigX, pageHeight - 33, { align: 'center' });

    // ---------- Footer ----------
    doc.setFontSize(7.5);
    doc.setTextColor(140, 140, 140);
    doc.text(`Certificate ID: ${certificateId}`, 20, pageHeight - 16);
    doc.text(`Generated on ${new Date().toLocaleString()}`, pageWidth - 20, pageHeight - 16, { align: 'right' });

    doc.save(`${currentCourse.course_name.replace(/\s+/g, '_')}_Certificate.pdf`);
  };

  const getCodingExerciseData = (lessonTitle) => {
    return codingExerciseData[lessonTitle] || {
      instructions: "Complete the coding exercise as described.",
      starter: "// Write your code here",
      language: 'JavaScript',
      expectedOutput: '',
      hint: 'Follow the instructions carefully'
    };
  };

  const canGetCertificate = () => {
    return getProgressPercentage() === 100 && overallTestPassed && feedbackSubmitted;
  };

  // Function to check if lesson should show video player
  const shouldShowVideoPlayer = (lesson) => {
    if (!lesson) return false;
    return ['video', 'demo', 'theory', 'summary'].includes(lesson.type);
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
            courseId={id}
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
      <CourseList enrolledCourses={allCourses} onSelect={handleCourseSelect} />
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
          {/* Content Section */}
          <div className="lg:col-span-3">
            {currentLesson && (currentLesson.type === 'test' || currentLesson.type === 'final-test') ? (
              <TestContent
                currentLesson={currentLesson}
                handleTestComplete={handleTestComplete}
                handleOverallTestComplete={handleOverallTestComplete}
              />
            ) : currentLesson && currentLesson.type === 'quiz' ? (
              <div className="bg-white rounded-lg shadow-md overflow-hidden">
                <div className="p-6 relative">
                  {/* Start Button - Top Right */}
                  <button 
                    className="absolute top-4 right-4 py-2 px-3 rounded-lg text-white font-semibold text-xs flex items-center"
                    style={{ backgroundColor: '#333A2F' }}
                    onClick={() => navigate(`/user/course/${id}/quiz/${currentLesson.id}`)}
                  >
                    <Play className="w-3 h-3 mr-1" />
                    Start Quiz
                  </button>
                  
                  <h2 className="text-xl font-semibold mb-4" style={{ color: '#333A2F' }}>
                    {currentLesson.title}
                  </h2>
                  <div className="flex items-center mb-4">
                    <span className="inline-flex items-center px-3 py-1 rounded-full bg-blue-100 text-blue-700 text-sm font-medium mr-3">
                      <ClipboardCheck className="w-4 h-4 mr-1" />
                      quiz
                    </span>
                    <span className="text-gray-500 text-sm">{currentLesson.duration}</span>
                  </div>
                  <p className="text-gray-700 mb-4">{currentLesson.description}</p>
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <h3 className="font-semibold mb-2">Instructions</h3>
                    <p className="text-sm text-gray-600">
                      Take the quiz to test your knowledge. You can retake it if needed.
                    </p>
                  </div>
                </div>
              </div>
                        ) : currentLesson && currentLesson.type === 'assignment' ? (
              <div className="bg-white rounded-lg shadow-md overflow-hidden">
                <div className="p-6 relative">
                  {/* Start Button - Top Right */}
                  <button 
                    className="absolute top-4 right-4 py-2 px-3 rounded-lg text-white font-semibold text-xs flex items-center"
                    style={{ backgroundColor: '#333A2F' }}
                    onClick={() => navigate(`/user/course/${id}/assignment/${currentLesson.id}`)}
                  >
                    <Play className="w-3 h-3 mr-1" />
                    Start Assignment
                  </button>
                  
                  <h2 className="text-xl font-semibold mb-4" style={{ color: '#333A2F' }}>
                    {currentLesson.title}
                  </h2>
                  <div className="flex items-center mb-4">
                    <span className="inline-flex items-center px-3 py-1 rounded-full bg-blue-100 text-blue-700 text-sm font-medium mr-3">
                      <MdOutlineAssignment className="w-4 h-4 mr-1" />
                      assignment
                    </span>
                    <span className="text-gray-500 text-sm">{currentLesson.duration}</span>
                  </div>
                  <p className="text-gray-700 mb-4">{currentLesson.description}</p>
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <h3 className="font-semibold mb-2">Instructions</h3>
                    <p className="text-sm text-gray-600">
                      Complete the assignment as described. Upload your work when finished.
                    </p>
                    {assignmentSubmissions[currentLesson.id] && (
                      <div className="mt-4 pt-4 border-t border-gray-200">
                        <button
                          onClick={() => setShowAssignmentReview(true)}
                          className="px-4 py-2 bg-blue-600 text-white rounded-lg text-sm hover:bg-blue-700 transition-colors"
                        >
                          View Submission
                        </button>
                      </div>
                    )}
                  </div>
                </div>
              </div>
              ) : currentLesson && currentLesson.type === 'coding-exercise' ? (
                <div className="bg-white rounded-lg shadow-md overflow-hidden">
                  <div className="p-6 relative">
                    {/* Start Button - Top Right */}
                                      <button 
                    className="absolute top-4 right-4 py-2 px-3 rounded-lg text-white font-semibold text-xs flex items-center"
                    style={{ backgroundColor: '#333A2F' }}
                    onClick={() => navigate(`/user/course/${id}/coding/${currentLesson.id}`)}
                  >
                    <Play className="w-3 h-3 mr-1" />
                    Start Coding
                  </button>
                    
                    <h2 className="text-xl font-semibold mb-4" style={{ color: '#333A2F' }}>
                      {currentLesson.title}
                    </h2>
                    <div className="flex items-center mb-4">
                      <span className="inline-flex items-center px-3 py-1 rounded-full bg-blue-100 text-blue-700 text-sm font-medium mr-3">
                        <Code className="w-4 h-4 mr-1" />
                        coding-exercise
                      </span>
                      <span className="text-gray-500 text-sm">{currentLesson.duration}</span>
                    </div>
                    <p className="text-gray-700 mb-4">{currentLesson.description}</p>
                    <div className="bg-gray-50 p-4 rounded-lg">
                      <h3 className="font-semibold mb-2">Instructions</h3>
                      <p className="text-sm text-gray-600">
                        Complete the coding exercise below. Follow the instructions carefully and submit your solution when ready.
                      </p>
                    </div>
                  </div>
                </div>
              ) : currentLesson && shouldShowVideoPlayer(currentLesson) ? (
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
            ) : currentLesson ? (
              <div className="bg-white rounded-lg shadow-md overflow-hidden">
                <div className="p-6 relative">
                  {/* Start Button - Top Right */}
                  <button 
                    className="absolute top-4 right-4 py-2 px-3 rounded-lg text-white font-semibold text-xs flex items-center"
                    style={{ backgroundColor: '#333A2F' }}
                    onClick={() => {
                      console.log(`Starting ${currentLesson.type}: ${currentLesson.title}`);
                    }}
                  >
                    <Play className="w-3 h-3 mr-1" />
                    {currentLesson.type === 'pdf' ? 'Start Download' : 
                     currentLesson.type === 'assignment' ? 'Start Assignment' :
                     currentLesson.type === 'coding-exercise' ? 'Start Coding' :
                     currentLesson.type === 'quiz' ? 'Start Quiz' : 'Start Test'}
                  </button>
                  
                  <h2 className="text-xl font-semibold mb-4" style={{ color: '#333A2F' }}>
                    {currentLesson.title}
                  </h2>
                  <div className="flex items-center mb-4">
                    <span className="inline-flex items-center px-3 py-1 rounded-full bg-blue-100 text-blue-700 text-sm font-medium mr-3">
                      {currentLesson.type === 'coding-exercise' && <Code className="w-4 h-4 mr-1" />}
                      {currentLesson.type === 'assignment' && <MdOutlineAssignment className="w-4 h-4 mr-1" />}
                      {currentLesson.type === 'pdf' && <FileText className="w-4 h-4 mr-1" />}
                      {currentLesson.type === 'quiz' && <ClipboardCheck className="w-4 h-4 mr-1" />}
                      {currentLesson.type}
                    </span>
                    <span className="text-gray-500 text-sm">{currentLesson.duration}</span>
                  </div>
                  <p className="text-gray-700 mb-4">{currentLesson.description}</p>
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <h3 className="font-semibold mb-2">Instructions</h3>
                    <p className="text-sm text-gray-600">
                      {currentLesson.type === 'coding-exercise' && 
                        "Complete the coding exercise below. Follow the instructions carefully and submit your solution when ready."}
                      {currentLesson.type === 'assignment' && 
                        "Complete the assignment as described. Upload your work when finished."}
                      {currentLesson.type === 'pdf' && 
                        "Download and review the PDF document. Take notes on important concepts."}
                      {currentLesson.type === 'quiz' && 
                        "Take the quiz to test your knowledge. You can retake it if needed."}
                    </p>
                    {currentLesson.type === 'assignment' && assignmentSubmissions[currentLesson.id] && (
                      <div className="mt-4 pt-4 border-t border-gray-200">
                        <button
                          onClick={() => setShowAssignmentReview(true)}
                          className="px-4 py-2 bg-blue-600 text-white rounded-lg text-sm hover:bg-blue-700 transition-colors"
                        >
                          View Submission
                        </button>
                      </div>
                    )}
                  </div>

                </div>
              </div>
            ) : null}
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
            quizScores={quizScores}
            quizAttempts={quizAttempts}
            assignmentSubmissions={assignmentSubmissions}
            showCodingExercise={showCodingExercise}
            showFeedbackForm={showFeedbackForm}
            setShowFeedbackForm={setShowFeedbackForm}
            feedbackSubmitted={feedbackSubmitted}
            handleDownloadCertificate={handleDownloadCertificate}
            overallTestPassed={overallTestPassed}
          />
        </div>
      </div>

      {/* Feedback Modal */}
      {showFeedbackForm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg shadow-xl max-w-2xl w-full mx-4 max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-2xl font-bold text-[#333A2F]">Course Feedback</h2>
                <button
                  onClick={() => setShowFeedbackForm(false)}
                  className="text-gray-500 hover:text-gray-700 text-2xl font-bold"
                >
                  ×
                </button>
              </div>
              <CourseFeedbackForm onSubmit={handleFeedbackSubmit} />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Dashboard;