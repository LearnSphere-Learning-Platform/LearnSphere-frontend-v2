import React from "react";
import OverviewOfCourse from "./OverviewOfCourse.jsx";
import { useParams } from "react-router-dom";
import { getCourseById } from "../hooks/useSelectedCourse";
import useSelectedCourse from "../hooks/useSelectedCourse"; // ✅ new hook
import bgImage from "../assets/course_enrollement_background_image2.png";

const Enrollment = () => {
  const [selectedCourse] = useSelectedCourse();
  const { id } = useParams();
  const course = getCourseById(id);

  // Use selectedCourse if available, otherwise fall back to course from URL
  const courseToDisplay = course;

  if (!courseToDisplay) {
    return <div className="text-white text-center p-4">Loading...</div>;
  }

  return (
    <div
      className="relative w-full bg-cover bg-center mt-5 flex items-center justify-center mt-25"
      style={{
        backgroundImage: `linear-gradient(to bottom, rgba(0,0,0,0.3), rgba(0,0,0,0.6)), url(${bgImage})`,
      }}
    >
      <div className="relative z-10 text-white p-4 w-full mx-auto lg:-ml-15">
        <OverviewOfCourse course={courseToDisplay} />
      </div>
    </div>
  );
};

export default Enrollment;
