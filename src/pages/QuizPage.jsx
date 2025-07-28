import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Quiz from '../quiz/Quiz';
import courseData from '../catalog/CourseData';

// Quiz data for different topics (same as in dashboard)
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

const QuizPage = () => {
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

  const getQuizData = (lessonTitle) => {
    return quizDataMap[lessonTitle] || defaultQuizData;
  };

  const handleQuizComplete = (score, passed) => {
    // Store quiz completion in localStorage
    const quizResults = JSON.parse(localStorage.getItem('quizResults') || '{}');
    quizResults[lessonId] = { score, passed, completedAt: new Date().toISOString() };
    localStorage.setItem('quizResults', JSON.stringify(quizResults));
    
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
          <p className="text-gray-600">Loading quiz...</p>
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
            quizData={getQuizData(lesson.title)}
            onComplete={handleQuizComplete}
          />
        </div>
      </div>
    </div>
  );
};

export default QuizPage; 