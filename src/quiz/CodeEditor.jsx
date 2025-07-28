import React, { useState, useEffect } from "react";
import Editor from "react-simple-code-editor";
import Prism from "prismjs";
import "prismjs/components/prism-jsx";
import "prismjs/components/prism-python";
import "prismjs/components/prism-javascript";
import "prismjs/components/prism-markup";
import "prismjs/components/prism-css";
import "prismjs/components/prism-c";
import "prismjs/components/prism-cpp";
import "prismjs/components/prism-java";
import "prismjs/components/prism-typescript";
import "prismjs/components/prism-markup-templating";
import "prismjs/components/prism-php";
import "prismjs/themes/prism.css";
import * as Babel from "@babel/standalone";

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

export default function LearnSphereSandbox({ instructions, expectedOutput, hint, starter = '', language = 'React', onComplete }) {
  const [selectedLanguage, setSelectedLanguage] = useState(language);
  const [code, setCode] = useState(starter);
  const [srcDoc, setSrcDoc] = useState("");
  const [jsOutput, setJsOutput] = useState("");
  const [pyOutput, setPyOutput] = useState("");
  const [showHint, setShowHint] = useState(false);
  const [submitMessage, setSubmitMessage] = useState("");

  // Add at the top, after useState declarations
  const [testCases, setTestCases] = useState([
    { input: '', expected: '', result: null, running: false }
  ]);

  // Handler to add a new test case
  const addTestCase = () => {
    setTestCases([...testCases, { input: '', expected: '', result: null, running: false }]);
  };

  // Handler to remove a test case
  const removeTestCase = idx => {
    setTestCases(testCases.filter((_, i) => i !== idx));
  };

  // Handler to update a test case field
  const updateTestCase = (idx, field, value) => {
    setTestCases(testCases.map((tc, i) => i === idx ? { ...tc, [field]: value } : tc));
  };

  useEffect(() => {
    setCode(starter);
    setSelectedLanguage(language);
    setSrcDoc("");
    setJsOutput("");
    setPyOutput("");
    setSubmitMessage("");
  }, [starter, language]);

    const runCode = async () => {
    setJsOutput("Running code...");
    
    if (selectedLanguage === "React") {
      let codeToRun = code;
      if (!/render\s*\(/.test(codeToRun)) {
        codeToRun += "\nrender(<App />);";
      }
      let compiled = "";
      try {
        compiled = Babel.transform(codeToRun, { presets: ["react"] }).code;
        setJsOutput("React component rendered successfully!");
      } catch (e) {
        setJsOutput(`Error: ${e.message}`);
        compiled = `document.body.innerHTML = '<pre style="color:red">${e.message}</pre>'`;
      }
      setSrcDoc(`
        <html>
          <head>
            <style>body { background: #f5f5f5; }</style>
          </head>
          <body>
            <div id="root"></div>
            <script crossorigin src="https://unpkg.com/react@17/umd/react.development.js"></script>
            <script crossorigin src="https://unpkg.com/react-dom@17/umd/react-dom.development.js"></script>
            <script>
              function render(el) { ReactDOM.render(el, document.getElementById('root')); }
              ${compiled}
            </script>
          </body>
        </html>
      `);
    } else if (selectedLanguage === "JavaScript") {
      let output = "";
      const log = (...args) => { output += args.join(" ") + "\n"; };
      try {
        new Function("console", code)({ log });
      } catch (e) {
        setJsOutput(e.message);
      }
      setJsOutput(output.trim());
    } else if (selectedLanguage === "Python") {
      const lines = code.split('\n');
      let output = "";
      for (let line of lines) {
        const match = line.match(/^print\((.*)\)$/);
        if (match) {
          let val = match[1].trim();
          if (val.startsWith("'")) val = val.slice(1, -1);
          else if (!isNaN(Number(val))) val = Number(val);
          else if (val.includes("+")) {
            try { val = eval(val); } catch { /* keep original value */ }
          }
          output += val + "\n";
        }
      }
      setPyOutput(output.trim());
    } else if (selectedLanguage === "HTML") {
      setSrcDoc(code);
      setJsOutput("HTML preview rendered successfully!");
    } else if (selectedLanguage === "CSS") {
      setSrcDoc(`<html><head><style>${code}</style></head><body><div class='css-preview'>CSS Preview Area</div></body></html>`);
      setJsOutput("CSS styles applied successfully!");
    } else {
      // Use Judge0 API for C, C++, Java, TypeScript, PHP
      try {
        const languageIds = {
          "C": 50,
          "C++": 54,
          "Java": 62,
          "TypeScript": 74,
          "PHP": 68
        };
        
        const languageId = languageIds[selectedLanguage];
        if (!languageId) {
          setJsOutput("Language not supported by Judge0 API");
          return;
        }

        // Create submission
        const createResponse = await fetch('https://judge0-ce.p.rapidapi.com/submissions', {
          method: 'POST',
          headers: {
            'content-type': 'application/json',
            'X-RapidAPI-Key': '84a404a31cmsh94f9e9f791bf588p11c516jsn3bf9f940ca21',
            'X-RapidAPI-Host': 'judge0-ce.p.rapidapi.com'
          },
          body: JSON.stringify({
            language_id: languageId,
            source_code: code,
            stdin: ''
          })
        });

        if (!createResponse.ok) {
          throw new Error(`API Error: ${createResponse.status} - ${createResponse.statusText}`);
        }

        const createData = await createResponse.json();
        console.log('Create response:', createData);
        
        if (!createData.token) {
          throw new Error('No token received from API');
        }
        
        const token = createData.token;

        // Poll for results
        let result;
        for (let i = 0; i < 10; i++) {
          await new Promise(resolve => setTimeout(resolve, 1000));
          
          const getResponse = await fetch(`https://judge0-ce.p.rapidapi.com/submissions/${token}`, {
            headers: {
              'X-RapidAPI-Key': '84a404a31cmsh94f9e9f791bf588p11c516jsn3bf9f940ca21',
              'X-RapidAPI-Host': 'judge0-ce.p.rapidapi.com'
            }
          });
          
          result = await getResponse.json();
          
          if (result.status && result.status.id > 2) {
            break;
          }
        }

        if (result.stdout) {
          setJsOutput(result.stdout);
        } else if (result.stderr) {
          setJsOutput(`Error: ${result.stderr}`);
        } else if (result.compile_output) {
          setJsOutput(`Compilation Error: ${result.compile_output}`);
        } else {
          setJsOutput("No output received");
        }
      } catch (error) {
        setJsOutput(`API Error: ${error.message}`);
      }
    }
  };

  const handleSubmit = async () => {
    let output = "";
    
    if (selectedLanguage === "React") {
      if (expectedOutput && srcDoc.includes(expectedOutput)) {
        setSubmitMessage("✅ Code accepted!");
        if (onComplete) {
          onComplete(true);
        }
      } else {
        setSubmitMessage("❌ Output does not match expected output.");
        if (onComplete) {
          onComplete(false);
        }
      }
      return;
    }
    
    if (selectedLanguage === "JavaScript") {
      let jsOut = "";
      const log = (...args) => { jsOut += args.join(" ") + "\n"; };
      try {
        new Function("console", code)({ log });
      } catch (e) {
        setSubmitMessage("❌ Error: " + e.message);
        if (onComplete) {
          onComplete(false);
        }
        return;
      }
      output = jsOut.trim();
    } else if (selectedLanguage === "Python") {
      const lines = code.split('\n');
      let pyOut = "";
      for (let line of lines) {
        const match = line.match(/^print\((.*)\)$/);
        if (match) {
          let val = match[1].trim();
          if (val.startsWith("'")) val = val.slice(1, -1);
          else if (!isNaN(Number(val))) val = Number(val);
          else if (val.includes("+")) {
            try { val = eval(val); } catch { /* keep original value */ }
          }
          pyOut += val + "\n";
        }
      }
      output = pyOut.trim();
    } else if (["C", "C++", "Java", "TypeScript", "PHP"].includes(selectedLanguage)) {
      // Use Judge0 API for these languages
      try {
        const languageIds = {
          "C": 50,
          "C++": 54,
          "Java": 62,
          "TypeScript": 74,
          "PHP": 68
        };
        
        const languageId = languageIds[selectedLanguage];
        
        // Create submission
        const createResponse = await fetch('https://judge0-ce.p.rapidapi.com/submissions', {
          method: 'POST',
          headers: {
            'content-type': 'application/json',
            'X-RapidAPI-Key': '84a404a31cmsh94f9e9f791bf588p11c516jsn3bf9f940ca21',
            'X-RapidAPI-Host': 'judge0-ce.p.rapidapi.com'
          },
          body: JSON.stringify({
            language_id: languageId,
            source_code: code,
            stdin: ''
          })
        });

        const createData = await createResponse.json();
        const token = createData.token;

        // Poll for results
        let result;
        for (let i = 0; i < 10; i++) {
          await new Promise(resolve => setTimeout(resolve, 1000));
          
          const getResponse = await fetch(`https://judge0-ce.p.rapidapi.com/submissions/${token}`, {
            headers: {
              'X-RapidAPI-Key': '84a404a31cmsh94f9e9f791bf588p11c516jsn3bf9f940ca21',
              'X-RapidAPI-Host': 'judge0-ce.p.rapidapi.com'
            }
          });
          
          result = await getResponse.json();
          
          if (result.status && result.status.id > 2) {
            break;
          }
        }

        if (result.stdout) {
          output = result.stdout.trim();
        } else if (result.stderr) {
          setSubmitMessage("❌ Error: " + result.stderr);
          return;
        } else if (result.compile_output) {
          setSubmitMessage("❌ Compilation Error: " + result.compile_output);
          return;
        } else {
          setSubmitMessage("❌ No output received");
          return;
        }
      } catch (error) {
        setSubmitMessage("❌ API Error: " + error.message);
        return;
      }
    } else {
      setSubmitMessage("❌ Output checking not supported for this language.");
      return;
    }
    
    // Compare output with expected output
    if (expectedOutput && output === expectedOutput.trim()) {
      setSubmitMessage("✅ Code accepted!");
      if (onComplete) {
        onComplete(true);
      }
    } else {
      setSubmitMessage(`❌ Output does not match expected output.\nExpected: "${expectedOutput}"\nGot: "${output}"`);
      if (onComplete) {
        onComplete(false);
      }
    }
  };

  const getPrismLang = () => {
    switch (selectedLanguage) {
      case "React": return Prism.languages.jsx;
      case "JavaScript": return Prism.languages.javascript;
      case "Python": return Prism.languages.python;
      case "HTML": return Prism.languages.markup;
      case "CSS": return Prism.languages.css;
      case "C": return Prism.languages.c;
      case "C++": return Prism.languages.cpp;
      case "Java": return Prism.languages.java;
      case "TypeScript": return Prism.languages.typescript;
      case "PHP": return Prism.languages.php;
      default: return Prism.languages.jsx;
    }
  };

  return (
    <div className="h-full bg-white text-[#333A2F] flex flex-col">
      <div className="flex-1 flex flex-col overflow-hidden">

        <div className="flex-1 flex flex-row gap-0 overflow-hidden">
          {/* Left Side - Questions and Code Editor */}
          <div className="w-1/2 flex flex-col border-r border-[#eee] min-h-0">
            {/* Question Section */}
            <div className="h-[250px] flex flex-col min-h-0">
              <div className="px-6 py-2 border-b border-[#eee] bg-[#f8fafc]">
                <div className="flex items-center gap-3">
                  <span className="text-xl">📝</span>
                  <span className="font-bold text-lg">Question</span>
                </div>
              </div>
              <div className="flex-1 p-4 min-h-0 overflow-auto">
                <div className="bg-white border border-gray-200  p-4 h-full w-[100%]">
                  <h3 className="font-bold text-lg text-gray-800 mb-2">Instructions:</h3>
                  <div className="text-gray-700 leading-relaxed">
                    {instructions || "Write a function that returns 'Hello World'"}
                  </div>
                  {/* Expected Output section removed as per user request */}
                  {hint && (
                    <div className="mt-4">
                      <button
                        className="text-blue-600 hover:text-blue-800 font-semibold text-sm mb-2"
                        onClick={() => setShowHint(!showHint)}
                      >
                        {showHint ? 'Hide Hint' : 'Show Hint'}
                      </button>
                      {showHint && (
                        <div className="p-3 bg-yellow-50 border-l-4 border-yellow-400 text-yellow-900 rounded">
                          {hint}
                        </div>
                      )}
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Code Editor Section */}
            <div className="flex-1 flex flex-col min-h-0 pt-2">
              <div className="flex items-center justify-between px-6 py-1 border-b border-[#eee] bg-[#f8fafc]">
                <div className="flex items-center gap-3">
                  <span className="text-xl">{"</>"}</span>
                  <span className="font-bold text-lg">Code</span>
                  <select
                    className="px-3 py-1 rounded border border-gray-300 bg-white text-sm font-semibold"
                    value={selectedLanguage}
                    onChange={e => setSelectedLanguage(e.target.value)}
                  >
                    {LANGUAGES.map(l => (
                      <option key={l.value} value={l.value}>{l.label}</option>
                    ))}
                  </select>
                </div>
                <div className="flex items-center gap-2">
                  <button className="p-2 hover:bg-gray-200 rounded">
                    <span className="text-lg">🔖</span>
                  </button>
                  <button className="p-2 hover:bg-gray-200 rounded">
                    <span className="text-lg">📋</span>
                  </button>
                  <button className="p-2 hover:bg-gray-200 rounded">
                    <span className="text-lg">🔄</span>
                  </button>
                  <button className="p-2 hover:bg-gray-200 rounded">
                    <span className="text-lg">⛶</span>
                  </button>
                </div>
              </div>
              <div className="flex-1 px-1 py-2 min-h-0 overflow-auto pb-1 pt-2">
                <Editor
                  value={code}
                  onValueChange={setCode}
                  highlight={c => Prism.highlight(c, getPrismLang(), selectedLanguage.toLowerCase())}
                  padding={16}
                  style={{
                    fontFamily: "Consolas, 'Courier New', monospace",
                    fontSize: 16,
                    height: 400,
                    maxHeight: 400,
                    background: "#f8f9fa",
                    color: "#333333",
                    borderRadius: 8,
                    border: '1px solid #e0e7ef',
                    outline: 'none',
                    transition: 'border 0.2s',
                    overflow: 'auto',
                  }}
                />
              </div>
              
              {/* Code Info Section - Below Code Editor */}
              <div className="px-6 py-3 bg-gray-50 border-t border-gray-200">
                <div className="flex items-center justify-between text-sm text-gray-600">
                  <div className="flex items-center gap-4">
                    <span>Language: {selectedLanguage}</span>
                    <span>Lines: {code.split('\n').length}</span>
                    <span>Characters: {code.length}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-green-500">●</span>
                    <span>Ready to run</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Side - Output and Test Cases */}
          <div className="w-1/2 flex flex-col min-h-0">
            {/* Output Section - Top Right */}
            <div className="h-[450px] flex flex-col min-h-0">
              {/* Navbar (with Run and Submit buttons) */}
              <div className="px-6 h-[45px] flex items-center justify-between border-b border-[#eee] bg-[#f8fafc]">
                <div className="flex items-center gap-3">
                  <span className="text-xl">▶</span>
                  <span className="font-bold text-lg">Output</span>
                </div>
                <div className="flex gap-2">
                  <button
                    className="px-2.5 py-0.5 rounded-lg bg-[#18181a] text-white font-bold shadow hover:bg-[#333] transition-all duration-150 text-sm"
                    onClick={runCode}
                  >
                    ▶ Run Code
                  </button>
                  <button
                    className="px-2.5 py-0.5 rounded-lg bg-green-600 text-white font-bold shadow hover:bg-green-700 transition-all duration-150 text-sm"
                    onClick={handleSubmit}
                  >
                    Submit Solution
                  </button>
                </div>
              </div>
              <div className="flex-1 flex flex-col justify-start min-h-0 overflow-auto px-4 py-4">
                <div className="w-full h-full rounded-lg border border-[#e0e7ef] bg-[#f8f9fa] p-4 text-base text-[#333333] overflow-auto flex items-start justify-start font-mono leading-relaxed">
                  {jsOutput ? (
                    <>
                      {selectedLanguage === "React" && (
                        <iframe
                          title="Preview"
                          srcDoc={srcDoc}
                          sandbox="allow-scripts"
                          className="w-full h-full rounded-lg border-none"
                          style={{ background: "#f8f9fa" }}
                        />
                      )}
                      {selectedLanguage === "JavaScript" && jsOutput}
                      {selectedLanguage === "Python" && pyOutput}
                      {selectedLanguage === "HTML" && (
                        <iframe
                          title="HTML Preview"
                          srcDoc={srcDoc}
                          sandbox="allow-scripts"
                          className="w-full h-full rounded-lg border-none"
                          style={{ background: "#f8f9fa" }}
                        />
                      )}
                      {selectedLanguage === "CSS" && (
                        <iframe
                          title="CSS Preview"
                          srcDoc={srcDoc}
                          sandbox="allow-scripts"
                          className="w-full h-full rounded-lg border-none"
                          style={{ background: "#f8f9fa" }}
                        />
                      )}
                      {(selectedLanguage === "C" || selectedLanguage === "C++" || selectedLanguage === "Java" || selectedLanguage === "TypeScript" || selectedLanguage === "PHP") && jsOutput}
                    </>
                  ) : (
                    <div className="flex flex-col items-center justify-center w-full h-full text-gray-500">
                      <div className="text-4xl mb-2">▶</div>
                      <div className="text-lg">Run your code to see output here</div>
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Custom Test Cases Section - Bottom Right */}
            <div className="flex-1 flex flex-col min-h-0">
              {/* Removed the header box for Custom Test Cases */}
              <div className="flex-1 flex flex-col justify-start min-h-0 overflow-auto px-4 py-4">
                <div className="space-y-4 w-full">
                  {testCases.map((tc, idx) => (
                    <div key={idx} className="bg-gray-50 border border-gray-200 rounded-lg p-4 w-full">
                      <div className="flex items-center justify-between mb-3">
                        <h4 className="font-semibold text-gray-700">Test Case {idx + 1}</h4>
                        <button className="text-red-500 hover:text-red-700 text-sm" onClick={() => removeTestCase(idx)}>Delete</button>
                      </div>
                      <div className="space-y-2 w-full">
                        <div className="w-full">
                          <label className="block text-sm font-medium text-gray-600 mb-1">Expected Output:</label>
                          <textarea
                            className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm font-mono"
                            rows="2"
                            placeholder="Enter expected output..."
                            value={tc.expected}
                            onChange={e => updateTestCase(idx, 'expected', e.target.value)}
                            style={{ width: '100%', boxSizing: 'border-box' }}
                          />
                        </div>
                        <button className="px-3 py-1 bg-blue-500 text-white text-sm rounded hover:bg-blue-600" onClick={async () => {
                          // Run the code in the code editor and compare output
                          let output = '';
                          if (selectedLanguage === 'JavaScript') {
                            let jsOut = '';
                            const log = (...args) => { jsOut += args.join(' ') + '\n'; };
                            try {
                              new Function("console", code)({ log });
                            } catch (e) {
                              jsOut = `Error: ${e.message}`;
                            }
                            output = jsOut.trim();
                          } else if (selectedLanguage === 'Python') {
                            const lines = code.split('\n');
                            let pyOut = '';
                            for (let line of lines) {
                              const match = line.match(/^print\((.*)\)$/);
                              if (match) {
                                let val = match[1].trim();
                                if (val.startsWith("'")) val = val.slice(1, -1);
                                else if (!isNaN(Number(val))) val = Number(val);
                                else if (val.includes("+")) {
                                  try { val = eval(val); } catch { /* keep original value */ }
                                }
                                pyOut += val + "\n";
                              }
                            }
                            output = pyOut.trim();
                          } else if (["C", "C++", "Java", "TypeScript", "PHP"].includes(selectedLanguage)) {
                            // Use Judge0 API for compiled languages
                            try {
                              const languageIds = {
                                "C": 50,
                                "C++": 54,
                                "Java": 62,
                                "TypeScript": 74,
                                "PHP": 68
                              };
                              
                              const languageId = languageIds[selectedLanguage];
                              
                              // Create submission
                              const createResponse = await fetch('https://judge0-ce.p.rapidapi.com/submissions', {
                                method: 'POST',
                                headers: {
                                  'content-type': 'application/json',
                                  'X-RapidAPI-Key': '84a404a31cmsh94f9e9f791bf588p11c516jsn3bf9f940ca21',
                                  'X-RapidAPI-Host': 'judge0-ce.p.rapidapi.com'
                                },
                                body: JSON.stringify({
                                  language_id: languageId,
                                  source_code: code,
                                  stdin: ''
                                })
                              });

                              const createData = await createResponse.json();
                              const token = createData.token;

                              // Poll for results
                              let result;
                              for (let i = 0; i < 10; i++) {
                                await new Promise(resolve => setTimeout(resolve, 1000));
                                
                                const getResponse = await fetch(`https://judge0-ce.p.rapidapi.com/submissions/${token}`, {
                                  headers: {
                                    'X-RapidAPI-Key': '84a404a31cmsh94f9e9f791bf588p11c516jsn3bf9f940ca21',
                                    'X-RapidAPI-Host': 'judge0-ce.p.rapidapi.com'
                                  }
                                });
                                
                                result = await getResponse.json();
                                
                                if (result.status && result.status.id > 2) {
                                  break;
                                }
                              }

                              if (result.stdout) {
                                output = result.stdout.trim();
                              } else if (result.stderr) {
                                output = 'Error: ' + result.stderr;
                              } else if (result.compile_output) {
                                output = 'Compilation Error: ' + result.compile_output;
                              } else {
                                output = 'No output received';
                              }
                            } catch (error) {
                              output = 'API Error: ' + error.message;
                            }
                          } else {
                            output = 'Execution not supported in browser.';
                          }
                          const pass = output.trim() === tc.expected.trim();
                          setTestCases(testCases.map((t, i) => i === idx ? { ...t, result: pass ? 'pass' : 'fail', running: false, actual: output } : t));
                        }}>
                          Run
                        </button>
                        {tc.result && (
                          <div className={`mt-2 text-sm font-semibold ${tc.result === 'pass' ? 'text-green-600' : 'text-red-600'}`}>{tc.result === 'pass' ? '✅ Pass' : '❌ Fail'}{tc.actual !== undefined && ` (Output: ${tc.actual})`}</div>
                        )}
                      </div>
                    </div>
                  ))}
                  <button className="w-full py-2 px-4 border-2 border-dashed border-gray-300 rounded-lg text-gray-500 hover:border-gray-400 hover:text-gray-600 transition-colors" onClick={addTestCase}>
                    + Add Test Case
                  </button>
                </div>
              </div>
            </div>
          </div>
          
          {submitMessage && (
            <>
              <div className="fixed inset-0 bg-transparent flex items-center justify-center z-50 transition-opacity animate-fade-in">
                <div className="bg-white rounded-2xl shadow-2xl p-8 max-w-md w-full text-center scale-100 animate-popup-paper">
                  <div className="text-3xl mb-4">📄</div>
                  <div className={`text-xl font-bold mb-2 ${submitMessage.startsWith('✅') ? 'text-green-700' : 'text-red-700'}`}>{submitMessage.startsWith('✅') ? 'The output is correct!' : 'The output is incorrect.'}</div>
                  <div className="text-base text-gray-700 mb-4">{submitMessage}</div>
                  <button
                    className="mt-2 px-6 py-2 bg-[#384933] text-white rounded font-bold hover:bg-[#2c3a25] transition-all"
                    onClick={() => setSubmitMessage("")}
                  >Close</button>
                </div>
              </div>
              <style>{`
                @keyframes fade-in { from { opacity: 0; } to { opacity: 1; } }
                .animate-fade-in { animation: fade-in 0.3s; }
                @keyframes popup-paper { 0% { transform: scale(0.7) rotate(-3deg); opacity: 0; } 60% { transform: scale(1.05) rotate(2deg); opacity: 1; } 100% { transform: scale(1) rotate(0deg); opacity: 1; } }
                .animate-popup-paper { animation: popup-paper 0.4s cubic-bezier(.68,-0.55,.27,1.55); }
              `}</style>
            </>
          )}
        </div>
      </div>
    </div>
  );
}