import { Star, Users, Calendar } from 'lucide-react';

const CourseCard = ({ course, onSelect }) => (
  <div 
    className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow cursor-pointer"
    onClick={() => onSelect(course)}
  >
    <div className="relative">
      <img 
        src={course.image} 
        alt={course.course_name}
        className="w-full h-48 object-cover"
      />
      <div className="absolute top-4 right-4 bg-black bg-opacity-70 text-white px-2 py-1 rounded text-sm">
        {course.progress || 0}% Complete
      </div>
    </div>
    <div className="p-6">
      <h3 className="text-xl font-semibold mb-2" style={{ color: '#333A2F' }}>
        {course.course_name}
      </h3>
      <p className="text-gray-600 mb-4">by {course.instructor.name}</p>
      <div className="flex items-center mb-4">
        <div className="flex items-center mr-4">
          <Star className="w-4 h-4 text-yellow-400 fill-current" />
          <span className="ml-1 text-sm text-gray-600">{course.course_rating}</span>
        </div>
        <div className="flex items-center">
          <Users className="w-4 h-4 text-gray-400" />
          <span className="ml-1 text-sm text-gray-600">
            {course.instructor.total_learners ? course.instructor.total_learners.replace(/,/g, '') : '0'} students
          </span>
        </div>
      </div>
      <div className="mb-4">
        <div className="flex justify-between text-sm text-gray-600 mb-1">
          <span>{course.completedLessons || 0} of {course.totalLessons || course.no_of_sessions} lessons</span>
          <span>{course.progress || 0}%</span>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-2">
          <div 
            className="h-2 rounded-full transition-all duration-300"
            style={{ 
              width: `${course.progress || 0}%`,
              backgroundColor: '#333A2F'
            }}
          ></div>
        </div>
      </div>
      <div className="flex items-center justify-between">
        <div className="flex items-center text-sm text-gray-500">
          <Calendar className="w-4 h-4 mr-1" />
          {course.lastAccessed || 'Recently accessed'}
        </div>
        <button 
          className="px-4 py-2 rounded-md text-white font-medium hover:opacity-90 transition-opacity"
          style={{ backgroundColor: '#333A2F' }}
        >
          Continue Learning
        </button>
      </div>
    </div>
  </div>
);

export default CourseCard; 