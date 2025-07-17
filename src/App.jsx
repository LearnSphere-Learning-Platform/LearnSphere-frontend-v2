import React from 'react';
import { BrowserRouter , Routes, Route, useLocation } from 'react-router-dom';
import Header from './components/Header';
import Hero from './landing/Hero';
import Features from './landing/Features';
import Courses from './landing/Courses';
import About from './landing/About';
import Contact from './landing/Contact';
import Footer from './components/Footer';
import LoginPage from './pages/LoginPage';
import Signup from './pages/Signup';
import InstructorRouteWrapper from "./catalog/InstructorRouteWrapper";
import { CourseCatalog } from "./catalog/CourseCatalog";
import CoursePageWrapper from "./catalog/CoursePageWrapper"; // ⬅️ new component
import DashBoard from './dashboard/DashBoard';
import ScrollToTop from './ScrollToTop';
import CoursePaymentWrapper from "./catalog/CoursePaymentWrapper";
import { getCourseById } from './hooks/useSelectedCourse';

function AppContent() {
  const location = useLocation();
  const hideFooter = location.pathname === '/login' || location.pathname === '/signup';
  const hideHeader = location.pathname === '/login' || location.pathname === '/signup';

  return (
    <div className="min-h-screen bg-white">
      {!hideHeader && <Header />}
      <Routes>
        <Route path="/" element={
          <>
            <Hero />
            <Features />
            <Courses />
            <About />
            <Contact />
          </>
        } />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/catalog" element={<CourseCatalog />} />
        <Route path="/course/:id" element={<CoursePageWrapper />} />
        <Route path="/course/:id/payment" element={<CoursePaymentWrapper />} />
        <Route path="/course/:id/dashboard" element={<DashBoard />} />
        <Route path="/instructor/:id" element={<InstructorRouteWrapper />} />
      </Routes>
      {!hideFooter && <Footer />}
      
    </div>
  );
}

// Wrapper to provide course prop to CoursePayment
// (moved to src/catalog/CoursePaymentWrapper.jsx)

function App() {
  return (
    <BrowserRouter>
      <ScrollToTop />
      <AppContent />
    </BrowserRouter>
  );
}

export default App;