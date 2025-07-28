import React from 'react';
import { FaPhone, FaEnvelope, FaMapMarkerAlt, FaClock, FaFacebook, FaTwitter, FaInstagram, FaLinkedin } from 'react-icons/fa';

const Contact = () => {
  const contactInfo = [
    {
      icon: <FaPhone className="text-2xl text-[#333A2F]" />,
      title: "Phone",
      details: "+91 7339390000",
      description: "Call us anytime"
    },
    {
      icon: <FaEnvelope className="text-2xl text-[#333A2F]" />,
      title: "Email",
      details: "learnsphere@kce.ac.in",
      description: "Send us a message"
    },
    {
      icon: <FaMapMarkerAlt className="text-2xl text-[#333A2F]" />,
      title: "Address",
      details: "C Block , Kce , Othakalmandapam",
      description: "Visit our office"
    },
    {
      icon: <FaClock className="text-2xl text-[#333A2F]" />,
      title: "Working Hours",
      details: "Mon - Fri: 9AM - 9PM",
      description: "We're here to help"
    }
  ];

  const socialLinks = [
    { icon: <FaFacebook />, href: "#", label: "Facebook" },
    { icon: <FaTwitter />, href: "#", label: "Twitter" },
    { icon: <FaInstagram />, href: "#", label: "Instagram" },
    { icon: <FaLinkedin />, href: "#", label: "LinkedIn" }
  ];

  return (
    <section id="contact" className="py-16 bg-[#EBEDDF]">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-[#333A2F] mb-4">
            Get In Touch
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Have questions? We'd love to hear from you. Send us a message and we'll respond as soon as possible.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12">
          {/* Contact Information */}
          <div className="space-y-8">
            <div className="grid md:grid-cols-2 gap-6">
              {contactInfo.map((info, index) => (
                <div key={index} className="p-6 bg-white rounded-xl">
                  <div className="flex items-start space-x-4">
                    <div className="w-12 h-12 bg-[#EBEDDF] rounded-full flex items-center justify-center">
                      {info.icon}
                    </div>
                    <div>
                      <h3 className="text-lg font-bold text-[#333A2F] mb-1">
                        {info.title}
                      </h3>
                      <p className="text-gray-700 font-medium mb-1">
                        {info.details}
                      </p>
                      <p className="text-sm text-gray-600">
                        {info.description}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Social Media Links */}
            <div className="bg-white rounded-xl p-6">
              <h3 className="text-xl font-bold text-[#333A2F] mb-4">
                Follow Us
              </h3>
              <div className="flex space-x-4">
                {socialLinks.map((social, index) => (
                  <a
                    key={index}
                    href={social.href}
                    className="w-12 h-12 bg-[#333A2F] text-white rounded-full flex items-center justify-center hover:bg-[#2a3028] transition-colors"
                    aria-label={social.label}
                  >
                    {social.icon}
                  </a>
                ))}
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <div className="bg-white rounded-2xl shadow-xl p-8">
            <h3 className="text-2xl font-bold text-[#333A2F] mb-6">
              Send us a Message
            </h3>
            <form className="space-y-6">
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="firstName" className="block text-sm font-medium text-gray-700 mb-2">
                    First Name
                  </label>
                  <input
                    type="text"
                    id="firstName"
                    name="firstName"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#333A2F] focus:border-transparent transition-colors"
                    placeholder="Enter your first name"
                  />
                </div>
                <div>
                  <label htmlFor="lastName" className="block text-sm font-medium text-gray-700 mb-2">
                    Last Name
                  </label>
                  <input
                    type="text"
                    id="lastName"
                    name="lastName"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#333A2F] focus:border-transparent transition-colors"
                    placeholder="Enter your last name"
                  />
                </div>
              </div>
              
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                  Email Address
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#333A2F] focus:border-transparent transition-colors"
                  placeholder="Enter your email address"
                />
              </div>
              
              <div>
                <label htmlFor="subject" className="block text-sm font-medium text-gray-700 mb-2">
                  Subject
                </label>
                <input
                  type="text"
                  id="subject"
                  name="subject"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#333A2F] focus:border-transparent transition-colors"
                  placeholder="What's this about?"
                />
              </div>
              
              <div>
                <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-2">
                  Message
                </label>
                <textarea
                  id="message"
                  name="message"
                  rows="5"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#333A2F] focus:border-transparent transition-colors resize-none"
                  placeholder="Tell us more about your inquiry..."
                ></textarea>
              </div>
              
              <button
                type="submit"
                className="w-full px-8 py-4 bg-[#333A2F] text-white rounded-lg font-bold text-lg hover:bg-[#2a3028] transition-colors cursor-pointer"
              >
                Send Message
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;