import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import AssignmentForm from '../quiz/AssignmentForm';
import AssignmentReview from '../quiz/AssignmentReview';
import courseData from '../catalog/CourseData';

const AssignmentPage = () => {
  const { courseId, lessonId } = useParams();
  const navigate = useNavigate();
  const [lesson, setLesson] = useState(null);
  const [course, setCourse] = useState(null);
  const [showReview, setShowReview] = useState(false);
  const [submittedAssignment, setSubmittedAssignment] = useState(null);

  useEffect(() => {
    // Find the course and lesson
    const foundCourse = courseData.find(c => String(c.id) === String(courseId));
    if (foundCourse) {
      setCourse(foundCourse);
      
      // Find the lesson in the course content
      let foundLesson = null;
      foundCourse.course_content.forEach(session => {
        session.content.forEach(content => {
          if (String(content.id) === String(lessonId)) {
            foundLesson = content;
          }
        });
      });
      
      if (foundLesson) {
        setLesson(foundLesson);
        
        // Check if assignment was already submitted
        const assignments = JSON.parse(localStorage.getItem('assignmentSubmissions') || '{}');
        if (assignments[lessonId]) {
          setSubmittedAssignment(assignments[lessonId]);
        }
      } else {
        // If lesson not found, redirect back to dashboard
        navigate(`/user/course/${courseId}/dashboard`);
      }
    } else {
      // If course not found, redirect to catalog
      navigate('/catalog');
    }
  }, [courseId, lessonId, navigate]);

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

    // Store assignment submission
    const assignments = JSON.parse(localStorage.getItem('assignmentSubmissions') || '{}');
    assignments[lessonId] = assignmentData;
    localStorage.setItem('assignmentSubmissions', JSON.stringify(assignments));
    
    setSubmittedAssignment(assignmentData);
    setShowReview(true);
  };

  const handleBackToDashboard = () => {
    navigate(`/user/course/${courseId}/dashboard`);
  };

  if (!lesson || !course) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading assignment...</p>
        </div>
      </div>
    );
  }

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
              assignmentTitle={lesson.title}
              assignmentDescription={lesson.description}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default AssignmentPage; 