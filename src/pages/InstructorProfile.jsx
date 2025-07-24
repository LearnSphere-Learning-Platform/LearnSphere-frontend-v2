import React from 'react';
import { FaLinkedin, FaGithub, FaTwitter } from 'react-icons/fa';

// A component dedicated to showing only the instructor-specific fields.
const InstructorProfile = ({ profile, isEditing, handleChange }) => {

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

  if (isEditing) {
    return (
      <>
        {renderInputField('Highest Qualification', 'highestQualification', profile.highestQualification)}
        {renderInputField('Years of Experience', 'yearsOfExperience', profile.yearsOfExperience)}
        {renderInputField('Area of Interest', 'areaOfInterest', profile.areaOfInterest)}
        
        {/* Bank Details Editing */}
        <div className="md:col-span-2 mt-4">
            <h3 className="text-lg font-semibold text-gray-700 mb-3">Bank Details</h3>
            {renderInputField('Bank Holder Name', 'bankHolderName', profile.bankHolderName)}
            {renderInputField('Account Number', 'accountNumber', profile.accountNumber)}
            {renderInputField('IFSC Code', 'ifscCode', profile.ifscCode)}
        </div>
        
        <div className="md:col-span-2">{renderInputField('LinkedIn Profile', 'linkedin', profile.linkedin, 'url')}</div>
        <div className="md:col-span-2">{renderInputField('GitHub Profile', 'github', profile.github, 'url')}</div>
        <div className="md:col-span-2">{renderInputField('Twitter Profile', 'twitter', profile.twitter, 'url')}</div>
      </>
    );
  }

  return (
    <>
      {renderInfoField('Highest Qualification', profile.highestQualification)}
      {renderInfoField('Years of Experience', `${profile.yearsOfExperience || 0} years`)}
      {renderInfoField('Area of Interest', profile.areaOfInterest)}
      
      {/* Bank Details Display */}
      <div className="md:col-span-2 mt-4">
        <h3 className="text-lg font-semibold text-gray-700 mb-3">Bank Details</h3>
        {renderInfoField('Bank Holder Name', profile.bankHolderName)}
        {renderInfoField('Account Number', profile.accountNumber)}
        {renderInfoField('IFSC Code', profile.ifscCode)}
      </div>

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
      <div className="md:col-span-2 mt-4">
        <h3 className="text-lg font-semibold text-gray-700 mb-3">Social Links</h3>
        <div className="flex gap-4">
            {profile.linkedin && <a href={profile.linkedin} target="_blank" rel="noopener noreferrer"><FaLinkedin size={24} /></a>}
            {profile.github && <a href={profile.github} target="_blank" rel="noopener noreferrer"><FaGithub size={24} /></a>}
            {profile.twitter && <a href={profile.twitter} target="_blank" rel="noopener noreferrer"><FaTwitter size={24} /></a>}
        </div>
      </div>
    </>
  );
};

export default InstructorProfile; 