import React from "react";
import {
  ListVideo,
  Clock,
  FileBadge2,
  GraduationCap,
  FileText,
} from "lucide-react";

const CourseStats = ({ course }) => {
  console.log(course);

  return (
    <div className="flex flex-wrap gap-x-8 gap-y-3 text-sm md:text-base text-white mt-4 px-2">
      <div className="flex items-center gap-2 flex-1 min-w-[45%]">
        <Clock className="w-5 h-5 text-yellow-300" />
        <span className="font-medium">Total Hours:</span> {course.total_hours}
      </div>
      <div className="flex items-center gap-2 flex-1 min-w-[45%]">
        <FileBadge2 className="w-5 h-5 text-teal-300" />
        <span className="font-medium">No. of Tests:</span>{" "}
        {course.no_of_tests_available}
      </div>
      <div className="flex items-center gap-2 flex-1 min-w-[45%]">
        <GraduationCap className="w-7 h-7 text-green-300" />
        <span className="font-medium">Certificate:</span>{" "}
        {course.certification ? "Certification " : "No Certification"}
      </div>
      <div className="flex items-center gap-2 flex-1 min-w-[45%]">
        <FileText className="w-5 h-5 text-purple-300" />
        <span className="font-medium">PDF Available:</span>{" "}
        {course.pdf_available ? "Yes" : "No"}
      </div>
    </div>
  );
};

export default CourseStats;
