import React, { useState, useEffect } from "react";
import Button from "./Button";
import PreviewVideo from "./PreviewVideo";
import CourseStats from "./CourseStats";
import { FaCreditCard } from "react-icons/fa";
import { HiCurrencyRupee } from "react-icons/hi";
import { useNavigate } from "react-router-dom";

const CourseMetadata = ({ course }) => (
  <header className="mt-4 space-y-1 text-white">
    <h2 className="font-bold text-3xl md:text-4xl lg:text-5xl leading-tight">
      {course.course_name}
    </h2>
    <p className="mt-4 font-semibold text-base md:text-lg">
      {course.description}
    </p>
    <p className="text-base md:text-lg">{`Instructor: ${course.instructor.name}`}</p>
    <p className="text-base md:text-lg flex items-center text-xl">
      Price:
      {course.price > 0 ? (
        <span className="flex items-center">
          <HiCurrencyRupee className="inline-block mx-1 text-xl" />
          {course.price}
        </span>
      ) : (
        <span className="ml-1">Free</span>
      )}
    </p>
    <p className="text-base md:text-base ">Last updated details</p>
  </header>
);

const ActionButtons = ({ price, course }) => {
  const [isEnrolled, setIsEnrolled] = useState(false);
  const navigate = useNavigate ? useNavigate() : () => {};

  useEffect(() => {
    // Initialize enrollment status
    const checkEnrollment = () => {
      try {
        const storedEnrollments = JSON.parse(
          localStorage.getItem("enrolledCourses") || "{}"
        );
        setIsEnrolled(!!storedEnrollments[course.id]);
      } catch (error) {
        console.error("Error reading enrollment status:", error);
      }
    };

    checkEnrollment();

    // Listen for enrollment changes
    const handleEnrollmentChange = (e) => {
      if (e.key === "enrolledCourses") {
        try {
          const newEnrollments = JSON.parse(e.newValue || "{}" );
          setIsEnrolled(!!newEnrollments[course.id]);
        } catch (error) {
          console.error("Error parsing enrollment data:", error);
        }
      }
    };

    window.addEventListener("storage", handleEnrollmentChange);
    return () => window.removeEventListener("storage", handleEnrollmentChange);
  }, [course.id]);

  const handleToggleEnroll = () => {
    try {
      const newStatus = !isEnrolled;
      const storedEnrollments = JSON.parse(
        localStorage.getItem("enrolledCourses") || "{}"
      );

      // Update enrollment status
      const updatedEnrollments = {
        ...storedEnrollments,
        [course.id]: newStatus,
      };

      // Save to localStorage and update state
      localStorage.setItem(
        "enrolledCourses",
        JSON.stringify(updatedEnrollments)
      );
      setIsEnrolled(newStatus);

      // Dispatch storage event to sync other tabs
      window.dispatchEvent(new Event("storage"));

      console.log(newStatus ? "User enrolled" : "User unenrolled");
    } catch (error) {
      console.error("Error toggling enrollment:", error);
    }
  };

  const handleStartLearning = () => {
    navigate(`/course/${course.id}/dashboard`);
  };

  return (
    <div className="flex flex-col sm:flex-row gap-3 sm:gap-5 mt-6">
      {price > 0 ? (
        <Button onClick={() => console.log("Buy Now clicked")}> 
          <FaCreditCard className="inline-block text-blue-400 mr-2" />
          Buy Now
        </Button>
      ) : isEnrolled ? (
        <Button onClick={handleStartLearning}>
          Start Learning
        </Button>
      ) : (
        <Button onClick={handleToggleEnroll}>
          Enroll for Free
        </Button>
      )}
    </div>
  );
};

const extractVideoId = (url) => {
  if (!url) return null;
  const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/;
  const match = url.match(regExp);
  return match && match[2].length === 11 ? match[2] : null;
};

const OverviewOfCourse = ({ course }) => {
  const [videoId, setVideoID] = useState(
    extractVideoId(course.preview) || "dQw4w9WgXcQ"
  );

  return (
    <div className="flex flex-col lg:flex-row mx-auto px-4 py-8 lg:-mt-20">
      <div className="w-full pt-4 lg:pt-[60px] lg:w-[62.5%] lg:ml-40 mb-8 lg:mb-0">
        <CourseMetadata course={course} />
        <ActionButtons price={course.price} course={course} />
      </div>

      <div className="w-full lg:w-[37.5%] flex flex-col justify-center lg:justify-start lg:mt-5">
        <PreviewVideo videoId={videoId} />
        <CourseStats course={course} />
      </div>
    </div>
  );
};

export default OverviewOfCourse;
