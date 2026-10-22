import { useState } from "react";
import { useParams } from "react-router-dom";

import "./CourseDetails.css";

import Navbar from "../components/Navbar";
import UploadPDF from "../components/UploadPDF";
import SummaryBox from "../components/SummaryBox";
import QuizBox from "../components/QuizBox";
import FlashcardBox from "../components/FlashcardBox";
import AskAIBox from "../components/AskAIBox";
import GradeAnswerBox from "../components/GradeAnswerBox";

function CourseDetails() {

  const { id } = useParams();

  const [documentId, setDocumentId] = useState("");

  return (
    <div className="course-page">

      <Navbar />

      <main className="course-content">

        <section className="course-header">

          <h1>📚 Course Details</h1>

          <p>
            Manage your study materials and explore AI-powered learning tools.
          </p>

        </section>

        <UploadPDF
          courseId={id}
          onUploadSuccess={setDocumentId}
        />

        <SummaryBox
          documentId={documentId}
        />

        <QuizBox
          documentId={documentId}
        />

        <FlashcardBox
          documentId={documentId}
        />

        <AskAIBox
          documentId={documentId}
        />

        <GradeAnswerBox
          documentId={documentId}
        />

      </main>

    </div>
  );
}

export default CourseDetails;