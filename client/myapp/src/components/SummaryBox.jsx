import { useState } from "react";
import api from "../services/api";
import "./SummaryBox.css";
import { toast } from "react-toastify";

function SummaryBox({ documentId }) {

  const [summary, setSummary] = useState("");
  const [loading, setLoading] = useState(false);

  const generateSummary = async () => {

    if (!documentId) {
      toast.warning("Please upload a PDF first.");
      return;
    }

    try {

      setLoading(true);

      const response = await api.post(
        `/ai/summary/${documentId}`,
        {},
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );

      setSummary(response.data.summary);

    } catch (error) {

      toast.error(
  error.response?.data?.message ||
  "Failed to generate summary"
);

    } finally {

      setLoading(false);

    }

  };

  return (

    <div className="summary-card">

      <h2>📝 AI Summary</h2>

      <button
        className="summary-btn"
        onClick={generateSummary}
        disabled={loading}
      >
        {loading ? "Generating..." : "Generate Summary"}
      </button>

      {summary && (

        <div className="summary-result">

          {summary}

        </div>

      )}

    </div>

  );

}

export default SummaryBox;