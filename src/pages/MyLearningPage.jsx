import React, { useState, useEffect } from 'react';
import { CheckCircle, PlayCircle, MoreHorizontal } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import useAllCourses from '../hooks/useAllCourses';
import { enrollmentApi, courseApi, downloadFile } from '../services/api';

const TabNavigation = ({ activeTab, setActiveTab }) => {
  const tabs = ['In Progress', 'Completed', 'Certification'];
  return (
    <div className="mb-6">
      <div className="flex space-x-2">
        {tabs.map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`py-2 px-4 text-sm font-medium transition-colors cursor-pointer rounded-full ${
              activeTab === tab ? 'text-white bg-[#333A2F]' : 'text-gray-500 hover:text-gray-700 border border-gray-300'
            }`}
            style={{ borderRadius: '999px' }}
          >
            {tab}
          </button>
        ))}
      </div>
    </div>
  );
};

const CourseCard = ({ course, showCertificateButton }) => {
  const navigate = useNavigate();

  // download the completion certificate from the enrollment service
  const handleCertificate = async () => {
    try {
      await downloadFile(
        `${import.meta.env.VITE_ENROLLMENT_API_URL}/api/enrollments/${course.id}/certificate`,
        `certificate_${course.courseId}.pdf`
      );
    } catch (e) {
      alert(e.message || 'Could not download the certificate.');
    }
  };

  return (
    <div className="bg-white bg-opacity-90 border rounded-lg p-4 hover:shadow-md transition-shadow cursor-pointer">
      <div className="flex items-start justify-between">
        <div className="flex-1">
          <div className="flex items-center mb-2 space-x-2">
            <span className="text-sm text-gray-600 font-medium">{course.provider}</span>
          </div>
          <h3 className="text-lg font-semibold text-gray-900 mb-1">{course.title}</h3>
          <p className="text-sm text-gray-600 mb-2">{course.progress}% completed</p>
          <div className="text-sm text-gray-500 flex items-center space-x-2 mb-4">
            <PlayCircle className="h-4 w-4" />
            <span>{course.type} ({course.duration})</span>
          </div>
          <ProgressBar progress={course.progress} />
          <div className="flex items-center space-x-4 mt-2">
            {showCertificateButton ? (
              <button
                onClick={handleCertificate}
                className="text-white px-4 py-2 rounded-md hover:opacity-90 cursor-pointer"
                style={{ backgroundColor: '#333A2F' }}
              >
                Download Certificate
              </button>
            ) : (
              <button
                onClick={() => navigate(`/user/course/${course.courseId}/dashboard`)}
                className="text-white px-4 py-2 rounded-md hover:opacity-90 cursor-pointer"
                style={{ backgroundColor: '#333A2F' }}
              >
                {course.status === 'completed' ? 'Review' : 'Get started'}
              </button>
            )}
            {course.status === 'completed' && (
              <div className="flex items-center space-x-1 text-green-600">
                <CheckCircle className="h-4 w-4" />
                <span className="text-sm">Completed</span>
              </div>
            )}
          </div>
        </div>
        <button className="p-2 text-gray-400 hover:text-gray-600 cursor-pointer">
          <MoreHorizontal className="h-5 w-5" />
        </button>
      </div>
    </div>
  );
};

const ProgressBar = ({ progress }) => (
  <div className="w-full bg-gray-200 rounded-full h-2">
    <div
      className="h-2 rounded-full transition-all duration-300"
      style={{ width: `${progress}%`, backgroundColor: '#333A2F' }}
    ></div>
  </div>
);

const CourseList = ({ courses, loading, activeTab, setActiveTab }) => {
  const filteredCourses = courses.filter(course => {
    if (activeTab === 'In Progress') return course.status === 'in-progress';
    if (activeTab === 'Completed') return course.status === 'completed';
    if (activeTab === 'Certification') return course.progress === 100;
    return false;
  });

  return (
    <div>
      <h1 className="text-2xl font-bold text-gray-900 mb-4">My Learning</h1>
      <TabNavigation activeTab={activeTab} setActiveTab={setActiveTab} />
      <div className="space-y-4">
        {loading && <p className="text-gray-500">Loading your courses...</p>}
        {!loading && filteredCourses.length === 0 && (
          <p className="text-gray-500">No courses here yet.</p>
        )}
        {filteredCourses.map(course => (
          <CourseCard key={course.id} course={course} showCertificateButton={activeTab === 'Certification'} />
        ))}
      </div>
    </div>
  );
};

const Recommendations = () => {
  const navigate = useNavigate();
  const courses = useAllCourses();
  const recommended = courses.slice(0, 3);
  return (
    <div className="bg-white rounded-lg shadow-sm p-6 mt-10">
      <h2 className="text-lg font-semibold text-gray-900 mb-4">Recommended for you</h2>
      <div className="space-y-4">
        {recommended.map((course) => (
          <div key={course.id} className="flex items-center border rounded-lg p-3 hover:shadow-md cursor-pointer">
            <img src={course.image} alt={course.course_name} className="w-16 h-16 rounded-md object-cover mr-4" />
            <div className="flex-1 min-w-0">
              <h3 className="font-medium text-gray-900 truncate">{course.course_name}</h3>
              <p className="text-sm text-gray-500 truncate">{course.instructor.name}</p>
            </div>
            <button
              className="ml-4 px-4 py-2 text-sm font-medium text-white bg-[#333A2F] rounded-md hover:bg-[#222]"
              onClick={() => navigate(`/user/course/${course.id}`)}
            >
              View Details
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

const MyLearningPage = () => {
  const [activeTab, setActiveTab] = useState('In Progress');
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let cancelled = false;

    // load the real enrollments of the logged-in user
    const load = async () => {
      const userId = localStorage.getItem('userId');
      if (!userId) {
        setLoading(false);
        return;
      }
      try {
        const response = await enrollmentApi.get(`/api/enrollments/getAllEnrollments/${userId}`);
        const enrollments = response.enrollments || response || [];

        // resolve the course title for each enrollment
        const cards = await Promise.all(
          enrollments.map(async (enrollment) => {
            let title = 'Course';
            try {
              const name = await courseApi.get(`/api/v1/courses/${enrollment.courseId}/name`);
              title = typeof name === 'string' ? name : (name.courseName || name.course_name || 'Course');
            } catch (e) {
              // course may have been deleted - keep the placeholder
            }
            const status =
              enrollment.status === 'COMPLETED'
                ? 'completed'
                : 'in-progress';
            return {
              id: enrollment.enrollmentId,
              courseId: enrollment.courseId,
              title,
              provider: 'LearnSphere',
              progress: Math.round(enrollment.progress || 0),
              duration: 'self paced',
              type: 'Course',
              status,
            };
          })
        );

        if (!cancelled) {
          setCourses(cards);
        }
      } catch (e) {
        console.warn('Could not load enrollments:', e.message);
      }
      if (!cancelled) {
        setLoading(false);
      }
    };

    load();
    return () => {
      cancelled = true;
    };
  }, []);

  return (
    <div className="min-h-screen" style={{ backgroundColor: '#EBEDDF' }}>
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mt-25">
          <div className="lg:col-span-2">
            <CourseList courses={courses} loading={loading} activeTab={activeTab} setActiveTab={setActiveTab} />
          </div>
          <div className="lg:col-span-1 self-start mt-[58px]">
            <Recommendations />
          </div>
        </div>
      </main>
    </div>
  );
};

export default MyLearningPage;
