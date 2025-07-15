import { useState, useEffect } from "react";
import courseData from "../catalog/CourseData";

const useAllCourses = () => {
  const [courses, setCourses] = useState([]);

  useEffect(() => {
    setCourses(courseData);
  }, []);

  return courses;
};

export default useAllCourses;
