// const CourseTemplate = {
//   course_name: "",
//   level: "",
//   language: "",
//   total_no_hours: "",
//   no_of_sessions: 0,
//   no_of_tests_available: 0,
//   tests_available: false,
//   certification: true,
//   pdf_available: true,
//   price: 0,
//   video_url: "",
//   image_url: "",
//   about_course: {
//     skills: [""],
//     complete_description: "",
//   },
//   outcome: [""],
//   course_content: [],
//   sessions: [],
// };
// export default CourseTemplate;
const CourseTemplate = {
  id: null,
  course_name: "",
  level: "",
  language: "",
  total_no_hours: "",
  manual_total_hours: false, // Flag to track if user manually set hours
  price: 0,
  certification: false,
  pdf_available: false,
  tests_available: false,
  no_of_tests_available: 0,
  video_file: null, // Changed from video_url to video_file
  image_file: null, // Changed from image_url to image_file
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
