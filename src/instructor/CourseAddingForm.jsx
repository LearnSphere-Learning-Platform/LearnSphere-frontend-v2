"use client";

import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import CourseTemplate from "./utils/CourseTemplata";
import SessionFormList from "./SessionFormList";
import {
  BookOpen,
  IndianRupee,
  Clock,
  Globe,
  Award,
  FileText,
  CheckCircle2,
  Target,
  ImageIcon,
  ArrowLeft,
  Video,
  AlertCircle,
} from "lucide-react";

const CourseAddingForm = () => {
  const navigate = useNavigate();
  const { courseId } = useParams();
  const [course, setCourse] = useState({ ...CourseTemplate });
  const [isEditing, setIsEditing] = useState(false);
  const [validationErrors, setValidationErrors] = useState({});
  const [totalCalculatedHours, setTotalCalculatedHours] = useState(0);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Load course data when editing
  useEffect(() => {
    if (courseId) {
      setIsEditing(true);
      loadCourseForEditing(courseId);
    } else {
      setIsEditing(false);
      setCourse({ ...CourseTemplate });
    }
  }, [courseId]);

  const loadCourseForEditing = (id) => {
    try {
      // First try to get from editingCourse (temporary storage)
      const editingCourse = localStorage.getItem("editingCourse");
      if (editingCourse) {
        const courseData = JSON.parse(editingCourse);
        setCourseFromData(courseData);
        return;
      }

      // If not found, try to get from instructorCourses
      const savedCourses = localStorage.getItem("instructorCourses");
      if (savedCourses) {
        const courses = JSON.parse(savedCourses);
        const courseToEdit = courses.find(
          (c) => c.id.toString() === id.toString()
        );
        if (courseToEdit) {
          setCourseFromData(courseToEdit);
          return;
        }
      }

      // If course not found, show error and redirect
      alert("Course not found!");
      navigate("/instructor/dashboard");
    } catch (error) {
      console.error("Error loading course for editing:", error);
      alert("Error loading course data!");
      navigate("/instructor/dashboard");
    }
  };

  const setCourseFromData = (courseData) => {
    setCourse({
      ...CourseTemplate,
      ...courseData,
      course_name: courseData.course_name || courseData.title || "",
      about_course: {
        ...CourseTemplate.about_course,
        ...courseData.about_course,
        skills: Array.isArray(courseData.about_course?.skills)
          ? courseData.about_course.skills
          : courseData.about_course?.skills
          ? [courseData.about_course.skills]
          : [""],
      },
      outcome:
        Array.isArray(courseData.outcome) && courseData.outcome.length > 0
          ? courseData.outcome.filter((o) => o && o.trim())
          : [""],
      course_content: Array.isArray(courseData.course_content)
        ? courseData.course_content.map((session) => ({
            ...session,
            content: Array.isArray(session.content) ? session.content : [],
          }))
        : [],
      no_of_sessions: courseData.course_content?.length || 0,
      total_no_hours: courseData.total_no_hours || courseData.total_hours || "",
      price: Number(courseData.price) || 0,
      level: courseData.level || "",
      language: courseData.language || "",
      certification: Boolean(courseData.certification),
      pdf_available: Boolean(courseData.pdf_available),
      tests_available: Boolean(courseData.tests_available),
      no_of_tests_available: Number(courseData.no_of_tests_available) || 0,
      video_file: courseData.video_file || null,
      image_file: courseData.image_file || null,
      manual_total_hours: Boolean(courseData.manual_total_hours),
    });
  };

  // Calculate total hours automatically
  useEffect(() => {
    const calculateTotalHours = () => {
      let totalMinutes = 0;

      if (Array.isArray(course.course_content)) {
        course.course_content.forEach((session) => {
          if (Array.isArray(session.content)) {
            session.content.forEach((content) => {
              if (content.duration && content.type === "video") {
                const duration = parseDuration(content.duration);
                totalMinutes += duration;
              }
            });
          }
        });
      }

      const hours = Math.floor(totalMinutes / 60);
      const minutes = totalMinutes % 60;
      const totalHoursString =
        hours > 0
          ? `${hours}h${minutes > 0 ? ` ${minutes}m` : ""}`
          : `${minutes}m`;

      setTotalCalculatedHours(totalMinutes / 60);

      // Auto-update total hours if it's not manually set
      if (!course.manual_total_hours && totalMinutes > 0) {
        setCourse((prev) => ({
          ...prev,
          total_no_hours: totalHoursString,
        }));
      }
    };

    calculateTotalHours();
  }, [course.course_content, course.manual_total_hours]);

  // Parse duration string to minutes
  const parseDuration = (durationStr) => {
    if (!durationStr || typeof durationStr !== "string") return 0;

    // Handle formats like "12:30", "12 minutes", "1h 30m", "90 minutes"
    const timePattern = /(\d+):(\d+)/; // 12:30 format
    const minutesPattern = /(\d+)\s*(?:minutes?|mins?|m)(?!\w)/i;
    const hoursPattern = /(\d+)\s*(?:hours?|hrs?|h)(?!\w)/i;
    const hoursMinutesPattern = /(\d+)h\s*(\d+)m/i;

    let totalMinutes = 0;

    if (timePattern.test(durationStr)) {
      const match = durationStr.match(timePattern);
      totalMinutes = Number.parseInt(match[1]) * 60 + Number.parseInt(match[2]);
    } else if (hoursMinutesPattern.test(durationStr)) {
      const match = durationStr.match(hoursMinutesPattern);
      totalMinutes = Number.parseInt(match[1]) * 60 + Number.parseInt(match[2]);
    } else if (hoursPattern.test(durationStr)) {
      const match = durationStr.match(hoursPattern);
      totalMinutes = Number.parseInt(match[1]) * 60;
    } else if (minutesPattern.test(durationStr)) {
      const match = durationStr.match(minutesPattern);
      totalMinutes = Number.parseInt(match[1]);
    }

    return totalMinutes;
  };

  // Enhanced validation functions
  const validateCourseFeatures = () => {
    const errors = {};

    // Check if PDF is available but no PDF content exists
    if (course.pdf_available) {
      const hasPdfContent = course.course_content.some(
        (session) =>
          Array.isArray(session.content) &&
          session.content.some((content) => content.type === "pdf")
      );
      if (!hasPdfContent) {
        errors.pdf_available =
          "You must add at least one PDF content item when PDF materials are enabled.";
      }
    }

    // Check if tests are available but no quiz content exists
    if (course.tests_available) {
      const hasQuizContent = course.course_content.some(
        (session) =>
          Array.isArray(session.content) &&
          session.content.some((content) => content.type === "quiz")
      );
      if (!hasQuizContent) {
        errors.tests_available =
          "You must add at least one quiz when tests are enabled.";
      }

      if (course.no_of_tests_available > 0) {
        const quizCount = course.course_content.reduce((count, session) => {
          return (
            count +
            (Array.isArray(session.content)
              ? session.content.filter((content) => content.type === "quiz")
                  .length
              : 0)
          );
        }, 0);

        if (quizCount < course.no_of_tests_available) {
          errors.no_of_tests_available = `You specified ${course.no_of_tests_available} tests but only have ${quizCount} quiz(es) in your content.`;
        }
      }
    }

    return errors;
  };

  const validateForm = () => {
    const errors = {};

    // Basic required fields
    if (!course.course_name?.trim()) {
      errors.course_name = "Course name is required.";
    }

    if (!course.level) {
      errors.level = "Course level is required.";
    }

    if (!course.language?.trim()) {
      errors.language = "Language is required.";
    }

    if (!course.price || course.price < 0) {
      errors.price = "Valid price is required.";
    }

    // Validate skills
    const validSkills = Array.isArray(course.about_course.skills)
      ? course.about_course.skills.filter((skill) => skill && skill.trim())
      : [];
    if (validSkills.length === 0) {
      errors.skills = "At least one skill is required.";
    }

    if (!course.about_course.complete_description?.trim()) {
      errors.complete_description = "Course description is required.";
    }

    // Validate outcomes
    const validOutcomes = Array.isArray(course.outcome)
      ? course.outcome.filter((outcome) => outcome && outcome.trim())
      : [];
    if (validOutcomes.length === 0) {
      errors.outcome = "At least one learning outcome is required.";
    }

    // Validate sessions
    if (
      !Array.isArray(course.course_content) ||
      course.course_content.length === 0
    ) {
      errors.course_content = "At least one session is required.";
    } else {
      // Validate each session
      course.course_content.forEach((session, sessionIndex) => {
        if (!session.session?.trim()) {
          errors[`session_${sessionIndex}_title`] = `Session ${
            sessionIndex + 1
          } title is required.`;
        }
        if (!session.module_description?.trim()) {
          errors[`session_${sessionIndex}_description`] = `Session ${
            sessionIndex + 1
          } description is required.`;
        }
        if (!Array.isArray(session.content) || session.content.length === 0) {
          errors[`session_${sessionIndex}_content`] = `Session ${
            sessionIndex + 1
          } must have at least one content item.`;
        } else {
          // Validate content items
          session.content.forEach((content, contentIndex) => {
            if (!content.title?.trim()) {
              errors[
                `content_${sessionIndex}_${contentIndex}_title`
              ] = `Content item ${contentIndex + 1} in session ${
                sessionIndex + 1
              } must have a title.`;
            }
            if (!content.type) {
              errors[
                `content_${sessionIndex}_${contentIndex}_type`
              ] = `Content item ${contentIndex + 1} in session ${
                sessionIndex + 1
              } must have a type.`;
            }
          });
        }
      });
    }

    // Validate course features
    const featureErrors = validateCourseFeatures();
    Object.assign(errors, featureErrors);

    return errors;
  };

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setCourse((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
      manual_total_hours:
        name === "total_no_hours" ? true : prev.manual_total_hours,
    }));

    // Clear validation error when user starts typing
    if (validationErrors[name]) {
      setValidationErrors((prev) => {
        const newErrors = { ...prev };
        delete newErrors[name];
        return newErrors;
      });
    }
  };

  const handleFileChange = (e) => {
    const { name, files } = e.target;
    if (files && files[0]) {
      setCourse((prev) => ({
        ...prev,
        [name]: files[0],
      }));
    }
  };

  const handleAboutChange = (e) => {
    setCourse((prev) => ({
      ...prev,
      about_course: {
        ...prev.about_course,
        [e.target.name]: e.target.value,
      },
    }));

    // Clear validation error
    if (validationErrors[e.target.name]) {
      setValidationErrors((prev) => {
        const newErrors = { ...prev };
        delete newErrors[e.target.name];
        return newErrors;
      });
    }
  };

  const handleSkillsChange = (e) => {
    const skillsArray = e.target.value
      .split(",")
      .map((skill) => skill.trim())
      .filter((skill) => skill);
    setCourse((prev) => ({
      ...prev,
      about_course: {
        ...prev.about_course,
        skills: skillsArray,
      },
    }));

    // Clear validation error
    if (validationErrors.skills) {
      setValidationErrors((prev) => {
        const newErrors = { ...prev };
        delete newErrors.skills;
        return newErrors;
      });
    }
  };

  const handleAddOutcome = () => {
    setCourse((prev) => ({
      ...prev,
      outcome: [...prev.outcome, ""],
    }));
  };

  const handleOutcomeChange = (index, value) => {
    const updated = [...course.outcome];
    updated[index] = value;
    setCourse((prev) => ({ ...prev, outcome: updated }));

    // Clear validation error
    if (validationErrors.outcome) {
      setValidationErrors((prev) => {
        const newErrors = { ...prev };
        delete newErrors.outcome;
        return newErrors;
      });
    }
  };

  const handleRemoveOutcome = (index) => {
    if (course.outcome.length > 1) {
      const updated = [...course.outcome];
      updated.splice(index, 1);
      setCourse((prev) => ({ ...prev, outcome: updated }));
    }
  };

  const handleCancel = () => {
    if (
      window.confirm(
        "Are you sure you want to cancel? All unsaved changes will be lost."
      )
    ) {
      localStorage.removeItem("editingCourse");
      navigate("/instructor/dashboard");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (isSubmitting) return;

    setIsSubmitting(true);

    try {
      // Validate form
      const errors = validateForm();
      if (Object.keys(errors).length > 0) {
        setValidationErrors(errors);

        // Scroll to first error
        setTimeout(() => {
          const firstErrorElement = document.querySelector(".error-field");
          if (firstErrorElement) {
            firstErrorElement.scrollIntoView({
              behavior: "smooth",
              block: "center",
            });
          }
        }, 100);

        alert("Please fix all validation errors before submitting.");
        return;
      }

      // Clean and prepare course data
      const cleanedOutcomes = course.outcome.filter(
        (outcome) => outcome && outcome.trim()
      );
      const cleanedSkills = course.about_course.skills.filter(
        (skill) => skill && skill.trim()
      );

      const courseData = {
        ...course,
        title: course.course_name,
        description: course.about_course.complete_description,
        no_of_sessions: course.course_content.length,
        created_at: isEditing ? course.created_at : new Date().toISOString(),
        updated_at: new Date().toISOString(),
        id: isEditing ? course.id : Date.now(),
        status: course.status || "draft",
        rating: course.rating || 0,
        students: course.students || 0,
        calculated_hours: totalCalculatedHours,
        outcome: cleanedOutcomes,
        about_course: {
          ...course.about_course,
          skills: cleanedSkills,
        },
      };

      // Get existing courses from localStorage
      const savedCourses = localStorage.getItem("instructorCourses");
      let courses = [];

      if (savedCourses) {
        try {
          courses = JSON.parse(savedCourses);
          if (!Array.isArray(courses)) {
            courses = [];
          }
        } catch (error) {
          console.error("Error parsing saved courses:", error);
          courses = [];
        }
      }

      if (isEditing) {
        // Update existing course
        const courseIndex = courses.findIndex(
          (c) => c.id.toString() === course.id.toString()
        );
        if (courseIndex !== -1) {
          courses[courseIndex] = courseData;
        } else {
          // If course not found in custom courses, add it
          courses.push(courseData);
        }
      } else {
        // Add new course
        courses.push(courseData);
      }

      // Save updated courses to localStorage
      localStorage.setItem("instructorCourses", JSON.stringify(courses));
      localStorage.removeItem("editingCourse");

      // Trigger storage event to update the dashboard
      window.dispatchEvent(new Event("storage"));

      alert(
        isEditing
          ? "Course updated successfully!"
          : "Course created successfully!"
      );

      navigate("/instructor/dashboard");
    } catch (error) {
      console.error("Error saving course:", error);
      alert("An error occurred while saving the course. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div
      className="min-h-screen py-12 px-4 mt-16"
      style={{ backgroundColor: "#EBEDDF" }}
    >
      <div className="max-w-5xl mx-auto">
        {/* Header with back button and title */}
        <div className="flex items-center justify-between mb-10">
          <button
            onClick={handleCancel}
            className="flex items-center gap-2 px-4 py-2 text-gray-700 hover:text-gray-900 transition-colors"
          >
            <ArrowLeft className="w-5 h-5" />
            Back to Courses
          </button>
          <div className="flex-1 text-center">
            <h1
              className="text-4xl font-bold mb-4"
              style={{ color: "#333A2F" }}
            >
              {isEditing ? "Edit Course" : "Create New Course"}
            </h1>
            <p className="text-xl" style={{ color: "#333A2F" }}>
              {isEditing
                ? "Update your course information"
                : "Build an engaging learning experience for your students"}
            </p>
          </div>
          <div className="w-32"></div>
        </div>

        {/* Validation Summary */}
        {Object.keys(validationErrors).length > 0 && (
          <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-6">
            <div className="flex items-center gap-2 mb-2">
              <AlertCircle className="w-5 h-5 text-red-600" />
              <h3 className="text-lg font-semibold text-red-800">
                Please fix the following errors:
              </h3>
            </div>
            <ul className="list-disc list-inside space-y-1 text-red-700">
              {Object.values(validationErrors).map((error, index) => (
                <li key={index} className="text-sm">
                  {error}
                </li>
              ))}
            </ul>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-8">
          {/* Course Basic Information */}
          <div className="bg-white rounded-2xl shadow-lg p-8">
            <div className="flex items-center gap-3 mb-6">
              <BookOpen className="w-6 h-6" style={{ color: "#333A2F" }} />
              <h2 className="text-2xl font-bold" style={{ color: "#333A2F" }}>
                Course Information
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label
                  className="block text-sm font-semibold"
                  style={{ color: "#333A2F" }}
                >
                  Course Name *
                </label>
                <input
                  className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:border-transparent transition-all duration-200 ${
                    validationErrors.course_name
                      ? "border-red-500 error-field"
                      : "border-gray-300"
                  }`}
                  style={{ "--tw-ring-color": "#333A2F" }}
                  type="text"
                  name="course_name"
                  placeholder="Enter course name"
                  value={course.course_name}
                  onChange={handleInputChange}
                  required
                />
                {validationErrors.course_name && (
                  <p className="text-red-500 text-sm">
                    {validationErrors.course_name}
                  </p>
                )}
              </div>

              <div className="space-y-2">
                <label
                  className="block text-sm font-semibold"
                  style={{ color: "#333A2F" }}
                >
                  Level *
                </label>
                <select
                  name="level"
                  value={course.level}
                  onChange={handleInputChange}
                  className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:border-transparent transition-all duration-200 ${
                    validationErrors.level
                      ? "border-red-500 error-field"
                      : "border-gray-300"
                  }`}
                  style={{ "--tw-ring-color": "#333A2F" }}
                  required
                >
                  <option value="">Select Level</option>
                  <option value="beginner">Beginner</option>
                  <option value="intermediate">Intermediate</option>
                  <option value="advanced">Advanced</option>
                </select>
                {validationErrors.level && (
                  <p className="text-red-500 text-sm">
                    {validationErrors.level}
                  </p>
                )}
              </div>

              <div className="space-y-2">
                <label
                  className="flex items-center gap-2 text-sm font-semibold"
                  style={{ color: "#333A2F" }}
                >
                  <Globe className="w-4 h-4" />
                  Language *
                </label>
                <input
                  className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:border-transparent transition-all duration-200 ${
                    validationErrors.language
                      ? "border-red-500 error-field"
                      : "border-gray-300"
                  }`}
                  style={{ "--tw-ring-color": "#333A2F" }}
                  type="text"
                  name="language"
                  placeholder="Enter language"
                  value={course.language}
                  onChange={handleInputChange}
                  required
                />
                {validationErrors.language && (
                  <p className="text-red-500 text-sm">
                    {validationErrors.language}
                  </p>
                )}
              </div>

              <div className="space-y-2">
                <label
                  className="flex items-center gap-2 text-sm font-semibold"
                  style={{ color: "#333A2F" }}
                >
                  <Clock className="w-4 h-4" />
                  Total Hours
                  {totalCalculatedHours > 0 && (
                    <span className="text-xs text-gray-500">
                      (Auto-calculated:{" "}
                      {Math.round(totalCalculatedHours * 10) / 10}h)
                    </span>
                  )}
                </label>
                <input
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:border-transparent transition-all duration-200"
                  style={{ "--tw-ring-color": "#333A2F" }}
                  type="text"
                  name="total_no_hours"
                  placeholder="Enter total hours or let it auto-calculate"
                  value={course.total_no_hours}
                  onChange={handleInputChange}
                />
              </div>

              <div className="space-y-2">
                <label
                  className="flex items-center gap-2 text-sm font-semibold"
                  style={{ color: "#333A2F" }}
                >
                  <IndianRupee className="w-4 h-4" />
                  Price (INR) *
                </label>
                <input
                  className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:border-transparent transition-all duration-200 ${
                    validationErrors.price
                      ? "border-red-500 error-field"
                      : "border-gray-300"
                  }`}
                  style={{ "--tw-ring-color": "#333A2F" }}
                  type="number"
                  name="price"
                  placeholder="Enter course price"
                  min="0"
                  value={course.price}
                  onChange={handleInputChange}
                  required
                />
                {validationErrors.price && (
                  <p className="text-red-500 text-sm">
                    {validationErrors.price}
                  </p>
                )}
              </div>

              <div className="space-y-2">
                <label
                  className="flex items-center gap-2 text-sm font-semibold"
                  style={{ color: "#333A2F" }}
                >
                  <Video className="w-4 h-4" />
                  Course Video File
                </label>
                <input
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:border-transparent transition-all duration-200"
                  style={{ "--tw-ring-color": "#333A2F" }}
                  type="file"
                  name="video_file"
                  accept="video/*"
                  onChange={handleFileChange}
                />
                {course.video_file && (
                  <p className="text-sm text-gray-600">
                    Selected: {course.video_file.name || "Video file selected"}
                  </p>
                )}
              </div>
            </div>

            <div className="mt-6 space-y-2">
              <label
                className="flex items-center gap-2 text-sm font-semibold"
                style={{ color: "#333A2F" }}
              >
                <ImageIcon className="w-4 h-4" />
                Course Image File
              </label>
              <input
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:border-transparent transition-all duration-200"
                style={{ "--tw-ring-color": "#333A2F" }}
                type="file"
                name="image_file"
                accept="image/*"
                onChange={handleFileChange}
              />
              {course.image_file && (
                <p className="text-sm text-gray-600">
                  Selected: {course.image_file.name || "Image file selected"}
                </p>
              )}
            </div>

            {/* Course Features */}
            <div className="mt-8 pt-6 border-t border-gray-200">
              <h3
                className="text-lg font-semibold mb-4"
                style={{ color: "#333A2F" }}
              >
                Course Features
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <label className="flex items-center gap-3 p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors duration-200 cursor-pointer">
                  <input
                    type="checkbox"
                    name="certification"
                    checked={course.certification}
                    onChange={handleInputChange}
                    className="w-5 h-5 rounded"
                    style={{ accentColor: "#333A2F" }}
                  />
                  <Award className="w-5 h-5" style={{ color: "#333A2F" }} />
                  <span
                    className="text-sm font-medium"
                    style={{ color: "#333A2F" }}
                  >
                    Certification Included
                  </span>
                </label>

                <label
                  className={`flex items-center gap-3 p-4 border rounded-lg hover:bg-gray-50 transition-colors duration-200 cursor-pointer ${
                    validationErrors.pdf_available
                      ? "border-red-500"
                      : "border-gray-200"
                  }`}
                >
                  <input
                    type="checkbox"
                    name="pdf_available"
                    checked={course.pdf_available}
                    onChange={handleInputChange}
                    className="w-5 h-5 rounded"
                    style={{ accentColor: "#333A2F" }}
                  />
                  <FileText className="w-5 h-5" style={{ color: "#333A2F" }} />
                  <span
                    className="text-sm font-medium"
                    style={{ color: "#333A2F" }}
                  >
                    PDF Materials
                  </span>
                </label>

                <label
                  className={`flex items-center gap-3 p-4 border rounded-lg hover:bg-gray-50 transition-colors duration-200 cursor-pointer ${
                    validationErrors.tests_available
                      ? "border-red-500"
                      : "border-gray-200"
                  }`}
                >
                  <input
                    type="checkbox"
                    name="tests_available"
                    checked={course.tests_available}
                    onChange={handleInputChange}
                    className="w-5 h-5 rounded"
                    style={{ accentColor: "#333A2F" }}
                  />
                  <CheckCircle2
                    className="w-5 h-5"
                    style={{ color: "#333A2F" }}
                  />
                  <span
                    className="text-sm font-medium"
                    style={{ color: "#333A2F" }}
                  >
                    Tests Available
                  </span>
                </label>
              </div>

              {/* Display validation errors for features */}
              {validationErrors.pdf_available && (
                <p className="text-red-500 text-sm mt-2">
                  {validationErrors.pdf_available}
                </p>
              )}
              {validationErrors.tests_available && (
                <p className="text-red-500 text-sm mt-2">
                  {validationErrors.tests_available}
                </p>
              )}

              {course.tests_available && (
                <div
                  className="mt-4 p-4 rounded-lg"
                  style={{ backgroundColor: "#EBEDDF" }}
                >
                  <label
                    className="block text-sm font-semibold mb-2"
                    style={{ color: "#333A2F" }}
                  >
                    Number of Tests *
                  </label>
                  <input
                    className={`w-32 px-3 py-2 border rounded-lg focus:ring-2 focus:border-transparent transition-all duration-200 ${
                      validationErrors.no_of_tests_available
                        ? "border-red-500"
                        : "border-gray-300"
                    }`}
                    style={{ "--tw-ring-color": "#333A2F" }}
                    type="number"
                    name="no_of_tests_available"
                    placeholder="Enter number"
                    min="1"
                    value={course.no_of_tests_available}
                    onChange={handleInputChange}
                    required
                  />
                  {validationErrors.no_of_tests_available && (
                    <p className="text-red-500 text-sm mt-1">
                      {validationErrors.no_of_tests_available}
                    </p>
                  )}
                </div>
              )}
            </div>
          </div>

          {/* About Course */}
          <div className="bg-white rounded-2xl shadow-lg p-8">
            <div className="flex items-center gap-3 mb-6">
              <BookOpen className="w-6 h-6" style={{ color: "#333A2F" }} />
              <h2 className="text-2xl font-bold" style={{ color: "#333A2F" }}>
                About the Course
              </h2>
            </div>

            <div className="space-y-6">
              <div className="space-y-2">
                <label
                  className="block text-sm font-semibold"
                  style={{ color: "#333A2F" }}
                >
                  Skills (comma separated) *
                </label>
                <input
                  className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:border-transparent transition-all duration-200 ${
                    validationErrors.skills
                      ? "border-red-500 error-field"
                      : "border-gray-300"
                  }`}
                  style={{ "--tw-ring-color": "#333A2F" }}
                  type="text"
                  name="skills"
                  placeholder="e.g., JavaScript, React, Node.js"
                  value={
                    Array.isArray(course.about_course.skills)
                      ? course.about_course.skills.join(", ")
                      : ""
                  }
                  onChange={handleSkillsChange}
                  required
                />
                {validationErrors.skills && (
                  <p className="text-red-500 text-sm">
                    {validationErrors.skills}
                  </p>
                )}
              </div>

              <div className="space-y-2">
                <label
                  className="block text-sm font-semibold"
                  style={{ color: "#333A2F" }}
                >
                  Complete Description *
                </label>
                <textarea
                  className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:border-transparent transition-all duration-200 resize-none ${
                    validationErrors.complete_description
                      ? "border-red-500 error-field"
                      : "border-gray-300"
                  }`}
                  style={{ "--tw-ring-color": "#333A2F" }}
                  name="complete_description"
                  placeholder="Describe the course in detail..."
                  value={course.about_course.complete_description}
                  onChange={handleAboutChange}
                  rows={4}
                  required
                />
                {validationErrors.complete_description && (
                  <p className="text-red-500 text-sm">
                    {validationErrors.complete_description}
                  </p>
                )}
              </div>
            </div>
          </div>

          {/* Learning Outcomes */}
          <div className="bg-white rounded-2xl shadow-lg p-8">
            <div className="flex items-center gap-3 mb-6">
              <Target className="w-6 h-6" style={{ color: "#333A2F" }} />
              <h2 className="text-2xl font-bold" style={{ color: "#333A2F" }}>
                Learning Outcomes
              </h2>
            </div>

            <div className="space-y-4">
              {course.outcome.map((item, i) => (
                <div key={i} className="flex gap-3 items-start">
                  <div className="flex-1 space-y-2">
                    <label
                      className="block text-sm font-semibold"
                      style={{ color: "#333A2F" }}
                    >
                      Outcome {i + 1} *
                    </label>
                    <input
                      className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:border-transparent transition-all duration-200 ${
                        validationErrors.outcome
                          ? "border-red-500 error-field"
                          : "border-gray-300"
                      }`}
                      style={{ "--tw-ring-color": "#333A2F" }}
                      type="text"
                      value={item}
                      placeholder="What will students learn?"
                      onChange={(e) => handleOutcomeChange(i, e.target.value)}
                      required
                    />
                  </div>
                  {course.outcome.length > 1 && (
                    <button
                      type="button"
                      onClick={() => handleRemoveOutcome(i)}
                      className="mt-8 px-3 py-2 hover:bg-red-50 rounded-lg transition-colors duration-200"
                      style={{ color: "#333A2F" }}
                    >
                      Remove
                    </button>
                  )}
                </div>
              ))}
              {validationErrors.outcome && (
                <p className="text-red-500 text-sm">
                  {validationErrors.outcome}
                </p>
              )}
              <button
                type="button"
                onClick={handleAddOutcome}
                className="inline-flex items-center gap-2 px-4 py-2 rounded-lg transition-colors duration-200"
                style={{ color: "#333A2F", backgroundColor: "#EBEDDF" }}
              >
                <span className="text-lg">+</span>
                Add Outcome
              </button>
            </div>
          </div>

          {/* Course Sessions */}
          <SessionFormList
            course={course}
            setCourse={setCourse}
            validationErrors={validationErrors}
            setValidationErrors={setValidationErrors}
          />

          {/* Submit Button */}
          <div className="flex justify-center gap-4">
            <button
              type="button"
              onClick={handleCancel}
              className="px-8 py-4 text-gray-700 font-semibold rounded-xl border border-gray-300 hover:bg-gray-50 transition-all duration-200"
              disabled={isSubmitting}
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isSubmitting}
              onClick={() => {
                console.log(JSON.stringify(course, null, 2));
              }}
              className="inline-flex items-center gap-3 px-8 py-4 text-white font-semibold rounded-xl shadow-lg hover:opacity-90 transform hover:scale-105 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
              style={{ backgroundColor: "#333A2F" }}
            >
              <BookOpen className="w-5 h-5" />
              {isSubmitting
                ? isEditing
                  ? "Updating..."
                  : "Saving..."
                : isEditing
                ? "Update Course"
                : "Save Course"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CourseAddingForm;
