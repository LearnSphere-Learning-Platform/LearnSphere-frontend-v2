import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import CodeEditor from '../quiz/CodeEditor';
import courseData from '../catalog/CourseData';

// Coding exercise data for different topics (same as in dashboard)
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

const CodingExercisePage = () => {
  const { courseId, lessonId } = useParams();
  const navigate = useNavigate();
  const [lesson, setLesson] = useState(null);
  const [course, setCourse] = useState(null);

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
      } else {
        // If lesson not found, redirect back to dashboard
        navigate(`/user/course/${courseId}/dashboard`);
      }
    } else {
      // If course not found, redirect to catalog
      navigate('/catalog');
    }
  }, [courseId, lessonId, navigate]);

  const getCodingExerciseData = (lessonTitle) => {
    return codingExerciseData[lessonTitle] || {
      instructions: "Complete the coding exercise as described.",
      starter: "// Write your code here",
      language: 'JavaScript',
      expectedOutput: '',
      hint: 'Follow the instructions carefully'
    };
  };

  const handleCodingExerciseComplete = (passed) => {
    // Store coding exercise completion in localStorage
    const codingResults = JSON.parse(localStorage.getItem('codingResults') || '{}');
    codingResults[lessonId] = { passed, completedAt: new Date().toISOString() };
    localStorage.setItem('codingResults', JSON.stringify(codingResults));
    
    // Navigate back to dashboard after a short delay
    setTimeout(() => {
      navigate(`/user/course/${courseId}/dashboard`);
    }, 2000);
  };

  if (!lesson || !course) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading coding exercise...</p>
        </div>
      </div>
    );
  }

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
            instructions={getCodingExerciseData(lesson.title).instructions}
            expectedOutput={getCodingExerciseData(lesson.title).expectedOutput}
            hint={getCodingExerciseData(lesson.title).hint}
            starter={getCodingExerciseData(lesson.title).starter}
            language={getCodingExerciseData(lesson.title).language}
            onComplete={handleCodingExerciseComplete}
          />
        </div>
      </div>
    </div>
  );
};

export default CodingExercisePage; 