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

function AppContent() {
  const location = useLocation();

  const hideFooter =
    location.pathname === "/login" || location.pathname === "/signup";
  const hideHeader =
    location.pathname === "/login" ||
    location.pathname === "/signup" ||
    location.pathname === "/forgot-password";

  return (
    <div className="min-h-screen bg-white">
      {!hideHeader && <Header />}
      <Routes>
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
        <Route path="/course/:id/payment" element={<CoursePaymentWrapper />} />
        <Route path="/course/:id/dashboard" element={<DashBoard />} />
        <Route path="/instructor/:id" element={<InstructorRouteWrapper />} />
        <Route path="/course-adding" element={<CourseAddingForm />} />
        <Route path="/course-adding/:courseId" element={<CourseAddingForm />} />
        <Route path="/announcement" element={<InstructorAnnouncementForm />} />
        <Route path="/instructor-dashboard" element={<InstructorDashboard />} />
        <Route
          path="/instructor-dashboard/course/:id"
          element={<CourseView />}
        />
        <Route path="/payment-history" element={<CoursePaymentHistory />} />
        <Route path="/my-learning" element={<MyLearningPage />} />
        <Route path="/profile" element={<Profile />} />
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

export default App;
