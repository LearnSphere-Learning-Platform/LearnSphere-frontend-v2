import React, { useState } from "react";
import { toast } from "react-toastify";
import { MessageSquare, ThumbsUp } from "lucide-react";
import "react-toastify/dist/ReactToastify.css";

const UpvoteReply = ({ thread, setThreads, currentUser }) => {
  const [showReplyBox, setShowReplyBox] = useState(false);
  

  const handleUpvote = () => {
    setThreads((prev) =>
      prev.map((t) =>
        t.id === thread.id ? { ...t, upvotes: t.upvotes + 1 } : t
      )
    );
    toast.success("👍 Upvoted successfully!");
  };

  const addReply = (text, parentId = null) => {
    const newReply = {
      id: Date.now(),
      text,
      author: currentUser || "AnonymousUser",
      timestamp: new Date().toLocaleString(),
      parentId,
      replies: [],
    };

    const addNestedReply = (replies) =>
      replies.map((r) =>
        r.id === parentId
          ? { ...r, replies: [...(r.replies || []), newReply] }
          : { ...r, replies: addNestedReply(r.replies || []) }
      );

    setThreads((prev) =>
      prev.map((t) => {
        if (t.id === thread.id) {
          return {
            ...t,
            replies: parentId
              ? addNestedReply(t.replies || [])
              : [...(t.replies || []), newReply],
          };
        }
        return t;
      })
    );
    toast.success("💬 Reply posted!");
  };

  const ReplyInput = ({ parentId = null, onDone }) => {
    const [text, setText] = useState("");

    const handlePost = () => {
      if (!text.trim()) {
        toast.warn("✏️ Please enter your reply.");
        return;
      }
      addReply(text, parentId);
      setText("");
      if (onDone) onDone();
    };

    return (
      <div className="mt-2 flex gap-2 ml-6">
        <input
          type="text"
          placeholder="Write a reply..."
          value={text}
          onChange={(e) => setText(e.target.value)}
          className="flex-1 border p-1 rounded bg-[#F5F5F5]"
        />
        <button
          onClick={handlePost}
          className="bg-[#333A2F] text-white px-3 py-1 rounded"
        >
          Post
        </button>
      </div>
    );
  };

  const RenderReplies = ({ replies }) => {
    return replies.map((reply) => (
      <Reply key={reply.id} reply={reply} />
    ));
  };

  const Reply = ({ reply }) => {
    const [showNestedInput, setShowNestedInput] = useState(false);
    return (
      <div className="ml-4 mt-3 border-l-[2px] border-gray-300 pl-4">
        <div className="text-sm text-gray-700">
          <div className="flex items-center gap-2 mb-1">
            <span className="font-semibold">@{reply.author}</span>
            <span className="text-xs text-gray-500">{reply.timestamp}</span>
          </div>
          <div className="ml-1">{reply.text}</div>
          <button
            onClick={() => setShowNestedInput(!showNestedInput)}
            className="text-sm text-blue-600 hover:underline mt-1"
          >
            ↪ Reply
          </button>
          {showNestedInput && (
            <ReplyInput parentId={reply.id} onDone={() => setShowNestedInput(false)} />
          )}
          {reply.replies?.length > 0 && (
            <RenderReplies replies={reply.replies} />
          )}
        </div>
      </div>
    );
  };

  return (
    <div className="mt-4">
      <button
        onClick={handleUpvote}
        className="text-green-600 font-semibold hover:underline mb-2 flex items-center gap-1"
      >
        <ThumbsUp className="w-4 h-4" /> Upvote ({thread.upvotes})
      </button>

      <button
        onClick={() => setShowReplyBox(!showReplyBox)}
        className="text-blue-600 ml-4 hover:text-blue-800"
        title="Reply"
      >
       <span className="flex items-center gap-1">
        <MessageSquare size={18} />
        Reply</span>

      </button>

      {showReplyBox && <ReplyInput onDone={() => setShowReplyBox(false)} />}

      {thread.replies?.length > 0 && (
        <div className="mt-3 ml-4 border-l-2 border-gray-300 pl-4">
          <h4 className="text-sm font-semibold mb-1 text-gray-600">Replies:</h4>
          <RenderReplies replies={thread.replies} />
        </div>
      )}
    </div>
  );
};

export default UpvoteReply;
