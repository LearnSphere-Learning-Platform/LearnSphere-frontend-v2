"use client";

const levels = [
  { id: "beginner", label: "Beginner" },
  { id: "intermediate", label: "Intermediate" },
  { id: "advanced", label: "Advanced" },
];

export function CourseSidebar({
  selectedLevel,
  setSelectedLevel,
  selectedInstructors,
  setSelectedInstructors,
  instructors,
  onClose,
}) {
  const handleLevelChange = (levelId, checked) => {
    if (checked) {
      setSelectedLevel([...selectedLevel, levelId]);
    } else {
      setSelectedLevel(selectedLevel.filter((id) => id !== levelId));
    }
  };

  const handleInstructorChange = (instructor, checked) => {
    if (checked) {
      setSelectedInstructors([...selectedInstructors, instructor]);
    } else {
      setSelectedInstructors(
        selectedInstructors.filter((name) => name !== instructor)
      );
    }
  };

  const clearAllFilters = () => {
    setSelectedLevel([]);
    setSelectedInstructors([]);
  };

  const hasActiveFilters =
    selectedLevel.length > 0 || selectedInstructors.length > 0;

  return (
    <div className="h-full flex flex-col bg-[#EBEDDF]">
      {/* Header */}
      <div className="flex items-center justify-between p-6 border-b  border-gray-400 bg-[#EBEDDF]">
        <div className="flex items-center gap-2">
          <svg
            className="w-5 h-5 text-[#333A2F]"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z"
            />
          </svg>
          <span className="font-semibold text-[#333A2F] text-lg">Filters</span>
        </div>

        <div className="flex items-center gap-2">
          {hasActiveFilters && (
            <button
              onClick={clearAllFilters}
              className="text-sm text-[#333A2F] hover:text-[#2a3028] font-medium"
            >
              Clear All
            </button>
          )}

          {/* Close button for mobile */}
          <button
            onClick={onClose}
            className="lg:hidden p-1 rounded-md hover:bg-gray-100"
          >
            <svg
              className="w-5 h-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-auto p-4 space-y-6">
        {/* Level Filter */}
        <div>
          <h3 className="font-medium text-[#333A2F] mb-3 text-lg">Level</h3>
          <div className="space-y-3">
            {levels.map((level) => (
              <label
                key={level.id}
                className="flex items-center cursor-pointer"
              >
                <div 
                  className="custom-checkbox w-5 h-5 border rounded flex items-center justify-center cursor-pointer transition-all duration-200"
                  style={{ 
                    backgroundColor: selectedLevel.includes(level.id) ? '#333A2F' : 'white',
                    borderColor: selectedLevel.includes(level.id) ? '#333A2F' : '#d1d5db',
                    borderWidth: '2px'
                  }}
                  onClick={() => {
                    const isChecked = selectedLevel.includes(level.id);
                    handleLevelChange(level.id, !isChecked);
                  }}
                >
                  {selectedLevel.includes(level.id) && (
                    <svg 
                      className="text-white text-xs font-bold w-3 h-3" 
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                  )}
                </div>
                <span className="ml-2 text-sm text-gray-700">
                  {level.label}
                </span>
              </label>
            ))}
          </div>
        </div>

        {/* Instructor Filter */}
        <div>
          <h3 className="font-medium text-[#333A2F] mb-3 text-lg">Instructor</h3>
          <div className="space-y-3">
            {instructors.map((instructor) => (
              <label
                key={instructor}
                className="flex items-center cursor-pointer"
              >
                <div 
                  className="custom-checkbox w-5 h-5 border rounded flex items-center justify-center cursor-pointer transition-all duration-200"
                  style={{ 
                    backgroundColor: selectedInstructors.includes(instructor) ? '#333A2F' : 'white',
                    borderColor: selectedInstructors.includes(instructor) ? '#333A2F' : '#d1d5db',
                    borderWidth: '2px'
                  }}
                  onClick={() => {
                    const isChecked = selectedInstructors.includes(instructor);
                    handleInstructorChange(instructor, !isChecked);
                  }}
                >
                  {selectedInstructors.includes(instructor) && (
                    <svg 
                      className="text-white text-xs font-bold w-3 h-3" 
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                  )}
                </div>
                <span className="ml-2 text-sm text-gray-700">{instructor}</span>
              </label>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
