import React, { useState, useEffect } from "react";
import { FaGoogle, FaEyeSlash, FaEye, FaUser, FaUserTag, FaArrowLeft, FaCheck } from "react-icons/fa";
import { Link } from "react-router-dom";
import logo from "../assets/logo.png";
import bgTop from "../assets/bg-top.png";
import bgBottom from "../assets/bg-bottom.png";
import bgLeft from "../assets/bg-left.webp";

const Signup = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [agreeTerms, setAgreeTerms] = useState(false);
  const [isInstructor, setIsInstructor] = useState(false);

  // Prevent background scroll
  useEffect(() => {
    document.body.style.overflow = 'hidden';
    return () => { document.body.style.overflow = ''; };
  }, []);

  return (
    <div
      className="fixed inset-0 w-full h-full z-50 flex items-center justify-center"
      style={{
        backgroundColor: '#EBEDDF',
        backgroundImage: `url(${bgTop}), url(${bgBottom})`,
        backgroundPosition: '20px -70px, 800px 90px',
        backgroundSize: 'contain, contain',
        backgroundRepeat: 'no-repeat, no-repeat',
      }}
    >
      {/* Left Panel - Aside (25%) - Hidden on mobile */}
      <aside
        className="hidden md:flex flex-col items-center justify-center w-1/4 h-full relative overflow-hidden"
        style={{
          backgroundColor: '#333A2F',
          backgroundImage: `url(${bgLeft})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',
        }}
      >
        {/* Overlay for better text readability */}
        <div
          className="absolute inset-0"
          style={{ backgroundColor: 'rgba(51, 58, 47, 0.9)' }}
        ></div>
        <div className="text-center z-10 relative">
          <div className="mb-16">
            <p className="text-white text-4xl font-semibold leading-snug mb-0 ">
              Instant learning, <br />
              one click away
            </p>
            <img src={logo} alt="LearnSphere Logo" className="w-100 h-100" />
          </div>
        </div>
      </aside>
      {/* Right Panel - Main (75% on desktop, 100% on mobile) */}
      <main className="flex-1 w-full flex items-center justify-center p-6 md:p-12 relative">
        <div className="w-full max-w-xl p-8 z-10">
          <h1 className="text-3xl font-bold text-gray-800 mb-6 text-center">Sign Up</h1>
          <form className="auth-form space-y-4">
            {/* Full Name Field */}
            <div className="auth-form__span-2">
              <label className="label block text-base font-medium text-gray-700 mb-2" htmlFor="fullName">
                Full Name
              </label>
              <input
                id="txtSignupFullName"
                name="txtSignupFullName"
                type="text"
                className="input w-full px-4 py-3 text-base border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#333A2F] focus:border-[#333A2F] outline-none transition-colors"
                placeholder="Enter Full Name"
                autoFocus
                required
              />
            </div>
            {/* Email Field */}
            <div className="auth-form__span-2">
              <label className="label block text-base font-medium text-gray-700 mb-2" htmlFor="email">
                E-mail Address
              </label>
              <input
                id="txtSignupEmailId"
                name="txtSignupEmailId"
                type="email"
                className="input w-full px-4 py-3 text-base border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#333A2F] focus:border-[#333A2F] outline-none transition-colors"
                placeholder="Enter E-mail Address"
                required
              />
            </div>
            {/* Password Field */}
            <div className="auth-form__span-2 relative">
              <label className="label block text-base font-medium text-gray-700 mb-2" htmlFor="password">
                Create Password
              </label>
              <div className="relative">
                <input
                  name="txtSignupPassword"
                  id="txtSignupPassword"
                  type={showPassword ? "text" : "password"}
                  className="input w-full px-4 py-3 pr-12 text-base border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#333A2F] focus:border-[#333A2F] outline-none transition-colors"
                  placeholder="Create Password"
                  required
                />
                <span
                  className="login-wrap-hide-pwd togglePassword absolute right-4 top-1/2 transform -translate-y-1/2 cursor-pointer text-gray-500 hover:text-gray-700 text-lg"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? <FaEye /> : <FaEyeSlash />}
                </span>
              </div>
            </div>
            {/* Confirm Password Field */}
            <div className="auth-form__span-2 relative">
              <label className="label block text-base font-medium text-gray-700 mb-2" htmlFor="confirmPassword">
                Confirm Password
              </label>
              <div className="relative">
                <input
                  name="txtSignupConfirmPassword"
                  id="txtSignupConfirmPassword"
                  type={showConfirmPassword ? "text" : "password"}
                  className="input w-full px-4 py-3 pr-12 text-base border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#333A2F] focus:border-[#333A2F] outline-none transition-colors"
                  placeholder="Confirm Password"
                  required
                />
                <span
                  className="login-wrap-hide-pwd togglePassword absolute right-4 top-1/2 transform -translate-y-1/2 cursor-pointer text-gray-500 hover:text-gray-700 text-lg"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                >
                  {showConfirmPassword ? <FaEye /> : <FaEyeSlash />}
                </span>
              </div>
            </div>
            {/* Instructor Checkbox */}
            <div className="auth-form__span-2">
              <label className="checkbox flex items-start cursor-pointer">
                <div
                  className="custom-checkbox w-5 h-5 border-gray-300 rounded flex items-center justify-center cursor-pointer transition-all duration-200"
                  style={{
                    backgroundColor: isInstructor ? '#333A2F' : 'white',
                    borderColor: isInstructor ? '#333A2F' : '#d1d5db',
                  }}
                  onClick={() => setIsInstructor(!isInstructor)}
                >
                  {isInstructor && (
                    <FaCheck
                      className="text-white text-xs font-bold"
                      style={{ color: 'white' }}
                    />
                  )}
                </div>
                <span className="checkmark text-sm text-gray-700 ml-2">
                  I am an instructor
                </span>
              </label>
            </div>
            {/* Terms and Conditions */}
            <div className="auth-form__span-2">
              <label className="checkbox flex items-start cursor-pointer">
                <div
                  className="custom-checkbox w-5 h-5 border-gray-300 rounded flex items-center justify-center cursor-pointer transition-all duration-200"
                  style={{
                    backgroundColor: agreeTerms ? '#333A2F' : 'white',
                    borderColor: agreeTerms ? '#333A2F' : '#d1d5db',
                  }}
                  onClick={() => setAgreeTerms(!agreeTerms)}
                >
                  {agreeTerms && (
                    <FaCheck
                      className="text-white text-xs font-bold"
                      style={{ color: 'white' }}
                    />
                  )}
                </div>
                <span className="checkmark text-sm text-gray-700 ml-2">
                  I agree to the <a href="/terms" className="text-[#333A2F] hover:text-[#2a3128]">Terms and Conditions</a> and <a href="/privacy" className="text-[#333A2F] hover:text-[#2a3128]">Privacy Policy</a>
                </span>
              </label>
            </div>
            {/* Sign Up Button */}
            <button
              id="submitSignup"
              name="submitSignup"
              type="button"
              className="signup-btn auth-form__button w-full text-white py-3 px-4 text-base font-medium transition-colors duration-200 flex items-center justify-center rounded-lg"
              style={{ backgroundColor: '#333A2F' }}
            >
              Sign Up
            </button>
          </form>
          {/* Divider */}
          <div className="text-center form-text mt-6">
            <p className="or-divider text-gray-500 text-sm">or</p>
          </div>
          {/* Sign In Link */}
          <div className="text-center form-text mt-6">
            <span className="text-gray-600 text-sm">Already have an account?</span>
            <Link to="/login" className="ps-2 text-[#333A2F] hover:text-[#2a3128] font-semibold flex items-center justify-center mt-2 text-sm">
              <FaArrowLeft className="mr-1" />
              Sign In
            </Link>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Signup;
