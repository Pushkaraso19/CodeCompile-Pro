const express = require("express");
const router = express.Router();
const { runDocker } = require("../services/dockerService");

const languageConfig = {
  python: {
    command: "python",
  },
  javascript: {
    command: "node",
  },
  java: {
    command: "java",
    // Use a consistent class name that will be the same in both compile.js and dockerService.js
    processCode: (code) => {
      const timestamp = Date.now().toString();
      const className = `Main${timestamp}`;
      return `public class ${className} { public static void main(String[] args) { ${code} } }`;
    },
  },
  ruby: {
    command: "ruby",
  },
  go: {
    command: "go run",
    processCode: (code) => `package main\n\nimport (\n  "fmt"\n)\n\nfunc main() {\n  ${code}\n}`,
  },
};

router.post("/", async (req, res) => {
  const { language, code } = req.body;

  if (!languageConfig[language]) {
    return res.status(400).json({ error: `Language '${language}' not supported` });
  }

  try {
    let executionCode = code;
    
    if (languageConfig[language].processCode) {
      executionCode = languageConfig[language].processCode(code);
    }

    
    const result = await runDocker(language, executionCode);
    
    if (typeof result === 'string') {
      res.json({ output: result });
    } else {
      res.json({ output: JSON.stringify(result) });
    }
    
  } catch (err) {
    res.json({ output: err.toString() });
  }
});

module.exports = router;