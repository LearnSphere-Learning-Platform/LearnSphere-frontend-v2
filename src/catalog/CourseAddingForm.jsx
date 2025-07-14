import React, { useState } from "react";
import { CourseTemplate } from "./utils/CourseTemplata";
import SessionFormList from "./SessionFormList";

const CourseAddingForm = () => {
  const [course, setCourse] = useState({
    ...CourseTemplate,
    tests_available: false,
    no_of_tests_available: 0,
    price: 0,
    video_url: "",
    no_of_sessions: 0,
    course_content: [],
  });

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

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Final Course:", course);
    // Submit logic
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="p-8 space-y-8 bg-white rounded-xl shadow-lg max-w-4xl mx-auto mt-10 border border-gray-200"
    >
      <h2 className="text-3xl font-bold text-gray-800">Create New Course</h2>

      {/* Course Info */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-1">
          <label className="block text-sm font-medium text-gray-700">
            Course Name*
          </label>
          <input
            className="input border border-gray-300 rounded-md p-2 w-full"
            type="text"
            name="course_name"
            placeholder="Enter course name"
            value={course.course_name}
            onChange={handleInputChange}
            required
          />
        </div>

        <div className="space-y-1">
          <label className="block text-sm font-medium text-gray-700">
            Level*
          </label>
          <select
            name="level"
            value={course.level}
            onChange={handleInputChange}
            className="input border border-gray-300 rounded-md p-2 w-full"
            required
          >
            <option value="">Select</option>
            <option value="beginner">Beginner</option>
            <option value="intermediate">Intermediate</option>
            <option value="advanced">Advanced</option>
          </select>
        </div>

        <div className="space-y-1">
          <label className="block text-sm font-medium text-gray-700">
            Language*
          </label>
          <input
            className="input border border-gray-300 rounded-md p-2 w-full"
            type="text"
            name="language"
            placeholder="Enter language"
            value={course.language}
            onChange={handleInputChange}
            required
          />
        </div>

        <div className="space-y-1">
          <label className="block text-sm font-medium text-gray-700">
            Total Hours*
          </label>
          <input
            className="input border border-gray-300 rounded-md p-2 w-full"
            type="text"
            name="total_no_hours"
            placeholder="Enter total hours"
            value={course.total_no_hours}
            onChange={handleInputChange}
            required
          />
        </div>

        {/* Price Field */}
        <div className="space-y-1">
          <label className="block text-sm font-medium text-gray-700">
            Price (USD)*
          </label>
          <input
            className="input border border-gray-300 rounded-md p-2 w-full"
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

        {/* Video URL Field */}
        <div className="space-y-1">
          <label className="block text-sm font-medium text-gray-700">
            Course Video URL
          </label>
          <input
            className="input border border-gray-300 rounded-md p-2 w-full"
            type="url"
            name="video_url"
            placeholder="https://example.com/video"
            value={course.video_url}
            onChange={handleInputChange}
          />
        </div>
      </div>

      {/* Checkboxes */}
      <div className="flex gap-8 mt-2">
        <label className="flex items-center gap-2 text-sm text-gray-700">
          <input
            type="checkbox"
            name="certification"
            checked={course.certification}
            onChange={handleInputChange}
          />
          Certification Included
        </label>
        <label className="flex items-center gap-2 text-sm text-gray-700">
          <input
            type="checkbox"
            name="pdf_available"
            checked={course.pdf_available}
            onChange={handleInputChange}
          />
          PDF Materials Available
        </label>
      </div>

      {/* Tests Available Section */}
      <div className="flex flex-col gap-2">
        <label className="flex items-center gap-2 text-sm text-gray-700">
          <input
            type="checkbox"
            name="tests_available"
            checked={course.tests_available}
            onChange={handleInputChange}
          />
          Tests Available
        </label>

        {course.tests_available && (
          <div className="space-y-1">
            <label className="block text-sm font-medium text-gray-700">
              Number of Tests*
            </label>
            <input
              className="input border border-gray-300 rounded-md p-2 w-32"
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

      {/* About Section */}
      <div className="border border-gray-300 rounded-md p-4 bg-gray-50">
        <h3 className="font-semibold text-lg text-gray-800 mb-3">
          About the Course
        </h3>
        <div className="space-y-1 mb-3">
          <label className="block text-sm font-medium text-gray-700">
            Skills (comma separated)*
          </label>
          <input
            className="input w-full border border-gray-300 rounded-md p-2"
            type="text"
            name="skills"
            placeholder="e.g., JavaScript, React, Node.js"
            value={course.about_course.skills.join(", ")}
            onChange={handleSkillsChange}
            required
          />
        </div>
        <div className="space-y-1">
          <label className="block text-sm font-medium text-gray-700">
            Complete Description*
          </label>
          <textarea
            className="input w-full border border-gray-300 rounded-md p-2 h-24"
            name="complete_description"
            placeholder="Describe the course in detail..."
            value={course.about_course.complete_description}
            onChange={handleAboutChange}
            required
          />
        </div>
      </div>

      {/* Outcomes */}
      <div className="border border-gray-300 rounded-md p-4 bg-gray-50">
        <h3 className="font-semibold text-lg text-gray-800 mb-3">
          Learning Outcomes
        </h3>
        {course.outcome.map((item, i) => (
          <div key={i} className="space-y-1 mb-2">
            <label className="block text-sm font-medium text-gray-700">
              Outcome {i + 1}*
            </label>
            <input
              className="input w-full border border-gray-300 rounded-md p-2"
              type="text"
              value={item}
              placeholder="What will students learn?"
              onChange={(e) => handleOutcomeChange(i, e.target.value)}
              required
            />
          </div>
        ))}
        <button
          type="button"
          onClick={handleAddOutcome}
          className="text-blue-600 text-sm mt-2"
        >
          + Add Outcome
        </button>
      </div>

      {/* Sessions */}
      <SessionFormList course={course} setCourse={setCourse} />

      {/* Display calculated number of sessions */}
      <div className="text-gray-700 font-medium mt-2">
        Total Sessions: {course.no_of_sessions}
      </div>

      <button
        type="submit"
        className="bg-blue-600 text-white font-medium px-6 py-3 rounded-md hover:bg-blue-700"
      >
        Save Course
      </button>
    </form>
  );
};

export default CourseAddingForm;
