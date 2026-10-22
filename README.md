# 📚 CourseWhiz — AI-Powered Study Companion & Quiz Engine

CourseWhiz is an AI-powered learning platform designed to help students study smarter. It transforms study materials into summaries, quizzes, flashcards, and interactive question-answering experiences.

## 🚀 Features

* 🔐 **User Authentication:** Register and log in securely.
* 📚 **Course Management:** Create and manage courses.
* 📄 **PDF Text Extraction:** Extract text from uploaded study materials.
* 📝 **AI Summaries:** Generate concise summaries of study content.
* ❓ **AI Quiz Generation:** Create quizzes from study materials.
* 🃏 **AI Flashcards:** Generate flashcards for revision.
* 💬 **Ask AI:** Ask questions about study materials.
* ✅ **Answer Evaluation:** Receive AI-generated feedback on answers.

## 🛠️ Technologies Used

**Frontend**

* React.js
* HTML
* CSS
* JavaScript

**Backend**

* Node.js
* Express.js

**Database**

* MongoDB Atlas

**AI Integration**

* Google Gemini API

**Authentication**

* JSON Web Tokens (JWT)

## ⚙️ Project Architecture

The application follows a client-server architecture.

1. Students interact with the React frontend.
2. The frontend communicates with the Express backend through APIs.
3. The backend manages authentication, courses, and study-related operations.
4. MongoDB Atlas stores application data.
5. Gemini AI powers the AI-assisted learning features.

## 💻 Getting Started

### Prerequisites

* Node.js and npm
* MongoDB Atlas account or another supported MongoDB deployment
* Google Gemini API key

### Installation

1. Clone the repository:

   ```bash
   git clone YOUR_GITHUB_REPOSITORY_URL
   ```

2. Open the project directory:

   ```bash
   cd CourseWhiz
   ```

3. Install frontend dependencies:

   ```bash
   cd client
   npm install
   ```

4. Install backend dependencies:

   ```bash
   cd ../server
   npm install
   ```

5. Configure the required environment variables using the provided `.env.example` template. Create a local `.env` file and enter your own credentials.

6. Start the backend and frontend using the appropriate scripts defined in their respective `package.json` files.

## 🔐 Security

* Never commit API keys, database credentials, JWT secrets, or actual `.env` files.
* Keep private AI API keys on the backend.
* Configure production environment variables through your hosting provider.

## 👨‍💻 Author

Developed as a MERN-stack project demonstrating AI-powered educational features.

## 📄 License

A license can be added if you decide to distribute the project under specific reuse terms.
