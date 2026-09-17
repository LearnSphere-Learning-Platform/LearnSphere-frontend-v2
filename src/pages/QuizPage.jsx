import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Quiz from '../quiz/Quiz';
import useCourseById from '../hooks/useCourseById';
import { readJsonFromLocalStorage } from '../utils/safeJsonParse';

// Finds the content item for lessonId anywhere in the course's session list.
const findLesson = (course, lessonId) => {
  if (!course) return null;
  for (const session of course.course_content || []) {
    for (const content of session.content || []) {
      if (String(content.id) === String(lessonId)) return content;
    }
  }
  return null;
};

const QuizPage = () => {
  const { courseId, lessonId } = useParams();
  const navigate = useNavigate();
  const { course, loading } = useCourseById(courseId);
  const lesson = findLesson(course, lessonId);

  const handleQuizComplete = (score, passed) => {
    // Store quiz completion in localStorage
    const quizResults = readJsonFromLocalStorage('quizResults', {});
    quizResults[lessonId] = { score, passed, completedAt: new Date().toISOString() };
    localStorage.setItem('quizResults', JSON.stringify(quizResults));

    // Navigate back to dashboard after a short delay
    setTimeout(() => {
      navigate(`/user/course/${courseId}/dashboard`);
    }, 2000);
  };

  if (loading || !course) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading quiz...</p>
        </div>
      </div>
    );
  }

  if (!lesson) {
    // Lesson id doesn't exist on this course - go back rather than show broken UI
    navigate(`/user/course/${courseId}/dashboard`);
    return null;
  }

  if (!lesson.quiz_config || !lesson.quiz_config.questions?.length) {
    // The instructor hasn't built a quiz for this lesson yet in the Quiz Builder.
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center max-w-md px-4">
          <h1 className="text-xl font-bold text-gray-900 mb-2">No quiz configured</h1>
          <p className="text-gray-600 mb-6">
            The instructor hasn't set up questions for "{lesson.title}" yet.
          </p>
          <button
            onClick={() => navigate(`/user/course/${courseId}/dashboard`)}
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
          >
            Back to Course
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8">
        <div className="mb-6">
          <button
            onClick={() => navigate(`/user/course/${courseId}/dashboard`)}
            className="flex items-center text-blue-600 hover:text-blue-800 mb-4"
          >
            ← Back to Course
          </button>
          <h1 className="text-3xl font-bold text-gray-900">{course.course_name}</h1>
          <p className="text-gray-600">{lesson.title}</p>
        </div>

        <div className="bg-white rounded-lg shadow-md overflow-hidden">
          <Quiz
            quizData={lesson.quiz_config}
            onComplete={handleQuizComplete}
          />
        </div>
      </div>
    </div>
  );
};

export default QuizPage;
