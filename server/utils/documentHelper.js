const { getDocumentById } = require("../services/documentService");

const getDocumentText = async (documentId) => {
  const document = await getDocumentById(documentId);

  if (!document) {
    throw new Error("Document not found");
  }

  return document.text;
};

module.exports = {
  getDocumentText,
};