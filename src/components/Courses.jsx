
import React from 'react';
import { FaStar, FaClock, FaUsers, FaPlay } from 'react-icons/fa';

const Courses = () => {
  const courses = [
    {
      id: 1,
      title: "Complete Web Development Bootcamp",
      instructor: "Sarah Johnson",
      rating: 4.8,
      students: 15420,
      duration: "12 weeks",
      price: "$89.99",
      image: "https://images.pexels.com/photos/1181467/pexels-photo-1181467.jpeg?auto=compress&cs=tinysrgb&w=600",
      category: "Development"
    },
    {
      id: 2,
      title: "Data Science Fundamentals",
      instructor: "Michael Chen",
      rating: 4.9,
      students: 8920,
      duration: "8 weeks",
      price: "$79.99",
      image: "https://images.pexels.com/photos/1181467/pexels-photo-1181467.jpeg?auto=compress&cs=tinysrgb&w=600",
      category: "Data Science"
    },
    {
      id: 3,
      title: "Digital Marketing Mastery",
      instructor: "Emily Rodriguez",
      rating: 4.7,
      students: 12350,
      duration: "10 weeks",
      price: "$69.99",
      image: "https://images.pexels.com/photos/1181467/pexels-photo-1181467.jpeg?auto=compress&cs=tinysrgb&w=600",
      category: "Marketing"
    },
    {
      id: 4,
      title: "UI/UX Design Principles",
      instructor: "David Kim",
      rating: 4.6,
      students: 9870,
      duration: "6 weeks",
      price: "$59.99",
      image: "https://images.pexels.com/photos/1181467/pexels-photo-1181467.jpeg?auto=compress&cs=tinysrgb&w=600",
      category: "Design"
    },
    {
      id: 5,
      title: "Machine Learning Basics",
      instructor: "Dr. Lisa Wang",
      rating: 4.9,
      students: 11230,
      duration: "14 weeks",
      price: "$99.99",
      image: "https://images.pexels.com/photos/1181467/pexels-photo-1181467.jpeg?auto=compress&cs=tinysrgb&w=600",
      category: "AI/ML"
    },
    {
      id: 6,
      title: "Business Strategy & Leadership",
      instructor: "Robert Smith",
      rating: 4.8,
      students: 7560,
      duration: "8 weeks",
      price: "$89.99",
      image: "https://images.pexels.com/photos/1181467/pexels-photo-1181467.jpeg?auto=compress&cs=tinysrgb&w=600",
      category: "Business"
    }
  ];

  return (
    <section id="courses" className="py-16 bg-[#fff]">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-[#333A2F] mb-4">
            Popular Courses
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Explore our most popular courses and start your learning journey today.
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
                <div className="absolute top-4 right-4 bg-[#333A2F] text-white px-3 py-1 rounded-full text-sm font-medium">
                  {course.category}
                </div>
                <div className="absolute inset-0 bg-black bg-opacity-0 hover:bg-opacity-20 transition-all duration-300 flex items-center justify-center">
                  <div className="opacity-0 hover:opacity-100 transition-opacity duration-300">
                    <FaPlay className="text-white text-4xl" />
                  </div>
                </div>
              </div>
              
              <div className="p-6">
                <h3 className="text-xl font-bold text-[#333A2F] mb-2">
                  {course.title}
                </h3>
                <p className="text-gray-600 mb-4">
                  by {course.instructor}
                </p>
                
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center space-x-2">
                    <FaStar className="text-yellow-400" />
                    <span className="text-gray-700 font-medium">{course.rating}</span>
                  </div>
                  <div className="flex items-center space-x-4 text-sm text-gray-600">
                    <div className="flex items-center space-x-1">
                      <FaClock />
                      <span>{course.duration}</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <FaUsers />
                      <span>{course.students.toLocaleString()}</span>
                    </div>
                  </div>
                </div>
                
                <div className="flex items-center justify-between">
                  <span className="text-2xl font-bold text-[#333A2F]">
                    {course.price}
                  </span>
                  <button className="px-6 py-2 bg-[#333A2F] text-white rounded-lg font-medium hover:bg-[#2a3028] transition-colors">
                    Enroll Now
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
        
        <div className="text-center mt-12">
          <button className="px-8 py-4 bg-[#333A2F] text-white rounded-lg font-bold text-lg hover:bg-[#2a3028] transition-colors">
            View All Courses
          </button>
        </div>
      </div>
    </section>
  );
};

export default Courses;