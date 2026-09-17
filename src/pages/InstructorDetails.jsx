import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaPlus, FaTrash, FaArrowLeft } from "react-icons/fa";
import { readJsonFromLocalStorage } from "../utils/safeJsonParse";

const InstructorDetails = () => {
  const navigate = useNavigate();

  const toast = (options) => {
    alert(`${options.title}: ${options.description}`);
  };

  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState({
    dob: "",
    contactNumber: "",
    highestQualification: "",
    areaOfInterest: "",
    yearsOfExperience: "",
    linkedin: "",
    github: "",
    portfolio: "",
    twitter: "",
    address: "",
    certificates: [{ name: "", referenceId: "" }],
    bankHolderName: "",
    accountNumber: "",
    ifscCode: "",
    panNumber: "",
    aadharNumber: "",
    skills: [""],
    about: "",
    description: ""
  });

  const handleInputChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleSkillChange = (index, value) => {
    const newSkills = [...formData.skills];
    newSkills[index] = value;
    setFormData(prev => ({
      ...prev,
      skills: newSkills
    }));
  };

  const addSkill = () => {
    setFormData(prev => ({
      ...prev,
      skills: [...prev.skills, ""]
    }));
  };

  const removeSkill = (index) => {
    if (formData.skills.length > 1) {
      const newSkills = formData.skills.filter((_, i) => i !== index);
      setFormData(prev => ({
        ...prev,
        skills: newSkills
      }));
    }
  };

  const handleCertificateChange = (index, field, value) => {
    const newCertificates = [...formData.certificates];
    newCertificates[index] = { ...newCertificates[index], [field]: value };
    setFormData(prev => ({
      ...prev,
      certificates: newCertificates
    }));
  };

  const addCertificate = () => {
    setFormData(prev => ({
      ...prev,
      certificates: [...prev.certificates, { name: "", referenceId: "" }]
    }));
  };

  const removeCertificate = (index) => {
    if (formData.certificates.length > 1) {
      const newCertificates = formData.certificates.filter((_, i) => i !== index);
      setFormData(prev => ({
        ...prev,
        certificates: newCertificates
      }));
    }
  };

  const validateStep = (step) => {
    switch (step) {
      case 1:
        return formData.dob && formData.contactNumber && formData.highestQualification && 
               formData.areaOfInterest && formData.yearsOfExperience && formData.address;
      case 2:
        return formData.certificates.every(cert => cert.name && cert.referenceId) &&
               formData.skills.every(skill => skill.trim() !== "") &&
               formData.about && formData.description;
      case 3:
        return formData.bankHolderName && formData.accountNumber && formData.ifscCode &&
               formData.panNumber && formData.aadharNumber;
      default:
        return false;
    }
  };

  const nextStep = () => {
    if (validateStep(currentStep)) {
      setCurrentStep(prev => prev + 1);
    } else {
      toast({
        title: "Error",
        description: "Please fill in all required fields",
        variant: "destructive"
      });
    }
  };

  const prevStep = () => {
    setCurrentStep(prev => prev - 1);
  };

  const handleSubmit = () => {
    if (validateStep(3)) {
      // Get signup data
      const signupData = readJsonFromLocalStorage('signupData', {});
      
      // Combine all data
      const completeData = {
        ...signupData,
        ...formData
      };
      
      // Store complete instructor data
      localStorage.setItem('instructorData', JSON.stringify(completeData));
      
      // ALSO, create the user session object so the profile page knows we are logged in.
      localStorage.setItem('user', JSON.stringify(completeData));
      // Add instructor to users array for login
      const users = readJsonFromLocalStorage('users', []);
      users.push(completeData);
      localStorage.setItem('users', JSON.stringify(users));
      
      toast({
        title: "Success",
        description: "Instructor details saved successfully!"
      });
      
      navigate('/login');
    } else {
      toast({
        title: "Error",
        description: "Please fill in all required fields",
        variant: "destructive"
      });
    }
  };

  const renderStep1 = () => (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label htmlFor="dob" className="block text-sm font-medium text-gray-700">Date of Birth *</label>
          <input
            type="date"
            id="dob"
            value={formData.dob}
            onChange={(e) => handleInputChange('dob', e.target.value)}
            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
            required
          />
        </div>
        <div>
          <label htmlFor="contact" className="block text-sm font-medium text-gray-700">Contact Number *</label>
          <input
            type="tel"
            id="contact"
            placeholder="Enter contact number"
            value={formData.contactNumber}
            onChange={(e) => handleInputChange('contactNumber', e.target.value)}
            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
            required
          />
        </div>
      </div>

      <div>
        <label htmlFor="qualification" className="block text-sm font-medium text-gray-700">Highest Qualification *</label>
        <input
          type="text"
          id="qualification"
          placeholder="Enter highest qualification"
          value={formData.highestQualification}
          onChange={(e) => handleInputChange('highestQualification', e.target.value)}
          className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
          required
        />
      </div>

      <div>
        <label htmlFor="interest" className="block text-sm font-medium text-gray-700">Area of Interest *</label>
        <input
          type="text"
          id="interest"
          placeholder="Enter area of interest"
          value={formData.areaOfInterest}
          onChange={(e) => handleInputChange('areaOfInterest', e.target.value)}
          className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
          required
        />
      </div>

      <div>
        <label htmlFor="experience" className="block text-sm font-medium text-gray-700">Years of Experience *</label>
        <input
          type="number"
          id="experience"
          placeholder="Enter years of experience"
          value={formData.yearsOfExperience}
          onChange={(e) => handleInputChange('yearsOfExperience', e.target.value)}
          className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
          required
        />
      </div>

      <div>
        <label htmlFor="address" className="block text-sm font-medium text-gray-700">Address *</label>
        <textarea
          id="address"
          placeholder="Enter complete address"
          value={formData.address}
          onChange={(e) => handleInputChange('address', e.target.value)}
          className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
          required
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label htmlFor="linkedin" className="block text-sm font-medium text-gray-700">LinkedIn Profile</label>
          <input
            type="url"
            id="linkedin"
            placeholder="LinkedIn URL"
            value={formData.linkedin}
            onChange={(e) => handleInputChange('linkedin', e.target.value)}
            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
          />
        </div>
        <div>
          <label htmlFor="github" className="block text-sm font-medium text-gray-700">GitHub Profile</label>
          <input
            type="url"
            id="github"
            placeholder="GitHub URL"
            value={formData.github}
            onChange={(e) => handleInputChange('github', e.target.value)}
            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label htmlFor="portfolio" className="block text-sm font-medium text-gray-700">Portfolio Link</label>
          <input
            type="url"
            id="portfolio"
            placeholder="Portfolio URL"
            value={formData.portfolio}
            onChange={(e) => handleInputChange('portfolio', e.target.value)}
            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
          />
        </div>
        <div>
          <label htmlFor="twitter" className="block text-sm font-medium text-gray-700">Twitter Profile</label>
          <input
            type="url"
            id="twitter"
            placeholder="Twitter URL"
            value={formData.twitter}
            onChange={(e) => handleInputChange('twitter', e.target.value)}
            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
          />
        </div>
      </div>
    </div>
  );

  const renderStep2 = () => (
    <div className="space-y-6">
      <div>
        <label className="block text-sm font-medium text-gray-700">Certifications *</label>
        {formData.certificates.map((cert, index) => (
          <div key={index} className="flex gap-2 mb-2">
            <input
              type="text"
              placeholder="Certificate name"
              value={cert.name}
              onChange={(e) => handleCertificateChange(index, 'name', e.target.value)}
              className="block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
            />
            <input
              type="text"
              placeholder="Reference ID"
              value={cert.referenceId}
              onChange={(e) => handleCertificateChange(index, 'referenceId', e.target.value)}
              className="block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
            />
            <button
              type="button"
              onClick={() => removeCertificate(index)}
              disabled={formData.certificates.length === 1}
              className="inline-flex items-center px-2 py-1 border border-gray-300 shadow-sm text-xs font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50"
            >
              <FaTrash />
            </button>
          </div>
        ))}
        <button type="button" onClick={addCertificate} className="inline-flex items-center px-2 py-1 border border-gray-300 shadow-sm text-xs font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">
          <FaPlus className="mr-1" />
          Add Certificate
        </button>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">Skills *</label>
        {formData.skills.map((skill, index) => (
          <div key={index} className="flex gap-2 mb-2">
            <input
              type="text"
              placeholder="Enter skill"
              value={skill}
              onChange={(e) => handleSkillChange(index, e.target.value)}
              className="block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
            />
            <button
              type="button"
              onClick={() => removeSkill(index)}
              disabled={formData.skills.length === 1}
              className="inline-flex items-center px-2 py-1 border border-gray-300 shadow-sm text-xs font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50"
            >
              <FaTrash />
            </button>
          </div>
        ))}
        <button type="button" onClick={addSkill} className="inline-flex items-center px-2 py-1 border border-gray-300 shadow-sm text-xs font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">
          <FaPlus className="mr-1" />
          Add Skill
        </button>
      </div>

      <div>
        <label htmlFor="about" className="block text-sm font-medium text-gray-700">About *</label>
        <textarea
          id="about"
          placeholder="Tell us about yourself"
          value={formData.about}
          onChange={(e) => handleInputChange('about', e.target.value)}
          className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
          required
        />
      </div>

      <div>
        <label htmlFor="description" className="block text-sm font-medium text-gray-700">Description *</label>
        <textarea
          id="description"
          placeholder="Detailed description"
          value={formData.description}
          onChange={(e) => handleInputChange('description', e.target.value)}
          className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
          required
        />
      </div>
    </div>
  );

  const renderStep3 = () => (
    <div className="space-y-6">
      <div>
        <label htmlFor="bankHolder" className="block text-sm font-medium text-gray-700">Bank Holder Name *</label>
        <input
          type="text"
          id="bankHolder"
          placeholder="Enter bank holder name"
          value={formData.bankHolderName}
          onChange={(e) => handleInputChange('bankHolderName', e.target.value)}
          className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
          required
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label htmlFor="account" className="block text-sm font-medium text-gray-700">Account Number *</label>
          <input
            type="text"
            id="account"
            placeholder="Enter account number"
            value={formData.accountNumber}
            onChange={(e) => handleInputChange('accountNumber', e.target.value)}
            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
            required
          />
        </div>
        <div>
          <label htmlFor="ifsc" className="block text-sm font-medium text-gray-700">IFSC Code *</label>
          <input
            type="text"
            id="ifsc"
            placeholder="Enter IFSC code"
            value={formData.ifscCode}
            onChange={(e) => handleInputChange('ifscCode', e.target.value)}
            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
            required
          />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label htmlFor="pan" className="block text-sm font-medium text-gray-700">PAN Number *</label>
          <input
            type="text"
            id="pan"
            placeholder="Enter PAN number"
            value={formData.panNumber}
            onChange={(e) => handleInputChange('panNumber', e.target.value)}
            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
            required
          />
        </div>
        <div>
          <label htmlFor="aadhar" className="block text-sm font-medium text-gray-700">Aadhar Number *</label>
          <input
            type="text"
            id="aadhar"
            placeholder="Enter Aadhar number"
            value={formData.aadharNumber}
            onChange={(e) => handleInputChange('aadharNumber', e.target.value)}
            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
            required
          />
        </div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen" style={{ backgroundColor: '#EBEDDF' }}>
      <div className="container mx-auto px-4 py-8">
        <button
          type="button"
          onClick={() => navigate('/signup')}
          className="mb-6 inline-flex items-center px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          style={{ color: '#333A2F' }}
        >
          <FaArrowLeft className="mr-2" />
          Back to Signup
        </button>

        <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-md">
          <div className="p-6">
            <h2 className="text-center text-2xl font-bold" style={{ color: '#333A2F' }}>
              Instructor Details - Step {currentStep} of 3
            </h2>
            
            {/* Progress bar */}
            <div className="w-full bg-gray-200 rounded-full h-2 mt-4">
              <div
                className="h-2 rounded-full transition-all duration-300"
                style={{
                  backgroundColor: '#333A2F',
                  width: `${(currentStep / 3) * 100}%`
                }}
              />
            </div>
          </div>

          <div className="p-6">
            {currentStep === 1 && (
              <>
                <h3 className="text-lg font-semibold mb-4" style={{ color: '#333A2F' }}>
                  Personal & Professional Information
                </h3>
                {renderStep1()}
              </>
            )}

            {currentStep === 2 && (
              <>
                <h3 className="text-lg font-semibold mb-4" style={{ color: '#333A2F' }}>
                  Certifications & Skills
                </h3>
                {renderStep2()}
              </>
            )}

            {currentStep === 3 && (
              <>
                <h3 className="text-lg font-semibold mb-4" style={{ color: '#333A2F' }}>
                  Payment Details
                </h3>
                {renderStep3()}
              </>
            )}

            {/* Navigation buttons */}
            <div className="flex justify-between mt-8">
              <button
                type="button"
                onClick={prevStep}
                disabled={currentStep === 1}
                className="inline-flex items-center px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#333A2F] disabled:opacity-50"
                style={{ borderColor: '#333A2F', color: '#333A2F' }}
              >
                Previous
              </button>

              {currentStep < 3 ? (
                <button
                  type="button"
                  onClick={nextStep}
                  className="inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white"
                  style={{ backgroundColor: '#333A2F' }}
                >
                  Next
                </button>
              ) : (
                <button
                  type="button"
                  onClick={handleSubmit}
                  className="inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white"
                  style={{ backgroundColor: '#333A2F' }}
                >
                  Complete Registration
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default InstructorDetails; 