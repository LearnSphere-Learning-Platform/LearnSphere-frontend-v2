import { useParams, useNavigate } from "react-router-dom";
import courseData from "../catalog/CourseData";
import Quiz from "./Quiz";

const QuizLoader = () => {
  const { courseId, moduleId } = useParams();
  const navigate = useNavigate();

  // Find the course and module
  const course = courseData.find(c => String(c.id) === String(courseId));
  let questionsData = null;

  if (course) {
    for (const session of course.course_content) {
      for (const video of session.videos) {
        if (String(video.id) === String(moduleId) && video.questions) {
          questionsData = video.questions.map(q => ({
            question: q.question,
            options: q.options.map(opt => ({ text: opt, correct: opt === q.answer })),
          }));
        }
      }
    }
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