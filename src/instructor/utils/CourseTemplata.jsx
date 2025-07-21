const CourseTemplate = {
  id: null,
  course_name: "",
  level: "",
  language: "",
  total_no_hours: "",
  manual_total_hours: false,
  price: 0,
  certification: false,
  pdf_available: false,
  tests_available: false,
  no_of_tests_available: 0,
  video_file: null,
  image_file: null,
  about_course: {
    skills: [],
    complete_description: "",
  },
  outcome: [""],
  course_content: [],
  no_of_sessions: 0,
  status: "draft",
  rating: 0,
  students: 0,
  created_at: "",
  updated_at: "",
  calculated_hours: 0, // Auto-calculated hours
};

export default CourseTemplate;
