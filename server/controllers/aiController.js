const { getDocumentById } = require("../services/documentService");
const {
  generateSummary,
  generateQuiz,
  generateFlashcards,
  askQuestion,
  gradeAnswer,
} = require("../services/geminiService");

const { getDocumentText } = require("../utils/documentHelper");
const { parseGeminiJson } = require("../utils/jsonHelper");

// Generate Summary
const generateDocumentSummary = async (req, res) => {
  try {
    const { documentId } = req.params;

    const text = await getDocumentText(documentId);

    if (!text) {
      return res.status(404).json({
        message: "Document not found",
      });
    }

    const summary = await generateSummary(text);

    return res.status(200).json({
      message: "Summary generated successfully",
      summary,
    });

  } catch (error) {
    console.error("Summary Error:", error);

    return res.status(500).json({
      message: error.message || "Server Error",
    });
  }
};

// Generate Quiz
const generateDocumentQuiz = async (req, res) => {
  try {
    const { documentId } = req.params;

    const text = await getDocumentText(documentId);

    if (!text) {
      return res.status(404).json({
        message: "Document not found",
      });
    }

    const quiz = await generateQuiz(text);

    return res.status(200).json({
      message: "Quiz generated successfully",
      quiz: parseGeminiJson(quiz),
    });

  } catch (error) {
    console.error("Quiz Error:", error);

    return res.status(500).json({
      message: error.message || "Server Error",
    });
  }
};

// Generate Flashcards
const generateDocumentFlashcards = async (req, res) => {
  try {
    const { documentId } = req.params;

    const text = await getDocumentText(documentId);

    if (!text) {
      return res.status(404).json({
        message: "Document not found",
      });
    }

    const flashcards = await generateFlashcards(text);

    return res.status(200).json({
      message: "Flashcards generated successfully",
      flashcards: parseGeminiJson(flashcards),
    });

  } catch (error) {
    console.error("Flashcards Error:", error);

    return res.status(500).json({
      message: error.message || "Server Error",
    });
  }
};

// Ask Question
const askDocumentQuestion = async (req, res) => {
  try {
    const { documentId } = req.params;
    const { question } = req.body;

    if (!question) {
      return res.status(400).json({
        message: "Question is required",
      });
    }

    const text = await getDocumentText(documentId);

    if (!text) {
      return res.status(404).json({
        message: "Document not found",
      });
    }

    const answer = await askQuestion(text, question);

    return res.status(200).json({
      message: "Answer generated successfully",
      question,
      answer,
    });

  } catch (error) {
    console.error("Ask AI Error:", error);

    return res.status(500).json({
      message: error.message || "Server Error",
    });
  }
};

// Grade Answer
const gradeDocumentAnswer = async (req, res) => {
  try {
    const { documentId } = req.params;
    const { question, studentAnswer } = req.body;

    if (!question || !studentAnswer) {
      return res.status(400).json({
        message: "Question and studentAnswer are required",
      });
    }

    const text = await getDocumentText(documentId);

    if (!text) {
      return res.status(404).json({
        message: "Document not found",
      });
    }

    const result = await gradeAnswer(
      text,
      question,
      studentAnswer
    );

    return res.status(200).json({
      message: "Answer evaluated successfully",
      result: parseGeminiJson(result),
    });

  } catch (error) {
    console.error("Grade Answer Error:", error);

    return res.status(500).json({
      message: error.message || "Server Error",
    });
  }
};

module.exports = {
  generateDocumentSummary,
  generateDocumentQuiz,
  generateDocumentFlashcards,
  askDocumentQuestion,
  gradeDocumentAnswer,
};