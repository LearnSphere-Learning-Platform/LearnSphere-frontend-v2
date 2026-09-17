import React, { useState } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import logo from "../assets/logo.png";
import bgTop from "../assets/bg-top.png";
import bgBottom from "../assets/bg-bottom.png";
import bgLeft from "../assets/bg-left.webp";
import { resetPassword } from "../services/authService";

const ResetPassword = () => {
  const [searchParams] = useSearchParams();
  const token = searchParams.get("token");

  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (newPassword.length < 8) {
      setError("Password must be at least 8 characters long.");
      return;
    }
    if (!/[A-Za-z]/.test(newPassword) || !/[0-9]/.test(newPassword)) {
      setError("Password must include at least one letter and one number.");
      return;
    }
    if (newPassword !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    try {
      // calls the auth service on port 8070 (fixes the old wrong port 8080)
      await resetPassword(token, newPassword, confirmPassword);
      setSubmitted(true);
    } catch (err) {
      const message = String(err.message || "");
      if (
        message.toLowerCase().includes("token expired") ||
        message.toLowerCase().includes("invalid or expired")
      ) {
        const goToForgot = window.confirm(
          "Your reset link has expired. Would you like to request a new one?"
        );
        if (goToForgot) {
          navigate("/forgot-password");
        }
      } else {
        setError(message || "Something went wrong.");
      }
    }
  };

  return (
    <div
      className="fixed inset-0 w-full h-full z-50 flex items-center justify-center"
      style={{
        backgroundColor: "#EBEDDF",
        backgroundImage: `url(${bgTop}), url(${bgBottom})`,
        backgroundPosition: "20px -70px, 800px 90px",
        backgroundSize: "contain, contain",
        backgroundRepeat: "no-repeat, no-repeat",
      }}
    >
      <aside
        className="hidden md:flex flex-col items-center justify-center w-1/4 h-full relative overflow-hidden"
        style={{
          backgroundColor: "#333A2F",
          backgroundImage: `url(${bgLeft})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
        }}
      >
        <div
          className="absolute inset-0"
          style={{ backgroundColor: "rgba(51, 58, 47, 0.9)" }}
        ></div>
        <div className="text-center z-10 relative">
          <div className="mb-16">
            <p className="text-white text-4xl font-semibold leading-snug mb-0 ">
              Reset your password
            </p>
            <img src={logo} alt="LearnSphere Logo" className="w-100 h-100" />
          </div>
        </div>
      </aside>

      <main className="flex-1 w-full flex items-center justify-center p-6 md:p-12 relative">
        <div className="w-full max-w-xl p-8 z-10">
          {!submitted ? (
            <>
              <div className="text-center mb-8">
                <h1 className="text-3xl font-bold text-gray-800 mb-2">
                  Reset Password
                </h1>
                <p className="text-gray-600">
                  Enter a new password to reset your account.
                </p>
              </div>
              <form className="space-y-6" onSubmit={handleSubmit}>
                <div>
                  <label
                    htmlFor="newPassword"
                    className="block text-base font-medium text-gray-700 mb-2"
                  >
                    New Password
                  </label>
                  <input
                    type="password"
                    id="newPassword"
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                    className="w-full px-4 py-3 text-base border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#333A2F] focus:border-[#333A2F] outline-none transition-colors"
                    placeholder="Enter new password"
                    required
                  />
                </div>
                <div>
                  <label
                    htmlFor="confirmPassword"
                    className="block text-base font-medium text-gray-700 mb-2"
                  >
                    Confirm Password
                  </label>
                  <input
                    type="password"
                    id="confirmPassword"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    className="w-full px-4 py-3 text-base border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#333A2F] focus:border-[#333A2F] outline-none transition-colors"
                    placeholder="Confirm new password"
                    required
                  />
                </div>
                {error && (
                  <div className="text-red-600 text-sm font-medium text-center">
                    {error}
                  </div>
                )}
                <button
                  type="submit"
                  className="w-full py-3 bg-[#333A2F] text-white font-medium rounded-lg cursor-pointer hover:bg-[#22261C] transition-colors"
                >
                  Reset Password
                </button>
              </form>
            </>
          ) : (
            <div className="flex flex-col items-center justify-center h-full">
              <div className="text-center mb-8">
                <h1 className="text-3xl font-bold text-gray-800 mb-2">
                  Password Updated
                </h1>
                <p className="text-gray-600 mb-6">
                  Your password has been successfully reset.
                  <br /> You can now login with the new password.
                </p>
                <button
                  className="w-full py-3 bg-[#333A2F] text-white font-medium rounded-lg cursor-pointer hover:bg-[#22261C] transition-colors mt-4"
                  onClick={() => navigate("/login")}
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

export default ResetPassword;
