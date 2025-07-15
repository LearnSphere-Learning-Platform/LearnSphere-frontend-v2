import React from 'react';
import { FaUsers, FaGraduationCap, FaAward, FaGlobe } from 'react-icons/fa';

const About = () => {
  const stats = [
    {
      icon: <FaUsers className="text-3xl text-[#333A2F]" />,
      number: "50K+",
      label: "Students"
    },
    {
      icon: <FaGraduationCap className="text-3xl text-[#333A2F]" />,
      number: "200+",
      label: "Courses"
    },
    {
      icon: <FaAward className="text-3xl text-[#333A2F]" />,
      number: "98%",
      label: "Success Rate"
    },
    {
      icon: <FaGlobe className="text-3xl text-[#333A2F]" />,
      number: "150+",
      label: "Countries"
    }
  ];

  return (
    <section id="about" className="py-16 bg-[#C8CBB8]">
      <div className="container mx-auto px-4">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Column - Content */}
          <div className="space-y-8">
            <div className="space-y-4">
              <h2 className="text-4xl font-bold text-[#333A2F]">
                About LearnSphere
              </h2>
              <p className="text-xl text-gray-600 leading-relaxed">
                We are passionate about making quality education accessible to everyone. 
                Our platform connects learners with expert instructors from around the world, 
                providing a comprehensive learning experience that adapts to your needs.
              </p>
              <p className="text-lg text-gray-600 leading-relaxed">
                With cutting-edge technology and innovative teaching methods, we help 
                students achieve their learning goals and advance their careers.
              </p>
            </div>

            <div className="grid grid-cols-2 gap-6">
              {stats.map((stat, index) => (
                <div key={index} className="text-center p-6 bg-white rounded-xl">
                  <div className="mb-3">
                    {stat.icon}
                  </div>
                  <div className="text-3xl font-bold text-[#333A2F] mb-1">
                    {stat.number}
                  </div>
                  <div className="text-gray-600 font-medium">
                    {stat.label}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Right Column - Visual */}
          <div className="relative">
            <div className="bg-white rounded-xl p-8 h-96">
              <div className="relative h-full">
                {/* Background Image */}
                <div className="absolute inset-0 rounded-xl overflow-hidden">
                  <img 
                    src="https://images.unsplash.com/photo-1519389950473-47ba0277781c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80"
                    alt="Education background"
                    className="w-full h-full object-cover rounded-xl opacity-30"
                  />
                  <div className="absolute inset-0 bg-gradient-to-br from-[#333A2F]/60 to-[#333A2F]/40 rounded-xl"></div>
                </div>

                {/* Centered Text Content */}
                <div className="relative z-10 flex items-center justify-center h-full">
                  <div className="text-center p-6 max-w-md">
                    <h3 className="text-2xl font-bold text-white mb-4">Our Mission</h3>
                    <p className="text-white/90 text-lg leading-relaxed">
                      To democratize education and empower learners worldwide with 
                      accessible, high-quality learning experiences.
                    </p>
                  </div>
                </div>
                
                {/* Floating Stats Card */}
                <div className="absolute -bottom-6 -right-6 bg-white rounded-xl p-6 shadow-xl">
                  <div className="text-center">
                    <div className="text-3xl font-bold text-[#333A2F]">2024</div>
                    <div className="text-sm text-gray-600">Years of Excellence</div>
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

export default About;