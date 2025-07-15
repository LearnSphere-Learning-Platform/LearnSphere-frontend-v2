import React, { useState, useRef, useEffect } from "react";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Flag } from 'lucide-react';

const ReportFlag = ({ thread, setThreads }) => {
  const [showOptions, setShowOptions] = useState(false);
  const [customReason, setCustomReason] = useState("");
  const dropdownRef = useRef();

  // Flag the post
  const handleFlag = (type) => {
    const finalType = type === "Other" && customReason ? customReason : type;

    setThreads((prev) =>
      prev.map((t) =>
        t.id === thread.id ? { ...t, flagged: true, flagType: finalType } : t
      )
    );

    setShowOptions(false);
    setCustomReason("");

    toast.success(`🚩 Post flagged as '${finalType}'`, {
      position: "top-right",
      autoClose: 2500,
    });
  };

  // Click outside to close dropdown
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setShowOptions(false);
        setCustomReason("");
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div className="mt-4 relative" ref={dropdownRef}>
      <ToastContainer />

      <button
        onClick={() => setShowOptions(!showOptions)}
        className={`text-red-500 underline font-semibold transition-all duration-200 ${
          thread.flagged ? "opacity-60 cursor-not-allowed" : "hover:text-red-700"
        }`}
        disabled={thread.flagged}
        aria-haspopup="true"
        aria-expanded={showOptions}
      >
        <Flag className="w-4 h-4 inline mr-1" /> {thread.flagged ? `Flagged (${thread.flagType})` : "Report Post"}
      </button>

      {showOptions && (
        <div className="absolute bg-white shadow-xl border rounded-md mt-2 z-20 w-64 animate-fade-in">
          {["Spam", "Misinformation", "Off-topic", "Other"].map((type) => (
            <button
              key={type}
              onClick={() => type !== "Other" ? handleFlag(type) : null}
              className="block w-full px-4 py-2 text-left text-sm hover:bg-gray-100"
            >
              {type}
            </button>
          ))}

          {/* CKEditor for "Other" reason */}
          <div className="px-4 py-2 border-t mt-2">
            <label className="text-sm font-semibold mb-1 block">Other reason:</label>
            <CKEditor
              editor={ClassicEditor}
              data={customReason}
              onChange={(event, editor) => {
                const data = editor.getData();
                setCustomReason(data);
              }}
              disabled={thread.flagged}
            />
            <button
              className="mt-2 text-xs text-blue-600 hover:underline disabled:opacity-50"
              onClick={() => handleFlag("Other")}
              disabled={!customReason.trim()}
            >
              Submit Custom Reason
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ReportFlag; 