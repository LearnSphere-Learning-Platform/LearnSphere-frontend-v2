import { Star } from "lucide-react";
import { Link } from "react-router-dom";

const CourseInstructor = ({ courseData }) => {
  return (
    <div className="bg-white rounded-lg shadow-md p-6 mt-5 ">
      <div className="space-y-2">
        <h4 className="font-semibold text-gray-900">Instructor:</h4>
        <div className="flex items-center space-x-3">
          <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
            <span className="text-600 font-semibold text-lg ">
              {courseData.instructor.name
                .split(" ")
                .map((n) => n[0])
                .join("")}
            </span>
          </div>
          <div>
            <Link
              to={`/instructor/${courseData.id}`}
              className="font-medium text-600 hover:underline text-[#333A2F]"
            >
              {courseData.instructor.name}
            </Link>
            <div className="text-sm text-gray-600">
              {courseData.instructor.summary}
            </div>
            <div className="flex items-center text-sm text-gray-500">
              <Star className="h-3 w-3 fill-yellow-400 text-yellow-400 mr-1" />
              <span>
                {courseData.instructor.overall_rating} •{" "}
                {courseData.instructor.no_of_courses_released} courses
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CourseInstructor;
