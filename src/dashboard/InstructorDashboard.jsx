import React, { useState } from 'react';
import { Bell, Settings, User, BookOpen, Plus, Search, Eye, Edit, Trash2, Star, Users, Clock, TrendingUp, X, ChevronDown } from 'lucide-react';

// Stats Cards Component
const StatsCards = ({ stats }) => {
  const formatNumber = (num) => {
    if (num >= 1000000) {
      return (num / 1000000).toFixed(1) + 'M';
    } else if (num >= 1000) {
      return (num / 1000).toFixed(0) + 'K';
    }
    return num.toString();
  };

  const cards = [
    {
      title: 'Total Courses',
      value: stats.totalCourses,
      icon: BookOpen,
      color: 'text-blue-600',
      bgColor: 'bg-blue-50'
    },
    {
      title: 'Total Students',
      value: formatNumber(stats.totalStudents),
      icon: Users,
      color: 'text-green-600',
      bgColor: 'bg-green-50'
    },
    {
      title: 'Average Rating',
      value: stats.averageRating.toFixed(1),
      icon: Star,
      color: 'text-yellow-600',
      bgColor: 'bg-yellow-50'
    },
    {
      title: 'Published',
      value: stats.publishedCourses,
      icon: TrendingUp,
      color: 'text-purple-600',
      bgColor: 'bg-purple-50'
    }
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
      {cards.map((card, index) => (
        <div key={index} className="bg-gray-100 rounded-lg shadow-sm p-6 hover:shadow-md transition-shadow">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600 mb-1">{card.title}</p>
              <p className="text-2xl font-bold text-gray-900">{card.value}</p>
            </div>
            <div className={`p-3 rounded-lg ${card.bgColor}`}>
              <card.icon className={`h-6 w-6 ${card.color}`} />
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

// Course Card Component
const CourseCard = ({ course, onDelete }) => {
  const getStatusBadge = (status) => {
    const badges = {
      published: 'bg-green-100 text-green-800',
      draft: 'bg-yellow-100 text-yellow-800',
      intermediate: 'bg-orange-100 text-orange-800',
      advanced: 'bg-red-100 text-red-800'
    };
    
    return (
      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${badges[status] || 'bg-gray-100 text-gray-800'}`}>
        {status}
      </span>
    );
  };

  return (
    <div className="bg-gray-100border border-gray-200 rounded-lg overflow-hidden hover:shadow-md transition-shadow">
      {/* Status Badge */}
      <div className="p-4 pb-2">
        {getStatusBadge(course.status)}
      </div>

      {/* Course Image */}
      <div className="px-4 pb-4">
        <div className="aspect-video bg-gray-200 rounded-lg overflow-hidden">
          <img 
            src={course.thumbnail} 
            alt={course.title}
            className="w-full h-full object-cover"
          />
        </div>
      </div>

      {/* Course Info */}
      <div className="p-4 pt-0">
        <h3 className="text-lg font-semibold text-gray-900 mb-2 line-clamp-2">
          {course.title}
        </h3>
        <p className="text-gray-600 text-sm mb-4 line-clamp-2">
          {course.description}
        </p>

        {/* Stats */}
        <div className="flex items-center space-x-4 mb-4 text-sm text-gray-500">
          <div className="flex items-center space-x-1">
            <Star className="h-4 w-4 text-yellow-400 fill-current" />
            <span>{course.rating}</span>
          </div>
          <div className="flex items-center space-x-1">
            <Users className="h-4 w-4" />
            <span>{course.students.toLocaleString()}</span>
          </div>
          <div className="flex items-center space-x-1">
            <Clock className="h-4 w-4" />
            <span>{course.duration}</span>
          </div>
        </div>

        {/* Actions */}
        <div className="flex space-x-2">
          <button className="flex-1 bg-gray-50 border border-gray-200 text-gray-700 px-3 py-2 rounded-md text-sm font-medium hover:bg-gray-100 transition-colors flex items-center justify-center space-x-2">
            <Eye className="h-4 w-4" />
            <span>View Course</span>
          </button>
          <button className="p-2 text-gray-500 hover:text-blue-600 hover:bg-blue-50 rounded-md transition-colors">
            <Edit className="h-4 w-4" />
          </button>
          <button 
            onClick={() => onDelete(course.id)}
            className="p-2 text-gray-500 hover:text-red-600 hover:bg-red-50 rounded-md transition-colors"
          >
            <Trash2 className="h-4 w-4" />
          </button>
        </div>
      </div>
    </div>
  );
};

// Course Management Component
const CourseManagement = ({ courses, onCreateCourse, onDeleteCourse }) => {
  const [searchTerm, setSearchTerm] = useState('');

  const filteredCourses = courses.filter(course =>
    course.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    course.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="bg-gray-100 rounded-lg shadow-sm">
      {/* Header */}
      <div className="px-6 py-4 border-b border-gray-200">
        <div className="flex justify-between items-start">
          <div>
            <div className="inline-block bg-gray-800 text-white px-3 py-1 rounded text-sm font-medium mb-3">
              My Courses
            </div>
            <h2 className="text-xl font-bold text-gray-900 mb-1">My Courses</h2>
            <p className="text-gray-600">Manage and track your course content</p>
          </div>
          <button
            onClick={onCreateCourse}
            className="bg-gray-800 text-white px-4 py-2 rounded-lg hover:bg-gray-700 transition-colors flex items-center space-x-2"
          >
            <Plus className="h-4 w-4" />
            <span>Create Course</span>
          </button>
        </div>
      </div>

      {/* Search */}
      <div className="p-6 border-b border-gray-200">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
          <input
            type="text"
            placeholder="Search courses..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>
      </div>

      {/* Course Grid */}
      <div className="p-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredCourses.map((course) => (
            <CourseCard
              key={course.id}
              course={course}
              onDelete={onDeleteCourse}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

// Create Course Modal Component
const CreateCourseModal = ({ isOpen, onClose, onSubmit }) => {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    level: '',
    duration: '',
    status: 'draft'
  });

  const [showLevelDropdown, setShowLevelDropdown] = useState(false);
  const levels = ['beginner', 'intermediate', 'advanced'];

  const handleSubmit = (e) => {
    e.preventDefault();
    if (formData.title && formData.description && formData.level && formData.duration) {
      onSubmit({
        ...formData,
        thumbnail: 'https://images.pexels.com/photos/270348/pexels-photo-270348.jpeg?auto=compress&cs=tinysrgb&w=300&h=200&fit=crop'
      });
      setFormData({
        title: '',
        description: '',
        level: '',
        duration: '',
        status: 'draft'
      });
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-gray-100 rounded-lg shadow-xl w-full max-w-md">
        {/* Header */}
        <div className="flex justify-between items-center p-6 border-b border-gray-200">
          <h2 className="text-xl font-bold text-gray-900">Create New Course</h2>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700 transition-colors"
          >
            <X className="h-6 w-6" />
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="p-6">
          <p className="text-gray-600 mb-6">Fill in the details to create a new course.</p>

          {/* Course Title */}
          <div className="mb-4">
            <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-2">
              Course Title
            </label>
            <input
              type="text"
              id="title"
              value={formData.title}
              onChange={(e) => setFormData({ ...formData, title: e.target.value })}
              placeholder="Enter course title"
              className="w-full px-3 py-2 border border-blue-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              required
            />
          </div>

          {/* Description */}
          <div className="mb-4">
            <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-2">
              Description
            </label>
            <textarea
              id="description"
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              placeholder="Enter course description"
              rows={3}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
              required
            />
          </div>

          {/* Level */}
          <div className="mb-4">
            <label htmlFor="level" className="block text-sm font-medium text-gray-700 mb-2">
              Level
            </label>
            <div className="relative">
              <button
                type="button"
                onClick={() => setShowLevelDropdown(!showLevelDropdown)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-left flex items-center justify-between"
              >
                <span className={formData.level ? 'text-gray-900' : 'text-gray-500'}>
                  {formData.level || 'Select level'}
                </span>
                <ChevronDown className="h-5 w-5 text-gray-400" />
              </button>
              {showLevelDropdown && (
                <div className="absolute z-10 w-full mt-1 bg-gray-100 border border-gray-300 rounded-md shadow-lg">
                  {levels.map((level) => (
                    <button
                      key={level}
                      type="button"
                      onClick={() => {
                        setFormData({ ...formData, level });
                        setShowLevelDropdown(false);
                      }}
                      className="w-full px-3 py-2 text-left hover:bg-gray-50 capitalize"
                    >
                      {level}
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Duration */}
          <div className="mb-6">
            <label htmlFor="duration" className="block text-sm font-medium text-gray-700 mb-2">
              Duration
            </label>
            <input
              type="text"
              id="duration"
              value={formData.duration}
              onChange={(e) => setFormData({ ...formData, duration: e.target.value })}
              placeholder="e.g., 25 hrs"
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              required
            />
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full bg-gray-800 text-white py-2 px-4 rounded-md hover:bg-gray-700 transition-colors font-medium"
          >
            Create Course
          </button>
        </form>
      </div>
    </div>
  );
};

// Main Dashboard Component
const InstructorDashboard = () => {
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [courses, setCourses] = useState([
    {
      id: '1',
      title: 'React - The Complete Guide (2024 Edition)',
      description: 'Master React with hooks, context API, Redux, and more',
      level: 'intermediate',
      duration: '49 hrs',
      rating: 4.8,
      students: 2159428,
      status: 'published',
      thumbnail: 'https://images.pexels.com/photos/11035380/pexels-photo-11035380.jpeg?auto=compress&cs=tinysrgb&w=300&h=200&fit=crop'
    },
    {
      id: '2',
      title: 'Advanced JavaScript: Concepts & Techniques',
      description: 'Deep dive into closures, prototypes, asynchronous JS, and more',
      level: 'advanced',
      duration: '35 hrs',
      rating: 4.9,
      students: 889214,
      status: 'published',
      thumbnail: 'https://images.pexels.com/photos/177598/pexels-photo-177598.jpeg?auto=compress&cs=tinysrgb&w=300&h=200&fit=crop'
    },
    {
      id: '3',
      title: 'Node.js Backend Development',
      description: 'Build scalable backend applications with Node.js and Express',
      level: 'intermediate',
      duration: '0 hrs',
      rating: 0,
      students: 0,
      status: 'draft',
      thumbnail: 'https://images.pexels.com/photos/270348/pexels-photo-270348.jpeg?auto=compress&cs=tinysrgb&w=300&h=200&fit=crop'
    }
  ]);

  const handleCreateCourse = (courseData) => {
    const newCourse = {
      ...courseData,
      id: Date.now().toString(),
      rating: 0,
      students: 0,
      thumbnail: 'https://images.pexels.com/photos/270348/pexels-photo-270348.jpeg?auto=compress&cs=tinysrgb&w=300&h=200&fit=crop'
    };
    setCourses([...courses, newCourse]);
    setIsCreateModalOpen(false);
  };

  const handleDeleteCourse = (courseId) => {
    setCourses(courses.filter(course => course.id !== courseId));
  };

  const stats = {
    totalCourses: courses.length,
    totalStudents: courses.reduce((sum, course) => sum + course.students, 0),
    averageRating: courses.length > 0 ? courses.reduce((sum, course) => sum + course.rating, 0) / courses.length : 0,
    publishedCourses: courses.filter(course => course.status === 'published').length
  };

  return (
    <div className="min-h-screen bg-[#EBEDDF]">
      {/* <Header /> */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <StatsCards stats={stats} />
        <CourseManagement 
          courses={courses}
          onCreateCourse={() => setIsCreateModalOpen(true)}
          onDeleteCourse={handleDeleteCourse}
        />
      </main>
      <CreateCourseModal 
        isOpen={isCreateModalOpen}
        onClose={() => setIsCreateModalOpen(false)}
        onSubmit={handleCreateCourse}
      />
    </div>
  );
};

export default InstructorDashboard;