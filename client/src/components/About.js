// About.js with Framer Motion and real language logos
import { motion } from "framer-motion";
import PropTypes from "prop-types";
import "./About.css";

function About({ theme, onBack }) {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: { 
        staggerChildren: 0.2,
        delayChildren: 0.3
      }
    },
    exit: { 
      opacity: 0,
      transition: { staggerChildren: 0.05, staggerDirection: -1 }
    }
  };

  const itemVariants = {
    hidden: { y: 50, opacity: 0 },
    visible: { 
      y: 0, 
      opacity: 1,
      transition: { 
        type: "spring",
        stiffness: 100
      }
    },
    exit: { 
      y: 50, 
      opacity: 0,
      transition: { 
        duration: 0.2
      }
    }
  };

  const languageCardVariants = {
    hidden: { y: 50, opacity: 0 },
    visible: { 
      y: 0, 
      opacity: 1,
      transition: { 
        type: "spring",
        stiffness: 200,
        damping: 20
      }
    },
    hover: { 
      y: -10,
      boxShadow: theme === "vs-dark" 
        ? "0px 10px 20px rgba(0, 0, 0, 0.5)" 
        : "0px 10px 20px rgba(0, 0, 0, 0.2)",
      transition: { 
        type: "spring",
        stiffness: 300,
        damping: 15
      }
    }
  };

  // Language data with real logos
  const languages = [
    { 
      name: "Python", 
      logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg" 
    },
    { 
      name: "JavaScript", 
      logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg" 
    },
    { 
      name: "Java", 
      logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/java/java-original.svg" 
    },
    { 
      name: "Ruby", 
      logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/ruby/ruby-original.svg" 
    },
    { 
      name: "Go", 
      logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/go/go-original.svg" 
    }
  ];

  return (
    <motion.div 
      className={`about-container ${theme === "vs-dark" ? "dark-mode" : "light-mode"}`}
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      exit="exit"
    >
      <motion.h1 variants={itemVariants}>About CodeCompile Pro</motion.h1>
      
      <motion.section className="about-section" variants={itemVariants}>
        <h2>Our Mission</h2>
        <p>
          CodeCompile Pro is designed to help developers quickly write, test, and execute code in multiple 
          programming languages without the hassle of setting up local development environments. 
          Whether you're learning a new language, preparing for technical interviews, or simply testing 
          a code snippet, our platform makes it easy and efficient.
        </p>
      </motion.section>
      
      <motion.section className="about-section" variants={itemVariants}>
        <h2>Supported Languages</h2>
        <div className="languages-grid">
          {languages.map((lang, index) => (
            <motion.div 
              key={lang.name}
              className="language-card"
              variants={languageCardVariants}
              whileHover="hover"
              custom={index}
            >
              <motion.div 
                className="language-icon"
                whileHover={{ scale: 1.2, rotate: 5 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                <img src={lang.logo} alt={`${lang.name} logo`} width="48" height="48" />
              </motion.div>
              <h3>{lang.name}</h3>
            </motion.div>
          ))}
        </div>
      </motion.section>
      
      <motion.section className="about-section" variants={itemVariants}>
        <h2>Features</h2>
        <ul className="features-list">
          {[
            { title: "Multi-language Support", description: "Write and execute code in Python, JavaScript, Java, C++, Ruby, and Go" },
            { title: "Monaco Editor Integration", description: "Enjoy professional code editing with syntax highlighting" },
            { title: "Dark/Light Mode", description: "Choose your preferred theme for comfortable coding" },
            { title: "Real-time Compilation", description: "Get instant feedback on your code execution" },
            { title: "Responsive Design", description: "Use on desktop or mobile devices with equal ease" }
          ].map((feature, index) => (
            <motion.li 
              key={index}
              initial={{ x: -50, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: index * 0.1 + 0.5 }}
            >
              <strong>{feature.title}</strong> - {feature.description}
            </motion.li>
          ))}
        </ul>
      </motion.section>
      
      <motion.section className="about-section" variants={itemVariants}>
        <h2>Open Source</h2>
        <p>
          CodeCompile Pro is an open-source project. Contributions, bug reports, and feature requests are 
          welcome on our <a href="https://github.com/Pushkaraso19/CodeCompile-Pro" target="_blank" rel="noreferrer">GitHub repository</a>.
        </p>
      </motion.section>
      
      <motion.button 
        className="back-button" 
        onClick={onBack}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        variants={itemVariants}
      >
        Back to Editor
      </motion.button>
    </motion.div>
  );
}

About.propTypes = {
  theme: PropTypes.string.isRequired,
  onBack: PropTypes.func.isRequired
};

export default About;