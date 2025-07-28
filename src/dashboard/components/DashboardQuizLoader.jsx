import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import courseData from '../../catalog/CourseData';
import Quiz from '../../quiz/Quiz';

const DashboardQuizLoader = () => {
  const { courseId, lessonId } = useParams();
  const navigate = useNavigate();
  const [showWarning, setShowWarning] = useState(false);
  const [warningMessage, setWarningMessage] = useState('');

  // Find the course and lesson
  const course = courseData.find(c => String(c.id) === String(courseId));
  let questionsData = null;
  let lessonTitle = '';

  if (course) {
    for (const session of course.course_content) {
      for (const video of session.videos) {
        if (String(video.id) === String(lessonId) && video.questions) {
          questionsData = video.questions.map(q => ({
            question: q.question,
            options: q.options.map(opt => ({ text: opt, correct: opt === q.answer })),
          }));
          lessonTitle = video.title;
        }
      }
    }
  }

  useEffect(() => {
    // Add quiz-fullscreen class to hide header/footer
    document.body.classList.add('quiz-fullscreen');
    
    const handleFullscreenChange = () => {
      if (!document.fullscreenElement) {
        setWarningMessage('You must stay in fullscreen to complete the test. Please re-enter fullscreen.');
        setShowWarning(true);
      }
    };

    const handleVisibilityChange = () => {
      if (document.visibilityState !== 'visible') {
        setWarningMessage('You must keep this tab active to complete the test. Please return to this tab.');
        setShowWarning(true);
      }
    };

    document.addEventListener('fullscreenchange', handleFullscreenChange);
    document.addEventListener('visibilitychange', handleVisibilityChange);
    
    return () => {
      // Remove quiz-fullscreen class and exit fullscreen on unmount
      document.body.classList.remove('quiz-fullscreen');
      document.removeEventListener('fullscreenchange', handleFullscreenChange);
      document.removeEventListener('visibilitychange', handleVisibilityChange);
      if (document.fullscreenElement) {
        document.exitFullscreen();
      }
    };
  }, []);

  const handleReenterFullscreen = () => {
    setShowWarning(false);
    setWarningMessage('');
    const el = document.documentElement;
    if (el.requestFullscreen) {
      el.requestFullscreen();
    }
    window.focus();
  };

  if (!questionsData) {
    return <div className="p-8 text-center text-red-600 font-bold">No test found for this lesson.</div>;
  }

  return (
    <div className="min-h-screen bg-white flex flex-col items-center justify-center">
      {showWarning && (
        <div className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50">
          <div className="bg-white p-8 rounded shadow text-center max-w-md w-full">
            <h2 className="text-xl font-bold mb-4 text-red-600">Test Paused</h2>
            <p className="mb-4">{warningMessage}</p>
            <button
              className="bg-[#333A2F] text-white px-6 py-2 rounded font-semibold"
              onClick={handleReenterFullscreen}
            >
              Re-enter Fullscreen & Focus Tab
            </button>
          </div>
        </div>
      )}
      <div style={showWarning ? { pointerEvents: 'none', opacity: 0.5 } : {}}>
        <Quiz
          questionsData={questionsData}
          onBack={() => {
            if (document.fullscreenElement) {
              document.exitFullscreen();
            }
            navigate(-1);
          }}
        />
      </div>
    </div>
  );
};

export default DashboardQuizLoader; 