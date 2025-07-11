import React from 'react';
import { FaGraduationCap, FaLaptop, FaUsers, FaCertificate, FaClock, FaGlobe } from 'react-icons/fa';

const Features = () => {
  const features = [
    {
      icon: <FaGraduationCap className="text-3xl text-[#333A2F]" />,
      title: "Expert Instructors",
      description: "Learn from industry professionals and certified experts in their fields."
    },
    {
      icon: <FaLaptop className="text-3xl text-[#333A2F]" />,
      title: "Interactive Learning",
      description: "Engage with hands-on projects and real-world applications."
    },
    {
      icon: <FaUsers className="text-3xl text-[#333A2F]" />,
      title: "Community Support",
      description: "Join a community of learners and get help when you need it."
    },
    {
      icon: <FaCertificate className="text-3xl text-[#333A2F]" />,
      title: "Certification",
      description: "Earn certificates upon completion to showcase your skills."
    },
    {
      icon: <FaClock className="text-3xl text-[#333A2F]" />,
      title: "Flexible Schedule",
      description: "Learn at your own pace with 24/7 access to course materials."
    },
    {
      icon: <FaGlobe className="text-3xl text-[#333A2F]" />,
      title: "Global Access",
      description: "Access courses from anywhere in the world with internet connection."
    }
  ];

  return (
    <section className="py-16 bg-[#EBEDDF]">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-[#333A2F] mb-4">
            Why Choose LearnSphere?
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Discover the features that make our platform the perfect choice for your learning journey.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <div key={index} className="p-8 bg-white rounded-xl border border-gray-200 transition-shadow hover:shadow-xl">
              <div className="text-center">
                <div className="mb-4">
                  {feature.icon}
                </div>
                <h3 className="text-xl font-bold text-[#333A2F] mb-3">
                  {feature.title}
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  {feature.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Features;