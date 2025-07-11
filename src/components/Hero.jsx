import React from 'react';
import { FaPlay, FaCheck, FaUsers, FaAward, FaGlobe } from 'react-icons/fa';

const Hero = () => {
  return (
    <section id="home" className="bg-[rgb(235, 237, 223)] py-16">
      <div className="container mx-auto px-4">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Column - Content */}
          <div className="space-y-8">
            <div className="space-y-4">
              <h1 className="text-5xl lg:text-6xl font-bold text-[#333A2F] leading-tight">
                Learn Without
                <span className="block text-[#333A2F]">Limits</span>
              </h1>
              <p className="text-xl text-gray-600 leading-relaxed">
                Start, switch, or advance your career with thousands of courses from world-class universities and companies.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-4">
              <button className="flex items-center justify-center px-8 py-4 bg-[#333A2F] text-white rounded-lg font-bold text-lg transition-colors hover:bg-[#2a3028]">
                Get Started
              </button>
              <button className="flex items-center justify-center px-8 py-4 bg-white text-gray-800 rounded-lg font-bold text-lg border border-gray-300 transition-colors hover:bg-gray-50">
                <FaPlay className="mr-2" />
                Watch Demo
              </button>
            </div>

            <div className="flex items-center space-x-8 pt-4">
              <div className="flex items-center space-x-2">
                <div className="w-12 h-12 bg-[#EBEDDF] rounded-full flex items-center justify-center mx-auto mb-2">
                  <FaUsers className="text-[#333A2F] text-xl" />
                </div>
                <span className="text-sm text-gray-600">100K+ Students</span>
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-12 h-12 bg-[#EBEDDF] rounded-full flex items-center justify-center mx-auto mb-2">
                  <FaAward className="text-[#333A2F] text-xl" />
                </div>
                <span className="text-sm text-gray-600">500+ Courses</span>
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-12 h-12 bg-[#EBEDDF] rounded-full flex items-center justify-center mx-auto mb-2">
                  <FaGlobe className="text-[#333A2F] text-xl" />
                </div>
                <span className="text-sm text-gray-600">Global Access</span>
              </div>
            </div>
          </div>

          {/* Right Column - Visual */}
          <div className="relative">
            <div className="bg-white rounded-xl p-8 h-96">
              <div className="relative h-full">
                {/* Main content area */}
                <div className="absolute inset-0 flex items-center justify-center border-2 border-gray-300 rounded-xl">
                  <div className="text-center">
                    <h3 className="text-2xl font-bold text-[#333A2F] mb-4">Interactive Learning</h3>
                    <p className="text-gray-600">Experience hands-on learning with our interactive platform</p>
                  </div>
                </div>

                {/* Floating elements */}
                <div className="absolute -top-4 -right-4 bg-white rounded-full p-4 shadow-xl">
                  <FaCheck className="text-[#333A2F] text-2xl" />
                </div>
                <div className="absolute top-1/2 -left-4 transform -translate-y-1/2">
                  <div className="w-6 h-6 bg-[#EBEDDF] rounded-full border-2 border-white"></div>
                </div>
                <div className="absolute -bottom-4 -left-4 bg-white rounded-xl p-4 shadow-xl">
                  <div className="text-center">
                    <div className="text-2xl font-bold text-[#333A2F]">95%</div>
                    <div className="text-sm text-gray-600">Success Rate</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;