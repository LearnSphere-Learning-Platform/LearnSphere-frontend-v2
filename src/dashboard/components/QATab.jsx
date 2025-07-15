import React, { useState } from 'react';

const user = { name: 'User' }; // Temporary user

const QATab = () => {
  const [questions, setQuestions] = useState([]);
  const [newQuestion, setNewQuestion] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (newQuestion.trim() === '') return;
    setQuestions([
      { id: Date.now(), text: newQuestion.trim(), author: user.name },
      ...questions,
    ]);
    setNewQuestion('');
  };

  return (
    <div className="p-6">
      <h3 className="text-xl font-semibold mb-4" style={{ color: '#333A2F' }}>Q/A - Ask a Question</h3>
      <form onSubmit={handleSubmit} className="mb-6 flex gap-2">
        <input
          type="text"
          className="flex-1 border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-[#333A2F]"
          placeholder="Type your question..."
          value={newQuestion}
          onChange={e => setNewQuestion(e.target.value)}
        />
        <button
          type="submit"
          className="bg-[#333A2F] text-white px-6 py-2 rounded-lg font-semibold hover:bg-black"
        >
          Ask
        </button>
      </form>
      <div>
        {questions.length === 0 ? (
          <p className="text-gray-500">No questions yet. Be the first to ask!</p>
        ) : (
          <ul className="space-y-4">
            {questions.map(q => (
              <li key={q.id} className="bg-gray-50 border border-gray-200 rounded-lg p-4">
                <div className="flex items-center mb-2">
                  <span className="font-medium text-[#333A2F] mr-2">Q:</span> {q.text}
                </div>
                <div className="text-xs text-gray-500">Asked by <span className="font-semibold">{q.author}</span></div>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default QATab; 