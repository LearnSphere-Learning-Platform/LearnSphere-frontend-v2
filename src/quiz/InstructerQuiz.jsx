import React, { useState } from "react";

const defaultQuestion = () => ({
  question: "",
  options: ["", ""],
  correct: 0,
  correctCheckbox: [],
  type: "multiple", // 'multiple', 'checkbox', 'truefalse'
  expanded: true,
  editing: true,
});

export default function InstructorQuiz({ onSave }) {
  const [topic, setTopic] = useState("");
  const [questions, setQuestions] = useState([defaultQuestion()]);
  const [activeStep, setActiveStep] = useState(0);

  const handleQuestionChange = (idx, value) => {
    setQuestions(qs => qs.map((q, i) => i === idx ? { ...q, question: value } : q));
  };
  const handleOptionChange = (qIdx, optIdx, value) => {
    setQuestions(qs => qs.map((q, i) => i === qIdx ? {
      ...q,
      options: q.options.map((opt, j) => j === optIdx ? value : opt)
    } : q));
  };
  const handleCorrectChange = (qIdx, optIdx) => {
    setQuestions(qs => qs.map((q, i) => {
      if (i !== qIdx) return q;
      if (q.type === 'checkbox') {
        // Toggle for checkbox
        const exists = q.correctCheckbox.includes(optIdx);
        return {
          ...q,
          correctCheckbox: exists ? q.correctCheckbox.filter(idx => idx !== optIdx) : [...q.correctCheckbox, optIdx]
        };
      } else {
        // Single correct (multiple/truefalse)
        return { ...q, correct: optIdx };
      }
    }));
  };
  const handleTypeChange = (qIdx, type) => {
    setQuestions(qs => qs.map((q, i) => {
      if (i !== qIdx) return q;
      if (type === 'truefalse') {
        return {
          ...q,
          type,
          options: ['True', 'False'],
          correct: 0,
          correctCheckbox: [],
        };
      } else if (type === 'checkbox') {
        return {
          ...q,
          type,
          correctCheckbox: [],
        };
      } else {
        // multiple
        return {
          ...q,
          type,
          correct: 0,
          correctCheckbox: [],
        };
      }
    }));
  };
  const addQuestion = () => {
    setQuestions(qs => [...qs, defaultQuestion()]);
    setActiveStep(questions.length);
  };
  const removeQuestion = (idx) => {
    setQuestions(qs => qs.length > 1 ? qs.filter((_, i) => i !== idx) : qs);
    setActiveStep(s => Math.max(0, s - 1));
  };
  const addOption = (qIdx) => setQuestions(qs => qs.map((q, i) => i === qIdx ? { ...q, options: [...q.options, ""] } : q));
  const removeOption = (qIdx, optIdx) => setQuestions(qs => qs.map((q, i) => i === qIdx && q.options.length > 2 ? { ...q, options: q.options.filter((_, j) => j !== optIdx) } : q));
  const toggleExpand = (idx) => setQuestions(qs => qs.map((q, i) => i === idx ? { ...q, expanded: !q.expanded } : q));
  const setEditing = (idx, editing) => setQuestions(qs => qs.map((q, i) => i === idx ? { ...q, editing } : q));

  const handleSave = () => {

    alert("Quiz saved! (see console for data)");
    console.log({ topic, questions });

    // Always log to console for debugging
    console.log("🎯 Quiz Data Saved:");
    console.log("Topic:", topic);
    console.log("Questions:", questions);
    console.log("Full Quiz Object:", { topic, questions });   
    if (onSave) {
      onSave({ topic, questions });
    } else {
      alert("Quiz saved! (see console for data)");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#f5f6ef] to-[#e8ece3] flex flex-col items-center py-10 px-2">
      <div className="w-full max-w-4xl bg-white rounded-3xl shadow-2xl border border-[#e5e7eb] p-0 overflow-hidden">
        {/* Stepper */}
        <div className="flex items-center justify-between px-8 py-6 bg-[#384933]">
          <div className="flex items-center gap-4">
            <span className="text-2xl font-bold text-white tracking-tight">📝 Quiz Builder</span>
            <span className="ml-4 text-lg text-[#b7c2a8]">Topic:</span>
            <input
              className="px-3 py-1 rounded bg-[#f8fafc] border border-[#d6d6c2] text-lg font-semibold text-[#384933] focus:outline-none focus:ring-2 focus:ring-[#384933]"
              placeholder="e.g. HTML & CSS Basics"
              value={topic}
              onChange={e => setTopic(e.target.value)}
              style={{ minWidth: 220 }}
            />
          </div>
          <button
            className="px-5 py-2 rounded-lg bg-[#384933] border-2 border-white text-white font-bold text-base shadow hover:bg-[#2c3a25] transition-all"
            onClick={handleSave}
          >Save Quiz</button>
        </div>
        {/* Stepper Navigation */}
        <div className="flex items-center gap-2 px-8 py-4 bg-[#f8fafc] border-b border-[#e5e7eb]">
          {questions.map((q, idx) => (
            <button
              key={idx}
              className={`w-9 h-9 rounded-full flex items-center justify-center font-bold text-lg border-2 transition-all duration-200
                ${activeStep === idx ? "bg-[#384933] text-white border-[#384933] scale-110 shadow" : "bg-white text-[#384933] border-[#b7c2a8] hover:bg-[#e8ece3]"}
              `}
              onClick={() => setActiveStep(idx)}
              aria-label={`Go to question ${idx + 1}`}
            >
              {idx + 1}
            </button>
          ))}
          <button
            className="ml-4 px-4 py-2 rounded-full bg-[#384933] text-white font-bold text-base shadow hover:bg-[#2c3a25] transition-all"
            onClick={addQuestion}
          >+ Add Question</button>
        </div>
        {/* Question Panels */}
        <div className="p-8">
          {questions.map((q, qIdx) => (
            <div
              key={qIdx}
              className={`mb-8 border border-[#e5e7eb] rounded-2xl shadow transition-all duration-300 ${activeStep === qIdx ? "bg-white" : "bg-[#f8fafc] opacity-80"}`}
              style={{ display: activeStep === qIdx ? "block" : "none" }}
            >
              <div className="flex items-center justify-between px-6 py-4 border-b border-[#eee] rounded-t-2xl bg-[#f8fafc]">
                <div className="flex items-center gap-3">
                  <span className="w-9 h-9 rounded-full bg-[#384933] text-white flex items-center justify-center font-bold text-lg border-4 border-white shadow">{qIdx + 1}</span>
                  <span className="font-bold text-xl text-[#384933]">Question {qIdx + 1}</span>
                </div>
                <div className="flex items-center gap-2">
                  <select
                    className="px-2 py-1 rounded border border-[#b7c2a8] text-base font-semibold text-[#384933] bg-white focus:outline-none"
                    value={q.type}
                    onChange={e => handleTypeChange(qIdx, e.target.value)}
                  >
                    <option value="multiple">Multiple Choice</option>
                    <option value="checkbox">Checkbox</option>
                    <option value="truefalse">True/False</option>
                  </select>
                  <button
                    className="text-[#384933] text-base font-semibold hover:underline"
                    onClick={() => toggleExpand(qIdx)}
                  >{q.expanded ? "Collapse" : "Expand"}</button>
                  {questions.length > 1 && (
                    <button
                      className="text-red-600 font-semibold hover:underline text-base"
                      onClick={() => removeQuestion(qIdx)}
                    >Remove</button>
                  )}
                </div>
              </div>
              {q.expanded && (
                <div className="px-6 pb-6 pt-2">
                  {q.editing ? (
                    <>
                      <label className="block text-base font-semibold mb-1 mt-2 text-[#384933]">Question</label>
                      <input
                        className="w-full px-4 py-2 border border-[#d6d6c2] rounded-lg text-base mb-4 focus:outline-none focus:ring-2 focus:ring-[#384933] bg-[#f8fafc]"
                        placeholder="Enter question text"
                        value={q.question}
                        onChange={e => handleQuestionChange(qIdx, e.target.value)}
                      />
                      <div className="mb-2 font-semibold text-[#384933]">Options</div>
                      {q.type === 'truefalse' ? (
                        ["True", "False"].map((opt, optIdx) => (
                          <div key={optIdx} className="flex items-center gap-2 mb-2">
                            <input
                              type="radio"
                              name={`correct-${qIdx}`}
                              checked={q.correct === optIdx}
                              onChange={() => handleCorrectChange(qIdx, optIdx)}
                              className="accent-[#384933] w-5 h-5"
                            />
                            <input
                              className="flex-1 px-3 py-2 border border-[#d6d6c2] rounded-lg text-base bg-[#f8fafc]"
                              value={opt}
                              disabled
                            />
                          </div>
                        ))
                      ) : q.options.map((opt, optIdx) => (
                        <div key={optIdx} className="flex items-center gap-2 mb-2">
                          <input
                            type={q.type === 'checkbox' ? 'checkbox' : 'radio'}
                            name={`correct-${qIdx}`}
                            checked={q.type === 'checkbox' ? q.correctCheckbox.includes(optIdx) : q.correct === optIdx}
                            onChange={() => handleCorrectChange(qIdx, optIdx)}
                            className="accent-[#384933] w-5 h-5"
                          />
                          <input
                            className="flex-1 px-3 py-2 border border-[#d6d6c2] rounded-lg text-base focus:outline-none focus:ring-2 focus:ring-[#384933] bg-[#f8fafc]"
                            placeholder={`Option ${String.fromCharCode(65 + optIdx)}`}
                            value={opt}
                            onChange={e => handleOptionChange(qIdx, optIdx, e.target.value)}
                          />
                          {q.options.length > 2 && (
                            <button
                              className="text-red-500 text-sm font-bold px-2"
                              onClick={() => removeOption(qIdx, optIdx)}
                            >✕</button>
                          )}
                        </div>
                      ))}
                      {q.type !== 'truefalse' && (
                        <button
                          className="mt-2 px-4 py-2 rounded bg-[#384933] text-white font-semibold text-base hover:bg-[#2c3a25] transition-all"
                          onClick={() => addOption(qIdx)}
                        >+ Add Option</button>
                      )}
                      <div className="flex justify-end mt-4">
                        <button
                          className="px-6 py-2 rounded-lg bg-[#384933] text-white font-bold text-base shadow hover:bg-[#2c3a25] transition-all"
                          onClick={() => setEditing(qIdx, false)}
                        >Save</button>
                      </div>
                    </>
                  ) : (
                    <>
                      <div className="mb-2 text-lg font-semibold text-[#384933]">{q.question}</div>
                      <div className="mb-2">
                        {q.type === 'truefalse' ? (
                          ["True", "False"].map((opt, optIdx) => (
                            <div key={optIdx} className="flex items-center gap-2 mb-1">
                              <input
                                type="radio"
                                name={`view-correct-${qIdx}`}
                                checked={q.correct === optIdx}
                                readOnly
                                className="accent-[#384933] w-5 h-5"
                              />
                              <span className="text-base">{opt}</span>
                            </div>
                          ))
                        ) : q.options.map((opt, optIdx) => (
                          <div key={optIdx} className="flex items-center gap-2 mb-1">
                            <input
                              type={q.type === 'checkbox' ? 'checkbox' : 'radio'}
                              name={`view-correct-${qIdx}`}
                              checked={q.type === 'checkbox' ? q.correctCheckbox.includes(optIdx) : q.correct === optIdx}
                              readOnly
                              className="accent-[#384933] w-5 h-5"
                            />
                            <span className="text-base">{opt}</span>
                          </div>
                        ))}
                      </div>
                      <div className="flex justify-end mt-4">
                        <button
                          className="px-6 py-2 rounded-lg bg-[#384933] text-white font-bold text-base shadow hover:bg-[#2c3a25] transition-all"
                          onClick={() => setEditing(qIdx, true)}
                        >Edit</button>
                      </div>
                    </>
                  )}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}