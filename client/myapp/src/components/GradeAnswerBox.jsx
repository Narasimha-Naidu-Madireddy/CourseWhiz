import { useState } from "react";
import api from "../services/api";
import "./GradeAnswerBox.css";
import { toast } from "react-toastify";

function GradeAnswerBox({ documentId }) {

  const [question, setQuestion] = useState("");
  const [studentAnswer, setStudentAnswer] = useState("");
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);

  const gradeAnswer = async () => {

    if (!documentId) {
      toast.warning("Please upload a PDF first.");
      return;
    }

    if (!question.trim() || !studentAnswer.trim()) {
      toast.warning("Please fill all fields.");
      return;
    }

    try {

      setLoading(true);

      const response = await api.post(
        `/ai/grade/${documentId}`,
        {
          question,
          studentAnswer,
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );

      setResult(response.data.result);

    } catch (error) {

      toast.error(
  error.response?.data?.message ||
  "Failed to grade answer"
);

    } finally {

      setLoading(false);

    }

  };

  return (

    <div className="grade-card">

      <h2>📊 AI Grading</h2>

      <input
        className="grade-input"
        type="text"
        placeholder="Enter Question"
        value={question}
        onChange={(e) => setQuestion(e.target.value)}
      />

      <textarea
        className="grade-textarea"
        placeholder="Write your answer here..."
        value={studentAnswer}
        onChange={(e) => setStudentAnswer(e.target.value)}
      />

      <button
        className="grade-btn"
        onClick={gradeAnswer}
        disabled={loading}
      >
        {loading ? "Evaluating..." : "Evaluate Answer"}
      </button>

      {result && (

        <div className="grade-result">

          <div className="grade-score">
            ⭐ Score: {result.score} / {result.maxScore}
          </div>

          <div className="grade-section">
            <h4>📝 Feedback</h4>
            <p>{result.feedback}</p>
          </div>

          <div className="grade-section">
            <h4>✅ Correct Answer</h4>
            <p>{result.correctAnswer}</p>
          </div>

        </div>

      )}

    </div>

  );

}

export default GradeAnswerBox;