import React from "react";
import "./LoginPage.css";
import { FaGoogle, FaEyeSlash, FaUser } from "react-icons/fa";
import { Link } from "react-router-dom";

const LoginPage = () => {
  return (
    <div className="login-wrapper grid grid-cols-1 md:grid-cols-2 min-h-screen bg-black text-white">
      {/* Left Side */}
      <div
        className="login-left hidden md:block"
        style={{
          backgroundImage:
            "url('https://img.freepik.com/free-photo/high-angle-view-laptop-stationeries-blue-background_23-2147880456.jpg')",
        }}
      ></div>

      {/* Right Side */}
      <div
        className="login-right flex flex-col justify-center p-8 bg-white text-black"
        style={{
         

          backgroundImage: "url('/bg-bottom.png'),url('/bg-top.png')",
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
          boxShadow: '0 0 80px rgba(255, 255, 255, 0.15)',
        }}
      >
        <h2 className="text-3xl font-bold mb-6 text-center">Sign In</h2>

        <form className="space-y-4">
          <div>
            <label className="block mb-1 text-sm">E-mail Address</label>
            <input
              type="email"
              placeholder="Enter E-mail Address"
              className="w-80 px-4 py-2 rounded focus:outline-none focus:ring-2 focus:ring-gray-700"
              required
            />
          </div>

          <div>
            <label className="block mb-1 text-sm">Enter Password</label>
            <div className="relative">
              <input
                type="password"
                placeholder="Enter Password"
                className="w-80 px-4 py-2 rounded focus:outline-none focus:ring-2 focus:ring-gray-700 pr-10"
                required
              />
              <FaEyeSlash className="absolute right-3 top-3 text-gray-500" />
            </div>
          </div>

          <div className="flex items-center justify-between text-sm">
            <label className="flex items-center">
              <input type="checkbox" className="mr-2" />
              Remember Me
            </label>
            <Link to="/forgot-password" className="flex items-center gap-1 text-blue-600">
              <FaUser />
              Forgot password?
            </Link>
          </div>

          <button
            type="submit"
            className="w-full bg-gray-900   text-white py-2 rounded hover:bg-gray-800 transition"
          >
            Sign In
          </button>
        </form>

        <div className="flex items-center my-6">
          <hr className="flex-grow border-gray-300" />
          <span className="mx-2 text-sm text-gray-500">or</span>
          <hr className="flex-grow border-gray-300" />
        </div>

        <button className="w-full flex items-center justify-center gap-2 border py-2 rounded hover:bg-gray-100 transition text-black">
          <FaGoogle />
          Login with Google
        </button>

        <p className="mt-4 text-center text-sm text-gray-600">
          Don’t have an account?{" "}
          <Link to="/signup" className="font-bold text-blue-600">
            Sign Up
          </Link>
        </p>
      </div>
    </div>
  );
};

export default LoginPage;
