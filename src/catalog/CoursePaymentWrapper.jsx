import React from 'react';
import { useParams } from 'react-router-dom';
import CoursePayment from '../components/CoursePayment';
import { getCourseById } from '../hooks/useSelectedCourse';

function CoursePaymentWrapper() {
  const { id } = useParams();
  console.log('CoursePaymentWrapper Debug - URL params:', { id });
  const course = getCourseById(id);
  console.log('CoursePaymentWrapper Debug - Found course:', course);
  if (!course) return <div className="text-center p-6 text-gray-700">Course not found</div>;
  return <CoursePayment course={course} />;
}

export default CoursePaymentWrapper; 