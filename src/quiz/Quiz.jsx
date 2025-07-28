import React, { useEffect, useState, useRef } from 'react';

const Quiz = ({ questionsData, onBack }) => {
  const [currentQ, setCurrentQ] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState({});
  const [score, setScore] = useState(null);
  const [timeLeft, setTimeLeft] = useState(120);
  const [showConfirm, setShowConfirm] = useState(false);
  const [isTimeUp, setIsTimeUp] = useState(false);
  const [showResult, setShowResult] = useState(false);
  const [showInsufficientAnswers, setShowInsufficientAnswers] = useState(false);

  const timerRef = useRef(null);

  // Validate questionsData prop
  if (!questionsData || !Array.isArray(questionsData) || questionsData.length === 0) {
    return (
      <div className="min-h-screen bg-[#FFFF] text-[#333A2F] flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold mb-4">No Quiz Data Available</h2>
          <p className="text-gray-600 mb-4">The quiz data is missing or invalid.</p>
          {onBack && (
            <button
              onClick={onBack}
              className="bg-[#333A2F] text-white px-6 py-2 rounded font-semibold"
            >
              Back to Course
            </button>
          )}
        </div>
      </div>
    );
  }

  useEffect(() => {
    timerRef.current = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          clearInterval(timerRef.current);
          setIsTimeUp(true);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
    
    return () => {
      if (timerRef.current) {
        clearInterval(timerRef.current);
      }
    };
  }, []);

  const handleOptionSelect = (index) => {
    setSelectedAnswers({ ...selectedAnswers, [currentQ]: index });
  };

  const handleSubmitConfirmed = () => {
    if (timerRef.current) {
      clearInterval(timerRef.current);
    }
    setShowConfirm(false);
    setShowInsufficientAnswers(false);

    const answered = Object.keys(selectedAnswers).length;
    const percentage = (answered / questionsData.length) * 100;

    if (percentage < 80) {
      setShowInsufficientAnswers(true);
      return;
    }

    let correct = 0;
    questionsData.forEach((q, i) => {
      if (q.options[selectedAnswers[i]]?.correct) correct++;
    });

    setScore(correct);
    setShowResult(true);
  };

  const restartQuiz = () => {
    setSelectedAnswers({});
    setScore(null);
    setTimeLeft(120);
    setShowConfirm(false);
    setIsTimeUp(false);
    setShowResult(false);
    setShowInsufficientAnswers(false);
    setCurrentQ(0);

    if (timerRef.current) {
      clearInterval(timerRef.current);
    }

    timerRef.current = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          clearInterval(timerRef.current);
          setIsTimeUp(true);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
  };

  return (
    <div className="min-h-screen bg-[#FFFF] text-[#333A2F] pb-16">
      {/* Back to Course Button */}
      {onBack && (
        <button
          onClick={onBack}
          className="fixed top-24 left-4 z-50 bg-gray-300 text-black px-4 py-2 rounded hover:bg-gray-400"
        >
          Back to Course
        </button>
      )}
      {/* Navbar */}
      <nav className="fixed top-0 left-0 w-full z-50 flex justify-between items-center bg-[#EBEDDF] border-b-2 border-[#333A2F] px-8 py-4 shadow-md">
        <div className="text-xl font-bold">LearnSphere</div>
        <div className="w-[300px] h-2 bg-[#333A2F1A] border border-[#d6d6c2] rounded overflow-hidden">
          <div
            className="h-full bg-[#333A2F] transition-all duration-300"
            style={{
              width: `${(Object.keys(selectedAnswers).length / questionsData.length) * 100}%`
            }}
          ></div>
        </div>
        <div className="flex items-center gap-4">
          <div
            className={`font-bold px-4 py-1 rounded ${
              timeLeft <= 30 ? "bg-[#dc3545] text-white" : timeLeft <= 60 ? "bg-[#ffc107] text-black" : ""
            }`}
          >
            Time Left: {`${String(Math.floor(timeLeft / 60)).padStart(2, "0")}:${String(timeLeft % 60).padStart(2, "0")}`}
          </div>
          <button
            onClick={() => setShowConfirm(true)}
            className="bg-[#333A2F] text-[#EBEDDF] font-semibold px-6 py-2 rounded-lg shadow-md hover:bg-black"
          >
            Submit Quiz
          </button>
        </div>
      </nav>

      {/* Main Section */}
      <div className="flex pt-20">
        {/* Sidebar */}
        <aside className="w-64 p-5 border-r-2 border-[#333A2F] bg-[#333A2F1A] min-h-screen sticky top-20">
          <h3 className="text-xl font-semibold mb-5 text-center">Questions</h3>
          <ul className="space-y-2">
            {questionsData.map((_, i) => (
              <li
                key={i}
                className={`py-2 px-4 rounded text-center font-bold cursor-pointer border-2 ${
                  selectedAnswers[i] !== undefined
                    ? "bg-green-100 text-green-800 border-green-300"
                    : "bg-white text-[#333A2F] border-[#d6d6c2]"
                }`}
                onClick={() => setCurrentQ(i)}
              >
                Q{i + 1}
              </li>
            ))}
          </ul>
        </aside>

        {/* Quiz Box */}
        <div className="flex-1 max-w-4xl mx-auto p-10 border-grey-300">
          {/* Results */}
          {showResult && (
            <div className="mb-10 bg-white border-2 border-[#d6d6c2] rounded-xl shadow-lg p-8 text-center">
              <h3 className="text-2xl font-bold mb-4">🎉 Your Score</h3>
              <p className="text-lg mb-6">
                <strong>{Math.round((score / questionsData.length) * 100)}%</strong> correct (
                {score} out of {questionsData.length})
              </p>
              <div className="flex justify-center gap-6">
                {Math.round((score / questionsData.length) * 100) >= 80 && (
                  <button
                    className="bg-green-600 text-white py-2 px-6 rounded-md font-semibold hover:bg-green-700"
                    onClick={() => (window.location.href = "/next-badge")}
                  >
                    Go to Next Badge
                  </button>
                )}
                <button
                  onClick={restartQuiz}
                  className="bg-[#333A2F] text-white py-2 px-6 rounded-md font-semibold hover:bg-black"
                >
                  Retake Quiz
                </button>
              </div>
            </div>
          )}

          {/* Warning */}
          {showInsufficientAnswers && (
            <div className="mb-6 bg-red-100 border-2 border-red-300 text-red-800 p-6 rounded-xl shadow-lg text-center">
              <p className="font-semibold">
                Please answer at least 80% of the questions. You answered {Object.keys(selectedAnswers).length}/
                {questionsData.length}.
              </p>
              <button
                onClick={() => setShowInsufficientAnswers(false)}
                className="mt-4 bg-red-600 text-white py-2 px-6 rounded-md font-semibold hover:bg-red-700"
              >
                Continue Quiz
              </button>
            </div>
          )}

          {/* Question & Options */}
          <div className="mb-6 flex justify-between">
            <button
              onClick={() => setCurrentQ((prev) => Math.max(prev - 1, 0))}
              className={`px-4 py-2 border-2 rounded ${
                currentQ === 0
                  ? "border-gray-400 text-gray-400 cursor-not-allowed"
                  : "border-[#333A2F] hover:bg-[#333A2F] hover:text-white"
              }`}
              disabled={currentQ === 0}
            >
              Previous
            </button>
            {currentQ < questionsData.length - 1 && (
              <button
                onClick={() => setCurrentQ((prev) => prev + 1)}
                className="px-4 py-2 border-2 border-[#333A2F] rounded hover:bg-[#333A2F] hover:text-white"
              >
                Next
              </button>
            )}
          </div>

          <div className="bg-white border-2 border-[#d6d6c2] rounded-xl shadow-lg p-6">
            <h2 className="text-xl font-semibold text-center mb-6">{`Q${currentQ + 1}. ${questionsData[currentQ].question}`}</h2>
            <div className="grid gap-4">
              {questionsData[currentQ].options.map((option, i) => {
                const isSelected = selectedAnswers[currentQ] === i;
                return (
                  <div
                    key={i}
                    className={`p-4 border-2 rounded-lg cursor-pointer transition-all text-center font-medium ${
                      isSelected
                        ? "bg-[#333A2F] text-white"
                        : "bg-[#EBEDDF] text-[#333A2F] hover:bg-[#333A2F] hover:text-white"
                    }`}
                    onClick={() => handleOptionSelect(i)}
                  >
                    {option.text}
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>

      {/* Confirm Submit Modal */}
      {showConfirm && (
        <div className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center z-50">
          <div className="bg-white p-8 rounded-lg shadow-lg max-w-md w-full text-center">
            <h3 className="text-xl font-semibold mb-4">Are you sure?</h3>
            <p>
              You still have <strong>{timeLeft} seconds</strong> left. Do you want to submit the quiz now?
            </p>
            <div className="mt-6 flex justify-center gap-4">
              <button
                onClick={handleSubmitConfirmed}
                className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
              >
                Yes, Submit
              </button>
              <button
                onClick={() => setShowConfirm(false)}
                className="bg-gray-300 text-black px-4 py-2 rounded hover:bg-gray-400"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Time's Up Modal */}
      {isTimeUp && (
        <div className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center z-50">
          <div className="bg-white p-8 rounded-lg shadow-lg max-w-md w-full text-center">
            <h3 className="text-2xl font-bold text-red-600 mb-4">⏱ Time's Up!</h3>
            <p className="mb-6">You ran out of time before submitting the quiz.</p>
            <button
              onClick={restartQuiz}
              className="bg-[#333A2F] text-white py-2 px-6 rounded-md font-semibold hover:bg-black"
            >
              Retake Quiz
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Quiz;
