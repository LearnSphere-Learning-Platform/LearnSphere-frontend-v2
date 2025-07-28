import React, { useEffect, useState, useRef } from 'react';

const defaultQuestionsData = [
  {
    question: "What does HTML stand for?",
    options: [
      { text: "A. Hyper Text Markup Language", correct: true },
      { text: "B. Home Tool Markup Language" },
      { text: "C. Hyperlinks and Text Markup Language" },
      { text: "D. High Tech Multi Language" }
    ]
  },
  {
    question: "What does CSS stand for?",
    options: [
      { text: "A. Cascading Style Sheets", correct: true },
      { text: "B. Creative Style Syntax" },
      { text: "C. Computer Style Sheets" },
      { text: "D. Colorful Style Sheets" }
    ]
  },
  {
    question: "Which tag is used to link an external CSS file?",
    options: [
      { text: "A. <link>", correct: true },
      { text: "B. <style>" },
      { text: "C. <script>" },
      { text: "D. <css>" }
    ]
  },
  {
    question: "What is the correct way to apply a class in CSS?",
    options: [
      { text: "A. .classname {}", correct: true },
      { text: "B. #classname {}" },
      { text: "C. classname {}" },
      { text: "D. *classname {}" }
    ]
  },
  {
    question: "What is the default display value for a <div>?",
    options: [
      { text: "A. inline" },
      { text: "B. inline-block" },
      { text: "C. block", correct: true },
      { text: "D. flex" }
    ]
  }
];

const Quiz = ({ quizData, onComplete }) => {
  const questionsData = quizData?.questions?.length ? quizData.questions.map(q => ({
    question: q.question,
    options: (q.options || []).map((opt, i) =>
      typeof opt === 'string'
        ? { text: opt, correct: q.type === 'checkbox' ? (q.correctCheckbox || []).includes(i) : q.correct === i }
        : opt
    ),
    type: q.type || 'multiple',
    correct: q.correct,
    correctCheckbox: q.correctCheckbox,
  })) : defaultQuestionsData;
  const topic = quizData?.topic || 'HTML & CSS Basics Quiz';

  const [currentQ, setCurrentQ] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState({});
  const [score, setScore] = useState(null);
  const [timeLeft, setTimeLeft] = useState(120);
  const [showConfirm, setShowConfirm] = useState(false);
  const [isTimeUp, setIsTimeUp] = useState(false);
  const [showResult, setShowResult] = useState(false);
  const [timerVersion, setTimerVersion] = useState(0);
  const timerRef = useRef(null);


  useEffect(() => {
    timerRef.current = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          clearInterval(timerRef.current);
          setIsTimeUp(true);
          // Call onComplete with failed result when time runs out
          if (onComplete) {
            onComplete(0, false);
          }
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
    return () => clearInterval(timerRef.current);
  }, [timerVersion, onComplete]);

  useEffect(() => {
    if (showResult) {
      clearInterval(timerRef.current);
    }
  }, [showResult]);

  const handleOptionSelect = (index) => {
    setSelectedAnswers({ ...selectedAnswers, [currentQ]: index });

  };

  const handleSubmitConfirmed = () => {
    setShowConfirm(false);

    const answered = Object.keys(selectedAnswers).length;
    const percentage = (answered / questionsData.length) * 100;

    if (percentage < 80) {
      // Show insufficient answers message
      return;
    }

    let correct = 0;
    questionsData.forEach((q, i) => {
      if (q.type === 'checkbox') {
        // For checkbox, check if selected matches correctCheckbox
        const selected = selectedAnswers[i];
        const correctSet = new Set(q.correctCheckbox || []);
        if (Array.isArray(selected) && selected.length === correctSet.size && selected.every(idx => correctSet.has(idx))) {
          correct++;
        }
      } else {
        if (q.options[selectedAnswers[i]]?.correct) correct++;
      }
    });

    const scorePercentage = (correct / questionsData.length) * 100;
    const passed = scorePercentage >= 70; // 70% pass threshold
    
    setScore(correct);
    setShowResult(true);
    clearInterval(timerRef.current); // Stop timer on submit
    
    // Call onComplete callback if provided
    if (onComplete) {
      onComplete(scorePercentage, passed);
    }
  };

  const restartQuiz = () => {
    setSelectedAnswers({});
    setScore(null);
    setTimeLeft(120);
    setShowConfirm(false);
    setIsTimeUp(false);
    setShowResult(false);
    setCurrentQ(0);
    setTimerVersion(v => v + 1);
    // Reset completion state when restarting
    if (onComplete) {
      onComplete(0, false);
    }
  };

  return (
    <div className="min-h-screen bg-[#EBEDDF] text-[#333A2F] pb-16">
      {/* Navbar */}
      <nav className="fixed top-0 left-0 w-full z-50 flex justify-between items-center bg-[#EBEDDF] border-b-2 border-[#333A2F] px-8 py-4 shadow-md">
        <div className="text-xl font-bold">LearnSphere</div>
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

      {/* Quiz Topic Title */}
      <div className="w-full max-w-5xl mx-auto px-2 sm:px-4 pt-24 pb-4 flex justify-center">
        <h1 className="text-2xl sm:text-3xl font-extrabold text-[#333A2F] tracking-tight text-center">{topic}</h1>
      </div>

      {/* Question Circles Row */}
      <div className="flex flex-wrap justify-center items-center gap-2 sm:gap-4 pb-6">
        {questionsData.map((_, i) => {
          const isCurrent = currentQ === i;
          const isAnswered = selectedAnswers[i] !== undefined;
          return (
            <button
              key={i}
              onClick={() => setCurrentQ(i)}
              className={`w-8 h-8 sm:w-10 sm:h-10 flex items-center justify-center rounded-full border-2 font-bold text-base sm:text-lg transition-all
                ${isCurrent ? 'bg-[#333A2F] text-white border-[#333A2F]' : isAnswered ? 'bg-green-200 text-green-900 border-green-400' : 'bg-white text-[#333A2F] border-[#d6d6c2] hover:bg-[#333A2F] hover:text-white'}
              `}
              aria-label={`Go to question ${i + 1}`}
            >
              {i + 1}
            </button>
          );
        })}
      </div>

      {/* Progress Bar */}
      <div className="w-full max-w-2xl mx-auto mt-8 mb-4 px-4">
        <div className="h-3 bg-[#EBEDDF] rounded-full overflow-hidden">
          <div
            className="h-full bg-[#333A2F] transition-all duration-500"
            style={{ width: `${((currentQ + 1) / questionsData.length) * 100}%` }}
          ></div>
        </div>
      </div>
      <div className="flex justify-center w-full">
        <div className="max-w-2xl w-full mx-auto p-2 sm:p-6 md:p-10">
          {!showResult && (
            <div className="relative bg-[#EBEDDF] border border-[#d6d6c2] rounded-3xl shadow-2xl p-4 sm:p-10 md:p-14 transition-all duration-500">
              {/* Animated Question Number */}
              <div className="flex items-center gap-3 mb-6">
                <span className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-[#333A2F] text-[#EBEDDF] text-2xl font-bold shadow-lg animate-fade-in">
                  {currentQ + 1}
                </span>
                <span className="text-lg font-semibold text-[#333A2F] animate-fade-in">/ {questionsData.length}</span>
              </div>
              {/* Question */}
              <pre className="bg-white border border-[#d6d6c2] p-6 rounded-xl text-lg font-medium text-[#333A2F] whitespace-pre-wrap mb-8 shadow-sm animate-fade-in">
                <code>{questionsData[currentQ].question}</code>
              </pre>
              {/* Options as Cards */}
              <div className="grid gap-6 mb-10">
                {questionsData[currentQ].options.map((option, i) => {
                  const isSelected = selectedAnswers[currentQ] === i;
                  return (
                    <button
                      key={i}
                      type="button"
                      className={`flex items-center gap-4 w-full p-5 rounded-2xl border-2 transition-all duration-200 shadow-sm text-lg font-semibold focus:outline-none
                        ${isSelected
                          ? 'bg-green-100 text-green-900 border-green-400 scale-105 shadow-lg'
                          : 'bg-white border-[#d6d6c2] text-[#333A2F] hover:bg-[#EBEDDF] hover:scale-105'}
                      `}
                      onClick={() => handleOptionSelect(i)}
                    >
                      <span className={`inline-flex items-center justify-center w-8 h-8 rounded-full border-2 transition-all duration-200
                        ${isSelected ? 'bg-green-600 border-green-600 text-white' : 'bg-white border-[#d6d6c2] text-[#333A2F]'}
                      `}>
                        {isSelected ? (
                          <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="3" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" /></svg>
                        ) : (
                          <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><circle cx="12" cy="12" r="8" /></svg>
                        )}
                      </span>
                      <span className="flex-1 text-left">{option.text}</span>
                    </button>
                  );
                })}
              </div>
              {/* Navigation Buttons */}
              <div className="flex flex-col sm:flex-row justify-between gap-4 mt-4">
                <button
                  onClick={() => setCurrentQ((prev) => Math.max(prev - 1, 0))}
                  className={`px-6 py-3 text-lg rounded-xl font-bold transition-all duration-200 shadow-md focus:outline-none
                    ${currentQ === 0
                      ? 'bg-gray-200 text-gray-400 cursor-not-allowed'
                      : 'bg-[#333A2F] text-[#EBEDDF] hover:bg-black'}
                  `}
                  disabled={currentQ === 0}
                >
                  Previous
                </button>
                {currentQ < questionsData.length - 1 && (
                  <button
                    onClick={() => setCurrentQ((prev) => prev + 1)}
                    className="px-6 py-3 text-lg rounded-xl font-bold bg-[#333A2F] text-[#EBEDDF] shadow-md hover:bg-black transition-all duration-200 focus:outline-none"
                  >
                    Next
                  </button>
                )}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Confirm Submit Modal */}
      {showConfirm && (
        <div className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center z-50">
          <div className="bg-white p-8 rounded-lg shadow-lg max-w-md w-full text-center" style={{ maxHeight: '90vh' }}>
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

      {/* Time Up Modal */}
      {isTimeUp && (
        <div className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center z-50">
          <div className="bg-white p-8 rounded-lg shadow-lg max-w-md w-full text-center" style={{ maxHeight: '90vh' }}>
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

      {showResult && (
        <div className="mb-10 bg-green-100 border-2 border-green-300 rounded-xl shadow-lg p-8 text-center">
          <h3 className="text-2xl font-bold mb-4">🎉 Your Score</h3>
          <p className="text-lg mb-6">
            <strong>{score} / {questionsData.length}</strong> correct (
            {Math.round((score / questionsData.length) * 100)}%)
          </p>
          {score > questionsData.length * 0.5 ? (
            <button
              onClick={() => window.location.href = '/next-test'}
              className="bg-[#333A2F] text-white py-2 px-6 rounded-md font-semibold hover:bg-black mb-8"
            >
              Go to Next Test
            </button>
          ) : (
            <>
              <div className="mb-4 text-red-700 font-semibold">You need more than 50% to be eligible for the next test.</div>
              <button
                onClick={restartQuiz}
                className="bg-[#333A2F] text-white py-2 px-6 rounded-md font-semibold hover:bg-black mb-8"
              >
                Retake Quiz
              </button>
            </>
          )}
          {/* Answer Review */}
          <div className="mt-8 text-left">
            <h4 className="text-xl font-bold mb-4 text-center">Review Answers</h4>
            <ol className="space-y-6">
              {questionsData.map((q, idx) => {
                const userIdx = selectedAnswers[idx];
                const correctIdx = q.options.findIndex(opt => opt.correct);
                const isCorrect = userIdx === correctIdx;
                return (
                  <li key={idx} className="bg-white border border-[#d6d6c2] rounded-lg p-4">
                    <div className="mb-2 font-semibold">Q{idx + 1}: <span className="text-[#333A2F]">{q.question}</span></div>
                    <ul className="space-y-2 mt-2">
                      {q.options.map((opt, i) => {
                        const isUser = userIdx === i;
                        const isAns = !!opt.correct;
                        return (
                          <li
                            key={i}
                            className={`px-3 py-2 rounded-lg flex items-center gap-2 text-base
                              ${isAns ? 'bg-green-100 border border-green-400 font-bold' : ''}
                              ${isUser && !isAns ? 'bg-red-100 border border-red-400' : ''}
                              ${isUser && isAns ? 'ring-2 ring-green-600' : ''}
                            `}
                          >
                            {isUser && (
                              <span className="inline-block w-5 h-5 text-green-700">{isCorrect ? '✔️' : '❌'}</span>
                            )}
                            <span>{opt.text}</span>
                            {isAns && <span className="ml-2 text-green-700 font-bold">(Correct)</span>}
                          </li>
                        );
                      })}
                    </ul>
                  </li>
                );
              })}
            </ol>
          </div>
        </div>
      )}
    </div>
  );
};

export default Quiz;
