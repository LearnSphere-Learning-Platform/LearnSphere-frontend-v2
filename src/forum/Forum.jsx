import React, { useState } from "react";
import ThreadList from "./ThreadList";
import { useNavigate } from "react-router-dom";
import UploadSection from "./UploadSection";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";

const Forum = () => {
  const [threads, setThreads] = useState([
    {
      id: 1,
      title: "React Basics",
      author: "Alice",
      tag: "React",
      content: "What's the difference between useState and useEffect?",
      replies: [],
      upvotes: 2,
      flagged: false,
      date: new Date().toLocaleString(),
      uploadData: {
        pdf: "https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf",
        link: "https://reactjs.org/docs/hooks-overview.html",
      },
    },
  ]);

  const [search, setSearch] = useState("");
  const [showPostForm, setShowPostForm] = useState(false);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [tag, setTag] = useState("");
  const [uploadData, setUploadData] = useState({});
  const navigate = useNavigate();
  const currentUser = "CurrentUser";
  const userPosts = threads.filter((t) => t.author === currentUser);

  const filteredThreads = threads.filter((t) =>
    [t.title, t.content, t.tag, t.author].some((field) =>
      field?.toLowerCase().includes(search.toLowerCase())
    )
  );

  const handlePostSubmit = () => {
    if (!title.trim() || !content.trim()) return;

    const newPost = {
      id: threads.length + 1,
      title,
      content,
      tag,
      author: currentUser,
      date: new Date().toLocaleString(),
      replies: [],
      upvotes: 0,
      flagged: false,
      uploadData,
    };

    setThreads([newPost, ...threads]);
    setTitle("");
    setContent("");
    setTag("");
    setUploadData({});
    setShowPostForm(false);
  };

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

        {/* View Activity Button */}
        {/* <button
          onClick={() => navigate("/activity", { state: { userPosts } })}
          className="bg-[#333A2F] text-[#EBEDDF] border border-[#333A2F] px-4 py-3 rounded-lg  shadow-md text-sm"
        >
          📊 View My Activity
        </button> */}

        <button
          onClick={() => setShowPostForm(true)}
          className="bg-[#EBEDDF] text-[#1] text-lg px-5 py-3 rounded-lg hover:opacity-90 shadow-md cursor-pointer"
        >
           Create Post
        </button>
      </div>

      {/* Modal */}
      {showPostForm && (
        <div className="fixed inset-0 backdrop-blur-sm bg-opacity-40 flex items-center justify-center z-100">
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
              >
                Cancel
              </button>
              <button
                onClick={handlePostSubmit}
                className="px-4 py-2 bg-[#333A2F] text-[#EBEDDF] rounded hover:opacity-90 cursor-pointer"
              >
                Post
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Thread List */}
      <ThreadList threads={filteredThreads} setThreads={setThreads} />
    </div>
  );
};

export default Forum;