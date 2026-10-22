const { GoogleGenAI } = require("@google/genai");

const ai = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY,
});

const generateSummary = async (text) => {
  try {
    const prompt = `
You are an AI Study Assistant.

Summarize the following study material in simple language.

Study Material:

${text}
`;

    const response = await ai.models.generateContent({
      model: "gemini-3.5-flash",
      contents: prompt,
    });

    return response.text;

  } catch (error) {
    console.error("Gemini Error:", error);
    throw error;
  }
};

const generateQuiz = async (text) => {
  try {
    const prompt = `
You are an AI Quiz Generator.

Based ONLY on the study material below, generate exactly 10 multiple-choice questions.

Rules:
- Return ONLY valid JSON.
- Do not include markdown.
- Each question must have:
  - question
  - options (4 options)
  - answer

Format:

[
  {
    "question": "...",
    "options": [
      "...",
      "...",
      "...",
      "..."
    ],
    "answer": "..."
  }
]

Study Material:

${text}
`;

    const response = await ai.models.generateContent({
      model: "gemini-3.5-flash",
      contents: prompt,
    });

    return response.text;

  } catch (error) {
    console.error("Gemini Error:", error);
    throw error;
  }
};

const generateFlashcards = async (text) => {
  try {
    const prompt = `
You are an AI Study Assistant.

Based ONLY on the study material below, create exactly 10 flashcards.

Rules:
- Return ONLY valid JSON.
- Do not include markdown.
- Each flashcard must contain:
  - front
  - back

Format:

[
  {
    "front": "...",
    "back": "..."
  }
]

Study Material:

${text}
`;

    const response = await ai.models.generateContent({
      model: "gemini-3.5-flash",
      contents: prompt,
    });

    return response.text;

  } catch (error) {
    console.error("Gemini Error:", error);
    throw error;
  }
};

const askQuestion = async (documentText, question) => {
  try {
    const prompt = `
You are an AI Study Assistant.

Answer the user's question ONLY using the study material provided below.

Rules:
- If the answer exists in the study material, answer clearly.
- If the answer is NOT present in the study material, reply:
  "The uploaded study material does not contain enough information to answer this question."
- Do not make up information.
- Keep the answer concise and easy to understand.

Study Material:
${documentText}

User Question:
${question}
`;

    const response = await ai.models.generateContent({
      model: "gemini-3.5-flash",
      contents: prompt,
    });

    return response.text;

  } catch (error) {
    console.error("Gemini Error:", error);
    throw error;
  }
};

const gradeAnswer = async (documentText, question, studentAnswer) => {
  try {
    const prompt = `
You are an AI Teacher.

Use ONLY the study material below.

Study Material:
${documentText}

Question:
${question}

Student Answer:
${studentAnswer}

Evaluate the answer.

Return ONLY valid JSON in this format:

{
  "score": 0,
  "maxScore": 10,
  "feedback": "...",
  "correctAnswer": "..."
}
`;

    const response = await ai.models.generateContent({
      model: "gemini-3.5-flash",
      contents: prompt,
    });

    return response.text;

  } catch (error) {
    console.error(error);
    throw error;
  }
};

module.exports = {
  generateSummary,
  generateQuiz,
  generateFlashcards,
  askQuestion,
  gradeAnswer,
};