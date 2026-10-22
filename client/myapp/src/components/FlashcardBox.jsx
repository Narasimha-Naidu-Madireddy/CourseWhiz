import { useState } from "react";
import api from "../services/api";
import "./FlashcardBox.css";
import { toast } from "react-toastify";

function FlashcardBox({ documentId }) {

  const [flashcards, setFlashcards] = useState([]);
  const [loading, setLoading] = useState(false);
  const [flippedCards, setFlippedCards] = useState({});

  const generateFlashcards = async () => {

    if (!documentId) {
      toast.warning("Please upload a PDF first.");
      return;
    }

    try {

      setLoading(true);

      const response = await api.post(
        `/ai/flashcards/${documentId}`,
        {},
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );

      setFlashcards(response.data.flashcards);
      setFlippedCards({});

    } catch (error) {

      toast.error(
  error.response?.data?.message ||
  "Failed to generate flashcards"
);

    } finally {

      setLoading(false);

    }

  };

  const flipCard = (index) => {

    setFlippedCards((prev) => ({
      ...prev,
      [index]: !prev[index],
    }));

  };

  return (

    <div className="flashcard-section">

      <h2>🗂 AI Flashcards</h2>

      <button
        className="flashcard-btn"
        onClick={generateFlashcards}
      >
        {loading ? "Generating..." : "Generate Flashcards"}
      </button>

      <div className="flashcard-grid">

        {flashcards.map((card, index) => (

          <div
            key={index}
            className={`flashcard ${flippedCards[index] ? "flipped" : ""}`}
            onClick={() => flipCard(index)}
          >

            <div className="flashcard-inner">

              <div className="flashcard-face flashcard-front">

                <h3>Question</h3>

                <p>{card.front}</p>

                <small>
                  Click to reveal answer
                </small>

              </div>

              <div className="flashcard-face flashcard-back">

                <h3>Answer</h3>

                <p>{card.back}</p>

                <small>
                  Click to flip back
                </small>

              </div>

            </div>

          </div>

        ))}

      </div>

    </div>

  );

}

export default FlashcardBox;