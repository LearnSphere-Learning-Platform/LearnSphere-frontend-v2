import React from 'react';
import { Link } from 'react-router-dom';

export default function Signup() {
  return (
    <div className="relative min-h-screen bg-[#EBEDDF]">
      <div className="relative z-10 flex min-h-screen text-[#333A2F]">
        
        <div
          className="w-1/3 bg-cover bg-center flex items-center justify-center"
          style={{
            backgroundColor: "#333A2F",
          }}
        >
          <img
            src="/background-left.png"
            alt="img"
            className="w-[300px] h-auto"
          />
        </div>

        <div className="w-2/3 flex items-center justify-center p-10 relative">
          
          <img
            src="/bg-top.png"
            alt="Top Decoration"
            className="absolute top-0 left-0 w-full h-auto z-0 brightness-350"
            style={{ maxHeight: "2000px" }}
          />
          <img
            src="/bg-bottom.png"
            alt="Bottom Decoration"
            className="absolute bottom-0 right-0 w-full h-auto z-0 brightness-350"
            style={{ maxHeight: "1900px" }}
          />

          <div className="w-full max-w-[130rem] p-32 rounded-xl border border-gray-200 relative z-10">
            <h2 className="text-6xl font-bold mb-16 text-center">Sign Up</h2>

            <form className="space-y-12">
              <div>
                <label className="block text-3xl mb-3">Enter Full Name</label>
                <input
                  type="text"
                  required
                  placeholder="Enter Full Name"
                  className="w-full border border-gray-300 px-10 py-5 rounded-3xl outline-none focus:ring-4 focus:ring-[#333A2F] text-[#333A2F] text-2xl"
                />
              </div>

              <div>
                <label className="block text-3xl mb-3">Enter E-mail Address</label>
                <input
                  type="email"
                  required
                  placeholder="Enter E-mail Address"
                  className="w-full border border-[#333A2F] px-10 py-5 rounded-3xl outline-none focus:ring-4 focus:ring-[#333A2F] text-[#333A2F] text-2xl"
                />
              </div>

              <div>
                <label className="block text-3xl mb-3">New Password</label>
                <input
                  type="password"
                  required
                  placeholder="Enter Password"
                  className="w-full border border-gray-300 px-10 py-5 rounded-3xl outline-none focus:ring-4 focus:ring-[#333A2F] text-[#333A2F] text-2xl"
                />
              </div>

              <div>
                <label className="block text-3xl mb-3">Confirm Password</label>
                <input
                  type="password"
                  required
                  placeholder="Confirm Password"
                  className="w-full border border-gray-300 px-10 py-5 rounded-3xl outline-none focus:ring-4 focus:ring-[#333A2F] text-[#333A2F] text-2xl"
                />
              </div>

              <div className="flex items-start">
                <input
                  type="checkbox"
                  defaultChecked
                  className="accent-[#333A2F] mt-1 w-6 h-6"
                />
                <label className="ml-4 text-xl leading-relaxed">
                  I’m in for emails with exciting discounts and newsletter.
                </label>
              </div>

              <button
                type="submit"
                className="w-full bg-[#333A2F] text-white text-3xl font-semibold py-5 rounded-3xl hover:bg-opacity-90"
              >
                Sign Up
              </button>
            </form>

            <p className="text-xl mt-10 text-center">
              By signing up, you agree to our{" "}
              <span className="font-semibold">Terms of Use</span> and{" "}
              <span className="font-semibold">Privacy Policy</span>.
            </p>

            <div className="flex items-center my-10">
              <hr className="flex-grow border-t border-gray-300" />
              <span className="px-4 text-gray-500 text-lg">or</span>
              <hr className="flex-grow border-t border-gray-300" />
            </div>

            <button className="w-full flex items-center justify-center gap-4 border border-gray-300 py-4 rounded-3xl hover:bg-gray-100 text-2xl">
              <img
                src="https://www.svgrepo.com/show/475656/google-color.svg"
                alt="Google"
                className="w-8 h-8"
              />
              <span>Sign Up with Google</span>
            </button>

            <p className="text-2xl text-center mt-8">
              Already have an account?{" "}
              <Link to="/login" className="text-[#333A2F] font-semibold hover:underline">
                Sign In
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
