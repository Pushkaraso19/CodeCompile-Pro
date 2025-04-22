import { motion } from "framer-motion";
import PropTypes from "prop-types";
import { FiSun, FiMoon } from "react-icons/fi"; 
import "./Navbar.css";

function Navbar({ onToggleTheme, theme, onNavigate, currentPage }) {
  return (
    <motion.nav 
      className="navbar"
      initial={{ y: -50, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ type: "spring", stiffness: 100 }}
    >
      <div className="navbar-logo">
        <motion.div 
          onClick={() => onNavigate("editor")}
          style={{ cursor: "pointer", display: "flex", alignItems: "center" }}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <motion.h1
            initial={{ backgroundPosition: "0% 0%" }}
            animate={{ backgroundPosition: "100% 0%" }}
            transition={{ duration: 3, repeat: Infinity, repeatType: "reverse" }}
          >
            CodeCompile Pro
          </motion.h1>
        </motion.div>
      </div>
      <div className="navbar-links">
        <motion.button 
          className="theme-toggle" 
          onClick={onToggleTheme}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
        >
          {theme === "vs-dark" ? (
            <motion.span
              animate={{ rotate: 0 }}
              transition={{ duration: 0.5 }}
              style={{ display: "flex", alignItems: "center", gap: "5px" }}
            >
              <FiSun /> Light Mode
            </motion.span>
          ) : (
            <motion.span
              animate={{ rotate: 0 }}
              transition={{ duration: 0.5 }}
              style={{ display: "flex", alignItems: "center", gap: "5px" }}
            >
              <FiMoon /> Dark Mode
            </motion.span>
          )}
        </motion.button>
        <motion.a 
          href="https://github.com/Pushkaraso19/CodeCompile-Pro" 
          target="_blank" 
          rel="noreferrer"
          whileHover={{ scale: 1.1, color: theme === "vs-dark" ? "#81c784" : "#4caf50" }}
          whileTap={{ scale: 0.9 }}
        >
          GitHub
        </motion.a>
        <motion.span 
          onClick={() => onNavigate("about")}
          whileHover={{ scale: 1.1, color: theme === "vs-dark" ? "#81c784" : "#4caf50" }}
          whileTap={{ scale: 0.9 }}
          style={{ 
            fontWeight: "bold",
            cursor: "pointer", 
            background: currentPage === "about" 
              ? "linear-gradient(90deg, #4caf50, #2196f3)" 
              : "transparent",
            WebkitBackgroundClip: currentPage === "about" ? "text" : "unset",
            WebkitTextFillColor: currentPage === "about" ? "transparent" : "inherit"
          }}
          whileHover={{ scale: 1.1, color: theme === "vs-dark" ? "#81c784" : "#4caf50" }}
          whileTap={{ scale: 0.9 }}
          className={currentPage === "about" ? "active-nav-link" : ""}
        >
          About
        </motion.span>
      </div>
    </motion.nav>
  );
}

Navbar.propTypes = {
  onToggleTheme: PropTypes.func.isRequired,
  theme: PropTypes.string.isRequired,
  onNavigate: PropTypes.func.isRequired,
  currentPage: PropTypes.string.isRequired
};

export default Navbar;