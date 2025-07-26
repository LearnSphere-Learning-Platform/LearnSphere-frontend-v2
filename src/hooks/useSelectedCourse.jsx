import { useEffect, useState } from "react";
import courseData from "../catalog/CourseData";

const useSelectedCourse = () => {
  const [selectedCourse, setSelectedCourse] = useState(null);

  useEffect(() => {
    // ✅ Print all courses once when the hook runs
    console.log("All Courses:", courseData);

    const stored = localStorage.getItem("selectedCourse");
    const parsed = stored ? JSON.parse(stored) : null;
    setSelectedCourse(parsed);

    const listener = (e) => {
      if (e.key === "selectedCourse") {
        try {
          const parsed = JSON.parse(e.newValue);
          setSelectedCourse(parsed);
        } catch {
          setSelectedCourse(null);
        }
      }
    };

    window.addEventListener("storage", listener);
    return () => window.removeEventListener("storage", listener);
  }, []);

  const updateSelectedCourse = (course) => {
    localStorage.setItem("selectedCourse", JSON.stringify(course));
    setSelectedCourse(course);
    window.dispatchEvent(new Event("storage"));
  };

  return [selectedCourse, updateSelectedCourse];
};

// ⬇️ Export a util to fetch course by ID from static data
export const getCourseById = (id) => {
  return courseData.find((c) => String(c.id) === String(id)) || null;
};

export default useSelectedCourse;
