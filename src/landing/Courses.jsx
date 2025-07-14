import React from 'react';
import { Star, Clock, Users, ArrowRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';


const Courses = () => {
  const navigate = useNavigate();
  const courses = [
    {
      id: 1,
      title: 'Full Stack Web Development',
      instructor: 'Sarah Johnson',
      rating: 4.9,
      students: 1234,
      duration: '12 weeks',
      price: '$299',
      image: 'https://images.pexels.com/photos/11035380/pexels-photo-11035380.jpeg?auto=compress&cs=tinysrgb&w=600',
      category: 'Programming'
    },
    {
      id: 2,
      title: 'Data Science & Analytics',
      instructor: 'Dr. Michael Chen',
      rating: 4.8,
      students: 892,
      duration: '10 weeks',
      price: '$249',
      image: 'https://images.pexels.com/photos/590022/pexels-photo-590022.jpeg?auto=compress&cs=tinysrgb&w=600',
      category: 'Data Science'
    },
    {
      id: 3,
      title: 'Digital Marketing Mastery',
      instructor: 'Emma Rodriguez',
      rating: 4.9,
      students: 2156,
      duration: '8 weeks',
      price: '$199',
      image: 'https://images.pexels.com/photos/265087/pexels-photo-265087.jpeg?auto=compress&cs=tinysrgb&w=600',
      category: 'Marketing'
    },
    {
      id: 4,
      title: 'UI/UX Design Fundamentals',
      instructor: 'Alex Thompson',
      rating: 4.7,
      students: 1567,
      duration: '6 weeks',
      price: '$179',
      image: 'https://images.pexels.com/photos/196644/pexels-photo-196644.jpeg?auto=compress&cs=tinysrgb&w=600',
      category: 'Design'
    },
    {
      id: 5,
      title: 'Machine Learning Basics',
      instructor: 'Dr. James Wilson',
      rating: 4.8,
      students: 743,
      duration: '14 weeks',
      price: '$349',
      image: 'https://images.pexels.com/photos/8386440/pexels-photo-8386440.jpeg?auto=compress&cs=tinysrgb&w=600',
      category: 'AI/ML'
    },
    {
      id: 6,
      title: 'Business Strategy & Innovation',
      instructor: 'Linda Parker',
      rating: 4.6,
      students: 1089,
      duration: '9 weeks',
      price: '$229',
      image: 'https://images.pexels.com/photos/3184291/pexels-photo-3184291.jpeg?auto=compress&cs=tinysrgb&w=600',
      category: 'Business'
    }
  ];

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
            <div key={course.id} className="bg-white rounded-xl overflow-hidden shadow-lg transition-shadow hover:shadow-xl">
              <div className="relative">
                <img 
                  src={course.image} 
                  alt={course.title}
                  className="w-full h-48 object-cover"
                />
                <div className="absolute top-4 left-4">
                  <span className="bg-[#333A2F] text-white px-3 py-1 rounded-full text-sm font-medium">
                    {course.category}
                  </span>
                </div>
              </div>
              
              <div className="p-6">
                <h3 className="text-xl font-bold text-[#333A2F] mb-2">
                  {course.title}
                </h3>
                <p className="text-gray-600 mb-4">by {course.instructor}</p>
                
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center">
                    <Star className="h-4 w-4 text-yellow-400 fill-current" />
                    <span className="text-sm font-medium text-gray-900 ml-1">{course.rating}</span>
                  </div>
                  <div className="flex items-center text-sm text-gray-600">
                    <Users className="h-4 w-4 mr-1" />
                    {course.students}
                  </div>
                  <div className="flex items-center text-sm text-gray-600">
                    <Clock className="h-4 w-4 mr-1" />
                    {course.duration}
                  </div>
                </div>
                
                <div className="flex items-center justify-between">
                  <span className="text-2xl font-bold text-[#333A2F]">{course.price}</span>
                  <button className="px-6 py-2 bg-[#333A2F] text-white rounded-lg font-medium hover:bg-[#2a3028] transition-colors flex items-center">
                    Enroll Now
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="text-center mt-12">
          <button className="px-8 py-4 bg-[#333A2F] text-white rounded-lg font-bold text-lg hover:bg-[#2a3028] transition-colors"
          onClick={() => navigate('/catalog')}>
            View All Courses
          </button>
        </div>
      </div>
    </section>
  );
};

export default Courses;