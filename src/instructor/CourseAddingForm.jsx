import React, { useState, useEffect } from "react";
import { CourseTemplate } from "./utils/CourseTemplata";
import SessionFormList from "./SessionFormList";
import {
  BookOpen,
  DollarSign,
  Clock,
  Globe,
  Award,
  FileText,
  CheckCircle2,
  Target,
  Image,
  ArrowLeft,
} from "lucide-react";

const CourseAddingForm = ({ editingCourse, onSave, onCancel }) => {
  const [course, setCourse] = useState({ ...CourseTemplate });

  // Populate form with existing course data when editing
  useEffect(() => {
    if (editingCourse) {
      setCourse({
        ...CourseTemplate,
        ...editingCourse,
        // Ensure all required fields are properly mapped
        course_name: editingCourse.course_name || editingCourse.title || "",
        about_course: {
          ...CourseTemplate.about_course,
          ...editingCourse.about_course,
        },
        outcome:
          editingCourse.outcome?.length > 0 ? editingCourse.outcome : [""],
        course_content:
          editingCourse.course_content?.length > 0
            ? editingCourse.course_content
            : [],
        no_of_sessions: editingCourse.course_content?.length || 0,
        // Convert values to match form expectations
        total_no_hours:
          editingCourse.total_no_hours || editingCourse.total_hours || "",
        price: editingCourse.price || 0,
        level: editingCourse.level || "",
        language: editingCourse.language || "",
        certification: editingCourse.certification || false,
        pdf_available: editingCourse.pdf_available || false,
        tests_available: editingCourse.tests_available || false,
        no_of_tests_available: editingCourse.no_of_tests_available || 0,
        video_url: editingCourse.video_url || "",
        image_url: editingCourse.image_url || editingCourse.image || "",
      });
    } else {
      setCourse({ ...CourseTemplate });
    }
  }, [editingCourse]);

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setCourse((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleAboutChange = (e) => {
    setCourse((prev) => ({
      ...prev,
      about_course: {
        ...prev.about_course,
        [e.target.name]: e.target.value,
      },
    }));
  };

  const handleSkillsChange = (e) => {
    const skillsArray = e.target.value.split(",").map((skill) => skill.trim());
    setCourse((prev) => ({
      ...prev,
      about_course: {
        ...prev.about_course,
        skills: skillsArray,
      },
    }));
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
  };

  const handleRemoveOutcome = (index) => {
    const updated = [...course.outcome];
    updated.splice(index, 1);
    setCourse((prev) => ({ ...prev, outcome: updated }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const courseData = {
      ...course,
      title: course.course_name, // Ensure title is set for display
      description: course.about_course.complete_description, // Ensure description is set
      no_of_sessions: course.course_content.length, // Update session count
      created_at: editingCourse
        ? editingCourse.created_at
        : new Date().toISOString(),
      updated_at: new Date().toISOString(),
    };

    onSave(courseData);
    alert(
      editingCourse
        ? "Course updated successfully!"
        : "Course created successfully!"
    );
  };

  return (
    <div
      className="min-h-screen py-12 px-4"
      style={{ backgroundColor: "#EBEDDF" }}
    >
      <div className="max-w-5xl mx-auto">
        {/* Header with back button */}
        <div className="flex items-center gap-4 mb-8">
          <button
            onClick={onCancel}
            className="flex items-center gap-2 px-4 py-2 text-gray-700 hover:text-gray-900 transition-colors"
          >
            <ArrowLeft className="w-5 h-5" />
            Back to Courses
          </button>
        </div>

        <div className="text-center mb-10">
          <h1 className="text-4xl font-bold mb-4" style={{ color: "#333A2F" }}>
            {editingCourse ? "Edit Course" : "Create New Course"}
          </h1>
          <p className="text-xl" style={{ color: "#333A2F" }}>
            {editingCourse
              ? "Update your course information"
              : "Build an engaging learning experience for your students"}
          </p>
        </div>

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
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:border-transparent transition-all duration-200"
                  style={{ "--tw-ring-color": "#333A2F" }}
                  type="text"
                  name="course_name"
                  placeholder="Enter course name"
                  value={course.course_name}
                  onChange={handleInputChange}
                  required
                />
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
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:border-transparent transition-all duration-200"
                  style={{ "--tw-ring-color": "#333A2F" }}
                  required
                >
                  <option value="">Select Level</option>
                  <option value="beginner">Beginner</option>
                  <option value="intermediate">Intermediate</option>
                  <option value="advanced">Advanced</option>
                </select>
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
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:border-transparent transition-all duration-200"
                  style={{ "--tw-ring-color": "#333A2F" }}
                  type="text"
                  name="language"
                  placeholder="Enter language"
                  value={course.language}
                  onChange={handleInputChange}
                  required
                />
              </div>

              <div className="space-y-2">
                <label
                  className="flex items-center gap-2 text-sm font-semibold"
                  style={{ color: "#333A2F" }}
                >
                  <Clock className="w-4 h-4" />
                  Total Hours *
                </label>
                <input
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:border-transparent transition-all duration-200"
                  style={{ "--tw-ring-color": "#333A2F" }}
                  type="text"
                  name="total_no_hours"
                  placeholder="Enter total hours"
                  value={course.total_no_hours}
                  onChange={handleInputChange}
                  required
                />
              </div>

              <div className="space-y-2">
                <label
                  className="flex items-center gap-2 text-sm font-semibold"
                  style={{ color: "#333A2F" }}
                >
                  <DollarSign className="w-4 h-4" />
                  Price (USD) *
                </label>
                <input
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:border-transparent transition-all duration-200"
                  style={{ "--tw-ring-color": "#333A2F" }}
                  type="number"
                  name="price"
                  placeholder="Enter course price"
                  min="0"
                  step="0.01"
                  value={course.price}
                  onChange={handleInputChange}
                  required
                />
              </div>

              <div className="space-y-2">
                <label
                  className="block text-sm font-semibold"
                  style={{ color: "#333A2F" }}
                >
                  Course Video URL
                </label>
                <input
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:border-transparent transition-all duration-200"
                  style={{ "--tw-ring-color": "#333A2F" }}
                  type="url"
                  name="video_url"
                  placeholder="Enter video URL"
                  value={course.video_url}
                  onChange={handleInputChange}
                />
              </div>
            </div>

            <div className="mt-6 space-y-2">
              <label
                className="flex items-center gap-2 text-sm font-semibold"
                style={{ color: "#333A2F" }}
              >
                <Image className="w-4 h-4" />
                Course Image URL
              </label>
              <input
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:border-transparent transition-all duration-200"
                style={{ "--tw-ring-color": "#333A2F" }}
                type="url"
                name="image_url"
                placeholder="Enter image URL"
                value={course.image_url}
                onChange={handleInputChange}
              />
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

                <label className="flex items-center gap-3 p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors duration-200 cursor-pointer">
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

                <label className="flex items-center gap-3 p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors duration-200 cursor-pointer">
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
                    className="w-32 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:border-transparent transition-all duration-200"
                    style={{ "--tw-ring-color": "#333A2F" }}
                    type="number"
                    name="no_of_tests_available"
                    placeholder="Enter number"
                    min="1"
                    value={course.no_of_tests_available}
                    onChange={handleInputChange}
                    required
                  />
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
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:border-transparent transition-all duration-200"
                  style={{ "--tw-ring-color": "#333A2F" }}
                  type="text"
                  name="skills"
                  placeholder="e.g., JavaScript, React, Node.js"
                  value={course.about_course.skills.join(", ")}
                  onChange={handleSkillsChange}
                  required
                />
              </div>

              <div className="space-y-2">
                <label
                  className="block text-sm font-semibold"
                  style={{ color: "#333A2F" }}
                >
                  Complete Description *
                </label>
                <textarea
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:border-transparent transition-all duration-200 resize-none"
                  style={{ "--tw-ring-color": "#333A2F" }}
                  name="complete_description"
                  placeholder="Describe the course in detail..."
                  value={course.about_course.complete_description}
                  onChange={handleAboutChange}
                  rows={4}
                  required
                />
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
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:border-transparent transition-all duration-200"
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
          <SessionFormList course={course} setCourse={setCourse} />

          {/* Submit Button */}
          <div className="flex justify-center gap-4">
            <button
              type="button"
              onClick={onCancel}
              className="px-8 py-4 text-gray-700 font-semibold rounded-xl border border-gray-300 hover:bg-gray-50 transition-all duration-200"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="inline-flex items-center gap-3 px-8 py-4 text-white font-semibold rounded-xl shadow-lg hover:opacity-90 transform hover:scale-105 transition-all duration-200"
              style={{ backgroundColor: "#333A2F" }}
            >
              <BookOpen className="w-5 h-5" />
              {editingCourse ? "Update Course" : "Save Course"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CourseAddingForm;
