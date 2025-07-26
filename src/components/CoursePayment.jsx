"use client"

import { useState, useEffect } from "react"
import { CreditCard, Lock, CheckCircle, Clock, Users, Award, Star, Play, ChevronDown } from "lucide-react"
import courseData from "../catalog/CourseData"
import { Country, State, City } from 'country-state-city';



const CoursePayment = (props) => {
  const [isProcessing, setIsProcessing] = useState(false)
  const [selectedCountry, setSelectedCountry] = useState("")
  const [selectedState, setSelectedState] = useState("")
  const [selectedCity, setSelectedCity] = useState("")
  const [showCountryDropdown, setShowCountryDropdown] = useState(false)
  const [showStateDropdown, setShowStateDropdown] = useState(false)
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState("card");
  const [step, setStep] = useState(1);
  const [receiptNumber, setReceiptNumber] = useState("");

  useEffect(() => {
    // Generate a random receipt number when the component mounts or step changes to 2
    if (step === 2 && !receiptNumber) {
      const randomReceipt = `RCPT-${Math.floor(100000 + Math.random() * 900000)}`;
      setReceiptNumber(randomReceipt);
    }
  }, [step, receiptNumber]);

  // Use the passed-in course prop if available, otherwise fallback to the first course
  const course = props.course || courseData[0]

  // Defensive: handle missing or malformed course_content
  const courseContent = course && Array.isArray(course.course_content) ? course.course_content : [];
  const totalVideos = courseContent.reduce((total, session) => total + (session.videos ? session.videos.length : 0), 0)

  // Move these inside the component
  const countryOptions = Country.getAllCountries();
  const stateOptions = selectedCountry ? State.getStatesOfCountry(selectedCountry) : [];
  const cityOptions = selectedState ? City.getCitiesOfState(selectedCountry, selectedState) : [];

  const handleSubmit = async (e) => {
    e.preventDefault()
    setIsProcessing(true)
    // Simulate payment processing
    setTimeout(() => {
      setIsProcessing(false)
      alert("Payment successful! Welcome to the course!")
    }, 2000)
  }

  const handlePreview = () => {
    window.open(course.preview, "_blank")
  }

  // Format price in INR
  const formatRupees = (amount) => `₹${amount}`;

  return (
    <div className="min-h-screen mt-24 bg-[#EBEDDF] py-8 px-4 text-[#333A2F]">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-[#333A2F] mb-2">Complete Your Enrollment</h1>
          <p className="text-[#333A2F]">Join thousands of students and master React development</p>
        </div>

        <div className="grid lg:grid-cols-2 gap-8">
          {/* Course Information */}
          <div className="space-y-6">
            <div className="bg-white rounded-lg shadow-sm border border-gray-200">
              <div className="p-6 border-b border-gray-200">
                <div className="flex items-center justify-between mb-2">
                  <h2 className="text-xl font-semibold text-[#333A2F]">{course.course_name}</h2>
                  <span className="px-2 py-1 bg-[#EBEDDF] text-[#333A2F] text-sm rounded-md">Bestseller</span>
                </div>
                <p className="text-[#333A2F] mb-4">{course.description}</p>
                <div className="flex items-center space-x-4 text-sm text-[#333A2F]">
                  <div className="flex items-center">
                    <Star className="h-4 w-4 fill-yellow-400 text-yellow-400 mr-1" />
                    <span className="font-medium">{course.course_rating}</span>
                  </div>
                  <span>•</span>
                  <span className="font-medium">{course.level}</span>
                  <span>•</span>
                  <span>By {course.instructor.name}</span>
                </div>
              </div>
              <div className="p-6 space-y-4">
                <div className="relative">
                  <img
                    src="/placeholder.svg?height=200&width=400"
                    alt="Course preview"
                    className="w-full h-48 object-cover rounded-lg"
                  />
                  <button
                    onClick={handlePreview}
                    className="absolute inset-0 m-auto w-16 h-16 rounded-full bg-[#EBEDDF] hover:bg-white text-[#333A2F] flex items-center justify-center transition-colors"
                  >
                    <Play className="h-6 w-6 ml-1" />
                  </button>
                </div>

                <div className="grid grid-cols-3 gap-4 text-center">
                  <div className="flex flex-col items-center">
                    <Clock className="h-5 w-5 text-[#333A2F] mb-1" />
                    <span className="text-sm font-medium">{course.total_hours} Hours</span>
                    <span className="text-xs text-[#333A2F]">Video Content</span>
                  </div>
                  <div className="flex flex-col items-center">
                    <Users className="h-5 w-5 text-green-600 mb-1" />
                    <span className="text-sm font-medium">{totalVideos}</span>
                    <span className="text-xs text-[#333A2F]">Lessons</span>
                  </div>
                  <div className="flex flex-col items-center">
                    <Award className="h-5 w-5 text-purple-600 mb-1" />
                    <span className="text-sm font-medium">Certificate</span>
                    <span className="text-xs text-[#333A2F]">{course.certification ? "Included" : "Not Available"}</span>
                  </div>
                </div>

                <hr className="border-gray-200" />

                <div className="space-y-2">
                  <h4 className="font-semibold text-[#333A2F]">What you'll learn:</h4>
                  <ul className="space-y-1">
                    {course.outcome.map((outcome, index) => (
                      <li key={index} className="flex items-center text-sm text-[#333A2F]">
                        <CheckCircle className="h-4 w-4 text-green-500 mr-2 flex-shrink-0" />
                        {outcome}
                      </li>
                    ))}
                  </ul>
                </div>

                <hr className="border-gray-200" />

                <div className="space-y-2">
                  <h4 className="font-semibold text-[#333A2F]">Skills you'll gain:</h4>
                  <div className="flex flex-wrap gap-2">
                    {course.about_course.skills.map((skill, index) => (
                      <span
                        key={index}
                        className="px-2 py-1 bg-blue-50 text-blue-700 text-xs rounded-md border border-blue-200"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>

                <hr className="border-gray-200" />

                <div className="space-y-2">
                  <h4 className="font-semibold text-[#333A2F]">Course Structure:</h4>
                  <div className="space-y-2">
                    {courseContent.slice(0, 3).map((session, index) => (
                      <div key={index} className="text-sm">
                        <div className="font-medium text-[#333A2F]">{session.session}</div>
                        <div className="text-[#333A2F] text-xs">{session.module_description}</div>
                        <div className="text-[#333A2F] text-xs">{session.videos ? session.videos.length : 0} lessons</div>
                      </div>
                    ))}
                    {courseContent.length > 3 && (
                      <div className="text-sm text-[#333A2F]">+{courseContent.length - 3} more sessions</div>
                    )}
                  </div>
                </div>

                <hr className="border-gray-200" />

                <div className="space-y-2">
                  <h4 className="font-semibold text-[#333A2F]">Instructor:</h4>
                  <div className="flex items-center space-x-3">
                    <div className="w-12 h-12 bg-[#EBEDDF] rounded-full flex items-center justify-center">
                      <span className="text-[#333A2F] font-semibold text-lg">
                        {course.instructor.name
                          .split(" ")
                          .map((n) => n[0])
                          .join("")}
                      </span>
                    </div>
                    <div>
                      <div className="font-medium text-[#333A2F]">{course.instructor.name}</div>
                      <div className="text-sm text-[#333A2F]">{course.instructor.summary}</div>
                      <div className="flex items-center text-sm text-[#333A2F]">
                        <Star className="h-3 w-3 fill-yellow-400 text-yellow-400 mr-1" />
                        <span>
                          {course.instructor.overall_rating} • {course.instructor.no_of_courses_released} courses
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-lg shadow-sm border border-gray-200">
              <div className="p-6 border-b border-gray-200">
                <h3 className="text-lg font-semibold text-[#333A2F]">30-Day Money-Back Guarantee</h3>
              </div>
              <div className="p-6">
                <p className="text-sm text-[#333A2F]">
                  Not satisfied with the course? Get a full refund within 30 days of purchase, no questions asked.
                </p>
              </div>
            </div>
          </div>

          {/* Payment Form */}
          <div className="space-y-6">
            <div className="bg-white rounded-lg shadow-sm border border-gray-200">
              <div className="p-6 border-b border-gray-200">
                <h3 className="text-lg font-semibold text-[#333A2F] flex items-center">
                  <Lock className="h-5 w-5 mr-2" />
                  Secure Payment
                </h3>
                <p className="text-[#333A2F] text-sm mt-1">Your payment information is encrypted and secure</p>
              </div>
              <div className="p-6">
                <form onSubmit={handleSubmit} className="space-y-4">
                  {/* Pricing */}
                  <div className="bg-[#EBEDDF] p-4 rounded-lg">
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-lg font-semibold text-[#333A2F]">Course Fee</span>
                      <div className="text-right">
                        <span className="text-2xl font-bold text-blue-600">{formatRupees(course.price)}</span>
                        {course.original_price && (
                          <div className="text-sm text-[#333A2F] line-through">{formatRupees(course.original_price)}</div>
                        )}
                      </div>
                    </div>
                    <div className="text-xs text-[#333A2F] mt-1">
                      {course.total_hours} hours • {course.no_of_sessions} sessions • {course.no_of_tests_available}{" "}
                      tests
                    </div>
                  </div>

                  {/* Step 1: Payment Method Selection */}
                  {step === 1 && (
                    <div className="mb-6 flex flex-col items-center">
                      <div className="flex justify-center gap-4 mb-4">
                        <button
                          type="button"
                          className={`px-4 py-2 rounded-lg border transition-colors font-bold ${selectedPaymentMethod === "card" ? "bg-[#333A2F] text-white border-[#333A2F] shadow" : "bg-[#EBEDDF] text-[#333A2F] border-[#EBEDDF] hover:bg-[#D6D8C7] hover:text-white"}`}
                          onClick={() => setSelectedPaymentMethod("card")}
                        >
                          Pay with Card
                        </button>
                        <button
                          type="button"
                          className={`px-4 py-2 rounded-lg border transition-colors font-bold ${selectedPaymentMethod === "upi" ? "bg-[#333A2F] text-white border-[#333A2F] shadow" : "bg-[#EBEDDF] text-[#333A2F] border-[#EBEDDF] hover:bg-[#D6D8C7] hover:text-white"}`}
                          onClick={() => setSelectedPaymentMethod("upi")}
                        >
                          Pay with UPI
                        </button>
                        <button
                          type="button"
                          className={`px-4 py-2 rounded-lg border transition-colors font-bold ${selectedPaymentMethod === "qr" ? "bg-[#333A2F] text-white border-[#333A2F] shadow" : "bg-[#EBEDDF] text-[#333A2F] border-[#EBEDDF] hover:bg-[#D6D8C7] hover:text-white"}`}
                          onClick={() => setSelectedPaymentMethod("qr")}
                        >
                          Pay with QR Code
                        </button>
                      </div>
                      <button
                        type="button"
                        className="w-full max-w-xs py-3 bg-[#333A2F] text-white font-bold rounded-lg hover:bg-[#22261C] transition-colors shadow"
                        onClick={() => setStep(2)}
                      >
                        Proceed
                      </button>
                    </div>
                  )}
                  {/* Step 2: Show payment form for selected method */}
                  {step === 2 && (
                    <>
                      <button
                        type="button"
                        className="mb-4 px-4 py-2 rounded-lg border border-[#333A2F] text-[#333A2F] bg-[#EBEDDF] hover:bg-[#D6D8C7] transition-colors"
                        onClick={() => setStep(1)}
                      >
                        ← Back
                      </button>
                      {/* Receipt Number for all payment methods */}
                      <div className="space-y-2 mb-4">
                        <label htmlFor="receiptNumber" className="block text-sm font-medium text-blue-700">Receipt Number</label>
                        <input
                          id="receiptNumber"
                          type="text"
                          value={receiptNumber}
                          readOnly
                          className="w-full px-3 py-2 border border-blue-200 rounded-md shadow-sm bg-blue-50 text-blue-900 cursor-not-allowed"
                        />
                      </div>
                      {selectedPaymentMethod === "card" && (
                        <div className="space-y-4">
                          <div className="space-y-2">
                            <label htmlFor="cardNumber" className="block text-sm font-medium text-blue-700">
                              Card Number
                            </label>
                            <input
                              id="cardNumber"
                              type="text"
                              placeholder="1234 5678 9012 3456"
                              required
                              className="w-full px-3 py-2 border border-blue-200 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-blue-600 bg-blue-50 text-blue-900"
                            />
                          </div>
                          <div className="grid grid-cols-2 gap-4">
                            <div className="space-y-2">
                              <label htmlFor="expiry" className="block text-sm font-medium text-blue-700">
                                Expiry Date
                              </label>
                              <input
                                id="expiry"
                                type="text"
                                placeholder="MM/YY"
                                required
                                className="w-full px-3 py-2 border border-blue-200 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-blue-600 bg-blue-50 text-blue-900"
                              />
                            </div>
                            <div className="space-y-2">
                              <label htmlFor="cvc" className="block text-sm font-medium text-blue-700">
                                CVC
                              </label>
                              <input
                                id="cvc"
                                type="text"
                                placeholder="123"
                                required
                                className="w-full px-3 py-2 border border-blue-200 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-blue-600 bg-blue-50 text-blue-900"
                              />
                            </div>
                          </div>
                          <div className="space-y-2">
                            <label htmlFor="cardName" className="block text-sm font-medium text-blue-700">
                              Cardholder Name
                            </label>
                            <input
                              id="cardName"
                              type="text"
                              placeholder="John Doe"
                              required
                              className="w-full px-3 py-2 border border-blue-200 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-blue-600 bg-blue-50 text-blue-900"
                            />
                          </div>
                          {/* Billing Address and other fields remain as before */}
                          {/* Pin Code */}
                          <div className="grid grid-cols-2 gap-4">
                            <div className="space-y-2">
                              <label htmlFor="zip" className="block text-sm font-medium text-blue-700">Pin Code</label>
                              <input
                                id="zip"
                                type="text"
                                placeholder="123456"
                                required
                                className="w-full px-3 py-2 border border-blue-200 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-blue-600 bg-blue-50 text-blue-900"
                              />
                            </div>
                          </div>
                        </div>
                      )}
                      {selectedPaymentMethod === "upi" && (
                        <div className="space-y-4">
                          <label htmlFor="upiId" className="block text-sm font-medium text-blue-700">UPI ID</label>
                          <input
                            id="upiId"
                            type="text"
                            placeholder="yourname@bank"
                            required={selectedPaymentMethod === "upi"}
                            className="w-full px-3 py-2 border border-blue-200 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-blue-600 bg-blue-50 text-blue-900"
                          />
                          <button
                            type="submit"
                            className="w-full py-3 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 transition-colors shadow"
                            disabled={isProcessing}
                          >
                            {isProcessing ? "Processing..." : "Pay Now"}
                          </button>
                        </div>
                      )}
                      {selectedPaymentMethod === "qr" && (
                        <div className="flex flex-col items-center space-y-4">
                          <div className="w-40 h-40 bg-blue-100 border-2 border-blue-200 rounded-lg flex items-center justify-center">
                            <img src="/placeholder.svg?height=200&width=200" alt="QR Code" className="w-32 h-32 object-contain" />
                          </div>
                          <p className="text-blue-700">Scan this QR code with your UPI app to pay.</p>
                          <button
                            type="submit"
                            className="w-full py-3 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 transition-colors shadow"
                            disabled={isProcessing}
                          >
                            {isProcessing ? "Processing..." : "I've Paid"}
                          </button>
                        </div>
                      )}
                    </>
                  )}

                  {/* Billing Address */}
                  <div className="space-y-4">
                    <label className="text-base font-semibold text-[#333A2F]">Billing Address</label>

                    <div className="space-y-2">
                      <label htmlFor="email" className="block text-sm font-medium text-[#333A2F]">
                        Email Address
                      </label>
                      <input
                        id="email"
                        type="email"
                        placeholder="john@example.com"
                        required
                        className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-[#333A2F] focus:border-[#333A2F]"
                      />
                    </div>

                    <div className="space-y-2">
                      <label htmlFor="address" className="block text-sm font-medium text-[#333A2F]">
                        Street Address
                      </label>
                      <input
                        id="address"
                        type="text"
                        placeholder="123 Main Street"
                        required
                        className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-[#333A2F] focus:border-[#333A2F]"
                      />
                    </div>

                    {/* Country Dropdown */}
                    <div className="space-y-2">
                      <label htmlFor="country" className="block text-sm font-medium text-[#333A2F]">
                        Country
                      </label>
                      <select
                        id="country"
                        value={selectedCountry}
                        onChange={e => {
                          setSelectedCountry(e.target.value);
                          setSelectedState("");
                          setSelectedCity("");
                        }}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm bg-white text-left focus:outline-none focus:ring-2 focus:ring-[#333A2F] focus:border-[#333A2F]"
                        required
                      >
                        <option value="">Select country</option>
                        {countryOptions.map(option => (
                          <option key={option.isoCode} value={option.isoCode}>{option.name}</option>
                        ))}
                      </select>
                    </div>
                    {/* State Dropdown */}
                    <div className="space-y-2">
                      <label htmlFor="state" className="block text-sm font-medium text-[#333A2F]">
                        State
                      </label>
                      <select
                        id="state"
                        value={selectedState}
                        onChange={e => {
                          setSelectedState(e.target.value);
                          setSelectedCity("");
                        }}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm bg-white text-left focus:outline-none focus:ring-2 focus:ring-[#333A2F] focus:border-[#333A2F]"
                        required
                        disabled={!selectedCountry}
                      >
                        <option value="">{selectedCountry ? "Select state" : "Select country first"}</option>
                        {stateOptions.map(option => (
                          <option key={option.isoCode} value={option.isoCode}>{option.name}</option>
                        ))}
                      </select>
                    </div>
                    {/* City Dropdown */}
                    <div className="space-y-2">
                      <label htmlFor="city" className="block text-sm font-medium text-[#333A2F]">
                        City
                      </label>
                      <select
                        id="city"
                        value={selectedCity}
                        onChange={e => setSelectedCity(e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm bg-white text-left focus:outline-none focus:ring-2 focus:ring-[#333A2F] focus:border-[#333A2F]"
                        required
                        disabled={!selectedState}
                      >
                        <option value="">{selectedState ? "Select city" : "Select state first"}</option>
                        {cityOptions.map(option => (
                          <option key={option.name} value={option.name}>{option.name}</option>
                        ))}
                      </select>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <label htmlFor="zip" className="block text-sm font-medium text-[#333A2F]">
                          Pin Code
                        </label>
                        <input
                          id="zip"
                          type="text"
                          placeholder="10001"
                          required
                          className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-[#333A2F] focus:border-[#333A2F]"
                        />
                      </div>
                    </div>
                  </div>

                  {/* Terms and Conditions */}
                  <div className="flex items-center space-x-2">
                    <input
                      id="terms"
                      type="checkbox"
                      required
                      className="h-4 w-4 text-[#333A2F] focus:ring-[#333A2F] border-gray-300 rounded"
                    />
                    <label htmlFor="terms" className="text-sm text-[#333A2F]">
                      I agree to the{" "}
                      <a href="#" className="text-[#333A2F] hover:underline">
                        Terms of Service
                      </a>{" "}
                      and{" "}
                      <a href="#" className="text-[#333A2F] hover:underline">
                        Privacy Policy
                      </a>
                    </label>
                  </div>

                  <button
                    type="submit"
                    disabled={isProcessing}
                    className="w-full h-12 bg-[#333A2F] hover:bg-[#333A2F] disabled:bg-blue-400 text-white text-lg font-semibold rounded-md transition-colors focus:outline-none focus:ring-2 focus:ring-[#333A2F] focus:ring-offset-2"
                  >
                    {isProcessing ? "Processing Payment..." : `Enroll Now - ${formatRupees(course.price)}`}
                  </button>

                  <div className="text-center text-xs text-[#333A2F]">
                    <Lock className="h-3 w-3 inline mr-1" />
                    Your payment is secured with 256-bit SSL encryption
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default CoursePayment;