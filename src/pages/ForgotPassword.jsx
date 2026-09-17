import React, { useState, useEffect } from "react";
import logo from "../assets/logo.png";
import bgTop from "../assets/bg-top.png";
import bgBottom from "../assets/bg-bottom.png";
import bgLeft from "../assets/bg-left.webp";
import { Link, useNavigate } from "react-router-dom";
import { forgotPassword } from "../services/authService";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [sent, setSent] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    document.body.style.overflow = 'hidden';
    return () => { document.body.style.overflow = ''; };
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    try {
      // ask the backend to email the reset link (valid for 15 minutes)
      await forgotPassword(email);
      setSent(true);
    } catch (err) {
      setError(err.message || "Something went wrong. Please try again.");
    }
  };

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
              Forgot your password?
            </p>
            <img src={logo} alt="LearnSphere Logo" className="w-100 h-100" />
          </div>
        </div>
      </aside>
      {/* Right Panel - Main (75% on desktop, 100% on mobile) */}
      <main className="flex-1 w-full flex items-center justify-center p-6 md:p-12 relative">
        <div className="w-full max-w-xl p-8 z-10">
          {!sent ? (
            <>
              <div className="text-center mb-8">
                <h1 className="text-3xl font-bold text-gray-800 mb-2">Forgot Password?</h1>
                <p className="text-gray-600">
                  Enter your email address and we'll send you a password reset link.
                </p>
              </div>
              <form className="space-y-6" onSubmit={handleSubmit}>
                <div>
                  <label htmlFor="email" className="block text-base font-medium text-gray-700 mb-2">
                    Email Address
                  </label>
                  <input
                    type="email"
                    id="email"
                    value={email}
                    onChange={e => setEmail(e.target.value)}
                    className="w-full px-4 py-3 text-base border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#333A2F] focus:border-[#333A2F] outline-none transition-colors"
                    placeholder="Enter your email address"
                    required
                  />
                </div>
                <button
                  type="submit"
                  className="w-full py-3 bg-[#333A2F] text-white font-medium rounded-lg cursor-pointer hover:bg-[#22261C] transition-colors"
                >
                  Send Reset Link
                </button>
              </form>
              <div className="text-center mt-6">
                <Link to="/login" className="inline-flex items-center text-sm text-[#333A2F] hover:text-[#2a3128]">
                  Back to Login
                </Link>
              </div>
            </>
          ) : (
            <div className="flex flex-col items-center justify-center h-full">
              <div className="text-center mb-8">
                <h1 className="text-3xl font-bold text-gray-800 mb-2">Check your email</h1>
                <p className="text-gray-600 mb-6">
                  A reset link was sent to <span className="font-semibold">{email}</span>.<br />
                  Please check your inbox and follow the instructions.
                </p>
                <button
                  className="w-full py-3 bg-[#333A2F] text-white font-medium rounded-lg cursor-pointer hover:bg-[#22261C] transition-colors mt-4"
                  onClick={() => navigate('/login')}
                >
                  Back to Login
                </button>
              </div>
            </div>
          )}
        </div>
      </main>
    </div>
  );
};

export default ForgotPassword; 