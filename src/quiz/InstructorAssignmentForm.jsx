import React, { useState } from 'react';
import { Save, FileText, Calendar, Award } from 'lucide-react';

const AssignmentForm = ({ assignmentData, onSave, onCancel }) => {
  const [assignment, setAssignment] = useState({
    title: assignmentData?.title || '',
    instructions: assignmentData?.instructions || '',
    requirements: assignmentData?.requirements || '',
    submissionGuidelines: assignmentData?.submissionGuidelines || '',
    dueDate: assignmentData?.dueDate || '',
    points: assignmentData?.points || 100,
    allowFileUpload: assignmentData?.allowFileUpload !== false,
    allowTextSubmission: assignmentData?.allowTextSubmission !== false,
    maxFileSize: assignmentData?.maxFileSize || '10MB',
    allowedFileTypes: assignmentData?.allowedFileTypes || ['.pdf', '.doc', '.docx', '.txt']
  });

  const handleInputChange = (field, value) => {
    setAssignment(prev => ({ ...prev, [field]: value }));
  };

  const handleFileTypeChange = (fileType, checked) => {
    if (checked) {
      setAssignment(prev => ({
        ...prev,
        allowedFileTypes: [...prev.allowedFileTypes, fileType]
      }));
    } else {
      setAssignment(prev => ({
        ...prev,
        allowedFileTypes: prev.allowedFileTypes.filter(type => type !== fileType)
      }));
    }
  };

  const handleSave = () => {
    onSave(assignment);
  };

  const fileTypes = [
    { value: '.pdf', label: 'PDF' },
    { value: '.doc', label: 'Word Document (.doc)' },
    { value: '.docx', label: 'Word Document (.docx)' },
    { value: '.txt', label: 'Text File' },
    { value: '.jpg', label: 'Image (.jpg)' },
    { value: '.png', label: 'Image (.png)' },
    { value: '.zip', label: 'ZIP Archive' }
  ];

  return (
    <div className="bg-white rounded-lg shadow-lg p-6 max-w-4xl mx-auto">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-gray-900">Assignment Builder</h2>
        <div className="flex gap-2">
          <button
            onClick={onCancel}
            className="px-4 py-2 text-gray-600 hover:text-gray-800 border border-gray-300 rounded-lg"
          >
            Cancel
          </button>
          <button
            onClick={handleSave}
            className="px-4 py-2 bg-[#333A2F] text-white rounded-lg hover:bg-[#2a3028] flex items-center gap-2"
          >
            <Save className="w-4 h-4" />
            Save Assignment
          </button>
        </div>
      </div>

      <div className="space-y-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Assignment Title *
          </label>
          <input
            type="text"
            value={assignment.title}
            onChange={(e) => handleInputChange('title', e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            placeholder="Enter assignment title..."
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Instructions *
          </label>
          <textarea
            value={assignment.instructions}
            onChange={(e) => handleInputChange('instructions', e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            rows={4}
            placeholder="Provide clear instructions for the assignment..."
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Requirements
          </label>
          <textarea
            value={assignment.requirements}
            onChange={(e) => handleInputChange('requirements', e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            rows={3}
            placeholder="List specific requirements or deliverables..."
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Due Date
            </label>
            <input
              type="date"
              value={assignment.dueDate}
              onChange={(e) => handleInputChange('dueDate', e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Points
            </label>
            <input
              type="number"
              value={assignment.points}
              onChange={(e) => handleInputChange('points', parseInt(e.target.value))}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              min="1"
              max="1000"
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Submission Guidelines
          </label>
          <textarea
            value={assignment.submissionGuidelines}
            onChange={(e) => handleInputChange('submissionGuidelines', e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            rows={3}
            placeholder="Provide guidelines for submission format, naming conventions, etc..."
          />
        </div>

        <div className="border border-gray-200 rounded-lg p-4">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Submission Options</h3>
          
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <input
                type="checkbox"
                checked={assignment.allowTextSubmission}
                onChange={(e) => handleInputChange('allowTextSubmission', e.target.checked)}
                className="w-4 h-4 text-blue-600 border-gray-300 focus:ring-blue-500"
              />
              <label className="text-sm font-medium text-gray-700">
                Allow text submission
              </label>
            </div>

            <div className="flex items-center gap-3">
              <input
                type="checkbox"
                checked={assignment.allowFileUpload}
                onChange={(e) => handleInputChange('allowFileUpload', e.target.checked)}
                className="w-4 h-4 text-blue-600 border-gray-300 focus:ring-blue-500"
              />
              <label className="text-sm font-medium text-gray-700">
                Allow file upload
              </label>
            </div>

            {assignment.allowFileUpload && (
              <div className="ml-7 space-y-3">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Maximum File Size
                  </label>
                  <select
                    value={assignment.maxFileSize}
                    onChange={(e) => handleInputChange('maxFileSize', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  >
                    <option value="5MB">5MB</option>
                    <option value="10MB">10MB</option>
                    <option value="25MB">25MB</option>
                    <option value="50MB">50MB</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Allowed File Types
                  </label>
                  <div className="grid grid-cols-2 gap-2">
                    {fileTypes.map(fileType => (
                      <div key={fileType.value} className="flex items-center gap-2">
                        <input
                          type="checkbox"
                          checked={assignment.allowedFileTypes.includes(fileType.value)}
                          onChange={(e) => handleFileTypeChange(fileType.value, e.target.checked)}
                          className="w-4 h-4 text-blue-600 border-gray-300 focus:ring-blue-500"
                        />
                        <label className="text-sm text-gray-700">
                          {fileType.label}
                        </label>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AssignmentForm; 