import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from 'react-router-dom';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';

// Mock backend API call to fetch user name
const fetchUserNameFromBackend = async () => {
  // Simulate network delay
  await new Promise((resolve) => setTimeout(resolve, 400));
  // Return a static name for demonstration
  return "John Doe (from backend)";
};

const AssignmentReview = ({ onBack, assignmentData }) => {
  const [backendName, setBackendName] = useState("");
  const [assignment, setAssignment] = useState(null);
  const [description, setDescription] = useState("");
  const [loading, setLoading] = useState(false);
  const [feedback, setFeedback] = useState(null);
  const navigate = useNavigate();
  const location = useLocation();

  // Quill toolbar configuration
  const quillModules = {
    toolbar: [
      [{ 'header': [1, 2, false] }],
      ['bold', 'italic', 'underline', 'strike'],
      [{ 'list': 'ordered'}, { 'list': 'bullet' }],
      [{ 'indent': '-1'}, { 'indent': '+1' }],
      ['link', 'image'],
      ['clean']
    ]
  };

  useEffect(() => {
    // Use provided assignment data or fall back to localStorage
    if (assignmentData) {
      setAssignment(assignmentData);
      setDescription(assignmentData.description || "");
      fetchUserNameFromBackend().then(name => setBackendName(name));
    } else if (location.state?.assignment) {
      setAssignment(location.state.assignment);
      setDescription(location.state.assignment.description || "");
      fetchUserNameFromBackend().then(name => setBackendName(name));
    } else {
      const fromStorage = localStorage.getItem('submittedAssignment');
      if (fromStorage) {
        const parsedAssignment = JSON.parse(fromStorage);
        setAssignment(parsedAssignment);
        setDescription(parsedAssignment.description || "");
        fetchUserNameFromBackend().then(name => setBackendName(name));
      }
    }
  }, [location.state, assignmentData]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setFeedback(null);
    
    // No userName input, only backendName
    if (!backendName) {
      setFeedback({ type: 'error', message: 'User name not loaded from backend.' });
      return;
    }

    if (!assignment) {
      setFeedback({ type: 'error', message: 'No assignment data found.' });
      return;
    }

    if (!description || description.replace(/<(.|\n)*?>/g, '').trim().length === 0) {
      setFeedback({ type: 'error', message: 'Description is required.' });
      return;
    }

    setLoading(true);
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Store the complete submission with backendName and updated description
      const completeSubmission = {
        ...assignment,
        description: description,
        userName: backendName,
        submittedAt: new Date().toISOString()
      };
      
      localStorage.setItem('completeSubmission', JSON.stringify(completeSubmission));
      
      setFeedback({ type: 'success', message: 'Assignment submitted successfully!' });
      
      // Navigate to confirmation page after a short delay
      setTimeout(() => {
        navigate('/submitted');
      }, 1500);
      
    } catch {
      setFeedback({ type: 'error', message: 'Failed to submit assignment. Please try again.' });
    } finally {
      setLoading(false);
    }
  };

  const handleBack = () => {
    if (onBack) {
      onBack();
    } else {
      navigate('/submit');
    }
  };

  if (!assignment) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-[#EBEDDF] py-10">
        <div className="w-full max-w-2xl bg-white rounded-3xl shadow-2xl border border-[#e5e7eb] p-8">
          <h2 className="text-2xl font-bold text-[#384933] mb-4">Assignment Review</h2>
          <div className="text-center text-[#384933]">
            <p>No assignment data found.</p>
            <button 
              onClick={() => navigate('/assignment')}
              className="mt-4 px-6 py-3 rounded-lg bg-[#384933] text-white font-bold text-lg shadow hover:bg-[#2c3a25] transition-all"
            >
              Create New Assignment
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col items-center py-10 px-2" style={{ background: '#EBEDDF' }}>
      <div className="w-full max-w-4xl bg-white rounded-3xl shadow-2xl border border-[#e5e7eb] p-0 overflow-hidden">
        {/* Header */}
        <div className="flex items-center gap-4 px-8 py-6" style={{ background: '#384933' }}>
          <span className="text-2xl font-bold text-white tracking-tight">📋 Assignment Review</span>
        </div>
        
        <form onSubmit={handleSubmit} className="px-8 pt-8 pb-8 flex flex-col gap-6">
          {/* Feedback Message */}
          {feedback && (
            <div
              className={`px-4 py-3 rounded-lg font-semibold text-center ${feedback.type === 'success' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}
              role="alert"
              aria-live="polite"
            >
              {feedback.message}
            </div>
          )}

          {/* User Name Section (Static from backend) */}
          <div className="mb-6">
            <label className="font-bold block mb-2 text-[#384933] text-lg">
              Your Name
            </label>
            <div className="px-4 py-3 border border-[#d6d6c2] rounded-lg bg-[#f8fafc] text-[#384933] font-medium">
              {backendName || <span className="italic text-gray-400">Loading...</span>}
            </div>
          </div>

          {/* Assignment Title Section */}
          <div className="mb-6">
            <label className="font-bold block mb-2 text-[#384933] text-lg">
              Assignment Title
            </label>
            <div className="px-4 py-3 border border-[#d6d6c2] rounded-lg bg-[#f8fafc] text-[#384933] font-medium">
              {assignment.title}
            </div>
          </div>

          {/* Submitted Files Section */}
          <div className="mb-6">
            <label className="font-bold block mb-2 text-[#384933] text-lg">
              Submitted Files
            </label>
            <div className="border border-[#d6d6c2] rounded-lg bg-[#f8fafc] p-4">
              {assignment.files && assignment.files.length > 0 ? (
                <div className="space-y-2">
                  {assignment.files.map((file, idx) => (
                    <div key={idx} className="flex items-center justify-between p-3 bg-white rounded border border-[#e5e7eb]">
                      <div className="flex items-center gap-3">
                        <span className="text-2xl">📄</span>
                        <div>
                          <div className="font-semibold text-[#384933]">{file.name}</div>
                          <div className="text-sm text-[#666]">
                            {file.type || 'Unknown type'} • {(file.size / 1024).toFixed(1)} KB
                          </div>
                        </div>
                      </div>
                      <div className="text-sm text-[#666]">
                        {file.type === 'application/pdf' ? 'PDF Document' : 'Document'}
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center text-[#666] py-4">
                  No files submitted
                </div>
              )}
            </div>
          </div>

          {/* Description Section - Now Editable */}
          <div className="mb-6">
            <label className="font-bold block mb-2 text-[#384933] text-lg">
              Description <span style={{ color: 'red' }}>*</span>
            </label>
            <ReactQuill
              value={description}
              onChange={setDescription}
              placeholder="Edit the assignment description here..."
              className="bg-[#EBEDDF] text-[#384933] mb-2 rounded-lg"
              theme="snow"
              style={{ minHeight: '120px', background: '#EBEDDF', color: '#384933', borderRadius: '0.5rem' }}
              modules={quillModules}
            />
            {/* Description Preview */}
            {description && (
              <div className="mt-4 p-3 rounded-lg border border-[#d6d6c2] bg-[#f7f7f2]">
                <div className="font-bold mb-1" style={{ color: '#384933' }}>Preview:</div>
                <div dangerouslySetInnerHTML={{ __html: description }} style={{ color: '#384933' }} />
              </div>
            )}
          </div>

          {/* Action Buttons */}
          <div className="flex gap-4 flex-wrap justify-center pt-4">
            <button
              type="button"
              onClick={handleBack}
              className="px-8 py-3 rounded-lg bg-gray-500 text-white font-bold text-lg shadow hover:bg-gray-600 transition-all"
            >
              Back to Edit
            </button>
            <button
              type="submit"
              className="px-8 py-3 rounded-lg bg-[#384933] text-white font-bold text-lg shadow hover:bg-[#2c3a25] transition-all"
              disabled={loading}
              style={{ opacity: loading ? 0.7 : 1, cursor: loading ? 'not-allowed' : 'pointer' }}
            >
              {loading ? 'Submitting...' : 'Submit Assignment'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AssignmentReview;