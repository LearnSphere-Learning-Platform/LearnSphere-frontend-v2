"use client";

import { useState, useMemo } from "react";
import { CourseSidebar } from "./CourseSidebar";
import { CourseGrid } from "./CourseGrid";
import { SearchBar } from "./SearchBar";
import useAllCourses from "../hooks/useAllCourses";
import React from 'react';
import Breadcrumb from '../components/Breadcrumb';

export function CourseCatalog() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedLevel, setSelectedLevel] = useState([]);
  const [selectedInstructors, setSelectedInstructors] = useState([]);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const courses = useAllCourses();

  // Get unique instructor names for filter options
  const instructors = useMemo(() => {
    return Array.from(
      new Set(courses.map((course) => course.instructor?.name))
    ).filter(Boolean);
  }, []);

  // Filter courses based on search and filters
  const filteredCourses = useMemo(() => {
    return courses.filter((course) => {
      if (
        !course ||
        !course.course_name ||
        !course.instructor?.name ||
        !course.description
      ) {
        return false;
      }

      const matchesSearch =
        course.course_name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        course.instructor.name
          .toLowerCase()
          .includes(searchQuery.toLowerCase()) ||
        course.description.toLowerCase().includes(searchQuery.toLowerCase());

      const matchesLevel =
        selectedLevel.length === 0 ||
        selectedLevel.includes(course.level?.toLowerCase());

      const matchesInstructor =
        selectedInstructors.length === 0 ||
        selectedInstructors.includes(course.instructor.name);

      return matchesSearch && matchesLevel && matchesInstructor;
    });
  }, [courses, searchQuery, selectedLevel, selectedInstructors]);

  return (
    <div className="flex min-h-screen bg-[#f5f5f5] mt-23">
      
      {/* Mobile sidebar overlay */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <div
        className={`
          fixed lg:static inset-y-0 left-0 z-50 w-80 bg-white border-r border-gray-200 transform transition-transform duration-300 ease-in-out
          ${
            sidebarOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"
          }
        `}
      >
        <CourseSidebar
          selectedLevel={selectedLevel}
          setSelectedLevel={setSelectedLevel}
          selectedInstructors={selectedInstructors}
          setSelectedInstructors={setSelectedInstructors}
          instructors={instructors}
          onClose={() => setSidebarOpen(false)}
        />
      </div>

      {/* Main content */}
      <div className="flex-1 flex flex-col min-w-0 ">
        {/* Header */}
        <header className="bg-white border-b border-gray-200 sticky top-0 z-30">
          <div className="flex items-center gap-4 p-4 bg-[#f5f5f5]">
            {/* Mobile menu button */}
            <button
              onClick={() => setSidebarOpen(true)}
              className="lg:hidden p-2 rounded-md hover:bg-gray-100"
            >
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16M4 18h16"
                />
              </svg>
            </button>

            <div className="flex-1 bg-[#f5f5f5]">
              <SearchBar
                searchQuery={searchQuery}
                setSearchQuery={setSearchQuery}
              />
            </div>
          </div>
        </header>

        {/* Main content area */}
        <main className="flex-1 overflow-auto">
          <div className="p-6">
            <div className="mb-6">
              <h1 className="text-4xl font-bold text-[#333A2F] mb-4">
                Course Catalog
              </h1>
              <p className="text-xl text-gray-600 max-w-3xl">
                Discover our most popular courses designed by industry experts to help you achieve your learning goals.
              </p>
              <p className="text-gray-600 mt-2">
                Showing {filteredCourses.length} of {courses.length} courses
              </p>
            </div>
            <CourseGrid courses={filteredCourses} />
          </div>
        </main>
      </div>
    </div>
  );
}
