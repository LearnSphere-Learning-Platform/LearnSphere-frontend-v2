// src/forum/MyActivity.jsx
import React from "react";
import { useLocation, useNavigate } from "react-router-dom";

const MyActivity = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const userPosts = location.state?.userPosts || [];

  return (
    <div className="p-6 bg-[#EBEDDF] min-h-screen text-[#333A2F]">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold">📊 Your Activity</h2>
        <button
          onClick={() => navigate("/")}
          className="px-4 py-2 bg-[#333A2F] text-[#EBEDDF] rounded hover:opacity-90"
        >
          🔙 Back to Forum
        </button>
      </div>

      {userPosts.length === 0 ? (
        <p className="text-center text-gray-600">No posts yet.</p>
      ) : (
        userPosts.map((post) => (
          <div
            key={post.id}
            className="bg-white border border-gray-300 rounded-lg p-5 mb-5 shadow"
          >
            <h3 className="text-xl font-semibold mb-1">{post.title}</h3>
            <p className="text-sm text-gray-500 mb-2">
              Posted on {post.date} | Tag: {post.tag || "N/A"}
            </p>
            <div
              className="prose prose-sm"
              dangerouslySetInnerHTML={{ __html: post.content }}
            />
            {/* Image Preview */}
            {post.uploadData?.image && (
              <img
                src={post.uploadData.image}
                alt="Uploaded"
                className="mt-4 h-36 object-cover rounded"
              />
            )}
            {/* PDF Preview */}
            {post.uploadData?.pdf && (
              <a
                href={post.uploadData.pdf}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-600 underline mt-2 block"
              >
                📄 View Uploaded PDF
              </a>
            )}
            {/* Link */}
            {post.uploadData?.link && (
              <a
                href={post.uploadData.link}
                target="_blank"
                rel="noopener noreferrer"
                className="text-purple-600 underline mt-1 block break-all"
              >
                🔗 {post.uploadData.link}
              </a>
            )}
          </div>
        ))
      )}
    </div>
  );
};

export default MyActivity;