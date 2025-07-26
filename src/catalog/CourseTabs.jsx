"use client";

import React, { useState } from "react";
import { CheckCircle, PlayCircle, Clock, Star } from "lucide-react";

const CourseTabs = ({ courseData }) => {
  const [activeTab, setActiveTab] = useState("about");
  const [showEnrollModal, setShowEnrollModal] = useState(false);

  const tabs = [
    { id: "about", label: "About" },
    { id: "outcomes", label: "Outcomes" },
    { id: "content", label: "Course Content" },
  ];

  const renderAboutContent = () => (
    <div className="space-y-6">
      <div>
        <h3 className="text-xl font-semibold text-[#333A2F] mb-3">
          Course Description
        </h3>
        <p className="text-gray-600 leading-relaxed">
          {courseData.about_course.complete_description}
        </p>
      </div>

      <div>
        <h3 className="text-xl font-semibold text-[#333A2F] mb-3">
          Skills You'll Learn
        </h3>
        <div className="flex flex-wrap gap-2">
          {courseData.about_course.skills.map((skill, index) => (
            <span
              key={index}
              className="bg-[#EBEDDF] text-[#333A2F] px-3 py-1 rounded-full text-sm font-medium border border-[#333A2F]/20"
            >
              {skill}
            </span>
          ))}
        </div>
      </div>
    </div>
  );

  const renderOutcomesContent = () => (
    <div>
      <h3 className="text-xl font-semibold text-[#333A2F] mb-4">
        What You'll Achieve
      </h3>
      <div className="space-y-3">
        {courseData.outcome.map((outcome, index) => (
          <div key={index} className="flex items-start space-x-3">
            <CheckCircle className="w-5 h-5 text-[#333A2F] mt-0.5 flex-shrink-0" />
            <p className="text-gray-600">{outcome}</p>
          </div>
        ))}
      </div>
    </div>
  );

  const renderCourseContent = () => (
    <div>
      <h3 className="text-xl font-semibold text-[#333A2F] mb-4">
        Course Curriculum
      </h3>
      <div className="space-y-4">
        {courseData.course_content.map((session, sessionIndex) => (
          <div
            key={sessionIndex}
            className="border border-gray-200 rounded-lg overflow-hidden cursor-pointer"
            onClick={() => setShowEnrollModal(true)}
          >
            <div className="bg-[#EBEDDF] p-4">
              <h4 className="font-semibold text-[#333A2F]">
                {session.session}
              </h4>
              <p className="text-sm text-gray-600 mt-1">
                {session.module_description}
              </p>
            </div>
            <div className="p-4">
              <div className="space-y-2">
                {(session.videos || session.content || []).map((video, videoIndex) => (
                  <div
                    key={video.id}
                    className="flex items-center justify-between py-2 border-b border-gray-100 last:border-b-0"
                  >
                    <div className="flex items-center space-x-3">
                      <PlayCircle className="w-4 h-4 text-[#333A2F]" />
                      <div>
                        <p className="text-sm font-medium text-[#333A2F]">
                          {video.title}
                        </p>
                        <div className="flex items-center space-x-2 text-xs text-gray-500">
                          <Clock className="w-3 h-3" />
                          <span>{video.duration}</span>
                          <span className="capitalize bg-[#EBEDDF] px-2 py-0.5 rounded text-[#333A2F]">
                            {video.type && video.type.replace("-", " ")}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>
      {/* Enroll Modal */}
      {showEnrollModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-40">
          <div className="bg-white rounded-lg shadow-lg p-8 max-w-sm w-full text-center">
            <h2 className="text-xl font-bold mb-4 text-[#333A2F]">
              Enroll to View Content
            </h2>
            <p className="mb-6 text-gray-600">
              You need to enroll in this course to view the full curriculum and
              content.
            </p>
            <button
              className="bg-[#333A2F] text-white px-6 py-2 rounded-lg font-semibold hover:bg-[#2a3028] transition-colors mr-5 cursor-pointer"
              onClick={() => {
                window.scrollTo({ top: 0, behavior: "smooth" });
                setShowEnrollModal(false);
                // Optionally trigger enroll flow here
              }}
            >
              Enroll Now
            </button>
            <button
              className="bg-[#fff] border border-[#333A2F] px-6 py-2 rounded-lg font-semibold mt-3 text-gray-500 hover:text-[#333A2F]  cursor-pointer"
              onClick={() => setShowEnrollModal(false)}
            >
              Cancel
            </button>
          </div>
        </div>
      )}
    </div>
  );

  const renderContent = () => {
    switch (activeTab) {
      case "about":
        return renderAboutContent();
      case "outcomes":
        return renderOutcomesContent();
      case "content":
        return renderCourseContent();
      default:
        return renderAboutContent();
    }
  };

  return (
    <div className="bg-white rounded-xl shadow-lg overflow-hidden border border-gray-100">
      <div className="border-b border-gray-200 px-4">
        <nav className="flex">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`px-6 py-4 text-sm font-medium border-b-2 transition-colors cursor-pointer ${
                activeTab === tab.id
                  ? "border-[#333A2F] text-[#333A2F] bg-[#EBEDDF]"
                  : "border-transparent text-gray-500 hover:text-[#333A2F] hover:border-gray-300"
              }`}
            >
              {tab.label}
            </button>
          ))}
        </nav>
      </div>

      {/* Tab Content */}
      <div className="p-6">{renderContent()}</div>
    </div>
  );
};

export default CourseTabs;
