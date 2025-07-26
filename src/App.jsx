import React from "react";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";

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

function AppContent() {
  const location = useLocation();

  const hideFooter =
    location.pathname === "/login" || location.pathname === "/signup" || location.pathname === "/forgot-password" || location.pathname === "/instructor-details";
  const hideHeader =
    location.pathname === "/login" ||
    location.pathname === "/signup" ||
    location.pathname === "/forgot-password" ||
    location.pathname === "/instructor-details";

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
          <Route path="/admin/dashboard" element={<div>Admin Dashboard</div>} />
          {/* Add more admin routes here */}
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
