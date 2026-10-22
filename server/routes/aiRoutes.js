const express = require("express");
const router = express.Router();

const protect = require("../middleware/authMiddleware");

const {
  generateDocumentSummary,
  generateDocumentQuiz,
  generateDocumentFlashcards,
  askDocumentQuestion,
  gradeDocumentAnswer,
} = require("../controllers/aiController");

// Generate summary from uploaded document
router.post("/summary/:documentId", protect, generateDocumentSummary);

router.post("/quiz/:documentId", protect, generateDocumentQuiz);

router.post("/flashcards/:documentId",protect,generateDocumentFlashcards);

router.post("/ask/:documentId",protect,askDocumentQuestion);

router.post("/grade/:documentId",protect,gradeDocumentAnswer);

module.exports = router;