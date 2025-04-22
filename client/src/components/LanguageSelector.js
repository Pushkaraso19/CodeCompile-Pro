import PropTypes from "prop-types";
import "./LanguageSelector.css";

function LanguageSelector({ language, onLanguageChange }) {
  const languages = [
    { 
      id: "python", 
      name: "Python", 
      logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg" 
    },
    { 
      id: "javascript", 
      name: "JavaScript", 
      logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg" 
    },
    { 
      id: "java", 
      name: "Java", 
      logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/java/java-original.svg" 
    },
    { 
      id: "ruby", 
      name: "Ruby", 
      logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/ruby/ruby-original.svg" 
    },
    { 
      id: "go", 
      name: "Go", 
      logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/go/go-original.svg" 
    }
  ];

  const handleLanguageChange = (e) => {
    const newLanguage = e.target.value;
    onLanguageChange(newLanguage);
  };

  return (
    <div className="language-selector">
      <label htmlFor="language-select">
        Language:
      </label>
      <select 
        id="language-select"
        value={language}
        onChange={handleLanguageChange}
      >
        {languages.map((lang) => (
          <option key={lang.id} value={lang.id}>
            {lang.name}
          </option>
        ))}
      </select>
      {/* Display the current language logo */}
      {languages.find(lang => lang.id === language) && (
        <img 
          src={languages.find(lang => lang.id === language).logo} 
          alt={`${language} logo`}
          className="language-logo"
          width="24"
          height="24"
        />
      )}
    </div>
  );
}

LanguageSelector.propTypes = {
  language: PropTypes.string.isRequired,
  onLanguageChange: PropTypes.func.isRequired
};

export default LanguageSelector;