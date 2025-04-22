import PropTypes from "prop-types";
import "./OutputDisplay.css";
import { AiOutlineClockCircle, AiOutlineCheckCircle, AiOutlineCloseCircle } from "react-icons/ai";

function OutputDisplay({ output, isError, theme, executionTime }) {
  return (
    <div className={`output-display ${theme === "vs-dark" ? "dark" : "light"}`}>
      <div className="output-header">
        <h2>Output</h2>
        <div className="output-indicators">
          {executionTime && (
            <span className="execution-time">
              <AiOutlineClockCircle className="icon" /> {executionTime} ms
            </span>
          )}
          <span className="output-indicator">
            {output ? (
              isError ? (
                <AiOutlineCloseCircle className="icon error-icon" />
              ) : (
                <AiOutlineCheckCircle className="icon success-icon" />
              )
            ) : (
              "Waiting for code execution..."
            )}
          </span>
        </div>
      </div>
      <pre className={`output-content ${isError ? "error" : ""}`}>
        {output ? output : "Your code output will appear here."}
      </pre>
    </div>
  );
}

OutputDisplay.propTypes = {
  output: PropTypes.string.isRequired,
  isError: PropTypes.bool.isRequired,
  theme: PropTypes.string.isRequired,
  executionTime: PropTypes.string,
};

export default OutputDisplay;