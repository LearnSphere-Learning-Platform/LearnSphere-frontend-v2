// catalog/InstructorRouteWrapper.jsx
import React from "react";
import { useParams } from "react-router-dom";
import courseData from "./CourseData";
import InstructorDetails from "./InstructorDetails";

const InstructorRouteWrapper = () => {
  const { id } = useParams();
  const selected = courseData.find((course) => course.id === parseInt(id));

  if (!selected) {
    return (
      <div className="text-center text-red-600 p-6">
        No instructor found for this course.
      </div>
    );
  }

  return  <InstructorDetails courseData={selected} />;
};

export default InstructorRouteWrapper;
