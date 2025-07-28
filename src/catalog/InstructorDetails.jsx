import React from "react";
import { FaYoutube, FaXTwitter, FaLink } from "react-icons/fa6";

const InstructorDetails = ({ courseData }) => {
  const instructor = courseData.instructor;
  console.log("📦 Full Instructor Object:", instructor);
  console.log("👥 Total Learners:", instructor.total_learners);
  console.log("📝 Total Reviews:", instructor.total_reviews);
  console.log("📘 About:", instructor.about);
  console.log("✨ Highlights:", instructor.highlights);

  if (!instructor) {
    return (
      <div className="text-center text-gray-600 p-6">
        Instructor data not available.
      </div>
    );
  }

  return (
    <div className="bg-white min-h-screen border-b border-gray-800 mt-25">
      {/* Header */}
      <div className="bg-50 bg-[#EBEDDF] py-10 px-4 sm:px-8 md:px-16 lg:px-24 flex justify-between items-start flex-col-reverse md:flex-row gap-8">
        <div>
          <p className="uppercase font-semibold text-sm text-gray-600">
            Instructor
          </p>
          <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 mt-2">
            {instructor.name || "Name not available"}
          </h1>
          <h2 className="text-lg text-gray-700 font-medium mt-1">
            {instructor.summary || "Role not specified"}
          </h2>
          <div className="mt-3">
            <span className=" text-xs font-semibold px-3 py-1 rounded-full bg-[#333A2F] text-white">
              LearnSphere Instructor
            </span>
          </div>
        </div>

        <div className="flex flex-col items-center gap-4">
          <img
            src={
              instructor.avatar || "https://placehold.co/100x100?text=Avatar"
            }
            alt="Instructor Avatar"
            className="rounded-full w-24 h-24 object-cover border-4 border-white shadow"
          />

          <div className="flex gap-4">
            <button className="p-2 rounded border border-blue-600 text-blue-600 hover:bg-blue-100 transition cursor-pointer">
              <FaLink className="w-5 h-5" />
            </button>
            <button className="p-2 rounded border border-blue-600 text-blue-600 hover:bg-blue-100 transition cursor-pointer">
              <FaXTwitter className="w-5 h-5" />
            </button>
            <button className="p-2 rounded border border-blue-600 text-blue-600 hover:bg-blue-100 transition cursor-pointer">
              <FaYoutube className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>

      {/* Stats */}
      <div className="px-4 sm:px-8 md:px-16 lg:px-24 mt-8 grid grid-cols-2 sm:grid-cols-4 gap-6 text-center">
        <div>
          <p className="text-2xl font-bold text-gray-800">
            {instructor.total_learners?.toString()}
          </p>
          <p className="text-sm text-gray-500">Total learners</p>
        </div>
        <div>
          <p className="text-2xl font-bold text-gray-800">
            {instructor.total_reviews?.toString()}
          </p>
          <p className="text-sm text-gray-500">Reviews</p>
        </div>
        <div>
          <p className="text-2xl font-bold text-gray-800">
            {instructor.no_of_courses_released || 0}
          </p>
          <p className="text-sm text-gray-500">Courses Released</p>
        </div>
        <div>
          <p className="text-2xl font-bold text-gray-800">
            {instructor.overall_rating || "4.5"}
          </p>
          <p className="text-sm text-gray-500">Overall Rating</p>
        </div>
      </div>

      {/* About Section */}
      <div className="px-4 sm:px-8 md:px-16 lg:px-24 mt-10 mb-20">
        <h2 className="text-2xl font-bold text-gray-800 mb-4">About me</h2>
        <div className="text-gray-700 space-y-4 max-w-3xl">
          {instructor.about?.map((para, index) => (
            <p key={index}>{para}</p>
          ))}
          {instructor.highlights?.map((highlight, index) => (
            <p className="italic font-semibold" key={index}>
              {highlight}
            </p>
          ))}
        </div>
      </div>
    </div>
  );
};

export default InstructorDetails;
