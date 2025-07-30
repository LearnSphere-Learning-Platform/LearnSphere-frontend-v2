"use client";
import React, { useState } from "react";
import {
  Trash2,
  Eye,
  Video,
  FileText,
  HelpCircle,
  ClipboardList,
  Zap,
  CodeIcon,
} from "lucide-react";
import QuizForm from "../quiz/QuizForm";
import InstructorAssignmentForm from "../quiz/InstructorAssignmentForm";
import InstructorCodingExerciseForm from "../quiz/InstructorCodingExerciseForm";

const ContentForm = ({
  index,
  content,
  onChange,
  onRemove,
  sessionIndex,
  validationErrors,
  setValidationErrors,
}) => {
  const [showQuizBuilder, setShowQuizBuilder] = useState(false);
  const [showAssignmentBuilder, setShowAssignmentBuilder] = useState(false);
  const [showCodingBuilder, setShowCodingBuilder] = useState(false);

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    let newValue;

    if (type === "checkbox") {
      newValue = checked;
    } else if (type === "file") {
      newValue = e.target.files[0];
    } else {
      newValue = value;
    }

    // Update content
    const updatedContent = { ...content, [name]: newValue };
    onChange(updatedContent);

    // Clear validation error for this field
    const errorKey = `content_${sessionIndex}_${index}_${name}`;
    if (validationErrors?.[errorKey]) {
      const newErrors = { ...validationErrors };
      delete newErrors[errorKey];
      setValidationErrors(newErrors);
    }
  };

  const handleQuizSave = (quiz_config) => {
    const updatedContent = { ...content, quiz_config };
    onChange(updatedContent);
    setShowQuizBuilder(false);
  };

  const handleAssignmentSave = (assignment_config) => {
    const updatedContent = { ...content, assignment_config };
    onChange(updatedContent);
    setShowAssignmentBuilder(false);
  };

  const handleCodingSave = (coding_config) => {
    const updatedContent = { ...content, coding_config };
    onChange(updatedContent);
    setShowCodingBuilder(false);
  };

  const getIconForType = (type) => {
    switch (type) {
      case "video":
        return <Video className="w-5 h-5" />;
      case "pdf":
        return <FileText className="w-5 h-5" />;
      case "quiz":
        return <HelpCircle className="w-5 h-5" />;
      case "assignment":
        return <ClipboardList className="w-5 h-5" />;
      case "coding":
        return <CodeIcon className="w-5 h-5" />;
      default:
        return <FileText className="w-5 h-5" />;
    }
  };

  const renderTypeSpecificFields = () => {
    switch (content.type) {
      case "video":
        return (
          <>
            <div className="space-y-2">
              <label className="block text-xs sm:text-sm font-semibold text-[#333A2F]">
                Video File *
              </label>
              <input
                type="file"
                name="file"
                accept="video/*"
                onChange={handleInputChange}
                className="w-full px-3 py-2 sm:py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#333A2F] bg-white text-sm sm:text-base min-h-[44px]"
                required
              />
              {content.file && (
                <p className="text-xs text-gray-500">
                  Selected: {content.file.name}
                </p>
              )}
            </div>
            <div className="space-y-2">
              <label className="block text-xs sm:text-sm font-semibold text-[#333A2F]">
                Duration *
              </label>
              <input
                type="text"
                name="duration"
                placeholder="e.g., 12:30, 12 minutes, 1h 30m"
                value={content.duration || ""}
                onChange={handleInputChange}
                className="w-full px-3 py-2 sm:py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#333A2F] bg-white text-sm sm:text-base min-h-[44px]"
                required
              />
              <p className="text-xs text-gray-500">
                Formats: "12:30", "12 minutes", "1h 30m", or "90 minutes"
              </p>
            </div>
          </>
        );

      case "pdf":
        return (
          <>
            <div className="space-y-2">
              <label className="block text-xs sm:text-sm font-semibold text-[#333A2F]">
                PDF File *
              </label>
              <input
                type="file"
                name="file"
                accept=".pdf"
                onChange={handleInputChange}
                className="w-full px-3 py-2 sm:py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#333A2F] bg-white text-sm sm:text-base min-h-[44px]"
                required
              />
              {content.file && (
                <p className="text-xs text-gray-500">
                  Selected: {content.file.name}
                </p>
              )}
            </div>
            <div className="space-y-2">
              <label className="block text-xs sm:text-sm font-semibold text-[#333A2F]">
                File Size
              </label>
              <input
                type="text"
                name="file_size"
                placeholder="e.g., 2.5 MB"
                value={content.file_size || ""}
                onChange={handleInputChange}
                className="w-full px-3 py-2 sm:py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#333A2F] bg-white text-sm sm:text-base min-h-[44px]"
              />
            </div>
          </>
        );

      case "assignment":
        return (
          <>
            <div className="space-y-2">
              <label className="block text-xs sm:text-sm font-semibold text-[#333A2F]">
                Assignment File *
              </label>
              <input
                type="file"
                name="file"
                accept=".pdf,.doc,.docx,.txt"
                onChange={handleInputChange}
                className="w-full px-3 py-2 sm:py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#333A2F] bg-white text-sm sm:text-base min-h-[44px]"
                required
              />
              {content.file && (
                <p className="text-xs text-gray-500">
                  Selected: {content.file.name}
                </p>
              )}
            </div>
            <div className="space-y-2">
              <label className="block text-xs sm:text-sm font-semibold text-[#333A2F]">
                Due Date/Duration
              </label>
              <input
                type="text"
                name="duration"
                placeholder="e.g., 7 days from enrollment"
                value={content.duration || ""}
                onChange={handleInputChange}
                className="w-full px-3 py-2 sm:py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#333A2F] bg-white text-sm sm:text-base min-h-[44px]"
              />
            </div>
            <div className="space-y-2">
              <label className="block text-xs sm:text-sm font-semibold text-[#333A2F]">
                Assignment Configuration
              </label>
              <button
                type="button"
                onClick={() => setShowAssignmentBuilder(true)}
                className="w-full px-3 py-2 bg-[#333A2F] text-white rounded-lg hover:bg-[#2a3028] text-sm font-medium"
              >
                Open Assignment Builder
              </button>
              {content.assignment_config && (
                <p className="text-xs text-green-600 p-2 bg-green-50 rounded">
                  ✓ Assignment configured with{" "}
                  {content.assignment_config.points || 0} points
                </p>
              )}
            </div>
          </>
        );

      case "quiz":
        return (
          <>
            <div className="space-y-2">
              <label className="block text-xs sm:text-sm font-semibold text-[#333A2F]">
                Quiz Duration
              </label>
              <input
                type="text"
                name="duration"
                placeholder="e.g., 30 minutes"
                value={content.duration || ""}
                onChange={handleInputChange}
                className="w-full px-3 py-2 sm:py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#333A2F] bg-white text-sm sm:text-base min-h-[44px]"
              />
            </div>
            <div className="space-y-2">
              <label className="block text-xs sm:text-sm font-semibold text-[#333A2F]">
                Quiz Configuration
              </label>
              <button
                type="button"
                onClick={() => setShowQuizBuilder(true)}
                className="w-full px-3 py-2 bg-[#333A2F] text-white rounded-lg hover:bg-[#2a3028] text-sm font-medium"
              >
                Open Quiz Builder
              </button>
              {content.quiz_config && (
                <p className="text-xs text-green-600 p-2 bg-green-50 rounded">
                  ✓ Quiz configured with{" "}
                  {content.quiz_config.questions?.length || 0} questions
                </p>
              )}
            </div>
          </>
        );

      case "coding":
        return (
          <>
            <div className="space-y-2">
              <label className="block text-xs sm:text-sm font-semibold text-[#333A2F]">
                Estimated Time
              </label>
              <input
                type="text"
                name="duration"
                placeholder="e.g., 45 minutes"
                value={content.duration || ""}
                onChange={handleInputChange}
                className="w-full px-3 py-2 sm:py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#333A2F] bg-white text-sm sm:text-base min-h-[44px]"
              />
            </div>
            <div className="space-y-2">
              <label className="block text-xs sm:text-sm font-semibold text-[#333A2F]">
                Coding Exercise Configuration
              </label>
              <button
                type="button"
                onClick={() => setShowCodingBuilder(true)}
                className="w-full px-3 py-2 bg-[#333A2F] text-white rounded-lg hover:bg-[#2a3028] text-sm font-medium"
              >
                Open Coding Exercise Builder
              </button>
              {content.coding_config && (
                <p className="text-xs text-green-600 p-2 bg-green-50 rounded">
                  ✓ Exercise configured with{" "}
                  {content.coding_config.testCases?.length || 0} test cases
                </p>
              )}
            </div>
          </>
        );

      default:
        return null;
    }
  };

  const IconComponent = getIconForType(content.type);

  // Get validation errors for this content item
  const contentTitleError =
    validationErrors?.[`content_${sessionIndex}_${index}_title`];
  const contentTypeError =
    validationErrors?.[`content_${sessionIndex}_${index}_type`];

  return (
    <div className="bg-white rounded-lg shadow-md border p-5 mb-6 transition-all hover:shadow-xl">
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-3">
          <span className="text-2xl">{IconComponent}</span>
          <div>
            <h3 className="text-sm sm:text-base font-semibold text-[#333A2F]">
              {content.type} {index + 1}
            </h3>
            <p className="text-xs text-gray-500">
              {content.title || "Untitled content"}
            </p>
            {/* Configuration Status */}
            {content.quiz_config && (
              <p className="text-xs text-green-600 font-medium">
                ✓ Quiz: {content.quiz_config.questions?.length || 0} questions
              </p>
            )}
            {content.assignment_config && (
              <p className="text-xs text-purple-600 font-medium">
                ✓ Assignment: {content.assignment_config.points || 0} points
              </p>
            )}
            {content.coding_config && (
              <p className="text-xs text-green-600 font-medium">
                ✓ Coding: {content.coding_config.testCases?.length || 0} test
                cases
              </p>
            )}
          </div>
        </div>
        <button
          type="button"
          onClick={onRemove}
          className="flex items-center justify-center gap-1 px-2 sm:px-3 py-2 hover:bg-red-50 rounded-lg transition-colors duration-200 text-[#333A2F] self-start sm:self-auto min-h-[44px] touch-manipulation"
        >
          <Trash2 className="w-4 h-4" />
          <span className="text-xs sm:text-sm">Remove</span>
        </button>
      </div>

      <div className="grid grid-cols-1 gap-3 sm:gap-4">
        <div className="space-y-2">
          <label className="block text-xs sm:text-sm font-semibold text-[#333A2F]">
            Title *
          </label>
          <input
            type="text"
            name="title"
            placeholder="Enter content title"
            value={content.title || ""}
            onChange={handleInputChange}
            className={`w-full px-3 py-2 sm:py-2.5 border rounded-lg focus:ring-2 focus:ring-[#333A2F] bg-white text-sm sm:text-base min-h-[44px] ${
              contentTitleError ? "border-red-500" : "border-gray-300"
            }`}
            required
          />
          {contentTitleError && (
            <p className="text-red-500 text-sm">{contentTitleError}</p>
          )}
        </div>

        <div className="space-y-2">
          <label className="block text-xs sm:text-sm font-semibold text-[#333A2F]">
            Content Type *
          </label>
          <select
            name="type"
            value={content.type || ""}
            onChange={handleInputChange}
            className={`w-full px-3 py-2 sm:py-2.5 border rounded-lg focus:ring-2 focus:ring-[#333A2F] bg-white text-sm sm:text-base min-h-[44px] ${
              contentTypeError ? "border-red-500" : "border-gray-300"
            }`}
            required
          >
            <option value="">Select Type</option>
            <option value="video">Video</option>
            <option value="pdf">PDF Document</option>
            <option value="coding">Coding Exercise</option>
            <option value="assignment">Assignment</option>
            <option value="quiz">Quiz</option>
          </select>
          {contentTypeError && (
            <p className="text-red-500 text-sm">{contentTypeError}</p>
          )}
        </div>

        {/* Type-specific fields */}
        {renderTypeSpecificFields()}

        <div className="space-y-2">
          <label className="block text-xs sm:text-sm font-semibold text-[#333A2F]">
            Description
          </label>
          <textarea
            name="description"
            placeholder="Describe this content item..."
            value={content.description || ""}
            onChange={handleInputChange}
            className="w-full px-3 py-2 sm:py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#333A2F] bg-white text-sm sm:text-base resize-none"
            rows={2}
          />
        </div>
      </div>

      {/* Preview option for applicable content types */}
      {(content.type === "video" || content.type === "pdf") && (
        <div className="mt-4 pt-4 border-t border-gray-200">
          <label className="flex items-center gap-3 p-3 rounded-lg transition-colors duration-200 cursor-pointer bg-[#EBEDDF] hover:bg-[#EBEDDF]/80">
            <input
              type="checkbox"
              name="preview"
              checked={content.preview || false}
              onChange={handleInputChange}
              className="w-4 h-4 sm:w-5 sm:h-5 rounded accent-[#333A2F] flex-shrink-0"
            />
            <Eye className="w-4 h-4 text-[#333A2F] flex-shrink-0" />
            <span className="text-xs sm:text-sm font-medium text-[#333A2F]">
              Allow preview for non-enrolled students
            </span>
          </label>
        </div>
      )}

      {/* Modal Dialogs */}
      {showQuizBuilder && (
        <div className="fixed inset-0 backdrop-blur-sm bg-[#EBEDDF]/50 flex items-center justify-center z-[9999] p-4 top-0">
          <div className="bg-[#EBEDDF]/95 backdrop-blur-md rounded-lg max-w-4xl w-full max-h-[85vh] overflow-y-auto shadow-2xl border border-[#C8CBB8]">
            <QuizForm
              quizData={content.quiz_config}
              onSave={handleQuizSave}
              onCancel={() => setShowQuizBuilder(false)}
            />
          </div>
        </div>
      )}

      {showAssignmentBuilder && (
        <div className="fixed inset-0 backdrop-blur-sm bg-[#EBEDDF]/50 flex items-center justify-center z-[9999] p-4 top-0">
          <div className="bg-[#EBEDDF]/95 backdrop-blur-md rounded-lg max-w-4xl w-full max-h-[85vh] overflow-y-auto shadow-2xl border border-[#C8CBB8]">
            <InstructorAssignmentForm
              assignmentData={content.assignment_config}
              onSave={handleAssignmentSave}
              onCancel={() => setShowAssignmentBuilder(false)}
            />
          </div>
        </div>
      )}

      {showCodingBuilder && (
        <div className="fixed inset-0 backdrop-blur-sm bg-[#EBEDDF]/50 flex items-center justify-center z-[9999] p-4 top-0">
          <div className="bg-[#EBEDDF]/95 backdrop-blur-md rounded-lg max-w-4xl w-full max-h-[85vh] overflow-y-auto shadow-2xl border border-[#C8CBB8]">
            <InstructorCodingExerciseForm
              exerciseData={content.coding_config}
              onSave={handleCodingSave}
              onCancel={() => setShowCodingBuilder(false)}
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default ContentForm;
