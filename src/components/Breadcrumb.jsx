import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { FaHome } from 'react-icons/fa';
import courseData from '../catalog/CourseData.jsx';

const Breadcrumb = () => {
  const location = useLocation();
  const pathnames = location.pathname.split('/').filter(x => x);

  // Helper to get course title by ID
  const getCourseTitle = (id) => {
    const course = courseData.find(c => String(c.id) === String(id));
    return course ? course.course_name : id;
  };

  // Custom label mapping for static pages
  const customLabels = {
    'profile': 'Profile',
    'my-learning': 'My Learning',
    'payment-history': 'Payment History',
    'instructor-dashboard': 'Instructor Dashboard',
    'dashboard': 'Dashboard',
  };

  // Find courseId in the path (after 'catalog', 'course', or 'instructor')
  let courseId = null;
  pathnames.forEach((segment, idx) => {
    if ((pathnames[idx - 1] === 'catalog' || pathnames[idx - 1] === 'course' || pathnames[idx - 1] === 'instructor') && !isNaN(Number(segment))) {
      courseId = segment;
    }
  });

  // Build the breadcrumb segments
  let segments = [];
  if (courseId) {
    segments.push({ label: getCourseTitle(courseId), to: `/course/${courseId}` });
  }
  // Add custom page if matched
  if (!courseId && pathnames.length > 0) {
    const last = pathnames[pathnames.length - 1];
    if (customLabels[last]) {
      segments.push({ label: customLabels[last], to: location.pathname });
    }
  }
  segments.push({ label: 'Catlog', to: '/catalog' });
  segments.push({ label: 'Home', to: '/' });

  return (
    <div className="w-full flex justify-end">
      <nav aria-label="Breadcrumb" className="inline-block">
        <ol className="flex items-center shadow-sm">
          {segments.map((seg, index) => {
            const isLast = index === segments.length - 1;
            // Alternate background color: even index #EBEDDF, odd index #fff
            const bgColor = index % 2 === 0 ? '#EBEDDF' : '#fff';
            const isHome = seg.label === 'Home';
            return (
              <li
                key={seg.to}
                className="relative z-20"
                style={{ marginRight: '-12px' }}
              >
                {isHome ? (
                  <Link
                    to={seg.to}
                    className="flex items-center h-10 px-4 font-bold border border-gray-200 hover:opacity-80 transition-colors"
                    style={{
                      background: bgColor,
                      color: '#333A2F',
                      borderTopRightRadius: '6px',
                      borderBottomRightRadius: '6px',
                      boxShadow: '0 1px 4px 0 rgba(80,80,120,0.06)',
                      position: 'relative',
                      clipPath: 'polygon(12px 0, 100% 0, 100% 100%, 12px 100%, 0 50%)',
                    }}
                  >
                    {seg.label}
                    <FaHome className="h-5 w-5 ml-2" style={{ color: '#333A2F' }} />
                  </Link>
                ) : isLast ? (
                  <span
                    className="flex items-center h-10 px-4 font-bold border border-gray-200"
                    style={{
                      background: bgColor,
                      color: '#333A2F',
                      borderTopRightRadius: '6px',
                      borderBottomRightRadius: '6px',
                      boxShadow: '0 1px 4px 0 rgba(80,80,120,0.06)',
                      position: 'relative',
                      clipPath: 'polygon(12px 0, 100% 0, 100% 100%, 12px 100%, 0 50%)',
                    }}
                    aria-current="page"
                  >
                    {seg.label}
                  </span>
                ) : (
                  <Link
                    to={seg.to}
                    className="flex items-center h-10 px-4 font-medium border border-gray-200 hover:opacity-80 transition-colors"
                    style={{
                      background: bgColor,
                      color: '#333A2F',
                      fontWeight: 500,
                      position: 'relative',
                      clipPath: 'polygon(12px 0, 100% 0, 100% 100%, 12px 100%, 0 50%)',
                    }}
                  >
                    {seg.label}
                  </Link>
                )}
              </li>
            );
          })}
        </ol>
      </nav>
    </div>
  );
};

export default Breadcrumb; 