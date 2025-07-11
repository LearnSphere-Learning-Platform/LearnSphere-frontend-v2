import React from 'react';
import { BrowserRouter , Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Hero from './components/Hero';
import Features from './components/Features';
import Courses from './components/Courses';
import About from './components/About';
import Contact from './components/Contact';
import Footer from './components/Footer';
import LoginPage from './pages/LoginPage';
import Signup from './pages/Signup';

function App() {
  return (
    <BrowserRouter>
      <div className="min-h-screen bg-white">
        <Header />
        <Routes>
          <Route path="/" element={
            <>
              <Hero />
              <Features />
              <Courses />
              <About />
              <Contact />
              <Footer />
            </>
          } />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/signup" element={<Signup />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;