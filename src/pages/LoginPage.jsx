import React from "react";
import { FaGoogle, FaEyeSlash, FaUser } from "react-icons/fa";
import { Link } from "react-router-dom";
import "./LoginPage.css"; 

const LoginPage = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 min-h-screen bg-[#EBEDDF] text-[#333A2F]">
      
      <div className="bg-[#333A2F] flex items-center justify-center">
        <img
          src="/background-left.png" 
          alt="Logo"
          className="w-[300px] h-auto"
        />
      </div>

      <div className="md:col-span-2 flex items-center justify-center relative bg-white text-black">
        
        <img
          src="/bg-top.png"
          alt="Top"
          className="absolute top-0 left-0 w-full h-auto z-0"
        />
        <img
          src="/bg-bottom.png"
          alt="Bottom"
          className="absolute bottom-0 right-0 w-full h-auto z-0"
        />

        <div className="w-full max-w-2xl p-12 rounded-xl relative z-10">
          <h2 className="text-4xl font-bold mb-10 text-center">Sign In</h2>

          <form className="space-y-6">
            <div>
              <label className="block text-base mb-2">E-mail Address</label>
              <input
                type="email"
                placeholder="Enter E-mail Address"
                className="w-full px-6 py-4 text-base border border-gray-300 rounded-xl outline-none focus:ring-2 focus:ring-[#333A2F]"
                required
              />
            </div>

            <div>
              <label className="block text-base mb-2">Enter Password</label>
              <div className="relative">
                <input
                  type="password"
                  placeholder="Enter Password"
                  className="w-full px-6 py-4 text-base border border-gray-300 rounded-xl outline-none focus:ring-2 focus:ring-[#333A2F] pr-12"
                  required
                />
                <FaEyeSlash className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-500 text-base" />
              </div>
            </div>

            <div className="flex items-center justify-between text-sm">
              <label className="flex items-center">
                <input type="checkbox" className="w-4 h-4 mr-2 accent-[#333A2F]" />
                Remember Me
              </label>
              <Link to="/forgot-password" className="flex items-center gap-1 text-blue-600">
                <FaUser className="text-sm" />
                Forgot password?
              </Link>
            </div>

            <button
              type="submit"
              className="w-full bg-[#333A2F] text-white py-3 text-base rounded-xl hover:bg-opacity-90"
            >
              Sign In
            </button>
          </form>

          <div className="flex items-center my-6">
            <hr className="flex-grow border-gray-300" />
            <span className="px-4 text-gray-500 text-sm">or</span>
            <hr className="flex-grow border-gray-300" />
          </div>

          <button className="w-full flex items-center justify-center gap-3 border border-gray-300 py-3 rounded-xl hover:bg-gray-100 text-base">
            <FaGoogle />
            Login with Google
          </button>

          <p className="text-sm text-center mt-6">
            Don’t have an account?{" "}
            <Link to="/Signup" className="text-[#333A2F] font-semibold hover:underline">
              Sign Up
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
