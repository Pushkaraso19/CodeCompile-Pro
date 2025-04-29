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

  // Languages data
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
      
      {/* Updated Developer Section */}
      <motion.section className="about-section" variants={itemVariants}>
        <h2>Meet the Developer</h2>
        <p>CodeCompile Pro is a solo project created and maintained by a passionate developer dedicated to making coding more accessible and efficient.</p>
        
        <motion.div 
          className="developer-spotlight"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.5 }}
        >
          <div className="developer-image-container">
            <motion.div 
              className="developer-image"
              whileHover={{ scale: 1.05 }}
              transition={{ type: "spring", stiffness: 300 }}
              style={{
                height: "150px",
                width: "150px",
                borderRadius: "50%",
                overflow: "hidden",
                border: "5px solid transparent",
                backgroundImage: "linear-gradient(#fff, #fff), linear-gradient(90deg, #4caf50, #2196f3)",
                backgroundOrigin: "border-box",
                backgroundClip: "content-box, border-box",
                boxShadow: "0 0 15px rgba(76, 175, 80, 0.3)"
              }}
            >
              <img 
                src="/pushkarimg.jpg" 
                alt="Pushkar Asodekar" 
                style={{
                  width: "100%",
                  height: "100%",
                  objectFit: "cover"
                }}
              />
            </motion.div>
          </div>
          
          <div className="developer-info">
            <h3>Pushkar Asodekar</h3>
            <p className="developer-role">Full Stack Developer</p>
            
            <p className="developer-bio">
              I'm passionate about creating developer tools that simplify workflows and make coding more enjoyable. 
              CodeCompile Pro represents my vision for a streamlined coding environment that works across multiple languages.
            </p>
            
            <div className="social-links">
              <motion.a 
                href="https://github.com/Pushkaraso19"
                target="_blank" 
                rel="noreferrer"
                className="social-button github-button"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  padding: "8px 16px",
                  marginRight: "10px",
                  backgroundColor: theme === "vs-dark" ? "#333" : "#24292e",
                  color: "white",
                  borderRadius: "4px",
                  textDecoration: "none",
                  fontWeight: "500",
                  transition: "background-color 0.3s ease"
                }}
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="white" style={{ marginRight: "8px" }}>
                  <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                </svg>
                GitHub
              </motion.a>
              
              <motion.a 
                href="https://linkedin.com/in/pushkar-asodekar"
                target="_blank" 
                rel="noreferrer"
                className="social-button linkedin-button"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  padding: "8px 16px",
                  backgroundColor: theme === "vs-dark" ? "#0077b5" : "#0077b5",
                  color: "white",
                  borderRadius: "4px",
                  textDecoration: "none",
                  fontWeight: "500",
                  transition: "background-color 0.3s ease"
                }}
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="white" style={{ marginRight: "8px" }}>
                  <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
                </svg>
                LinkedIn
              </motion.a>
            </div>
          </div>
        </motion.div>
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