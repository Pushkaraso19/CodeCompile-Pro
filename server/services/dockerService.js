const fs = require("fs");
const path = require("path");
const { exec } = require("child_process");

const runDocker = (language, code) => {
  return new Promise((resolve, reject) => {
    let dockerCommand;
    const escapedCode = code.replace(/'/g, "'\\''");

    if (language === "python") {
      dockerCommand = `docker run --rm python:3.8 python -c '${escapedCode}'`;

      exec(dockerCommand, (error, stdout, stderr) => {
        if (error) {
          console.error("Execution error:", stderr || error.message);
          reject(stderr || error.message);
        } else {
          resolve(stdout);
        }
      });
    } else if (language === "javascript") {
      dockerCommand = `docker run --rm node:18 node -e '${escapedCode}'`;

      exec(dockerCommand, (error, stdout, stderr) => {
        if (error) {
          console.error("Execution error:", stderr || error.message);
          reject(stderr || error.message);
        } else {
          resolve(stdout);
        }
      });
    } else if (language === "java") {
       const classNameMatch = code.match(/public\s+class\s+([A-Za-z0-9_]+)/);
       if (!classNameMatch) {
        reject("Could not find a public class declaration in the Java code");
        return;
       }
       const className = classNameMatch[1];
       const escapedCode = code.replace(/'/g, "'\\''").replace(/"/g, '\\"');
       dockerCommand = `docker run --rm openjdk:17 sh -c 'echo "${escapedCode}" > ${className}.java && javac ${className}.java && java ${className}'`;
       exec(dockerCommand, (error, stdout, stderr) => {
        if (error) {
         console.error("Execution error:", stderr || error.message);
         reject(stderr || error.message);
        } else {
         resolve(stdout);
        }
    
       }); 
      } else if (language === "ruby") {
      dockerCommand = `docker run --rm ruby:latest ruby -e '${escapedCode}'`;

      exec(dockerCommand, (error, stdout, stderr) => {
        if (error) {
          console.error("Execution error:", stderr || error.message);
          reject(stderr || error.message);
        } else {
          resolve(stdout);
        }
      });
    } else if (language === "go") {
      const base64Code = Buffer.from(code).toString('base64');
      
      dockerCommand = `docker run --rm golang:latest sh -c 'echo "${base64Code}" | base64 -d > main.go && go run main.go'`;
      
      exec(dockerCommand, (error, stdout, stderr) => {
        if (error) {
          console.error("Execution error:", stderr || error.message);
          reject(stderr || error.message);
        } else {
          resolve(stdout);
        }
      });
    } else {
      reject("Unsupported language");
    }
  });
};

module.exports = { runDocker };