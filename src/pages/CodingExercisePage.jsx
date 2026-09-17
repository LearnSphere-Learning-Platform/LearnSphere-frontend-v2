import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import CodeEditor from '../quiz/CodeEditor';
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

const DEFAULT_EXERCISE = {
  instructions: "Complete the coding exercise as described.",
  starterCode: "// Write your code here",
  language: 'JavaScript',
  expectedOutput: '',
  hint: 'Follow the instructions carefully'
};

const CodingExercisePage = () => {
  const { courseId, lessonId } = useParams();
  const navigate = useNavigate();
  const { course, loading } = useCourseById(courseId);
  const lesson = findLesson(course, lessonId);

  const handleCodingExerciseComplete = (passed) => {
    // Store coding exercise completion in localStorage
    const codingResults = readJsonFromLocalStorage('codingResults', {});
    codingResults[lessonId] = { passed, completedAt: new Date().toISOString() };
    localStorage.setItem('codingResults', JSON.stringify(codingResults));

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
          <p className="text-gray-600">Loading coding exercise...</p>
        </div>
      </div>
    );
  }

  if (!lesson) {
    navigate(`/user/course/${courseId}/dashboard`);
    return null;
  }

  // Real config comes from the instructor's Coding Exercise Builder
  // (content.coding_config, saved via ContentForm.jsx). Fall back to a
  // generic starter if the instructor hasn't configured this lesson yet.
  const cfg = lesson.coding_config;
  const exercise = cfg ? {
    instructions: cfg.instructions || DEFAULT_EXERCISE.instructions,
    starter: cfg.starterCode || DEFAULT_EXERCISE.starterCode,
    language: cfg.language || DEFAULT_EXERCISE.language,
    expectedOutput: cfg.expectedOutput || '',
    hint: cfg.hint || '',
  } : {
    instructions: DEFAULT_EXERCISE.instructions,
    starter: DEFAULT_EXERCISE.starterCode,
    language: DEFAULT_EXERCISE.language,
    expectedOutput: DEFAULT_EXERCISE.expectedOutput,
    hint: DEFAULT_EXERCISE.hint,
  };

  return (
    <div className="h-screen bg-white">
      <div className="h-full flex flex-col">
        <div className="flex-shrink-0 p-4 border-b border-gray-200">
          <button
            onClick={() => navigate(`/user/course/${courseId}/dashboard`)}
            className="flex items-center text-blue-600 hover:text-blue-800"
          >
            ← Back to Course
          </button>
        </div>

        <div className="flex-1 overflow-hidden">
          <CodeEditor
            instructions={exercise.instructions}
            expectedOutput={exercise.expectedOutput}
            hint={exercise.hint}
            starter={exercise.starter}
            language={exercise.language}
            onComplete={handleCodingExerciseComplete}
          />
        </div>
      </div>
    </div>
  );
};

export default CodingExercisePage;
