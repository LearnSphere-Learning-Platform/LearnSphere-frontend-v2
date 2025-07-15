import { Target, Award, Code, FileText } from 'lucide-react';
import { useNavigate, useParams } from 'react-router-dom';

const TestContent = ({ currentLesson, handleTestComplete, handleOverallTestComplete }) => {
  const navigate = useNavigate();
  const { id: courseId } = useParams();

  const handleStartTest = (lessonId) => {
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
  if (currentLesson.type === 'assignment') {
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
  if (currentLesson.type === 'coding-exercise') {
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