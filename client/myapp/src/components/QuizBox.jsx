import { useState } from "react";
import api from "../services/api";
import "./QuizBox.css";

function QuizBox({ documentId }) {

  const [quiz, setQuiz] = useState([]);
  const [loading, setLoading] = useState(false);

  const generateQuiz = async () => {

    if (!documentId) {
      alert("Please upload a PDF first.");
      return;
    }

    try {

      setLoading(true);

      const response = await api.post(
        `/ai/quiz/${documentId}`,
        {},
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );

      setQuiz(response.data.quiz);

    } catch (error) {

      alert(error.response?.data?.message || "Failed to generate quiz");

    } finally {

      setLoading(false);

    }

  };

  return (

    <div className="quiz-card">

      <h2>❓ AI Quiz</h2>

      <button
        className="quiz-btn"
        onClick={generateQuiz}
        disabled={loading}
      >
        {loading ? "Generating..." : "Generate Quiz"}
      </button>

      {quiz.length > 0 && (

        <div className="quiz-list">

          {quiz.map((q, index) => (

            <div
              key={index}
              className="quiz-item"
            >

              <h4>
                {index + 1}. {q.question}
              </h4>

              {q.options.map((option, i) => (

                <label
                  key={i}
                  className="quiz-option"
                >

                  <input
                    type="radio"
                    name={`question-${index}`}
                  />

                  {" "}
                  {option}

                </label>

              ))}

              <p className="quiz-answer">
                ✅ Correct Answer: {q.answer}
              </p>

            </div>

          ))}

        </div>

      )}

    </div>

  );

}

export default QuizBox;