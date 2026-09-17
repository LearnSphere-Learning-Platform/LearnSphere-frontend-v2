// catalog/CoursePageWrapper.jsx
import { useParams, useLocation } from "react-router-dom";
import useCourseById from "../hooks/useCourseById";
import Enrollment from "./Enrollment";
import CourseInfo from "./CourseInfo";
import CourseTabs from "./CourseTabs";
import CourseInstructor from "./CourseInstructor";

const CoursePageWrapper = () => {
  const { id } = useParams();
  const { course, loading } = useCourseById(id);
  const location = useLocation();

  if (loading) {
    return <div className="text-center p-6 text-gray-700">Loading course...</div>;
  }

  if (!course) {
    return (
      <div className="text-center p-6 text-gray-700">Course not found</div>
    );
  }

  // Only show payment page on /course/:id/payment route (handled by a separate component/route)

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
