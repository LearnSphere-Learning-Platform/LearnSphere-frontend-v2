import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import AssignmentForm from '../quiz/AssignmentForm';
import AssignmentReview from '../quiz/AssignmentReview';
import useCourseById from '../hooks/useCourseById';
import { readJsonFromLocalStorage } from '../utils/safeJsonParse';

const findLesson = (course, lessonId) => {
  if (!course) return null;
  for (const session of course.course_content || []) {
    for (const content of session.content || []) {
      if (String(content.id) === String(lessonId)) return content;
    }
  }
  return null;
};

const AssignmentPage = () => {
  const { courseId, lessonId } = useParams();
  const navigate = useNavigate();
  const { course, loading } = useCourseById(courseId);
  const lesson = findLesson(course, lessonId);
  const [showReview, setShowReview] = useState(false);
  const [submittedAssignment, setSubmittedAssignment] = useState(() => {
    // Check if this assignment was already submitted (no backend submission
    // endpoint exists yet, so submissions are kept client-side for now)
    const assignments = readJsonFromLocalStorage('assignmentSubmissions', {});
    return assignments[lessonId] || null;
  });

  const handleAssignmentSubmit = async (title, description, file) => {
    const assignmentData = {
      id: lessonId,
      title,
      description,
      file: file ? {
        name: file.name,
        size: file.size,
        type: file.type
      } : null,
      submittedAt: new Date().toISOString(),
      lessonTitle: lesson.title,
      courseId: courseId
    };

    // NOTE: there is no backend endpoint yet to persist assignment
    // submissions (course/enrollment services have no such controller) -
    // storing in localStorage until that's built.
    const assignments = readJsonFromLocalStorage('assignmentSubmissions', {});
    assignments[lessonId] = assignmentData;
    localStorage.setItem('assignmentSubmissions', JSON.stringify(assignments));

    setSubmittedAssignment(assignmentData);
    setShowReview(true);
  };

  const handleBackToDashboard = () => {
    navigate(`/user/course/${courseId}/dashboard`);
  };

  if (loading || !course) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading assignment...</p>
        </div>
      </div>
    );
  }

  if (!lesson) {
    navigate(`/user/course/${courseId}/dashboard`);
    return null;
  }

  const config = lesson.assignment_config;

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8">
        <div className="mb-6">
          <button
            onClick={handleBackToDashboard}
            className="flex items-center text-blue-600 hover:text-blue-800 mb-4"
          >
            ← Back to Course
          </button>
          <h1 className="text-3xl font-bold text-gray-900">{course.course_name}</h1>
          <p className="text-gray-600">{lesson.title}</p>
        </div>

        <div className="bg-white rounded-lg shadow-md overflow-hidden">
          {showReview ? (
            <AssignmentReview
              onBack={() => setShowReview(false)}
              assignmentData={submittedAssignment}
            />
          ) : (
            <AssignmentForm
              onSubmitAssignment={handleAssignmentSubmit}
              assignmentTitle={config?.title || lesson.title}
              assignmentDescription={config?.instructions || lesson.description}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default AssignmentPage;
