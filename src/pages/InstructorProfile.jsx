import React, { useState } from 'react';
import { FaLinkedin, FaGithub, FaTwitter } from 'react-icons/fa';
import { readJsonFromLocalStorage } from '../utils/safeJsonParse';

const InstructorProfile = (props) => {
  // If props.profile is passed, use it; otherwise, try to load from localStorage
  const initialProfile = props.profile || readJsonFromLocalStorage('instructorData', {});
  const [profile, setProfile] = useState(initialProfile);
  const [isEditing, setIsEditing] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProfile((prev) => ({ ...prev, [name]: value }));
  };

  const handleSave = () => {
    // Save to instructorData and user
    localStorage.setItem('instructorData', JSON.stringify(profile));
    localStorage.setItem('user', JSON.stringify(profile));
    // Update users array
    const users = readJsonFromLocalStorage('users', []);
    const idx = users.findIndex(u => u.email === profile.email);
    if (idx !== -1) {
      users[idx] = profile;
      localStorage.setItem('users', JSON.stringify(users));
    }
    setIsEditing(false);
  };

  const renderInfoField = (label, value) => (
    <div className="space-y-2">
      <label className="block text-sm font-medium text-gray-700">{label}</label>
      <div className="px-4 py-2 bg-gray-50 rounded-lg text-gray-800">{value}</div>
    </div>
  );

  const renderInputField = (label, name, value, type = 'text') => (
    <div className="space-y-2">
      <label className="block text-sm font-medium text-gray-700">{label}</label>
      <input
        type={type}
        name={name}
        value={value || ''}
        onChange={handleChange}
        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
      />
    </div>
  );

  if (!profile) return <div>Loading...</div>;

  return (
    <div className="min-h-screen p-6 mt-20">
      <div className="max-w-7xl mx-auto">
        <p className="text-2xl font-bold text-gray-800 mb-6">Instructor Profile</p>
        <div className="flex min-h-[600px] bg-white rounded-lg shadow-lg overflow-hidden">
          {/* --- LEFT PANEL --- */}
          <div className="w-1/3 bg-[#EBEDDF] p-6 relative">
            {!isEditing && (
              <button className="absolute top-4 right-4 w-8 h-8 bg-white rounded-full flex items-center justify-center shadow-md cursor-pointer" onClick={() => setIsEditing(true)}>
                <svg className="w-4 h-4 text-[#333A2F]" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M15.232 5.232l3.536 3.536M9 13l6.586-6.586a2 2 0 112.828 2.828L11.828 15.828a4 4 0 01-2.828 1.172H7v-2a4 4 0 011.172-2.828z" /></svg>
              </button>
            )}
            <div className="flex flex-col items-center text-center">
              <div className="relative mb-4"><div className="w-32 h-32 rounded-full overflow-hidden border-4 border-white shadow-lg"><img src={profile.profileImage || 'https://i.pravatar.cc/300'} alt="Profile" className="w-full h-full object-cover" /></div></div>
              <h2 className="text-2xl font-bold text-gray-800">{profile.fullName}</h2>
              <p className="text-sm text-gray-600 mb-4">{profile.email}</p>
              <div className="w-full text-left my-4">
                <h3 className="text-lg font-semibold text-gray-700 mb-2">About Me</h3>
                <p className="text-sm text-gray-800">{profile.about}</p>
              </div>
              <div className="w-full text-left my-4">
                <h3 className="text-lg font-semibold text-gray-700 mb-3">Skills</h3>
                <div className="flex flex-wrap gap-2">{profile.skills?.map((skill, i) => <span key={i} className="bg-white px-3 py-1 rounded-full text-sm shadow-sm">{skill}</span>)}</div>
              </div>
              <div className="mt-4 flex justify-center gap-4">
                {profile.linkedin && <a href={profile.linkedin} target="_blank" rel="noopener noreferrer"><FaLinkedin size={24} /></a>}
                {profile.github && <a href={profile.github} target="_blank" rel="noopener noreferrer"><FaGithub size={24} /></a>}
                {profile.twitter && <a href={profile.twitter} target="_blank" rel="noopener noreferrer"><FaTwitter size={24} /></a>}
              </div>
            </div>
          </div>
          {/* --- RIGHT PANEL --- */}
          <div className="w-2/3 bg-white p-8 overflow-y-auto">
            <h1 className="text-2xl font-bold text-gray-800 mb-6">Profile Settings</h1>
            {isEditing ? (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {renderInputField('Full Name', 'fullName', profile.fullName)}
                {renderInputField('Email', 'email', profile.email, 'email')}
                {renderInputField('Phone', 'phone', profile.phone)}
                {renderInputField('Website', 'website', profile.website, 'url')}
                <div className="md:col-span-2">{renderInputField('Address', 'address', profile.address)}</div>
                {renderInputField('About', 'about', profile.about)}
                <h3 className="md:col-span-2 text-xl font-bold text-gray-800 mt-4 -mb-2">Instructor Details</h3>
                {renderInputField('Highest Qualification', 'highestQualification', profile.highestQualification)}
                {renderInputField('Years of Experience', 'yearsOfExperience', profile.yearsOfExperience)}
                {renderInputField('Area of Interest', 'areaOfInterest', profile.areaOfInterest)}
                <div className="md:col-span-2">{renderInputField('LinkedIn Profile', 'linkedin', profile.linkedin, 'url')}</div>
                <h3 className="md:col-span-2 text-xl font-bold text-gray-800 mt-4 -mb-2">Bank Details</h3>
                {renderInputField('Bank Holder Name', 'bankHolderName', profile.bankHolderName)}
                {renderInputField('Account Number', 'accountNumber', profile.accountNumber)}
                {renderInputField('IFSC Code', 'ifscCode', profile.ifscCode)}
                <div className="md:col-span-2 mt-4">
                              <button className="bg-[#333A2F] text-white px-6 py-2 rounded-lg cursor-pointer" onClick={handleSave}>Save Changes</button>
            <button className="ml-4 bg-gray-300 text-gray-800 px-6 py-2 rounded-lg cursor-pointer" onClick={() => setIsEditing(false)}>Cancel</button>
                </div>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {renderInfoField('Phone', profile.phone)}
                {renderInfoField('Website', profile.website)}
                <div className="md:col-span-2">{renderInfoField('Address', profile.address)}</div>
                <h3 className="md:col-span-2 text-xl font-bold text-gray-800 mt-4 -mb-2">Instructor Details</h3>
                {renderInfoField('Highest Qualification', profile.highestQualification)}
                {renderInfoField('Years of Experience', `${profile.yearsOfExperience || 0} years`)}
                {renderInfoField('Area of Interest', profile.areaOfInterest)}
                <div className="md:col-span-2 mt-4">
                  <label className="block text-sm font-medium text-gray-700">Certifications</label>
                  <div className="space-y-2 mt-2">
                    {profile.certificates?.map((cert, index) => (
                      <div key={index} className="p-3 rounded border bg-gray-50 flex justify-between items-center">
                        <span>{cert.name}</span>
                        <span className="text-sm text-gray-500">ID: {cert.referenceId}</span>
                      </div>
                    ))}
                  </div>
                </div>
                <h3 className="md:col-span-2 text-xl font-bold text-gray-800 mt-4 -mb-2">Bank Details</h3>
                {renderInfoField('Bank Holder Name', profile.bankHolderName)}
                {renderInfoField('Account Number', profile.accountNumber)}
                {renderInfoField('IFSC Code', profile.ifscCode)}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default InstructorProfile; 