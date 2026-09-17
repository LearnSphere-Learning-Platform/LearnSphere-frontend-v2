import React from "react";
import UpvoteReply from "./ReplySystem";
import ReportFlag from "./ReportFlag";
import { FileText, Link as LinkIcon } from 'lucide-react';
import DOMPurify from "dompurify";

// thread fields now match the real DiscussionPost entity: description (not content),
// userName (not author), image/pdfUrl/referenceLink flat on the post (not uploadData.*),
// createdAt (not date).
const ThreadList = ({ threads, setThreads, courseId, userId }) => {
  return (
    <div>
      {threads.map((thread) => (
        <div
          key={thread.id}
          className="bg-white rounded-lg shadow-md border p-5 mb-6 transition-all hover:shadow-xl"
        >
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center gap-2">
              <div className="w-10 h-10 bg-blue-500 text-white flex items-center justify-center rounded-full font-bold">
                {thread.userName?.[0]?.toUpperCase() || "U"}
              </div>
              <div>
                <h3 className="text-xl font-bold">{thread.title}</h3>
                <p className="text-sm text-gray-500">
                  {thread.userName || "Unknown"} ·{" "}
                  {thread.createdAt ? new Date(thread.createdAt).toLocaleString() : "Just now"}
                </p>
              </div>
            </div>
            {thread.tag && (
              <span className="text-sm bg-gray-200 px-2 py-1 rounded-full">
                #{thread.tag}
              </span>
            )}
          </div>

          <div
            className="text-gray-800 mb-3"
            dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(thread.description) }}
          />

          {/* Uploaded Content */}
          {thread.image && (
            <img
              src={thread.image}
              alt="uploaded"
              className="rounded max-h-64 mb-2"
            />
          )}
          {thread.pdfUrl && (
            <a
              href={thread.pdfUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-600 underline mb-1 block flex items-center gap-1"
            >
              <FileText className="w-4 h-4" /> View PDF
            </a>
          )}
          {thread.referenceLink && (
            <a
              href={thread.referenceLink}
              target="_blank"
              rel="noopener noreferrer"
              className="text-purple-600 underline block flex items-center gap-1"
            >
              <LinkIcon className="w-4 h-4" /> Reference Link
            </a>
          )}

          <UpvoteReply thread={thread} setThreads={setThreads} userId={userId} />
          <ReportFlag thread={thread} setThreads={setThreads} courseId={courseId} userId={userId} />
        </div>
      ))}
    </div>
  );
};

export default ThreadList;
