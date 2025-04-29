import React, { useState, useEffect, useCallback, useRef } from "react";
import { Routes, Route } from "react-router-dom";
import axios from "axios";
import { motion, AnimatePresence } from "framer-motion";
import Navbar from "./components/Navbar";
import CodeEditor from "./components/Editor";
import About from "./components/About";
import LanguageSelector from "./components/LanguageSelector";
import OutputDisplay from "./components/OutputDisplay";
import "./App.css";

function App() {
  const [code, setCode] = useState("");
  const [output, setOutput] = useState("");
  const [language, setLanguage] = useState("python");
  const [isLoading, setIsLoading] = useState(false);
  const [theme, setTheme] = useState("vs-dark");
  const [error, setError] = useState(null);
  const [executionTime, setExecutionTime] = useState(null);
  const [showSaveModal, setShowSaveModal] = useState(false);
  const [codeName, setCodeName] = useState("");
  const [savedCodes, setSavedCodes] = useState(
    JSON.parse(localStorage.getItem("savedCodes") || "{}")
  );
  const [loadingSavedCode, setLoadingSavedCode] = useState(false);
  const [showSavedCodesPanel, setShowSavedCodesPanel] = useState(false);
  const cancelExecutionRef = useRef(false); 

  const starterTemplates = {
    python: '# Python Example\nprint("Hello, World!")\n\n# Try some calculations\nresult = 42 * 8\nprint(f"The answer is {result}")',
    javascript: '// JavaScript Example\nconsole.log("Hello, World!");\n\n// Try some calculations\nconst result = 42 * 8;\nconsole.log(`The answer is ${result}`);',
    java: '// Java code goes here (no need for class or method declarations)\nSystem.out.println("Hello, World!");\n\n// Try some calculations\nint result = 42 * 8;\nSystem.out.println("The answer is " + result);',
    ruby: '# Ruby Example\nputs "Hello, World!"\n\n# Try some calculations\nresult = 42 * 8\nputs "The answer is #{result}"',
    go: '// Go code goes here\nfmt.Println("Hello, World!")\n\n// Try some calculations\nresult := 42 * 8\nfmt.Printf("The answer is %d\\n", result)',
  };

  const setCodeMemoized = useCallback((newCode) => {
    setCode(newCode);
  }, []);

  const runCodeMemoized = useCallback(async () => {
    if (!code.trim()) {
      setError("Code is required");
      setOutput("Error: Code is required");
      return;
    }

    setIsLoading(true);
    setError(null);
    setExecutionTime(null);
    cancelExecutionRef.current = false;

    const startTime = performance.now();

    try {
      const res = await axios.post("http://localhost:5000/compile", {
        language,
        code,
      });
      setOutput(res.data.output);
      const endTime = performance.now();
      setExecutionTime((endTime - startTime).toFixed(2));
    } catch (error) {
      setError(error.response?.data?.error || "Error running code");
      setOutput(error.response?.data?.error || "Error running code");
    } finally {
      setIsLoading(false);
    }
  }, [code, language]);

  const stopExecution = () => {
    cancelExecutionRef.current = true; 
    setIsLoading(false); 
  };

  useEffect(() => {
    const savedTheme = localStorage.getItem("codeCompileTheme");
    const savedLanguage = localStorage.getItem("codeCompileLanguage");

    if (savedTheme) {
      setTheme(savedTheme);
    }

    if (savedLanguage && starterTemplates[savedLanguage]) {
      setLanguage(savedLanguage);
    }
  }, []);
  
  useEffect(() => {
    if (!loadingSavedCode) {
      setCode(starterTemplates[language] || "");
    }
  }, [language, loadingSavedCode]);

  useEffect(() => {
    localStorage.setItem("codeCompileTheme", theme);
  }, [theme]);

  useEffect(() => {
    localStorage.setItem("codeCompileLanguage", language);
  }, [language]);

  useEffect(() => {
    const handleKeyDown = (e) => {
      if ((e.ctrlKey || e.metaKey) && e.key === "s") {
        e.preventDefault();
        setShowSaveModal(true);
      }

      if ((e.ctrlKey || e.metaKey) && e.key === "Enter") {
        e.preventDefault();
        runCodeMemoized(); 
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [runCodeMemoized]); 

  const handleLanguageChange = (newLanguage) => {
    setLanguage(newLanguage);
    setOutput("");
    setExecutionTime(null);
    setError(null);
    setIsLoading(false);
    stopExecution();  
  };

  const toggleTheme = () => {
    setTheme(theme === "vs-dark" ? "vs-light" : "vs-dark");
  };

  const clearCode = () => {
    setCode("");
    setOutput("");
    setExecutionTime(null);
    setIsLoading(false);
    stopExecution(); 
    setError(null); 
  };

  const saveCurrentCode = () => {
    if (!codeName.trim()) return;

    const newSavedCodes = {
      ...savedCodes,
      [codeName]: {
        language,
        code,
        timestamp: new Date().toISOString(),
      },
    };

    setSavedCodes(newSavedCodes);
    localStorage.setItem("savedCodes", JSON.stringify(newSavedCodes));
    setShowSaveModal(false);
    setCodeName("");
  };

  const deleteSavedCode = (name, e) => {
    e.stopPropagation();
    const { [name]: removed, ...rest } = savedCodes;
    setSavedCodes(rest);
    localStorage.setItem("savedCodes", JSON.stringify(rest));
  };

  const loadSavedCode = (name) => {
    const savedCode = savedCodes[name];
    if (savedCode) {
      setLoadingSavedCode(true);
      setLanguage(savedCode.language); 
      setCode(savedCode.code);
      setShowSavedCodesPanel(false); 
      setLoadingSavedCode(false);
    }
  };

  const SavedCodesPanel = () => {
    const codeEntries = Object.entries(savedCodes);
  
    return (
      showSavedCodesPanel && (
        <div className="saved-codes-panel">
          <div className="saved-codes-header">
            <h3>Saved Code Snippets</h3>
            <button onClick={() => setShowSavedCodesPanel(false)}>X</button>
          </div>
          <div className="saved-codes-list">
            {codeEntries.length > 0 ? (
              codeEntries.map(([name, details]) => (
                <div
                  key={name}
                  className="saved-code-item"
                  onClick={() => loadSavedCode(name)}
                >
                  <div className="saved-code-info">
                    <h4 className="saved-code-title">
                      {name}
                      <span className="language-badge">{details.language}</span>
                    </h4>
                  </div>
                  <div className="timestamp">
                      {new Date(details.timestamp).toLocaleString()}
                  </div>
                  <button
                    className="delete-button"
                    onClick={(e) => deleteSavedCode(name, e)}
                  >
                    Delete
                  </button>
                </div>
              ))
            ) : (
              <p className="no-saved-codes">No saved code snippets yet.</p>
            )}
          </div>
        </div>
      )
    );
  };

  const EditorView = () => (
    <div className="main-container">
      <div className="editor-section">
        <div className="editor-header">
          <LanguageSelector language={language} onLanguageChange={handleLanguageChange} />
          <div className="editor-actions">
            <button
              className="action-button load-button"
              onClick={() => setShowSavedCodesPanel(true)}
            >
              Load
            </button>
            <button
              className="action-button save-button"
              onClick={() => setShowSaveModal(true)}
            >
              Save
            </button>
            <button
              className="action-button clear-button"
              onClick={clearCode}
            >
              Clear
            </button>
            <button
              className="action-button run-button"
              onClick={runCodeMemoized} 
              disabled={isLoading}
            >
              {isLoading ? (
                <>
                  <span className="spinner"></span>
                  Running...
                </>
              ) : (
                "Run Code"
              )}
            </button>
          </div>
        </div>
        <div>
          <CodeEditor 
            code={code} 
            setCode={setCodeMemoized} 
            language={language} 
            theme={theme} 
            runCode={runCodeMemoized} 
          />
        </div>
      </div>

      <div>
        <OutputDisplay 
          output={output} 
          isError={!!error} 
          theme={theme} 
          executionTime={executionTime} 
        />
      </div>
    </div>
  );

  return (
    <div className={`app ${theme === "vs-dark" ? "dark-mode" : "light-mode"}`}>
      <Navbar onToggleTheme={toggleTheme} theme={theme} />

      <Routes>
        <Route path="/" element={<EditorView />} />
        <Route path="/about" element={<About theme={theme} />} />
      </Routes>

      <AnimatePresence>
        {showSaveModal && (
          <motion.div
            className="modal-overlay"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setShowSaveModal(false)}
          >
            <motion.div
              className="modal-content"
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: 20, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
            >
              <h3>Save Code Snippet</h3>
              <input
                type="text"
                placeholder="Name your code snippet"
                value={codeName}
                onChange={(e) => setCodeName(e.target.value)}
                autoFocus
              />
              <div className="modal-actions">
                <button
                  onClick={() => setShowSaveModal(false)}
                  className="action-button cancel-button"
                >
                  Cancel
                </button>
                <button
                  onClick={saveCurrentCode}
                  className="action-button save-button"
                  disabled={!codeName.trim()}
                >
                  Save
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <SavedCodesPanel />

      <footer className="footer">
        <p>CodeCompile Pro &copy; {new Date().getFullYear()} | A professional online code compiler</p>
      </footer>
    </div>
  );
}

export default App;