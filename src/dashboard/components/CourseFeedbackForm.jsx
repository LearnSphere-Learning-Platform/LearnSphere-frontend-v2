"use client"

import React, { useState } from "react"

// Star SVG component
const StarIcon = ({ value, displayRating, className = "" }) => {
  const isFullYellow = displayRating >= value
  const isHalfYellow = displayRating === value - 0.5

  return (
    <svg
      className={`transition-colors duration-200 ${className}`}
      viewBox="0 0 24 24"
      fill="currentColor"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <defs>
        <clipPath id={`half-star-clip-${value}`}>
          <rect x="0" y="0" width="12" height="24" />
        </clipPath>
      </defs>

      <path
        d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.27l-6.18 3.25L7 14.14l-5-4.87 7.91-1.01L12 2z"
        className="text-gray-300"
      />
      {(isFullYellow || isHalfYellow) && (
        <path
          d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.27l-6.18 3.25L7 14.14l-5-4.87 7.91-1.01L12 2z"
          className="text-yellow-400"
          clipPath={isHalfYellow ? `url(#half-star-clip-${value})` : ""}
        />
      )}
    </svg>
  )
}

export default function CourseFeedbackForm({ onSubmit }) {
  const [rating, setRating] = useState(0)
  const [hoverRating, setHoverRating] = useState(0)
  const [selectedFeedback, setSelectedFeedback] = useState("")
  const [otherFeedback, setOtherFeedback] = useState("")
  const [ratingError, setRatingError] = useState(false)
  const [feedbackError, setFeedbackError] = useState(false)

  const handleStarClick = (value) => {
    setRating(value)
    setRatingError(false)
  }

  const handleStarHover = (value) => setHoverRating(value)
  const handleStarLeave = () => setHoverRating(0)

  const handleFeedbackChange = (e) => {
    setSelectedFeedback(e.target.value)
    setFeedbackError(false)
  }

  const handleOtherFeedbackChange = (e) => {
    setOtherFeedback(e.target.value)
    if (e.target.value.trim() !== "") {
      setFeedbackError(false)
    }
  }

  const handleSubmit = (e) => {
    e.preventDefault()

    let isValid = true

    if (rating === 0) {
      setRatingError(true)
      isValid = false
    } else {
      setRatingError(false)
    }

    if (selectedFeedback === "") {
      setFeedbackError(true)
      isValid = false
    } else if (selectedFeedback === "other" && otherFeedback.trim() === "") {
      setFeedbackError(true)
      isValid = false
    } else {
      setFeedbackError(false)
    }

    if (!isValid) return

    const formData = {
      rating,
      selectedFeedback,
      otherFeedback: selectedFeedback === "other" ? otherFeedback : undefined,
    }

    console.log("Feedback Submitted (JSON):", JSON.stringify(formData, null, 2))
    
    if (onSubmit) {
      onSubmit(formData);
    } else {
      alert("Feedback submitted! Check console for details.")
    }
  }

  const displayRating = hoverRating || rating

  return (
    <div className="flex items-center justify-center min-h-screen bg-[#EBEDDF] p-4">
      <form onSubmit={handleSubmit} className="bg-white p-8 rounded-lg shadow-lg w-full max-w-lg space-y-6">
        <h2 className="text-2xl font-bold text-center text-gray-800">Course Feedback</h2>
        <p className="text-center text-gray-600">Please share your experience after completing the course.</p>

        {/* Star Rating Section */}
        <div>
          <label className="block text-lg font-medium text-gray-700 mb-2" htmlFor="star-rating">
            How many stars would you give this course? <span className="text-red-500">*</span>
          </label>
          <div id="star-rating" className="flex justify-center space-x-1">
            {[1, 2, 3, 4, 5].map((starIndex) => (
              <div key={starIndex} className="relative w-8 h-8">
                <div
                  className="absolute left-0 top-0 w-1/2 h-full cursor-pointer z-10"
                  onMouseEnter={() => handleStarHover(starIndex - 0.5)}
                  onMouseLeave={handleStarLeave}
                  onClick={() => handleStarClick(starIndex - 0.5)}
                  aria-label={`Give ${starIndex - 0.5} stars`}
                />
                <div
                  className="absolute right-0 top-0 w-1/2 h-full cursor-pointer z-10"
                  onMouseEnter={() => handleStarHover(starIndex)}
                  onMouseLeave={handleStarLeave}
                  onClick={() => handleStarClick(starIndex)}
                  aria-label={`Give ${starIndex} stars`}
                />
                <StarIcon
                  value={starIndex}
                  displayRating={displayRating}
                  className="w-8 h-8"
                />
              </div>
            ))}
          </div>
          {rating > 0 && <p className="text-center text-sm text-gray-500 mt-2">You rated: {rating} stars</p>}
          {ratingError && (
            <p className="text-red-500 text-sm text-center mt-2" role="alert">
              Please provide a star rating.
            </p>
          )}
        </div>

        {/* Radio Input Section */}
        <div>
          <label className="block text-lg font-medium text-gray-700 mb-2">
            Overall Feedback: <span className="text-red-500">*</span>
          </label>
          <div className="space-y-2">
            {["Bad", "Satisfactory", "Good", "Very Good", "Excellent", "Other"].map((option) => (
              <div key={option} className="flex items-center">
                <input
                  type="radio"
                  id={`feedback-${option.toLowerCase().replace(/\s/g, "-")}`}
                  name="overall-feedback"
                  value={option.toLowerCase()}
                  checked={selectedFeedback === option.toLowerCase()}
                  onChange={handleFeedbackChange}
                  className="h-4 w-4 text-[#333A2F] border-gray-300 focus:ring-[#333A2F]"
                />
                <label htmlFor={`feedback-${option.toLowerCase().replace(/\s/g, "-")}`} className="ml-3 text-gray-700">
                  {option}
                </label>
              </div>
            ))}
          </div>

          {selectedFeedback === "other" && (
            <div className="mt-4">
              <label htmlFor="other-feedback" className="sr-only">
                Please specify your feedback
              </label>
              <textarea
                id="other-feedback"
                rows={4}
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-[#333A2F] focus:border-[#333A2F] sm:text-sm"
                placeholder="Please specify your feedback..."
                value={otherFeedback}
                onChange={handleOtherFeedbackChange}
                required
              />
            </div>
          )}
          {feedbackError && (
            <p className="text-red-500 text-sm mt-2" role="alert">
              Please select an overall feedback option.
              {selectedFeedback === "other" && " And provide details in the text area."}
            </p>
          )}
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-[#333A2F] hover:bg-[#4A5245] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#333A2F]"
        >
          Submit Feedback
        </button>
      </form>
    </div>
  )
}
