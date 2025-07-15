import CourseCard from './CourseCard';

const CourseList = ({ enrolledCourses, onSelect }) => (
  <div className="min-h-screen bg-gray-50" style={{ backgroundColor: '#EBEDDF' }}>
    <div className="container mx-auto px-4 py-8 max-w-7xl">
      <h1 className="text-3xl font-bold mb-8" style={{ color: '#333A2F' }}>My Learning Dashboard</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {enrolledCourses.map((course) => (
          <CourseCard key={course.id} course={course} onSelect={onSelect} />
        ))}
      </div>
    </div>
  </div>
);

export default CourseList; 