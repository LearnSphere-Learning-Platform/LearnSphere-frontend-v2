import React, { useState } from "react";
// import CodeEditor from "./CodeEditor.jsx"; // No longer needed

const LANGUAGES = [
  { label: "React/JSX", value: "React" },
  { label: "JavaScript", value: "JavaScript" },
  { label: "Python", value: "Python" },
  { label: "HTML", value: "HTML" },
  { label: "CSS", value: "CSS" },
  { label: "C", value: "C" },
  { label: "C++", value: "C++" },
  { label: "Java", value: "Java" },
  { label: "TypeScript", value: "TypeScript" },
  { label: "PHP", value: "PHP" },
];

const DEFAULT_STARTER = {
  React: `function App() {\n  return <h1>Hello World</h1>;\n}`,
  JavaScript: `console.log('Hello World');`,
  Python: `print('Hello World')`,
  HTML: `<!DOCTYPE html>\n<html>\n  <head>\n    <title>Hello</title>\n  </head>\n  <body>\n    <h1>Hello World</h1>\n  </body>\n</html>`,
  CSS: `body {\n  background: #f5f5f5;\n  color: #333;\n}`,
  C: `#include <stdio.h>\n\nint main() {\n  printf("Hello World\\n");\n  return 0;\n}`,
  "C++": `#include <iostream>\nusing namespace std;\n\nint main() {\n  cout << "Hello World" << endl;\n  return 0;\n}`,
  Java: `public class Main {\n  public static void main(String[] args) {\n    System.out.println("Hello World");\n  }\n}`,
  TypeScript: `function greet(name: string): string {\n  return \`Hello, \${name}\`;\n}\nconsole.log(greet('World'));`,
  PHP: `<?php\necho "Hello World";\n?>`,
};

const defaultCodeQuestion = () => ({
  question: "",
  expectedOutput: "",
  hint: "",
  language: "React",
  expanded: true,
  editing: true,
});

export default function CodeEditorInstructor({ onSave }) {
  const [questions, setQuestions] = useState([defaultCodeQuestion()]);

  const handleQuestionChange = (idx, value) => {
    setQuestions(qs => qs.map((q, i) => i === idx ? { ...q, question: value } : q));
  };
  const handleExpectedOutputChange = (idx, value) => {
    setQuestions(qs => qs.map((q, i) => i === idx ? { ...q, expectedOutput: value } : q));
  };
  const handleHintChange = (idx, value) => {
    setQuestions(qs => qs.map((q, i) => i === idx ? { ...q, hint: value } : q));
  };
  const handleLanguageChange = (idx, value) => {
    setQuestions(qs => qs.map((q, i) => i === idx ? { ...q, language: value } : q));
  };

  const addQuestion = () => {
    setQuestions(qs => [...qs, defaultCodeQuestion()]);
  };
  const removeQuestion = (idx) => {
    setQuestions(qs => qs.length > 1 ? qs.filter((_, i) => i !== idx) : qs);
  };
  const toggleExpand = (idx) => setQuestions(qs => qs.map((q, i) => i === idx ? { ...q, expanded: !q.expanded } : q));

  const handleSave = () => {
    const lastQuestion = questions[questions.length - 1];
    // Pass the default starter code for the selected language
    const questionWithStarter = {
      ...lastQuestion,
      starter: DEFAULT_STARTER[lastQuestion.language],
    };
    if (onSave) {
      onSave(questionWithStarter);
    } else {
      // alert("Code questions saved! (see console for data)");
      console.log({ questions });
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#f5f6ef] to-[#e8ece3] flex flex-col items-center py-10 px-2">
      <div className="w-full max-w-4xl bg-white rounded-3xl shadow-2xl border border-[#e5e7eb] p-0 overflow-hidden">
        <div className="flex items-center justify-between px-8 py-6 bg-[#384933]">
          <span className="text-2xl font-bold text-white tracking-tight">📝 Code Question Builder</span>
          <button
            className="ml-4 px-4 py-2 bg-[#b7c2a8] text-[#384933] rounded font-semibold hover:bg-[#a0b48a]"
            onClick={addQuestion}
          >
            + Add Question
          </button>
        </div>
        <div className="divide-y divide-[#e5e7eb]">
          {questions.map((q, idx) => (
            <div key={idx} className="p-6">
              <div className="flex justify-between items-center mb-2">
                <span className="font-bold text-lg">Question {idx + 1}</span>
                <div>
                  <button
                    className="mr-2 px-2 py-1 text-xs bg-[#e57373] text-white rounded hover:bg-[#c62828]"
                    onClick={() => removeQuestion(idx)}
                    disabled={questions.length === 1}
                  >Remove</button>
                  <button
                    className="px-2 py-1 text-xs bg-[#b7c2a8] text-[#384933] rounded hover:bg-[#a0b48a]"
                    onClick={() => toggleExpand(idx)}
                  >{q.expanded ? "Collapse" : "Expand"}</button>
                </div>
              </div>
              {q.expanded && (
                <div className="space-y-4">
                  <div>
                    <label className="block font-semibold">Language:</label>
                    <select
                      className="w-full border rounded p-2 font-semibold"
                      value={q.language}
                      onChange={e => handleLanguageChange(idx, e.target.value)}
                    >
                      {LANGUAGES.map(l => (
                        <option key={l.value} value={l.value}>{l.label}</option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label className="block font-semibold">Question Text:</label>
                    <textarea
                      className="w-full border rounded p-2"
                      value={q.question}
                      onChange={e => handleQuestionChange(idx, e.target.value)}
                      placeholder="Describe the coding task..."
                    />
                  </div>
                  <div>
                    <label className="block font-semibold">Starter Code Format:</label>
                    <pre className="w-full border rounded p-2 font-mono bg-gray-50 text-gray-800 overflow-x-auto whitespace-pre-wrap">
                      {DEFAULT_STARTER[q.language]}
                    </pre>
                  </div>
                  <div>
                    <label className="block font-semibold">Expected Output:</label>
                    <input
                      className="w-full border rounded p-2 font-mono"
                      value={q.expectedOutput}
                      onChange={e => handleExpectedOutputChange(idx, e.target.value)}
                      placeholder="Expected output after running the code..."
                    />
                  </div>
                  <div>
                    <label className="block font-semibold">Hint:</label>
                    <textarea
                      className="w-full border rounded p-2"
                      value={q.hint}
                      onChange={e => handleHintChange(idx, e.target.value)}
                      placeholder="Optional hint for the student..."
                    />
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
        <div className="flex justify-end p-6">
          <button
            className="px-6 py-2 bg-[#384933] text-white rounded font-bold hover:bg-[#2c3a25]"
            onClick={handleSave}
          >Save All</button>
        </div>
      </div>
    </div>
  );
}
