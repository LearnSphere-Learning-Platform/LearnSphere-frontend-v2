
import React from 'react';
import { FaFacebook, FaTwitter, FaInstagram, FaLinkedin, FaYoutube, FaEnvelope, FaPhone, FaMapMarkerAlt } from 'react-icons/fa';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  const footerLinks = {
    company: [
      { name: "About Us", href: "#" },
      { name: "Our Team", href: "#" },
      { name: "Careers", href: "#" },
      { name: "Press", href: "#" }
    ],
    resources: [
      { name: "Blog", href: "#" },
      { name: "Help Center", href: "#" },
      { name: "Contact Us", href: "#" },
      { name: "Privacy Policy", href: "#" }
    ],
    courses: [
      { name: "Web Development", href: "#" },
      { name: "Data Science", href: "#" },
      { name: "Digital Marketing", href: "#" },
      { name: "UI/UX Design", href: "#" }
    ],
    support: [
      { name: "Help Center", href: "#" },
      { name: "Contact Support", href: "#" },
      { name: "Community", href: "#" },
      { name: "Feedback", href: "#" }
    ]
  };

  const socialLinks = [
    { icon: <FaFacebook />, href: "#", label: "Facebook" },
    { icon: <FaTwitter />, href: "#", label: "Twitter" },
    { icon: <FaInstagram />, href: "#", label: "Instagram" },
    { icon: <FaLinkedin />, href: "#", label: "LinkedIn" },
    { icon: <FaYoutube />, href: "#", label: "YouTube" }
  ];

  return (
    <footer className="bg-[rgb(235, 237, 223)rgb(235, 237, 223)] text-gray-800">
      <div className="container mx-auto px-4 py-12">
        <div className="grid lg:grid-cols-5 gap-8">
          {/* Company Info */}
          <div className="lg:col-span-2">
            <div className="mb-6">
              <h3 className="text-2xl font-bold text-[#333A2F] mb-4">
                LearnSphere
              </h3>
              <p className="text-gray-600 leading-relaxed mb-6">
                Empowering learners worldwide with accessible, high-quality education. 
                Join our community and unlock your potential with expert-led courses.
              </p>
            </div>

            {/* Contact Info */}
            <div className="space-y-3 mb-6">
              <div className="flex items-center space-x-3">
                <FaEnvelope className="text-[#333A2F]" />
                <span className="text-gray-600">learnsphere@kce.ac.in</span>
              </div>
              <div className="flex items-center space-x-3">
                <FaPhone className="text-[#333A2F]" />
                <span className="text-gray-600">91 7339390000</span>
              </div>
              <div className="flex items-center space-x-3">
                <FaMapMarkerAlt className="text-[#333A2F]" />
                <span className="text-gray-600">C Block , Kce , Othakalmandapam</span>
              </div>
            </div>

            {/* Social Links */}
            <div className="flex space-x-4">
              {socialLinks.map((social, index) => (
                <a
                  key={index}
                  href={social.href}
                  className="w-10 h-10 bg-[#333A2F] text-white rounded-full flex items-center justify-center hover:bg-[#2a3028] transition-colors"
                  aria-label={social.label}
                >
                  {social.icon}
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-lg font-bold text-[#333A2F] mb-4">Company</h4>
            <ul className="space-y-2">
              {footerLinks.company.map((link, index) => (
                <li key={index}>
                  <a 
                    href={link.href} 
                    className="text-gray-600 hover:text-[#333A2F] transition-colors"
                  >
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-lg font-bold text-[#333A2F] mb-4">Resources</h4>
            <ul className="space-y-2">
              {footerLinks.resources.map((link, index) => (
                <li key={index}>
                  <a 
                    href={link.href} 
                    className="text-gray-600 hover:text-[#333A2F] transition-colors"
                  >
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-lg font-bold text-[#333A2F] mb-4">Courses</h4>
            <ul className="space-y-2">
              {footerLinks.courses.map((link, index) => (
                <li key={index}>
                  <a 
                    href={link.href} 
                    className="text-gray-600 hover:text-[#333A2F] transition-colors"
                  >
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Newsletter Signup */}
        <div className="mt-12 pt-8 border-t border-gray-300">
          <div className="bg-white rounded-xl p-6">
            <div className="text-center">
              <h3 className="text-xl font-bold text-[#333A2F] mb-2">
                Stay Updated
              </h3>
              <p className="text-gray-600 mb-4">
                Subscribe to our newsletter for the latest courses and learning tips.
              </p>
              <div className="flex flex-col sm:flex-row max-w-md mx-auto">
                <input
                  type="email"
                  placeholder="Enter your email"
                  className="flex-1 px-4 py-3 border border-gray-300 rounded-l-lg focus:ring-2 focus:ring-[#333A2F] focus:border-transparent transition-colors"
                />
                <button className="px-6 py-3 bg-[#333A2F] text-white rounded-r-lg font-medium hover:bg-[#2a3028] transition-colors cursor-pointer">
                  Subscribe
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-8 pt-8 border-t border-gray-300">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-gray-600 text-sm">
              © {currentYear} LearnSphere. All rights reserved.
            </p>
            <div className="flex space-x-6 mt-4 md:mt-0">
              <a href="#" className="text-gray-600 hover:text-[#333A2F] text-sm transition-colors">
                Privacy Policy
              </a>
              <a href="#" className="text-gray-600 hover:text-[#333A2F] text-sm transition-colors">
                Terms of Service
              </a>
              <a href="#" className="text-gray-600 hover:text-[#333A2F] text-sm transition-colors">
                Cookie Policy
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;