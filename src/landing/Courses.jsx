import React from 'react';
import { Star, Clock, Users, ArrowRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import courseData from '../catalog/CourseData';

function getRandomCourses(data, count) {
  const shuffled = [...data].sort(() => 0.5 - Math.random());
  return shuffled.slice(0, count);
}

const Courses = () => {
  const navigate = useNavigate();
  const courses = getRandomCourses(courseData, 6);

  return (
    <section id="courses" className="py-16 bg-[rgb(235, 237, 223),rgb(235, 237, 223)]">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-[#333A2F] mb-4">
            Featured Courses
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Discover our most popular courses designed by industry experts to help you achieve your learning goals.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {courses.map((course) => (
            <div
              key={course.id}
              className="bg-white rounded-xl overflow-hidden shadow-lg transition-shadow hover:shadow-xl cursor-pointer"
              onClick={() => { console.log('Navigating to course id:', course.id); navigate(`/course/${course.id}`); }}
            >
              <div className="relative">
                <img 
                  src={course.image} 
                  alt={course.course_name || course.title}
                  className="w-full h-48 object-cover"
                />
                <div className="absolute top-4 left-4">
                  <span className="bg-[#333A2F] text-white px-3 py-1 rounded-full text-sm font-medium">
                    {course.category || course.level || 'Course'}
                  </span>
                </div>
              </div>
              
              <div className="p-6">
                <h3 className="text-xl font-bold text-[#333A2F] mb-2">
                  {course.course_name || course.title}
                </h3>
                <p className="text-gray-600 mb-4">by {course.instructor?.name || course.instructor}</p>
                
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center">
                    <Star className="h-4 w-4 text-yellow-400 fill-current" />
                    <span className="text-sm font-medium text-gray-900 ml-1">{course.course_rating || course.rating}</span>
                  </div>
                  <div className="flex items-center text-sm text-gray-600">
                    <Users className="h-4 w-4 mr-1" />
                    {course.instructor?.total_learners || course.students}
                  </div>
                  <div className="flex items-center text-sm text-gray-600">
                    <Clock className="h-4 w-4 mr-1" />
                    {course.total_hours ? `${course.total_hours} hrs` : course.duration}
                  </div>
                </div>
                
                <div className="flex items-center justify-between">
                  <span className="text-2xl font-bold text-[#333A2F]">{course.price === 0 ? 'Free' : course.price || '$199'}</span>
                  <button className="px-6 py-2 bg-[#333A2F] text-white rounded-lg font-medium hover:bg-[#2a3028] transition-colors flex items-center cursor-pointer">
                    Enroll Now
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="text-center mt-12">
          <button className="px-8 py-4 bg-[#333A2F] text-white rounded-lg font-bold text-lg hover:bg-[#2a3028] transition-colors cursor-pointer"
          onClick={() => navigate('/catalog')}>
            View All Courses
          </button>
        </div>
      </div>
    </section>
  );
};

export default Courses;