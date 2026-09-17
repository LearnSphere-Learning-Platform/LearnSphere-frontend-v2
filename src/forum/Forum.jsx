import React, { useState, useEffect, useCallback } from "react";
import ThreadList from "./ThreadList";
import UploadSection from "./UploadSection";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

// Wired to the real discussion service (DiscussionPostController) instead of local mock
// state. courseId comes from the parent (the course dashboard); userId/username come from
// what authService.login() stores in localStorage after a real login.
const Forum = ({ courseId }) => {
  const [threads, setThreads] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const [search, setSearch] = useState("");
  const [showPostForm, setShowPostForm] = useState(false);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [tag, setTag] = useState("");
  const [uploadData, setUploadData] = useState({});
  const [submitting, setSubmitting] = useState(false);

  const userId = localStorage.getItem("userId");
  const currentUserName = localStorage.getItem("username") || "You";

  const loadDiscussions = useCallback(async () => {
    if (!courseId) return;
    setLoading(true);
    setError("");
    try {
      const token = localStorage.getItem("jwtToken");
      const res = await fetch(
        `${import.meta.env.VITE_DISCUSSION_API_URL}/api/discussions/getall?courseId=${encodeURIComponent(courseId)}`,
        {
          headers: token ? { Authorization: `Bearer ${token}` } : {},
        }
      );
      if (!res.ok) throw new Error(`Failed to load discussions (${res.status})`);
      const data = await res.json();
      setThreads(Array.isArray(data) ? data : []);
    } catch (err) {
      setError(err.message || "Failed to load discussions.");
    } finally {
      setLoading(false);
    }
  }, [courseId]);

  useEffect(() => {
    loadDiscussions();
  }, [loadDiscussions]);

  const filteredThreads = threads.filter((t) =>
    [t.title, t.description, t.tag, t.userName].some((field) =>
      field?.toLowerCase().includes(search.toLowerCase())
    )
  );

  const handlePostSubmit = async () => {
    if (!title.trim() || !content.trim()) return;
    if (!courseId || !userId) {
      toast.error("You need to be logged in and viewing a course to post.");
      return;
    }

    setSubmitting(true);
    try {
      const postPayload = {
        title,
        description: content,
        tag,
        userName: currentUserName,
        referenceLink: uploadData.link || null,
      };

      const formData = new FormData();
      formData.append("post", new Blob([JSON.stringify(postPayload)], { type: "application/json" }));
      if (uploadData.imageFile) formData.append("image", uploadData.imageFile);
      if (uploadData.pdfFile) formData.append("pdf", uploadData.pdfFile);

      const token = localStorage.getItem("jwtToken");
      const res = await fetch(
        `${import.meta.env.VITE_DISCUSSION_API_URL}/api/discussions/create/${userId}/${courseId}`,
        {
          method: "POST",
          headers: token ? { Authorization: `Bearer ${token}` } : {},
          body: formData,
        }
      );
      if (!res.ok) throw new Error(`Failed to create post (${res.status})`);
      const created = await res.json();

      setThreads((prev) => [created, ...prev]);
      setTitle("");
      setContent("");
      setTag("");
      setUploadData({});
      setShowPostForm(false);
      toast.success("Post created!");
    } catch (err) {
      toast.error(err.message || "Failed to create post.");
    } finally {
      setSubmitting(false);
    }
  };

  if (!courseId) {
    return (
      <div className="py-10 px-4 text-center text-gray-600">
        Select a course to view its discussion forum.
      </div>
    );
  }

  return (
    <div className="py-10 px-4 sm:px-6 lg:px-8 text-[#333A2F] min-h-screen">
      {/* Search + Create Post Header */}
      <div className="flex flex-col sm:flex-row justify-between items-center gap-6 mb-10">
        <input
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="🔍 Search title, content, tag, or author..."
          className="w-full sm:w-2/3 px-5 py-3 border border-[#333A2F] rounded-lg bg-white shadow-md focus:outline-none focus:ring-2 focus:ring-[#333A2F]"
        />

        <button
          onClick={() => setShowPostForm(true)}
          className="bg-[#EBEDDF] text-[#1] text-lg px-5 py-3 rounded-lg hover:opacity-90 shadow-md cursor-pointer"
        >
           Create Post
        </button>
      </div>

      {/* Modal */}
      {showPostForm && (
        <div className="fixed inset-0 backdrop-blur-sm bg-opacity-40 flex items-center justify-center z-[100]">
          <div className="bg-[#EBEDDF] border border-[#333A2F] p-6 rounded-lg w-full max-w-2xl shadow-xl">
            <h2 className="text-2xl font-bold mb-5">📝 Create New Post</h2>

            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Enter post title"
              className="w-full p-3 border border-[#333A2F] rounded mb-3 bg-white"
            />
            <CKEditor
              editor={ClassicEditor}
              data={content}
              onChange={(event, editor) => setContent(editor.getData())}
            />
            <input
              type="text"
              value={tag}
              onChange={(e) => setTag(e.target.value)}
              placeholder="Enter tag (optional)"
              className="w-full mt-3 p-3 border border-[#333A2F] rounded bg-white"
            />

            <UploadSection uploadData={uploadData} setUploadData={setUploadData} />

            <div className="flex justify-end gap-3 mt-5">
              <button
                onClick={() => setShowPostForm(false)}
                className="px-4 py-2 bg-gray-400 text-white rounded hover:bg-gray-500 cursor-pointer"
                disabled={submitting}
              >
                Cancel
              </button>
              <button
                onClick={handlePostSubmit}
                className="px-4 py-2 bg-[#333A2F] text-[#EBEDDF] rounded hover:opacity-90 cursor-pointer disabled:opacity-50"
                disabled={submitting}
              >
                {submitting ? "Posting..." : "Post"}
              </button>
            </div>
          </div>
        </div>
      )}

      {loading && <p className="text-center text-gray-600">Loading discussions...</p>}
      {!loading && error && <p className="text-center text-red-600">{error}</p>}
      {!loading && !error && filteredThreads.length === 0 && (
        <p className="text-center text-gray-600">No discussions yet. Be the first to post!</p>
      )}

      {/* Thread List */}
      {!loading && !error && (
        <ThreadList
          threads={filteredThreads}
          setThreads={setThreads}
          courseId={courseId}
          userId={userId}
        />
      )}
    </div>
  );
};

export default Forum;
