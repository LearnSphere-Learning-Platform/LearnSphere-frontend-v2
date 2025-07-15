import React, { useState } from 'react';
import { FaBars, FaTimes } from 'react-icons/fa';
import { Link, useNavigate, useLocation } from 'react-router-dom';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const handleNavigation = (section) => {
    if (location.pathname !== '/') {
      // If not on home page, navigate to home first, then scroll to section
      navigate('/');
      setTimeout(() => {
        const element = document.getElementById(section);
        if (element) {
          element.scrollIntoView({ behavior: 'smooth' });
        }
      }, 100);
    } else {
      // If on home page, just scroll to section
      const element = document.getElementById(section);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  return (
    <header className="bg-white shadow-lg fixed top-0 left-0 w-full z-90">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center py-4">
          {/* Logo */}
          <div className="flex items-center">
            <Link to="/" className="flex items-center space-x-2 text-2xl font-bold text-[#333A2F] hover:text-[#2a3028] transition-colors">
              <img src="./src/assets/logo.png" alt="LearnSphere Logo" className="h-15 w-15" />
              <span>LearnSphere</span>
            </Link>
          </div>

          {/* Right side - Navigation */}
          <div className="flex items-center space-x-8">
            {/* Desktop Navigation */}
            <nav className="hidden md:flex space-x-8">
              <button 
                onClick={() => handleNavigation('home')}
                className="text-gray-700 hover:text-[#333A2F] font-medium transition-colors"
              >
                Home
              </button>
              <button 
                onClick={() => handleNavigation('about')}
                className="text-gray-700 hover:text-[#333A2F] font-medium transition-colors"
              >
                About Us
              </button>
              <button 
                onClick={() => handleNavigation('courses')}
                className="text-gray-700 hover:text-[#333A2F] font-medium transition-colors"
              >
                Courses
              </button>
              <button 
                onClick={() => handleNavigation('contact')}
                className="text-gray-700 hover:text-[#333A2F] font-medium transition-colors"
              >
                Contact Us
              </button>
              <Link to="/login" className="text-[#333A2F] font-medium hover:text-[#2a3028] transition-colors">
                Sign In
              </Link>
            </nav>

            {/* Mobile Menu Button */}
            <div className="md:hidden">
              <button
                onClick={toggleMenu}
                className="text-[#333A2F] hover:text-[#2a3028] transition-colors"
              >
                {isMenuOpen ? <FaTimes size={24} /> : <FaBars size={24} />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden py-4 border-t border-gray-200">
            <nav className="flex flex-col space-y-4">
              <button 
                onClick={() => handleNavigation('home')}
                className="text-gray-700 hover:text-[#333A2F] font-medium transition-colors text-left"
              >
                Home
              </button>
              <button 
                onClick={() => handleNavigation('about')}
                className="text-gray-700 hover:text-[#333A2F] font-medium transition-colors text-left"
              >
                About Us
              </button>
              <button 
                onClick={() => handleNavigation('courses')}
                className="text-gray-700 hover:text-[#333A2F] font-medium transition-colors text-left"
              >
                Courses
              </button>
              <button 
                onClick={() => handleNavigation('contact')}
                className="text-gray-700 hover:text-[#333A2F] font-medium transition-colors text-left"
              >
                Contact Us
              </button>
              <Link to="/login" className="text-[#333A2F] font-medium hover:text-[#2a3028] transition-colors">
                Sign In
              </Link>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;