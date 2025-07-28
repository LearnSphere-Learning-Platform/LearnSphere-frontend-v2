import React, { useState } from "react";
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';

const AssignmentForm = ({ onSubmitAssignment, assignmentTitle, assignmentDescription }) => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [file, setFile] = useState(null);
  const [dragActive, setDragActive] = useState(false);
  const [loading, setLoading] = useState(false);
  const [feedback, setFeedback] = useState(null); // { type: 'success' | 'error', message: string }
  // Character limits
  const TITLE_LIMIT = 100;
  const DESC_LIMIT = 1000;

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

  const handleSubmit = async (e) => {
    e.preventDefault();
    setFeedback(null);
    if (!title.trim()) {
      setFeedback({ type: 'error', message: 'Title is required.' });
      return;
    }
    if (!description || description.replace(/<(.|\n)*?>/g, '').trim().length === 0) {
      setFeedback({ type: 'error', message: 'Description is required.' });
      return;
    }
    setLoading(true);
    try {
      if (onSubmitAssignment) {
        await onSubmitAssignment(title, description, file);
        setFeedback({ type: 'success', message: 'Assignment submitted successfully!' });
        setTitle("");
        setDescription("");
        setFile(null);
      }
    } catch {
      setFeedback({ type: 'error', message: 'Failed to submit assignment.' });
    } finally {
      setLoading(false);
    }
  };

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      setFile(e.dataTransfer.files[0]);
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

  const handleRemoveFile = () => {
    setFile(null);
  };

  return (
    <div className="min-h-screen flex flex-col items-center py-10 px-2" style={{ background: '#EBEDDF' }}>
      <div className="w-full max-w-2xl bg-white rounded-3xl shadow-2xl border border-[#e5e7eb] p-0 overflow-hidden">
        {/* Header */}
        <div className="flex items-center gap-4 px-8 py-6" style={{ background: '#333A2F' }}>
          <span className="text-2xl font-bold text-white tracking-tight">📄 {assignmentTitle || 'Assignment'}</span>
        </div>
        <form onSubmit={handleSubmit} className="px-8 pt-8 pb-8 flex flex-col gap-0" aria-label="Assignment Form">
          {/* Feedback Message */}
          {feedback && (
            <div
              className={`mb-4 px-4 py-2 rounded-lg font-semibold text-center ${feedback.type === 'success' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}
              role="alert"
              aria-live="polite"
            >
              {feedback.message}
            </div>
          )}
          {assignmentDescription && (
            <div className="mb-6 p-4 bg-blue-50 border border-blue-200 rounded-lg">
              <h3 className="font-bold mb-2" style={{ color: '#333A2F' }}>Assignment Instructions:</h3>
              <p className="text-sm text-gray-700">{assignmentDescription}</p>
            </div>
          )}
          <div className="mb-8">
            <label htmlFor="assignment-title" className="font-bold block mb-2" style={{ color: '#333A2F' }}>
              Your Assignment Title <span style={{ color: 'red' }}>*</span>
            </label>
            <input
              id="assignment-title"
              type="text"
              value={title}
              onChange={e => {
                if (e.target.value.length <= TITLE_LIMIT) setTitle(e.target.value);
              }}
              placeholder="Enter your assignment title"
              required
              aria-required="true"
              aria-label="Assignment Title"
              className="block w-full px-3 py-2 border border-[#d6d6c2] rounded-lg text-base focus:outline-none focus:ring-2 focus:ring-[#333A2F] mb-2"
              style={{ background: '#EBEDDF', color: '#333A2F' }}
            />
            <div className="text-xs text-right" style={{ color: '#333A2F' }}>{title.length}/{TITLE_LIMIT} characters</div>
          </div>
          <div className="mb-8">
            <label htmlFor="assignment-desc" className="font-bold block mb-2" style={{ color: '#333A2F' }}>
              Your Assignment Description <span style={{ color: 'red' }}>*</span>
            </label>
            <ReactQuill
              id="assignment-desc"
              value={description}
              onChange={val => {
                // Remove HTML tags for char count
                const plain = val.replace(/<(.|\n)*?>/g, '');
                if (plain.length <= DESC_LIMIT) setDescription(val);
              }}
              placeholder="Describe your assignment solution and approach"
              className="bg-[#EBEDDF] text-[#333A2F] mb-2 rounded-lg"
              theme="snow"
              style={{ minHeight: '120px', background: '#EBEDDF', color: '#333A2F', borderRadius: '0.5rem' }}
              aria-required="true"
              aria-label="Assignment Description"
              modules={quillModules}
            />
            <div className="text-xs text-right" style={{ color: '#333A2F' }}>
              {description.replace(/<(.|\n)*?>/g, '').length}/{DESC_LIMIT} characters
            </div>
            {/* Description Preview */}
            {description && (
              <div className="mt-4 p-3 rounded-lg border border-[#d6d6c2] bg-[#f7f7f2]">
                <div className="font-bold mb-1" style={{ color: '#333A2F' }}>Preview:</div>
                <div dangerouslySetInnerHTML={{ __html: description }} style={{ color: '#333A2F' }} />
              </div>
            )}
          </div>
          {/* Drag and Drop File Upload */}
          <div className="mb-8">
            <label className="font-bold block mb-2" style={{ color: '#333A2F' }}>
              Upload File (optional)
            </label>
            <div
              onDrop={handleDrop}
              onDragOver={handleDragOver}
              onDragLeave={handleDragLeave}
              className={`flex flex-col items-center justify-center border-2 border-dashed rounded-lg p-6 transition-colors ${dragActive ? 'border-[#333A2F] bg-[#f3f4ed]' : 'border-[#d6d6c2] bg-[#EBEDDF]'}`}
              style={{ cursor: 'pointer', minHeight: '90px', height: '120px', background: '#EBEDDF' }}
              onClick={() => document.getElementById('file-upload-input').click()}
              tabIndex={0}
              aria-label="File Upload Dropzone"
              onKeyDown={e => { if (e.key === 'Enter' || e.key === ' ') document.getElementById('file-upload-input').click(); }}
            >
              <input
                id="file-upload-input"
                type="file"
                style={{ display: 'none' }}
                onChange={handleFileChange}
                aria-label="File Upload"
              />
              {file ? (
                <div className="flex flex-col items-center">
                  <span className="text-[#333A2F] font-semibold mb-2">{file.name}</span>
                  <span className="text-xs text-[#333A2F] mb-1">{file.type || 'Unknown type'} | {(file.size / 1024).toFixed(1)} KB</span>
                  <button type="button" onClick={handleRemoveFile} className="px-3 py-1 rounded bg-red-500 text-white text-xs font-bold">Remove</button>
                </div>
              ) : (
                <span className="text-[#333A2F]">Drag & drop a file here, or click to select</span>
              )}
            </div>
          </div>
          <hr className="border-t border-[#e5e7eb] mb-8" />
          <button
            type="submit"
            className="w-full px-4 py-3 rounded-lg font-bold text-lg shadow transition-all mt-2"
            style={{ background: '#333A2F', color: '#fff', opacity: loading ? 0.7 : 1, cursor: loading ? 'not-allowed' : 'pointer' }}
            disabled={loading}
            aria-busy={loading}
          >
            {loading ? 'Uploading...' : 'Upload'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default AssignmentForm;