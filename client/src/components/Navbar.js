import { motion } from "framer-motion";
import { useNavigate, useLocation } from "react-router-dom";
import { FiSun, FiMoon } from "react-icons/fi";
import PropTypes from "prop-types";
import "./Navbar.css";

function Navbar({ onToggleTheme, theme }) {
  const navigate = useNavigate();
  const location = useLocation();
  const currentPage = location.pathname;

  return (
    <motion.nav
      className="navbar"
      initial={{ y: -50, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ type: "spring", stiffness: 100 }}
    >
      <div className="navbar-logo">
        <motion.div
          onClick={() => navigate("/")}
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

        <motion.span
          onClick={() => navigate("/")}
          whileHover={{
            scale: 1.1,
            color: theme === "vs-dark" ? "#81c784" : "#4caf50",
          }}
          whileTap={{ scale: 0.9 }}
          style={{
            fontWeight: "bold",
            cursor: "pointer",
            color: theme === "vs-dark" ? "#fff" : "#333",
            background:
              currentPage === "/" ? "linear-gradient(90deg, #4caf50, #2196f3)" : "transparent",
            WebkitBackgroundClip: currentPage === "/" ? "text" : "unset",
            WebkitTextFillColor: currentPage === "/" ? "transparent" : "inherit",
            transition: "all 0.5s ease",
          }}
          className={currentPage === "/" ? "active-nav-link" : ""}
        >
          Home
        </motion.span>

        <motion.span
          onClick={() => navigate("/about")}
          whileHover={{
            scale: 1.1,
            color: theme === "vs-dark" ? "#81c784" : "#4caf50",
          }}
          whileTap={{ scale: 0.9 }}
          style={{
            fontWeight: "bold",
            cursor: "pointer",
            color: theme === "vs-dark" ? "#fff" : "#333",
            background:
              currentPage === "/about"
                ? "linear-gradient(90deg, #4caf50, #2196f3)"
                : "transparent",
            WebkitBackgroundClip: currentPage === "/about" ? "text" : "unset",
            WebkitTextFillColor: currentPage === "/about" ? "transparent" : "inherit",
            transition: "all 0.5s ease",
          }}
          className={currentPage === "/about" ? "active-nav-link" : ""}
        >
          About
        </motion.span>

        <motion.a
          href="https://github.com/Pushkaraso19/CodeCompile-Pro"
          target="_blank"
          rel="noreferrer"
          whileHover={{
            scale: 1.1,
            color: theme === "vs-dark" ? "#81c784" : "#4caf50",
          }}
          whileTap={{ scale: 0.9 }}
          style={{
            fontWeight: "bold",
            color: theme === "vs-dark" ? "#fff" : "#333",
          }}
        >
          GitHub
        </motion.a>
      </div>
    </motion.nav>
  );
}

Navbar.propTypes = {
  onToggleTheme: PropTypes.func.isRequired,
  theme: PropTypes.string.isRequired,
};

export default Navbar;
