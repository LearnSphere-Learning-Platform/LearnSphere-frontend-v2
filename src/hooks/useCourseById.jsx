import { useState, useEffect } from "react";
import { getCourseById } from "./useSelectedCourse";
import { courseApi } from "../services/api";

// same mapping as useAllCourses - turns a backend course document into the UI shape
export const mapBackendCourse = (c) => ({
  id: c.courseId,
  course_name: c.course_name || "Untitled Course",
  level: (c.level || "").toLowerCase(),
  language: c.language || "English",
  total_no_hours: c.total_no_hours || "",
  price: Number(c.price) || 0,
  certification: c.certification === true,
  pdf_available: c.pdf_available === true,
  description: c.about_course?.complete_description || "",
  image: c.image_file || "",
  preview: c.video_file || "",
  course_rating: c.rating || 0,
  no_of_sessions: c.no_of_sessions || 0,
  status: c.status,
  instructor: {
    id: c.instructor_id,
    name: c.instructorName || "Instructor",
    mailid: "",
    summary: "LearnSphere Instructor",
    avatar: "https://placehold.co/100x100?text=Instructor",
    overall_rating: c.rating || 0,
    no_of_courses_released: 0,
    total_learners: String(c.students || 0),
    total_reviews: "0",
    about: [],
    highlights: [],
  },
  about_course: c.about_course || { skills: [], complete_description: "" },
  outcome: c.outcome || [],
  course_content: c.course_content || [],
});

// Loads a single course from the backend by id.
// Falls back to the static demo data if the backend is not reachable.
const useCourseById = (id) => {
  const [course, setCourse] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let cancelled = false;

    const load = async () => {
      if (!id) {
        setLoading(false);
        return;
      }
      try {
        const data = await courseApi.get(`/api/v1/courses/${id}`);
        if (!cancelled) {
          setCourse(mapBackendCourse(data));
        }
      } catch (e) {
        console.warn("Could not load course from backend, using demo data:", e.message);
        if (!cancelled) {
          setCourse(getCourseById(id));
        }
      }
      if (!cancelled) {
        setLoading(false);
      }
    };

    load();
    return () => {
      cancelled = true;
    };
  }, [id]);

  return { course, loading };
};

export default useCourseById;
