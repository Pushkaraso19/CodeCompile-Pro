import { Editor } from "@monaco-editor/react";
import PropTypes from "prop-types";
import { useRef, useEffect, memo } from "react";
import "./Editor.css";

// Completely uncontrolled editor that only syncs to parent when needed
const CodeEditor = memo(function CodeEditor({ code, setCode, language, theme, runCode }) {
  const editorRef = useRef(null);
  const monacoRef = useRef(null);
  const initializedRef = useRef(false);
  const ignoreChangesRef = useRef(false);
  const lastKnownCodeRef = useRef(code);
  
  // Handle editor initialization
  const handleEditorDidMount = (editor, monaco) => {
    editorRef.current = editor;
    monacoRef.current = monaco;
    
    // Set theme
    monaco.editor.setTheme(theme);
    
    // Set initial content
    if (code) {
      editor.setValue(code);
      lastKnownCodeRef.current = code;
    }
    
    // Add command for running code
    editor.addCommand(monaco.KeyMod.CtrlCmd | monaco.KeyCode.Enter, () => {
      if (runCode) {
        // When running code, sync the latest content to parent first
        const currentValue = editor.getValue();
        if (currentValue !== lastKnownCodeRef.current) {
          lastKnownCodeRef.current = currentValue;
          setCode(currentValue);
        }
        runCode();
      }
    });
    
    // Instead of listening to every change, add a debounced update
    // or update only on significant events
    editor.onDidBlurEditorWidget(() => {
      // Sync with parent when user leaves the editor
      const currentValue = editor.getValue();
      if (currentValue !== lastKnownCodeRef.current) {
        lastKnownCodeRef.current = currentValue;
        setCode(currentValue);
      }
    });
    
    initializedRef.current = true;
  };

  // Theme updates
  useEffect(() => {
    if (monacoRef.current) {
      monacoRef.current.editor.setTheme(theme);
    }
  }, [theme]);

  // Language updates
  useEffect(() => {
    if (editorRef.current && monacoRef.current && initializedRef.current) {
      const model = editorRef.current.getModel();
      if (model) {
        monacoRef.current.editor.setModelLanguage(model, language);
      }
    }
  }, [language]);

  // Handle external code changes (e.g., template loading, saved code loading)
  useEffect(() => {
    // Only update the editor content if it's initialized and the code comes from outside
    // (not from our own onChange handler)
    if (editorRef.current && initializedRef.current && !ignoreChangesRef.current) {
      if (code !== lastKnownCodeRef.current) {
        // This is an external update (like template change)
        lastKnownCodeRef.current = code;
        editorRef.current.setValue(code);
      }
    }
  }, [code]);

  return (
    <div className="editor-container">
      <Editor
        height="500px"
        language={language}
        onMount={handleEditorDidMount}
        theme={theme}
        options={{
          minimap: { enabled: true },
          fontSize: 14,
          wordWrap: "on",
          showUnused: false,
          folding: true,
          lineNumbersMinChars: 3,
          scrollBeyondLastLine: true,
          automaticLayout: true,
          tabSize: 4,
        }}
      />
    </div>
  );
});

CodeEditor.propTypes = {
  code: PropTypes.string.isRequired,
  setCode: PropTypes.func.isRequired,
  language: PropTypes.string.isRequired,
  theme: PropTypes.string.isRequired,
  runCode: PropTypes.func
};

export default CodeEditor;  