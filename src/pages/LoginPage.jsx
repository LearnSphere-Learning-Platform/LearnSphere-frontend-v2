import React, { useState } from "react";
import { FaGoogle, FaEyeSlash, FaEye, FaUser, FaUserTag, FaCheck } from "react-icons/fa";
import { Link } from "react-router-dom";
import logo from "../assets/logo.png";
import bgTop from "../assets/bg-top.png";
import bgBottom from "../assets/bg-bottom.png";
import bgLeft from "../assets/bg-left.webp";

const LoginPage = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);

  return (
    <div className="min-h-screen relative" style={{ backgroundColor: '#EBEDDF' }}>
      {/* Content */}
      <section className="relative z-10">
        <div className="auth-content-wrapper flex min-h-screen">
          {/* Left Panel - Aside (25%) */}
          <aside 
            className="auth-aside flex flex-col items-center justify-center w-1/4 relative overflow-hidden" 
            style={{ 
              backgroundColor: '#333A2F',
              backgroundImage: `url(${bgLeft})`,
              backgroundSize: 'cover',
              backgroundPosition: 'center',
              backgroundRepeat: 'no-repeat'
            }}
          >
            {/* Overlay for better text readability */}
            <div 
              className="absolute inset-0" 
              style={{ 
                backgroundColor: 'rgba(51, 58, 47, 0.9) ' // #333A2F with 70% opacity
              }}
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

          {/* Right Panel - Main (75%) */}
          <main 
            className="auth flow auth--signin flex-1 flex items-center justify-center p-12 relative" 
            style={{ backgroundColor: '#EBEDDF' }}
          >
            {/* Background images for right panel */}
            <div 
              className="absolute inset-0 pointer-events-none"
              style={{
                backgroundImage: `url(${bgTop}), url(${bgBottom})`,
                backgroundPosition: '-300px -70px, 400px 90px',
                backgroundSize: 'contain, contain',
                backgroundRepeat: 'no-repeat, no-repeat'
              }}
            ></div>
            
            <div className="w-full max-w-md relative z-10">
              <h1 className="text-3xl font-bold text-gray-800 mb-6 text-center">Sign In</h1>
              
              <form className="auth-form space-y-4">
                {/* Email Field */}
                <div className="auth-form__span-2">
                  <label className="label block text-base font-medium text-gray-700 mb-2" htmlFor="email">
                    E-mail Address
                  </label>
                  <input 
                    id="txtLoginEmailId" 
                    name="txtLoginEmailId" 
                    type="text" 
                    className="input w-full px-4 py-3 text-base border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#333A2F] focus:border-[#333A2F] outline-none transition-colors" 
                    placeholder="Enter E-mail Address" 
                    autoFocus 
                    required 
                  />
                </div>

                {/* Password Field */}
                <div className="auth-form__span-2 relative">
                  <label className="label block text-base font-medium text-gray-700 mb-2" htmlFor="password">
                    Enter Password
                  </label>
                  <div className="relative">
                    <input 
                      name="txtLoginPassword" 
                      id="txtLoginPassword" 
                      type={showPassword ? "text" : "password"} 
                      className="input w-full px-4 py-3 pr-12 text-base border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#333A2F] focus:border-[#333A2F] outline-none transition-colors" 
                      placeholder="Enter Password" 
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

                {/* Remember Me & Forgot Password */}
                <div className="flex justify-between items-center">
                  <div>
                    <label className="checkbox flex items-center cursor-pointer">
                      <div 
                        className="custom-checkbox w-5 h-5 border-gray-300 rounded flex items-center justify-center cursor-pointer transition-all duration-200"
                        style={{ 
                          backgroundColor: rememberMe ? '#333A2F' : 'white',
                          borderColor: rememberMe ? '#333A2F' : '#d1d5db'
                        }}
                        onClick={() => setRememberMe(!rememberMe)}
                      >
                        {rememberMe && (
                          <FaCheck 
                            className="text-white text-xs font-bold" 
                            style={{ color: 'white' }}
                          />
                        )}
                      </div>
                      <span className="checkmark text-sm text-gray-700 ml-2">Remember Me</span>
                    </label>
                  </div>
                  <div>
                    <Link to="/forgot-password" className="text-secondary text-sm text-[#333A2F] hover:text-[#2a3128] flex items-center">
                      <FaUserTag className="mr-1" />
                      Forgot password?
                    </Link>
                  </div>
                </div>

                {/* Sign In Button */}
                <button 
                  id="submitLogin" 
                  name="submitLogin" 
                  type="button" 
                  className="login-btn auth-form__button w-full text-white py-3 px-4 text-base font-medium transition-colors duration-200 flex items-center justify-center rounded-lg"
                  style={{ backgroundColor: '#333A2F' }}
                >
                  Sign In
                </button>
              </form>

              {/* Divider */}
              <div className="text-center form-text mt-6">
                <p className="or-divider text-gray-500 text-sm">or</p>
                
                {/* Google Sign In Button */}
                <div className="signin-flex-group mt-4 flex-wrap justify-center">
                  <button 
                    className="w-full flex items-center justify-center gap-2 border border-gray-300 py-3 px-4 rounded-lg hover:bg-gray-50 transition-colors text-sm"
                  >
                    <FaGoogle className="text-[#333A2F] text-lg" />
                    <span className="text-gray-700">Sign in with Google</span>
                  </button>
                </div>
              </div>

              {/* Sign Up Link */}
              <div className="text-center form-text mt-6">
                <span className="text-gray-600 text-sm">Don't have an account?</span>
                <Link to="/signup" className="ps-2 text-[#333A2F] hover:text-[#2a3128] font-semibold flex items-center justify-center mt-2 text-sm">
                  <FaUser className="mr-1" />
                  Sign Up
                </Link>
              </div>
            </div>
          </main>
        </div>
      </section>
    </div>
  );
};

export default LoginPage;
