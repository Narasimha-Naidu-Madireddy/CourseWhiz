import { useState } from "react";
import api from "../services/api";
import "./AskAIBox.css";
import { toast } from "react-toastify";

function AskAIBox({ documentId }) {

  const [question, setQuestion] = useState("");
  const [answer, setAnswer] = useState("");
  const [loading, setLoading] = useState(false);

  const askAI = async () => {

    if (!documentId) {
      toast.warning("Please upload a PDF first.");
      return;
    }

    if (!question.trim()) {
      toast.warning("Please enter a question.");
      return;
    }

    try {

      setLoading(true);

      const response = await api.post(
        `/ai/ask/${documentId}`,
        { question },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );

      setAnswer(response.data.answer);

    } catch (error) {

      toast.error(
  error.response?.data?.message ||
  "Failed to get AI answer"
);

    } finally {

      setLoading(false);

    }

  };

  return (

    <div className="askai-card">

      <h2>💬 Ask AI</h2>

      <textarea
        className="askai-textarea"
        placeholder="Ask anything about your uploaded PDF..."
        value={question}
        onChange={(e) => setQuestion(e.target.value)}
      />

      <button
        className="askai-btn"
        onClick={askAI}
        disabled={loading}
      >
        {loading ? "Thinking..." : "Ask AI"}
      </button>

      {answer && (

        <div className="askai-answer">

          <h3>AI Response</h3>

          <p>{answer}</p>

        </div>

      )}

    </div>

  );

}

export default AskAIBox;