"use client";
import ContentForm from "./ContentForm";
import { Layers, Plus } from "lucide-react";

const ContentFormList = ({
  content,
  onChange,
  sessionIndex,
  validationErrors,
  setValidationErrors,
}) => {
  const handleAddContent = () => {
    const newContent = {
      title: "",
      type: "video", // Default to video
      duration: "",
      preview: false,
      url: "",
      description: "",
      file: null,
    };
    onChange([...content, { ...newContent }]); // ensure new array/object
  };

  const handleRemoveContent = (index) => {
    const updated = content.slice(0, index).concat(content.slice(index + 1)); // new array
    onChange([...updated]);

    // Clear validation errors for this content item
    if (setValidationErrors) {
      setValidationErrors((prev) => {
        const newErrors = { ...prev };
        Object.keys(newErrors).forEach((key) => {
          if (key.includes(`content_${sessionIndex}_${index}_`)) {
            delete newErrors[key];
          }
        });
        return newErrors;
      });
    }
  };

  const handleContentChange = (index, updatedContent) => {
    const updated = content.map((item, i) =>
      i === index ? { ...updatedContent } : item
    ); // new array/object
    onChange([...updated]);

    // Clear validation errors for this content item when data changes
    if (setValidationErrors) {
      setValidationErrors((prev) => {
        const newErrors = { ...prev };
        if (updatedContent.title && updatedContent.title.trim()) {
          delete newErrors[`content_${sessionIndex}_${index}_title`];
        }
        if (updatedContent.type) {
          delete newErrors[`content_${sessionIndex}_${index}_type`];
        }
        return newErrors;
      });
    }
  };

  const getContentTypeStats = () => {
    const stats = {};
    if (Array.isArray(content)) {
      content.forEach((item) => {
        if (item.type) {
          stats[item.type] = (stats[item.type] || 0) + 1;
        }
      });
    }
    return stats;
  };

  const stats = getContentTypeStats();

  return (
    <div className="space-y-4">
      <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-3 mb-4">
        <div className="flex items-center gap-3">
          <Layers
            className="w-4 h-4 sm:w-5 sm:h-5 flex-shrink-0"
            style={{ color: "#333A2F" }}
          />
          <h4
            className="text-base sm:text-lg font-semibold"
            style={{ color: "#333A2F" }}
          >
            Session Content
          </h4>
        </div>
        <div className="flex flex-wrap gap-2">
          <span
            className="px-2 sm:px-3 py-1 rounded-full text-xs sm:text-sm font-medium text-white w-fit"
            style={{ backgroundColor: "#333A2F" }}
          >
            {content.length} item{content.length !== 1 ? "s" : ""}
          </span>
          {Object.entries(stats).map(([type, count]) => (
            <span
              key={type}
              className="px-2 py-1 rounded-full text-xs font-medium bg-gray-200 text-gray-700 capitalize"
            >
              {type}: {count}
            </span>
          ))}
        </div>
      </div>

      {content.length === 0 && (
        <div className="text-center py-6 sm:py-8 border-2 border-dashed border-gray-300 rounded-lg">
          <Layers
            className="w-6 h-6 sm:w-8 sm:h-8 mx-auto mb-2"
            style={{ color: "#333A2F", opacity: 0.5 }}
          />
          <p
            className="text-sm sm:text-base px-4"
            style={{ color: "#333A2F", opacity: 0.7 }}
          >
            No content added yet
          </p>
          <p
            className="text-xs sm:text-sm px-4 mt-1"
            style={{ color: "#333A2F", opacity: 0.5 }}
          >
            Add videos, PDFs, quizzes, and other learning materials
          </p>
        </div>
      )}

      <div className="space-y-3 sm:space-y-4">
        {Array.isArray(content) &&
          content.map((item, index) => (
            <ContentForm
              key={item.id || index}
              index={index}
              content={item}
              onChange={(updatedItem) =>
                handleContentChange(index, updatedItem)
              }
              onRemove={() => handleRemoveContent(index)}
              sessionIndex={sessionIndex}
              validationErrors={validationErrors}
              setValidationErrors={setValidationErrors}
            />
          ))}
      </div>

      <div className="flex justify-center pt-2 sm:pt-4">
        <button
          type="button"
          onClick={handleAddContent}
          className="inline-flex items-center gap-2 px-3 sm:px-4 py-2 sm:py-2.5 text-sm sm:text-base text-white font-medium rounded-lg shadow-md hover:opacity-90 transform hover:scale-105 transition-all duration-200 min-h-[44px] touch-manipulation"
          style={{ backgroundColor: "#333A2F" }}
        >
          <Plus className="w-4 h-4" />
          Add Content
        </button>
      </div>
    </div>
  );
};

export default ContentFormList;
