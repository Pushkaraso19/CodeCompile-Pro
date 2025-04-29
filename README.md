# CodeCompile-Pro 🧑‍💻⚡

**An Online Code Compiler that supports multiple languages (Python, JavaScript, Java, Ruby, Go), built with React, Node.js, Express, and Docker for secure code execution.**



## 📌 Overview

**CodeCompile-Pro** is a cloud-based online compiler that allows users to write, test, and execute code in multiple programming languages including **Python, JavaScript, Java, Ruby**, and **Go**. It leverages Docker to run user code in a secure, isolated environment and returns real-time output via a backend API.

---

## 🚀 Features

- 🔤 Supports Python, JavaScript, Java, Ruby, and Go
- 📥 Accepts custom input from users
- 🐳 Code executed securely in Docker containers
- 🎯 Real-time execution results
- 🎨 Sleek, intuitive UI built with React and Tailwind CSS
- ⚙️ API built with Express.js

---

## 🛠️ Tech Stack

### Frontend
- **React**
- **Tailwind CSS**
- **Axios**

### Backend
- **Node.js + Express**
- **Docker**
- **Nodemon (Dev Mode)**

---

## 📁 Project Structure

```bash
CodeCompile-Pro/
├── client/               # React frontend
│   ├── public/
│   └── src/
│       ├── components/
│       ├── App.js
│       └── ...
├── server/               # Node.js backend
│   ├── routes/
│   ├── docker/           # Docker language templates
│   ├── app.js
│   └── ...
├── Dockerfile
├── .dockerignore
└── README.md
```

---

## ⚙️ Setup Instructions

### Prerequisites

- Node.js and npm
- Docker
- Git

### 1. Clone the Repository

```bash
git clone https://github.com/Pushkaraso19/CodeCompile-Pro.git
cd CodeCompile-Pro
```

### 2. Install Frontend Dependencies

```bash
cd client
npm install
```

### 3. Install Backend Dependencies

```bash
cd ../server
npm install
```

### 4. Start the Application

#### Start Backend (make sure Docker is running)

```bash
cd server
docker build -t online-code-compiler-server .
docker run -d -p 5000:5000 -v /var/run/docker.sock:/var/run/docker.sock --name code-compiler online-code-compiler-server
```

#### Start Frontend

```bash
cd ../client
npm start
```

---


## 🤝 Contributing

Contributions are welcome! Feel free to fork the repository and submit a pull request for improvements.

---

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

## 📬 Contact

**Pushkar Asodekar**  
📧 [pushkar9aso@gmail.com](mailto:pushkar9aso@gmail.com)  
🔗 [LinkedIn](https://www.linkedin.com/in/pushkar-asodekar) | [GitHub](https://github.com/Pushkaraso19)

---
