import { createContext, useContext, useState } from "react";

// Move your original courseData here or import from another file
const initialCourses = [
  {
    id: 1,
    title: "React for Beginners",
    instructor: "Jane Smith",
    status: "Active",
    type: "Paid",
    students: 120,
    duration: "6h 45m",
    rating: 4.8,
  },
  {
    id: 2,
    title: "Advanced Node.js",
    instructor: "John Doe",
    status: "Inactive",
    type: "Free",
    students: 87,
    duration: "4h 30m",
    rating: 4.5,
  },
  {
    id: 3,
    title: "UI/UX Design Bootcamp",
    instructor: "Emily Clark",
    status: "Active",
    type: "Paid",
    students: 250,
    duration: "8h 10m",
    rating: 4.9,
  },
  {
    id: 4,
    title: "Python Fundamentals",
    instructor: "Mike Johnson",
    status: "New",
    type: "Paid",
    students: 0,
    duration: "5h 20m",
    rating: 0,
  },
  {
    id: 5,
    title: "JavaScript Masterclass",
    instructor: "Sarah Wilson",
    status: "New",
    type: "Free",
    students: 0,
    duration: "7h 15m",
    rating: 0,
  },
  {
    id: 6,
    title: "Fullstack Web Development",
    instructor: "Alex Brown",
    status: "Active",
    type: "Paid",
    students: 45,
    duration: "9h 20m",
    rating: 4.7,
  },
];

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