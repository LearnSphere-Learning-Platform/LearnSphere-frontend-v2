import { createContext, useContext, useState } from "react";
import courseData from "../../../catalog/CourseData";

// Transform courseData to match admin format
const transformCourseData = () => {
  return courseData.map(course => ({
    id: course.id,
    title: course.course_name,
    instructor: course.instructor.name,
    status: "Active", // Default status for all courses
    type: course.level,
    students: Math.floor(Math.random() * 1000) + 100, // Random student count
    duration: course.total_no_hours,
    rating: course.course_rating,
    // Additional fields for detailed view
    description: course.description,
    image: course.image,
    preview: course.preview,
    about_course: course.about_course,
    outcome: course.outcome,
    course_content: course.course_content,
    instructor_details: course.instructor,
    tests: course.no_of_tests_available,
    pdfAvailable: course.pdf_available,
    certificate: course.certification
  }));
};

const initialCourses = transformCourseData();

const CourseContext = createContext();

export const CourseProvider = ({ children }) => {
  const [courses, setCourses] = useState(initialCourses);

  const updateCourseStatus = (id, status) => {
    setCourses((prev) =>
      prev.map((course) =>
        course.id === id ? { ...course, status } : course
      )
    );
  };

  return (
    <CourseContext.Provider value={{ courses, updateCourseStatus }}>
      {children}
    </CourseContext.Provider>
  );
};

export const useCourses = () => useContext(CourseContext);