// catalog/CoursePageWrapper.jsx
import { useParams } from "react-router-dom";
import { getCourseById } from "../hooks/useSelectedCourse";
import Enrollment from "./Enrollment";
import CourseInfo from "./CourseInfo";
import CourseTabs from "./CourseTabs";
import CourseInstructor from "./CourseInstructor";

const CoursePageWrapper = () => {
  const { id } = useParams();
  const course = getCourseById(id);

  if (!course) {
    return (
      <div className="text-center p-6 text-gray-700">Course not found</div>
    );
  }

  return (
    <div className="max-w-10xl mx-auto px-4 bg-[#EBEDDF] pb-10">
      <Enrollment />
      <CourseInfo courseData={course} />
      <CourseTabs courseData={course} />
      <CourseInstructor courseData={course} />
    </div>
  );
};

export default CoursePageWrapper;
