import { Target, Award, Code, FileText } from 'lucide-react';
import { useNavigate, useParams } from 'react-router-dom';

// Shared between the student dashboard (dashboard/DashBoard.jsx) and the admin course
// preview (admin/pages/CourseDashboard.jsx). The two copies had genuinely different
// behavior, not just a visual diff: the dashboard version navigates to a real test/
// assignment/coding-exercise route for 4 lesson types, while admin's preview version
// calls handleTestComplete/handleOverallTestComplete callbacks directly for just 2 types
// (there's no route to navigate to from inside the admin preview). Both consumers pass
// the same handleTestComplete/handleOverallTestComplete props either way (DashBoard.jsx's
// own old copy of this file just ignored them as dead props), so which behavior to use
// can't be auto-detected from prop presence - hence the explicit `mode` prop instead.
// mode="student" (default) preserves DashBoard.jsx's exact current behavior with zero
// changes there; CourseDashboard.jsx passes mode="preview" to keep its exact current
// behavior too.
const TestContent = ({ currentLesson, handleTestComplete, handleOverallTestComplete, mode = 'student' }) => {
  const navigate = useNavigate();
  const { id: courseId } = useParams();

  const handleStartTest = (lessonId) => {
    if (mode === 'preview') {
      // Admin preview has no real test route to send instructors/admins to - just mark
      // the relevant lesson/course state via the callbacks the parent already wires up.
      if (currentLesson.type === 'final-test') {
        handleOverallTestComplete(true);
      } else {
        handleTestComplete(lessonId, true);
      }
      return;
    }
    if (window.confirm("Do you want to enter fullscreen mode for the test?")) {
      const el = document.documentElement;
      if (el.requestFullscreen) {
        el.requestFullscreen();
      }
    }
    navigate(`/dashboard/course/${courseId}/test/${lessonId}`);
  };

  if (currentLesson.type === 'test') {
    return (
      <div className="bg-white rounded-lg shadow-md p-6">
        <div className="text-center">
          <Target className="w-16 h-16 mx-auto mb-4 text-blue-600" />
          <h2 className="text-2xl font-bold mb-4" style={{ color: '#333A2F' }}>
            {currentLesson.title}
          </h2>
          <p className="text-gray-600 mb-6">
            Test your knowledge on the topics covered in this module.
          </p>
          <div className="space-y-4">
            <button
              onClick={() => handleStartTest(currentLesson.id)}
              className="w-full py-3 px-6 rounded-lg text-white font-semibold"
              style={{ backgroundColor: '#333A2F' }}
            >
              Start Test
            </button>
            <p className="text-sm text-gray-500">
              Duration: {currentLesson.duration} • Pass mark: 70%
            </p>
          </div>
        </div>
      </div>
    );
  }
  if (currentLesson.type === 'final-test') {
    return (
      <div className="bg-white rounded-lg shadow-md p-6">
        <div className="text-center">
          <Award className="w-16 h-16 mx-auto mb-4 text-yellow-600" />
          <h2 className="text-2xl font-bold mb-4" style={{ color: '#333A2F' }}>
            Final Course Assessment
          </h2>
          <p className="text-gray-600 mb-6">
            Complete this final test to earn your certificate of completion.
          </p>
          <div className="space-y-4">
            <button
              onClick={() => handleStartTest(currentLesson.id)}
              className="w-full py-3 px-6 rounded-lg text-white font-semibold"
              style={{ backgroundColor: '#333A2F' }}
            >
              Start Final Test
            </button>
            <p className="text-sm text-gray-500">
              Duration: {currentLesson.duration} • Pass mark: 80%
            </p>
          </div>
        </div>
      </div>
    );
  }
  if (mode === 'student' && currentLesson.type === 'assignment') {
    return (
      <div className="bg-white rounded-lg shadow-md p-6">
        <div className="text-center">
          <FileText className="w-16 h-16 mx-auto mb-4 text-green-600" />
          <h2 className="text-2xl font-bold mb-4" style={{ color: '#333A2F' }}>
            {currentLesson.title}
          </h2>
          <p className="text-gray-600 mb-6">
            Complete this assignment to demonstrate your understanding of the course material.
          </p>
          <div className="space-y-4">
            <button
              onClick={() => handleStartTest(currentLesson.id)}
              className="w-full py-3 px-6 rounded-lg text-white font-semibold"
              style={{ backgroundColor: '#333A2F' }}
            >
              Start Assignment
            </button>
            <p className="text-sm text-gray-500">
              Duration: {currentLesson.duration} • Pass mark: 70%
            </p>
          </div>
        </div>
      </div>
    );
  }
  if (mode === 'student' && currentLesson.type === 'coding-exercise') {
    return (
      <div className="bg-white rounded-lg shadow-md p-6">
        <div className="text-center">
          <Code className="w-16 h-16 mx-auto mb-4 text-purple-600" />
          <h2 className="text-2xl font-bold mb-4" style={{ color: '#333A2F' }}>
            {currentLesson.title}
          </h2>
          <p className="text-gray-600 mb-6">
            Practice your coding skills with this hands-on exercise.
          </p>
          <div className="space-y-4">
            <button
              onClick={() => handleStartTest(currentLesson.id)}
              className="w-full py-3 px-6 rounded-lg text-white font-semibold"
              style={{ backgroundColor: '#333A2F' }}
            >
              Start Coding Exercise
            </button>
            <p className="text-sm text-gray-500">
              Duration: {currentLesson.duration} • Pass mark: 70%
            </p>
          </div>
        </div>
      </div>
    );
  }
  return null;
};

export default TestContent;
