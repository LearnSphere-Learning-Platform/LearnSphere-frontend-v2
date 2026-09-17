import { createContext, useContext, useState, useEffect } from "react";
import { courseApi } from "../../../services/api";

// Was previously built entirely from the static catalog/CourseData.jsx demo file, with a
// literal Math.random() student count regenerated on every page load and status changes that
// only ever lived in local React state - meaning "approving" or "denying" a course here never
// touched the backend at all. Course service already exposes everything this needs:
// GET /api/v1/courses/getCourseWithOutStatus (all courses regardless of status, so pending
// ones show up here) and PATCH /api/v1/courses/{id}/status.
//
// Status mapping: the backend's `status` field is a free-text string. The only values actually
// set anywhere in this codebase are "draft" (CourseAddingForm's default before an instructor
// submits) and "approved" (what CourseController's default GET filters on). There's no
// dedicated "submitted for review" or "rejected" value yet, so until the instructor-submission
// flow sets one, anything that isn't "approved" is treated as pending admin review here ("New"
// in the UI), and denying a course sets it to "rejected" - update this mapping if/when the
// instructor side adopts a more specific status vocabulary.
const mapStatus = (backendStatus) => {
  if (backendStatus === "approved") return "Active";
  if (backendStatus === "rejected") return "Inactive";
  return "New";
};

const mapToBackendStatus = (uiStatus) => {
  if (uiStatus === "Active") return "approved";
  if (uiStatus === "Inactive") return "rejected";
  return "draft";
};

const mapBackendCourse = (course) => ({
  id: course.courseId,
  title: course.course_name || "Untitled Course",
  instructor: course.instructorName || "Unknown Instructor",
  status: mapStatus(course.status),
  type: (course.level || "").toLowerCase(),
  students: course.students || 0,
  duration: course.total_no_hours || "",
  rating: course.rating || 0,
  description: course.about_course?.complete_description || "",
  image: course.image_file || "",
  preview: course.video_file || "",
  about_course: course.about_course || { skills: [], complete_description: "" },
  outcome: course.outcome || [],
  course_content: course.course_content || [],
  instructor_details: {
    name: course.instructorName || "Unknown Instructor",
    mailid: "",
    overall_rating: course.rating || 0,
    no_of_courses_released: 0,
    total_learners: String(course.students || 0),
  },
  tests: 0,
  pdfAvailable: course.pdf_available === true,
  certificate: course.certification === true,
});

const CourseContext = createContext();

export const CourseProvider = ({ children }) => {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let cancelled = false;

    const load = async () => {
      try {
        const page = await courseApi.get("/api/v1/courses/getCourseWithOutStatus?page=0&size=100");
        const content = page.content || [];
        if (!cancelled) {
          setCourses(content.map(mapBackendCourse));
        }
      } catch (e) {
        console.warn("Could not load courses from backend for admin review:", e.message);
      } finally {
        if (!cancelled) setLoading(false);
      }
    };

    load();
    return () => {
      cancelled = true;
    };
  }, []);

  const updateCourseStatus = async (id, uiStatus) => {
    // Optimistic update so the admin UI responds immediately; rolled back if the PATCH fails.
    const previous = courses;
    setCourses((prev) =>
      prev.map((course) => (course.id === id ? { ...course, status: uiStatus } : course))
    );
    try {
      // courseApi.patch sends string bodies as-is (unlike object bodies, which it JSON.stringifies
      // for you) - the backend's @RequestBody String status expects valid JSON, i.e. a *quoted*
      // string, so this needs an explicit JSON.stringify to come out as "approved" and not the
      // bare, invalid-JSON token approved.
      await courseApi.patch(`/api/v1/courses/${id}/status`, JSON.stringify(mapToBackendStatus(uiStatus)));
    } catch (e) {
      console.error("Failed to update course status on the backend:", e.message);
      setCourses(previous);
    }
  };

  return (
    <CourseContext.Provider value={{ courses, loading, updateCourseStatus }}>
      {children}
    </CourseContext.Provider>
  );
};

export const useCourses = () => useContext(CourseContext);
