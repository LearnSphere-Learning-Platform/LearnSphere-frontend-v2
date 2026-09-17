import React, { useState } from "react";
import { toast } from "react-toastify";
import { MessageSquare, ThumbsUp } from "lucide-react";
import "react-toastify/dist/ReactToastify.css";
import { discussionApi } from "../services/api";

// Wired to the real discussion service: replies are Comments {replyId, userId, content,
// repliedAt, nestedReplies}, and upvotes go through PUT /{discussionId}/upvote?userId=.
const UpvoteReply = ({ thread, setThreads, userId }) => {
  const [showReplyBox, setShowReplyBox] = useState(false);
  const alreadyUpvoted = thread.upvotedUserIds?.includes(userId);

  const replaceThread = (updated) => {
    setThreads((prev) => prev.map((t) => (t.id === updated.id ? updated : t)));
  };

  const handleUpvote = async () => {
    if (!userId) {
      toast.warn("Please log in to upvote.");
      return;
    }
    try {
      const updated = await discussionApi.put(
        `/api/discussions/${thread.id}/upvote?userId=${encodeURIComponent(userId)}`
      );
      replaceThread(updated);
      toast.success("👍 Upvoted successfully!");
    } catch (err) {
      if (String(err.message).includes("409") || String(err.message).toLowerCase().includes("already")) {
        toast.warn("You've already upvoted this post.");
      } else {
        toast.error("Failed to upvote.");
      }
    }
  };

  const addReply = async (text, parentId = null) => {
    if (!userId) {
      toast.warn("Please log in to reply.");
      return;
    }
    try {
      const updated = parentId
        ? await discussionApi.put(`/api/discussions/addnestedreply/${thread.id}/${parentId}`, {
            userId,
            content: text,
          })
        : await discussionApi.put(`/api/discussions/addComment/${thread.id}`, {
            userId,
            content: text,
          });
      replaceThread(updated);
      toast.success("💬 Reply posted!");
    } catch (err) {
      toast.error("Failed to post reply.");
    }
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
      <Reply key={reply.replyId} reply={reply} />
    ));
  };

  const Reply = ({ reply }) => {
    const [showNestedInput, setShowNestedInput] = useState(false);
    return (
      <div className="ml-4 mt-3 border-l-[2px] border-gray-300 pl-4">
        <div className="text-sm text-gray-700">
          <div className="flex items-center gap-2 mb-1">
            <span className="font-semibold">@{reply.userId}</span>
            <span className="text-xs text-gray-500">
              {reply.repliedAt ? new Date(reply.repliedAt).toLocaleString() : ""}
            </span>
          </div>
          <div className="ml-1">{reply.content}</div>
          <button
            onClick={() => setShowNestedInput(!showNestedInput)}
            className="text-sm text-blue-600 hover:underline mt-1"
          >
            ↪ Reply
          </button>
          {showNestedInput && (
            <ReplyInput parentId={reply.replyId} onDone={() => setShowNestedInput(false)} />
          )}
          {reply.nestedReplies?.length > 0 && (
            <RenderReplies replies={reply.nestedReplies} />
          )}
        </div>
      </div>
    );
  };

  return (
    <div className="mt-4">
      <button
        onClick={handleUpvote}
        className={`font-semibold hover:underline mb-2 flex items-center gap-1 ${
          alreadyUpvoted ? "text-gray-400 cursor-default" : "text-green-600"
        }`}
      >
        <ThumbsUp className="w-4 h-4" /> Upvote ({thread.UpvoteCount || 0})
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
