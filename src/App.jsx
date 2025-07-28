import React from "react";
import { BrowserRouter, Routes, Route, useLocation, Navigate } from "react-router-dom";

import Header from "./components/Header";
import Footer from "./components/Footer";
import ScrollToTop from "./ScrollToTop";

import Hero from "./landing/Hero";
import Features from "./landing/Features";
import Courses from "./landing/Courses";
import About from "./landing/About";
import Contact from "./landing/Contact";

import LoginPage from "./pages/LoginPage";
import Signup from "./pages/Signup";
import ForgotPassword from "./pages/ForgotPassword";

import { CourseCatalog } from "./catalog/CourseCatalog";
import InstructorRouteWrapper from "./catalog/InstructorRouteWrapper";
import CoursePageWrapper from "./catalog/CoursePageWrapper";
import CoursePaymentWrapper from "./catalog/CoursePaymentWrapper";

import DashBoard from "./dashboard/DashBoard";
import InstructorDashboard from "./dashboard/InstructorDashboard";
import QuizPage from "./pages/QuizPage";
import AssignmentPage from "./pages/AssignmentPage";
import CodingExercisePage from "./pages/CodingExercisePage";

import CourseAddingForm from "./instructor/CourseAddingForm";
import InstructorAnnouncementForm from "./instructor/InstructorAnnouncementForm";
import CourseView from "./instructor/CourseView";

import CoursePaymentHistory from "./pages/CoursePaymentHistory";
import MyLearningPage from "./pages/MyLearningPage";
import Profile from "./pages/Profile";
import InstructorDetails from "./pages/InstructorDetails";
import InstructorProfile from "./pages/InstructorProfile";

import RoleRoute from "./RoleRoute";
import NotAuthorized from "./pages/NotAuthorized";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { TooltipProvider } from "./admin/components/ui/tooltip";
import { SidebarProvider } from "./admin/components/ui/sidebar";
import { CourseProvider } from "./admin/components/context/CourseContext";
import { Toaster as Sonner } from "./admin/components/ui/sonner";
import { Toaster } from "./admin/components/ui/toaster";

import AdminIndex from "./admin/pages/Index";
import AdminNotFound from "./admin/pages/NotFound";
import AdminNotifications from "./admin/pages/Notifications";
import AdminStudents from "./admin/pages/Students";
import AdminCourses from "./admin/pages/Courses";
import AdminCourseDashboard from "./admin/pages/CourseDashboard";
import AdminInstructors from "./admin/pages/Instructors";
import AdminAnalytics from "./admin/pages/Analytics";
import AdminReports from "./admin/pages/Reports";
import AdminPayments from "./admin/pages/Payments";
import AdminFlagged from "./admin/pages/Flagged";

const queryClient = new QueryClient();

function AppContent() {
  const location = useLocation();

  const hideFooter =
    location.pathname === "/login" || 
    location.pathname === "/signup" || 
    location.pathname === "/forgot-password" || 
    location.pathname === "/instructor-details" || 
    location.pathname.startsWith("/admin") ||
    location.pathname.includes("/quiz/") ||
    location.pathname.includes("/assignment/") ||
    location.pathname.includes("/coding/");
  const hideHeader =
    location.pathname === "/login" ||
    location.pathname === "/signup" ||
    location.pathname === "/forgot-password" ||
    location.pathname === "/instructor-details" ||
    location.pathname.startsWith("/admin") ||
    location.pathname.includes("/quiz/") ||
    location.pathname.includes("/assignment/") ||
    location.pathname.includes("/coding/"); 

  return (
    <div className="min-h-screen bg-white">
      {!hideHeader && <Header />}
      <Routes>
        {/* Public routes */}
        <Route
          path="/"
          element={
            <>
              <Hero />
              <Features />
              <Courses />
              <About />
              <Contact />
            </>
          }
        />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/catalog" element={<CourseCatalog />} />
        <Route path="/course/:id" element={<CoursePageWrapper />} />
        <Route path="/user/course/:id/payment" element={<CoursePaymentWrapper />} />
        <Route path="/instructor/:id" element={<InstructorRouteWrapper />} />
        <Route path="/instructor-details" element={<InstructorDetails />} />
        <Route path="/not-authorized" element={<NotAuthorized />} />
        {/* User (student) routes */}
        <Route element={<RoleRoute allowedRoles={['student']} />}>
          <Route path="/user/dashboard" element={<DashBoard />} />
          <Route path="/user/my-learning" element={<MyLearningPage />} />
          <Route path="/user/profile" element={<Profile />} />
          <Route path="/user/payment-history" element={<CoursePaymentHistory />} />
          <Route path="/user/course/:id/dashboard" element={<DashBoard />} />
          <Route path="/user/course/:id" element={<CoursePageWrapper />} />
          <Route path="/user/course/:courseId/quiz/:lessonId" element={<QuizPage />} />
          <Route path="/user/course/:courseId/assignment/:lessonId" element={<AssignmentPage />} />
          <Route path="/user/course/:courseId/coding/:lessonId" element={<CodingExercisePage />} />
        </Route>
        {/* Instructor routes (instructor and admin) */}
        <Route element={<RoleRoute allowedRoles={['instructor', 'admin']} />}>
          <Route path="/instructor/dashboard" element={<InstructorDashboard />} />
          <Route path="/instructor/course-adding" element={<CourseAddingForm />} />
          <Route path="/instructor/course-adding/:courseId" element={<CourseAddingForm />} />
          <Route path="/instructor/announcement" element={<InstructorAnnouncementForm />} />
          <Route path="/instructor/course/:id" element={<CourseView />} />
          <Route path="/instructor/profile" element={<InstructorProfileWrapper />} />
        </Route>
        {/* Admin routes */}
        <Route element={<RoleRoute allowedRoles={['admin']} />}>
          <Route
            path="/admin/*"
            element={
              <QueryClientProvider client={queryClient}>
                <TooltipProvider>
                  <SidebarProvider>
                    <CourseProvider>
                      <Routes>
                        <Route path="" element={<Navigate to="dashboard" replace />} />
                        <Route path="dashboard" element={<AdminIndex />} />
                        <Route path="notifications" element={<AdminNotifications />} />
                        <Route path="students" element={<AdminStudents />} />
                        <Route path="courses" element={<AdminCourses />} />
                        <Route path="course/:id" element={<AdminCourseDashboard />} />
                        <Route path="instructors" element={<AdminInstructors />} />
                        <Route path="analytics" element={<AdminAnalytics />} />
                        <Route path="reports" element={<AdminReports />} />
                        <Route path="payments" element={<AdminPayments />} />
                        <Route path="flagged" element={<AdminFlagged />} />
                        <Route path="*" element={<AdminNotFound />} />
                      </Routes>
                      <Toaster />
                      <Sonner />
                    </CourseProvider>
                  </SidebarProvider>
                </TooltipProvider>
              </QueryClientProvider>
            }
          />
        </Route>
      </Routes>
      {!hideFooter && <Footer />}
    </div>
  );
}

function App() {
  return (
    <BrowserRouter>
      <ScrollToTop />
      <AppContent />
    </BrowserRouter>
  );
}

function InstructorProfileWrapper() {
  // Get instructor data from localStorage
  const instructorDataString = localStorage.getItem('instructorData');
  const profile = instructorDataString ? JSON.parse(instructorDataString) : null;
  // You can add editing logic if needed, for now just show profile
  if (!profile) return <div>Loading...</div>;
  return <InstructorProfile profile={profile} isEditing={false} handleChange={() => {}} />;
}

export default App;
