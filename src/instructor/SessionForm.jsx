"use client";
import ContentFormList from "./ContentFormList";
import { Trash2, BookOpen, Video, FileText, HelpCircle, ClipboardList, Zap } from "lucide-react";

const SessionForm = ({
  index,
  sessionData,
  onChange,
  onRemove,
  validationErrors,
  setValidationErrors,
}) => {
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    const updatedSession = { ...sessionData, [name]: value };
    onChange(updatedSession);

    if (setValidationErrors) {
      setValidationErrors((prev) => {
        const newErrors = { ...prev };
        if (name === "session" && value.trim()) {
          delete newErrors[`session_${index}_title`];
        }
        if (name === "module_description" && value.trim()) {
          delete newErrors[`session_${index}_description`];
        }
        return newErrors;
      });
    }
  };

  const handleContentChange = (updatedContent) => {
    const updatedSession = { ...sessionData, content: updatedContent };
    onChange(updatedSession);

    // Clear content validation error when content is added
    if (setValidationErrors && updatedContent.length > 0) {
      setValidationErrors((prev) => {
        const newErrors = { ...prev };
        delete newErrors[`session_${index}_content`];
        return newErrors;
      });
    }
  };

  // Get validation errors for this session
  const sessionTitleError = validationErrors?.[`session_${index}_title`];
  const sessionDescriptionError =
    validationErrors?.[`session_${index}_description`];
  const sessionContentError = validationErrors?.[`session_${index}_content`];

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
        return <Zap className="w-5 h-5" />;
      default:
        return <FileText className="w-5 h-5" />;
    }
  };

  return (
    <div className="border-2 border-gray-200 rounded-xl p-4 sm:p-6 bg-gray-50 transition-colors duration-200">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-4 sm:mb-6 gap-4 sm:gap-0">
        <div className="flex items-center gap-3">
          <div
            className="w-8 h-8 sm:w-10 sm:h-10 text-white rounded-full flex items-center justify-center font-bold text-sm sm:text-base flex-shrink-0"
            style={{ backgroundColor: "#333A2F" }}
          >
            {index + 1}
          </div>
          <div className="min-w-0 flex-1">
            <h3
              className="text-lg sm:text-xl font-bold"
              style={{ color: "#333A2F" }}
            >
              Session {index + 1}
            </h3>
            <p className="text-xs sm:text-sm text-gray-600">
              Configure session content and materials
            </p>
          </div>
        </div>
        <button
          type="button"
          onClick={onRemove}
          className="flex items-center justify-center gap-2 px-3 sm:px-4 py-2 hover:bg-red-50 rounded-lg transition-colors duration-200 text-red-600 self-start sm:self-auto min-h-[44px] touch-manipulation"
        >
          <Trash2 className="w-4 h-4" />
          <span className="text-sm">Remove</span>
        </button>
      </div>

      <div className="space-y-4 sm:space-y-6">
        {/* Session Title */}
        <div className="space-y-2">
          <label
            htmlFor={`session-title-${index}`}
            className="flex items-center gap-2 text-sm font-semibold text-gray-700"
          >
            <BookOpen className="w-4 h-4 flex-shrink-0" />
            Session Title *
          </label>
          <input
            id={`session-title-${index}`}
            type="text"
            name="session"
            placeholder="Enter session title"
            value={sessionData.session || ""}
            onChange={handleInputChange}
            className={`w-full px-3 sm:px-4 py-2.5 sm:py-3 border rounded-lg focus:ring-2 focus:ring-[#333A2F] bg-white text-sm sm:text-base min-h-[44px] ${
              sessionTitleError ? "border-red-500" : "border-gray-300"
            }`}
            required
          />
          {sessionTitleError && (
            <p className="text-red-500 text-sm">{sessionTitleError}</p>
          )}
        </div>

        {/* Module Description */}
        <div className="space-y-2">
          <label
            htmlFor={`module-description-${index}`}
            className="block text-sm font-semibold text-gray-700"
          >
            Module Description *
          </label>
          <textarea
            id={`module-description-${index}`}
            name="module_description"
            placeholder="Describe what students will learn in this session"
            value={sessionData.module_description || ""}
            onChange={handleInputChange}
            className={`w-full px-3 sm:px-4 py-2.5 sm:py-3 border rounded-lg focus:ring-2 focus:ring-[#333A2F] bg-white resize-none text-sm sm:text-base ${
              sessionDescriptionError ? "border-red-500" : "border-gray-300"
            }`}
            rows={3}
            required
          />
          {sessionDescriptionError && (
            <p className="text-red-500 text-sm">{sessionDescriptionError}</p>
          )}
        </div>

        {/* Content Form List */}
        <div className="bg-white rounded-lg p-3 sm:p-4 border border-gray-200">
          {sessionContentError && (
            <div className="mb-3 p-2 bg-red-50 border border-red-200 rounded">
              <p className="text-red-600 text-sm">{sessionContentError}</p>
            </div>
          )}
          <ContentFormList
            content={sessionData.content || []}
            onChange={handleContentChange}
            sessionIndex={index}
            validationErrors={validationErrors}
            setValidationErrors={setValidationErrors}
          />
        </div>

        {/* Content Display Section */}
        {sessionData.content && sessionData.content.length > 0 && (
          <div className="bg-[#EBEDDF] rounded-lg p-4 border border-[#C8CBB8]">
            <h4 className="text-lg font-semibold text-[#333A2F] mb-3">Session Content Preview</h4>
            <div className="space-y-3">
              {sessionData.content.map((item, contentIndex) => (
                <div key={contentIndex} className="bg-white rounded-lg p-3 border border-gray-200">
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-2">
                      <span className="text-lg">
                        {getIconForType(item.type)}
                      </span>
                      <h5 className="font-semibold text-[#333A2F]">{item.title || `Untitled ${item.type}`}</h5>
                    </div>
                    <span className="text-xs bg-[#333A2F] text-white px-2 py-1 rounded-full capitalize">
                      {item.type}
                    </span>
                  </div>
                  
                  {item.description && (
                    <p className="text-sm text-gray-600 mb-2">{item.description}</p>
                  )}
                  
                  {item.duration && (
                    <p className="text-xs text-gray-500">⏱️ {item.duration}</p>
                  )}

                  {/* Quiz Content Display */}
                  {item.quizConfig && item.quizConfig.questions && (
                    <div className="mt-3 p-3 bg-green-50 rounded border border-green-200">
                      <h6 className="text-sm font-semibold text-green-800 mb-2">📝 Quiz Questions:</h6>
                      <div className="space-y-2">
                        {item.quizConfig.questions.map((question, qIndex) => (
                          <div key={qIndex} className="bg-white p-2 rounded border border-green-200">
                            <p className="text-xs font-medium text-green-800 mb-1">
                              Q{qIndex + 1}: {question.question}
                            </p>
                            <div className="ml-3 space-y-1">
                              {question.options.map((option, oIndex) => (
                                <p key={oIndex} className={`text-xs ${question.correct === oIndex ? 'text-green-600 font-semibold' : 'text-gray-600'}`}>
                                  {String.fromCharCode(65 + oIndex)}. {option}
                                  {question.correct === oIndex && ' ✓'}
                                </p>
                              ))}
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                  
                  {/* Assignment Content Display */}
                  {item.assignmentConfig && (
                    <div className="mt-3 p-3 bg-purple-50 rounded border border-purple-200">
                      <h6 className="text-sm font-semibold text-purple-800 mb-2">📋 Assignment Details:</h6>
                      <div className="space-y-2">
                        <p className="text-xs text-purple-800">
                          <strong>Title:</strong> {item.assignmentConfig.title}
                        </p>
                        <p className="text-xs text-purple-800">
                          <strong>Instructions:</strong> {item.assignmentConfig.instructions}
                        </p>
                        {item.assignmentConfig.requirements && (
                          <p className="text-xs text-purple-800">
                            <strong>Requirements:</strong> {item.assignmentConfig.requirements}
                          </p>
                        )}
                        <p className="text-xs text-purple-800">
                          <strong>Points:</strong> {item.assignmentConfig.points || 0}
                        </p>
                        {item.assignmentConfig.dueDate && (
                          <p className="text-xs text-purple-800">
                            <strong>Due Date:</strong> {item.assignmentConfig.dueDate}
                          </p>
                        )}
                      </div>
                    </div>
                  )}
                  
                  {/* Coding Exercise Content Display */}
                  {item.codingConfig && (
                    <div className="mt-3 p-3 bg-blue-50 rounded border border-blue-200">
                      <h6 className="text-sm font-semibold text-blue-800 mb-2">💻 Coding Exercise:</h6>
                      <div className="space-y-2">
                        <p className="text-xs text-blue-800">
                          <strong>Title:</strong> {item.codingConfig.title}
                        </p>
                        <p className="text-xs text-blue-800">
                          <strong>Instructions:</strong> {item.codingConfig.instructions}
                        </p>
                        <p className="text-xs text-blue-800">
                          <strong>Language:</strong> {item.codingConfig.language}
                        </p>
                        {item.codingConfig.starterCode && (
                          <div className="bg-white p-2 rounded border border-blue-200">
                            <p className="text-xs font-medium text-blue-800 mb-1">Starter Code:</p>
                            <pre className="text-xs text-gray-700 bg-gray-100 p-1 rounded overflow-x-auto">
                              {item.codingConfig.starterCode}
                            </pre>
                          </div>
                        )}
                        {item.codingConfig.expectedOutput && (
                          <p className="text-xs text-blue-800">
                            <strong>Expected Output:</strong> {item.codingConfig.expectedOutput}
                          </p>
                        )}
                        {item.codingConfig.testCases && item.codingConfig.testCases.length > 0 && (
                          <div className="bg-white p-2 rounded border border-blue-200">
                            <p className="text-xs font-medium text-blue-800 mb-1">Test Cases:</p>
                            {item.codingConfig.testCases.map((testCase, tIndex) => (
                              <div key={tIndex} className="text-xs text-gray-700 mb-1">
                                <span className="font-medium">Test {tIndex + 1}:</span> 
                                Input: "{testCase.input}" → Expected: "{testCase.expected}"
                              </div>
                            ))}
                          </div>
                        )}
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default SessionForm;
