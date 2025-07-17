import React, { useState } from "react";
import { Pencil } from "lucide-react";

const Profile = () => {
  const [formData, setFormData] = useState({
    profileImage: "https://i.pravatar.cc/300?img=13",
    firstName: "John",
    lastName: "Doe",
    email: "john.doe@example.com",
    phone: "123-456-7890",
    address: "123 Main St, Cityville",
    website: "https://johndoe.dev",
    about: "Passionate developer with experience in React and Node.js.",
    skills: ["React", "Node.js", "CSS"]
  });

  const [isEditing, setIsEditing] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSave = () => {
    setIsEditing(false);
  };

  const handleEdit = () => {
    setIsEditing(true);
  };

  return (
    <div className="min-h-screen p-6 mt-20">
      <div className="max-w-7xl mx-auto">
        <p className="text-2xl font-bold text-gray-800 mb-6">Profile Details</p>
        <div className="flex min-h-[600px] bg-white rounded-lg shadow-lg overflow-hidden">
          {/* LEFT PANEL - 1/4 width */}
          <div className="w-1/4 bg-[#EBEDDF] p-6 relative">
            {!isEditing && (
              <button 
                className="absolute top-4 right-4 w-8 h-8 bg-white rounded-full flex items-center justify-center shadow-md hover:shadow-lg transition-shadow"
                onClick={handleEdit}
              >
                <Pencil className="w-4 h-4 text-[#333A2F]" />
              </button>
            )}
            
            <div className="flex flex-col items-center">
              <div className="relative mb-6">
                <div className="w-32 h-32 rounded-full overflow-hidden border-4 border-white shadow-lg">
                  <img
                    src={formData.profileImage}
                    alt="Profile"
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>

              <h2 className="text-xl font-bold text-gray-800 mb-2 text-center">
                {formData.firstName} {formData.lastName}
              </h2>
              
              <a 
                href={formData.website} 
                className="text-blue-600 hover:text-blue-800 text-sm mb-6 hover:underline"
                target="_blank"
                rel="noopener noreferrer"
              >
                {formData.website}
              </a>

              <div className="w-full">
                <h3 className="text-lg font-semibold text-gray-700 mb-3">Skills</h3>
                <div className="flex flex-wrap gap-2">
                  {formData.skills.map((skill, i) => (
                    <span 
                      key={i}
                      className="bg-white px-3 py-1 rounded-full text-sm text-gray-700 shadow-sm"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* RIGHT PANEL - 3/4 width */}
          <div className="w-3/4 bg-white p-8">
            <h1 className="text-2xl font-bold text-gray-800 mb-6">Profile Info</h1>
            
            {isEditing ? (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="block text-sm font-medium text-gray-700">
                    First Name
                  </label>
                  <input
                    type="text"
                    name="firstName"
                    value={formData.firstName}
                    onChange={handleChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
                
                <div className="space-y-2">
                  <label className="block text-sm font-medium text-gray-700">
                    Last Name
                  </label>
                  <input
                    type="text"
                    name="lastName"
                    value={formData.lastName}
                    onChange={handleChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
                
                <div className="space-y-2">
                  <label className="block text-sm font-medium text-gray-700">
                    Email
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
                
                <div className="space-y-2">
                  <label className="block text-sm font-medium text-gray-700">
                    Phone
                  </label>
                  <input
                    type="text"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
                
                <div className="md:col-span-2 space-y-2">
                  <label className="block text-sm font-medium text-gray-700">
                    Address
                  </label>
                  <input
                    type="text"
                    name="address"
                    value={formData.address}
                    onChange={handleChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
                
                <div className="md:col-span-2 space-y-2">
                  <label className="block text-sm font-medium text-gray-700">
                    Website
                  </label>
                  <input
                    type="text"
                    name="website"
                    value={formData.website}
                    onChange={handleChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
                
                <div className="md:col-span-2 space-y-2">
                  <label className="block text-sm font-medium text-gray-700">
                    About
                  </label>
                  <textarea
                    name="about"
                    value={formData.about}
                    onChange={handleChange}
                    rows={4}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
                  />
                </div>
                
                <div className="md:col-span-2 space-y-2">
                  <label className="block text-sm font-medium text-gray-700">
                    Skills (comma separated)
                  </label>
                  <input
                    type="text"
                    name="skills"
                    value={formData.skills.join(", ")}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        skills: e.target.value.split(",").map((s) => s.trim())
                      })
                    }
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
                
                <div className="md:col-span-2">
                  <button 
                    className="bg-[#333A2F] text-white px-6 py-2 rounded-lg hover:bg-[#222] transition-colors"
                    onClick={handleSave}
                  >
                    Save Changes
                  </button>
                </div>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="block text-sm font-medium text-gray-700">
                    First Name
                  </label>
                  <div className="px-4 py-2 bg-gray-50 rounded-lg text-gray-800">
                    {formData.firstName}
                  </div>
                </div>
                
                <div className="space-y-2">
                  <label className="block text-sm font-medium text-gray-700">
                    Last Name
                  </label>
                  <div className="px-4 py-2 bg-gray-50 rounded-lg text-gray-800">
                    {formData.lastName}
                  </div>
                </div>
                
                <div className="space-y-2">
                  <label className="block text-sm font-medium text-gray-700">
                    Email
                  </label>
                  <div className="px-4 py-2 bg-gray-50 rounded-lg text-gray-800">
                    {formData.email}
                  </div>
                </div>
                
                <div className="space-y-2">
                  <label className="block text-sm font-medium text-gray-700">
                    Phone
                  </label>
                  <div className="px-4 py-2 bg-gray-50 rounded-lg text-gray-800">
                    {formData.phone}
                  </div>
                </div>
                
                <div className="md:col-span-2 space-y-2">
                  <label className="block text-sm font-medium text-gray-700">
                    Address
                  </label>
                  <div className="px-4 py-2 bg-gray-50 rounded-lg text-gray-800">
                    {formData.address}
                  </div>
                </div>
                
                <div className="md:col-span-2 space-y-2">
                  <label className="block text-sm font-medium text-gray-700">
                    Website
                  </label>
                  <div className="px-4 py-2 bg-gray-50 rounded-lg text-gray-800">
                    {formData.website}
                  </div>
                </div>
                
                <div className="md:col-span-2 space-y-2">
                  <label className="block text-sm font-medium text-gray-700">
                    About
                  </label>
                  <div className="px-4 py-2 bg-gray-50 rounded-lg text-gray-800">
                    {formData.about}
                  </div>
                </div>
                
                <div className="md:col-span-2 space-y-2">
                  <label className="block text-sm font-medium text-gray-700">
                    Skills
                  </label>
                  <div className="px-4 py-2 bg-gray-50 rounded-lg text-gray-800">
                    {formData.skills.join(", ")}
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile; 