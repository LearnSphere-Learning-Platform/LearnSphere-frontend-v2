import React, { useState } from 'react';
import { Save, Code, Lightbulb, Play } from 'lucide-react';

const CodingExerciseForm = ({ exerciseData, onSave, onCancel }) => {
  const [exercise, setExercise] = useState({
    title: exerciseData?.title || '',
    instructions: exerciseData?.instructions || '',
    starterCode: exerciseData?.starterCode || '',
    expectedOutput: exerciseData?.expectedOutput || '',
    hint: exerciseData?.hint || '',
    language: exerciseData?.language || 'JavaScript',
    difficulty: exerciseData?.difficulty || 'Beginner',
    timeLimit: exerciseData?.timeLimit || 30,
    testCases: exerciseData?.testCases || [
      { input: '', expected: '', description: '' }
    ]
  });

  const languages = [
    { value: 'JavaScript', label: 'JavaScript' },
    { value: 'Python', label: 'Python' },
    { value: 'React', label: 'React/JSX' },
    { value: 'HTML', label: 'HTML' },
    { value: 'CSS', label: 'CSS' },
    { value: 'Java', label: 'Java' },
    { value: 'C++', label: 'C++' }
  ];

  const difficulties = [
    { value: 'Beginner', label: 'Beginner' },
    { value: 'Intermediate', label: 'Intermediate' },
    { value: 'Advanced', label: 'Advanced' }
  ];

  const handleInputChange = (field, value) => {
    setExercise(prev => ({ ...prev, [field]: value }));
  };

  const addTestCase = () => {
    setExercise(prev => ({
      ...prev,
      testCases: [...prev.testCases, { input: '', expected: '', description: '' }]
    }));
  };

  const removeTestCase = (index) => {
    if (exercise.testCases.length > 1) {
      setExercise(prev => ({
        ...prev,
        testCases: prev.testCases.filter((_, i) => i !== index)
      }));
    }
  };

  const updateTestCase = (index, field, value) => {
    setExercise(prev => ({
      ...prev,
      testCases: prev.testCases.map((tc, i) => 
        i === index ? { ...tc, [field]: value } : tc
      )
    }));
  };

  const handleSave = () => {
    onSave(exercise);
  };

  return (
    <div className="bg-white rounded-lg shadow-lg p-6 max-w-4xl mx-auto">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-gray-900">Coding Exercise Builder</h2>
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
            Save Exercise
          </button>
        </div>
      </div>

      <div className="space-y-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Exercise Title *
          </label>
          <input
            type="text"
            value={exercise.title}
            onChange={(e) => handleInputChange('title', e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            placeholder="Enter exercise title..."
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Programming Language *
            </label>
            <select
              value={exercise.language}
              onChange={(e) => handleInputChange('language', e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            >
              {languages.map(lang => (
                <option key={lang.value} value={lang.value}>
                  {lang.label}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Difficulty Level
            </label>
            <select
              value={exercise.difficulty}
              onChange={(e) => handleInputChange('difficulty', e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            >
              {difficulties.map(diff => (
                <option key={diff.value} value={diff.value}>
                  {diff.label}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Time Limit (minutes)
            </label>
            <input
              type="number"
              value={exercise.timeLimit}
              onChange={(e) => handleInputChange('timeLimit', parseInt(e.target.value))}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              min="5"
              max="180"
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Instructions *
          </label>
          <textarea
            value={exercise.instructions}
            onChange={(e) => handleInputChange('instructions', e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            rows={4}
            placeholder="Provide clear instructions for the coding exercise..."
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Starter Code
          </label>
          <textarea
            value={exercise.starterCode}
            onChange={(e) => handleInputChange('starterCode', e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 font-mono text-sm"
            rows={6}
            placeholder="Provide starter code for students to begin with..."
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Expected Output
          </label>
          <textarea
            value={exercise.expectedOutput}
            onChange={(e) => handleInputChange('expectedOutput', e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            rows={3}
            placeholder="Describe the expected output or result..."
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Hint (Optional)
          </label>
          <textarea
            value={exercise.hint}
            onChange={(e) => handleInputChange('hint', e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            rows={2}
            placeholder="Provide a helpful hint for students..."
          />
        </div>

        <div className="border border-gray-200 rounded-lg p-4">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-lg font-semibold text-gray-900">Test Cases</h3>
            <button
              onClick={addTestCase}
              className="px-3 py-1 bg-green-600 text-white rounded-lg hover:bg-green-700 text-sm"
            >
              Add Test Case
            </button>
          </div>

          <div className="space-y-4">
            {exercise.testCases.map((testCase, index) => (
              <div key={index} className="border border-gray-200 rounded-lg p-3">
                <div className="flex justify-between items-start mb-3">
                  <h4 className="text-sm font-medium text-gray-700">
                    Test Case {index + 1}
                  </h4>
                  {exercise.testCases.length > 1 && (
                    <button
                      onClick={() => removeTestCase(index)}
                      className="text-red-500 hover:text-red-700 text-sm"
                    >
                      Remove
                    </button>
                  )}
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-medium text-gray-600 mb-1">
                      Input
                    </label>
                    <input
                      type="text"
                      value={testCase.input}
                      onChange={(e) => updateTestCase(index, 'input', e.target.value)}
                      className="w-full px-2 py-1 border border-gray-300 rounded text-sm"
                      placeholder="Test input..."
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-medium text-gray-600 mb-1">
                      Expected Output
                    </label>
                    <input
                      type="text"
                      value={testCase.expected}
                      onChange={(e) => updateTestCase(index, 'expected', e.target.value)}
                      className="w-full px-2 py-1 border border-gray-300 rounded text-sm"
                      placeholder="Expected result..."
                    />
                  </div>
                </div>

                <div className="mt-2">
                  <label className="block text-xs font-medium text-gray-600 mb-1">
                    Description
                  </label>
                  <input
                    type="text"
                    value={testCase.description}
                    onChange={(e) => updateTestCase(index, 'description', e.target.value)}
                    className="w-full px-2 py-1 border border-gray-300 rounded text-sm"
                    placeholder="Describe what this test case checks..."
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CodingExerciseForm; 