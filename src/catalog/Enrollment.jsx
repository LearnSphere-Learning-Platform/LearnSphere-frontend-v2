import React from "react";
import OverviewOfCourse from "./OverviewOfCourse.jsx";
import { useParams } from "react-router-dom";
import useCourseById from "../hooks/useCourseById";
import bgImage from "../assets/course_enrollement_background_image2.png";

const Enrollment = () => {
  const { id } = useParams();
  const { course } = useCourseById(id);

  if (!course) {
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
        <OverviewOfCourse course={course} />
      </div>
    </div>
  );
};

export default Enrollment;
