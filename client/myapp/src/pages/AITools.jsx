import "./AITools.css";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";

function AITools() {

  const navigate = useNavigate();

  return (
    <div className="ai-page">

      <Navbar />

      <main className="ai-content">

        <section className="ai-hero">

          <h1>🤖 AI Learning Tools</h1>

          <p>
            Enhance your learning experience with AI-powered features
            available in every course.
          </p>

        </section>

        <div className="tools-grid">

          <div className="tool-card">
            <h2>📄</h2>
            <h3>AI Summary</h3>
            <p>Generate concise summaries from uploaded PDFs.</p>
          </div>

          <div className="tool-card">
            <h2>🧠</h2>
            <h3>AI Quiz</h3>
            <p>Create intelligent quizzes automatically.</p>
          </div>

          <div className="tool-card">
  <h2>🗃️</h2>
  <h3>Flashcards</h3>
  <p>Create flashcards for quick revision.</p>
</div>

          <div className="tool-card">
            <h2>💬</h2>
            <h3>Ask Questions</h3>
            <p>Ask questions from your uploaded study material.</p>
          </div>

          <div className="tool-card">
            <h2>🎯</h2>
            <h3>AI Grading</h3>
            <p>Evaluate answers with detailed AI feedback.</p>
          </div>

        </div>

        <section className="ai-info">

          <h2>📚 Ready to Use?</h2>

          <p>
            To use any AI feature, first open a course from the
            <strong> Courses </strong>
            page. Every AI tool works with the documents uploaded
            to that course.
          </p>

          <button
            onClick={() => navigate("/courses")}
          >
            Go to Courses →
          </button>

        </section>

      </main>

    </div>
  );
}

export default AITools;