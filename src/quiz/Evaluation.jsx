import React, { useState, useEffect } from "react";
import { useNavigate } from 'react-router-dom';
import { get as idbGet } from 'idb-keyval';

// Mock backend API call to fetch user name
const fetchUserNameFromBackend = async () => {
  // Simulate network delay
  await new Promise((resolve) => setTimeout(resolve, 400));
  // Return a static name for demonstration
  return "John Doe (from backend)";
};

const Evaluation = () => {
  const [submission, setSubmission] = useState(null);
  const [loading, setLoading] = useState(true);
  const [grade, setGrade] = useState("");
  const [fileObjects, setFileObjects] = useState([]); // For persistent file viewing
  const [viewingFile, setViewingFile] = useState(null); // Currently viewing file
  const [fileUrl, setFileUrl] = useState(""); // URL for viewing file
  const [backendName, setBackendName] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    // Get the complete submission data
    const completeSubmission = localStorage.getItem('completeSubmission');
    if (completeSubmission) {
      const parsed = JSON.parse(completeSubmission);
      setSubmission(parsed);
      // Try to retrieve files from IndexedDB
      if (parsed.files && parsed.files.length > 0) {
        Promise.all(parsed.files.map(meta => {
          const key = `${meta.name}|${meta.size}|${meta.type}`;
          return idbGet(key);
        })).then(files => setFileObjects(files));
      }
      // Simulate fetching the user name from backend
      fetchUserNameFromBackend().then(name => setBackendName(name));
    }
    setLoading(false);
  }, []);

  // Helper to view file if available
  const handleViewFile = (fileMeta, idx) => {
    const file = fileObjects[idx];
    if (file) {
      const url = URL.createObjectURL(file);
      setFileUrl(url);
      setViewingFile(fileMeta);
    } else {
      alert('File not available for viewing.');
    }
  };

  // Close the file viewer
  const closeFileViewer = () => {
    if (fileUrl) {
      URL.revokeObjectURL(fileUrl);
      setFileUrl("");
    }
    setViewingFile(null);
  };

  const handleBackToHome = () => {
    navigate('/assignment');
  };

  if (loading) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-[#EBEDDF] py-10">
        <div className="w-full max-w-2xl bg-white rounded-3xl shadow-2xl border border-[#e5e7eb] p-8">
          <div className="text-center text-[#384933]">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#384933] mx-auto mb-4"></div>
            <p>Loading submission data...</p>
          </div>
        </div>
      </div>
    );
  }

  if (!submission) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-[#EBEDDF] py-10">
        <div className="w-full max-w-2xl bg-white rounded-3xl shadow-2xl border border-[#e5e7eb] p-8">
          <h2 className="text-2xl font-bold text-[#384933] mb-4">Evaluation Page</h2>
          <div className="text-center text-[#384933]">
            <p className="mb-4">No submission data found for evaluation.</p>
            <button 
              onClick={handleBackToHome}
              className="px-6 py-3 rounded-lg bg-[#384933] text-white font-bold text-lg shadow hover:bg-[#2c3a25] transition-all"
            >
              Back to Home
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <>
      <div className="min-h-screen flex flex-col items-center py-10 px-2" style={{ background: '#EBEDDF' }}>
        <div className="w-full max-w-4xl bg-white rounded-3xl shadow-2xl border border-[#e5e7eb] p-0 overflow-hidden">
          {/* Header */}
          <div className="flex items-center justify-between px-8 py-6" style={{ background: '#384933' }}>
            <span className="text-2xl font-bold text-white tracking-tight">📊 Assignment Evaluation</span>
          </div>
          
          <div className="px-8 pt-8 pb-8">
            {/* Submission Info Header */}
            <div className="mb-8 p-6 bg-[#f8fafc] rounded-lg border border-[#e5e7eb]">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <h3 className="text-lg font-bold text-[#384933] mb-2">Student Information</h3>
                  <div className="space-y-2">
                    <div><span className="font-semibold">Name:</span> {backendName || submission.userName || <span className="italic text-gray-400">Loading...</span>}</div>
                    <div><span className="font-semibold">Submitted:</span> {new Date(submission.submittedAt).toLocaleString()}</div>
                  </div>
                </div>
                <div>
                  <h3 className="text-lg font-bold text-[#384933] mb-2">Assignment Details</h3>
                  <div className="space-y-2">
                    <div><span className="font-semibold">Title:</span> {submission.title}</div>
                    <div><span className="font-semibold">Files:</span> {submission.files?.length || 0} file(s)</div>
                  </div>
                </div>
              </div>
            </div>

            {/* Assignment Title */}
            <div className="mb-6">
              <h2 className="text-xl font-bold text-[#384933] mb-2">Assignment Title</h2>
              <div className="px-4 py-3 border border-[#d6d6c2] rounded-lg bg-[#f8fafc] text-[#384933] font-medium text-lg">
                {submission.title}
              </div>
            </div>

            {/* Submitted Files */}
            <div className="mb-6">
              <h2 className="text-xl font-bold text-[#384933] mb-2">Submitted Files</h2>
              <div className="border border-[#d6d6c2] rounded-lg bg-[#f8fafc] p-4">
                {submission.files && submission.files.length > 0 ? (
                  <div className="space-y-3">
                    {submission.files.map((file, idx) => (
                      <div key={idx} className="flex items-center justify-between p-4 bg-white rounded border border-[#e5e7eb] shadow-sm">
                        <div className="flex items-center gap-4">
                          <div className="text-3xl">
                            {file.type === 'application/pdf' ? '📄' : '📎'}
                          </div>
                          <div>
                            <div className="font-semibold text-[#384933] text-lg">{file.name}</div>
                            <div className="text-sm text-[#666]">
                              {file.type === 'application/pdf' ? 'PDF Document' : file.type || 'Document'} • {(file.size / 1024).toFixed(1)} KB
                            </div>
                          </div>
                        </div>
                        <div className="flex gap-2">
                          <button className="px-3 py-1 rounded bg-blue-500 text-white text-sm font-bold hover:bg-blue-600 transition-all" onClick={() => handleViewFile(file, idx)}>
                            View
                          </button>
                          <button className="px-3 py-1 rounded bg-green-500 text-white text-sm font-bold hover:bg-green-600 transition-all">
                            Download
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-center text-[#666] py-8">
                    <div className="text-4xl mb-2">📁</div>
                    <p>No files submitted</p>
                  </div>
                )}
              </div>
            </div>

            {/* Assignment Description */}
            <div className="mb-6">
              <h2 className="text-xl font-bold text-[#384933] mb-2">Assignment Description</h2>
              <div className="border border-[#d6d6c2] rounded-lg bg-[#f8fafc] p-6">
                <div 
                  className="text-[#384933] leading-relaxed prose prose-lg max-w-none"
                  dangerouslySetInnerHTML={{ __html: submission.description }}
                />
              </div>
            </div>

            {/* Grade Section */}
            <div className="mb-6">
              <h2 className="text-xl font-bold text-[#384933] mb-2">Grade</h2>
              <input
                type="text"
                value={grade}
                onChange={e => setGrade(e.target.value)}
                placeholder="Enter grade (e.g., A, B+, 95%)"
                className="w-40 px-4 py-3 border border-[#d6d6c2] rounded-lg text-base focus:outline-none focus:ring-2 focus:ring-[#384933] font-bold text-[#384933] bg-[#EBEDDF]"
                style={{ minWidth: '100px', maxWidth: '200px' }}
              />
            </div>

            {/* Comments Section */}
            <div className="mb-6">
              <h2 className="text-xl font-bold text-[#384933] mb-2">Evaluation Comments</h2>
              <textarea
                placeholder="Enter your evaluation comments here..."
                className="w-full px-4 py-3 border border-[#d6d6c2] rounded-lg text-base focus:outline-none focus:ring-2 focus:ring-[#384933]"
                style={{ background: '#EBEDDF', color: '#384933', minHeight: '120px' }}
              />
            </div>

            {/* Action Buttons */}
            <div className="flex gap-4 flex-wrap justify-center pt-6">
              <button className="px-8 py-3 rounded-lg bg-[#384933] text-white font-bold text-lg shadow hover:bg-[#2c3a25] transition-all">
                Save Evaluation
              </button>
              <button className="px-8 py-3 rounded-lg bg-green-600 text-white font-bold text-lg shadow hover:bg-green-700 transition-all">
                Approve Assignment
              </button>
              <button className="px-8 py-3 rounded-lg bg-red-600 text-white font-bold text-lg shadow hover:bg-red-700 transition-all">
                Request Revision
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* File Viewer Modal */}
      {viewingFile && fileUrl && (
        <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg shadow-2xl w-full max-w-6xl h-full max-h-[90vh] flex flex-col">
            {/* Modal Header */}
            <div className="flex items-center justify-between p-4 border-b border-gray-200">
              <h3 className="text-lg font-bold text-[#384933]">{viewingFile.name}</h3>
              <button
                onClick={closeFileViewer}
                className="text-gray-500 hover:text-gray-700 text-2xl font-bold"
              >
                ×
              </button>
            </div>
            
            {/* Modal Content */}
            <div className="flex-1 overflow-hidden">
              {viewingFile.type === 'application/pdf' ? (
                <iframe
                  src={fileUrl}
                  className="w-full h-full"
                  title={viewingFile.name}
                />
              ) : viewingFile.type.startsWith('image/') ? (
                <div className="w-full h-full flex items-center justify-center bg-gray-100">
                  <img
                    src={fileUrl}
                    alt={viewingFile.name}
                    className="max-w-full max-h-full object-contain"
                  />
                </div>
              ) : (
                <div className="w-full h-full flex items-center justify-center">
                  <div className="text-center">
                    <div className="text-4xl mb-4">📄</div>
                    <p className="text-[#384933]">Preview not available for this file type.</p>
                    <a
                      href={fileUrl}
                      download={viewingFile.name}
                      className="mt-4 inline-block px-4 py-2 bg-[#384933] text-white rounded hover:bg-[#2c3a25] transition-all"
                    >
                      Download File
                    </a>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Evaluation; 