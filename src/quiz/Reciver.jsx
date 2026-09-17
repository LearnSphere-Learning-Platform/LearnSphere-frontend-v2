import React, { useState } from "react";
import { useNavigate } from 'react-router-dom';
import { set as idbSet } from 'idb-keyval';
import DOMPurify from "dompurify";

const Reciver = ({ assignmentTitle = "Sample Assignment Title", assignmentDescription = "This is a sample assignment description. Please complete the assignment as described and upload your work below.", topic, onFileSubmit }) => {
  const [files, setFiles] = useState([]);
  const [dragActive, setDragActive] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [feedback, setFeedback] = useState(null); // { type: 'success' | 'error', message: string }
  const [submissionTime, setSubmissionTime] = useState(null);
  const navigate = useNavigate();

  const allowedTypes = [
    'application/pdf',
    'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
    'application/msword',
    'image/png',
    'image/jpeg',
    'image/jpg',
    'image/gif',
  ];

  const handleFileChange = (e) => {
    const selectedFiles = Array.from(e.target.files);
    const validFiles = [];
    for (const file of selectedFiles) {
      if (!allowedTypes.includes(file.type)) {
        setFeedback({ type: 'error', message: 'Only PDF, DOCX, and image files are allowed.' });
        continue;
      }
      validFiles.push(file);
    }
    if (validFiles.length > 0) {
      setFeedback(null);
      setFiles(prev => [...prev, ...validFiles]);
    }
  };

  const handleRemoveFile = (index) => {
    setFiles(prev => prev.filter((_, i) => i !== index));
  };

  const storeFilesInIndexedDB = async (files) => {
    // Store each file in IndexedDB with a unique key (name+size+type)
    await Promise.all(files.map(file => {
      const key = `${file.name}|${file.size}|${file.type}`;
      return idbSet(key, file);
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setFeedback(null);
    if (files.length === 0) {
      setFeedback({ type: 'error', message: 'Please select at least one file to upload.' });
      setSubmitted(false);
      console.log('Submission failed: No files selected');
      return;
    }
    // Pass full assignment data to parent handler
    const submission = {
      title: assignmentTitle,
      description: assignmentDescription,
      files: files.map(f => ({ name: f.name, type: f.type, size: f.size })) // Only metadata for localStorage
    };
    try {
      // Store files in IndexedDB for persistent viewing
      await storeFilesInIndexedDB(files);
    } catch {
      setFeedback({ type: 'error', message: 'Failed to store files for viewing.' });
      return;
    }
    if (onFileSubmit) {
      try {
        onFileSubmit(submission);
        setSubmitted(true);
        setSubmissionTime(new Date());
        setFeedback({ type: 'success', message: 'Files uploaded successfully! Redirecting to review page...' });
        console.log('Submission successful:', { submission, feedback: { type: 'success', message: 'Files uploaded successfully!' } });
        
        // Navigate to review page after a short delay
        setTimeout(() => {
          navigate('/review', { state: { assignment: submission } });
        }, 1500);
        
      } catch (err) {
        setFeedback({ type: 'error', message: 'Submission failed. Please try again.' });
        setSubmitted(false);
        console.error('Submission error:', err);
      }
    } else {
      setFeedback({ type: 'error', message: 'Submission handler not found.' });
      setSubmitted(false);
      console.error('Submission handler not found');
    }
  };

  const handleReset = () => {
    setFiles([]);
    setSubmitted(false);
    setFeedback(null);
    setSubmissionTime(null);
  };

  // Drag and drop handlers
  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    const droppedFiles = Array.from(e.dataTransfer.files);
    const validFiles = [];
    for (const file of droppedFiles) {
      if (!allowedTypes.includes(file.type)) {
        setFeedback({ type: 'error', message: 'Only PDF, DOCX, and image files are allowed.' });
        continue;
      }
      validFiles.push(file);
    }
    if (validFiles.length > 0) {
      setFeedback(null);
      setFiles(prev => [...prev, ...validFiles]);
    }
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(true);
  };

  const handleDragLeave = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-[#EBEDDF]">
      <div className="w-full max-w-2xl bg-white rounded-3xl shadow-2xl border border-[#e5e7eb] p-0 overflow-hidden">
        {/* Header */}
        <div className="flex items-center gap-4 px-8 py-6 bg-[#384933]">
          <span className="text-2xl font-bold text-white tracking-tight">📤 Assignment Submission</span>
        </div>
        <div className="px-8 pt-8 pb-2">
          <h2 className="text-2xl font-bold text-[#384933] mb-1">{assignmentTitle}</h2>
          {topic && (
            <div className="text-lg font-semibold text-[#384933] mb-1">{topic}</div>
          )}
          <div className="text-[#384933] text-base mb-2" dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(assignmentDescription) }} />
        </div>
        {submitted ? (
          <div className="w-full flex flex-col items-center justify-center py-16">
            <span className="text-green-700 text-2xl font-bold mb-4">Files uploaded successfully!</span>
            <div className="text-[#384933] text-base mb-4">Redirecting to review page...</div>
            {submissionTime && (
              <div className="text-[#384933] text-base mb-4">Uploaded at: {submissionTime.toLocaleString()}</div>
            )}
            <div className="w-full max-w-md bg-[#f8fafc] border border-[#e5e7eb] rounded-lg p-4 mb-6">
              <div className="font-bold mb-2 text-[#384933]">Uploaded Files:</div>
              {files.length > 0 ? (
                <ul className="list-disc pl-5">
                  {files.map((file, idx) => (
                    <li key={idx} className="mb-1 text-[#384933]">
                      {file.name} <span className="text-xs">({file.type || 'Unknown'}, {(file.size / 1024).toFixed(1)} KB)</span>
                    </li>
                  ))}
                </ul>
              ) : (
                <div className="text-[#384933]">No files uploaded.</div>
              )}
            </div>
            <div className="flex gap-4 flex-wrap">
              <button type="button" onClick={() => {
                setSubmitted(false);
                setFeedback(null);
                setSubmissionTime(null);
              }} className="px-6 py-3 rounded-lg bg-yellow-500 text-white font-bold text-lg shadow hover:bg-yellow-600 transition-all">
                Upload More Files
              </button>
              <button type="button" onClick={() => {
                // Store metadata in localStorage
                const meta = {
                  title: assignmentTitle,
                  description: assignmentDescription,
                  files: files.map(f => ({ name: f.name, type: f.type, size: f.size }))
                };
                localStorage.setItem('submittedAssignment', JSON.stringify(meta));
                navigate('/review', { state: { assignment: meta } });
              }} className="px-6 py-3 rounded-lg bg-green-600 text-white font-bold text-lg shadow hover:bg-green-700 transition-all">
                Continue to Review
              </button>
            </div>
          </div>
        ) : (
          <>
            <hr className="border-t border-[#e5e7eb] mx-8" />
            <form onSubmit={handleSubmit} className="px-8 pt-6 pb-8 flex flex-col gap-0">
              {feedback && feedback.type === 'error' && (
                <div className="mb-4 px-4 py-2 rounded-lg font-semibold text-center bg-red-100 text-red-800" role="alert" aria-live="polite">
                  {feedback.message}
                </div>
              )}
              <div className="mb-6">
                <label htmlFor="assignment-upload" className="font-bold block mb-2 text-[#384933] text-base">
                  Upload Your Assignment <span style={{ color: 'red' }}>*</span>
                </label>
                <div
                  onDrop={handleDrop}
                  onDragOver={handleDragOver}
                  onDragLeave={handleDragLeave}
                  className={`flex flex-col items-center justify-center border-2 border-dashed rounded-lg p-6 transition-colors ${dragActive ? 'border-[#384933] bg-[#f3f4ed]' : 'border-[#d6d6c2] bg-[#f8fafc]'}`}
                  style={{ cursor: 'pointer', minHeight: '90px', height: '120px' }}
                  onClick={() => document.getElementById('assignment-upload').click()}
                  tabIndex={0}
                  aria-label="File Upload Dropzone"
                  onKeyDown={e => { if (e.key === 'Enter' || e.key === ' ') document.getElementById('assignment-upload').click(); }}
                >
                  <input
                    id="assignment-upload"
                    type="file"
                    accept=".pdf,.docx,.doc,image/*"
                    onChange={handleFileChange}
                    multiple
                    required
                    style={{ display: 'none' }}
                  />
                  <span className="text-[#384933]">Drag & drop files here, or click to select</span>
                </div>
                {files.length > 0 && (
                  <div className="text-sm text-[#555] flex flex-col gap-1 mt-2">
                    {files.map((file, idx) => (
                      <div key={idx} className="flex items-center gap-2 border-b border-[#e5e7eb] pb-1 mb-1 last:border-b-0 last:mb-0">
                        <span>{file.name}</span>
                        <span className="text-xs">({file.type || 'Unknown'}, {(file.size / 1024).toFixed(1)} KB)</span>
                        <button type="button" onClick={() => handleRemoveFile(idx)} className="px-2 py-0.5 rounded bg-red-500 text-white text-xs font-bold">Remove</button>
                      </div>
                    ))}
                    <button type="button" onClick={handleReset} className="mt-2 px-3 py-1 rounded bg-red-500 text-white text-xs font-bold w-max">Clear All</button>
                  </div>
                )}
              </div>
              <button type="submit" className="w-full px-4 py-3 rounded-lg bg-[#384933] text-white font-bold text-lg shadow hover:bg-[#2c3a25] transition-all mt-2">
                Upload Files & Continue
              </button>
            </form>
          </>
        )}
      </div>
    </div>
  );
};

export default Reciver;
