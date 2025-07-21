"use client";
import {
  Trash2,
  Play,
  Eye,
  FileText,
  Code,
  HelpCircle,
  PenTool,
} from "lucide-react";

const ContentForm = ({
  index,
  content,
  onChange,
  onRemove,
  sessionIndex,
  validationErrors,
  setValidationErrors,
}) => {
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

    const updatedContent = {
      ...content,
      [name]: newValue,
    };

    onChange(updatedContent);

    // Clear validation errors when user makes changes
    if (setValidationErrors) {
      setValidationErrors((prev) => {
        const newErrors = { ...prev };
        if (name === "title" && newValue && newValue.trim()) {
          delete newErrors[`content_${sessionIndex}_${index}_title`];
        }
        if (name === "type" && newValue) {
          delete newErrors[`content_${sessionIndex}_${index}_type`];
        }
        return newErrors;
      });
    }
  };

  const getIconForType = (type) => {
    const iconMap = {
      video: Play,
      pdf: FileText,
      coding: Code,
      assignment: PenTool,
      quiz: HelpCircle,
    };
    return iconMap[type] || Play;
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
              <p className="text-xs text-gray-500 p-3 bg-gray-50 rounded">
                Quiz builder will be available soon. You can specify the quiz
                title and description for now.
              </p>
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
              <p className="text-xs text-gray-500 p-3 bg-gray-50 rounded">
                Coding exercise builder will be available soon. You can specify
                the exercise title and description for now.
              </p>
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
    <div className="border border-gray-200 rounded-lg p-4 sm:p-5 bg-gray-50 hover:bg-white transition-colors duration-200">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-4 gap-3 sm:gap-0">
        <div className="flex items-center gap-3">
          <div className="w-6 h-6 sm:w-8 sm:h-8 text-white rounded-full flex items-center justify-center font-bold text-xs sm:text-sm bg-[#333A2F] flex-shrink-0">
            {index + 1}
          </div>
          <div className="flex items-center gap-2">
            <IconComponent className="w-4 h-4 text-[#333A2F]" />
            <h5 className="font-semibold text-sm sm:text-base text-[#333A2F] capitalize">
              {content.type} {index + 1}
            </h5>
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
    </div>
  );
};

export default ContentForm;
