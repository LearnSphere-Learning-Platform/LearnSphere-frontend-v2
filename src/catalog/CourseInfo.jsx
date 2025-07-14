import { Star, BookOpen, TrendingUp } from "lucide-react";

const CourseInfo = ({ courseData }) => {
  return (
    <div className="bg-white rounded-lg shadow-md p-6 mb-6">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Number of Sessions */}
        <div className="flex flex-col items-center text-center">
          <div className="bg-blue-100 p-3 rounded-full mb-3">
            <BookOpen className="w-6 h-6 text-blue-600" />
          </div>
          <h3 className="text-lg font-semibold text-gray-800 mb-1">Sessions</h3>
          <p className="text-2xl font-bold text-blue-600">
            {courseData.no_of_sessions}
          </p>
          <p className="text-sm text-gray-500">Total Sessions</p>
        </div>

        {/* Course Rating */}
        <div className="flex flex-col items-center text-center">
          <div className="bg-yellow-100 p-3 rounded-full mb-3">
            <Star className="w-6 h-6 text-yellow-600" />
          </div>
          <h3 className="text-lg font-semibold text-gray-800 mb-1">Rating</h3>
          <div className="flex items-center mb-1">
            <p className="text-2xl font-bold text-yellow-600">
              {courseData.course_rating}
            </p>
            <Star className="w-5 h-5 text-yellow-400 fill-current ml-1" />
          </div>
          <p className="text-sm text-gray-500">Course Rating</p>
        </div>

        {/* Course Level */}
        <div className="flex flex-col items-center text-center">
          <div className="bg-green-100 p-3 rounded-full mb-3">
            <TrendingUp className="w-6 h-6 text-green-600" />
          </div>
          <h3 className="text-lg font-semibold text-gray-800 mb-1">Level</h3>
          <p className="text-2xl font-bold text-green-600">
            {courseData.level}
          </p>
          <p className="text-sm text-gray-500">Difficulty Level</p>
        </div>
      </div>
    </div>
  );
};

export default CourseInfo;
