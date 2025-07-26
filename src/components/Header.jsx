import React, { useState } from "react";
import {
  FaBars,
  FaTimes,
  FaUserCircle,
  FaUser,
  FaBook,
  FaHistory,
  FaSignOutAlt,
} from "react-icons/fa";
import { Link, useNavigate, useLocation } from "react-router-dom";
import Breadcrumb from "./Breadcrumb";
import MyLearningPage from "../pages/MyLearningPage";
import Profile from "../pages/Profile";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [showProfileMenu, setShowProfileMenu] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const username = localStorage.getItem("username");
  const isInstructor = localStorage.getItem("isInstructor") === "true";

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const handleNavigation = (section) => {
    if (location.pathname !== "/") {
      // If not on home page, navigate to home first, then scroll to section
      navigate("/");
      setTimeout(() => {
        const element = document.getElementById(section);
        if (element) {
          element.scrollIntoView({ behavior: "smooth" });
        }
      }, 100);
    } else {
      // If on home page, just scroll to section
      const element = document.getElementById(section);
      if (element) {
        element.scrollIntoView({ behavior: "smooth" });
      }
    }
  };

  return (
    <header className="bg-white shadow-lg fixed top-0 left-0 w-full z-90 border-b border-gray-200">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center py-4">
          {/* Logo */}
          <div className="flex items-center">
            <Link
              to="/"
              className="flex items-center space-x-2 text-2xl font-bold text-[#333A2F] hover:text-[#2a3028] transition-colors"
            >
              <img
                src="./src/assets/logo.png"
                alt="LearnSphere Logo"
                className="h-15 w-15"
              />
              <span>LearnSphere</span>
            </Link>
          </div>

          {/* Right side - Navigation */}
          <div className="flex items-center space-x-8">
            {/* Desktop Navigation */}
            <nav className="hidden md:flex space-x-8">
              <button
                onClick={() => handleNavigation("home")}
                className="text-gray-700 hover:text-[#333A2F] font-medium transition-colors cursor-pointer"
              >
                Home
              </button>
              <button
                onClick={() => handleNavigation("about")}
                className="text-gray-700 hover:text-[#333A2F] font-medium transition-colors cursor-pointer"
              >
                About Us
              </button>
              <button
                onClick={() => handleNavigation("courses")}
                className="text-gray-700 hover:text-[#333A2F] font-medium transition-colors cursor-pointer"
              >
                Courses
              </button>
              <button
                onClick={() => handleNavigation("contact")}
                className="text-gray-700 hover:text-[#333A2F] font-medium transition-colors cursor-pointer"
              >
                Contact Us
              </button>
              {!username && (
                <Link
                  to="/login"
                  className="text-[#333A2F] font-medium hover:text-[#2a3028] transition-colors"
                >
                  Sign In
                </Link>
              )}
            </nav>
            {/* Profile Icon & Dropdown */}
            {username && (
              <div className="relative">
                <button
                  className="focus:outline-none cursor-pointer"
                  onClick={() => setShowProfileMenu((prev) => !prev)}
                  aria-label="Profile menu"
                >
                  <FaUserCircle
                    size={32}
                    className="text-[#333A2F] hover:text-blue-600 transition-colors"
                  />
                </button>
                {showProfileMenu && (
                  <div
                    className="absolute right-0 mt-10 w-56 rounded-lg shadow-lg z-110"
                    style={{
                      background:
                        "linear-gradient(139deg, rgba(36,40,50,1) 0%, rgba(36,40,50,1) 0%, rgba(37,28,40,1) 100%)",
                      // background: '#333A2F',
                      color: "#fff",
                      border: "1.5px solid #42434a",
                      padding: "0",
                    }}
                  >
                    <div className="px-5 py-4 border-b border-[#42434a] flex items-center gap-3">
                      <FaUserCircle size={28} className="text-blue-400" />
                      <div>
                        <div className="font-bold text-lg">{username}</div>
                        <div className="text-xs text-[#bd89ff]">Logged in</div>
                      </div>
                    </div>
                    <ul className="py-2">
                      <li
                        className="flex items-center gap-3 px-5 py-2 cursor-pointer hover:bg-[#EBEDDF] hover:text-black transition-all"
                        onClick={() => {
                          setShowProfileMenu(false);
                          if (isInstructor) {
                            navigate("/instructor-profile");
                          } else {
                            navigate("/profile");
                          }
                        }}
                      >
                        <FaUser />
                        Profile
                      </li>
                      {isInstructor ? (
                        <>
                          <li
                            className="flex items-center gap-3 px-5 py-2 cursor-pointer hover:bg-[#EBEDDF] hover:text-white transition-all"
                            onClick={() => {
                              setShowProfileMenu(false);
                              navigate("/instructor-dashboard");
                            }}
                          >
                            <FaBook />
                            Dashboard
                          </li>
                          <li
                            className="flex items-center gap-3 px-5 py-2 cursor-pointer hover:bg-[#EBEDDF] hover:text-black transition-all"
                            onClick={() => {
                              setShowProfileMenu(false);
                              navigate("/my-learning");
                            }}
                          >
                            <FaBook />
                            My Learning
                          </li>
                        </>
                      ) : (
                        <>
                          <li
                            className="flex items-center gap-3 px-5 py-2 cursor-pointer hover:bg-[#EBEDDF] hover:text-black transition-all"
                            onClick={() => {
                              setShowProfileMenu(false);
                              navigate("/my-learning");
                            }}
                          >
                            <FaBook />
                            My Learning
                          </li>
                          <li
                            className="flex items-center gap-3 px-5 py-2 cursor-pointer hover:bg-[#EBEDDF] hover:text-black transition-all"
                            onClick={() => {
                              setShowProfileMenu(false);
                              navigate("/payment-history");
                            }}
                          >
                            <FaHistory />
                            Payment History
                          </li>
                        </>
                      )}
                      <li
                        className="flex items-center gap-3 px-5 py-2 cursor-pointer hover:bg-[#8e2a2a] hover:text-white transition-all"
                        onClick={() => {
                          localStorage.removeItem("isAuthenticated");
                          localStorage.removeItem("username");
                          localStorage.removeItem("isInstructor");
                          setShowProfileMenu(false);
                          navigate("/login");
                        }}
                      >
                        <FaSignOutAlt />
                        Logout
                      </li>
                    </ul>
                  </div>
                )}
              </div>
            )}
            {/* Mobile Menu Button */}
            <div className="md:hidden">
              <button
                onClick={toggleMenu}
                className="text-[#333A2F] hover:text-[#2a3028] transition-colors cursor-pointer"
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
                onClick={() => handleNavigation("home")}
                className="text-gray-700 hover:text-[#333A2F] font-medium transition-colors text-left cursor-pointer"
              >
                Home
              </button>
              <button
                onClick={() => handleNavigation("about")}
                className="text-gray-700 hover:text-[#333A2F] font-medium transition-colors text-left cursor-pointer"
              >
                About Us
              </button>
              <button
                onClick={() => handleNavigation("courses")}
                className="text-gray-700 hover:text-[#333A2F] font-medium transition-colors text-left cursor-pointer"
              >
                Courses
              </button>
              <button
                onClick={() => handleNavigation("contact")}
                className="text-gray-700 hover:text-[#333A2F] font-medium transition-colors text-left cursor-pointer"
              >
                Contact Us
              </button>
              <Link
                to="/login"
                className="text-[#333A2F] font-medium hover:text-[#2a3028] transition-colors"
              >
                Sign In
              </Link>
            </nav>
          </div>
        )}
        {/* Hanging Breadcrumb */}
        <div
          className="w-full flex justify-end pointer-events-none"
          style={{ position: "relative", height: 0 }}
        >
          <div
            className="pointer-events-auto px-0 py-0 mr-4"
            style={{
              position: "absolute",
              top: "calc(100%)", // right below the border
              right: 0,
              minWidth: "180px",
              zIndex: 60,
              background: "none",
              padding: 0,
              border: "none",
            }}
          >
            <Breadcrumb />
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
