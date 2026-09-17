import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import useCourseById from "../hooks/useCourseById";
import Quiz from "./Quiz";

const QuizLoader = () => {
  const { courseId, moduleId } = useParams();
  const navigate = useNavigate();
  const { course, loading } = useCourseById(courseId);
  const [questionsData, setQuestionsData] = useState(null);

  useEffect(() => {
    if (!course) return;

    // Find the lesson in the course content that matches the lesson id
    let found = null;
    for (const session of course.course_content || []) {
      for (const content of session.content || []) {
        if (String(content.id) === String(moduleId) && content.quiz_config) {
          found = content;
        }
      }
    }

    if (found) {
      setQuestionsData(
        found.quiz_config.questions.map(q => ({
          question: q.question,
          options: q.options.map((opt, index) => ({
            text: opt,
            correct: index === q.correct,
          })),
        }))
      );
    }
  }, [course, moduleId]);

  if (loading) {
    return <div className="p-8 text-center">Loading test...</div>;
  }

  if (!questionsData) {
    return <div className="p-8 text-center text-red-600 font-bold">No test found for this module.</div>;
  }

  return (
    <Quiz
      questionsData={questionsData}
      onBack={() => navigate(-1)}
    />
  );
};

export default QuizLoader;
